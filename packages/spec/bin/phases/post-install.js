/**
 * Phase: post-install runtime configuration.
 *
 * OpenCode model + addressing config. Interactive prompts use ctx.ui (clack);
 * in non-interactive/dry-run they are skipped via fallbacks so spawned/CI runs
 * never hang.
 *
 * Note: CafeKit no longer prompts for a Gemini API key. The upstream gemini-cli
 * was removed, and the key now serves only the ai-multimodal skill — which
 * documents it in its own `.env.example`. Users set GEMINI_API_KEY there when
 * (and only if) they use that skill.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');
const { LANGUAGE_LABELS } = require('../lib/i18n');
const { setupOpenCodeModel } = require('../lib/opencode-install');
const { transformManagedClaudeContent } = require('./claude-runtime');

function updateManagedClaudeFile(filePath, transform) {
  const content = fs.readFileSync(filePath, 'utf8');
  const next = transformManagedClaudeContent(content, transform);
  if (next === content) return false;
  fs.writeFileSync(filePath, next, 'utf8');
  return true;
}

function readManagedClaudeBody(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let body = '';
  transformManagedClaudeContent(content, (managed) => {
    body = managed;
    return managed;
  });
  return body;
}

/** Write `"language"` field into .claude/settings.json so it's visible at a glance. */
function patchSettingsLanguage(ctx) {
  if (!ctx.platforms.includes('claude')) return;
  const settingsPath = path.join(process.cwd(), '.claude', 'settings.json');
  if (!fs.existsSync(settingsPath)) return;

  let settings;
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch {
    return;
  }

  // Use locale (freeform label) so "Korean" shows correctly, not just "en".
  const label = ctx.locale || LANGUAGE_LABELS[ctx.lang] || ctx.lang;
  if (settings.language === label) return;
  settings.language = label;
  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
}

/**
 * Patch the "## Language Consistency" section in CLAUDE.md with the chosen
 * language so every AI session knows which language to respond in — without
 * relying on hooks reading runtime.json.
 *
 * The section is identified by a stable marker comment so subsequent installs
 * can update it idempotently.
 */
