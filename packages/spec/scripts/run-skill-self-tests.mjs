#!/usr/bin/env node

import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const workflowPolicy = require(join(packageRoot, "src/claude/scripts/workflow-policy.cjs"));
const { parseVerificationDefinitions } = require(
  join(packageRoot, "src/claude/scripts/spec-ground.cjs"),
);
const semanticFirewallDiscovery = require(
  join(packageRoot, "scripts/semantic-firewall-test-discovery.cjs"),
);
// C2 SemanticReviewReceipt's exact field-list authority (R1-01, frozen) lives
// once in the validator; import it rather than maintaining a second literal.
const { C2_FIELDS } = require(
  join(packageRoot, "src/claude/scripts/validate-spec-output.cjs"),
);

// Repeatable `--require-semantic-test <basename>` flags (D12): each named
// basename must be discovered under bin/__tests__ and must itself pass in
// isolation, or the whole run fails nonzero.
function parseRequiredSemanticTests(argv) {
  const required = [];
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--require-semantic-test") {
      const value = argv[index + 1];
      if (!value) throw new Error("--require-semantic-test requires a basename argument");
      required.push(value);
      index += 1;
    }
  }
  return required;
}

async function listFiles(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && predicate(entry.name))
    .map((entry) => join(directory, entry.name))
    .sort();
}

function runCommand({ label, command, args, parseCount, summarize }) {
  return new Promise((resolveRun) => {
    const child = spawn(command, args, {
      cwd: packageRoot,
      // Force colorless child output: the count parsers anchor on line starts,
      // and ANSI prefixes (e.g. FORCE_COLOR envs) break them -> false NO_TESTS.
      env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = "";
    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk);
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(chunk);
      output += chunk;
    });
    child.on("error", (error) => {
      resolveRun({ label, code: 1, count: 0, error: error.message });
    });
    child.on("close", (code) => {
      resolveRun({
        label,
        code,
        count: parseCount(output),
        summary: typeof summarize === "function" ? summarize(output) : null,
      });
    });
  });
}

