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
const { setupOpenCodeModel } = require('../lib/opencode-install');

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

  // Re-record CLAUDE.md baseline so the installer-managed file (template +
  // addressing) stays "pristine" and keeps receiving upstream updates.
  if (ctx.platforms.includes('claude') && ctx.trackers.claude && fs.existsSync('CLAUDE.md')) {
    ctx.trackers.claude.record('CLAUDE.md');
    ctx.trackers.claude.write();
  }
  return ctx;
}

module.exports = { configureAddressing, runPostInstall };
