/**
 * Phase: skill dependency setup (opt-in, safe cross-platform).
 *
 * Provisions the parts a file-copy install can't:
 *  - Python venv at <skillsDir>/.venv + pip install each skill's requirements
 *  - skill-local `npm install` (scripts/package.json without node_modules)
 *  - Puppeteer Chromium binary (chrome-devtools)
 *  - Playwright browser binary (pptx html2pptx)
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
    ctx.ui.warn(ctx.t('venvNoHost'));
    return;
  }

  ctx.ui.startSpinner(ctx.t('venvCreating'));
  if (!dep.createVenv(skillsDir, py)) {
    ctx.ui.stopSpinner(ctx.t('venvFailed'));
    ctx.ui.warn(ctx.t('venvFailed'));
    return;
  }
  dep.pipUpgrade(skillsDir);
  ctx.ui.stopSpinner(`${ctx.t('venvReady')} (${dep.venvDir(skillsDir)})`);

  for (const { skill, file } of reqs) {
    ctx.ui.startSpinner(ctx.t('pipInstalling', { skill }));
    const ok = dep.pipInstall(skillsDir, file);
    if (ok) {
      ctx.ui.stopSpinner(ctx.t('pipInstalled', { skill }));
    } else {
      ctx.ui.stopSpinner(ctx.t('pipFailed', { skill, cmd: `"${dep.venvPython(skillsDir)}" -m pip install -r "${file}"` }));
    }
  }
}

/** Run skill-local npm installs + browser binaries for a platform's skills. */
function setupNode(ctx, skillsDir) {
  for (const { skill, dir } of dep.collectSkillPackages(skillsDir)) {
    ctx.ui.startSpinner(ctx.t('npmInstalling', { skill }));
    const ok = dep.npmInstall(dir);
    if (ok) {
      ctx.ui.stopSpinner(ctx.t('npmInstalled', { skill }));
    } else {
      ctx.ui.stopSpinner(ctx.t('npmFailed', { skill, dir }));
      continue;
    }

    // Skills using Playwright (e.g. pptx) also need a browser binary.
    if (dep.pkgHasDep(dir, 'playwright')) {
      ctx.ui.startSpinner(ctx.t('playwrightInstalling', { skill }));
      const pw = dep.installPlaywrightBrowser(dir);
      ctx.ui.stopSpinner(pw ? ctx.t('playwrightReady', { skill }) : ctx.t('playwrightSkipped', { skill }));
    }
  }

  // Chromium for chrome-devtools (puppeteer-based).
  const chromeScripts = path.join(skillsDir, 'chrome-devtools', 'scripts');
  if (fs.existsSync(path.join(chromeScripts, 'package.json'))) {
    ctx.ui.startSpinner(ctx.t('chromiumInstalling'));
    const ok = dep.installChromium(chromeScripts);
    ctx.ui.stopSpinner(ok ? ctx.t('chromiumReady') : ctx.t('chromiumSkipped'));
  }
}

/** Detect (don't install) system binaries + global npm CLIs and print guidance. */
function guideManual(ctx) {
  const missingTools = dep.SYSTEM_TOOLS.filter((t) => !dep.hasCmd(t.cmd));
  const missingNpm   = dep.GLOBAL_NPM.filter((g) => !dep.hasCmd(g.cmd));
  if (missingTools.length === 0 && missingNpm.length === 0) return;

  const lines = [];
  for (const t of missingTools) lines.push(`${t.cmd}  — ${t.why}\n   ${dep.systemHint(t)}`);
  for (const g of missingNpm)   lines.push(`${g.cmd}  — ${g.why}\n   npm install -g ${g.pkg}`);
  ctx.ui.note(lines.join('\n'), ctx.t('optionalToolsTitle'));
}

async function setupSkillDeps(ctx) {
  if (!(await shouldRun(ctx))) {
    if (!ctx.dryRun) ctx.ui.info(ctx.t('skillsSkipped'));
    return ctx;
  }

  for (const key of ctx.platforms) {
    setupPython(ctx, PLATFORMS[key].skillsDir);
    setupNode(ctx, PLATFORMS[key].skillsDir);
  }

  guideManual(ctx);
  return ctx;
}

module.exports = { setupSkillDeps };
