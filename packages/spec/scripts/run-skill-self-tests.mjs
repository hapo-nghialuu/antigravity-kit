#!/usr/bin/env node

import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function listFiles(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && predicate(entry.name))
    .map((entry) => join(directory, entry.name))
    .sort();
}

function runCommand({ label, command, args, parseCount }) {
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
      resolveRun({ label, code, count: parseCount(output) });
    });
  });
}

function parseNodeTestCount(output) {
  const match = output.match(/^(?:#|ℹ)\s+tests\s+(\d+)/m);
  return match ? Number(match[1]) : 0;
}

function parsePythonUnittestCount(output) {
  const match = output.match(/Ran\s+(\d+)\s+tests?/);
  return match ? Number(match[1]) : 0;
}

async function runStaticSemanticTests() {
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
        content.includes("### Hard Output Contract") &&
        content.includes("Do NOT create `specs/<feature>/init.json`.") &&
        content.includes("Do NOT create `specs/<feature>/hydration.md`.") &&
        content.includes("tasks/task-R0-1.md"),
    },
    {
      label: "spec-maker artifact contract forbids init and hydration artifacts",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) =>
        content.includes("## Artifact Contract (MANDATORY)") &&
        content.includes("never write `init.json` or `spec-state.json`") &&
        content.includes("Do NOT write `hydration.md`"),
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
        content.includes("isClaudeCompatibleRuntime(platformKey)") &&
        content.includes("normalizeOpenCodeBody") &&
        content.includes("warnLegacyClaudeFolder"),
    },
    {
      label: "OpenCode has dedicated project instruction template",
      file: "src/opencode/AGENTS.md",
      assert: (content) =>
        content.includes("OpenCode Runtime Mapping") &&
        content.includes("without the `hapo:` prefix") &&
        content.includes("/question <question>") &&
        content.includes("/specs <feature-or-spec-command>") &&
        content.includes("Claude Code hooks/statusline/settings do not run in OpenCode"),
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
        content.includes("'.claude/'") &&
        content.includes("'.opencode/'") &&
        content.includes("'.cafekit-backup/'") &&
        content.includes("'.cafekit.lock'") &&
        content.includes("function hasPattern"),
    },
    {
      label: "hapo:specs handoff block points to hapo:develop",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("📌 Next step — run:\n   /hapo:develop <feature>"),
    },
    {
      label: "hapo:specs forbids legacy work handoff",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) => content.includes("Never suggest `/work`"),
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
      label: "hapo:specs validate uses hapo develop handoff",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("Validation output MUST use `/hapo:develop <feature>`") &&
        content.includes("📌 Next step: /hapo:develop <feature>") &&
        content.includes("/specs <feature> --approve"),
    },
    {
      label: "hapo:specs validate hard-gates on deterministic validator",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("## Deterministic Validator Gate (MANDATORY)") &&
        content.includes("node .claude/scripts/validate-spec-output.cjs specs/<feature>") &&
        content.includes("If the validator exits non-zero, final verdict is **FAIL / BLOCKED**") &&
        content.includes("Do NOT report PASS"),
    },
    {
      label: "hapo:specs validate guardrail blocks develop handoff on validator failure",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("**MUST run deterministic validator.**") &&
        // Substring is invariant to "Script failure" (single-layer) vs the
        // Specs-v2 "Either script failing" (validator + grounding) wording.
        content.includes("overrides any LLM checklist result") &&
        content.includes("output MUST NOT suggest `/hapo:develop`"),
    },
    {
      label: "hapo:specs validate enforces CafeKit task filenames",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("tasks/task-R{N}-{SEQ}-<slug>.md") &&
        content.includes("tasks/R0-1-project-scaffolding.md"),
    },
    {
      label: "hapo:specs requirements template has no SDD phase marker",
      file: "src/claude/skills/specs/templates/requirements-init.md",
      assert: (content) => !content.includes("/sdd:"),
    },
    {
      label: "hapo:specs feature-description flow continues past init",
      file: "src/claude/skills/specs/SKILL.md",
      // Specs-v2 reworded this invariant; assert the current phrasing that
      // still guarantees Init is not a stop point.
      assert: (content) =>
        content.includes("Init is never a stop point"),
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
      label: "god-developer is single-track within its workspace with spec-state prohibition",
      file: "src/claude/agents/god-developer.md",
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
      label: "hapo:specs task rules require runtime reachability proof",
      file: "src/claude/skills/specs/rules/tasks-generation.md",
      assert: (content) =>
        content.includes("**Final Runtime Integration**") &&
        content.includes("**Reachability proof**") &&
        content.includes("orphaned deliverables are invalid") &&
        content.includes("golden shape is: `Context` -> `Steps` -> `Requirements`"),
    },
    {
      label: "hapo:specs loads planning decision frameworks",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("references/ask-user-question-gates.md") &&
        content.includes("rules/phase-decision-matrix.md") &&
        content.includes("rules/task-scoring-rubric.md") &&
        content.includes("implementation slices") &&
        content.includes("priority, split/merge, spike needs"),
    },
    {
      label: "hapo:specs ask-user gate matrix protects user-owned decisions",
      file: "src/claude/skills/specs/references/ask-user-question-gates.md",
      assert: (content) =>
        content.includes("# AskUserQuestion Gate Matrix") &&
        content.includes("Do not ask about facts") &&
        content.includes("Scope inquiry") &&
        content.includes("Architecture tie") &&
        content.includes("Validation findings") &&
        content.includes("Do not mark `ready_for_implementation = true`"),
    },
    {
      label: "hapo:specs phase and task scoring rules guide task generation",
      files: [
        "src/claude/skills/specs/rules/phase-decision-matrix.md",
        "src/claude/skills/specs/rules/task-scoring-rubric.md",
        "src/claude/skills/specs/rules/tasks-generation.md",
      ],
      assert: (content) =>
        content.includes("R0 Foundation") &&
        content.includes("Risk Spike") &&
        content.includes("Integration Gate") &&
        content.includes("Task Scoring Rubric") &&
        content.includes("Mandatory Overrides") &&
        content.includes("Pre-Generation Decision Gates") &&
        content.includes("Use the Phase Decision Matrix"),
    },
    {
      label: "hapo:specs compact task template keeps evidence gate",
      file: "src/claude/skills/specs/templates/task.md",
      assert: (content) =>
        content.includes("## Context") &&
        content.includes("## Constraints") &&
        content.includes("## Steps") &&
        content.includes("## Requirements") &&
        content.includes("## Related Files") &&
        content.includes("## Completion Criteria") &&
        content.includes("## Evidence") &&
        content.includes("## Risk Assessment") &&
        content.includes("Runtime reachability verification") &&
        content.includes("Logic/data/validator task") &&
        content.includes("Layout/theme/responsive task"),
    },
    {
      label: "hapo:specs forbids reduced task template shape",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("Template fidelity is mandatory") &&
        content.includes("Do NOT rename `## Context` to `## Objective`") &&
        content.includes("missing sections are invalid"),
    },
    {
      label: "spec validator rejects reduced task template sections",
      file: "src/claude/scripts/validate-spec-output.cjs",
      assert: (content) =>
        content.includes("missing Related Files") &&
        content.includes("missing Completion Criteria") &&
        content.includes("missing Risk Assessment") &&
        content.includes("missing Runtime reachability verification"),
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
      label: "hapo:specs finalization runs deterministic validator",
      file: "src/claude/skills/specs/SKILL.md",
      assert: (content) =>
        content.includes("validate-spec-output.cjs") &&
        content.includes("Any validator failure blocks `ready_for_implementation = true`"),
    },
    {
      label: "spec-maker runs deterministic validator before ready state",
      file: "src/claude/agents/spec-maker.md",
      assert: (content) =>
        content.includes("validate-spec-output.cjs") &&
        content.includes("fix every failure"),
    },
    {
      label: "hapo:develop scouts every task and enforces scope fidelity",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("<SCOPE-FIDELITY>") &&
        content.includes("Mandatory per task") &&
        content.includes("Final Integration Scout"),
    },
    {
      label: "hapo:develop supports explicit flash mode",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("[--flash]") &&
        content.includes("### 3. Flash Mode") &&
        content.includes("Skip dedicated test suites") &&
        content.includes("FLASH_UNVERIFIED") &&
        content.includes("Next verification: /hapo:test <feature>") &&
        content.includes("Flash output MUST NOT say `Test PASS`"),
    },
    {
      label: "hapo:develop maintains visual implementation notes",
      file: "src/claude/skills/develop/SKILL.md",
      assert: (content) =>
        content.includes("implementation-notes.html") &&
        content.includes("[--no-notes]") &&
        content.includes("references/implementation-notes-template.html") &&
        content.includes("Claude Code-like blocks") &&
        content.includes("scope-escape") &&
        content.includes("codebase-reality") &&
        content.includes("No spec gaps, tradeoffs, scope escapes, or deferred risks recorded for this task"),
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
        content.includes("CODE QUALITY REVIEW (only after spec compliance passes)") &&
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
      label: "CafeKit uses Research-style skill routing rules",
      file: "src/claude/CLAUDE.md",
      assert: (content) =>
        content.includes("skill-workflow-routing.md") &&
        content.includes("skill-domain-routing.md") &&
        content.includes("Analyze the skills catalog and activate the skills") &&
        content.includes("advisory routing when choosing a skill"),
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
      label: "CafeKit rules hook injects routing rule references",
      file: "src/claude/hooks/rules.cjs",
      assert: (content) =>
        content.includes("## Skill Routing") &&
        content.includes("skill-workflow-routing.md") &&
        content.includes("skill-domain-routing.md") &&
        content.includes("generate-skill-catalog.cjs --skills"),
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
      assert: (content) => content.split("\n").length <= 470,
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

  return checks.length;
}

