# Delegating to Grok CLI (Grok Build)

Verified against grok 0.2.101 (2026-07). Re-check `grok --help` if flags fail.

## Preflight

```bash
which grok && grok --version
grok models          # available model IDs
```

## Non-interactive dispatch

Two forms:

```bash
# single-turn from a brief file (preferred for delegation)
grok --prompt-file plans/<slug>-task.md \
     --worktree=<slug> \
     --check \
     --permission-mode acceptEdits \
     --allow "Bash(npm:*)" --allow "Bash(node:*)" \
     --output-format plain

# short single-turn prompt
grok -p "<prompt>"
```

Run in a background shell and poll the output.

### Key flags

| Flag | Notes |
|---|---|
| `--prompt-file <path>` | single-turn prompt from file |
| `-p, --single <prompt>` | single-turn inline prompt |
| `--worktree=<name>` | built-in git worktree isolation (grok-managed; see pitfalls) |
| `--check` | appends a self-verification loop (headless only) — use it |
| `--permission-mode <mode>` | `default` \| `acceptEdits` \| `auto` \| `dontAsk` \| `bypassPermissions` \| `plan` |
| `--allow "<RULE>"` / `--deny "<RULE>"` | permission rules, Claude Code syntax: `Bash(npm:*)`, `Write`, `Edit` |
| `-m <model>` / `--reasoning-effort` | model + effort overrides |
| `--max-turns <N>` | hard cap on agent turns |
| `--json-schema '<schema>'` | structured final output |
| `--output-format plain\|json\|streaming-json` | headless output format |
| `--resume <SESSION_ID>` | continue a session (context preserved) |
| `--best-of-n <N>` | run task N ways in parallel, pick best (headless) |

## Permission model — the #1 pitfall

`--permission-mode acceptEdits` **does not reliably unblock file writes in headless runs**; grok may report "Write tool blocked" and quietly degrade to a **design-only** response that reads like progress. It still exits 0.

Mitigations:
- Add explicit allow rules for write tools on the first dispatch: `--allow "Write" --allow "Edit" --allow "StrReplace"` alongside `--allow "Bash(npm:*)" --allow "Bash(node:*)"`.
- After ~30s, grep the output for `blocked`/`chặn` — catch degradation early.
- If the run finished design-only: **resume the same session** with widened allows and an explicit apply instruction; grok picks up its own design and implements without re-exploring:

```bash
grok --resume <SESSION_ID> --no-plan \
     --permission-mode acceptEdits \
     --allow "Write" --allow "Edit" --allow "StrReplace" \
     --allow "Bash(npm:*)" --allow "Bash(node:*)" \
     --check -p "Continue: apply the designed changes, run tests, report results."
```

Even with allows granted, shell may still be policy-restricted (runs finish with "npm test BLOCKED — shell not pre-approved"). That's fine: **you run the Evidence commands yourself during verification** — do not loosen to `bypassPermissions` just to make the agent self-verify.

## Worktree pitfalls

- `--worktree=<name>` worktrees are **grok-managed**: they may not appear in the target repo's `git worktree list` and `grok worktree list` may still say "No worktrees found". **Do not trust either listing** — after the run, check `git status` in the main repo to find where changes actually landed. In practice (0.2.101, resumed sessions) grok can write **directly into the main working tree** despite the flag.
- Consequence: always take a stash-backup snapshot before dispatch (`git stash push -u -m "backup: ..." && git stash apply -q`), and treat the main tree as potentially modified.

## Session management

```bash
grok sessions list                      # ids + summaries
grok --resume <SESSION_ID> [flags] -p "..."   # continue with same context
grok export <SESSION_ID>                # transcript as Markdown
```

## Quirks

- Grok reads the target repo's `CLAUDE.md` and obeys it (including tone rules) — repo constraints apply automatically, but so do repo-wide bans; account for that in the brief.
- `--check` produces a self-verification section in the final report — useful signal, **not** a substitute for your independent verification.
- Exit code 0 means the CLI ran, not that the task succeeded. Judge by diff + your own Evidence runs.
