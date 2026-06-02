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
    openCodeNote: "Using OpenCode? Drop the hapo: prefix — use /specs, /develop, /test instead.",
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
        "CafeKit runs inside Claude Code — an AI coding assistant you control from your terminal. You type /hapo:* commands inside a Claude Code session, not in a regular terminal prompt.",
        "You'll need three things ready. Once you have them, come back and click Next.",
      ],
      links: [
        { label: "Install Claude Code", href: "https://code.claude.com/docs/en/setup", external: true },
        { label: "Your first day in Claude Code", href: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code", external: true },
        { label: "Using OpenCode instead?", href: "/docs/platforms/opencode" },
      ],
    },
    {
      id: "install",
      label: "Install",
      title: "Install CafeKit into your project",
      narrative: [
        "Open your terminal, navigate to your project folder, then run the installer. It's interactive — it will ask you a few questions (language, addressing, skill dependencies). CafeKit then writes a runtime bundle into .claude/ — skills, agents, hooks, and workflow rules that Claude Code will use.",
      ],
      command: "npx @haposoft/cafekit",
      outputs: [
        { kind: "output", text: "Select language · 言語を選択 · Chọn ngôn ngữ" },
        { kind: "output", text: "selecting platform: Claude Code…" },
        { kind: "output", text: "Claude Code — 67 files, 30 skills" },
        { kind: "output", text: "configuring addressing (how AI calls you)…" },
        { kind: "success", text: "✓ skill dependencies ready (Python venv, pip, npm, Chromium)" },
        { kind: "success", text: "✓ installation complete — installed: 67  updated: 1  unchanged: 6" },
      ],
      youWillSee: [
        "Interactive prompts: language (en/ja/vi), platform choice, addressing, skill deps",
        "A new .claude/ folder in your project root",
        "Inside: skills/, agents/, hooks/, runtime.json, settings.json, cafekit-manifest.json",
        "A CLAUDE.md file with workflow rules",
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
        "Now open a Claude Code session inside your project by running claude in the terminal. You are now inside Claude Code — this is where you type /hapo:* commands.",
        "A spec is a written contract that describes what you want to build before any code is written. Run the command below inside Claude Code.",
      ],
      command: "/hapo:specs Build a word counter that counts words in a sentence",
      outputs: [
        { kind: "output", text: "creating specs/word-counter/…" },
        { kind: "success", text: "✓ spec.json          machine-readable state" },
        { kind: "success", text: "✓ requirements.md    what the feature should do" },
        { kind: "success", text: "✓ design.md          how it will be built" },
        { kind: "success", text: "✓ tasks/task-R0-01-count-words.md" },
        { kind: "output", text: "task_registry: 1 pending  |  ready_for_implementation: false" },
      ],
      youWillSee: [
        "A new specs/word-counter/ folder with 4+ files",
        "spec.json — machine-readable state (phase, task registry)",
        "requirements.md — what countWords() should do",
        "tasks/ — one task file ready for implementation",
      ],
      troubleshooting: [
        { problem: "/hapo:specs not recognized", fix: "Make sure you ran npx @haposoft/cafekit in this project. Check that .claude/ exists." },
        { problem: "Command runs but no output", fix: "You may be in a regular terminal, not a Claude Code session. Run claude first, then try again." },
      ],
      glossary: [
        { term: "spec", definition: "A folder of files that describes what to build. The source of truth — not the chat." },
        { term: "task packet", definition: "A small scoped implementation unit defined in tasks/task-R*.md." },
      ],
    },
    {
      id: "validate",
      label: "Validate",
      title: "Validate before writing code",
      narrative: [
        "Before writing a single line of code, validate that the spec is complete and internally consistent. This catches missing details early — before they become bugs.",
      ],
      command: "/hapo:specs --validate word-counter",
      outputs: [
        { kind: "output", text: "checking spec.json consistency…" },
        { kind: "output", text: "checking task_registry vs task files…" },
        { kind: "success", text: "✓ validation.status: completed" },
        { kind: "success", text: "✓ ready_for_implementation: true" },
      ],
      youWillSee: [
        "validation.status: completed — the spec is consistent",
        "ready_for_implementation: true — you can now implement",
      ],
      troubleshooting: [
        { problem: "Validation errors appear", fix: "Read the error carefully. Usually a missing field or task/registry mismatch. Re-run /hapo:specs to regenerate." },
      ],
    },
    {
      id: "develop",
      label: "Code",
      title: "Implement the first task",
      narrative: [
        "Now implement — one task at a time. CafeKit reads the task file, checks what needs to be built, and implements it. After coding it runs a quality gate: build, evidence, and review must all pass.",
      ],
      command: "/hapo:develop word-counter task-R0-01-count-words.md",
      openCodeCommand: "/develop word-counter task-R0-01-count-words.md",
      outputs: [
        { kind: "output", text: "reading task-R0-01-count-words.md…" },
        { kind: "output", text: "implementing countWords()…" },
        { kind: "output", text: "quality gate → build · evidence · review" },
        { kind: "success", text: "✓ implementation complete" },
        { kind: "success", text: "✓ task synced: in_progress" },
      ],
      youWillSee: [
        "The countWords() function created in your project",
        "A verification receipt inside the task file",
        "task_registry entry updated to in_progress",
      ],
      glossary: [
        { term: "quality gate", definition: "Three checks before a task is done: build succeeds, evidence is recorded, review finds no blockers." },
        { term: "task_registry", definition: "Machine-readable list in spec.json tracking each task's status (pending → in_progress → done)." },
      ],
    },
    {
      id: "test",
      label: "Test",
      title: "Verify with real tests",
      narrative: [
        "Run the test suite. CafeKit checks build, types, and tests — and rejects shallow results. A command that exits 0 while running zero tests is NOT a pass.",
      ],
      command: "/hapo:test",
      openCodeCommand: "/test",
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
        { problem: "verdict: NO_TESTS", fix: "No test file found. Add a test for countWords() and run /hapo:test again. Zero tests is not a pass." },
        { problem: "Tests fail", fix: "Read the error. Fix the implementation or the test, then re-run /hapo:test." },
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
        "After review passes, run: /hapo:sync word-counter task-R0-01-count-words.md done",
      ],
      command: "/hapo:code-review",
      openCodeCommand: "/code-review",
      outputs: [
        { kind: "output", text: "reviewing word-counter implementation…" },
        { kind: "success", text: "✓ spec compliance: ok" },
        { kind: "success", text: "✓ no critical findings" },
        { kind: "output", text: "next: /hapo:sync word-counter task-R0-01-count-words.md done" },
      ],
      youWillSee: [
        "no critical findings — ready to mark done",
        "task_registry status becomes: done after sync",
      ],
      troubleshooting: [
        { problem: "Critical findings in review", fix: "Fix the issues, re-run /hapo:test, then /hapo:code-review again before syncing." },
      ],
    },
  ],
  recap: {
    title: "You just shipped a verified feature",
    bullets: [
      "Spec first, code second — the contract prevents scope drift",
      "One task at a time — each change is small and reviewable",
      "Real evidence required — no fake green results",
      "State stays synced — spec.json and task files always agree",
    ],
    nextLinks: [
      { label: "Spec-driven development", href: "/docs/spec-driven-development" },
      { label: "Core workflow", href: "/docs/core-workflow" },
      { label: "Browse skills", href: "/docs/skills" },
    ],
    glossary: [
      { term: "spec", definition: "Folder of files describing what to build before code starts." },
      { term: "task packet", definition: "Small scoped work unit with steps, criteria, and evidence." },
      { term: "task_registry", definition: "Machine-readable task status list in spec.json." },
      { term: "quality gate", definition: "Build + evidence + review — all three must pass." },
      { term: "NO_TESTS", definition: "No test suite ran. Never a passing result." },
    ],
  },
};