function runSkillCatalogTests() {
  const scriptPath = join(packageRoot, "src/claude/scripts/generate-skill-catalog.cjs");
  const result = spawnSync(process.execPath, [scriptPath, "--skills"], {
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

  const json = spawnSync(process.execPath, [scriptPath, "--json"], {
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

  const failures = [];
  for (const hook of registered) {
    if (!shipped.has(hook)) failures.push(`registered in settings but not in manifest runtime.files: ${hook}`);
    if (!(await fileExists(join(packageRoot, "src/claude", hook)))) {
      failures.push(`registered in settings but payload file missing: ${hook}`);
    }
  }
  for (const hook of shipped) {
    if (!registered.has(hook)) failures.push(`shipped in manifest but registered in no settings event: ${hook}`);
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
    const godDeveloperAgent = await readFile(
      join(root, ".opencode", "agents", "god-developer.md"),
      "utf8",
    );
    const specsCommand = await readFile(join(root, ".opencode", "commands", "specs.md"), "utf8");
    const questionCommand = await readFile(join(root, ".opencode", "commands", "question.md"), "utf8");
    const agentFrontmatter = godDeveloperAgent.split("---")[1] || "";
    const commandFrontmatter = specsCommand.split("---")[1] || "";
    const questionFrontmatter = questionCommand.split("---")[1] || "";
    const failures = [];

    if (metadata.platform !== "opencode") {
      failures.push("OpenCode cafekit.json metadata has wrong platform");
    }
    if (!(await fileExists(join(root, ".opencode", "agents", "god-developer.md")))) {
      failures.push("OpenCode agent bundle was not installed");
    }
    if (!godDeveloperAgent.includes("mode: subagent")) {
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
    if (agentFrontmatter.includes("name: god-developer") || agentFrontmatter.includes("tools:")) {
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
  const specDir = join(root, "valid-spec");
  const taskPath = "tasks/task-R1-01-user-permission.md";
  await writeText(
    join(specDir, "spec.json"),
    JSON.stringify(
      {
        feature_name: "valid-spec",
        status: "in_progress",
        current_phase: "tasks",
        scope_lock: {
          source: "Add user permission control",
          in_scope: ["1"],
          out_of_scope: [],
          expansion_policy: "requires-user-approval",
        },
        approvals: {
          requirements: { generated: true, approved: true },
          design: { generated: true, approved: true },
          tasks: { generated: true, approved: true },
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
          },
        },
        ready_for_implementation: false,
      },
      null,
      2,
    ),
  );
  await writeText(
    join(specDir, "requirements.md"),
    `# Requirements\n\n### Requirement 1: User Permission\nWHEN an admin toggles permission, THE SYSTEM SHALL persist the user permission state.\n`,
  );
  await writeText(
    join(specDir, "research.md"),
    `# Research\n\n## Evidence Summary\n- Codebase scout result: backend user model and admin route identified.\n- External research result or skip rationale: skipped, internal CRUD change.\n- Selected decision: extend existing admin route.\n- Rejected alternatives: new service boundary.\n- Remaining gaps: none.\n- Downstream task/test implications: unit test permission toggle.\n`,
  );
  await writeText(join(specDir, "design.md"), "# Design\n\nUse existing admin route.\n");
  await writeText(
    join(specDir, taskPath),
    `# Task R1-01: User permission control\n\n## Context\n- Why: Admins need to control workspace creation.\n- Current state: Existing admin route.\n- Target outcome: Permission can be toggled.\n\n## Constraints\n- MUST: Preserve existing admin auth checks.\n- SHOULD: Reuse existing route patterns.\n- MUST NOT: Add a new auth system.\n- SCOPE: Permission toggle only.\n\n## Steps\n- [ ] 1. Update admin route\n  - Business intent: allow admin permission control.\n  - Code detail: PATCH /admin/users/{id}/permissions.\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — Persist user permission state.\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`backend/app/api/v1/admin.py\` | Modify | Permission endpoint |\n\n## Completion Criteria\n- [ ] Admin can toggle permission.\n- [ ] Invalid user returns 404.\n\n## Evidence\n- [ ] Automated verification\n  - Command(s): \`pytest backend/tests/test_admin_permissions.py\`\n  - Expected proof: tests pass\n- [ ] Artifact / runtime verification\n  - Inspect: \`PATCH /admin/users/{id}/permissions\`\n  - Expect: response contains updated permission\n- [ ] Runtime reachability verification\n  - Entrypoint/caller: \`backend/app/api/v1/admin.py\`\n  - Expect: route is registered in admin router\n- [ ] Contract / negative-path verification\n  - Check: missing user id\n  - Expect: 404\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None identified | - | - |\n`,
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
      "research.md",
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

    // Multi-contract drift: EVERY tagged contract copy must be verified,
    // not just the first fenced block (regression guard for the old
    // first-block-only extractTaskContracts).
    const driftSpec = join(root, "multi-contract-drift-spec");
    await cp(validSpec, driftSpec, { recursive: true });
    await writeText(
      join(driftSpec, "design.md"),
      '# Design\n\n<!-- contract:PermissionPayload -->\n```json\n{ "user_id": 1, "can_create": true }\n```\n\n<!-- contract:PermissionError -->\n```json\n{ "error": "not_found" }\n```\n',
    );
    const driftTaskPath = join(driftSpec, "tasks/task-R1-01-user-permission.md");
    const driftTask = (await readFile(driftTaskPath, "utf8")).replace(
      "## Requirements",
      'Contracts: PermissionPayload, PermissionError\n\n<!-- contract:PermissionPayload -->\n```json\n{ "user_id": 1, "can_create": true }\n```\n\n<!-- contract:PermissionError -->\n```json\n{ "error": "notFound" }\n```\n\n## Requirements',
    );
    await writeText(driftTaskPath, driftTask);
    const drift = runSpecValidator(driftSpec);
    const driftOutput = `${drift.stdout}\n${drift.stderr}`;
    if (drift.status === 0 || !driftOutput.includes('contract "PermissionError" body diverges')) {
      console.error(driftOutput);
      console.error("[FAIL] spec validator missed drift in a non-first contract block");
      process.exit(1);
    }
    console.log("✔ spec validator catches drift in every tagged contract block");
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

async function main() {
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
      label: "installer safety tests",
      command: process.execPath,
      args: ["--test", ...installerTests],
      expectedFiles: installerTests.length,
      parseCount: parseNodeTestCount,
    },
    {
      label: "hook behavioral tests",
      command: process.execPath,
      args: ["--test", ...hookTests],
      expectedFiles: hookTests.length,
      parseCount: parseNodeTestCount,
    },
    {
      label: "chrome-devtools script tests",
      command: process.execPath,
      args: ["--test", ...chromeTests],
      expectedFiles: chromeTests.length,
      parseCount: parseNodeTestCount,
    },
    {
      label: "pdf bounding-box tests",
      command: process.env.PYTHON ?? "python3",
      args: [pdfBoundingBoxTest],
      expectedFiles: 1,
      parseCount: parsePythonUnittestCount,
    },
  ];

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
      console.error(`[FAIL] ${suite.label}: exited with code ${result.code}`);
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
