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

  const label = LANGUAGE_LABELS[ctx.lang] || ctx.lang;
  if (settings.language === label) return; // already up to date
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
  if (ctx.lang === 'en') return; // English is the default — no override needed.

  const claudeMdFile = path.join(process.cwd(), 'CLAUDE.md');
  if (!fs.existsSync(claudeMdFile)) return;

  const LANG_LABEL = { vi: 'Vietnamese', ja: 'Japanese', en: 'English' };
  const label = LANG_LABEL[ctx.lang] || ctx.lang;

  const newSection = `## Language Consistency <!-- cafekit:lang -->

Always respond in **${label}**. Technical terms, code identifiers, and file paths may remain in English, but all explanations, comments directed at the user, and structured output (specs, docs, reports) must be in ${label}.

`;

  let content = fs.readFileSync(claudeMdFile, 'utf8');
  // Replace if marker present, else replace the generic section.
  const markerRe = /## Language Consistency <!-- cafekit:lang -->[\s\S]*?(?=\n##|\n*$)/;
  const genericRe = /## Language Consistency\n[\s\S]*?(?=\n##|\n*$)/;

  if (markerRe.test(content)) {
    content = content.replace(markerRe, newSection);
  } else if (genericRe.test(content)) {
    content = content.replace(genericRe, newSection);
  } else {
    content += `\n${newSection}\n`;
  }

  fs.writeFileSync(claudeMdFile, content, 'utf8');
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
    if (data.locale.responseLanguage === ctx.lang) continue;
    data.locale.responseLanguage = ctx.lang;
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
  let content = fs.readFileSync(claudeMdFile, 'utf8');
  const addressingSection = `## Addressing (Context Overflow Indicator)

${name} always addresses the user as "${userAddress}" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider \`/clear\`.`;

  // Idempotent: replace existing section (shared marker) or append.
  const regex = /##[^\n]*Context Overflow Indicator[^\n]*[\s\S]*?(?=\n##|\n*$)/;
  content = regex.test(content)
    ? content.replace(regex, addressingSection)
    : `${content.endsWith('\n') ? content : `${content}\n`}\n${addressingSection}\n`;

  fs.writeFileSync(claudeMdFile, content, 'utf8');
  ctx.ui.success(ctx.t('addressingSet', { name, addr: userAddress }));
}

async function setupAddressing(ctx) {
  if (!ctx.platforms.includes('claude')) return;

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

  // Re-record post-write baselines so installer-managed files stay "pristine",
  // then flush each touched platform tracker.
  if (ctx.platforms.includes('claude') && ctx.trackers.claude && fs.existsSync('CLAUDE.md')) {
    ctx.trackers.claude.record('CLAUDE.md');
  }
  for (const key of ctx.platforms) {
    if (ctx.trackers[key]) ctx.trackers[key].write();
  }
  return ctx;
}

module.exports = { configureAddressing, runPostInstall };
