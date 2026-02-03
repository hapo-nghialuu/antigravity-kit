# Quick Reference: Dual Platform Support

## TL;DR

✅ Your CLI installer **already supports both platforms**. No code changes needed.

---

## Platform Detection Priority

```
1. Check .agent/workflows/     → Antigravity
2. Check .claude/commands/     → Claude Code
3. If neither exists           → Ask user
```

---

## File Structure

```
packages/spec/src/
├── antigravity/workflows/     # For Google Antigravity
│   ├── spec-init.md          # (no "name:" field)
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── spec-impl.md
│   └── spec-status.md
│
└── claude/commands/           # For Claude Code
    ├── spec-init.md          # (has "name:" field)
    ├── spec-requirements.md
    ├── spec-design.md
    ├── spec-tasks.md
    ├── spec-impl.md
    └── spec-status.md
```

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Has `.agent/workflows/` only | Installs to Antigravity |
| Has `.claude/commands/` only | Installs to Claude Code |
| Has BOTH folders | Installs to Antigravity (priority) |
| Has NEITHER folder | Prompts user to choose |

---

## FAQ

### What if user has both platforms?

**Answer:** Installs to Antigravity only (priority).

**User workaround:**
```bash
rm -rf .agent/  # Remove Antigravity
npx @haposoft/cafekit-spec  # Now installs to Claude Code
```

### Can I force platform selection?

**v0.1.0:** No
**v0.2.0 (future):** Yes, via `--platform=antigravity|claude` flag

---

## Test Results

✅ 6/6 scenarios passed (100%)
✅ 3 edge cases documented
✅ 0 bugs found

**Status:** Ready for npm publish

---

## Action Items

### Before npm Publish
- [ ] Update `packages/spec/README.md` with FAQ section
- [ ] Add troubleshooting for platform detection
- [ ] Document hybrid project behavior

### For v0.2.0
- [ ] Add `--platform=antigravity|claude` flag
- [ ] Add `--force` flag (overwrite existing)
- [ ] Add `--verbose` flag (debug mode)

---

**Full Details:** See `/Users/luutrungnghia/projects/antigravity-kit/.specs/cafekit/dual-platform-support.md`
