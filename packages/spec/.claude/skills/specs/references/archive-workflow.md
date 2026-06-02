# Archive Workflow

## Purpose

Archive completed specs, write technical journals summarizing the work, and clean up the `specs/` directory.

## Spec Resolution

1. If `<feature>` argument provided → archive that specific spec
2. If not → scan all specs in `specs/`, filter those with fully completed `progress`

## 5-Step Workflow

### Step 1: Read Spec Files
- `spec.json` — metadata and status
- Read first 20 lines of each task file to understand progress
- Determine which specs are complete vs still in-progress

### Step 2: Summarize & Write Journal
Ask user via `AskUserQuestion`: "Would you like to write technical journal entries for these specs?"

If user selects "Yes":
- Analyze information from Step 1
- Spawn journal-writer agent to document each spec
- Journal entries should be concise, focusing on: key events, major changes, impact, decisions
- Save to `./docs/journals/`

If user selects "No": skip this step.

### Step 3: Confirm Action
Ask user via `AskUserQuestion`:
- "Archive all completed specs"
- "Select specific specs to archive"
- "Cancel, don't archive"

Then ask:
- "Move to `specs/archive/`"
- "Delete permanently"

### Step 4: Execute Archive
Based on user's choice:
- **Move:** `mv specs/<feature> specs/archive/<feature>`
- **Delete:** `rm -rf specs/<feature>` (⚠️ requires confirmation first)

### Step 5: Ask About Commit
Ask user via `AskUserQuestion`:
- "Stage and commit changes"
- "Commit and push"
- "I'll handle it later"

## Output

After archiving, present summary:

```markdown
## Archive Results

| Spec | Status | Created | Action |
|---|---|---|---|
| mobile-app | done | 2026-04-01 | Moved → archive |
| auth-system | done | 2026-03-28 | Deleted permanently |

**Journal entries written:**
| Title | Path |
|---|---|
| Mobile App Release | docs/journals/2026-04-06-mobile-app.md |
```

## Notes

- Only archive completed specs — never archive in-progress specs
- Keep questions focused on genuine decision points
- Be concise, prioritize efficiency
- List unresolved questions at the end
