/**
 * Phase: post-install runtime configuration.
 *
 * OpenCode model, optional Gemini API key, and addressing config. Interactive
 * prompts use ctx.ui (clack); in non-interactive/dry-run they are skipped via
 * fallbacks so spawned/CI runs never hang. Writes (.env, CLAUDE.md,
 * opencode.json) happen only when a value is actually provided.
 *
 * Note: CafeKit no longer installs the `gemini-cli` (the upstream package was
 * removed). We only configure GEMINI_API_KEY, which the SDK-based skills
 * (e.g. hapo:ai-multimodal) read directly.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');
const { setupOpenCodeModel } = require('../lib/opencode-install');

/** Human assistant name for the active platform(s). */
function assistantName(ctx) {
  return ctx.platforms.includes('claude') ? 'Claude Code' : 'OpenCode';
}

function configureGeminiKey(ctx, apiKey, platforms) {
  const envBody = `GEMINI_API_KEY=${apiKey}\nVISUAL_MODEL=gemma-4-31b-it\nSEARCH_MODEL=gemini-2.5-pro\n`;
  const targets = platforms.filter((key) => PLATFORMS[key]).map((key) => PLATFORMS[key].folder);
  if (targets.length === 0) targets.push('.claude');

  for (const folder of targets) {
    try {
      const targetDir = path.join(process.cwd(), folder);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, '.env'), envBody, { mode: 0o600 });
      ctx.ui.success(`Gemini API key stored in ${folder}/.env (0600)`);
    } catch (error) {
      ctx.ui.error(`Failed to configure Gemini API key: ${error.message}`);
    }
  }
}

async function setupGeminiKey(ctx) {
  const apiKey = await ctx.ui.text(
    { message: 'Gemini API key for AI skills (Enter to skip)', placeholder: 'aistudio.google.com/apikey' },
    ''
  );
  if (apiKey && typeof apiKey === 'string' && apiKey.trim()) {
    configureGeminiKey(ctx, apiKey.trim(), ctx.platforms);
  }
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
  ctx.ui.success(`${name} will call you "${userAddress}"`);
}

async function setupAddressing(ctx) {
  if (!ctx.platforms.includes('claude')) return;

  const answer = await ctx.ui.text(
    { message: 'How should the AI address you?', placeholder: 'e.g. boss, sir — Enter to skip' },
    ''
  );
  if (ctx.ui.isCancel(answer)) return;
  const userAddress = (answer || '').trim();
  if (!userAddress) return;

  if (/[^a-zA-ZÀ-ỹ\s]/.test(userAddress)) {
    ctx.ui.warn('Invalid input (letters only); skipped addressing');
    return;
  }
  configureAddressing(ctx, userAddress);
}

/** Run the post-install configuration sequence. */
async function runPostInstall(ctx) {
  if (ctx.dryRun) {
    ctx.ui.info('[dry-run] Skipping OpenCode model / Gemini / addressing setup');
    return ctx;
  }

  // OpenCode model uses its own readline; only run it when it won't block:
  // interactive, or an env override is present (which it reads without prompting).
  const hasModelEnv = Boolean(process.env.OPENCODE_MODEL || process.env.OPENCODE_DEFAULT_MODEL);
  if (ctx.platforms.includes('opencode') && (ctx.interactive || hasModelEnv)) {
    await setupOpenCodeModel(ctx.platforms, ctx.results);
  }

  await setupGeminiKey(ctx);
  await setupAddressing(ctx);

  // Re-record CLAUDE.md baseline so the installer-managed file (template +
  // addressing) stays "pristine" and keeps receiving upstream updates.
  if (ctx.platforms.includes('claude') && ctx.trackers.claude && fs.existsSync('CLAUDE.md')) {
    ctx.trackers.claude.record('CLAUDE.md');
    ctx.trackers.claude.write();
  }
  return ctx;
}

module.exports = { configureGeminiKey, configureAddressing, runPostInstall };
