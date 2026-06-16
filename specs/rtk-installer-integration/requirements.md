# Requirements Document

## Introduction

CafeKit installs a Claude Code runtime bundle into a project via `npx @haposoft/cafekit`. This feature adds an **opt-in step** to that installer that offers to install [rtk](https://github.com/rtk-ai/rtk) — a CLI proxy that reduces LLM token consumption by rewriting `git`/`grep`/`ls`/`tree`/build/test commands to compact equivalents. rtk's own documentation names a **PreToolUse hook** (installed by `rtk init -g`) as the official, recommended integration for Claude Code, so cafekit only needs to install the binary and invoke that command — it must not reimplement rtk's compression logic or write a custom hook.

The step mirrors the existing `setup-rtk` opt-in pattern already used for skill dependencies (`phases/skills-setup.js`): default OFF, gated by an interactive confirm or a `--with-rtk` flag, non-fatal on failure, and tracked in the cafekit manifest. Installing third-party software on a user's machine is a side effect, so explicit consent is mandatory.

## Requirements

### Requirement 1: Opt-in trigger (flag + prompt)
**Objective:** As a developer running the installer, I want to be explicitly asked before any third-party binary is installed, so that nothing lands on my machine without consent.

#### Acceptance Criteria
1. When the installer runs with `--with-rtk`, the system shall treat rtk setup as opted-in without prompting.
2. When the installer runs interactively without `--with-rtk`, the system shall ask a single yes/no confirm whose default value is "no".
3. When the installer runs non-interactively (CI, `--yes`, or no TTY) without `--with-rtk`, the system shall skip rtk setup entirely.
4. When `--dry-run` is set, the system shall not install anything and shall report that rtk setup would be offered/skipped.
5. The system shall parse `--with-rtk` in the same argument loop as `--with-skills-deps` and expose it as `options.withRtk`.

### Requirement 2: rtk setup phase (binary + hook)
**Objective:** As a developer who opted in, I want rtk installed and wired into Claude Code, so that token-saving rewrites take effect without further manual steps.

#### Acceptance Criteria
1. When rtk setup runs and the `rtk` binary is already on PATH, the system shall skip binary installation and proceed to hook registration.
2. When rtk setup runs and `rtk` is absent, the system shall attempt a best-effort install using the first available method (prebuilt install script, else `cargo install rtk` when cargo exists).
3. If binary installation fails or no install method is available, the system shall warn and skip the rest of rtk setup without failing the cafekit install.
4. When the `rtk` binary is present, the system shall run `rtk init -g` to register rtk's official PreToolUse hook and RTK.md.
5. Where the `jq` dependency required by rtk's hook is missing, the system shall warn that the hook needs `jq` and continue (non-fatal).
6. When rtk setup completes any installing action, the system shall record what it added in the cafekit manifest so re-runs are idempotent.
7. If any step throws, the system shall catch it, log a warning, and allow the installer to finish successfully (parity with `setupSkillDeps` non-fatal contract).

### Requirement 3: Surfacing & localization
**Objective:** As a user in any supported locale, I want clear prompt and summary text, so that I understand what rtk is and whether it was installed.

#### Acceptance Criteria
1. The system shall add localized strings for the rtk confirm prompt and status/skip/done messages in en, ja, and vi message catalogs.
2. The system shall add `--with-rtk` to the installer `--help` output with a one-line description.
3. When rtk setup installs or registers anything, the system shall include a one-line result in the install summary.
4. The system shall present rtk as token-saving for Claude Code Bash commands and shall not overstate savings (no fixed percentage claims).

## Non-Functional Requirements

### Requirement 4: Reliability & Availability
**Objective:** As a cafekit maintainer, I want rtk setup to be strictly additive and isolated, so that it can never break the core install.

#### Acceptance Criteria
4.1 If any rtk command times out, errors, or returns non-zero, the system shall treat the failure as non-fatal and continue the install.
4.2 The system shall run all external commands through the existing `spawnSync`-based helper with captured output (no inherited interactive prompts that could hang CI).
4.3 The system shall not modify, roll back, or remove files outside cafekit's tracked manifest scope; the rtk binary and `rtk init -g` outputs are owned by rtk, not cafekit.

### Requirement 5: Security & Privacy
**Objective:** As a security-conscious user, I want third-party installation to be transparent and consented, so that the installer remains trustworthy.

#### Acceptance Criteria
5.1 The system shall never install the rtk binary without an explicit opt-in (flag or affirmative prompt).
5.2 If an install method downloads a remote script, the system shall surface the source (URL/method) before or while executing, and shall prefer a pinned/official source.
5.3 The system shall not transmit any project data as part of rtk setup.
