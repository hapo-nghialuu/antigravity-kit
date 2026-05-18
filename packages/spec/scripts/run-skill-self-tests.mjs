#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
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
        content.includes("📌 Next step: /hapo:develop <feature>"),
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
