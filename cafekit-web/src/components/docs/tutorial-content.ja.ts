import type { TutorialContent } from "./tutorial-types";

export const tutorialContentJa: TutorialContent = {
  eyebrow: "はじめに",
  title: "最初の CafeKit feature",
  description: "未インストールから最初の verified feature までのステップ式ガイド。約 15 分。",
  ui: {
    stepWord: "ステップ",
    youWillSeeLabel: "確認できること",
    troubleshootingLabel: "問題が起きたら",
    glossaryLabel: "新しい用語",
    replay: "再生",
    back: "← 戻る",
    next: "次へ →",
    openCodeNote: "OpenCode を使用中？hapo: プレフィックスを省略 — /specs, /develop, /test を使います。",
    prerequisiteItems: [
      "Node.js 18 以上がインストール済み（確認: node --version）",
      "ターミナルが開いている — Mac は Terminal、Windows は PowerShell",
      "Claude Code がインストール済み（下のリンクを参照 — sudo は使わない）",
      "作業するプロジェクトフォルダ",
    ],
    installCommand: "npm install -g @anthropic-ai/claude-code",
  },
  steps: [
    {
      id: "prereqs",
      label: "準備",
      title: "開始前に必要なもの",
      narrative: [
        "CafeKit は Claude Code の中で動作します — ターミナルから操作する AI コーディングアシスタントです。/hapo:* コマンドは通常のターミナルではなく、Claude Code セッションの中で入力します。",
        "3 つのものを準備してください。準備ができたら「次へ」をクリックしてください。",
      ],
      links: [
        { label: "Claude Code をインストール", href: "https://code.claude.com/docs/en/setup", external: true },
        { label: "Claude Code の最初の日", href: "https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code", external: true },
        { label: "OpenCode を使う場合", href: "/docs/platforms/opencode" },
      ],
    },
    {
      id: "install",
      label: "インストール",
      title: "プロジェクトに CafeKit をインストール",
      narrative: [
        "ターミナルを開き、プロジェクトフォルダに移動してからインストーラーを実行します。CafeKit は .claude/ に runtime bundle を書き込みます — skills、agents、hooks、workflow ルールが含まれます。",
      ],
      command: "npx @haposoft/cafekit",
      outputs: [
        { kind: "output", text: "プロジェクトタイプを検出中…" },
        { kind: "output", text: "Claude Code runtime bundle をインストール中…" },
        { kind: "success", text: "✓ skills   agents   hooks   statusline" },
        { kind: "success", text: "✓ runtime 準備完了 — /hapo:specs で開始" },
      ],
      youWillSee: [
        "プロジェクトルートに新しい .claude/ フォルダ",
        "中に: skills/, agents/, hooks/, runtime.json, settings.json",
        "workflow ルールが入った CLAUDE.md ファイル",
      ],
      troubleshooting: [
        { problem: "npx コマンドが見つからない", fix: "Node.js 18+ が必要です。確認: node --version" },
        { problem: "permission エラー", fix: "sudo を使わないでください。Mac の場合: npm config get prefix" },
      ],
    },
    {
      id: "spec",
      label: "spec 作成",
      title: "最初の spec を作る",
      narrative: [
        "ターミナルで claude を実行してプロジェクト内の Claude Code セッションを開きます。ここが /hapo:* コマンドを入力する場所です。",
        "spec とは、コードを書く前に何を作るかを記述した「契約書」です。以下のコマンドを Claude Code 内で実行してください。",
      ],
      command: "/hapo:specs Build a word counter that counts words in a sentence",
      outputs: [
        { kind: "output", text: "specs/word-counter/ を作成中…" },
        { kind: "success", text: "✓ spec.json          machine-readable state" },
        { kind: "success", text: "✓ requirements.md    feature が何をすべきか" },
        { kind: "success", text: "✓ design.md          どう作るか" },
        { kind: "success", text: "✓ tasks/task-R0-01-count-words.md" },
        { kind: "output", text: "task_registry: 1 pending  |  ready_for_implementation: false" },
      ],
      youWillSee: [
        "specs/word-counter/ フォルダ（4 ファイル以上）",
        "spec.json — machine-readable な state（phase, task registry）",
        "requirements.md — countWords() が何をすべきか",
        "tasks/ — 実装準備済みの task ファイル",
      ],
      troubleshooting: [
        { problem: "/hapo:specs が認識されない", fix: "このプロジェクトで npx @haposoft/cafekit を実行済みか確認。.claude/ が存在するか確認。" },
        { problem: "コマンドが実行されるが出力がない", fix: "通常のターミナルにいる可能性があります。claude を実行して Claude Code セッションを開いてから再試行。" },
      ],
      glossary: [
        { term: "spec", definition: "何を作るかを記述したファイル群のフォルダ。chat ではなくこれが唯一の真実の源。" },
        { term: "task packet", definition: "tasks/task-R*.md に定義された、スコープの明確な小さい実装単位。" },
      ],
    },
    {
      id: "validate",
      label: "検証",
      title: "コーディング前に spec を検証",
      narrative: [
        "コードを 1 行も書く前に、spec が完全で一貫していることを検証します。不足している詳細を早期に発見し、バグになる前に対処します。",
      ],
      command: "/hapo:specs --validate word-counter",
      outputs: [
        { kind: "output", text: "spec.json の一貫性を確認中…" },
        { kind: "output", text: "task_registry と task ファイルを確認中…" },
        { kind: "success", text: "✓ validation.status: completed" },
        { kind: "success", text: "✓ ready_for_implementation: true" },
      ],
      youWillSee: [
        "validation.status: completed — spec に問題なし",
        "ready_for_implementation: true — 実装開始可能",
      ],
      troubleshooting: [
        { problem: "検証でエラーが返る", fix: "エラー出力を確認。通常は spec.json のフィールド不足か task ファイルの不一致。/hapo:specs を再実行。" },
      ],
    },
    {
      id: "develop",
      label: "実装",
      title: "最初の task を実装",
      narrative: [
        "いよいよ実装です — 1 task ずつ進めます。CafeKit は task ファイルを読み、何を作るかを確認し、実装します。コーディング後は quality gate（build + evidence + review）を実行します。",
      ],
      command: "/hapo:develop word-counter task-R0-01-count-words.md",
      openCodeCommand: "/develop word-counter task-R0-01-count-words.md",
      outputs: [
        { kind: "output", text: "task-R0-01-count-words.md を読み込み中…" },
        { kind: "output", text: "countWords() を実装中…" },
        { kind: "output", text: "quality gate → build · evidence · review" },
        { kind: "success", text: "✓ 実装完了" },
        { kind: "success", text: "✓ task synced: in_progress" },
      ],
      youWillSee: [
        "プロジェクト内に countWords() 関数が作成される",
        "task ファイル内に verification receipt",
        "task_registry エントリが in_progress に更新",
      ],
      glossary: [
        { term: "quality gate", definition: "task 完了前に通過すべき 3 つのチェック: build 成功、evidence 記録、review でブロッカーなし。" },
        { term: "task_registry", definition: "spec.json 内の machine-readable なリスト。各 task の状態を追跡（pending → in_progress → done）。" },
      ],
    },
    {
      id: "test",
      label: "テスト",
      title: "本物のテストで検証",
      narrative: [
        "テストスイートを実行します。CafeKit は build、types、tests を確認し、表面的な結果を拒否します。0 件のテストで終了コード 0 になるコマンドは pass ではありません。",
      ],
      command: "/hapo:test",
      openCodeCommand: "/test",
      outputs: [
        { kind: "output", text: "test runner を検出中…" },
        { kind: "output", text: "test suite を実行中…" },
        { kind: "success", text: "✓ 3 passed   0 failed" },
        { kind: "success", text: "✓ verdict: PASS" },
      ],
      youWillSee: [
        "テスト数 > 0 — 本物のテストが実行された",
        "verdict: PASS — build、types、tests すべてグリーン",
      ],
      troubleshooting: [
        { problem: "verdict: NO_TESTS", fix: "テストファイルが見つかりません。countWords() のテストを追加して /hapo:test を再実行。0 件テストは pass ではありません。" },
        { problem: "テストが失敗する", fix: "エラー出力を確認。実装またはテストを修正し、/hapo:test を再実行。" },
      ],
      glossary: [
        { term: "NO_TESTS", definition: "テストスイートが実行されなかった。絶対に pass ではありません — task には本物の evidence が必要。" },
      ],
    },
    {
      id: "sync",
      label: "完了",
      title: "レビューして完了にする",
      narrative: [
        "コードレビューで問題を確認してから、task の状態を done に sync します。implementation、evidence、tests、review がすべて一致したときだけ task は done です。",
        "レビュー通過後: /hapo:sync word-counter task-R0-01-count-words.md done を実行してください。",
      ],
      command: "/hapo:code-review",
      openCodeCommand: "/code-review",
      outputs: [
        { kind: "output", text: "word-counter の実装をレビュー中…" },
        { kind: "success", text: "✓ spec compliance: ok" },
        { kind: "success", text: "✓ critical finding なし" },
        { kind: "output", text: "次: /hapo:sync word-counter task-R0-01-count-words.md done" },
      ],
      youWillSee: [
        "no critical findings — done にする準備完了",
        "sync 後 task_registry status が done になる",
      ],
      troubleshooting: [
        { problem: "レビューで critical issue が見つかった", fix: "問題を修正し、/hapo:test → /hapo:code-review の順で再実行してから sync。" },
      ],
    },
  ],
  recap: {
    title: "verified な feature を ship しました",
    bullets: [
      "spec を先に、コードは後 — 契約が scope drift を防ぐ",
      "1 task ずつ — 各変更が小さく review 可能",
      "本物の evidence が必要 — fake な green result は不可",
      "state は常に sync — spec.json と task ファイルが一致",
    ],
    nextLinks: [
      { label: "Spec-driven development", href: "/docs/spec-driven-development" },
      { label: "Core workflow", href: "/docs/core-workflow" },
      { label: "Skills を見る", href: "/docs/skills" },
    ],
    glossary: [
      { term: "spec", definition: "コード開始前に何を作るかを記述したファイルフォルダ。" },
      { term: "task packet", definition: "steps、criteria、evidence を持つ小さいスコープの作業単位。" },
      { term: "task_registry", definition: "spec.json 内の machine-readable なタスク状態リスト。" },
      { term: "quality gate", definition: "Build + evidence + review — 3 つすべてが必要。" },
      { term: "NO_TESTS", definition: "テストスイートが実行されなかった。絶対に pass の結果ではない。" },
    ],
  },
};
