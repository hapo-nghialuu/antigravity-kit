/**
 * Skill dependency setup primitives (cross-platform, no sudo).
 *
 * Provides the building blocks the skills-setup phase uses to provision the
 * parts that a plain file-copy install can't: a Python venv + pip requirements,
 * skill-local npm installs, and the Puppeteer Chromium binary. System binaries
 * and global npm tools are NOT auto-installed here — they are detected and the
 * phase prints guidance.
 *
 * All commands run via spawnSync (blocking is fine for a CLI). Detection is
 * silent; install callers decide how to surface progress/failures.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const isWindows = process.platform === 'win32';

/** Run a command, return { ok, stdout, stderr, status }. Never throws. */
function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts });
  return {
    ok: !r.error && r.status === 0,
    status: r.status,
    stdout: r.stdout || '',
    stderr: r.stderr || ''
  };
}

/** Is a command available on PATH? */
function hasCmd(name) {
  const probe = isWindows ? run('where', [name]) : run('which', [name]);
  return probe.ok;
}

/** Find a usable Python launcher ('python3' or 'python'), or null. */
function findPython() {
  for (const cmd of ['python3', 'python']) {
    if (hasCmd(cmd) && run(cmd, ['--version']).ok) return cmd;
  }
  return null;
}

function venvDir(skillsDir) {
  return path.join(skillsDir, '.venv');
}

/** Path to the venv's python interpreter (OS-specific). */
function venvPython(skillsDir) {
  return isWindows
    ? path.join(venvDir(skillsDir), 'Scripts', 'python.exe')
    : path.join(venvDir(skillsDir), 'bin', 'python3');
}

function venvValid(skillsDir) {
  return fs.existsSync(venvPython(skillsDir));
}

/** Create the venv (idempotent: skips if already valid). Returns true on success. */
function createVenv(skillsDir, py) {
  if (venvValid(skillsDir)) return true;
  fs.mkdirSync(skillsDir, { recursive: true });
  return run(py, ['-m', 'venv', venvDir(skillsDir)]).ok;
}

/** Upgrade pip inside the venv (best-effort). */
function pipUpgrade(skillsDir) {
  return run(venvPython(skillsDir), ['-m', 'pip', 'install', '--upgrade', 'pip', '--prefer-binary']).ok;
}

/** Install a requirements.txt into the venv (wheels first). Returns true on success. */
function pipInstall(skillsDir, requirementsPath) {
  return run(venvPython(skillsDir), [
    '-m', 'pip', 'install', '-r', requirementsPath, '--prefer-binary'
  ]).ok;
}

/** `npm install` in a skill scripts dir. Returns true on success. */
function npmInstall(dir) {
  return run('npm', ['install', '--no-audit', '--no-fund'], { cwd: dir }).ok;
}

/** Download the Puppeteer Chromium browser for chrome-devtools. */
function installChromium(scriptsDir) {
  return run('npx', ['--yes', 'puppeteer', 'browsers', 'install', 'chrome'], { cwd: scriptsDir }).ok;
}

/**
 * List installed skills that ship a runnable scripts/requirements.txt
 * (excludes the tests/ requirements). Returns [{ skill, file }].
 */
function collectRequirements(skillsDir) {
  const out = [];
  if (!fs.existsSync(skillsDir)) return out;
  for (const skill of fs.readdirSync(skillsDir)) {
    const file = path.join(skillsDir, skill, 'scripts', 'requirements.txt');
    if (fs.existsSync(file)) out.push({ skill, file });
  }
  return out;
}

/**
 * List installed skills with a scripts/package.json that still needs installing
 * (no node_modules present). Returns [{ skill, dir }].
 */
function collectSkillPackages(skillsDir) {
  const out = [];
  if (!fs.existsSync(skillsDir)) return out;
  for (const skill of fs.readdirSync(skillsDir)) {
    const dir = path.join(skillsDir, skill, 'scripts');
    if (fs.existsSync(path.join(dir, 'package.json')) && !fs.existsSync(path.join(dir, 'node_modules'))) {
      out.push({ skill, dir });
    }
  }
  return out;
}

/** External binaries some skills shell out to — detected, never auto-installed. */
const SYSTEM_TOOLS = [
  { cmd: 'ffmpeg', why: 'ai-multimodal (audio/video)', brew: 'brew install ffmpeg', apt: 'sudo apt install ffmpeg', win: 'winget install ffmpeg' },
  { cmd: 'pdftotext', why: 'pdf (text extraction, poppler)', brew: 'brew install poppler', apt: 'sudo apt install poppler-utils', win: 'choco install poppler' },
  { cmd: 'rsvg-convert', why: 'generate-graph (PNG export, librsvg)', brew: 'brew install librsvg', apt: 'sudo apt install librsvg2-bin', win: 'choco install rsvg-convert' },
  { cmd: 'tesseract', why: 'pdf/ai-multimodal (OCR)', brew: 'brew install tesseract', apt: 'sudo apt install tesseract-ocr', win: 'choco install tesseract' }
];

/** Global npm CLIs some skills expect — detected, never auto-installed. */
const GLOBAL_NPM = [
  { cmd: 'agent-browser', pkg: 'agent-browser', why: 'agent-browser skill' }
];

/** Per-OS install hint for a SYSTEM_TOOLS entry. */
function systemHint(tool) {
  if (process.platform === 'darwin') return tool.brew;
  if (process.platform === 'win32') return tool.win;
  return tool.apt;
}

module.exports = {
  isWindows,
  hasCmd,
  findPython,
  venvDir,
  venvPython,
  venvValid,
  createVenv,
  pipUpgrade,
  pipInstall,
  npmInstall,
  installChromium,
  collectRequirements,
  collectSkillPackages,
  SYSTEM_TOOLS,
  GLOBAL_NPM,
  systemHint
};
