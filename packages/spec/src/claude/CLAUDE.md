# CLAUDE.md

@AGENTS.md

## Claude Code runtime

- Claude Code loads `AGENTS.md` above as shared project instructions.
- CafeKit project hooks and settings are installed under `.claude/`; review hook changes before trusting them.
- Edit project skills under `.claude/skills/`, not `~/.claude/skills`.
- Run Python skill scripts with the skill venv:
  - macOS/Linux: `.claude/skills/.venv/bin/python3 scripts/<script>.py`
  - Windows: `.claude\skills\.venv\Scripts\python.exe scripts\<script>.py`
- Consult `.claude/rules/state-sync.md`, `.claude/rules/hook-protocols.md`, and `.claude/rules/skill-workflow-routing.md` when their topics apply.

## Language Consistency <!-- cafekit:lang -->

Always respond in **English**. Technical terms, code identifiers, and file paths may remain in English, but explanations, comments directed at the user, and structured output must be in English.

## Addressing (Context Overflow Indicator)

Claude Code always addresses the user as "anh" throughout the conversation. If it stops doing so, it is a sign the context has been compacted/truncated — tell the user to consider `/clear`.
