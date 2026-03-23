---
description: Analyze code change impacts on features and user actions
allowed-tools: Read, Glob, Grep, Bash, WebSearch
argument-hint: <feature-name> [--from <branch>]
---

# /impact-analysis - Feature Impact Analysis

Use this workflow after completing a feature (after `/code`) or before committing.

<background_information>
- **Mission**: Comprehensive impact analysis for completed features to prevent regression bugs
- **Success Criteria**:
  - All affected features identified with user actions mapped
  - Edge cases detected and documented
  - Test scenarios generated for all critical paths
  - Regression risks assessed with mitigation recommendations
  - Cross-referenced with spec artifacts when available
- **Timing**: After implementing all tasks for a feature, before running tests
- **Helper Scripts**: Optionally use advanced analysis scripts from `.agent/skills/impact-analysis/scripts/` for automated dependency analysis, AST-based semantic analysis, and risk scoring
</background_information>

<instructions>
## Core Task
Analyze the impact of code changes for feature **$ARGUMENTS** to identify affected features, user actions, edge cases, and generate comprehensive test scenarios.

## Helper Scripts (Optional Enhancement)

If available in `.agent/skills/impact-analysis/scripts/`, these scripts provide advanced automated analysis:

**1. Dependency Analysis**:
```bash
.agent/skills/impact-analysis/scripts/find-dependencies.sh <file>
```
- Finds all files importing/using the changed file
- Identifies API consumers and component usage
- Provides impact recommendations

**2. AST-Based Analysis** (for TypeScript/JavaScript):
```bash
node .agent/skills/impact-analysis/scripts/ast-analyze.js <file>
```
- Detects function signature changes
- Identifies breaking changes
- Compares before/after versions

**3. Risk Calculation**:
```bash
node .agent/skills/impact-analysis/scripts/calculate-risk.js
```
- Calculates risk score (0-25)
- Determines risk level (CRITICAL/HIGH/MEDIUM/LOW)
- Provides actionable recommendations with time estimates

**4. Complete Analysis**:
```bash
.agent/skills/impact-analysis/scripts/run-analysis.sh
```
- Runs all techniques
- Generates comprehensive markdown report

**Usage Strategy**:
- Try to use helper scripts first for automated analysis
- Fall back to manual grep/analysis if scripts not available
- Combine automated results with manual insights for best coverage

## Execution Steps

### Step 0: Validate Context & Determine Scope

**Parse Arguments**:
- Extract feature name from `$ARGUMENTS` (first argument)
- Check for flags: `--from <branch>` for branch-based analysis
- If no arguments: Analyze uncommitted changes

**Load Spec Context (if feature name provided)**:
- Check if `.specs/$FEATURE_NAME/` exists
- If exists:
  - Read `.specs/$FEATURE_NAME/spec.json` for metadata
  - Read `.specs/$FEATURE_NAME/requirements.md` for requirements
  - Read `.specs/$FEATURE_NAME/design.md` for design decisions
  - Read `.specs/$FEATURE_NAME/tasks.md` for task list
  - Note: This enables cross-referencing and coverage analysis
- If not exists: Continue with standalone analysis (no spec context)

**Determine Analysis Scope**:
- **Feature-based** (feature name provided): Analyze all changes since feature start
  - Use git log to find first commit mentioning feature
  - Or analyze all uncommitted + recent commits
- **Branch-based** (`--from` flag): Compare current branch with specified branch
  - Example: `--from main` analyzes all changes since branching from main
- **Uncommitted** (no args): Analyze only uncommitted changes
  - Use `git diff HEAD` for staged/unstaged changes

### Step 1: Detect & Classify Changes

**Execute Git Analysis**:
```bash
# Based on scope from Step 0:
# Feature-based: git diff <feature-start-commit>..HEAD
# Branch-based: git diff <branch>...HEAD
# Uncommitted: git diff HEAD
```

**Classify Changed Files**:
- **Backend**: Files in `src/api/`, `src/services/`, `src/lib/`, `src/utils/`
- **Frontend**: Files in `src/components/`, `src/pages/`, `src/app/`, `src/hooks/`
- **Database**: Files in `prisma/`, `migrations/`, `schema/`, `*.sql`
- **Config**: Files like `package.json`, `tsconfig.json`, `.env`, config files
- **Tests**: Files in `__tests__/`, `*.test.*`, `*.spec.*`

