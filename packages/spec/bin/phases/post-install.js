/**
 * Phase: post-install runtime configuration.
 *
 * OpenCode model, optional Gemini CLI install + API key, and addressing config.
 * These are interactive and write outside the ownership model (.env, CLAUDE.md,
 * opencode.json). Skipped entirely in dry-run to keep previews side-effect free.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
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

function installGeminiCLI() {
  console.log('\n⚙ Installing gemini-cli...');
  try {
    execSync('npm install -g @google/gemini-cli', { stdio: 'inherit' });
    console.log('  ✓ gemini-cli installed successfully');
    return true;
  } catch {
    console.log('  ✗ Failed to install gemini-cli automatically');
    console.log('  Please run manually: npm install -g @google/gemini-cli');
    return false;
  }
}

async function promptInstallGemini() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('\n📦 Optional: Gemini CLI Installation');
  console.log('  hapo:inspect with ext mode requires gemini-cli');
  console.log('  • Install now: Auto-install and configure API key');
  console.log('  • Skip: You can still use hapo:inspect in internal mode');
  console.log();
  return new Promise((resolve) => {
    rl.question('Install gemini-cli? (Y/n): ', (answer) => {
      rl.close();
      const response = answer.trim().toLowerCase();
      resolve(response === '' || response === 'y' || response === 'yes');
    });
  });
}

async function promptGeminiAPIKey() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('\n📝 Gemini API Key Configuration');
  console.log('  Get your API key: https://aistudio.google.com/apikey');
  console.log();
  return new Promise((resolve) => {
    rl.question('Enter your Gemini API key (or press Enter to skip): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function configureGeminiKey(apiKey, platforms = ['claude']) {
  const envBody = `GEMINI_API_KEY=${apiKey}\nVISUAL_MODEL=gemma-4-31b-it\nSEARCH_MODEL=gemini-2.5-pro\n`;
  const targets = platforms.filter((key) => PLATFORMS[key]).map((key) => PLATFORMS[key].folder);
  if (targets.length === 0) targets.push('.claude');

  let success = true;
  for (const folder of targets) {
    try {
      const targetDir = path.join(process.cwd(), folder);
      const localEnvFile = path.join(targetDir, '.env');
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(localEnvFile, envBody, { mode: 0o600 });
      console.log(`  ✓ Gemini API key configured securely in project (${folder}/.env)`);
    } catch (error) {
      success = false;
      console.log('  ✗ Failed to configure Gemini API key');
      console.log(`  Error: ${error.message}`);
      console.log('  You can manually set: export GEMINI_API_KEY="your-key"');
    }
  }
  return success;
}

async function promptAddressingConfig() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('\nHow should the AI address you? (e.g. boss, sir, master - Enter to skip): ', (answer) => {
      rl.close();
      const userAddress = answer.trim();
      if (!userAddress || userAddress.length === 0) {
        resolve({ enabled: false, userAddress: '' });
        return;
      }
      if (/[^a-zA-ZÀ-ỹ\s]/.test(userAddress)) {
        console.log('  ⚠ Invalid input (letters only), skipping addressing setup');
        resolve({ enabled: false, userAddress: '' });
        return;
      }
      resolve({ enabled: true, userAddress });
    });
  });
}

function configureAddressing(addressingConfig, platforms = ['claude']) {
  if (!platforms.includes('claude')) return;
  if (!addressingConfig.enabled || !addressingConfig.userAddress) {
    console.log('  → Bỏ qua thiết lập xưng hô');
    return;
  }

  const userAddress = addressingConfig.userAddress;
  try {
    const claudeMdFile = path.join(process.cwd(), 'CLAUDE.md');
    if (!fs.existsSync(claudeMdFile)) {
      console.log('  ⚠ CLAUDE.md not found at project root');
      return;
    }

    let content = fs.readFileSync(claudeMdFile, 'utf8');
    const addressingSection = `## Addressing (Context Overflow Indicator)

The AI always addresses the user as "${userAddress}" throughout the conversation. If the AI stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider \`/clear\`.`;

    // Idempotent: replace the existing section (matched by shared marker) or append.
    const regex = /##[^\n]*Context Overflow Indicator[^\n]*[\s\S]*?(?=\n##|\n*$)/;
    if (regex.test(content)) {
      content = content.replace(regex, addressingSection);
    } else {
      if (!content.endsWith('\n')) content += '\n';
      content += '\n' + addressingSection + '\n';
    }

    fs.writeFileSync(claudeMdFile, content, 'utf8');
    console.log(`  ✓ Addressing configured in CLAUDE.md: AI calls the user "${userAddress}"`);
  } catch (error) {
    console.error('  ✗ Failed to configure addressing in CLAUDE.md');
    console.error(`     Error: ${error.message}`);
    if (process.env.DEBUG) console.error(error.stack);
  }
}

async function setupGeminiCLI(platforms) {
  const hasGemini = checkGeminiCLI();
  if (hasGemini) {
    console.log('  ✓ gemini-cli already installed');
  } else {
    const shouldInstall = await promptInstallGemini();
    if (shouldInstall) {
      installGeminiCLI();
    } else {
      console.log('\n  ℹ Skipped gemini-cli installation');
      console.log('  • hapo:inspect will work in internal mode (default)');
      console.log('  • To install later: npm install -g @google/gemini-cli');
    }
  }

  const apiKey = await promptGeminiAPIKey();
  if (apiKey) {
    configureGeminiKey(apiKey, platforms);
  } else {
    console.log('\n  ℹ Skipped API key configuration');
    console.log('  Set later: export GEMINI_API_KEY="your-key"');
  }
}

/** Run the post-install interactive configuration sequence. */
async function runPostInstall(ctx) {
  if (ctx.dryRun) {
    console.log('  → [dry-run] Skipping OpenCode model / Gemini / addressing prompts');
    return ctx;
  }

  await setupOpenCodeModel(ctx.platforms, ctx.results);
  await setupGeminiCLI(ctx.platforms);

  const addressingConfig = await promptAddressingConfig();
  configureAddressing(addressingConfig, ctx.platforms);

  // configureAddressing rewrites root CLAUDE.md AFTER its baseline was recorded
  // in write-metadata. Re-record the final content so the installer-managed
  // CLAUDE.md (template + addressing) stays "pristine" — otherwise the next run
  // would see it as user-modified and stop delivering upstream CLAUDE.md updates.
  if (ctx.platforms.includes('claude') && ctx.trackers.claude && fs.existsSync('CLAUDE.md')) {
    ctx.trackers.claude.record('CLAUDE.md');
    ctx.trackers.claude.write();
  }
  return ctx;
}

module.exports = {
  checkGeminiCLI,
  promptInstallGemini,
  promptGeminiAPIKey,
  configureGeminiKey,
  promptAddressingConfig,
  configureAddressing,
  setupGeminiCLI,
  runPostInstall
};
