import type { TutorialContent } from "./tutorial-types";

export const tutorialContentEn: TutorialContent = {
  eyebrow: "Getting started",
  title: "Your first CafeKit feature",
  description: "A step-by-step guide from zero install to your first verified feature. Takes about 15 minutes.",
  ui: {
    stepWord: "Step",
    youWillSeeLabel: "What you'll see",
    troubleshootingLabel: "If something goes wrong",
    glossaryLabel: "New terms",
    replay: "Replay",
    back: "← Back",
    next: "Next →",
    prerequisiteItems: [
      "Node.js 18 or later (check: node --version)",
      "A terminal open — Terminal on Mac, PowerShell on Windows",
      "Claude Code installed (see links below — do NOT use sudo)",
      "An existing project folder to work in",
    ],
    installCommand: "npm install -g @anthropic-ai/claude-code",
  },
  steps: [
    {
      id: "prereqs",
      label: "Prepare",
      title: "What you need before starting",
      narrative: [
        "CafeKit runs inside Claude Code — an AI coding assistant you control from your terminal. You type /cf:* commands inside a Claude Code session, not in a regular terminal prompt.",
        "You'll need three things ready. Once you have them, come back and click Next.",
      ],
      links: [
        { label: "Install Claude Code", href: "https://code.claude.com/docs/en/setup", external: true },
        { label: "Your first day in Claude Code", href: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code", external: true },
        { label: "Using Codex CLI?", href: "/docs/platforms" },
      ],
    },
    {
      id: "install",
      label: "Install",
      title: "Install CafeKit into your project",
      narrative: [
        "Open your terminal, navigate to your project folder, then run the installer. It asks for language, runtime, addressing, and skill dependencies, then writes a native bundle for Claude Code or Codex CLI.",
      ],
      command: "npx @haposoft/cafekit",
      outputs: [
        { kind: "output", text: "Select language · 言語を選択 · Chọn ngôn ngữ" },
        { kind: "output", text: "selecting platform: Claude Code…" },
        { kind: "output", text: "Claude Code or Codex CLI — native runtime selected" },
        { kind: "output", text: "configuring addressing (how AI calls you)…" },
        { kind: "success", text: "✓ skill dependencies ready (Python venv, pip, npm, Chromium)" },
        { kind: "success", text: "✓ installation complete — installed: 67  updated: 1  unchanged: 6" },
      ],
      youWillSee: [
        "Interactive prompts: language, runtime, addressing, and skill dependencies",
        "A new .claude/ or .codex/ runtime in your project root",
        "Claude Code gets .claude/ and CLAUDE.md; Codex gets .agents/, .codex/, and an AGENTS.md block",
      ],
      troubleshooting: [
        { problem: "npx command not found", fix: "Node.js 18+ is required. Check: node --version" },
        { problem: "Permission error", fix: "Do not use sudo. On Mac check: npm config get prefix" },
      ],
    },
    {
      id: "spec",
      label: "Create spec",
      title: "Create your first spec",
      narrative: [
        "Now open a Claude Code session inside your project by running claude in the terminal. You are now inside Claude Code — this is where you type /cf:* commands.",
        "A spec is a written contract that describes what you want to build before code starts. Specs first asks C1 to lock scope, writes the plan and flat tasks, then presents C2 findings for your decision.",
      ],
      command: "/cf:specs Build a word counter that counts words in a sentence",
      outputs: [
        { kind: "output", text: "C1 → confirm outcome, scope, exclusions, and constraints" },
        { kind: "success", text: "✓ specs/word-counter/plan.md" },
        { kind: "success", text: "✓ specs/word-counter/task-01-count-words.md" },
        { kind: "output", text: "C2 → review findings and decide before implementation" },
      ],
      youWillSee: [
        "A new specs/word-counter/ folder with plan.md and flat task files",
        "plan.md — scope, exclusions, acceptance criteria, and task map",
        "task-01-count-words.md — one outcome, one Status field, and a planned proof command",
      ],
      troubleshooting: [
        { problem: "/cf:specs not recognized", fix: "Make sure you ran npx @haposoft/cafekit in this project. Check that .claude/ exists." },
        { problem: "Command runs but no output", fix: "You may be in a regular terminal, not a Claude Code session. Run claude first, then try again." },
      ],
      glossary: [
        { term: "spec", definition: "A folder of files that describes what to build. The source of truth — not the chat." },
        { term: "task packet", definition: "A small scoped implementation unit defined in a flat task-NN-*.md file." },
      ],
    },
    {
      id: "validate",
      label: "Approve",
      title: "Resolve C2 before writing code",
      narrative: [
        "After adversarial review, CafeKit presents material gaps, risks, and contradictions at C2. Accept them, request changes, or keep an explicitly named limitation before starting implementation.",
      ],
      command: "Accept all",
      outputs: [
        { kind: "output", text: "recording C2 decisions in plan.md…" },
        { kind: "success", text: "✓ scope and findings accepted" },
        { kind: "success", text: "✓ ready for a new explicit /cf:develop invocation" },
      ],
      youWillSee: [
        "C2 decisions are durable in plan.md",
        "Planning stops here; implementation starts only with a new develop command",
      ],
      troubleshooting: [
        { problem: "A finding is unclear", fix: "Ask what decision it changes. Do not accept a material limitation you do not understand." },
      ],
    },
    {
      id: "develop",
      label: "Code",
      title: "Implement the first task",
      narrative: [
        "Now implement — one task at a time. CafeKit reads the task file, checks what needs to be built, and implements it. After coding it runs a quality gate: build, evidence, and review must all pass.",
      ],
      command: "/cf:develop word-counter",
      outputs: [
        { kind: "output", text: "reading plan.md and task-01-count-words.md…" },
        { kind: "output", text: "implementing countWords()…" },
        { kind: "output", text: "quality gate → build · evidence · review" },
        { kind: "success", text: "✓ implementation complete" },
        { kind: "success", text: "✓ task Status: done with inline Receipt" },
      ],
      youWillSee: [
        "The countWords() function created in your project",
        "A verification receipt inside the task file",
        "The task Status and final inline Receipt are updated by the controller",
      ],
      glossary: [
        { term: "quality gate", definition: "Three checks before a task is done: build succeeds, evidence is recorded, review finds no blockers." },
        { term: "Receipt", definition: "The task's canonical proof: exact command, exit, verification verdict, Base, Head, and current output." },
      ],
    },
    {
      id: "test",
      label: "Test",
      title: "Verify with real tests",
      narrative: [
        "Run the test suite. CafeKit checks build, types, and tests — and rejects shallow results. A command that exits 0 while running zero tests is NOT a pass.",
      ],
      command: "/cf:test",
      outputs: [
        { kind: "output", text: "detecting test runner…" },
        { kind: "output", text: "running test suite…" },
        { kind: "success", text: "✓ 3 passed   0 failed" },
        { kind: "success", text: "✓ verdict: PASS" },
      ],
      youWillSee: [
        "Test count > 0 — real tests ran",
        "verdict: PASS — build, types, and tests all green",
      ],
      troubleshooting: [
        { problem: "verdict: NO_TESTS", fix: "No test file found. Add a test for countWords() and run /cf:test again. Zero tests is not a pass." },
        { problem: "Tests fail", fix: "Read the error. Fix the implementation or the test, then re-run /cf:test." },
      ],
      glossary: [
        { term: "NO_TESTS", definition: "No test suite ran. Never a passing result — tasks require real evidence." },
      ],
    },
    {
      id: "sync",
      label: "Done",
      title: "Review and mark as done",
      narrative: [
        "Run a code review to catch any issues, then sync the task state to done. A task is only done when implementation, evidence, tests, and review all agree.",
        "After review passes, sync only observed state. C3 is the final human decision that the current receipts and named limitations are good enough to close the feature.",
      ],
      command: "/cf:code-review",
      outputs: [
        { kind: "output", text: "reviewing word-counter implementation…" },
        { kind: "success", text: "✓ spec compliance: ok" },
        { kind: "success", text: "✓ no critical findings" },
        { kind: "output", text: "next: /cf:sync word-counter, then review C3" },
      ],
      youWillSee: [
        "no critical findings — ready to mark done",
        "task Status and inline Receipt remain synchronized after sync",
      ],
      troubleshooting: [
        { problem: "Critical findings in review", fix: "Fix the issues, re-run /cf:test, then /cf:code-review again before syncing." },
      ],
    },
  ],
  recap: {
    title: "You just shipped a verified feature",
    bullets: [
      "Spec first, code second — the contract prevents scope drift",
      "One task at a time — each change is small and reviewable",
      "Real evidence required — no fake green results",
      "State stays auditable — each task owns one Status and one current inline Receipt",
    ],
    nextLinks: [
      { label: "Spec-driven development", href: "/docs/spec-driven-development" },
      { label: "Core workflow", href: "/docs/core-workflow" },
      { label: "Browse skills", href: "/docs/skills" },
    ],
    glossary: [
      { term: "spec", definition: "Folder of files describing what to build before code starts." },
      { term: "task packet", definition: "Small scoped work unit with steps, criteria, and evidence." },
      { term: "C3", definition: "The user's final decision that current proof and limitations are sufficient to close the feature." },
      { term: "quality gate", definition: "Build + evidence + review — all three must pass." },
      { term: "NO_TESTS", definition: "No test suite ran. Never a passing result." },
    ],
  },
};
