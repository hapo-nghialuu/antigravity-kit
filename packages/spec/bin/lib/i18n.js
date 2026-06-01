/**
 * Installer i18n (en / ja / vi).
 *
 * Localizes the user-facing installer strings (prompts, milestones, summary,
 * next steps). High-frequency detail/spinner logs stay English by design.
 *
 * The chosen language is also written to the installed runtime.json
 * (locale.responseLanguage) so the AI continues in that language afterwards.
 *
 * Usage: const t = createTranslator(lang); t('installingFor', { names });
 */

const SUPPORTED = ['en', 'ja', 'vi'];

// Per-language label shown in the language picker (in the language's own script).
const LANGUAGE_LABELS = { en: 'English', ja: '日本語', vi: 'Tiếng Việt' };

const MESSAGES = {
  en: {
    installingFor: 'Installing for: {names}',
    modeForce: 'Mode: force-overwrite (replace user-modified files; backup kept)',
    modeDryRun: 'Mode: dry-run (preview only, no changes written)',
    modeInstall: 'Mode: install/update (selective; preserves user-modified files)',
    selectPlatform: 'Select which platform(s) to install for',
    allPlatforms: 'All platforms',
    confirmAllDetected: 'Install for all detected platforms? ({names})',
    cancelled: 'Installation cancelled.',
    platformInstalled: '{name} installed — {files} file(s), {skills} skill(s)',
    platformDryInstalled: '{name} would install — {files} file(s), {skills} skill(s)',
    addressingQuestion: 'How should the AI address you?',
    addressingPlaceholder: 'e.g. boss, sir — Enter to skip',
    addressingSet: '{name} will call you "{addr}"',
    addressingInvalid: 'Invalid input (letters only); skipped addressing',
    skillDepsConfirm: 'Install skill dependencies now? (Python venv + pip + Chromium — slower)',
    skillsSkipped: 'Skill dependencies skipped — run later with: npx @haposoft/cafekit --with-skills-deps',
    optionalToolsTitle: 'Optional tools to install manually',
    summaryTitle: 'Installation complete',
    summaryDryTitle: 'Dry-run preview',
    labelCopied: 'Copied',
    labelUpdated: 'Updated',
    labelUnchanged: 'Unchanged',
    labelPreserved: 'Preserved',
    labelSkills: 'Skills',
    labelVersion: 'CafeKit Version',
    labelMissing: 'Missing',
    labelErrors: 'Errors',
    yes: 'yes',
    no: 'no',
    preservedNote: '{n} user-modified file(s) preserved. Re-run with --force-overwrite to replace them (backup kept under .cafekit-backup/).',
    nextStepsTitle: 'Next steps',
    nsClaude: 'Claude: use /hapo:specs <feature-description>',
    nsOpencode: 'OpenCode: ask the agent to start a feature or brainstorm',
    nsKeys: 'Some skills need keys: {skills} — copy <skill>/.env.example → .env and fill in',
    nsForce: 'Use --force-overwrite to refresh user-modified files',
    dryRunOnly: 'Dry-run only — re-run without --dry-run to apply.',
    outroDone: 'Done — docs: https://github.com/haposoft/cafekit'
  },

  ja: {
    installingFor: 'インストール対象: {names}',
    modeForce: 'モード: 強制上書き（ユーザー変更ファイルを置換、バックアップ保持）',
    modeDryRun: 'モード: ドライラン（プレビューのみ、変更なし）',
    modeInstall: 'モード: インストール/更新（選択的・ユーザー変更を保持）',
    selectPlatform: 'インストールするプラットフォームを選択',
    allPlatforms: 'すべてのプラットフォーム',
    confirmAllDetected: '検出された全プラットフォームにインストールしますか？（{names}）',
    cancelled: 'インストールを中止しました。',
    platformInstalled: '{name} をインストール — {files} ファイル、{skills} スキル',
    platformDryInstalled: '{name} をインストール予定 — {files} ファイル、{skills} スキル',
    addressingQuestion: 'AI からどう呼ばれたいですか？',
    addressingPlaceholder: '例: boss, sir — Enter でスキップ',
    addressingSet: '{name} はあなたを「{addr}」と呼びます',
    addressingInvalid: '無効な入力（文字のみ）。呼称設定をスキップしました',
    skillDepsConfirm: 'スキルの依存関係を今すぐインストールしますか？（Python venv + pip + Chromium、時間がかかります）',
    skillsSkipped: 'スキル依存関係をスキップしました。後で実行: npx @haposoft/cafekit --with-skills-deps',
    optionalToolsTitle: '手動でインストールする任意ツール',
    summaryTitle: 'インストール完了',
    summaryDryTitle: 'ドライラン プレビュー',
    labelCopied: 'コピー',
    labelUpdated: '更新',
    labelUnchanged: '変更なし',
    labelPreserved: '保持',
    labelSkills: 'スキル',
    labelVersion: 'CafeKit バージョン',
    labelMissing: '不足',
    labelErrors: 'エラー',
    yes: 'はい',
    no: 'いいえ',
    preservedNote: 'ユーザー変更ファイル {n} 件を保持しました。置換するには --force-overwrite で再実行（バックアップは .cafekit-backup/ に保持）。',
    nextStepsTitle: '次のステップ',
    nsClaude: 'Claude: /hapo:specs <機能の説明> を使用',
    nsOpencode: 'OpenCode: エージェントに機能開始やブレストを依頼',
    nsKeys: '一部のスキルはキーが必要: {skills} — <skill>/.env.example を .env にコピーして記入',
    nsForce: 'ユーザー変更ファイルを更新するには --force-overwrite を使用',
    dryRunOnly: 'ドライランのみ — 適用するには --dry-run なしで再実行してください。',
    outroDone: '完了 — ドキュメント: https://github.com/haposoft/cafekit'
  },

  vi: {
    installingFor: 'Cài cho: {names}',
    modeForce: 'Chế độ: ghi đè (thay file người dùng đã sửa; có backup)',
    modeDryRun: 'Chế độ: dry-run (chỉ xem trước, không ghi gì)',
    modeInstall: 'Chế độ: cài/cập nhật (chọn lọc; giữ file người dùng đã sửa)',
    selectPlatform: 'Chọn (các) nền tảng để cài',
    allPlatforms: 'Tất cả nền tảng',
    confirmAllDetected: 'Cài cho tất cả nền tảng đã phát hiện? ({names})',
    cancelled: 'Đã hủy cài đặt.',
    platformInstalled: 'Đã cài {name} — {files} tệp, {skills} skill',
    platformDryInstalled: 'Sẽ cài {name} — {files} tệp, {skills} skill',
    addressingQuestion: 'AI nên xưng hô với bạn thế nào?',
    addressingPlaceholder: 'vd: sếp, đại ca — Enter để bỏ qua',
    addressingSet: '{name} sẽ gọi bạn là "{addr}"',
    addressingInvalid: 'Nhập không hợp lệ (chỉ chữ cái); bỏ qua xưng hô',
    skillDepsConfirm: 'Cài dependencies cho skill ngay? (Python venv + pip + Chromium — chậm hơn)',
    skillsSkipped: 'Đã bỏ qua dependencies skill — chạy sau: npx @haposoft/cafekit --with-skills-deps',
    optionalToolsTitle: 'Công cụ tùy chọn cần cài thủ công',
    summaryTitle: 'Cài đặt hoàn tất',
    summaryDryTitle: 'Xem trước dry-run',
    labelCopied: 'Đã chép',
    labelUpdated: 'Đã cập nhật',
    labelUnchanged: 'Không đổi',
    labelPreserved: 'Đã giữ',
    labelSkills: 'Skill',
    labelVersion: 'Phiên bản CafeKit',
    labelMissing: 'Thiếu',
    labelErrors: 'Lỗi',
    yes: 'có',
    no: 'không',
    preservedNote: 'Đã giữ {n} tệp người dùng sửa. Chạy lại với --force-overwrite để thay (backup ở .cafekit-backup/).',
    nextStepsTitle: 'Bước tiếp theo',
    nsClaude: 'Claude: dùng /hapo:specs <mô-tả-tính-năng>',
    nsOpencode: 'OpenCode: yêu cầu agent bắt đầu tính năng hoặc brainstorm',
    nsKeys: 'Một số skill cần key: {skills} — chép <skill>/.env.example → .env và điền vào',
    nsForce: 'Dùng --force-overwrite để làm mới file người dùng đã sửa',
    dryRunOnly: 'Chỉ dry-run — chạy lại không có --dry-run để áp dụng.',
    outroDone: 'Xong — tài liệu: https://github.com/haposoft/cafekit'
  }
};

/** Normalize a language code to a supported one; unknown → 'ja' (per project choice). */
function resolveLang(code) {
  if (!code) return 'en';
  const lc = String(code).toLowerCase().slice(0, 2);
  return SUPPORTED.includes(lc) ? lc : 'ja';
}

/** Build a translator. Falls back to English per-key, then the key itself. */
function createTranslator(lang) {
  const resolved = resolveLang(lang);
  return function t(key, vars = {}) {
    const template = (MESSAGES[resolved] && MESSAGES[resolved][key]) || MESSAGES.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? String(vars[name]) : `{${name}}`));
  };
}

module.exports = { SUPPORTED, LANGUAGE_LABELS, MESSAGES, resolveLang, createTranslator };