**Count & Summarize**:
- Total files changed
- Files per category
- Lines added/removed
- Commits involved (if applicable)

### Step 2: Map Features & User Actions

**Pattern-Based Feature Detection**:

Use file path patterns to identify affected features:

| File Pattern | Feature | User Actions |
|-------------|---------|--------------|
| `**/api/auth**`, `**/auth**` | Authentication & Login | Login, Logout, Sign Up, Password Reset, Session Management, 2FA |
| `**/api/users**`, `**/user**`, `**/profile**` | User Profile Management | View Profile, Edit Profile, Upload Avatar, Change Settings, Update Bio |
| `**/api/posts**`, `**/post**`, `**/article**` | Post Management | Create Post, Edit Post, Delete Post, View Posts, Like Post, Share Post |
| `**/api/comments**`, `**/comment**`, `**/reply**` | Comment System | Add Comment, Edit Comment, Delete Comment, View Comments, Reply |
| `**/api/payments**`, `**/payment**`, `**/checkout**` | Payment Processing | Make Payment, Process Refund, View History, Update Payment Method |
| `**/api/notifications**`, `**/notification**` | Notification System | Send Notification, View Notifications, Mark as Read, Settings |
| `**/components/auth**` | Login/Signup UI | Display Forms, Handle Validation, Show Errors |
| `**/hooks/useAuth**` | Authentication State | Check Login Status, Get User Info, Handle Logout |
| `**/prisma/schema**`, `**/migrations**` | Database Structure | All Database Operations, Queries, Mutations |
| `**/middleware/auth**` | Access Control | Check Permissions, Protect Routes, Validate Tokens |

**Content-Based Feature Detection**:

Scan file contents for keywords to detect additional features:

| Keywords | Feature | User Actions |
|----------|---------|--------------|
| `login`, `signin`, `authenticate` | Authentication & Login | Login, Logout, Session Management |
| `profile`, `avatar`, `bio` | User Profile Management | View Profile, Edit Profile, Upload Avatar |
| `post`, `article`, `content` | Post Management | Create, Edit, Delete, View Posts |
| `comment`, `reply` | Comment System | Add, Edit, Delete Comments |
| `payment`, `checkout`, `stripe`, `paypal` | Payment Processing | Make Payment, Process Refund |
| `search`, `filter`, `query` | Search & Filter | Search Content, Apply Filters, Sort Results |
| `upload`, `file`, `image` | File Upload | Upload File, Delete File, View Files |
| `email`, `send mail` | Email System | Send Email, Email Verification |

**Generate Feature Impact Map**:
- List all detected features
- Map user actions to each feature
- Create impact scenarios: "When user tries to [action], [potential impact]"

### Step 3: Find Dependencies & Affected Files

**Automated Dependency Analysis** (using helper script):

If helper script available, run comprehensive analysis:
```bash
.agent/skills/impact-analysis/scripts/find-dependencies.sh <file>
```

**Manual Dependency Analysis** (fallback):

For each changed file, find:
1. **Direct imports**: Files that import the changed file
   ```bash
   grep -r "from.*<filename>" src/
   grep -r "import.*<filename>" src/
   ```

2. **Function/Class usage**: Files that call functions or use classes from changed file
   ```bash
   grep -r "<function-name>\|<class-name>" src/
   ```

3. **API consumers**: If API changed, find frontend components calling it
   ```bash
   grep -r "fetch.*<api-endpoint>" src/
   grep -r "axios.*<api-endpoint>" src/
   ```

4. **Component usage**: If component changed, find parent components
   ```bash
   grep -r "<ComponentName>" src/
   ```

**Count Affected Files**:
- Total affected files
- Breakdown by category (backend/frontend/tests)
- Highlight high-impact files (used in many places)

### Step 4: Identify Edge Cases

**Automated Edge Case Detection**:

**Option 1: Use Helper Scripts** (if available):
```bash
node .agent/skills/impact-analysis/scripts/ast-analyze.js <file>
node .agent/skills/impact-analysis/scripts/calculate-risk.js
```

**Option 2: Manual Detection** (fallback):

Scan changed files for common issues:

