# Cross-Spec Dependency Detection

## Purpose

Before creating a new spec, the system must check whether any existing in-progress spec is related — to avoid file conflicts, duplicated work, or breaking something another spec depends on.

## Workflow

### Step 1: Scan

Read `spec.json` in each subdirectory of `specs/`. Filter specs that have any phase in `progress` not yet `done` or `cancelled`.

### Step 2: Compare Scope

For each incomplete spec, compare against the new spec being created:

| Comparison Criteria | Example |
|---|---|
| Overlapping code files? | Both specs modify `src/auth/login.ts` |
| Shared module/dependency? | Both depend on `@auth/core` |
| Same feature area? | Both belong to "Authentication" module |

### Step 3: Classify Relationship

- **New spec needs results from old spec** → New spec sets `blockedBy: ["<old-spec>"]`
- **New spec changes something old spec uses** → Old spec sets `blockedBy: ["<new-spec>"]`, new spec sets `blocks: ["<old-spec>"]`
- **Mutual dependency** → Both reference each other

### Step 4: Bidirectional Update

When a relationship is detected, update `spec.json` of **BOTH** specs:

```json
// specs/auth-system/spec.json
{
  "dependencies": {
    "blockedBy": [],
    "blocks": ["user-dashboard"]
  }
}

// specs/user-dashboard/spec.json
{
  "dependencies": {
    "blockedBy": ["auth-system"],
    "blocks": []
  }
}
```

### Step 5: Handle Ambiguity

If the relationship is unclear, ask user via `AskUserQuestion`:
- **Title:** "Cross-Spec Dependencies"
- **Question:** "Spec `A` and spec `B` appear related. What's the relationship?"
- **Options:** "A blocks B" | "B blocks A" | "Mutual dependency" | "Not related"

## Blocked State

A spec with `blockedBy` containing a spec not yet `done`:
- The `progress` field shows current phase as `blocked`
- When all blocking specs complete → automatically unblock on next scan

## Output Format

```
Dependency Scan:
- Found: {N} incomplete specs
- Related: {M} specs with overlapping scope
- Updated: specs/{A}/spec.json ↔ specs/{B}/spec.json
- Status: {A} blocks {B}
```