function patchLanguageSection(ctx) {
  if (!ctx.platforms.includes('claude')) return;
  // Skip when locale is English (default — no override needed in CLAUDE.md).
  const locale = ctx.locale || ctx.lang;
  if (!locale || locale === 'en' || locale === 'English') return;

  const claudeMdFile = path.join(process.cwd(), 'CLAUDE.md');
  if (!fs.existsSync(claudeMdFile)) return;

  const LANG_LABEL = { vi: 'Vietnamese', ja: 'Japanese', en: 'English' };
  // Use locale directly when set (e.g. "Korean"), or map from lang code.
  const label = locale in LANG_LABEL ? LANG_LABEL[locale] : locale;

  const newSection = `## Language Consistency <!-- cafekit:lang -->

Always respond in **${label}**. Technical terms, code identifiers, and file paths may remain in English, but all explanations, comments directed at the user, and structured output (specs, docs, reports) must be in ${label}.

`;

  // Replace only inside the installer-owned block.
  const markerRe = /## Language Consistency <!-- cafekit:lang -->[\s\S]*?(?=\n##|\n*$)/;
  const genericRe = /## Language Consistency\n[\s\S]*?(?=\n##|\n*$)/;
  updateManagedClaudeFile(claudeMdFile, (managed) => {
    if (markerRe.test(managed)) return managed.replace(markerRe, newSection);
    if (genericRe.test(managed)) return managed.replace(genericRe, newSection);
    return `${managed.trimEnd()}\n\n${newSection}\n`;
  });
}
function patchRuntimeLocale(ctx) {
  for (const key of ctx.platforms) {
    const rtPath = path.join(PLATFORMS[key].folder, 'runtime.json');
    if (!fs.existsSync(rtPath)) continue;
    let data;
    try {
      data = JSON.parse(fs.readFileSync(rtPath, 'utf8'));
    } catch {
      continue;
    }
    data.locale = data.locale || {};
    // Use locale (freeform label) so custom languages propagate to the AI hook.
    const locale = ctx.locale || ctx.lang;
    if (data.locale.responseLanguage === locale) continue;
    // Hardening: never downgrade an existing configured label to a bare default
    // code when this run never made an explicit language choice (ctx.locale
    // empty). Protects user config on any code path that skips selectLanguage.
    if (!ctx.locale && data.locale.responseLanguage) continue;
    data.locale.responseLanguage = locale;
    fs.writeFileSync(rtPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    if (ctx.trackers[key]) ctx.trackers[key].record(rtPath);
  }
}

/** Human assistant name for the active platform(s). */
function assistantName(ctx) {
  return ctx.platforms.includes('claude') ? 'Claude Code' : 'OpenCode';
}

function configureAddressing(ctx, userAddress) {
  const claudeMdFile = path.join(process.cwd(), 'CLAUDE.md');
  if (!fs.existsSync(claudeMdFile)) {
    ctx.ui.warn('CLAUDE.md not found at project root; skipped addressing');
    return;
  }

  const name = assistantName(ctx);
  const addressingSection = `## Addressing (Context Overflow Indicator)

${name} always addresses the user as "${userAddress}" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider \`/clear\`.`;

  // Idempotent and scoped to the installer-owned block.
  const regex = /##[^\n]*Context Overflow Indicator[^\n]*[\s\S]*?(?=\n##|\n*$)/;
  const changed = updateManagedClaudeFile(claudeMdFile, (managed) => (
    regex.test(managed)
      ? managed.replace(regex, addressingSection)
      : `${managed.endsWith('\n') ? managed : `${managed}\n`}\n${addressingSection}\n`
  ));
  if (changed) ctx.ui.success(ctx.t('addressingSet', { name, addr: userAddress }));
}

async function setupAddressing(ctx) {
  if (!ctx.platforms.includes('claude')) return;

  // Check if there's already an addressing section in CLAUDE.md
  const claudeMdFile = path.join(process.cwd(), 'CLAUDE.md');
  let existingName = null;
  if (fs.existsSync(claudeMdFile)) {
    const content = readManagedClaudeBody(claudeMdFile);
    const match = content.match(/##[^\n]*Context Overflow Indicator[^\n]*[\s\S]*?always addresses the user as "([^"]+)"/);
    if (match) {
      existingName = match[1];
    }
  }

  // For updates: ask if user wants to keep the existing name
  if (existingName && ctx.isUpdate) {
    const options = [
      { value: 'keep', label: ctx.t('keepAddressingOption', { addr: existingName }) || `Giữ "${existingName}"` },
      { value: 'change', label: ctx.t('changeAddressingOption') || 'Đổi tên mới' }
    ];

    const choice = await ctx.ui.select({
      message: ctx.t('addressingUpdatePrompt') || `Bạn đang dùng "${existingName}" để xưng hô. Muốn đổi không?`,
      options
    });

    if (ctx.ui.isCancel(choice)) return;
    if (choice === 'keep') return;
    // If 'change', continue to ask for new name
  }

  const answer = await ctx.ui.text(
    { message: ctx.t('addressingQuestion'), placeholder: ctx.t('addressingPlaceholder') },
    ''
  );
  if (ctx.ui.isCancel(answer)) return;
  const userAddress = (answer || '').trim();
  if (!userAddress) return;

  // Allow letters from any script (incl. Japanese) + spaces; reject digits/symbols.
  if (/[^\p{L}\s]/u.test(userAddress)) {
    ctx.ui.warn(ctx.t('addressingInvalid'));
    return;
  }
  configureAddressing(ctx, userAddress);
}

/** Run the post-install configuration sequence. */
async function runPostInstall(ctx) {
  if (ctx.dryRun) {
    ctx.ui.info('[dry-run] Skipping OpenCode model / addressing setup');
    return ctx;
  }

  // OpenCode model uses its own readline; only run it when it won't block:
  // interactive, or an env override is present (which it reads without prompting).
  const hasModelEnv = Boolean(process.env.OPENCODE_MODEL || process.env.OPENCODE_DEFAULT_MODEL);
  if (ctx.platforms.includes('opencode') && (ctx.interactive || hasModelEnv)) {
    await setupOpenCodeModel(ctx.platforms, ctx.results);
  }

  await setupAddressing(ctx);

  // Patch Language Consistency section in CLAUDE.md so AI responds in the chosen language.
  patchLanguageSection(ctx);

  // Persist chosen language into each platform's runtime.json (records in tracker).
  patchRuntimeLocale(ctx);

  // Write "language" field into .claude/settings.json for visibility.
  patchSettingsLanguage(ctx);

  // Flush touched platform trackers. Root CLAUDE.md is block-managed and must
  // never regain a whole-file ownership record.
  for (const key of ctx.platforms) {
    if (ctx.trackers[key]) ctx.trackers[key].write();
  }
  return ctx;
}

module.exports = { configureAddressing, runPostInstall };
