---
name: hapo:git
description: "Hapo Native Git Operations & Worktree Management. Handles safe commits, conventional split, secret scanning, and sibling-branch worktrees locally."
argument-hint: "commit | push | pr | worktree <feature-desc>"
version: "1.0.0"
---

# Git Operations & Worktree

This skill merges Version Control Systems (VSC) capabilities and parallel Worktree management into a single, clean-room execution engine utilizing pure Bash commands rather than proprietary Node scripts.

**Mantra:** Secure, Conventional, and Isolated.

## Commands

### 1. Version Control Engine
- **`commit`**: Scan secrets, analyze diff, auto-split chunks into conventional commits.
- **`push`**: Securely push to the current branch.
- **`pr`**: Propose merging current feature into `develop` or `main`.

### 2. Worktree Engine (Safe Parallel Development)
- **`worktree <feature-description>`**: Creates a sibling directory alongside the current repo to isolate dependencies and database contexts without dirtying the main worktree.

## Core Directives 

### 1. Native Bash Execution Only
- DO NOT rely on external JS/CJS scripts to evaluate git. Use pure system `git` CLI logic in bash.
- Always check the status first: `git status && git diff --cached --stat`

### 2. Pre-Commit Security Audit
- Always run secret detection before creating a commit:
  ```bash
  git diff --cached | grep -iE "(api[_-]?key|token|password|secret|credential)"
  ```
- If a secret is matched: **HALT!** Refuse to commit. Demand the user add the file to `.gitignore` and run `git rm --cached <file>`.

### 3. Smart Worktree Strategy
- Never run branching logic within the same root if the task requires heavy, isolated setup.
- Worktrees MUST be created as *sibling directories*: `../<project-name>-<feature-branch>`.

## References & Protocols

- `references/commit-protocols.md`: Strict rules for analyzing Git Diffs and determining commit splitting behavior.
- `references/worktree-blueprint.md`: The 4-step Bash process to accurately construct an out-of-bounds Git Worktree Environment.