1. **Null/Undefined Handling**:
   ```bash
   # Find property access without optional chaining
   grep -E "\.[a-zA-Z]+" <file> | grep -v "?\."
   ```
   - Issue: Potential null pointer errors
   - Action: Add null checks or optional chaining

2. **Error Handling**:
   ```bash
   # Find async calls without try-catch
   grep -E "await|fetch|axios" <file>
   grep -E "try\s*\{" <file>
   ```
   - Issue: Missing error handling
   - Action: Add try-catch blocks

3. **Boundary Conditions**:
   - Array access without length check
   - Division without zero check
   - String operations without empty check

4. **Race Conditions**:
   - Multiple async operations without proper sequencing
   - State updates without locks/mutexes
   - Concurrent API calls

**Categorize by Severity**:
- **Critical**: Will cause crashes or data loss
- **Important**: Will cause incorrect behavior
- **Minor**: Edge cases that rarely occur

### Step 5: Cross-Reference with Spec (if available)

**If spec context loaded in Step 0**:

**Requirements Coverage**:
- Map changed files to requirement IDs
- Check if all requirements are implemented
- Identify partially implemented requirements
- Flag missing implementations

**Design Compliance**:
- Verify API endpoints match design
- Check database schema matches design
- Validate component structure follows design
- Note any deviations

**Task Completion**:
- Check task status in `tasks.md`
- Count completed vs pending tasks
- Identify blocked tasks
- Calculate completion percentage

**Output**:
```markdown
## Requirements Coverage
- FR-1: User Login ✅ Implemented
- FR-2: Password Reset ✅ Implemented
- FR-3: 2FA ⚠️ Partially implemented

## Design Compliance
- API endpoints: ✅ Match design
- Database schema: ✅ Match design
- Component structure: ⚠️ Deviation detected

## Task Status
- Completed: 8/10 tasks (80%)
- Pending: Task #9, Task #10
```

### Step 6: Generate Test Scenarios

**Scenario Generation Strategy**:

For each affected feature and user action, generate:

1. **Happy Path Scenarios**:
   ```markdown
   Given: [precondition]
   When: [user action]
   Then: [expected result]
   And: [additional verification]
   ```

2. **Error Handling Scenarios**:
   ```markdown
   Given: [precondition]
   When: [user action with invalid input]
   Then: [error message shown]
   And: [system remains stable]
   ```

3. **Edge Case Scenarios**:
   ```markdown
   Given: [edge case condition]
   When: [user action]
   Then: [graceful handling]
   ```

4. **Regression Scenarios**:
   ```markdown
   Given: [existing functionality]
   When: [user performs old action]
   Then: [still works as before]
   ```

**Prioritize Scenarios**:
- **Critical**: Must test before deployment
- **Important**: Should test before PR
- **Nice to have**: Test if time permits

### Step 7: Assess Regression Risks

**Automated Risk Assessment** (if helper script available):

```bash
node .agent/skills/impact-analysis/scripts/calculate-risk.js

# Output includes:
# - Risk score (0-25)
# - Risk level (CRITICAL/HIGH/MEDIUM/LOW)
# - Risk breakdown by factors
# - Actionable recommendations with time estimates
```

**Manual Risk Assessment** (fallback):

Categorize changes by risk level:

**High Risk**:
- Database schema changes
- Authentication/authorization changes
- Payment processing changes
- API contract changes (breaking)
- Core business logic modifications

**Medium Risk**:
- UI component refactoring
- New features with existing integrations
- Configuration changes
- Dependency updates

**Low Risk**:
- Documentation updates
- Code formatting
- Minor UI tweaks
- Test additions

**For Each Risk Area**:
- Identify what could break
- List affected user workflows
- Suggest mitigation strategies

### Step 8: Create Comprehensive Report

**Generate Report Structure**:

