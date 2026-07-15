# Delegating to Codex CLI

Verified against codex-cli 0.144.4 (2026-07). Re-check `codex exec --help` if flags fail — the CLI evolves quickly.

## Preflight

```bash
which codex && codex --version        # installed?
codex doctor                          # auth + runtime health (slow; run only when suspicious)
```

User-level defaults live in `~/.codex/config.toml` (`model`, `model_reasoning_effort`, agents, MCP servers). Overrides via `-m` and `-c key=value` beat config — pass them explicitly for reproducible runs.

## Non-interactive dispatch: `codex exec`

Reads the prompt from an argument, or from **stdin** when the argument is `-`. Prefer stdin + brief file:

```bash
codex exec \
  -m gpt-5.6-terra \
  -c model_reasoning_effort='"max"' \
  --sandbox workspace-write \
  -o /tmp/codex-last-message.txt \
  - < plans/<slug>-task.md
```

Run it in a background shell and poll the output.

### Key flags

| Flag | Notes |
|---|---|
| `-m <model>` | model ID, e.g. `gpt-5.6-terra` (note spelling: *terra*) |
| `-c model_reasoning_effort='"max"'` | TOML-parsed value — keep the inner quotes |
| `--sandbox <mode>` | `read-only` \| `workspace-write` \| `danger-full-access` |
| `-o <file>` | write the agent's final message to a file — easiest completion check |
| `-C <dir>` | working root (use for delegating into a git worktree) |
| `--add-dir <dir>` | extra writable dirs alongside the workspace |
| `--output-schema <file>` | JSON Schema constraining the final response |
| `--json` | JSONL event stream on stdout (machine parsing) |
| `--ephemeral` | don't persist session files |

### Pitfalls

- **`-a` / `--ask-for-approval` is TUI-only.** `codex exec` rejects it (`error: unexpected argument '-a' found`). Exec mode is implicitly `approval: never` — sandbox mode is your only control there.
- **`workspace-write` limits writes, not reads**, to: workdir, `/tmp`, `$TMPDIR`. Network is available. Commands needing writes outside (global installs) will fail — keep Evidence commands repo-local.
- **Effort value is TOML**: `-c model_reasoning_effort='"max"'` (double-quoted inside single quotes). Bare `max` may parse as a literal string too, but the quoted form is unambiguous.
- Startup banner echoes `model:`, `reasoning effort:`, `sandbox:` — **verify these lines** ~20s after dispatch instead of assuming flags took effect.
- User config may define agents/hooks/MCP servers that activate automatically; `--ignore-user-config` gives a clean run if they interfere.

## Monitor & verify liveness

```bash
# ~20-30s after dispatch: banner shows model/sandbox; then agent narration follows
head -c 1200 <output-file>
tail -c 1500 <output-file>            # progress
cat /tmp/codex-last-message.txt       # exists → run finished; content = final report
```

## Resume

```bash
codex exec resume --last "<follow-up>"          # most recent session
codex exec resume <SESSION_ID> "<follow-up>"    # by id (session id printed in banner)
```

Use resume (not a fresh dispatch) when: permission-blocked mid-run, follow-up fixes after your verification failed, or continuing a design into implementation.

## Review mode

`codex review` (or `codex exec review`) runs a non-interactive code review of the current repo — useful as an independent second-opinion pass on another agent's diff.
