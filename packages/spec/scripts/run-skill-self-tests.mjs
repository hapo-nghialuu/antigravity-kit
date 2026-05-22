#!/usr/bin/env node

import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

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
      label: "installer writes CafeKit version metadata",
      file: "bin/install.js",
      assert: (content) =>
        content.includes("cafekit.json") &&
        content.includes("writePlatformVersionMetadata") &&
        content.includes("previousVersion") &&
        content.includes("CafeKit Version") &&
        content.includes("const INSTALL_COMMAND = `npx ${packageJson.name}@${packageJson.version}`"),
    },
    {
      label: "installer maps Claude gitignore template to dotfile",
      file: "bin/install.js",
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
        content.includes("skills/**/node_modules/"),
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
        content.includes("Script failure overrides any LLM checklist result") &&
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
      label: "CafeKit skill router hook is packaged by manifest",
      file: "src/claude/migration-manifest.json",
      assert: (content) =>
        content.includes('"hooks/skill-router.cjs"') &&
        content.includes('"hooks/lib/skill-router-routes.cjs"'),
    },
    {
      label: "CafeKit skill router hook is installed on user prompts",
      file: "src/claude/settings/settings.json",
      assert: (content) =>
        content.includes('hooks/skill-router.cjs') &&
        content.indexOf('hooks/rules.cjs') < content.indexOf('hooks/skill-router.cjs') &&
        content.indexOf('hooks/skill-router.cjs') < content.indexOf('hooks/spec-state.cjs'),
    },
    {
      label: "CafeKit runtime config drives shared hook config",
      file: "src/claude/hooks/lib/config.cjs",
      assert: (content) =>
        content.includes("RUNTIME_CONFIG_PATH = '.claude/runtime.json'") &&
        content.includes("const CONFIG_PATH = RUNTIME_CONFIG_PATH") &&
        content.includes("if (runtimeConfig) merged = deepMerge(merged, runtimeConfig)") &&
        content.includes("'skill-router': true"),
    },
    {
      label: "docs sync respects runtime docs path",
      file: "src/claude/hooks/docs-sync.cjs",
      assert: (content) =>
        content.includes("loadConfig({ cwd") &&
        content.includes("config.paths?.docs || 'docs'"),
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
      label: "CafeKit skill router skips explicit slash commands",
      file: "src/claude/hooks/skill-router.cjs",
      assert: (content) =>
        content.includes("isExplicitCommand") &&
        content.includes("trimmed.startsWith('/')") &&
        content.includes("hapo:[a-z-]+"),
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

function runSkillRouterUnitTests() {
  const { findRoute, normalize, scoreRoute } = require(
    join(packageRoot, "src/claude/hooks/lib/skill-router-routes.cjs"),
  );
  const { loadConfig, isHookEnabled } = require(
    join(packageRoot, "src/claude/hooks/lib/config.cjs"),
  );
  const hookPath = join(packageRoot, "src/claude/hooks/skill-router.cjs");

  const cases = [
    ["Build a support dashboard spec with requirements", "hapo:specs"],
    ["hãy sửa lỗi production đang fail", "hapo:hotfix"],
    ["fix bug đăng nhập giúp tôi", "hapo:hotfix"],
    ["sửa lỗi build đang fail", "hapo:hotfix"],
    ["commit và push giúp tôi", "hapo:git"],
    ["thiết kế giao diện và màu sắc cho dashboard", "hapo:frontend-design"],
    ["tạo slide pptx cho seminar", "hapo:pptx"],
    ["biến ý tưởng này thành vài phương án triển khai", "hapo:brainstorm"],
    ["phân tích ảnh hưởng trước khi sửa module auth", "hapo:impact-analysis"],
    ["đưa chức năng đã approved spec vào code", "hapo:develop"],
    ["kiểm thử end to end sau khi làm xong", "hapo:test"],
    ["test toàn bộ feature này", "hapo:test"],
    ["xem source vì sao CI fail", "hapo:debug"],
    ["xem source code và cấu trúc project", "hapo:inspect"],
    ["kiểm tra source code phần auth nằm đâu", "hapo:inspect"],
    ["find files for auth flow", "hapo:inspect"],
    ["review React best practices for this Next.js page", "hapo:react-best-practices"],
    ["tối ưu rerender React component", "hapo:react-best-practices"],
    ["React app bị rerender nhiều, tối ưu giúp tôi", "hapo:react-best-practices"],
    ["use agent-browser to open website and click login", "hapo:agent-browser"],
    ["tự động thao tác trình duyệt để kiểm tra form", "hapo:agent-browser"],
    ["tạo sơ đồ luồng dữ liệu", "hapo:generate-graph"],
    ["sửa endpoint API và schema database", "hapo:backend-development"],
    ["xem screenshot này giúp tôi", "hapo:ai-multimodal"],
    ["仕様を作って、要件とタスクに分けて", "hapo:specs"],
    ["本番バグを至急修正して", "hapo:hotfix"],
    ["この不具合を修正して", "hapo:hotfix"],
    ["なぜCIが失敗するか原因調査して", "hapo:debug"],
    ["承認済み仕様に沿って実装して", "hapo:develop"],
    ["テストして動作確認して", "hapo:test"],
    ["コミットしてプッシュして", "hapo:git"],
    ["コード構造を確認して", "hapo:inspect"],
    ["Reactの再レンダー最適化を確認して", "hapo:react-best-practices"],
    ["ブラウザ自動化でログインフォームを操作して", "hapo:agent-browser"],
    ["ブラウザでフォーム入力を自動化して", "hapo:agent-browser"],
    ["画面デザインと配色を調整して", "hapo:frontend-design"],
    ["スライド資料を作って", "hapo:pptx"],
    ["画像を見て説明して", "hapo:ai-multimodal"],
  ];

  for (const [prompt, expectedSkill] of cases) {
    const actual = findRoute(prompt)?.skill;
    if (actual !== expectedSkill) {
      console.error(`[FAIL] skill router: ${prompt} -> ${actual}, expected ${expectedSkill}`);
      process.exit(1);
    }
  }

  if (normalize("lỗi kiểm thử") !== "loi kiem thu") {
    console.error("[FAIL] skill router: Vietnamese diacritic normalization failed");
    process.exit(1);
  }

  if (normalize("ｺﾐｯﾄしてﾌﾟｯｼｭして") !== "コミットしてプッシュして") {
    console.error("[FAIL] skill router: Japanese width normalization failed");
    process.exit(1);
  }

  if (findRoute("hello") !== null) {
    console.error("[FAIL] skill router: low-signal prompt should not route");
    process.exit(1);
  }

  const scored = scoreRoute("commit và push giúp tôi", {
    skill: "hapo:git",
    reason: "test",
    priority: 1,
    signals: { strong: ["commit", "push"], medium: [], weak: [], negative: [] },
  });
  if (scored.score < 12 || scored.confidence !== "high") {
    console.error("[FAIL] skill router: weighted scoring did not produce high confidence");
    process.exit(1);
  }

  const routed = spawnSync(process.execPath, [hookPath], {
    cwd: packageRoot,
    input: JSON.stringify({ prompt: "commit và push giúp tôi", cwd: packageRoot }),
    encoding: "utf8",
  });
  if (
    routed.status !== 0 ||
    !routed.stdout.includes("Suggested skill: `hapo:git`") ||
    !routed.stdout.includes("Confidence:")
  ) {
    console.error(routed.stdout);
    console.error(routed.stderr);
    console.error("[FAIL] skill router hook did not emit expected suggestion");
    process.exit(1);
  }

  const fsSync = require("node:fs");
  const os = require("node:os");
  const tempProject = fsSync.mkdtempSync(join(os.tmpdir(), "cafekit-runtime-config-"));
  try {
    fsSync.mkdirSync(join(tempProject, ".claude"), { recursive: true });
    fsSync.writeFileSync(
      join(tempProject, ".claude", "runtime.json"),
      JSON.stringify({
        hooks: { "skill-router": false },
        paths: { docs: "knowledge", specs: "specifications" },
        statusline: "minimal",
        statuslineColors: false,
      }),
    );

    const runtimeConfig = loadConfig({
      cwd: tempProject,
      includeProject: false,
      includeAssertions: false,
      includeLocale: false,
    });
    if (
      runtimeConfig.hooks["skill-router"] !== false ||
      runtimeConfig.paths.docs !== "knowledge" ||
      runtimeConfig.statusline !== "minimal" ||
      runtimeConfig.statuslineColors !== false
    ) {
      console.error(runtimeConfig);
      console.error("[FAIL] runtime.json did not drive shared hook config");
      process.exit(1);
    }

    if (isHookEnabled("skill-router", { cwd: tempProject }) !== false) {
      console.error("[FAIL] isHookEnabled ignored runtime.json skill-router=false");
      process.exit(1);
    }

    const disabled = spawnSync(process.execPath, [hookPath], {
      cwd: tempProject,
      input: JSON.stringify({ prompt: "commit và push giúp tôi", cwd: tempProject }),
      encoding: "utf8",
    });
    if (disabled.status !== 0 || disabled.stdout.trim() !== "") {
      console.error(disabled.stdout);
      console.error(disabled.stderr);
      console.error("[FAIL] skill router hook ignored runtime.json disable flag");
      process.exit(1);
    }
  } finally {
    fsSync.rmSync(tempProject, { recursive: true, force: true });
  }

  const explicit = spawnSync(process.execPath, [hookPath], {
    cwd: packageRoot,
    input: JSON.stringify({ prompt: "/hapo:specs Build dashboard", cwd: packageRoot }),
    encoding: "utf8",
  });
  if (explicit.status !== 0 || explicit.stdout.trim() !== "") {
    console.error(explicit.stdout);
    console.error(explicit.stderr);
    console.error("[FAIL] skill router hook did not skip explicit slash command");
    process.exit(1);
  }

  console.log("✔ skill router maps natural-language prompts");
  console.log("✔ skill router uses weighted scoring and confidence");
  console.log("✔ skill router normalizes Vietnamese diacritics and Japanese width");
  console.log("✔ skill router hook emits suggestions, reads runtime config, and skips slash commands");
  return cases.length + 6;
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
  console.log("\n[skill-test] skill router unit checks");
  totalTests += runSkillRouterUnitTests();
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