```markdown
# Impact Analysis Report - {Feature Name}

**Generated**: {timestamp}
**Feature**: {feature-name}
**Branch**: {current-branch}
**Commits**: {commit-count}

---

## 📋 Executive Summary

- **Files Changed**: {count}
- **Features Affected**: {count}
- **User Scenarios**: {count}
- **Edge Cases**: {count}
- **Risk Level**: {HIGH/MEDIUM/LOW}
- **Estimated Test Time**: {estimate}

{If spec available:}
- **Requirements Coverage**: {percentage}%
- **Tasks Completed**: {completed}/{total}
- **Design Compliance**: {status}

---

## 🔍 Change Analysis

### Files Changed ({count})

**Backend** ({count} files):
- {list of backend files}

**Frontend** ({count} files):
- {list of frontend files}

**Database** ({count} files):
- {list of database files}

**Config** ({count} files):
- {list of config files}

---

## 🎯 Feature Impact Map

### Feature 1: {Feature Name}

**User Actions Affected**:
- {action 1}
- {action 2}
- {action 3}

**Impact Level**: {HIGH/MEDIUM/LOW}

**Details**: {explanation of impact}

### Feature 2: {Feature Name}
...

---

## 🎬 Impact Scenarios

### Scenario 1: {Action Name}
- **When user tries to**: {action}
- **Potential impact**: {description}
- **Required action**: {test instruction}
- **Priority**: {CRITICAL/IMPORTANT/MINOR}

### Scenario 2: {Action Name}
...

---

## 🔗 Dependencies & Affected Files

### Direct Dependencies ({count})
- {file 1} → {affected by changes in file X}
- {file 2} → {affected by changes in file Y}

### Integration Points ({count})
- {component A} calls {API endpoint B}
- {page X} uses {component Y}

---

## ⚠️ Edge Cases Detected

### Critical ({count})
1. **{Issue Title}**
   - **Location**: {file:line}
   - **Issue**: {description}
   - **Impact**: {what could go wrong}
   - **Action**: {how to fix}

### Important ({count})
...

### Minor ({count})
...

---

{If spec available:}
## 📊 Spec Cross-Reference

### Requirements Coverage
- FR-1: {requirement} ✅ Implemented
- FR-2: {requirement} ⚠️ Partially implemented
- FR-3: {requirement} ❌ Not implemented

### Design Compliance
- API Endpoints: {status}
- Database Schema: {status}
- Component Structure: {status}

### Task Completion
- Completed: {count}/{total} ({percentage}%)
- Pending: {list}
- Blocked: {list}

---

## 🧪 Test Scenarios

### Critical Scenarios (Must Test)

#### Scenario 1: {Name}
```gherkin
Given: {precondition}
When: {action}
Then: {expected result}
And: {verification}
```

**Priority**: CRITICAL
**Estimated Time**: {minutes}

#### Scenario 2: {Name}
...

### Important Scenarios (Should Test)
...

### Regression Scenarios (Verify Old Functionality)
...

---

## 🎯 Regression Risk Assessment

### High Risk Areas
1. **{Area Name}**
   - **Why**: {reason}
   - **Impact**: {what could break}
   - **Mitigation**: {how to prevent}

### Medium Risk Areas
...

### Low Risk Areas
...

---

## 💡 Recommendations

### Before Testing
- [ ] {recommendation 1}
- [ ] {recommendation 2}
- [ ] {recommendation 3}

### Testing Checklist
- [ ] Test all {count} critical scenarios
- [ ] Verify {count} edge cases fixed
- [ ] Run regression tests
- [ ] Test on multiple devices/browsers
- [ ] Performance testing (if applicable)

### Before Deployment
- [ ] Update documentation
- [ ] Notify stakeholders
- [ ] Prepare rollback plan
- [ ] Monitor metrics post-deployment

---

## 🚀 Next Steps

1. **Review this report** - Understand all impacts
2. **Fix critical edge cases** - Address {count} critical issues
3. **Run test scenarios** - Execute all critical tests
4. **Re-run analysis** - Verify fixes with `/impact-analysis {feature-name}`
5. **Proceed to testing** - Run `/test`
6. **Code review** - Run `/review`
7. **Commit & PR** - Create pull request with this report attached

---

**Report saved to**: `.specs/impact-reports/{feature-name}-{timestamp}.md`
```

**Save Report**:
- Create `.specs/impact-reports/` directory if not exists
- Save report as `{feature-name}-{timestamp}.md`
- Create symlink `latest.md` pointing to this report

</instructions>

## Tool Guidance

**Read Operations**:
- Load spec context first (if feature name provided)
- Read all relevant spec files (spec.json, requirements.md, design.md, tasks.md)
- Use Grep for dependency analysis and keyword detection