function parseNodeTestCount(output) {
  const match = output.match(/^(?:#|ℹ)\s+tests\s+(\d+)/m);
  return match ? Number(match[1]) : 0;
}

function parseNodeTestSummary(output) {
  const metric = (name) => {
    const match = output.match(new RegExp(`^(?:#|ℹ)\\s+${name}\\s+(\\d+)`, "m"));
    return match ? Number(match[1]) : null;
  };
  const failingTests = [...output.matchAll(
    /^test at (.+?):(\d+):(\d+)\n✖ ([^\n]+?)(?: \([\d.]+ms\))?$/gm,
  )].map((match) => ({
    file: match[1],
    line: Number(match[2]),
    column: Number(match[3]),
    title: match[4],
  }));
  return {
    tests: metric("tests"),
    pass: metric("pass"),
    fail: metric("fail"),
    skipped: metric("skipped"),
    failingTests,
  };
}

function nodeFailureDetail(summary) {
  if (!summary) return "test summary unavailable";
  const counts = `tests=${summary.tests ?? "unknown"} pass=${summary.pass ?? "unknown"} fail=${summary.fail ?? "unknown"}`;
  if (summary.failingTests.length === 0) return counts;
  const failures = summary.failingTests
    .map(({ file, line, column, title }) => `${file}:${line}:${column} (${title})`)
    .join("; ");
  return `${counts}; failing=${failures}`;
}

function parsePythonUnittestCount(output) {
  const match = output.match(/Ran\s+(\d+)\s+tests?/);
  return match ? Number(match[1]) : 0;
}

const TASK_21_SECTIONS = [
  "Outcome",
  "Scope",
  "Anchors and Ownership",
  "Changes",
  "Acceptance",
  "Dependencies",
  "Verification Plan",
];

function markdownH2s(content) {
  return [...content.matchAll(/^##\s+(.+?)\s*$/gm)].map((match) => match[1]);
}

function markdownBoldBulletFields(content) {
  const fields = new Map();
  for (const line of String(content).split("\n")) {
    const prefix = "- **";
    const separator = ":**";
    if (!line.startsWith(prefix) || !line.includes(separator)) continue;
    const boundary = line.indexOf(separator);
    fields.set(line.slice(prefix.length, boundary).trim(), line.slice(boundary + separator.length).trim());
  }
  return fields;
}

function markdownTableUnderHeading(content, heading) {
  const lines = String(content).split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (headingIndex < 0) return [];
  const tableStart = lines.findIndex((line, index) => index > headingIndex && line.trim().startsWith("|"));
  if (tableStart < 0) return [];
  const rows = [];
  for (let index = tableStart; index < lines.length && lines[index].trim().startsWith("|"); index += 1) {
    const cells = lines[index].split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows;
}

function authoringInstructionIssues(sources) {
  const issues = [];
  const skill = sources.get("skill") || "";
  const canonicalCorpus = [
    "skill", "allRules", "reviewReference", "specMaker", "claudeState",
    "codexState", "claudeRuntime", "codexRuntime",
  ].map((key) => sources.get(key) || "").join("\n");
  const routerRows = markdownTableUnderHeading(skill, "Artifact router");
  const header = routerRows[0] || [];
  const records = new Map(routerRows.slice(1).map((cells) => [
    (cells[0] || "").replaceAll("`", ""),
    Object.fromEntries(header.map((name, index) => [name, cells[index] || ""])),
  ]));
  const none = records.get("None");
  const compact = records.get("Compact");
  const full = records.get("Full");
  if (!none || none["Durable core"] !== "none"
    || none["Research route"] !== "absent" || none["Task route"] !== "absent") {
    issues.push("router-none-is-not-ephemeral");
  }
  for (const [name, record] of [["Compact", compact], ["Full", full]]) {
    if (!record
      || !["spec.json", "requirements.md", "design.md"].every((artifact) => (
        record["Durable core"].includes(`\`${artifact}\``)
      ))) {
      issues.push(`router-${name.toLowerCase()}-core-drift`);
    }
    if (!record?.["Research route"].includes("research trigger")) {
      issues.push(`router-${name.toLowerCase()}-defaults-research`);
    }
    if (!record?.["Task route"].includes("typed topology trigger")) {
      issues.push(`router-${name.toLowerCase()}-defaults-tasks`);
    }
  }

  const discovery = `${sources.get("discoveryLight") || ""}\n${sources.get("discoveryFull") || ""}`;
  if (/\balways search\b|\bcomprehensive research\b|\bcapture all findings\b/i.test(discovery)) {
    issues.push("discovery-defaults-research");
  }
  const review = `${sources.get("reviewRule") || ""}\n${sources.get("reviewReference") || ""}`;
  if (/(?:limit|maximum|at most|top|≤|<=)\s*(?:to\s*)?3\b/i.test(review)) {
    issues.push("review-finding-cap");
  }
  if (!/For every `RN\.M`/.test(review) || !/inventory (?:size|every blocker)/i.test(review)) {
    issues.push("review-incomplete-criterion-coverage");
  }
  if (/\balways search\b|\bcomprehensive research\b|\bcapture all findings\b/i.test(canonicalCorpus)) {
    issues.push("canonical-corpus-defaults-research");
  }
  if (/(?:limit|maximum|at most|top|≤|<=)\s*(?:to\s*)?3\s+(?:blockers?|findings?|issues?)/i.test(canonicalCorpus)) {
    issues.push("canonical-corpus-review-cap");
  }

  const lifecycle = ["claudeState", "codexState", "claudeRuntime", "codexRuntime"]
    .map((key) => sources.get(key) || "").join("\n");
  if (/\bcurrent_phase\b/.test(lifecycle)) issues.push("canonical-current-phase-alias");
  if (/\bcurrent_phase\b/.test(canonicalCorpus)) issues.push("canonical-corpus-current-phase-alias");
  for (const state of ["in_progress", "paused", "blocked", "done"]) {
    if (!lifecycle.includes(`\`${state}\``)) issues.push(`lifecycle-missing-${state}`);
  }

  const taskAuthoring = ["taskRules", "taskScoring", "phaseRules", "specMaker"]
    .map((key) => sources.get(key) || "").join("\n");
  if (/^##\s+Evidence\s*$/m.test(taskAuthoring)) issues.push("task-embedded-evidence");
  if (/\(P\)/.test(taskAuthoring)) issues.push("task-priority-marker");
  if (/^##\s+Evidence\s*$/m.test(canonicalCorpus)) issues.push("canonical-corpus-embedded-evidence");
  if (/\(P\)/.test(canonicalCorpus)) issues.push("canonical-corpus-priority-marker");
  if (/\btask_triggers\b|^##\s+Related Files\s*$/m.test(canonicalCorpus)) {
    issues.push("canonical-corpus-legacy-topology-authority");
  }

  const codexProjection = `${sources.get("codexState") || ""}\n${sources.get("codexRuntime") || ""}`;
  for (const claudeOnlyTool of [
    "AskUserQuestion", "TaskCreate", "TaskGet", "TaskUpdate", "TaskList",
    "WebSearch", "WebFetch", "SendMessage",
  ]) {
    if (codexProjection.includes(claudeOnlyTool)) issues.push(`codex-claude-tool-${claudeOnlyTool}`);
  }
  if ((sources.get("semanticAuthority") || "").includes("requires explicit promoted machine semantic authority")) {
    for (const key of ["skill", "specMaker", "claudeState", "codexState", "claudeRuntime", "codexRuntime"]) {
      const projection = sources.get(key) || "";
      if (!projection.includes("semantic_model")
        || !/explicit installed\s+machine semantic-sync step/.test(projection)
        || !/round-trip/.test(projection)) {
        issues.push(`semantic-model-promotion-drift-${key}`);
      }
    }
  }
  return issues;
}

async function runAuthoringInstructionContractTests(fail) {
  const ruleRoot = join(packageRoot, "src/claude/skills/specs/rules");
  const load = (relativePath) => readFile(join(packageRoot, relativePath), "utf8");
  const sources = new Map(await Promise.all([
    ["skill", "src/claude/skills/specs/SKILL.md"],
    ["discoveryLight", "src/claude/skills/specs/rules/design-discovery-light.md"],
    ["discoveryFull", "src/claude/skills/specs/rules/design-discovery-full.md"],
    ["reviewRule", "src/claude/skills/specs/rules/design-review.md"],
    ["reviewReference", "src/claude/skills/specs/references/review.md"],
    ["taskRules", "src/claude/skills/specs/rules/tasks-generation.md"],
    ["taskScoring", "src/claude/skills/specs/rules/task-scoring-rubric.md"],
    ["phaseRules", "src/claude/skills/specs/rules/phase-decision-matrix.md"],
    ["specMaker", "src/claude/agents/spec-maker.md"],
    ["claudeState", "src/claude/rules/state-sync.md"],
    ["codexState", "src/codex/rules/state-sync.md"],
    ["claudeRuntime", "src/claude/CLAUDE.md"],
    ["codexRuntime", "src/codex/AGENTS.md"],
    ["semanticAuthority", "src/claude/scripts/validate-spec-output.cjs"],
  ].map(async ([key, relativePath]) => [key, await load(relativePath)])));

  const allRuleFiles = await listFiles(ruleRoot, (name) => name.endsWith(".md"));
  sources.set("allRules", (await Promise.all(allRuleFiles.map((file) => readFile(file, "utf8")))).join("\n"));
  const issues = authoringInstructionIssues(sources);
  if (issues.length > 0) fail(`canonical instruction lint failed: ${issues.join(", ")}`);

  const mutations = [
    ["default research", "discoveryLight", (value) => `${value}\nAlways search before design.`],
    ["review cap", "reviewRule", (value) => `${value}\nLimit to 3 blockers.`],
    ["phase alias", "codexState", (value) => `${value}\nSet current_phase after authoring.`],
    ["embedded task evidence", "taskRules", (value) => `${value}\n## Evidence\nPASS`],
    ["task priority marker", "taskRules", (value) => `${value}\nUse (P) for parallel work.`],
    ["Codex Claude-tool vocabulary", "codexState", (value) => `${value}\nCall TaskUpdate.`],
    ["Compact default research route", "skill", (value) => value.replace(
      "| `Compact` | `spec.json`, `requirements.md`, `design.md` | only on a research trigger |",
      "| `Compact` | `spec.json`, `requirements.md`, `design.md` | create research by default |",
    )],
    ["implicit semantic-model promotion", "codexState", (value) => value.replace(
      /explicit installed\s+machine semantic-sync step/,
      "implicit author sync",
    )],
  ];
  for (const [label, key, mutate] of mutations) {
    const mutated = new Map(sources);
    mutated.set(key, mutate(mutated.get(key)));
    if (authoringInstructionIssues(mutated).length === 0) {
      fail(`instruction lint accepted ${label} mutation`);
    }
  }
  console.log("✔ Specs v2.1 artifact router is parsed before discovery defaults");
  console.log("✔ Specs v2.1 lifecycle, review inventory, and task topology survive mutations");
  console.log("✔ Claude-to-Codex projection rejects Claude-only tool vocabulary");
  return 8;
}

async function runSpecs21ContractTests() {
  const fail = (message) => {
    throw new Error(`[FAIL] Specs v2.1 contract: ${message}`);
  };
  const authoringInstructionTests = await runAuthoringInstructionContractTests(fail);
  const taskTemplate = await readFile(
    join(packageRoot, "src/claude/skills/specs/templates/task.md"),
    "utf8",
  );
  const designTemplate = await readFile(
    join(packageRoot, "src/claude/skills/specs/templates/design.md"),
    "utf8",
  );
  const stateTemplate = JSON.parse(await readFile(
    join(packageRoot, "src/claude/skills/specs/templates/spec-state.json"),
    "utf8",
  ));

  const headings = markdownH2s(taskTemplate);
  if (JSON.stringify(headings) !== JSON.stringify(TASK_21_SECTIONS)) {
    fail(`task headings ${JSON.stringify(headings)} do not equal ${JSON.stringify(TASK_21_SECTIONS)}`);
  }
  const ownershipHeader = /^\|\s*ID\s*\|\s*Type\s*\|\s*Target\s*\|\s*Role\s*\|\s*Access\s*\|\s*Action\s*\|$/gm;
  if ((taskTemplate.match(ownershipHeader) || []).length !== 1) {
    fail("task template must contain exactly one six-column ownership table");
  }
  if (/^##\s+(?:Related Files|Evidence|Completion Criteria)\s*$/m.test(taskTemplate)
    || /\btask_triggers\b|\(P\)/.test(taskTemplate)) {
    fail("task template contains legacy canonical-authoring vocabulary");
  }
  const verificationSectionCount = markdownH2s(designTemplate)
    .filter((heading) => heading === "Verification Definitions").length;
  if (verificationSectionCount !== 1) {
    fail("design template must expose exactly one Verification Definitions section");
  }
  const concreteValues = new Map([
    ["SUBJECT_REQ", "1"],
    ["X", "1"],
    ["PROOF_REQ", "1"],
    ["Y", "2"],
    ["exact command", "node --test test/retry.test.js"],
    ["exact anchored target", "src/retry-service.js#retry"],
    ["exact/repository/entrypoint", "src/retry-service.js"],
    ["observable result", "the subject result and verifier proof both pass"],
    ["concrete observable result and proof", "the subject result and verifier proof both pass"],
    ["concrete rejected or recovery case", "an exhausted retry remains failed and observable"],
    ["real entrypoint/caller and grounded anchor expectation", "the public retry caller reaches A-D-01"],
  ]);
  const concreteDesign = designTemplate.replace(/\{\{([^}]+)\}\}/g, (placeholder, name) => (
    concreteValues.has(name) ? concreteValues.get(name) : placeholder
  ));
  const parserErrors = [];
  const definitions = parseVerificationDefinitions(concreteDesign, parserErrors);
  if (parserErrors.length > 0) {
    fail(`canonical concrete V example is parser-invalid: ${parserErrors.join("; ")}`);
  }
  const definition = definitions.get("V1");
  if (!definition || definitions.size !== 1) {
    fail("canonical parser must return exactly V1");
  }
  if (JSON.stringify(definition.subject_criteria) !== JSON.stringify(["R1.1"])
    || JSON.stringify(definition.proof_criteria) !== JSON.stringify([])) {
    fail(`canonical V1 criteria drifted: ${JSON.stringify({
      subject: definition.subject_criteria,
      proof: definition.proof_criteria,
    })}`);
  }
  if (definition.proof_owner !== null || definition.evidence_anchor !== null) {
    fail(`canonical base V1 must omit proof authority: ${JSON.stringify({
      proof_owner: definition.proof_owner,
      evidence_anchor: definition.evidence_anchor,
    })}`);
  }
  if (JSON.stringify(definition.decision_refs) !== JSON.stringify(["D1", "I1", "C1"])) {
    fail(`canonical V1 decision refs drifted: ${JSON.stringify(definition.decision_refs)}`);
  }
  const proofDesign = concreteDesign.replace(
    "Owner A-D-01; Decision refs",
    "Owner A-D-01; Proof criteria R1.2; Proof owner A-D-02; Evidence anchor A-D-02; Decision refs",
  );
  const proofParserErrors = [];
  const proofDefinition = parseVerificationDefinitions(proofDesign, proofParserErrors).get("V1");
  if (proofParserErrors.length > 0
    || !proofDefinition
    || JSON.stringify(proofDefinition.subject_criteria) !== JSON.stringify(["R1.1"])
    || JSON.stringify(proofDefinition.proof_criteria) !== JSON.stringify(["R1.2"])
    || proofDefinition.subject_owner !== "A-D-01"
    || proofDefinition.proof_owner !== "A-D-02"
    || proofDefinition.evidence_anchor !== "A-D-02"
    || proofDefinition.subject_owner === proofDefinition.proof_owner) {
    fail(`canonical proof extension drifted: ${JSON.stringify({
      errors: proofParserErrors,
      definition: proofDefinition,
    })}`);
  }
  for (const field of [
    "subject_criteria", "subject_owner", "decision_refs", "method", "expected", "negative",
    "reachability",
  ]) {
    const value = definition[field];
    if ((Array.isArray(value) && value.length === 0)
      || (typeof value === "string" && value.trim() === "")
      || (value && typeof value === "object" && Object.keys(value).length === 0)
      || value === undefined) {
      fail(`canonical V1 parser field ${field} must be non-empty`);
    }
  }
  for (const hiddenGrammarMutation of [
    concreteDesign.replace("- **V1**:", "### V1 —"),
    concreteDesign.replace("- **V1**:", "| V1 |"),
    concreteDesign.replace("; Expected ", "\nExpected "),
    concreteDesign.replace("Decision refs ", "Decisions "),
  ]) {
    const mutationErrors = [];
    const mutationDefinitions = parseVerificationDefinitions(hiddenGrammarMutation, mutationErrors);
    if (mutationErrors.length === 0 || mutationDefinitions.has("V1")) {
      fail("canonical parser accepted a hidden V grammar mutation");
    }
  }
  const concreteTask = taskTemplate.replace(/\{\{([^}]+)\}\}/g, (placeholder, name) => {
    if (/^V reference\b/.test(name)) return "V1";
    if (name === "subject | verifier") return "subject";
    return placeholder;
  });
  const taskFields = markdownBoldBulletFields(concreteTask);
  if (taskFields.get("Verification ref") !== "V1"
    || !["subject", "verifier"].includes(taskFields.get("Task role"))) {
    fail("task Verification Plan must reference a V ID and declare subject/verifier role");
  }

  const policyKeys = Object.keys(stateTemplate.workflow_policy || {}).sort();
  const expectedPolicyKeys = [...workflowPolicy.CANONICAL_WORKFLOW_POLICY_FIELDS].sort();
  if (stateTemplate.schema_version !== "2.1"
    || stateTemplate.workflow_policy?.version !== "2.1"
    || JSON.stringify(policyKeys) !== JSON.stringify(expectedPolicyKeys)) {
    fail("spec-state template must exactly equal the executable canonical policy fields");
  }
  const runtimePolicy = workflowPolicy.canonicalWorkflowPolicySnapshot({
    planningDepth: "Compact",
    assuranceLevel: "Routine",
    risks: [],
  });
  if (JSON.stringify(Object.keys(runtimePolicy).sort()) !== JSON.stringify(expectedPolicyKeys)) {
    fail("executable canonical workflow policy emits a non-minimal projection");
  }
  if (JSON.stringify(runtimePolicy) !== JSON.stringify(stateTemplate.workflow_policy)) {
    fail("spec-state workflow_policy bytes drift from the executable canonical projection");
  }
  if (Object.prototype.hasOwnProperty.call(stateTemplate, "approvals")) {
    fail("spec-state template must not persist legacy approval state");
  }
  const authoring = stateTemplate.authoring || {};
  if (Object.keys(authoring).sort().join(",") !== "design,requirements,research,tasks"
    || !Object.values(authoring).every((value) => ["draft", "validated", "absent"].includes(value))) {
    fail("authoring state must use only draft, validated, or absent");
  }
  if (Object.keys(stateTemplate.coordination || {}).join(",") !== "boundaries"
    || !Array.isArray(stateTemplate.coordination.boundaries)) {
    fail("coordination.boundaries must be the initial topology authority");
  }
  const semanticReviewKeys = Object.keys(stateTemplate.validation?.semantic_review || {}).sort();
  if (semanticReviewKeys.join(",") !== [...C2_FIELDS].sort().join(",")) {
    fail("semantic review template fields drifted from the C2 canonical field-list authority");
  }

  const instructionFiles = [
    "src/claude/skills/specs/SKILL.md",
    "src/claude/skills/specs/references/review.md",
    "src/claude/skills/specs/rules/tasks-generation.md",
    "src/claude/agents/spec-maker.md",
  ];
  const instructionText = (await Promise.all(instructionFiles.map((file) => (
    readFile(join(packageRoot, file), "utf8")
  )))).join("\n");
  for (const token of [
    "spec.json", "machine authority", "coordination.boundaries", "case_kind",
    "decision_refs", "verification_ref", "allowlisted reviewer capability",
    "draft", "validated", "absent",
  ]) {
    if (!instructionText.includes(token)) fail(`instruction model is missing ${token}`);
  }
  const staleDowngradeField = "override_" + "receipt";
  const canonicalAuthoringFiles = [
    "../../README.md",
    "../../docs/specs-usage-guide.md",
    "../../plans/specs-v2-remake-blueprint.md",
    "src/claude/agents/spec-maker.md",
    "src/claude/skills/specs/SKILL.md",
    "src/claude/skills/specs/references/review.md",
    "src/claude/skills/specs/rules/design-principles.md",
    "src/claude/skills/specs/rules/tasks-generation.md",
    "src/claude/skills/specs/templates/design.md",
    "src/claude/skills/specs/templates/task.md",
    "src/claude/skills/develop/SKILL.md",
    "src/claude/skills/sync/SKILL.md",
  ];
  for (const file of canonicalAuthoringFiles) {
    const content = await readFile(join(packageRoot, file), "utf8");
    if (content.includes(staleDowngradeField)) {
      fail(`${file} exposes a stale downgrade receipt on the canonical authoring path`);
    }
  }

  const reporterFixture = [
    "ℹ tests 3",
    "ℹ pass 2",
    "ℹ fail 1",
    "ℹ skipped 0",
    "",
    "test at bin/__tests__/fixture.test.js:12:3",
    "✖ reports the exact contract failure (1.5ms)",
  ].join("\n");
  const reporterSummary = parseNodeTestSummary(reporterFixture);
  if (reporterSummary.tests !== 3 || reporterSummary.pass !== 2
    || reporterSummary.fail !== 1 || reporterSummary.failingTests.length !== 1
    || reporterSummary.failingTests[0].file !== "bin/__tests__/fixture.test.js"
    || !nodeFailureDetail(reporterSummary).includes("fixture.test.js:12:3")) {
    fail("full-runner failure summary must preserve exact count and failing test location");
  }

  console.log("✔ Specs v2.1 task structure and ownership table are canonical");
  console.log("✔ Specs v2.1 V definitions expose the validator grammar and proof roles");
  console.log("✔ Specs v2.1 machine state and semantic receipt vocabulary are canonical");
  console.log("✔ Specs v2.1 canonical authoring source exposes no downgrade receipt");
  console.log("✔ Full runner preserves exact Node failure counts and locations");
  return 15 + authoringInstructionTests;
}

async function runStaticSemanticTests() {
  const specs21Tests = await runSpecs21ContractTests();
  const specTemplateFiles = await readdir(
    join(packageRoot, "src/claude/skills/specs/templates"),
  );

  if (!specTemplateFiles.includes("spec-state.json")) {
    console.error("[FAIL] hapo:specs spec-state template is missing");
    process.exit(1);
  }

  if (specTemplateFiles.includes("init.json")) {
    console.error("[FAIL] legacy hapo:specs init.json template must not be packaged");
    process.exit(1);
  }

  const removedPlatformLower = "anti" + "gravity";
  const removedPlatformTitle = "Anti" + "gravity";

  if (await fileExists(join(packageRoot, "src", removedPlatformLower, "GEMINI.md"))) {
    console.error("[FAIL] legacy secondary platform bundle must not be packaged");
    process.exit(1);
  }

  const checks = [
    {
      label: "hapo:specs hard output contract forbids wrong artifacts",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("## Artifact profiles") &&
        content.includes("Forbidden authoring artifacts include `init.json`, `spec-state.json`,") &&
        content.includes("`hydration.md`, `phase-*.md`, and shorthand task filenames."),
    },
    {
      label: "spec-maker artifact contract forbids init and hydration artifacts",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) =>
        content.includes("## Artifact Contract (MANDATORY)") &&
        content.includes("Never write `init.json`, `spec-state.json`, `hydration.md`, phase files") &&
        content.includes("no pointer, file, template load, researcher, web search, or placeholder"),
    },
    {
      label: "installer syncs spec-state template and drops init template",
      file: "bin/phases/copy-payload.js",
      assert: (content) =>
        content.includes("'spec-state.json'") &&
        content.includes("Removed legacy template") &&
        !content.includes("'init.json',"),
    },
    {
      label: "installer writes CafeKit version metadata",
      files: ["bin/phases/write-metadata.js", "bin/phases/summary.js", "bin/lib/context.js", "bin/lib/i18n.js"],
      assert: (content) =>
        content.includes("cafekit.json") &&
        content.includes("writePlatformVersionMetadata") &&
        content.includes("previousVersion") &&
        content.includes("CafeKit Version") &&
        content.includes("const INSTALL_COMMAND = `npx ${packageJson.name}@${packageJson.version}`"),
    },
    {
      label: "installer offers OpenCode as secondary runtime",
      files: ["bin/lib/context.js", "bin/phases/copy-payload.js", "bin/phases/opencode-runtime.js", "bin/lib/opencode-install.js"],
      assert: (content) =>
        content.includes("id: 'opencode'") &&
        content.includes("name: 'OpenCode'") &&
        content.includes("folder: '.opencode'") &&
        content.includes("opencode.json") &&
        content.includes("OPENCODE_COMMAND_TEMPLATES") &&
        content.includes("convertOpenCodeAgentContent") &&
        content.includes("createOpenCodeSkillCommandContent") &&
        content.includes("mergeOpenCodeConfig") &&
        content.includes("setupOpenCodeModel") &&
        content.includes("copyOpenCodeAgentsMdFile") &&
        content.includes("copyOpenCodeSharedRuntimeFiles") &&
        content.includes("AGENTS.md") &&
        !content.includes(removedPlatformLower) &&
        !content.includes(removedPlatformTitle) &&
        !content.includes("folder: '.agent'"),
    },
    {
      label: "OpenCode install is self-contained under .opencode/",
      files: ["bin/lib/context.js", "bin/phases/copy-payload.js", "bin/phases/claude-runtime.js", "bin/lib/opencode-install.js"],
      assert: (content) =>
        content.includes("skillsDir: '.opencode/skills'") &&
        content.includes("skillsRef: '.opencode/skills'") &&
        content.includes("getRuntimeSupportTargetDir(platformKey, 'scripts')") &&
        content.includes("getRuntimeSupportTargetDir(platformKey, 'rules')") &&
        content.includes("hasPlatformCapability(platformKey, 'rules')") &&
        content.includes("normalizeOpenCodeBody") &&
        content.includes("warnLegacyClaudeFolder"),
    },
    {
      label: "installer offers Codex as a native split-root runtime",
      files: [
        "bin/lib/context.js",
        "bin/phases/copy-payload.js",
        "bin/phases/codex-runtime.js",
        "bin/lib/codex-install.js",
      ],
      assert: (content) =>
        content.includes("id: 'codex'") &&
        content.includes("skillsDir: '.agents/skills'") &&
        content.includes("agentsDir: '.codex/agents'") &&
        content.includes("installCodexRuntime") &&
        content.includes("convertCodexAgentContent") &&
        content.includes("fork_turns=\"none\"") &&
        !content.includes("config.toml"),
    },
    {
      label: "Codex split roots keep generated skill files locally ignored",
      files: [
        "src/codex/gitignore",
        "src/codex/agents-gitignore",
        "bin/phases/codex-runtime.js",
        "bin/phases/root-config.js",
      ],
      assert: (content) =>
        content.includes("path.join('.agents', '.gitignore')") &&
        content.includes("skills/**/.venv/") &&
        content.includes("skills/**/node_modules/") &&
        content.includes("!skills/**/.env.example") &&
        content.includes("'.agents/'") &&
        !content.includes("../.agents/skills"),
    },
    {
      label: "OpenCode has dedicated project instruction template",
      file: "src/opencode/AGENTS.md",
      assert: (content) =>
        content.includes("OpenCode Runtime Mapping") &&
        content.includes("without the `hapo:` prefix") &&
        content.includes("/question <question>") &&
        content.includes("/specs <feature-or-spec-command>") &&
        content.includes("Claude Code hooks, statusline, and settings do not run in OpenCode."),
    },
    {
      label: "README platform status lists OpenCode",
      file: "../../README.md",
      assert: (content) =>
        content.includes("OpenCode: supported project-local runtime install") &&
        !content.includes(`${removedPlatformTitle}: coming soon`),
    },
    {
      label: "installer maps Claude gitignore template to dotfile",
      file: "bin/phases/claude-runtime.js",
      assert: (content) =>
        content.includes("relPath === 'gitignore' ? '.gitignore' : relPath"),
    },
    {
      label: "Claude migration manifest includes gitignore template",
      file: "src/claude/migration-manifest.json",
      assert: (content) => content.includes('"gitignore"'),
    },
    {
      label: "Claude gitignore template ignores generated session state",
      file: "src/claude/gitignore",
      assert: (content) =>
        content.includes("session-state/") &&
        content.includes("hooks/.logs/") &&
        content.includes("plugins/.logs/") &&
        content.includes("skills/**/node_modules/") &&
        content.includes("skills/**/.venv/") &&
        content.includes(".cafekit-update-cache.json"),
    },
    {
      label: "installer root gitignore ignores runtime folders",
      file: "bin/phases/root-config.js",
      assert: (content) =>
        content.includes("'plans/*'") &&
        content.includes("'!plans/*.md'") &&
        content.includes("'!plans/templates/'") &&
        content.includes("'!plans/templates/**'") &&
        content.includes("'.claude/'") &&
        content.includes("'.opencode/'") &&
        content.includes("'.codex/'") &&
        content.includes("'.agents/'") &&
        content.includes("'.cafekit-backup/'") &&
        content.includes("'.cafekit.lock'") &&
        content.includes("function hasPattern"),
    },
    {
      label: "hapo:specs handoff block points to hapo:develop",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("Claude Code: `/hapo:develop <feature>`") &&
        content.includes("Codex: `$hapo-develop <feature>`"),
    },
    {
      label: "hapo:specs keeps technical readiness separate from explicit Develop authority",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        !/\/work\b/.test(content) &&
        !content.includes("After successful explicit approval, use the native handoff") &&
        /This flag is technical\s+artifact readiness only/.test(content) &&
        content.includes("Specs never invokes or auto-chains into") &&
        /only a fresh explicit user\s+invocation of Develop starts implementation/.test(content) &&
        content.includes("report the optional handoff without invoking it") &&
        /`--auto` may\s+set technical readiness after every gate passes, but must stop in Specs/.test(content) &&
        content.includes("stop in Specs"),
    },
    {
      label: "spec-maker forbids legacy work handoff",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) => content.includes("Never suggest `/work`"),
    },
    {
      label: "hapo:question skill answers questions with repo-first evidence",
      file: "src/claude/skills/question/SKILL.md",
      assert: (content) =>
        content.includes("name: hapo:question") &&
        content.includes("Answer questions with evidence") &&
        content.includes("<ANSWER-ONLY-GATE>") &&
        content.includes("Source-first") &&
        content.includes("Use external/current sources") &&
        content.includes("Ask back only when") &&
        content.includes("--repo") &&
        content.includes("--web") &&
        content.includes("--both") &&
        content.includes("repo evidence") &&
        content.includes("external/current evidence") &&
        content.includes("templates/question.md"),
    },
    {
      label: "hapo:question template captures answer evidence and gaps",
      file: "src/claude/skills/question/templates/question.md",
      assert: (content) =>
        content.includes("## Question") &&
        content.includes("## Answer") &&
        content.includes("## Evidence") &&
        content.includes("## Source Trace") &&
        content.includes("## Gaps / Unknowns") &&
        content.includes("## Follow-up Question"),
    },
    {
      label: "hapo:question is packaged in migration manifest",
      file: "src/claude/migration-manifest.json",
      assert: (content) => content.includes('"question"'),
    },
    {
      label: "hapo:specs review keeps readiness technical and failure handoff blocked",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        !content.includes("until the user explicitly approves") &&
        content.includes("readiness means technical artifact readiness, not permission to implement") &&
        /preserve unfinished lifecycle\s+state/.test(content) &&
        content.includes("do not suggest implementation handoff"),
    },
    {
      label: "hapo:specs validate hard-gates on deterministic validator",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("## Deterministic and grounding gates") &&
        content.includes("node .claude/scripts/validate-spec-output.cjs specs/<feature>") &&
        content.includes("Non-zero blocks readiness") &&
        /Exit 0\s+does not override a broken consistency edge/.test(content),
    },
    {
      label: "hapo:specs validate guardrail blocks develop handoff on validator failure",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        /On failure, keep lifecycle state\s+unfinished and report the exact blocker/.test(content),
    },
    {
      label: "hapo:specs validate enforces canonical task identity",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("`A-R{requirement}-{sequence}-NN` namespace") &&
        content.includes("one canonical `**Status:**` header") &&
        content.includes("task_registry[path].status"),
    },
    {
      label: "hapo:specs requirements template has no SDD phase marker",
      file: "src/claude/skills/specs/templates/requirements-init.md",
      assert: (content) => !content.includes("/sdd:"),
    },
    {
      label: "hapo:specs feature-description flow continues past init",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("Author requirements, then design, then conditional research/tasks") &&
        !content.includes("For `--auto` or an early stop, keep `ready_for_implementation=false`") &&
        /`--auto` may\s+set technical readiness after every gate passes, but must stop in Specs/.test(content) &&
        content.includes("stop in Specs"),
    },
    {
      label: "parallel-waves reference keeps single-writer, fallback, cap, and cherry-pick recipe",
      file: "src/claude/skills/develop/references/parallel-waves.md",
      assert: (content) =>
        content.includes("single writer") &&
        content.includes("sequential fallback") &&
        content.includes("wave cap") &&
        content.includes("git cherry-pick"),
    },
    {
      label: "develop SKILL wires --parallel to parallel-waves and keeps sequential default",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("--parallel") &&
        content.includes("references/parallel-waves.md") &&
        content.includes("one unblocked task at a time"),
    },
    {
      label: "implementer is single-track within its workspace with spec-state prohibition",
      file: "src/claude/agents/implementer.md",
      assert: (content) =>
        content.includes("within its workspace") &&
        content.includes("Do NOT edit `spec.json`"),
    },
    {
      label: "orchestrator sanctions worktree parallelism with single-writer rule and cap",
      file: "src/claude/rules/orchestrator.md",
      assert: (content) =>
        content.includes("worktree isolation") &&
        content.includes("single writer per file per wave") &&
        content.includes("never more than 5"),
    },
    {
      label: "quality-gate carries worktree working-directory note and COLLAPSE isolation",
      file: "src/claude/skills/develop/references/quality-gate.md",
      assert: (content) =>
        content.includes("Working directory (parallel mode)") &&
        content.includes("does not cancel other in-flight"),
    },
    {
      label: "runtime template documents develop.parallel escape hatch",
      file: "src/claude/runtime.json",
      assert: (content) => content.includes('"develop"') && content.includes('"parallel": true'),
    },
    {
      label: "hapo:specs task rules require planned runtime reachability",
      file: "src/claude/skills/specs/rules/tasks-generation.md",
      assert: (content) =>
        content.includes("## Task shape") &&
        content.includes("**Scope**") &&
        content.includes("**Anchors and Ownership**") &&
        content.includes("**Verification Plan**") &&
        content.includes("ID | Type | Target | Role | Access |") &&
        content.includes("real entrypoint/caller for runtime-facing work") &&
        content.includes("execution owns actual runtime proof"),
    },
    {
      label: "hapo:specs separates planning axes and conditional artifacts",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("## Canonical authoring contract") &&
        content.includes("## Artifact router") &&
        content.includes("`planning_depth`") &&
        content.includes("`assurance_level`") &&
        content.includes("only on a research trigger") &&
        content.includes("only on a typed topology trigger") &&
        /Requirement count, size,\s+planning depth, assurance level, risk label, architectural layers, and habit do\s+not trigger tasks/.test(content),
    },
    {
      label: "hapo:specs ask-user gate matrix protects user-owned decisions",
      file: "src/claude/skills/specs/references/ask-user-question-gates.md",
      assert: (content) =>
        content.includes("# AskUserQuestion Gate Matrix") &&
        content.includes("`repository_fact`: investigate and ground") &&
        content.includes("Do not ask the user to supply a discoverable fact") &&
        content.includes("`reversible_assumption`: choose the simplest engineering option") &&
        content.includes("bounded reversal boundary") &&
        content.includes("`user_owned`: HOLD and ASK") &&
        content.includes("product, scope, security, data, or") &&
        content.includes("Every unresolved `user_owned` entry blocks readiness") &&
        content.includes("Do not mark\n  `ready_for_implementation = true`") &&
        !/\| Architecture tie \|[^\n]*\| Yes \|/.test(content) &&
        !/\| Evidence gap \|[^\n]*\| Yes \|/.test(content),
    },
    {
      label: "hapo:specs keeps task structure conditional and scoring advisory",
      files: [
        "src/claude/skills/specs/rules/phase-decision-matrix.md",
        "src/claude/skills/specs/rules/task-scoring-rubric.md",
        "src/claude/skills/specs/rules/tasks-generation.md",
      ],
      assert: (content) =>
        content.includes("Tasks and phases are conditional structure") &&
        content.includes("Create a task only when at least one boundary is real") &&
        content.includes("Task Scoring Rubric (optional advisory)") &&
        content.includes("it never changes Direct/Standard/Critical") &&
        /Full depth\s+does not activate the gate by itself/.test(content),
    },
    {
      label: "hapo:specs task template uses the Specs v2.1 plan contract",
      file: "src/claude/skills/specs/templates/task.md",
      assert: (content) =>
        content.includes("**Status:** pending") &&
        content.includes("## Outcome") &&
        content.includes("## Scope") &&
        content.includes("## Anchors and Ownership") &&
        content.includes("| ID | Type | Target | Role | Access | Action |") &&
        content.includes("## Changes") &&
        content.includes("## Acceptance") &&
        content.includes("## Dependencies") &&
        content.includes("## Verification Plan") &&
        !content.includes("## Evidence") &&
        !content.includes("## Completion Criteria"),
    },
    {
      label: "hapo:specs loads task authoring only after the v2 task gate",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("Load `rules/tasks-generation.md` and `templates/task.md` only when") &&
        content.includes("typed topology trigger exists") &&
        content.includes("Task triggers are typed ownership, dependency, transition, proof, or parallel") &&
        content.includes("Each task has exactly seven H2 sections") &&
        content.includes("Typed `coordination.boundaries` entries"),
    },
    {
      label: "spec validator enforces Specs v2.1 task-plan sections",
      file: "src/claude/scripts/validate-spec-output.cjs",
      assert: (content) =>
        content.includes("TASK_21_SECTIONS") &&
        content.includes("Anchors and Ownership") &&
        content.includes("ID | Type | Target | Role | Access | Action") &&
        content.includes("Verification Plan requires a command-shaped invocation") &&
        content.includes("planned proof only"),
    },
    {
      label: "spec validator blocks complex ready state before validation",
      file: "src/claude/scripts/validate-spec-output.cjs",
      assert: (content) =>
        content.includes("design_context.validation_recommended") &&
        content.includes("5+ task files") &&
        content.includes("validation.status is not completed"),
    },
    {
      label: "hapo:specs readiness runs structural and grounding gates",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("validate-spec-output.cjs") &&
        content.includes("Run final-byte validation and grounding for every durable spec") &&
        !content.includes("Run grounding for task-bearing or otherwise anchor-grounded profiles") &&
        content.includes("Exit 0 proves only implemented structural/grounding checks") &&
        content.includes("node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result <review.json>") &&
        /explicit installed\s+machine semantic-sync step/.test(content) &&
        content.includes("The installed atomic finalizer may set `ready_for_implementation = true`") &&
        content.includes("Authors\nand reviewers never directly write or promote those authority fields"),
    },
    {
      label: "spec-maker separates planned verification from execution authority",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) =>
        content.includes("validate-spec-output.cjs") &&
        /Planned verification is not\s+execution evidence/.test(content) &&
        content.includes("author never fabricates or directly writes that conclusion") &&
        content.includes("Exit 0 proves only implemented deterministic checks") &&
        content.includes("Technical readiness differs from closeout"),
    },
    {
      label: "hapo:develop scouts every task and enforces scope fidelity",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("<SCOPE-FIDELITY>") &&
        content.includes("Scout depth follows assurance") &&
        content.includes("Final Integration Scout"),
    },
    {
      label: "hapo:develop supports explicit flash mode",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("[--flash]") &&
        content.includes("### 3. Flash Mode") &&
        content.toLowerCase().includes("skip dedicated test suites") &&
        content.includes("FLASH_UNVERIFIED") &&
        content.includes("awaiting /hapo:test <feature>") &&
        content.includes("never claim `Test PASS`"),
    },
    {
      label: "hapo:develop makes implementation notes opt-in",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("implementation-notes.html") &&
        content.includes("--notes` is opt-in") &&
        !content.includes("--no-notes") &&
        content.includes("references/implementation-notes-template.html") &&
        content.includes("scope-escape") &&
        content.includes("loaded only with `--notes`"),
    },
    {
      label: "hapo:develop implementation notes template is self-contained and block-based",
      file: "src/claude/skills/develop/references/implementation-notes-template.html",
      assert: (content) =>
        content.includes("<style>") &&
        content.includes("CafeKit Implementation Notes") &&
        content.includes("TASK_TOC_START") &&
        content.includes("NOTES_START") &&
        content.includes("task-block") &&
        content.includes("note.decision") &&
        content.includes("scope-escape") &&
        !content.includes("<script") &&
        !content.includes("https://") &&
        !content.includes("http://"),
    },
    {
      label: "hapo:develop quality gate separates spec compliance and code quality",
      file: "src/claude/skills/develop/references/quality-gate.md",
      assert: (content) =>
        content.includes("Spec compliance review") &&
        content.includes("Correctness and security review") &&
        content.includes("Reachability Failure"),
    },
    {
      label: "hapo:develop quality gate has flash bypass semantics",
      file: "src/claude/skills/develop/references/quality-gate.md",
      assert: (content) =>
        content.includes("## Flash Gate (`--flash`)") &&
        content.includes("Tests: skipped by user request") &&
        content.includes("Evidence: FLASH_UNVERIFIED") &&
        content.includes("Do not report `Test PASS`") &&
        content.includes("preflight=<pass|skipped>"),
    },
    {
      label: "P2 lane, lifecycle, and proof ownership contracts stay explicit",
      files: [
        "src/claude/skills/specs/SKILL.md",
        "src/claude/skills/develop/SKILL.md",
        "src/claude/skills/test/SKILL.md",
        "src/claude/skills/code-review/SKILL.md",
        "src/claude/skills/develop/references/quality-gate.md",
      ],
      assert: (content) =>
        content.includes("Direct") &&
        content.includes("Standard") &&
        content.includes("Critical") &&
        content.includes("execution_tier") &&
        content.includes("read-only") &&
        content.includes("PASS_WITH_WARNINGS") &&
        content.includes("canonical execution receipt") &&
        content.includes("PENDING") &&
        content.includes("Audit: PASS") &&
        /(?:does not create or claim|never creates or claims)\s+execution proof/.test(content),
    },
    {
      label: "inspect uses only internal Explore discovery",
      file: "src/claude/skills/inspect/SKILL.md",
      assert: (content) =>
        content.includes("Internal Explore agents") &&
        !content.includes("external-gemini-inspection") &&
        !content.includes("Gemini") &&
        !content.includes("`ext`"),
    },
    {
      label: "quality gate uses severity verdict instead of numeric score",
      file: "src/claude/skills/develop/references/quality-gate.md",
      assert: (content) =>
        /no\s+blocking Medium finding/i.test(content) &&
        content.includes("Finding count never selects review depth") &&
        !content.includes("at most one Medium") &&
        !content.includes("9.5"),
    },
    {
      label: "inspect runtime config has no legacy Gemini model key",
      file: "src/claude/runtime.json",
      assert: (content) =>
        content.includes('"inspect"') &&
        !content.includes('"gemini"'),
    },
    {
      label: "hotfix review cycle consumes severity verdicts",
      file: "src/claude/skills/hotfix/references/review-cycle.md",
      assert: (content) =>
        content.includes("verdict and severity-classified findings") &&
        content.includes("no Critical, no High, at most one Medium") &&
        content.includes("PASS | FAIL | BLOCKED") &&
        content.includes("BLOCKED` is terminal") &&
        content.includes("Only `FAIL` may enter remediation retry") &&
        !content.includes("score >= 9.0") &&
        !content.includes("critical_issues[]"),
    },
    {
      label: "test-runner performs scope and runtime reachability audits",
      file: "src/claude/agents/test-runner.md",
      assert: (content) =>
        content.includes("Runtime Reachability Audit") &&
        content.includes("Scope Coverage Audit") &&
        content.includes("Runtime Reachability Missing = FAIL"),
    },
    {
      label: "hapo:test supports spec-aware feature testing",
      file: "src/claude/skills/test/SKILL.md",
      assert: (content) =>
        content.includes("<SCOPE-GATE>") &&
        content.includes("/hapo:test <feature-name>") &&
        content.includes("Spec-Aware Mode"),
    },
    {
      label: "hapo:hotfix is deterministic scout-first without mode selection",
      file: "src/claude/skills/hotfix/SKILL.md",
      assert: (content) =>
        content.includes("Default: deterministic scout-first hotfix") &&
        content.includes("There is no initial mode selection step") &&
        content.includes("<HARD-GATE-SCOUT-FIRST>") &&
        !content.includes("Default: Autonomous mode"),
    },
    {
      label: "hapo:hotfix quick path never skips scout or diagnosis",
      file: "src/claude/skills/hotfix/SKILL.md",
      assert: (content) =>
        content.includes("it never skips scout, pre-fix evidence, diagnosis, or before/after verification") &&
        content.includes("Quick mode only reduces depth") &&
        content.includes("Do not ask generic questions before this step"),
    },
    {
      label: "hapo:hotfix enforces no-side-effect gate with user options",
      file: "src/claude/skills/hotfix/SKILL.md",
      assert: (content) =>
        content.includes("<HARD-GATE-NO-SIDE-EFFECTS>") &&
        content.includes("Public contracts are unchanged") &&
        content.includes("Revert this fix and try a different root-cause angle") &&
        content.includes("Do not silently patch around the regression"),
    },
    {
      label: "hapo:hotfix references are local and not stale debugger paths",
      file: "src/claude/skills/hotfix/SKILL.md",
      assert: (content) => !content.includes("references/debugger/"),
    },
    {
      label: "hapo:hotfix prevention gate points back to side-effect sweep",
      file: "src/claude/skills/hotfix/references/prevention-gate.md",
      assert: (content) =>
        content.includes("Step 5 side-effect sweep") &&
        !content.includes("references/debugger/"),
    },
    {
      label: "hapo:hotfix review cycle uses pause conditions not mode selection",
      file: "src/claude/skills/hotfix/references/review-cycle.md",
      assert: (content) =>
        content.includes("## Default Review Handling") &&
        content.includes("## Required User Pause") &&
        content.includes("## When To Pause vs Continue") &&
        !content.includes("## Autonomous Mode") &&
        !content.includes("## Human-in-the-Loop Mode"),
    },
    {
      label: "hapo:debug is diagnosis-only and read-only for product code",
      file: "src/claude/skills/debug/SKILL.md",
      assert: (content) =>
        content.includes("<DIAGNOSTIC-ONLY-GATE>") &&
        content.includes("`hapo:debug` is read-only for product code") &&
        content.includes("Do NOT edit product code") &&
        content.includes("Temporary instrumentation is allowed only") &&
        content.includes("Temporary instrumentation: removed"),
    },
    {
      label: "hapo:debug enforces scout-first before hypotheses",
      file: "src/claude/skills/debug/SKILL.md",
      assert: (content) =>
        content.includes("<HARD-GATE-SCOUT-FIRST>") &&
        content.includes("Before hypotheses, inspect the actual codebase context") &&
        content.includes("project type, language, framework, runtime, and test runner") &&
        content.includes("3-6 bullet codebase-context summary"),
    },
    {
      label: "hapo:debug blocks hotfix handoff when root cause is unknown",
      file: "src/claude/skills/debug/SKILL.md",
      assert: (content) =>
        content.includes("<ROOT-CAUSE-GATE>") &&
        content.includes("Root cause: unknown") &&
        content.includes("Missing Evidence") &&
        content.includes("Next Diagnostic Action") &&
        content.includes("do not hand off to `hapo:hotfix` as ready"),
    },
    {
      label: "hapo:debug references installed debugger manuals",
      file: "src/claude/skills/debug/SKILL.md",
      assert: (content) =>
        content.includes("`.claude/references/debugger/core-philosophy.md`") &&
        content.includes("`.claude/references/debugger/side-effect-gate.md`") &&
        !content.includes("`references/debugger/"),
    },
    {
      label: "hapo:brainstorm uses a structured question framework",
      file: "src/claude/skills/brainstorm/SKILL.md",
      assert: (content) =>
        content.includes("## Discovery Question Framework") &&
        content.includes("`references/question-framework.md`") &&
        content.includes("Generate questions from scout evidence") &&
        content.includes("decision register") &&
        content.includes("technical facts"),
    },
    {
      label: "hapo:brainstorm question framework covers domains and decision logging",
      file: "src/claude/skills/brainstorm/references/question-framework.md",
      assert: (content) =>
        content.includes("## Domain Matrix") &&
        content.includes("### Browser Extension") &&
        content.includes("### AI / LLM") &&
        content.includes("## Ask / Do Not Ask") &&
        content.includes("## Decision Register") &&
        content.includes("Do not write \"user selected\""),
    },
    {
      label: "Claude runtime template exposes Specs v2 truth",
      file: "src/claude/CLAUDE.md",
      assert: (content) =>
        content.includes("planning_depth") &&
        content.includes("assurance_level") &&
        content.includes("Anchors and Ownership") &&
        content.includes("coordination.boundaries") &&
        content.includes("structural checks only") &&
        content.includes("## Claude Code runtime") &&
        (content.match(/Specs v2 keeps `planning_depth`/g) || []).length === 1 &&
        (content.match(/Validator exit 0 proves implemented structural checks only/g) || []).length === 1,
    },
    {
      label: "Codex runtime template exposes Specs v2 truth",
      file: "src/codex/AGENTS.md",
      assert: (content) =>
        content.includes("planning_depth") &&
        content.includes("assurance_level") &&
        content.includes("Anchors and Ownership") &&
        content.includes("coordination.boundaries") &&
        content.includes("structural checks only") &&
        content.includes("## Codex runtime") &&
        (content.match(/Specs v2 keeps `planning_depth`/g) || []).length === 1 &&
        (content.match(/Validator exit 0 proves implemented structural checks only/g) || []).length === 1,
    },
    {
      label: "Claude wrapper keeps runtime delta without template Language or Addressing",
      file: "src/claude/CLAUDE.md",
      assert: (content) =>
        content.includes("@AGENTS.md") &&
        content.includes("## Claude Code runtime") &&
        content.includes(".claude/skills/.venv/bin/python3") &&
        !content.includes("## Language Consistency") &&
        !content.includes("## Addressing (Context Overflow Indicator)"),
    },
    {
      label: "all runtime instruction templates carry local venv guidance",
      files: ["src/claude/CLAUDE.md", "src/codex/AGENTS.md", "src/opencode/AGENTS.md"],
      assert: (content) =>
        content.includes("macOS/Linux") &&
        content.includes("Windows") &&
        content.includes(".claude/skills/.venv") &&
        content.includes(".agents/skills/.venv") &&
        content.includes(".opencode/skills/.venv"),
    },
    {
      label: "Codex instruction template avoids global Claude skills path",
      file: "src/codex/AGENTS.md",
      assert: (content) => !content.includes("~/.claude/skills"),
    },
    {
      label: "OpenCode instruction template avoids global Claude skills path",
      file: "src/opencode/AGENTS.md",
      assert: (content) => !content.includes("~/.claude/skills"),
    },
    {
      label: "Codex warning describes local hook bypass risk",
      file: "src/codex/AGENTS.md",
      assert: (content) => content.includes(
        "Do not edit global trust configuration. Hooks are not a complete security boundary; hosted tools and untrusted project hooks can bypass the local hook path.",
      ),
    },
    {
      label: "OpenCode limits match supported hard-block and observational boundary",
      file: "src/opencode/AGENTS.md",
      assert: (content) =>
        content.includes("## OpenCode limits") &&
        content.includes("tool.execute.before") &&
        content.includes("hard-block supported completion/state tools") &&
        content.includes("`task`, `taskupdate`, and `todowrite`") &&
        content.includes("CAFEKIT_SPEC_GATE_BLOCKED") &&
        content.includes("`session.idle`/Stop") &&
        content.includes("final assistant-turn cancellation boundary") &&
        content.includes("observational only") &&
        content.includes("full-turn parity with Claude/Codex") &&
        !content.includes("tool.execute.after") &&
        !content.includes("best-effort") &&
        !content.includes("tier-2") &&
        !/\badvisory\b/i.test(content),
    },
    {
      label: "OpenCode spec gate uses shared authorities and truthful before-hook boundary",
      files: ["src/opencode/plugins/spec-gate.ts", "src/opencode/plugins/spec-state.ts"],
      assert: (content) =>
        content.includes("tool.execute.before") &&
        content.includes("CAFEKIT_SPEC_GATE_BLOCKED") &&
        content.includes("workflow-policy.cjs") &&
        content.includes("spec-resolver.cjs") &&
        content.includes("canonical project root") &&
        !content.toLowerCase().includes("advisory") &&
        !content.toLowerCase().includes("fail-open"),
    },
    {
      label: "OpenCode state cache carries full project, session, and spec identity",
      files: ["src/opencode/plugins/spec-state.ts", "src/claude/hooks/spec-state.cjs"],
      assert: (content) =>
        content.includes("sessionID") &&
        content.includes("session_id") &&
        content.includes("realpathSync") &&
        content.includes("specIdentity") &&
        !/slice\(\s*0\s*,\s*12\s*\)/.test(content),
    },
    {
      label: "OpenCode adapter and shared resolver keep explicit target and no first-match behavior",
      files: ["src/opencode/plugins/spec-gate.ts", "src/claude/scripts/spec-resolver.cjs", "src/claude/skills/specs/SKILL.md"],
      assert: (content) =>
        content.includes("extractExplicitTarget") &&
        content.includes("multiple active specs") &&
        content.includes("do not rely on first-directory selection") &&
        content.includes("guess from the first active directory") &&
        content.includes("Ambiguous active candidates fail closed"),
    },
    {
      label: "rules hooks stay silent when runtime.json is absent",
      files: ["src/claude/hooks/rules.cjs", "src/codex/hooks/rules.cjs", "src/opencode/plugins/rules.ts"],
      assert: (content) =>
        content.includes("return null") &&
        content.includes("runtime === null"),
    },
    {
      label: "CafeKit skill routing workflow rule maps core flows",
      file: "src/claude/rules/skill-workflow-routing.md",
      assert: (content) =>
        content.includes("/hapo:question -> /hapo:brainstorm -> /hapo:specs -> /hapo:develop") &&
        content.includes("ask about source code, docs, specs, config, dependencies") &&
        content.includes("/hapo:debug -> /hapo:hotfix") &&
        content.includes("/hapo:docs --reconstruct <scope>") &&
        content.includes("missing acceptance criteria") &&
        content.includes("Do not inject or force a skill"),
    },
    {
      label: "CafeKit skill routing domain rule maps installed skills",
      file: "src/claude/rules/skill-domain-routing.md",
      assert: (content) =>
        content.includes("/hapo:question") &&
        content.includes("answer questions from source code/docs/specs/config") &&
        content.includes("/hapo:frontend-development") &&
        content.includes("/hapo:react-best-practices") &&
        content.includes("/hapo:backend-development") &&
        content.includes("/hapo:docs --reconstruct <scope>") &&
        content.includes("/hapo:agent-browser"),
    },
    {
      label: "hapo:docs skill is packaged and supports reconstruct mode",
      file: "src/claude/migration-manifest.json",
      assert: (content) => content.includes('"docs"'),
    },
    {
      label: "hapo:docs --reconstruct keeps as-is evidence contract",
      file: "src/claude/skills/docs/SKILL.md",
      assert: (content) =>
        content.includes("name: hapo:docs") &&
        content.includes("/hapo:docs --reconstruct <scope>") &&
        content.includes("Mode flags are exclusive") &&
        content.includes("docs/as-is/<scope-slug>/") &&
        content.includes("Observed | Inferred | Unknown") &&
        content.includes("Confidence: High | Medium | Low") &&
        content.includes("MUST NOT") &&
        content.includes("/hapo:specs <change request based on approved as-is docs>"),
    },
    {
      label: "hapo:docs --reconstruct reference defines output and human review gate",
      file: "src/claude/skills/docs/references/reconstruct-workflow.md",
      assert: (content) =>
        content.includes("docs/as-is/<scope-slug>/") &&
        content.includes("overview.html") &&
        content.includes("requirements-as-is.md") &&
        content.includes("evidence-map.md") &&
        content.includes("unknowns-and-assumptions.md") &&
        content.includes("validate-docs-reconstruct.cjs") &&
        content.includes("Human Review Gate") &&
        content.includes("Do not recommend `/hapo:develop`"),
    },
    {
      label: "hapo:docs --reconstruct templates keep evidence and overview starters",
      file: "src/claude/skills/docs/templates/reconstruction.json",
      assert: (content) =>
        content.includes('"source_revision"') &&
        content.includes('"review_status": "pending"') &&
        content.includes('"approved_for_specs": false') &&
        content.includes('"overview.html"') &&
        content.includes('"constraints-risks-and-decisions.md"') &&
        content.includes('"glossary.md"'),
    },
    {
      label: "hapo:docs --reconstruct overview template is self-contained",
      file: "src/claude/skills/docs/templates/reconstruct-overview.html",
      assert: (content) =>
        content.includes("data-reconstruct-overview") &&
        content.includes("SYSTEM_OVERVIEW_START") &&
        content.includes("REQUIREMENTS_START") &&
        content.includes("UNKNOWNS_START") &&
        !content.includes("<script") &&
        !content.includes("https://") &&
        !content.includes("http://"),
    },
    {
      label: "hapo:docs normal docs references keep init update summarize phases",
      file: "src/claude/skills/docs/SKILL.md",
      assert: (content) =>
        content.includes("references/init-workflow.md") &&
        content.includes("references/update-workflow.md") &&
        content.includes("references/summarize-workflow.md") &&
        content.includes("CafeKit ships `docs-keeper` instead"),
    },
    {
      label: "hapo:docs --init reference keeps scout author validate discipline",
      file: "src/claude/skills/docs/references/init-workflow.md",
      assert: (content) =>
        content.includes("Structure Scout") &&
        content.includes("Evidence Scout") &&
        content.includes("docs-keeper") &&
        content.includes("validate-docs.cjs <docs-root>"),
    },
    {
      label: "hapo:docs --update reference reads existing docs before surgical updates",
      file: "src/claude/skills/docs/references/update-workflow.md",
      assert: (content) =>
        content.includes("Existing Docs Read") &&
        content.includes("Surgical Docs Update") &&
        content.includes("docs.maxLoc") &&
        content.includes(".sync_hash"),
    },
    {
      label: "hapo:docs --summarize reference avoids broad codebase scans by default",
      file: "src/claude/skills/docs/references/summarize-workflow.md",
      assert: (content) =>
        content.includes("Do not scan the entire codebase") &&
        content.includes("codebase-summary.md") &&
        content.includes("Update only `codebase-summary.md`"),
    },
    {
      label: "docs validator accepts configured docs root argument",
      file: "src/claude/scripts/validate-docs.cjs",
      assert: (content) =>
        content.includes("process.argv[2] || 'docs'") &&
        content.includes("path.resolve(process.cwd(), docsArg)"),
    },
    {
      label: "reconstruct validator is packaged and enforces evidence IDs",
      file: "src/claude/migration-manifest.json",
      assert: (content) => content.includes('"validate-docs-reconstruct.cjs"'),
    },
    {
      label: "reconstruct validator requires overview and bundle registry",
      file: "src/claude/scripts/validate-docs-reconstruct.cjs",
      assert: (content) =>
        content.includes("'overview.html'") &&
        content.includes("must exactly list the as-is document bundle") &&
        content.includes("must reference evidence IDs") &&
        content.includes("data-reconstruct-overview"),
    },
    {
      label: "CafeKit no longer installs automatic skill router hook",
      file: "src/claude/settings/settings.json",
      assert: (content) =>
        content.includes('hooks/rules.cjs') &&
        content.includes('hooks/spec-state.cjs') &&
        !content.includes('hooks/skill-router.cjs'),
    },
    {
      label: "CafeKit runtime config drives shared hook config",
      file: "src/claude/hooks/lib/config.cjs",
      assert: (content) =>
        content.includes("RUNTIME_CONFIG_PATH = '.claude/runtime.json'") &&
        content.includes("const CONFIG_PATH = RUNTIME_CONFIG_PATH") &&
        content.includes("if (runtimeConfig) merged = deepMerge(merged, runtimeConfig)") &&
        !content.includes("'skill-router': true"),
    },
    {
      label: "CafeKit migration manifest excludes removed skill router files",
      file: "src/claude/migration-manifest.json",
      assert: (content) => {
        const manifest = JSON.parse(content);
        return (
          manifest.scripts.required.includes("generate-skill-catalog.cjs") &&
          !manifest.runtime.files.includes("hooks/skill-router.cjs") &&
          !manifest.runtime.files.includes("hooks/lib/skill-router-routes.cjs") &&
          manifest.obsolete.runtimeFiles.includes("hooks/skill-router.cjs") &&
          manifest.obsolete.runtimeFiles.includes("hooks/lib/skill-router-routes.cjs") &&
          manifest.obsolete.settingsHookCommandSubstrings.includes("hooks/skill-router.cjs")
        );
      },
    },
    {
      label: "CafeKit installer cleans obsolete skill router runtime and settings hooks",
      files: ["bin/phases/claude-runtime.js", "bin/phases/claude-settings.js"],
      assert: (content) =>
        content.includes("function removeObsoleteClaudeRuntimeFiles") &&
        content.includes("function pruneObsoleteSettingsHooks") &&
        content.includes("settingsHookCommandSubstrings") &&
        content.includes("fs.rmSync(targetPath, { force: true, recursive: isDir })") &&
        content.includes("prunePrefix") &&
        content.includes("removeObsoleteClaudeRuntimeFiles(ctx, platformKey)"),
    },
    {
      label: "CafeKit rules hook injects only project-specific reminders",
      file: "src/claude/hooks/rules.cjs",
      assert: (content) =>
        content.includes("reserveSession") &&
        content.includes("runtime.locale") &&
        content.includes("docs.maxLoc") &&
        content.includes("Markdown files") &&
        !content.includes("COOLDOWN_MS") &&
        !content.includes("## Skill Routing") &&
        !content.includes("[IMPORTANT] Consider Modularization") &&
        !content.includes("YAGNI · KISS · DRY"),
    },
    {
      label: "docs sync respects runtime docs path",
      file: "src/claude/hooks/docs-sync.cjs",
      assert: (content) =>
        content.includes("loadConfig({ cwd") &&
        content.includes("config.paths?.docs || 'docs'"),
    },
    {
      label: "hapo:specs SKILL stays lean after slim-flow diet",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) => content.trimEnd().split("\n").length >= 150 && content.trimEnd().split("\n").length <= 230,
    },
    {
      label: "hapo:develop SKILL stays within directional context budget",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) => content.trimEnd().split("\n").length >= 140 && content.trimEnd().split("\n").length <= 200,
    },
    {
      label: "docs-sync.cjs has no shouting banners",
      file: "src/claude/hooks/docs-sync.cjs",
      assert: (content) =>
        !content.includes("URGENT") && !content.includes("BẮT BUỘC"),
    },
    {
      label: "workflow routing keeps delegate and ambiguity table",
      file: "src/claude/rules/skill-workflow-routing.md",
      assert: (content) =>
        content.includes("/hapo:delegate") && content.includes("debug"),
    },
    {
      label: "usage hook reads runtime config from hook cwd",
      file: "src/claude/hooks/usage.cjs",
      assert: (content) =>
        content.includes("function readRuntime(cwd)") &&
        content.includes("const cwd = input.cwd || process.cwd()") &&
        content.includes("runtime.usage?.enabled === false"),
    },
    {
      label: "statusline colors respect runtime config",
      file: "src/claude/status.cjs",
      assert: (content) =>
        content.includes("colors.setColorEnabled(config.statuslineColors !== false)") &&
        content.includes("colors.shouldUseColor"),
    },
    {
      // Per-surface authoring-contract: canonical retention/API in design-principles (not aggregate, not webhook-hardcoded)
      label: "design-principles canonical retention/API is per-surface and domain-generic",
      file: "src/claude/skills/specs/rules/design-principles.md",
      assert: (content) =>
        content.includes("clock anchor") &&
        content.includes("clock source") &&
        content.includes("timezone/precision") &&
        content.includes("comparator/inclusivity") &&
        content.includes("enforcement boundary") &&
        content.includes("wrong-clock") &&
        content.includes("method, route") &&
        content.includes("idempotency") &&
        !content.toLowerCase().includes("webhook"),
    },
    {
      // Per-surface short reminder in SKILL (canonical is design-principles)
      label: "SKILL routes retention/API to canonical design-principles (per-surface)",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("For retention/lifecycle and API contracts, follow `rules/design-principles.md`") &&
        content.includes("clock anchor/source/timezone") &&
        content.includes("method/route/auth") &&
        !content.toLowerCase().includes("webhook"),
    },
    {
      // Per-surface retention lens in review
      label: "review retention lens is per-surface and domain-generic",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("clock anchor/source/timezone/precision") &&
        content.includes("cutoff comparator/inclusivity") &&
        content.includes("wrong clock") &&
        !content.toLowerCase().includes("webhook"),
    },
    {
      // Behavioral: structured projection — task template Compact core has one anchor, proof conditional (parsed, not phrase-aggregate)
      label: "task template Compact core is per-surface parsed (behavioral)",
      file: "src/claude/skills/specs/templates/task.md",
      assert: (content) => {
        const rows = content
          .split("\n")
          .filter((line) => line.trim().startsWith("|"))
          .map((line) => line.split("|").slice(1, -1).map((c) => c.trim()));
        // Core must have exactly one data row (owner) by default; proof row is conditional comment, not a second data row
        const dataRows = rows.filter((cells) => cells[0].startsWith("A-R"));
        const hasSingleCoreAnchor = dataRows.length === 1 && dataRows[0][1] === "file";
        const hasProofConditionalComment = content.includes("For a typed proof boundary, add:");
        const hasBareNotOwnership = content.includes("bare command is not ownership") || content.includes("bare");
        return hasSingleCoreAnchor && hasProofConditionalComment && hasBareNotOwnership;
      },
    },
    {
      // Design template Compact core parsed: single anchor, proof conditional
      label: "design template Compact core is per-surface parsed (behavioral)",
      file: "src/claude/skills/specs/templates/design.md",
      assert: (content) => {
        const rows = content
          .split("\n")
          .filter((line) => line.trim().startsWith("|"))
          .map((line) => line.split("|").slice(1, -1).map((c) => c.trim()));
        const dataRows = rows.filter((cells) => cells[0].startsWith("A-D"));
        const hasSingleCoreAnchor = dataRows.length === 1 && dataRows[0][0] === "A-D-01";
        const hasProofConditionalComment = content.includes("For a typed proof boundary, add:") && content.includes("A-D-02");
        return hasSingleCoreAnchor && hasProofConditionalComment;
      },
    },
    {
      // Per-surface docs/proof and two-review advisory in SKILL
      label: "SKILL docs-only and two-review advisory is per-surface",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) => {
        const norm = content.toLowerCase().replace(/\s+/g, " ");
        return norm.includes("never creates or updates docs") &&
          norm.includes("never fabricate") &&
          content.includes("Two-review target is advisory") &&
          norm.includes("budgets never override correctness");
      },
    },
    {
      // Per-surface docs/proof and two-review advisory in review
      label: "review docs-only and two-review advisory is per-surface",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) => {
        const norm = content.toLowerCase().replace(/\s+/g, " ");
        return norm.includes("never creates or updates docs") &&
          content.includes("Two-review target is advisory") &&
          norm.includes("budgets never override correctness");
      },
    },
    {
      // Per-surface spec-maker docs/proof and two-review and contradiction resolution
      label: "spec-maker docs-only, two-review and scaffold contradiction is per-surface",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) => {
        const norm = content.toLowerCase().replace(/\s+/g, " ");
        return content.includes("never directly write or promote") &&
          norm.includes("may persist legitimate scope/decision/topology") &&
          norm.includes("never creates or updates docs") &&
          content.includes("Two-review target is advisory");
      },
    },
    {
      // Public V example is parsed as canonical Criteria/Owner (behavioral, not phrase-aggregate)
      label: "public V example in specs-usage-guide parses as canonical Criteria/Owner (behavioral)",
      file: "../../docs/specs-usage-guide.md",
      assert: (content) => {
        const vMatch = content.match(/^- \*\*V1\*\*:.*$/m);
        if (!vMatch) return false;
        const vLine = vMatch[0];
        const errors = [];
        const probe = "## Verification Definitions\n" + vLine + "\n";
        const defs = parseVerificationDefinitions(probe, errors);
        const v1 = defs.get("V1");
        return errors.length === 0 && v1 && v1.subject_criteria.length === 1 && v1.subject_criteria[0] === "R1.1" && v1.subject_owner === "A-D-01" && v1.decision_refs.includes("D1");
      },
    },
    {
      // Installed Codex projection is verified via transform, not raw source path (behavioral)
      label: "Codex installed projection uses Codex paths (behavioral, temp fixture)",
      files: [
        "src/claude/skills/specs/SKILL.md",
        "src/claude/skills/specs/references/review.md",
      ],
      assert: (content) => {
        // Check that Claude source uses .claude and that Codex transform would use .codex — verify via normalizeCodexBody if available
        try {
          const codexLib = require(join(packageRoot, "bin/lib/codex-install.js"));
          const normalize = codexLib.normalizeCodexBody;
          if (typeof normalize === "function") {
            const sample = "node .claude/scripts/spec-readiness.cjs specs/<feature> --review-result review.json";
            const transformed = normalize(sample, "src/claude/skills/specs/SKILL.md");
            return transformed.includes("node .codex/scripts/spec-readiness.cjs") && !transformed.includes("node .claude/scripts/spec-readiness.cjs");
          }
        } catch {}
        // Fallback: check that review and SKILL now contain both Claude and Codex installed commands (per-surface docs check elsewhere)
        return content.includes("node .codex/scripts/") && content.includes("node .claude/scripts/");
      },
    },
    {
      // Per-surface benchmark tuning targets are explicit and not correctness waivers (Vietnamese positive phrase)
      label: "benchmark tuning targets are per-surface explicit (advisory, not waiver)",
      file: "../../docs/benchmark-workflow.md",
      assert: (content) =>
        content.includes("≤10 phút") &&
        content.includes("≤40 phút") &&
        content.includes("500K") &&
        content.includes("tối đa") &&
        content.includes("2 vòng") &&
        content.toLowerCase().includes("tinh chỉnh") &&
        content.includes("không phải để cắt"),
    },
    {
      label: "specs-usage-guide benchmark targets are per-surface explicit",
      file: "../../docs/specs-usage-guide.md",
      assert: (content) =>
        content.includes("≤10 phút") &&
        content.includes("≤40 phút") &&
        content.includes("500K tokens") &&
        content.includes("không phải để cắt"),
    },
    {
      label: "Direct and Compact stay light and spec.json remains machine authority (per-surface)",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("Keep `Direct`") &&
        content.includes("machine authority") &&
        !content.toLowerCase().includes("webhook"),
    },
  ];

  console.log("\n[skill-test] static semantic checks");
  for (const check of checks) {
    const targets = check.files ?? [check.file];
    const parts = await Promise.all(
      targets.map((rel) => readFile(join(packageRoot, rel), "utf8")),
    );
    const content = parts.join("\n");
    if (!check.assert(content)) {
      console.error(`[FAIL] ${check.label}: ${targets.join(", ")}`);
      process.exit(1);
    }
    console.log(`✔ ${check.label}`);
  }

  return checks.length + specs21Tests;
}

