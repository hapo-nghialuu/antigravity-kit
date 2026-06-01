/**
 * Phase: skill dependency setup (opt-in, safe cross-platform).
 *
 * Provisions the parts a file-copy install can't:
 *  - Python venv at <skillsDir>/.venv + pip install each skill's requirements
 *  - skill-local `npm install` (scripts/package.json without node_modules)
 *  - Puppeteer Chromium binary (chrome-devtools)
 *
 * System binaries (ffmpeg, poppler, librsvg, tesseract) and global npm CLIs are
 * NOT auto-installed — they are detected and printed as guidance. All steps are
 * non-fatal: a failure never breaks the install.
 *
 * Runs only when opted in: `--with-skills-deps`, or an interactive confirm.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS } = require('../lib/context');
const dep = require('../lib/skill-deps');

async function shouldRun(ctx) {
  if (ctx.dryRun) return false;
  if (ctx.options.withSkillsDeps) return true;
  if (!ctx.interactive) return false;
  const yes = await ctx.ui.confirm(
    { message: ctx.t('skillDepsConfirm'), initialValue: false },
    false
  );
  return yes === true;
}

/** Provision Python venv + pip requirements for a platform's skills. */
function setupPython(ctx, skillsDir) {
  const reqs = dep.collectRequirements(skillsDir);
  if (reqs.length === 0) return;

  const py = dep.findPython();
  if (!py) {
    ctx.ui.warn('Python 3 not found — skipped venv. Install Python 3, then re-run with --with-skills-deps.');
    return;
  }

  ctx.ui.startSpinner('Creating Python venv...');
  if (!dep.createVenv(skillsDir, py)) {
    ctx.ui.stopSpinner('Could not create Python venv');
    ctx.ui.warn(`venv creation failed at ${dep.venvDir(skillsDir)} — check your Python install.`);
    return;
  }
  dep.pipUpgrade(skillsDir);
  ctx.ui.stopSpinner(`Python venv ready (${dep.venvDir(skillsDir)})`);

  for (const { skill, file } of reqs) {
    ctx.ui.startSpinner(`Installing Python deps: ${skill}...`);
    const ok = dep.pipInstall(skillsDir, file);
    ctx.ui.stopSpinner(ok ? `${skill}: Python deps installed` : `${skill}: some Python deps failed`);
    if (!ok) {
      ctx.ui.warn(`pip failed for ${skill}. Retry: "${dep.venvPython(skillsDir)}" -m pip install -r "${file}"`);
    }
  }
}

/** Run skill-local npm installs + Chromium for a platform's skills. */
function setupNode(ctx, skillsDir) {
  for (const { skill, dir } of dep.collectSkillPackages(skillsDir)) {
    ctx.ui.startSpinner(`Installing npm deps: ${skill}...`);
    const ok = dep.npmInstall(dir);
    ctx.ui.stopSpinner(ok ? `${skill}: npm deps installed` : `${skill}: npm install failed`);
    if (!ok) {
      ctx.ui.warn(`npm install failed in ${dir} — retry manually.`);
      continue;
    }
    // Skills using Playwright (e.g. pptx html2pptx) need a browser binary too.
    if (dep.pkgHasDep(dir, 'playwright')) {
      ctx.ui.startSpinner(`Downloading Playwright browser for ${skill}...`);
      const pw = dep.installPlaywrightBrowser(dir);
      ctx.ui.stopSpinner(pw ? `${skill}: Playwright browser ready` : `${skill}: Playwright browser skipped`);
    }
  }

  const chromeScripts = path.join(skillsDir, 'chrome-devtools', 'scripts');
  if (fs.existsSync(path.join(chromeScripts, 'package.json'))) {
    ctx.ui.startSpinner('Downloading Chromium for chrome-devtools...');
    const ok = dep.installChromium(chromeScripts);
    ctx.ui.stopSpinner(ok ? 'Chromium ready' : 'Chromium download skipped/failed');
    if (!ok) ctx.ui.warn('Chromium not downloaded — chrome-devtools may prompt on first use.');
  }
}

/** Detect (don't install) system binaries + global npm CLIs and print guidance. */
function guideManual(ctx) {
  const missingTools = dep.SYSTEM_TOOLS.filter((t) => !dep.hasCmd(t.cmd));
  const missingNpm = dep.GLOBAL_NPM.filter((g) => !dep.hasCmd(g.cmd));
  if (missingTools.length === 0 && missingNpm.length === 0) return;

  const lines = [];
  for (const t of missingTools) lines.push(`${t.cmd}  — ${t.why}\n   ${dep.systemHint(t)}`);
  for (const g of missingNpm) lines.push(`${g.cmd}  — ${g.why}\n   npm install -g ${g.pkg}`);
  ctx.ui.note(lines.join('\n'), ctx.t('optionalToolsTitle'));
}

async function setupSkillDeps(ctx) {
  if (!(await shouldRun(ctx))) {
    if (!ctx.dryRun) {
      ctx.ui.info(ctx.t('skillsSkipped'));
    }
    return ctx;
  }

  for (const key of ctx.platforms) {
    const skillsDir = PLATFORMS[key].skillsDir;
    setupPython(ctx, skillsDir);
    setupNode(ctx, skillsDir);
  }

  guideManual(ctx);
  return ctx;
}

module.exports = { setupSkillDeps };
