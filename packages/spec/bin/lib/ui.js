/**
 * Terminal UI layer for the installer.
 *
 * In an interactive TTY it renders the @clack/prompts experience (framed
 * intro/outro, spinner, ◆/│/└ prompts). In a non-interactive context (piped
 * stdin, CI, --yes) it degrades to plain console output and returns provided
 * fallbacks for any input prompt — so spawned/CI runs never hang and the
 * self-test fixtures keep working unchanged.
 *
 * All @clack/prompts usage is funneled through here and gated by `interactive`.
 */

const p = require('@clack/prompts');
const pc = require('picocolors');

/** Cancel sentinel returned by input prompts when the user aborts (Ctrl+C). */
const CANCEL = Symbol('cafekit.cancel');

/** True only when we can drive an interactive terminal. */
function isInteractive() {
  return Boolean(process.stdin.isTTY)
    && process.env.CI !== 'true'
    && process.env.NON_INTERACTIVE !== 'true';
}

/**
 * Build a UI logger bound to an interactive flag.
 *
 * Interactive methods route to clack; non-interactive ones to console so output
 * stays greppable/plain. `detail()` is for high-frequency per-file progress: it
 * updates the active spinner line (interactive) or prints (non-interactive).
 */
function createUI(interactive) {
  let spinner = null;

  return {
    interactive,
    pc,

    intro(msg) {
      if (interactive) p.intro(msg);
      else console.log(`\n${msg}\n`);
    },
    outro(msg) {
      if (interactive) p.outro(msg);
      else console.log(`\n${msg}`);
    },
    note(msg, title) {
      if (interactive) p.note(msg, title);
      else console.log(`\n${title ? `${title}\n` : ''}${msg}`);
    },

    startSpinner(msg) {
      if (interactive) {
        spinner = p.spinner();
        spinner.start(msg);
      } else {
        console.log(msg);
      }
    },
    stopSpinner(msg) {
      if (interactive && spinner) {
        spinner.stop(msg);
        spinner = null;
      } else if (msg) {
        console.log(msg);
      }
    },
    /** Ephemeral per-file progress (does not scroll the screen when interactive). */
    detail(msg) {
      if (interactive) {
        if (spinner) spinner.message(msg.replace(/^\s+/, ''));
      } else {
        console.log(msg);
      }
    },

    success(msg) { interactive ? p.log.success(msg) : console.log(msg); },
    info(msg) { interactive ? p.log.info(msg) : console.log(msg); },
    warn(msg) { interactive ? p.log.warn(msg) : console.log(msg); },
    error(msg) { interactive ? p.log.error(msg) : console.error(msg); },

    async select(opts, fallback) {
      if (!interactive) return fallback;
      const r = await p.select(opts);
      return p.isCancel(r) ? CANCEL : r;
    },
    async multiselect(opts, fallback) {
      if (!interactive) return fallback;
      const r = await p.multiselect(opts);
      return p.isCancel(r) ? CANCEL : r;
    },
    async text(opts, fallback = '') {
      if (!interactive) return fallback;
      const r = await p.text(opts);
      return p.isCancel(r) ? CANCEL : r;
    },
    async confirm(opts, fallback = false) {
      if (!interactive) return fallback;
      const r = await p.confirm(opts);
      return p.isCancel(r) ? CANCEL : r;
    },

    isCancel(v) { return v === CANCEL; }
  };
}

module.exports = { isInteractive, createUI, CANCEL };