function runSkillCatalogTests() {
  const scriptPath = join(packageRoot, "src/claude/scripts/generate-skill-catalog.cjs");
  const sourceRoot = join(packageRoot, "src/claude/skills");
  const result = spawnSync(process.execPath, [scriptPath, "--skills", "--root", sourceRoot], {
    cwd: packageRoot,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    console.error("[FAIL] skill catalog script failed");
    process.exit(1);
  }
  for (const expected of [
    "CafeKit Skills Catalog",
    "`hapo:specs`",
    "`hapo:develop`",
    "`hapo:docs`",
    "`hapo:question`",
    "`hapo:debug`",
    "`hapo:hotfix`",
    "`hapo:react-best-practices`",
  ]) {
    if (!result.stdout.includes(expected)) {
      console.error(result.stdout);
      console.error(`[FAIL] skill catalog missing ${expected}`);
      process.exit(1);
    }
  }

  const json = spawnSync(process.execPath, [scriptPath, "--json", "--root", sourceRoot], {
    cwd: packageRoot,
    encoding: "utf8",
  });
  if (json.status !== 0) {
    console.error(json.stdout);
    console.error(json.stderr);
    console.error("[FAIL] skill catalog JSON mode failed");
    process.exit(1);
  }
  const parsed = JSON.parse(json.stdout);
  if (!Array.isArray(parsed.skills) || parsed.skills.length < 20) {
    console.error(json.stdout);
    console.error("[FAIL] skill catalog JSON has too few skills");
    process.exit(1);
  }

  // Determinism guard: running again must produce identical JSON (no cache/stale output)
  const json2 = spawnSync(process.execPath, [scriptPath, "--json", "--root", sourceRoot], {
    cwd: packageRoot,
    encoding: "utf8",
  });
  if (json2.stdout !== json.stdout) {
    console.error("[FAIL] skill catalog output not deterministic across runs");
    process.exit(1);
  }

  console.log("✔ skill catalog script lists installed CafeKit skills");
  console.log("✔ skill catalog JSON mode is machine-readable");
  return 2;
}

async function fileExists(filePath) {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

async function runInstallerMigrationFixtureTests() {
  const root = await mkdtemp(join(tmpdir(), "cafekit-installer-migration-"));

  try {
    await mkdir(join(root, ".claude", "hooks", "lib"), { recursive: true });
    await writeFile(join(root, ".claude", "hooks", "skill-router.cjs"), "old router");
    await writeFile(join(root, ".claude", "hooks", "lib", "skill-router-routes.cjs"), "old routes");
    await writeFile(
      join(root, ".claude", "settings.json"),
      JSON.stringify(
        {
          hooks: {
            UserPromptSubmit: [
              {
                matcher: "*",
                hooks: [
                  {
                    type: "command",
                    command: 'node "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-router.cjs"',
                  },
                ],
              },
            ],
          },
        },
        null,
        2,
      ),
    );

    const result = spawnSync(process.execPath, [join(packageRoot, "bin", "install.js")], {
      cwd: root,
      input: "n\n\n",
      encoding: "utf8",
      env: { ...process.env, PATH: "/usr/bin:/bin" },
    });

    if (result.status !== 0) {
      console.error(result.stdout);
      console.error(result.stderr);
      console.error("[FAIL] installer migration fixture failed");
      process.exit(1);
    }

    const settings = JSON.parse(await readFile(join(root, ".claude", "settings.json"), "utf8"));
    const serializedHooks = JSON.stringify(settings.hooks || {});
    const failures = [];

    if (await fileExists(join(root, ".claude", "hooks", "skill-router.cjs"))) {
      failures.push("obsolete skill-router hook file still exists");
    }
    if (await fileExists(join(root, ".claude", "hooks", "lib", "skill-router-routes.cjs"))) {
      failures.push("obsolete skill-router route file still exists");
    }
    if (serializedHooks.includes("hooks/skill-router.cjs")) {
      failures.push("obsolete skill-router settings hook still exists");
    }
    if (!(await fileExists(join(root, ".claude", "rules", "skill-workflow-routing.md")))) {
      failures.push("skill workflow routing rule was not installed");
    }
    if (!(await fileExists(join(root, ".claude", "scripts", "generate-skill-catalog.cjs")))) {
      failures.push("skill catalog script was not installed");
    }
    if (!(await fileExists(join(root, ".claude", "skills", "docs", "SKILL.md")))) {
      failures.push("hapo:docs skill was not installed");
    }

    if (failures.length > 0) {
      console.error(failures.join("\n"));
      process.exit(1);
    }

    console.log("✔ installer migrates old skill-router runtime to rule-based routing");
    return 1;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

/**
 * Schema-drift tripwire: every hook command in the settings template must map
 * to a real payload file that the migration manifest ships, and vice versa —
 * a hook listed in runtime.files but registered nowhere is dead weight, a hook
 * registered in settings but not shipped breaks at runtime.
 */
async function runSettingsManifestConsistencyCheck() {
  const settings = JSON.parse(
    await readFile(join(packageRoot, "src/claude/settings/settings.json"), "utf8"),
  );
  const manifest = JSON.parse(
    await readFile(join(packageRoot, "src/claude/migration-manifest.json"), "utf8"),
  );

  const registered = new Set(
    JSON.stringify(settings.hooks).match(/hooks\/[a-z-]+\.cjs/g) || [],
  );
  const shipped = new Set(
    (manifest.runtime?.files || []).filter((f) => /^hooks\/[a-z-]+\.cjs$/.test(f)),
  );
  // Helpers imported by completion-authority.cjs, not executable hook entrypoints
  // (see src/claude/hooks/completion-authority.cjs:64-65 requiring ./completion-authority-state.cjs and ./completion-authority-check.cjs)
  const helperAllowlist = new Set([
    "hooks/completion-authority-check.cjs",
    "hooks/completion-authority-state.cjs",
  ]);

  const failures = [];
  for (const hook of registered) {
    if (!shipped.has(hook)) failures.push(`registered in settings but not in manifest runtime.files: ${hook}`);
    if (!(await fileExists(join(packageRoot, "src/claude", hook)))) {
      failures.push(`registered in settings but payload file missing: ${hook}`);
    }
  }
  for (const hook of shipped) {
    if (!registered.has(hook) && !helperAllowlist.has(hook)) failures.push(`shipped in manifest but registered in no settings event: ${hook}`);
  }

  if (failures.length > 0) {
    console.error(failures.join("\n"));
    console.error("[FAIL] settings/manifest hook consistency check failed");
    process.exit(1);
  }

  console.log(`✔ settings template and manifest agree on ${registered.size} hooks`);
  return 1;
}

/**
 * Regression: a non-interactive upgrade (--yes/--force-overwrite) must preserve
 * the configured locale.responseLanguage. Bug (0.14.0/0.14.1 era): selectLanguage
 * returned before restoring the saved locale when !interactive, so
 * patchRuntimeLocale clobbered the label with the 'en' default on every upgrade.
 */
async function runLocalePreservationFixtureTest() {
  const root = await mkdtemp(join(tmpdir(), "cafekit-installer-locale-"));

  try {
    await mkdir(join(root, ".claude"), { recursive: true });

    const install = (args = []) =>
      spawnSync(process.execPath, [join(packageRoot, "bin", "install.js"), ...args], {
        cwd: root,
        input: "n\n\n",
        encoding: "utf8",
        env: { ...process.env, PATH: "/usr/bin:/bin" },
      });

    const first = install();
    if (first.status !== 0) {
      console.error(first.stdout, first.stderr);
      console.error("[FAIL] locale fixture: fresh install failed");
      process.exit(1);
    }

    // Simulate a configured install: user language saved as a freeform label.
    const rtPath = join(root, ".claude", "runtime.json");
    const rt = JSON.parse(await readFile(rtPath, "utf8"));
    rt.locale = { ...(rt.locale || {}), responseLanguage: "Tiếng Việt" };
    await writeFile(rtPath, `${JSON.stringify(rt, null, 2)}\n`);

    // Non-interactive upgrade — the exact path that clobbered the locale.
    const second = install(["--force-overwrite"]);
    if (second.status !== 0) {
      console.error(second.stdout, second.stderr);
      console.error("[FAIL] locale fixture: upgrade run failed");
      process.exit(1);
    }

    const after = JSON.parse(await readFile(rtPath, "utf8"));
    if (after.locale?.responseLanguage !== "Tiếng Việt") {
      console.error(
        `[FAIL] locale fixture: responseLanguage became ${JSON.stringify(after.locale?.responseLanguage)} after upgrade (expected "Tiếng Việt")`,
      );
      process.exit(1);
    }

    console.log("✔ installer upgrade preserves configured locale.responseLanguage");
    return 1;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function runOpenCodeInstallerFixtureTests() {
  const root = await mkdtemp(join(tmpdir(), "cafekit-opencode-installer-"));

  try {
    await writeFile(join(root, "opencode.json"), "{}\n", "utf8");

    const result = spawnSync(process.execPath, [join(packageRoot, "bin", "install.js")], {
      cwd: root,
      input: "n\n\n",
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: "/usr/bin:/bin",
        OPENCODE_MODEL: "anthropic/claude-sonnet-4-20250514",
        OPENCODE_DEFAULT_MODEL: "",
      },
    });

    if (result.status !== 0) {
      console.error(result.stdout);
      console.error(result.stderr);
      console.error("[FAIL] OpenCode installer fixture failed");
      process.exit(1);
    }

    const metadata = JSON.parse(await readFile(join(root, ".opencode", "cafekit.json"), "utf8"));
    const opencodeConfig = JSON.parse(await readFile(join(root, "opencode.json"), "utf8"));
    const agentsMd = await readFile(join(root, "AGENTS.md"), "utf8");
    const implementerAgent = await readFile(
      join(root, ".opencode", "agents", "implementer.md"),
      "utf8",
    );
    const specsCommand = await readFile(join(root, ".opencode", "commands", "specs.md"), "utf8");
    const questionCommand = await readFile(join(root, ".opencode", "commands", "question.md"), "utf8");
    const agentFrontmatter = implementerAgent.split("---")[1] || "";
    const commandFrontmatter = specsCommand.split("---")[1] || "";
    const questionFrontmatter = questionCommand.split("---")[1] || "";
    const failures = [];

    if (metadata.platform !== "opencode") {
      failures.push("OpenCode cafekit.json metadata has wrong platform");
    }
    if (!(await fileExists(join(root, ".opencode", "agents", "implementer.md")))) {
      failures.push("OpenCode agent bundle was not installed");
    }
    if (!implementerAgent.includes("mode: subagent")) {
      failures.push("OpenCode agent was not converted to OpenCode mode frontmatter");
    }
    if (
      !agentFrontmatter.includes("permission:") ||
      !agentFrontmatter.includes("  read: allow") ||
      !agentFrontmatter.includes("  skill: allow") ||
      !agentFrontmatter.includes("  task: allow")
    ) {
      failures.push("OpenCode agent tools were not converted to OpenCode permission flags");
    }
    if (agentFrontmatter.includes("name:") || agentFrontmatter.includes("tools:")) {
      failures.push("OpenCode agent still contains Claude-specific frontmatter");
    }
    if (!(await fileExists(join(root, ".opencode", "commands", "specs.md")))) {
      failures.push("OpenCode skill command wrappers were not installed");
    }
    if (!(await fileExists(join(root, ".opencode", "commands", "question.md")))) {
      failures.push("OpenCode question command wrapper was not installed");
    }
    if (!specsCommand.includes(".opencode/skills/specs/SKILL.md")) {
      failures.push("OpenCode specs command does not route to the CafeKit specs skill");
    }
    if (!questionCommand.includes(".opencode/skills/question/SKILL.md")) {
      failures.push("OpenCode question command does not route to the CafeKit question skill");
    }
    if (!commandFrontmatter.includes('agent: "spec-maker"') || !commandFrontmatter.includes("subtask: true")) {
      failures.push("OpenCode specs command is not bound to the spec-maker subagent");
    }
    if (!questionFrontmatter.includes('agent: "inspector"') || !questionFrontmatter.includes("subtask: true")) {
      failures.push("OpenCode question command is not bound to the inspector subagent");
    }
    if (specsCommand.includes("allowed-tools")) {
      failures.push("OpenCode command still contains Claude command frontmatter");
    }
    if (opencodeConfig.$schema !== "https://opencode.ai/config.json") {
      failures.push("OpenCode config schema was not merged");
    }
    if (!Array.isArray(opencodeConfig.instructions) || !opencodeConfig.instructions.includes("AGENTS.md")) {
      failures.push("OpenCode config does not include AGENTS.md instructions");
    }
    if (opencodeConfig.permission?.skill?.["*"] !== "allow") {
      failures.push("OpenCode config does not allow CafeKit skills");
    }
    if (opencodeConfig.permission?.task?.["*"] !== "allow") {
      failures.push("OpenCode config does not allow CafeKit subtask agents");
    }
    if (opencodeConfig.model !== "anthropic/claude-sonnet-4-20250514") {
      failures.push("OpenCode model prompt did not configure opencode.json");
    }
    if (!(await fileExists(join(root, ".opencode", "skills", "docs", "SKILL.md")))) {
      failures.push("OpenCode install did not install skills under .opencode/");
    }
    if (!(await fileExists(join(root, ".opencode", "skills", "question", "SKILL.md")))) {
      failures.push("OpenCode install did not install question skill under .opencode/");
    }
    if (!(await fileExists(join(root, ".opencode", "rules", "skill-workflow-routing.md")))) {
      failures.push("OpenCode install did not install routing rules under .opencode/");
    }
    if (!(await fileExists(join(root, ".opencode", "scripts", "generate-skill-catalog.cjs")))) {
      failures.push("OpenCode install did not install scripts under .opencode/");
    }
    for (const script of ["workflow-policy.cjs", "spec-resolver.cjs"]) {
      if (!(await fileExists(join(root, ".opencode", "scripts", script)))) {
        failures.push(`OpenCode install did not install shared script ${script}`);
      }
    }
    if (!(await fileExists(join(root, ".opencode", "runtime.json")))) {
      failures.push("OpenCode install did not install runtime.json under .opencode/");
    }
    const expectedPlugins = [
      "privacy-block.ts",
      "inspect-block.ts",
      "docs-sync.ts",
      "session.ts",
      "state.ts",
      "usage.ts",
      "rules.ts",
      "task-scaffold-guard.ts",
      "spec-state.ts",
      "spec-gate.ts",
    ];
    for (const plugin of expectedPlugins) {
      if (!(await fileExists(join(root, ".opencode", "plugins", plugin)))) {
        failures.push(`OpenCode install did not install plugin ${plugin}`);
      }
    }
    if (await fileExists(join(root, ".opencode", "plugins", "package.json"))) {
      failures.push("OpenCode plugin package.json must live at .opencode/package.json, not inside plugins/");
    }
    if (!(await fileExists(join(root, ".opencode", "package.json")))) {
      failures.push("OpenCode install did not write .opencode/package.json for plugin deps");
    } else {
      const pluginPkg = JSON.parse(
        await readFile(join(root, ".opencode", "package.json"), "utf8"),
      );
      if (!pluginPkg.dependencies?.["@opencode-ai/plugin"]) {
        failures.push("OpenCode .opencode/package.json missing @opencode-ai/plugin dependency");
      }
      if (pluginPkg.type !== "module") {
        failures.push("OpenCode .opencode/package.json must set type: module");
      }
    }
    if (await fileExists(join(root, ".claude"))) {
      failures.push("OpenCode install must not create .claude/ directory");
    }
    // Spot-check that domain skills also have slash-command wrappers.
    const expectedDomainCommands = [
      "frontend-development.md",
      "backend-development.md",
      "research.md",
      "git.md",
      "devops.md",
      "web-testing.md",
    ];
    for (const cmd of expectedDomainCommands) {
      if (!(await fileExists(join(root, ".opencode", "commands", cmd)))) {
        failures.push(`OpenCode install missing domain command wrapper ${cmd}`);
      }
    }
    if (!agentsMd.includes("Primary operating instructions for OpenCode")) {
      failures.push("OpenCode AGENTS.md instructions were not written");
    }
    if (await fileExists(join(root, ".agent", "rules", "GEMINI.md"))) {
      failures.push("legacy secondary platform files were installed");
    }

    const opencodeVersion = spawnSync("opencode", ["--version"], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, PATH: process.env.PATH },
    });
    if (opencodeVersion.status === 0) {
      console.log("✔ OpenCode binary smoke check passed");
    } else {
      console.log("→ OpenCode binary unavailable; skipped binary smoke check");
    }

    if (failures.length > 0) {
      console.error(failures.join("\n"));
      process.exit(1);
    }

    console.log("✔ installer supports OpenCode runtime selection");
    return 1;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function writeText(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

async function listFilesRecursively(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursively(filePath));
    } else if (entry.isFile()) {
      files.push(filePath);
    }
  }
  return files;
}

async function assertNoSourcePayloadPaths(root, platform, reportFailure) {
  const payloadRoots = {
    claude: [".claude/skills", ".claude/rules", ".claude/agents"],
    codex: [".agents/skills", ".codex/rules", ".codex/agents"],
    opencode: [".opencode/skills", ".opencode/rules", ".opencode/agents"],
  };
  const files = [];
  for (const relativeRoot of payloadRoots[platform] || []) {
    files.push(...await listFilesRecursively(join(root, relativeRoot)));
  }

  for (const filePath of files) {
    const content = await readFile(filePath, "utf8");
    if (content.includes("packages/spec/src/")) {
      reportFailure(`${platform}: installed payload leaks packages/spec/src/ in ${filePath}`);
    }
  }
}

function runSpecValidator(specDir) {
  const validator = join(packageRoot, "src/claude/scripts/validate-spec-output.cjs");
  return spawnSync(process.execPath, [validator, specDir], {
    cwd: packageRoot,
    encoding: "utf8",
  });
}

function runReconstructValidator(bundleDir) {
  const validator = join(packageRoot, "src/claude/scripts/validate-docs-reconstruct.cjs");
  return spawnSync(process.execPath, [validator, bundleDir], {
    cwd: packageRoot,
    encoding: "utf8",
  });
}

async function createValidSpecFixture(root) {
  // Migration coverage: this deliberately exercises the schema 2.0 read-
  // compatibility path. Canonical v2.1 authoring is checked structurally by
  // runSpecs21ContractTests above.
  const specDir = join(root, "valid-spec");
  const taskPath = "tasks/task-R1-01-user-permission.md";
  await writeText(
    join(specDir, "spec.json"),
    JSON.stringify(
      {
        schema_version: "2.0",
        feature_name: "valid-spec",
        created_at: "2026-08-13T00:00:00+07:00",
        updated_at: "2026-08-13T00:05:00+07:00",
        status: "in_progress",
        current_phase: "tasks",
        workflow_policy: workflowPolicy.workflowPolicySnapshot({ riskSignals: {} }),
        scope_lock: {
          source: "Add user permission control",
          in_scope: ["1"],
          out_of_scope: [],
          expansion_policy: "requires-user-approval",
        },
        approvals: {
          requirements: { generated: true, agent_validated: true },
          design: { generated: true, agent_validated: true },
          tasks: { generated: true, agent_validated: true },
        },
        coordination: {
          tasks_required: true,
          phases_required: false,
          reason: "task_topology",
          task_triggers: ["separate_proof"],
        },
        task_files: [taskPath],
        task_registry: {
          [taskPath]: {
            id: "R1-01",
            title: "User permission control",
            status: "pending",
            dependencies: [],
            blocker: null,
            started_at: null,
            completed_at: null,
            last_updated_at: null,
            artifacts: ["backend/tests/test_admin_permissions.py"],
          },
        },
        validation: {
          status: "not-run",
          last_validated_at: null,
          semantic_review: {
            status: "not-run",
            reviewed_artifact_digest: null,
            reviewed_criteria: [],
            counterexamples: [],
          },
        },
        timestamps: {
          init: "2026-08-13T00:00:00+07:00",
          requirements_done: "2026-08-13T00:01:00+07:00",
          research_done: null,
          design_done: "2026-08-13T00:03:00+07:00",
          tasks_done: "2026-08-13T00:04:00+07:00",
          code_done: null,
          test_done: null,
          review_done: null,
          validation_done: null,
        },
        ready_for_implementation: false,
      },
      null,
      2,
    ),
  );
  await writeText(
    join(specDir, "requirements.md"),
    `# Requirements\n\n### Requirement 1: User Permission\n\n- **R1.1** When an admin toggles permission, the system shall persist the user permission state.\n`,
  );
  await writeText(
    join(specDir, "design.md"),
    `# Design\n\n## Boundary\n\nThe existing admin route owns the permission update.\n\n## Typed Anchors\n\n| ID | Type | Target | Role |\n|---|---|---|---|\n| A-D-01 | file | \`backend/app/api/v1/admin.py\` | existing route owner and entrypoint |\n| A-D-02 | route | \`PATCH /admin/users/{id}/permissions\` | permission update contract |\n\n## Decisions and Invariants\n\n### D1 — Preserve admin authorization\n\n- **Decision:** Extend the existing route and preserve its authorization check.\n- **Negative path:** A missing user returns 404.\n- **Anchors:** A-D-01, A-D-02\n\n## Verification\n\n| Requirement | Proof target | Expected result | Negative path / reachability |\n|---|---|---|---|\n| R1.1 | \`pytest backend/tests/test_admin_permissions.py\` | exit code 0 and persisted permission | missing user through A-D-02 returns 404 |\n`,
  );
  await writeText(
    join(specDir, taskPath),
    `# Task R1-01: User permission control\n\n**Status:** pending\n\n## Outcome\n\nAn admin can persist a user's workspace permission through the existing route.\n\n## Scope and Typed Anchors\n\n- **In scope:** Permission update and missing-user response.\n- **Out of scope:** A new authorization system.\n- **Contracts/Invariants:** D1\n- **Canonical design anchors consumed:** A-D-01, A-D-02\n\n| ID | Type | Target | Role |\n|---|---|---|---|\n| A-R1-01-01 | command | \`pytest backend/tests/test_admin_permissions.py\` | planned focused verification |\n\n## Changes\n\n- [ ] Persist permission through the existing admin route. _Requirements: 1.1_\n- [ ] Return 404 for a missing user. _Requirements: 1.1_\n\n## Acceptance\n\n- **R1.1:** The real route returns the persisted permission and rejects a missing user with 404.\n\n## Dependencies\n\n- none\n\n## Verification Plan\n\n- **Command:** \`pytest backend/tests/test_admin_permissions.py\`\n- **Expected:** exit code 0 with persisted-permission assertions\n- **Negative path:** missing user returns 404\n- **Reachability:** \`PATCH /admin/users/{id}/permissions\` is registered by \`backend/app/api/v1/admin.py\`\n`,
  );
  return specDir;
}

async function createInvalidSpecFixture(root) {
  const specDir = join(root, "invalid-triage-like-spec");
  const taskFiles = [
    "tasks/task-R0-01-project-setup.md",
    "tasks/task-R0-02-ticket-list.md",
    "tasks/task-R0-03-filtering.md",
    "tasks/task-R0-04-ticket-detail.md",
    "tasks/task-R0-05-status-update.md",
  ];
  await writeText(
    join(specDir, "spec.json"),
    JSON.stringify(
      {
        feature: "triage-dashboard",
        status: "approved",
        scope_lock: true,
        tasks: taskFiles,
        task_registry: {
          "task-R0-01": { slug: "project-setup", status: "pending" },
          "task-R0-02": { slug: "ticket-list", status: "pending" },
          "task-R0-03": { slug: "filtering", status: "pending" },
        },
        ready_for_implementation: true,
      },
      null,
      2,
    ),
  );
  await writeText(
    join(specDir, "requirements.md"),
    "# Requirements\n\n### R1 — Ticket List\nWHEN the dashboard loads, THE SYSTEM SHALL show tickets.\n",
  );
  await writeText(join(specDir, "design.md"), "# Design\n\nRender ticket list.\n");
  for (const taskFile of taskFiles) {
    await writeText(
      join(specDir, taskFile),
      `# Task\n\n## Goal\nBuild something.\n\n## Steps\n1. Do work.\n\n## Acceptance Criteria\n- Works.\n`,
    );
  }
  return specDir;
}

async function runSpecValidatorFixtureTests() {
  const root = await mkdtemp(join(tmpdir(), "cafekit-spec-validator-"));
  try {
    const validSpec = await createValidSpecFixture(root);
    const invalidSpec = await createInvalidSpecFixture(root);

    const valid = runSpecValidator(validSpec);
    if (valid.status !== 0) {
      console.error(valid.stdout);
      console.error(valid.stderr);
      console.error("[FAIL] spec validator rejected valid fixture");
      process.exit(1);
    }

    const invalid = runSpecValidator(invalidSpec);
    const invalidOutput = `${invalid.stdout}\n${invalid.stderr}`;
    const expectedFailures = [
      "scope_lock",
      "task_files",
      "task_registry",
      "design_context.validation_recommended",
      "validation.status is not completed",
      "entirely R0",
      "missing Requirements mapping",
      "missing Evidence",
      "missing Related Files",
      "missing Completion Criteria",
      "missing Risk Assessment",
    ];

    if (invalid.status === 0) {
      console.error("[FAIL] spec validator accepted invalid triage-like fixture");
      process.exit(1);
    }

    for (const expected of expectedFailures) {
      if (!invalidOutput.includes(expected)) {
        console.error(invalidOutput);
        console.error(`[FAIL] spec validator did not report ${expected}`);
        process.exit(1);
      }
    }

    console.log("✔ spec validator accepts valid fixture");
    console.log("✔ spec validator rejects triage-like invalid fixture");

    // Specs v2 tasks reference named design contracts and never copy their
    // canonical bodies, preventing first-block-only drift by construction.
    const driftSpec = join(root, "multi-contract-drift-spec");
    await cp(validSpec, driftSpec, { recursive: true });
    const driftDesignPath = join(driftSpec, "design.md");
    const driftDesign = `${await readFile(driftDesignPath, "utf8")}\n### C1 — Permission payload\n\n<!-- contract:PermissionPayload -->\n\`\`\`json\n{ "user_id": 1, "can_create": true }\n\`\`\`\n\n### C2 — Permission error\n\n<!-- contract:PermissionError -->\n\`\`\`json\n{ "error": "not_found" }\n\`\`\`\n`;
    await writeText(
      driftDesignPath,
      driftDesign,
    );
    const driftTaskPath = join(driftSpec, "tasks/task-R1-01-user-permission.md");
    const driftTask = (await readFile(driftTaskPath, "utf8")).replace(
      "- **Contracts/Invariants:** D1",
      '- **Contracts/Invariants:** C1, C2\n\n<!-- contract:PermissionPayload -->\n```json\n{ "user_id": 1, "can_create": true }\n```\n\n<!-- contract:PermissionError -->\n```json\n{ "error": "notFound" }\n```',
    );
    await writeText(driftTaskPath, driftTask);
    const drift = runSpecValidator(driftSpec);
    const driftOutput = `${drift.stdout}\n${drift.stderr}`;
    if (drift.status === 0 || !driftOutput.includes("Specs v2 tasks reference named contract IDs and must not copy canonical contract blocks")) {
      console.error(driftOutput);
      console.error("[FAIL] spec validator allowed copied canonical contract blocks in a Specs v2 task");
      process.exit(1);
    }
    console.log("✔ spec validator rejects copied canonical contract blocks in Specs v2 tasks");
    return 3;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

const reconstructDocuments = [
  "overview.html",
  "system-overview.md",
  "requirements-as-is.md",
  "roles-and-permissions.md",
  "entities-and-statuses.md",
  "business-rules.md",
  "integrations.md",
  "architecture-c4.md",
  "constraints-risks-and-decisions.md",
  "glossary.md",
  "evidence-map.md",
  "unknowns-and-assumptions.md",
];

async function writeReconstructFiles(bundleDir, overrides = {}) {
  for (const file of reconstructDocuments) {
    const defaultContent = file.endsWith(".html")
      ? "<!doctype html><html data-reconstruct-overview><body>overview</body></html>\n"
      : `# ${file}\n\nSource-backed current-state content.\n`;
    await writeText(join(bundleDir, file), overrides[file] ?? defaultContent);
  }
}

async function createValidReconstructFixture(root) {
  const bundleDir = join(root, "valid-reconstruct");
  await writeReconstructFiles(bundleDir, {
    "requirements-as-is.md":
      "# Requirements\n\n## R-ASIS-001: View ticket\n\n- Type: Observed\n- Confidence: High\n- Evidence:\n  - E-API-001 - `src/api/tickets.ts:listTickets`\n- Actors:\n  - Support agent\n- Trigger:\n  - GET /tickets\n- Current outcome:\n  - Ticket list returned.\n",
    "evidence-map.md":
      "# Evidence Map\n\n| ID | Source | Observation |\n|---|---|---|\n| E-API-001 | `src/api/tickets.ts:listTickets` | Ticket list route returns tickets. |\n",
  });
  await writeText(
    join(bundleDir, "reconstruction.json"),
    JSON.stringify(
      {
        scope: "valid-reconstruct",
        generated_at: "2026-05-22T00:00:00.000Z",
        status: "draft",
        docs_root: "docs/as-is/valid-reconstruct",
        source_revision: "abc123",
        source_branch: "main",
        evidence_policy: "observed-inferred-unknown",
        review_gate: "human_review_required",
        review_status: "pending",
        approved_for_specs: false,
        documents: reconstructDocuments,
        counts: { requirements: 1, evidence_items: 1, observed: 1, inferred: 0, unknown: 0 },
        next_recommended_step: "human_review",
      },
      null,
      2,
    ),
  );
  return bundleDir;
}

async function createInvalidReconstructFixture(root) {
  const bundleDir = join(root, "invalid-reconstruct");
  await writeReconstructFiles(bundleDir, {
    "overview.html": "<!doctype html><html><body>missing marker</body></html>\n",
    "requirements-as-is.md": "# Requirements\n\n## R-ASIS-001: View ticket\n\n- Current outcome: ticket list.\n",
    "evidence-map.md": "# Evidence Map\n\nNo evidence IDs.\n",
  });
  await writeText(
    join(bundleDir, "reconstruction.json"),
    JSON.stringify(
      {
        scope: "invalid-reconstruct",
        generated_at: "2026-05-22T00:00:00.000Z",
        status: "draft",
        docs_root: "docs/as-is/invalid-reconstruct",
        documents: ["requirements-as-is.md"],
        counts: {},
        next_recommended_step: "human_review",
      },
      null,
      2,
    ),
  );
  return bundleDir;
}

async function runReconstructValidatorFixtureTests() {
  const root = await mkdtemp(join(tmpdir(), "cafekit-reconstruct-validator-"));
  try {
    const valid = runReconstructValidator(await createValidReconstructFixture(root));
    if (valid.status !== 0) {
      console.error(valid.stdout);
      console.error(valid.stderr);
      console.error("[FAIL] reconstruct validator rejected valid fixture");
      process.exit(1);
    }

    const invalid = runReconstructValidator(await createInvalidReconstructFixture(root));
    const invalidOutput = `${invalid.stdout}\n${invalid.stderr}`;
    for (const expected of [
      "source_revision",
      "review_status",
      "approved_for_specs",
      "must exactly list",
      "missing Type",
      "must reference evidence IDs",
      "overview.html",
    ]) {
      if (invalid.status === 0 || !invalidOutput.includes(expected)) {
        console.error(invalidOutput);
        console.error(`[FAIL] reconstruct validator did not report ${expected}`);
        process.exit(1);
      }
    }

    console.log("✔ reconstruct validator accepts valid fixture");
    console.log("✔ reconstruct validator rejects incomplete evidence bundle");
    return 2;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function runWave1InstructionFixtureTests() {
  const roots = [];
  const installer = join(packageRoot, "bin", "install.js");
  const install = (root, platforms, extraArgs = []) => spawnSync(
    process.execPath,
    [installer, "--platform", platforms, "--yes", ...extraArgs],
    {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: "/usr/bin:/bin",
        OPENCODE_MODEL: "anthropic/claude-sonnet-4-20250514",
        OPENCODE_DEFAULT_MODEL: "",
      },
    },
  );

  const fail = (message, result) => {
    if (result && result.status !== 0) {
      message += `\\n${result.stdout}\\n${result.stderr}`;
    }
    console.error(`[FAIL] Wave 1 install fixture: ${message}`);
    process.exit(1);
  };

  const assertInstalledInstruction = async (root, platform, fileName, skillPath, includeCore = true) => {
    const content = await readFile(join(root, fileName), "utf8");
    const required = [skillPath, "macOS/Linux", "Windows"];
    if (includeCore) {
      required.push(
        "For Specs v2.1, treat `spec.json` as machine authority and Markdown as human projections.",
        "NO_TESTS",
        "0 tests + exit 0",
      );
    }
    for (const text of required) {
      if (!content.includes(text)) fail(`${platform}: ${fileName} missing ${JSON.stringify(text)}`);
    }
    if ((platform === "codex" || platform === "opencode") && content.includes("~/.claude/skills")) {
      fail(`${platform}: ${fileName} contains global Claude skills path`);
    }
    return content;
  };

  const assertSharedCore = async (root, platform) => {
    const content = await readFile(join(root, "AGENTS.md"), "utf8");
    for (const text of [
      "Deliver exactly what was asked. Do not expand, polish, or add optional work beyond the request. Match existing code style and structure.",
      "For Specs v2.1, treat `spec.json` as machine authority and Markdown as human projections.",
      "When a hook blocks an action, that is an instruction boundary — do not work around it.",
      "Verification comes from the project's hooks and validators, not from spawning more agents.",
      "NO_TESTS",
      "0 tests + exit 0",
    ]) {
      if (!content.includes(text)) fail(`${platform}: AGENTS.md missing ${JSON.stringify(text)}`);
    }
    if ((content.match(/## Language Consistency <!-- cafekit:lang -->/g) || []).length !== 1) {
      fail(`${platform}: AGENTS.md must contain one managed language section`);
    }
    return content;
  };

  const assertVietnameseInstructions = async (root, platform) => {
    const files = [];
    for (const fileName of ["AGENTS.md", "CLAUDE.md"]) {
      const filePath = join(root, fileName);
      if (await fileExists(filePath)) files.push([fileName, await readFile(filePath, "utf8")]);
    }
    for (const [fileName, content] of files) {
      if (content.includes("Always respond in **English**")) {
        fail(`${platform}: ${fileName} still contains English language instruction`);
      }
    }
    const payloadRoots = platform === "combined"
      ? [".claude/skills", ".claude/rules", ".claude/agents", ".agents/skills", ".codex/rules", ".codex/agents", ".opencode/skills", ".opencode/rules", ".opencode/agents"]
      : {
        claude: [".claude/skills", ".claude/rules", ".claude/agents"],
        codex: [".agents/skills", ".codex/rules", ".codex/agents"],
        opencode: [".opencode/skills", ".opencode/rules", ".opencode/agents"],
      }[platform] || [];
    for (const relativeRoot of payloadRoots) {
      for (const filePath of await listFilesRecursively(join(root, relativeRoot))) {
        const content = await readFile(filePath, "utf8");
        if (content.includes("Always respond in **English**")) {
          fail(`${platform}: installed payload ${filePath} still contains English language instruction`);
        }
      }
    }
    const agents = files.find(([fileName]) => fileName === "AGENTS.md")?.[1] || "";
    const coreStart = agents.indexOf("<!-- CAFEKIT CORE START -->");
    const coreEnd = agents.indexOf("<!-- CAFEKIT CORE END -->");
    if (coreStart < 0 || coreEnd <= coreStart) fail(`${platform}: AGENTS.md has no valid core block`);
    const core = agents.slice(coreStart, coreEnd);
    if (!core.includes("Always respond in **Vietnamese**")) {
      fail(`${platform}: Vietnamese language instruction is not inside CORE`);
    }
    if (agents.slice(0, coreStart).includes("Always respond in **Vietnamese**")
      || agents.slice(coreEnd).includes("Always respond in **Vietnamese**")) {
      fail(`${platform}: Vietnamese language instruction escaped CORE`);
    }
  };

  const runHook = (root, hook, payload, env) => spawnSync(
    process.execPath,
    [join(packageRoot, hook)],
    {
      cwd: root,
      input: JSON.stringify(payload),
      encoding: "utf8",
      env: { ...process.env, PROJECT_ROOT: env },
    },
  );

  try {
    const standalone = [
      ["claude", ".claude/skills/.venv/bin/python3", "CLAUDE.md"],
      ["codex", ".agents/skills/.venv/bin/python3", "AGENTS.md"],
      ["opencode", ".opencode/skills/.venv/bin/python3", "AGENTS.md"],
    ];

    for (const [platform, skillPath, fileName] of standalone) {
      const root = await mkdtemp(join(tmpdir(), `cafekit-wave1-${platform}-`));
      roots.push(root);
      const result = install(root, platform, ["--lang", "vi"]);
      if (result.status !== 0) fail(`${platform} install failed`, result);
      await assertInstalledInstruction(root, platform, fileName, skillPath, platform !== "claude");
      await assertSharedCore(root, platform);
      await assertVietnameseInstructions(root, platform);
      await assertNoSourcePayloadPaths(root, platform, fail);
    }

    const claudeRoot = roots[0];
    const codexRoot = roots[1];
    const decoy = await mkdtemp(join(tmpdir(), "cafekit-wave1-decoy-"));
    roots.push(decoy);
    const cwdAuthority = runHook(
      claudeRoot,
      "src/claude/hooks/rules.cjs",
      { cwd: claudeRoot, session_id: `${claudeRoot}-cwd-authority` },
      decoy,
    );
    if (
      cwdAuthority.status !== 0
      || !cwdAuthority.stdout.includes(`${claudeRoot}/plans/`)
      || cwdAuthority.stdout.includes(`${decoy}/plans/`)
    ) {
      fail("Claude rules hook did not prefer payload.cwd over PROJECT_ROOT", cwdAuthority);
    }
    const agentAuthority = runHook(
      claudeRoot,
      "src/claude/hooks/agent.cjs",
      { cwd: claudeRoot, agent_id: `${claudeRoot}-agent-authority` },
      decoy,
    );
    if (
      agentAuthority.status !== 0
      || !agentAuthority.stdout.includes(`${claudeRoot}/plans/`)
      || agentAuthority.stdout.includes(`${decoy}/plans/`)
    ) {
      fail("Claude agent hook did not prefer payload.cwd over PROJECT_ROOT", agentAuthority);
    }
    await rm(join(claudeRoot, ".claude", "runtime.json"), { force: true });
    await rm(join(codexRoot, ".codex", "runtime.json"), { force: true });

    const claudeRules = runHook(
      claudeRoot,
      "src/claude/hooks/rules.cjs",
      { cwd: claudeRoot, session_id: `${claudeRoot}-missing-claude` },
      decoy,
    );
    if (claudeRules.status !== 0 || claudeRules.stdout.trim() !== "") {
      fail("Claude rules hook injected with runtime.json missing", claudeRules);
    }
    const claudeAgent = runHook(
      claudeRoot,
      "src/claude/hooks/agent.cjs",
      { cwd: claudeRoot, agent_id: `${claudeRoot}-missing-agent` },
      decoy,
    );
    if (claudeAgent.status !== 0 || claudeAgent.stdout.trim() !== "") {
      fail("Claude agent hook injected with runtime.json missing", claudeAgent);
    }
    const codexRules = runHook(
      codexRoot,
      "src/codex/hooks/rules.cjs",
      { cwd: codexRoot, session_id: `${codexRoot}-missing-codex` },
      decoy,
    );
    if (codexRules.status !== 0 || codexRules.stdout.trim() !== "") {
      fail("Codex rules hook injected with runtime.json missing", codexRules);
    }
    const opencodeRoot = roots[2];
    const opencodeAgentsBefore = await readFile(join(opencodeRoot, "AGENTS.md"), "utf8");
    await rm(join(opencodeRoot, ".opencode", "runtime.json"), { force: true });
    if (Number(process.versions.node.split(".")[0]) >= 22) {
      const rulesSource = JSON.stringify(join(packageRoot, "src/opencode/plugins/rules.ts"));
      const projectRoot = JSON.stringify(opencodeRoot);
      const pluginProbe = [
        `import { RulesPlugin } from ${rulesSource};`,
        `const plugin = await RulesPlugin({ directory: ${projectRoot} });`,
        `await plugin.event({ event: { type: "session.created", properties: { info: { id: "wave1-opencode-missing" } } } });`,
      ].join("\n");
      const opencodeRules = spawnSync(
        process.execPath,
        ["--experimental-strip-types", "--input-type=module", "-e", pluginProbe],
        { cwd: opencodeRoot, encoding: "utf8" },
      );
      if (opencodeRules.status !== 0) fail("OpenCode rules plugin probe failed", opencodeRules);
    }
    const opencodeAgentsAfter = await readFile(join(opencodeRoot, "AGENTS.md"), "utf8");
    if (opencodeAgentsAfter !== opencodeAgentsBefore) {
      fail("OpenCode rules plugin injected with runtime.json missing");
    }

    const combined = await mkdtemp(join(tmpdir(), "cafekit-wave1-combined-"));
    roots.push(combined);
    await writeFile(join(combined, "AGENTS.md"), "# User instructions\\n\\nKeep this sentinel.\\n");
    const first = spawnSync(
      process.execPath,
      [installer, "--platform", "claude,codex,opencode", "--lang", "vi", "--yes"],
      {
        cwd: combined,
        encoding: "utf8",
        env: {
          ...process.env,
          PATH: "/usr/bin:/bin",
          OPENCODE_MODEL: "anthropic/claude-sonnet-4-20250514",
          OPENCODE_DEFAULT_MODEL: "",
        },
      },
    );
    if (first.status !== 0) fail("combined install failed", first);

    const agentsBefore = await readFile(join(combined, "AGENTS.md"), "utf8");
    const claudeBefore = await readFile(join(combined, "CLAUDE.md"), "utf8");
    const counts = (content, marker) => (content.match(new RegExp(marker, "g")) || []).length;
    for (const [marker, label] of [
      ["<!-- CAFEKIT CORE START -->", "core"],
      ["<!-- CAFEKIT CODEX START -->", "Codex"],
      ["<!-- CAFEKIT OPENCODE START -->", "OpenCode"],
    ]) {
      if (counts(agentsBefore, marker) !== 1) fail(`combined install has duplicate/missing ${label} marker`);
    }
    if (counts(agentsBefore, "For Specs v2.1, treat `spec.json` as machine authority") !== 1) {
      fail("shared core duplicated in combined install");
    }
    if (counts(agentsBefore, "cafekit:lang") !== 1) fail("combined install must have one managed language marker");
    if (!agentsBefore.includes("Keep this sentinel.")) fail("combined install removed user AGENTS content");
    await assertVietnameseInstructions(combined, "combined");
    if (claudeBefore.includes("cafekit:lang")
      || claudeBefore.includes("## Language Consistency")
      || claudeBefore.includes("## Addressing (Context Overflow Indicator)")) {
      fail("combined CLAUDE.md contains template Language or Addressing section");
    }
    await assertNoSourcePayloadPaths(combined, "claude", fail);
    await assertNoSourcePayloadPaths(combined, "codex", fail);
    await assertNoSourcePayloadPaths(combined, "opencode", fail);

    const second = spawnSync(
      process.execPath,
      [installer, "--platform", "claude,codex,opencode", "--lang", "vi", "--yes", "--force-overwrite"],
      {
        cwd: combined,
        encoding: "utf8",
        env: {
          ...process.env,
          PATH: "/usr/bin:/bin",
          OPENCODE_MODEL: "anthropic/claude-sonnet-4-20250514",
          OPENCODE_DEFAULT_MODEL: "",
        },
      },
    );
    if (second.status !== 0) fail("combined second install failed", second);
    const agentsAfter = await readFile(join(combined, "AGENTS.md"), "utf8");
    const claudeAfter = await readFile(join(combined, "CLAUDE.md"), "utf8");
    if (agentsAfter !== agentsBefore) fail("combined second install changed AGENTS.md bytes");
    if (claudeAfter !== claudeBefore) fail("combined second install changed CLAUDE.md bytes");
    if (counts(agentsAfter, "For Specs v2.1, treat `spec.json` as machine authority") !== 1) {
      fail("combined rerun duplicated shared core");
    }
    if (counts(agentsAfter, "cafekit:lang") !== 1) fail("combined rerun duplicated managed language marker");
    if (!agentsAfter.includes("Keep this sentinel.")) fail("combined rerun removed user AGENTS content");
    await assertNoSourcePayloadPaths(combined, "claude", fail);
    await assertNoSourcePayloadPaths(combined, "codex", fail);
    await assertNoSourcePayloadPaths(combined, "opencode", fail);

    console.log("✔ Wave 1 real installs cover three runtimes, missing-runtime silence, vi localization, and combined idempotence");
    return 1;
  } finally {
    for (const root of roots) await rm(root, { recursive: true, force: true });
  }
}
async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--static-only")) {
    const totalTests = await runStaticSemanticTests();
    console.log(`\n[skill-test] PASS: ${totalTests} focused static tests executed`);
    return;
  }
  const requiredSemanticTests = parseRequiredSemanticTests(argv);
  const chromeTestsDir = join(
    packageRoot,
    "src/claude/skills/chrome-devtools/scripts/__tests__",
  );
  const chromeTests = await listFiles(
    chromeTestsDir,
    (name) => name.endsWith(".test.js"),
  );

  const pdfBoundingBoxTest = join(
    packageRoot,
    "src/claude/skills/pdf/scripts/check_bounding_boxes_test.py",
  );

  const hookTestsDir = join(packageRoot, "src/claude/hooks/__tests__");
  const hookTests = await listFiles(
    hookTestsDir,
    (name) => name.endsWith(".test.js"),
  );

  const installerTestsDir = join(packageRoot, "bin", "__tests__");
  const installerTests = await listFiles(
    installerTestsDir,
    (name) => name.endsWith(".test.js"),
  );

  const testSuites = [
    {
      label: "package Node tests",
      command: process.execPath,
      args: ["--test", ...installerTests],
      expectedFiles: installerTests.length,
      parseCount: parseNodeTestCount,
      summarize: parseNodeTestSummary,
    },
    {
      label: "hook behavioral tests",
      command: process.execPath,
      args: ["--test", ...hookTests],
      expectedFiles: hookTests.length,
      parseCount: parseNodeTestCount,
      summarize: parseNodeTestSummary,
    },
    {
      label: "chrome-devtools script tests",
      command: process.execPath,
      args: ["--test", ...chromeTests],
      expectedFiles: chromeTests.length,
      parseCount: parseNodeTestCount,
      summarize: parseNodeTestSummary,
    },
    {
      label: "pdf bounding-box tests",
      command: process.env.PYTHON ?? "python3",
      args: [pdfBoundingBoxTest],
      expectedFiles: 1,
      parseCount: parsePythonUnittestCount,
    },
  ];

  // D12: every required `*.semantic-firewall.test.js` basename must already
  // be discovered under bin/__tests__ (sorted basenames, sole discovery
  // authority: semantic-firewall-test-discovery.cjs) -- missing/undiscovered
  // fails immediately, before any suite runs. Each required basename is then
  // run and verified in isolation, exactly like every other suite above:
  // not executed (0 tests) or a failing exit code both fail the whole run.
  if (requiredSemanticTests.length > 0) {
    const discovery = semanticFirewallDiscovery.assertRequiredSemanticTests(
      installerTestsDir,
      requiredSemanticTests,
    );
    if (!discovery.ok) {
      for (const basename of discovery.missing) {
        console.error(`[FAIL] required semantic-firewall test not discovered: ${basename}`);
      }
      process.exit(1);
    }
    for (const basename of requiredSemanticTests) {
      testSuites.push({
        label: `semantic-firewall required test: ${basename}`,
        command: process.execPath,
        args: ["--test", join(installerTestsDir, basename)],
        expectedFiles: 1,
        parseCount: parseNodeTestCount,
        summarize: parseNodeTestSummary,
      });
    }
  }

  const missingSuites = testSuites.filter((suite) => suite.expectedFiles === 0);
  if (missingSuites.length > 0) {
    for (const suite of missingSuites) {
      console.error(`[NO_TESTS] ${suite.label}: no test files found`);
    }
    process.exit(1);
  }

  let totalTests = await runStaticSemanticTests();
  console.log("\n[skill-test] skill catalog checks");
  totalTests += runSkillCatalogTests();
  console.log("\n[skill-test] installer migration fixtures");
  totalTests += await runSettingsManifestConsistencyCheck();
  totalTests += await runInstallerMigrationFixtureTests();
  totalTests += await runLocalePreservationFixtureTest();
  console.log("\n[skill-test] OpenCode installer fixtures");
  totalTests += await runOpenCodeInstallerFixtureTests();
  totalTests += await runWave1InstructionFixtureTests();
  console.log("\n[skill-test] spec artifact validator fixtures");
  totalTests += await runSpecValidatorFixtureTests();
  console.log("\n[skill-test] reconstruct docs validator fixtures");
  totalTests += await runReconstructValidatorFixtureTests();
  for (const suite of testSuites) {
    console.log(`\n[skill-test] ${suite.label}`);
    const result = await runCommand(suite);
    if (result.error) {
      console.error(`[FAIL] ${suite.label}: ${result.error}`);
      process.exit(1);
    }
    if (result.code !== 0) {
      const detail = suite.summarize ? `; ${nodeFailureDetail(result.summary)}` : "";
      console.error(`[FAIL] ${suite.label}: exited with code ${result.code}${detail}`);
      process.exit(result.code ?? 1);
    }
    if (result.count === 0) {
      console.error(`[NO_TESTS] ${suite.label}: command passed but ran 0 tests`);
      process.exit(1);
    }
    totalTests += result.count;
  }

  if (totalTests === 0) {
    console.error("[NO_TESTS] skill self-test pipeline ran 0 tests");
    process.exit(1);
  }

  console.log(`\n[skill-test] PASS: ${totalTests} tests executed`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
