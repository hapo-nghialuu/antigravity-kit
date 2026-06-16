/**
 * Local captured-spawnSync helper for the rtk install phase.
 *
 * Why local: `lib/skill-deps.js` does not export a `run(cmd, args)` helper
 * (it uses `runAsync` internally and never re-exports it). The rtk phase
 * needs a synchronous, captured spawnSync (R2.2, R4.2) that returns
 * `{ ok, status, stdout, stderr }` — same shape as `skill-deps.runAsync` but
 * blocking. KISS: one 20-line module, no dependency on `lib/skill-deps.js`
 * (which is skill-domain and not a generic command runner).
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {object} [opts] — passed through to spawnSync (e.g. { timeout })
 * @returns {{ ok: boolean, status: number|null, stdout: string, stderr: string }}
 */
const { spawnSync } = require('child_process');

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts });
  return {
    ok: !r.error && r.status === 0,
    status: r.status,
    stdout: r.stdout || '',
    stderr: r.stderr || ''
  };
}

module.exports = { run };
