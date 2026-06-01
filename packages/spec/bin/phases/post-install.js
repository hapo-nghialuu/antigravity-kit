/**
 * Phase: post-install runtime configuration.
 *
 * OpenCode model, optional Gemini CLI install + API key, and addressing config.
 * Interactive prompts use ctx.ui (clack); in non-interactive/dry-run they are
 * skipped via fallbacks so spawned/CI runs never hang. Writes (.env, CLAUDE.md,
 * opencode.json) happen only when a value is actually provided.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PLATFORMS } = require('../lib/context');
const { setupOpenCodeModel } = require('../lib/opencode-install');

function checkGeminiCLI() {
  try {
    execSync('which gemini', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installGeminiCLI(ctx) {
  ctx.ui.startSpinner('Installing gemini-cli...');
  try {
    execSync('npm install -g @google/gemini-cli', { stdio: 'ignore' });
    ctx.ui.stopSpinner('gemini-cli installed');
    return true;
  } catch {
    ctx.ui.stopSpinner('Could not install gemini-cli automatically');
    ctx.ui.warn('Run manually: npm install -g @google/gemini-cli');
    return false;
  }
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

async function setupGemini(ctx) {
  if (checkGeminiCLI()) {
    ctx.ui.info('gemini-cli already installed');
  } else if (ctx.interactive) {
    const yes = await ctx.ui.confirm(
      { message: 'Install gemini-cli? (enables hapo:inspect ext mode)', initialValue: false },
      false
    );
    if (yes === true) installGeminiCLI(ctx);
  }

  const apiKey = await ctx.ui.text(
    { message: 'Gemini API key (Enter to skip)', placeholder: 'aistudio.google.com/apikey' },
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

  let content = fs.readFileSync(claudeMdFile, 'utf8');
  const addressingSection = `## Addressing (Context Overflow Indicator)

The AI always addresses the user as "${userAddress}" throughout the conversation. If the AI stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider \`/clear\`.`;

  // Idempotent: replace existing section (shared marker) or append.
  const regex = /##[^\n]*Context Overflow Indicator[^\n]*[\s\S]*?(?=\n##|\n*$)/;
  content = regex.test(content)
    ? content.replace(regex, addressingSection)
    : `${content.endsWith('\n') ? content : `${content}\n`}\n${addressingSection}\n`;

  fs.writeFileSync(claudeMdFile, content, 'utf8');
  ctx.ui.success(`Addressing set: AI will call you "${userAddress}"`);
}

async function setupAddressing(ctx) {
  if (!ctx.platforms.includes('claude')) return;

  const answer = await ctx.ui.text(
    { message: 'How should the AI address you? (e.g. boss, sir — Enter to skip)', placeholder: 'Enter to skip' },
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

  await setupGemini(ctx);
  await setupAddressing(ctx);

  // Re-record CLAUDE.md baseline so the installer-managed file (template +
  // addressing) stays "pristine" and keeps receiving upstream updates.
  if (ctx.platforms.includes('claude') && ctx.trackers.claude && fs.existsSync('CLAUDE.md')) {
    ctx.trackers.claude.record('CLAUDE.md');
    ctx.trackers.claude.write();
  }
  return ctx;
}

module.exports = { checkGeminiCLI, configureGeminiKey, configureAddressing, runPostInstall };
