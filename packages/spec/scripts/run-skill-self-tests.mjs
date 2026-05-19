#!/usr/bin/env node

import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
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
      env: process.env,
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
      file: "bin/install.js",
      assert: (content) =>
        content.includes("'spec-state.json'") &&
        content.includes("Removed legacy template") &&
        !content.includes("'init.json',"),
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
      label: "hapo:specs validate uses hapo develop handoff",
      file: "src/claude/skills/specs/references/review.md",
      assert: (content) =>
        content.includes("Validation output MUST use `/hapo:develop <feature>`") &&
        content.includes("📌 Next step: /hapo:develop <feature>") &&
        content.includes("/specs <feature> --approve"),
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
      assert: (content) =>
        content.includes("After user confirms scope, continue through Init") &&
        content.includes("Do not stop after Init unless the user explicitly asks for init-only behavior."),
    },
    {
      label: "legacy spec-init redirects to hapo specs resume",
      file: "src/claude/archive-command/spec-init.md",
      assert: (content) =>
        content.includes("templates/spec-state.json") &&
        content.includes("/hapo:specs resume <feature-name>") &&
        !content.includes("Command block showing `/spec-requirements"),
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
      label: "hapo:specs compact task template keeps evidence gate",
      file: "src/claude/skills/specs/templates/task.md",
      assert: (content) =>
        content.includes("## Context") &&
        content.includes("## Steps") &&
        content.includes("## Requirements") &&
        content.includes("## Evidence") &&
        content.includes("Runtime reachability verification") &&
        content.includes("Logic/data/validator task") &&
        content.includes("Layout/theme/responsive task"),
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
      label: "hapo:develop quality gate separates spec compliance and code quality",
      file: "src/claude/skills/develop/references/quality-gate.md",
      assert: (content) =>
        content.includes("Spec compliance review") &&
        content.includes("CODE QUALITY REVIEW (only after spec compliance passes)") &&
        content.includes("Reachability Failure"),
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
  ];

  console.log("\n[skill-test] static semantic checks");
  for (const check of checks) {
    const content = await readFile(join(packageRoot, check.file), "utf8");
    if (!check.assert(content)) {
      console.error(`[FAIL] ${check.label}: ${check.file}`);
      process.exit(1);
    }
    console.log(`✔ ${check.label}`);
  }

  return checks.length;
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
    `# Task R1-01: User permission control\n\n## Context\n- Why: Admins need to control workspace creation.\n- Current state: Existing admin route.\n- Target outcome: Permission can be toggled.\n\n## Steps\n- [ ] 1. Update admin route\n  - Business intent: allow admin permission control.\n  - Code detail: PATCH /admin/users/{id}/permissions.\n  - _Requirements: 1.1_\n\n## Requirements\n- 1.1 — Persist user permission state.\n\n## Related Files\n| Path | Action | Description |\n|---|---|---|\n| \`backend/app/api/v1/admin.py\` | Modify | Permission endpoint |\n\n## Completion Criteria\n- [ ] Admin can toggle permission.\n- [ ] Invalid user returns 404.\n\n## Evidence\n- [ ] Automated verification\n  - Command(s): \`pytest backend/tests/test_admin_permissions.py\`\n  - Expected proof: tests pass\n- [ ] Artifact / runtime verification\n  - Inspect: \`PATCH /admin/users/{id}/permissions\`\n  - Expect: response contains updated permission\n- [ ] Runtime reachability verification\n  - Entrypoint/caller: \`backend/app/api/v1/admin.py\`\n  - Expect: route is registered in admin router\n- [ ] Contract / negative-path verification\n  - Check: missing user id\n  - Expect: 404\n\n## Risk Assessment\n| Risk | Severity | Mitigation |\n|---|---|---|\n| None identified | - | - |\n`,
  );
  return specDir;
}

async function createInvalidSpecFixture(root) {
  const specDir = join(root, "invalid-triage-like-spec");
  const taskFiles = [
    "tasks/task-R0-01-project-setup.md",
    "tasks/task-R0-02-ticket-list.md",
    "tasks/task-R0-03-filtering.md",
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
      "research.md",
      "entirely R0",
      "missing Evidence",
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

  const testSuites = [
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
  console.log("\n[skill-test] spec artifact validator fixtures");
  totalTests += await runSpecValidatorFixtureTests();
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