**Bash Operations**:
- Use git commands for change detection
- Use grep for pattern matching and content scanning
- Use find for file discovery

**Analysis Strategy**:
- Start broad (all changes) then narrow down (specific impacts)
- Cross-reference with spec when available
- Prioritize by risk and user impact

**Output**:
- Generate comprehensive markdown report
- Save to `.specs/impact-reports/`
- Display summary in terminal

## Output Description

**Terminal Output** (concise summary):

```markdown
✅ Impact Analysis Complete

**Feature**: {feature-name}
**Files Changed**: {count}
**Features Affected**: {count}
**User Scenarios**: {count}
**Edge Cases**: {count} ({critical} critical)
**Risk Level**: {HIGH/MEDIUM/LOW}

{If spec available:}
**Requirements Coverage**: {percentage}%
**Tasks Completed**: {completed}/{total}

📄 **Full Report**: `.specs/impact-reports/{feature-name}-{timestamp}.md`

🚀 **Next Steps**:
1. Review report and fix {count} critical edge cases
2. Run `/test` to execute test scenarios
3. Run `/review` for code quality check
```

**Report File**: Comprehensive markdown report saved to `.specs/impact-reports/`

## Safety & Fallback

### Error Scenarios

**No Changes Detected**:
- **Message**: "No changes detected. Check git status or specify files."
- **Suggested Action**: "Ensure you have uncommitted changes or specify feature name"

**Feature Not Found**:
- **Message**: "Feature '{name}' not found in .specs/"
- **Suggested Action**: "Continue with standalone analysis (no spec context)"
- **Proceed**: Analyze changes without spec cross-reference

**Git Not Available**:
- **Message**: "Git not available. Cannot detect changes."
- **Suggested Action**: "Ensure git is installed and repository is initialized"
- **Fallback**: Ask user to specify files manually

**No Spec Context**:
- **Warning**: "No spec context available. Analysis will be standalone."
- **Proceed**: Continue without requirements/design/tasks cross-reference
- **Note**: Report will not include spec-related sections

### Next Phase

**After Impact Analysis**:
1. **Review Report**: Read full report at `.specs/impact-reports/latest.md`
2. **Fix Critical Issues**: Address all critical edge cases
3. **Run Tests**: Execute `/test` with generated scenarios
4. **Code Review**: Run `/review` for quality check
5. **Re-analyze** (optional): Run `/impact-analysis` again to verify fixes
6. **Commit**: Create commit with report attached to PR

**Workflow Integration**:
```
/code {feature-name}
  ↓ (implement all tasks)
/impact-analysis {feature-name}
  ↓ (review report, fix issues)
/test
  ↓
/review
  ↓
Commit & PR
```

## Examples

### Example 1: Feature-Based Analysis

```bash
# After completing user-authentication feature
/impact-analysis user-authentication

# Output:
# - Analyzes all changes for the feature
# - Cross-references with spec
# - Maps to Authentication & Login feature
# - Lists 5 user actions affected
# - Identifies 3 critical edge cases
# - Generates 12 test scenarios
# - Report saved to .specs/impact-reports/user-authentication-20260320.md
```

### Example 2: Uncommitted Changes

```bash
# Quick analysis of current work
/impact-analysis

# Output:
# - Analyzes uncommitted changes only
# - No spec context (standalone)
# - Maps to affected features
# - Identifies edge cases
# - Generates test scenarios
```

### Example 3: Branch-Based Analysis

```bash
# Analyze all changes in feature branch
/impact-analysis --from main

# Output:
# - Compares current branch with main
# - Analyzes all differences
# - Comprehensive impact report
```

## Best Practices

1. **Run After Feature Completion**: Use after implementing all tasks, not after each small change
2. **Review Report Thoroughly**: Don't skip edge cases and test scenarios
3. **Fix Critical Issues First**: Address all critical edge cases before testing
4. **Attach to PR**: Include report in pull request description
5. **Re-run After Fixes**: Verify fixes by running analysis again
6. **Use with Spec**: Always provide feature name for spec cross-reference
7. **Test All Scenarios**: Execute all critical test scenarios before deployment

---

**Preferred workflow**: `/spec-init` → `/spec-requirements` → `/spec-design` → `/spec-validate` → `/spec-tasks` → `/code` → `/impact-analysis` → `/test` → `/review`
