---
name: hapo:git
description: "Hapo Native Git Operations & Worktree Management. Handles safe commits, conventional split, branch finish choices, secret scanning, and sibling-branch worktrees locally."
user-invocable: true
when_to_use: "Invoke for commits, PRs, branch hygiene, or worktree management."
category: dev-tools
keywords: [git, commits, pr, worktree]
argument-hint: "commit | push | pr | finish | worktree <feature-desc>"
metadata:
  author: haposoft
  version: "1.1.0"
---
# Git Operations & Worktree

Git operations and worktree management using plain `git` commands.

## Default (no arguments)
Present options via AskUserQuestion — header "Git Operation": commit / push / pr / finish / worktree.

## Commands
- `commit`: run installed secret scanner → analyze diff → split into conventional commits.
- `push`: push current branch.
- `pr`: push + open PR. Target = repo's integration branch — detect via
  `gh repo view --json defaultBranchRef` or `origin/HEAD`; never assume `main`/`develop`.
- `finish`: fresh `git status` + verification, then present exactly 4 options:
  merge locally / push + PR / keep branch-worktree / discard (typed confirmation).
- `worktree <desc>`: sibling dir `../<project>-<branch>` for isolated setup.

## Secret scan (before every commit)
```bash
node .claude/scripts/scan-staged-secrets.cjs
```
The helper parses `git diff --cached --unified=0 --no-color --diff-filter=ACMR`, checks added lines only, maps hunks to source lines, and prints only file, line, and identifier. It never prints secret values or context.

Match → STOP. For an untracked secret, add an appropriate `.gitignore` rule. For a tracked secret, stop, rotate it, and ask the user before changing history or index state.

## Split rules
Split when: mixed types (feat+fix), mixed scopes, config/deps mixed with code, >10 unrelated files.
Single commit when: same type+scope, ≤3 files, ≤50 lines.

## Output
```
✓ staged: N files (+X/-Y)
✓ secrets: none
✓ commit: <hash> type(scope): description
✓ pushed: yes|no
```

## Errors
| Error | Action |
|---|---|
| Secrets matched | Block; show lines |
| Nothing staged | Exit cleanly |
| Push rejected | Suggest `git pull --rebase` |
| Conflicts | List files; never auto-resolve |

Never force-push or delete a worktree without explicit confirmation.

## References
- `references/commit-protocols.md` · `references/finish-branch.md` · `references/worktree-blueprint.md`
