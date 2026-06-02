# Change Detection - Detecting Changes

Methods for detecting and classifying code changes for impact analysis.

## Git Commands

### 1. Detect Recent Changes

```bash
# Uncommitted changes
git diff --name-only

# Staged changes
git diff --cached --name-only

# Changes in last commit
git diff --name-only HEAD~1

# Changes compared to another branch
git diff --name-only main...HEAD

# View detailed changes
git diff HEAD~1

# View statistics
git diff --stat HEAD~1
```

### 2. Get Change Details

```bash
# Lines changed
git diff --numstat HEAD~1

# Files and change count
git diff --shortstat HEAD~1

# Only view added/deleted files
git diff --diff-filter=AD --name-only HEAD~1
```

### 3. Historical Analysis

```bash
# View file history
git log --oneline -10 {file}

# See who modified which line
git blame {file}

# View changes in specific commit
git show {commit-hash}
```

## Change Classification

### Backend Changes

**Indicators:**
- Files: `*.ts`, `*.js`, `*.py`, `*.go` in `src/api/`, `src/services/`, `src/controllers/`
- Patterns: API routes, database queries, business logic

**Risk Level:**
- **High**: Authentication, authorization, payment, data validation
- **Medium**: CRUD operations, utility functions
- **Low**: Logging, comments, formatting

**Check:**
```bash
# API endpoints changed
grep -r "router\." {changed-files}
grep -r "app\.(get|post|put|delete)" {changed-files}

# Database queries
grep -r "prisma\." {changed-files}
grep -r "SELECT\|INSERT\|UPDATE\|DELETE" {changed-files}
```

### Frontend Changes

**Indicators:**
- Files: `*.tsx`, `*.jsx`, `*.vue`, `*.svelte` in `src/components/`, `src/pages/`
- Patterns: Components, hooks, state management

**Risk Level:**
- **High**: Authentication UI, payment forms, data entry
- **Medium**: Display components, navigation
- **Low**: Styling, text changes

**Check:**
```bash
# Component props changed
grep -r "interface.*Props" {changed-files}

# State management
grep -r "useState\|useEffect\|useContext" {changed-files}

# API calls
grep -r "fetch\|axios\|api\." {changed-files}
```

### Database Changes

**Indicators:**
- Files: `*.prisma`, `*.sql`, `migrations/*.sql`
- Patterns: Schema changes, migrations

**Risk Level:**
- **Critical**: Column deletion, type changes, constraint changes
- **High**: New required columns, index changes
- **Medium**: New optional columns, new tables
- **Low**: Comments, formatting

**Check:**
```bash
# Schema changes
git diff schema.prisma

# Migration files
ls -la migrations/ | tail -5

# Find affected queries
grep -r "{table_name}" src/
```

### Configuration Changes

**Indicators:**
- Files: `.env`, `config/*.ts`, `package.json`, `tsconfig.json`
- Patterns: Environment variables, dependencies, build config

**Risk Level:**
- **Critical**: Database URL, API keys, auth secrets
- **High**: Dependencies version, build settings
- **Medium**: Feature flags, timeouts
- **Low**: Comments, formatting

**Check:**
```bash
# Env changes
git diff .env.example

# Dependency changes
git diff package.json | grep -A5 -B5 "dependencies"

# Config changes
git diff config/
```

## Change Metrics

### Lines of Code (LOC)

```bash
# Total LOC changed
git diff --stat HEAD~1 | tail -1

# Per file
git diff --numstat HEAD~1
```

**Risk Assessment:**
- **< 50 LOC**: Low risk
- **50-200 LOC**: Medium risk
- **> 200 LOC**: High risk (consider splitting)

### File Count

```bash
# Count changed files
git diff --name-only HEAD~1 | wc -l
```

**Risk Assessment:**
- **1-3 files**: Low risk
- **4-10 files**: Medium risk
- **> 10 files**: High risk (wide impact)

### Change Type

```bash
# Added lines
git diff HEAD~1 | grep "^+" | wc -l

# Deleted lines
git diff HEAD~1 | grep "^-" | wc -l
```

**Risk Assessment:**
- **More additions**: New feature (test new paths)
- **More deletions**: Refactor (test existing paths)
- **Balanced**: Modification (test both)

## Automated Detection Script

```bash
#!/bin/bash
# detect-changes.sh

echo "=== Change Detection ==="

# Get changed files
CHANGED_FILES=$(git diff --name-only HEAD~1)
FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l)

echo "Files changed: $FILE_COUNT"
echo ""

# Classify by type
BACKEND=$(echo "$CHANGED_FILES" | grep -E "src/(api|services|controllers)" | wc -l)
FRONTEND=$(echo "$CHANGED_FILES" | grep -E "src/(components|pages)" | wc -l)
DATABASE=$(echo "$CHANGED_FILES" | grep -E "prisma|migrations" | wc -l)
CONFIG=$(echo "$CHANGED_FILES" | grep -E "\.env|config|package\.json" | wc -l)

echo "Backend: $BACKEND files"
echo "Frontend: $FRONTEND files"
echo "Database: $DATABASE files"
echo "Config: $CONFIG files"
echo ""

# Get LOC stats
git diff --stat HEAD~1 | tail -1

# Risk assessment
if [ $FILE_COUNT -gt 10 ] || [ $DATABASE -gt 0 ]; then
    echo "Risk: HIGH"
elif [ $FILE_COUNT -gt 3 ]; then
    echo "Risk: MEDIUM"
else
    echo "Risk: LOW"
fi
```

## Output Format

```json
{
  "summary": {
    "totalFiles": 5,
    "linesAdded": 120,
    "linesDeleted": 45,
    "riskLevel": "medium"
  },
  "changes": [
    {
      "file": "src/api/auth.ts",
      "type": "backend",
      "category": "authentication",
      "linesChanged": 67,
      "risk": "high",
      "reason": "Authentication logic modified"
    },
    {
      "file": "src/components/Login.tsx",
      "type": "frontend",
      "category": "ui",
      "linesChanged": 34,
      "risk": "medium",
      "reason": "Login form updated"
    }
  ]
}
```

## Integration Points

After detection, pass to:
1. **Dependency Scouting** - Find affected files
2. **Edge Case Identification** - Analyze risks
3. **Test Scenario Generation** - Create tests
