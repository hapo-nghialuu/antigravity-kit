# Report Template - Impact Analysis Report Template

Standard template for impact analysis reports and test guidance.

## Full Report Template

```markdown
# Impact Analysis Report
**Date:** {YYYY-MM-DD HH:mm}
**Analyst:** {Agent/User Name}
**Branch:** {git-branch}
**Commit:** {commit-hash}

---

## 📋 Executive Summary

**Overview:**
{Brief description of changes - 2-3 sentences}

**Key Metrics:**
- **Files Changed:** {count} files
- **Lines Changed:** +{added} -{deleted}
- **Affected Components:** {count} components
- **Risk Level:** {Low/Medium/High/Critical}
- **Estimated Test Time:** {duration}
- **Recommended Actions:** {count} items

**Quick Assessment:**
{One paragraph summary of impact and recommendations}

---

## 🔍 Changed Files Analysis

### Backend Changes ({count} files)

#### {File 1}
- **Path:** `{full-path}`
- **Type:** {API/Service/Controller/Utility}
- **Changes:** {Brief description}
- **LOC:** +{added} -{deleted}
- **Risk:** {Low/Medium/High}
- **Reason:** {Why this risk level}

**Key Changes:**
- {Change 1}
- {Change 2}

**Potential Issues:**
- {Issue 1}
- {Issue 2}

---

#### {File 2}
...

### Frontend Changes ({count} files)

#### {File 1}
- **Path:** `{full-path}`
- **Type:** {Component/Hook/Page/Utility}
- **Changes:** {Brief description}
- **LOC:** +{added} -{deleted}
- **Risk:** {Low/Medium/High}

**Key Changes:**
- {Change 1}

**UI Impact:**
- {Impact 1}

---

### Database Changes ({count} files)

#### {File 1}
- **Path:** `{full-path}`
- **Type:** {Schema/Migration/Seed}
- **Changes:** {Brief description}
- **Risk:** {Critical/High/Medium}

**Schema Changes:**
- {Table/Column changes}

**Migration Required:** {Yes/No}

---

### Configuration Changes ({count} files)

#### {File 1}
- **Path:** `{full-path}`
- **Type:** {Env/Config/Dependencies}
- **Changes:** {Brief description}
- **Risk:** {Low/Medium/High}

---

## 🔗 Dependency Analysis

### Direct Dependencies
**Files that changed code imports/uses:**

| File | Imports | Risk | Notes |
|------|---------|------|-------|
| `{file-path}` | {module-list} | {risk} | {notes} |

### Reverse Dependencies
**Files that will be affected by changes:**

| Affected File | Uses | Impact | Reason |
|---------------|------|--------|--------|
| `{file-path}` | {function/class} | {High/Medium/Low} | {explanation} |

**Total Affected:** {count} files

### Integration Points

#### API Endpoints
| Endpoint | Method | Changed | Consumers |
|----------|--------|---------|-----------|
| `{path}` | {GET/POST/etc} | {Yes/No} | {count} files |

**Details:**
- `{endpoint}`: {description}
  - Consumers: `{file1}`, `{file2}`
  - Breaking change: {Yes/No}
  - Migration needed: {Yes/No}

#### Database Tables
| Table | Columns Changed | Queries Affected |
|-------|----------------|------------------|
| `{table}` | {columns} | {count} |

#### Event Handlers
| Event | Changed | Listeners |
|-------|---------|-----------|
| `{event-name}` | {Yes/No} | {count} |

#### State Management
| Store/Context | Changed | Consumers |
|---------------|---------|-----------|
| `{store-name}` | {Yes/No} | {count} |

---

## ⚠️ Edge Cases Identified

### Critical Issues ({count})

#### 1. {Issue Title}
- **Category:** {Data Flow/Boundary/Error/Race Condition}
- **Location:** `{file}:{line}`
- **Severity:** Critical
- **Description:** {Detailed description}
- **Impact:** {What could go wrong}
- **Recommendation:** {How to fix}

**Example:**
```typescript
// Current code (problematic)
{code-snippet}

// Recommended fix
{fixed-code-snippet}
```

---

### High Priority Issues ({count})

#### 1. {Issue Title}
- **Category:** {category}
- **Location:** `{file}:{line}`
- **Severity:** High
- **Description:** {description}
- **Recommendation:** {fix}

---

### Medium Priority Issues ({count})

#### 1. {Issue Title}
- **Category:** {category}
- **Severity:** Medium
- **Description:** {description}
- **Recommendation:** {fix}

---

### Edge Case Checklist

#### Data Flow
- [ ] Null/undefined handling verified
- [ ] Empty collections handled
- [ ] Type coercion checked
- [ ] Default values provided

#### Boundaries
- [ ] String length limits validated
- [ ] Numeric ranges checked
- [ ] Date/time edge cases handled
- [ ] Unicode/emoji support verified

#### Errors
- [ ] Network failures handled
- [ ] Database errors caught
- [ ] Permission checks in place
- [ ] Validation errors clear

#### Concurrency
- [ ] Race conditions prevented
- [ ] Atomic operations used
- [ ] State mutations safe
- [ ] Idempotency ensured

#### Integration
- [ ] API contracts maintained
- [ ] Event handlers cleaned up
- [ ] Dependencies updated
- [ ] Backward compatibility checked

---

## 🧪 Test Scenarios

### Priority 0: Critical ({count} scenarios)

#### Scenario 1: {Title}
**Objective:** {What we're testing}

**Preconditions:**
- {Condition 1}
- {Condition 2}

**Test Steps:**
1. {Step 1}
2. {Step 2}
3. {Step 3}

**Expected Results:**
- {Result 1}
- {Result 2}

**Edge Cases to Check:**
- {Edge case 1}
- {Edge case 2}

**Affected Components:**
- `{component-1}`
- `{component-2}`

**Automated:** {Yes/No}
**Estimated Time:** {duration}

---

### Priority 1: High ({count} scenarios)

#### Scenario 1: {Title}
{Same structure as above}

---

### Priority 2: Medium ({count} scenarios)

#### Scenario 1: {Title}
{Same structure as above}

---

### Priority 3: Low ({count} scenarios)

#### Scenario 1: {Title}
{Same structure as above}

---

## ✅ Test Execution Checklist

### Pre-Test Setup
- [ ] Pull latest code
- [ ] Install dependencies: `npm install`
- [ ] Run database migrations: `npm run migrate`
- [ ] Seed test data: `npm run seed:test`
- [ ] Start development server: `npm run dev`

### Unit Tests
- [ ] Run all tests: `npm test`
- [ ] Run changed files only: `npm test -- {files}`
- [ ] Check coverage: `npm run test:coverage`
- [ ] Coverage threshold met: {Yes/No} ({percentage}%)

**Results:**
- Total: {count} tests
- Passed: {count}
- Failed: {count}
- Skipped: {count}

**Failed Tests:**
- {test-name}: {reason}

### Integration Tests
- [ ] API endpoint tests: `npm run test:api`
- [ ] Database integration: `npm run test:db`
- [ ] Authentication flow: `npm run test:auth`

**Results:**
- {summary}

### UI Tests (if applicable)
- [ ] Visual regression: Screenshot comparison
- [ ] Responsive design: Mobile/Tablet/Desktop
- [ ] Accessibility: ARIA, keyboard navigation
- [ ] Browser compatibility: Chrome/Firefox/Safari

**Tools:**
- [ ] Playwright/Cypress tests
- [ ] Chrome DevTools MCP
- [ ] Manual testing

### Manual Testing Checklist

#### Feature: {Feature Name}
- [ ] Happy path works
- [ ] Error handling works
- [ ] Edge case 1: {description}
- [ ] Edge case 2: {description}
- [ ] Performance acceptable
- [ ] No console errors

#### Regression Testing
- [ ] {Existing feature 1} still works
- [ ] {Existing feature 2} still works
- [ ] {Existing feature 3} still works

### Performance Testing
- [ ] API response time < {threshold}ms
- [ ] Page load time < {threshold}s
- [ ] No memory leaks detected
- [ ] Database query performance acceptable

---

## 🎯 Recommended Actions

### Immediate (Do Before Commit)

#### Priority 0: Critical
1. **{Action 1}**
   - **Why:** {Reason}
   - **How:** {Steps}
   - **Time:** {estimate}

2. **{Action 2}**
   - **Why:** {Reason}
   - **How:** {Steps}
   - **Time:** {estimate}

### Short Term (Do Before PR)

#### Priority 1: High
1. **{Action 1}**
   - **Why:** {Reason}
   - **Impact:** {What happens if not done}
   - **Time:** {estimate}

### Medium Term (Do Before Release)

#### Priority 2: Medium
1. **{Action 1}**
   - **Why:** {Reason}
   - **Time:** {estimate}

### Long Term (Technical Debt)

#### Priority 3: Low
1. **{Action 1}**
   - **Why:** {Reason}
   - **Time:** {estimate}

---

## 📊 Risk Assessment

### Overall Risk: {Low/Medium/High/Critical}

**Risk Factors:**

| Factor | Score (1-5) | Weight | Total | Notes |
|--------|-------------|--------|-------|-------|
| Security Impact | {score} | 5 | {total} | {notes} |
| Data Loss Risk | {score} | 5 | {total} | {notes} |
| User Impact | {score} | 3 | {total} | {notes} |
| Business Impact | {score} | 2 | {total} | {notes} |
| Complexity | {score} | 1 | {total} | {notes} |

**Total Risk Score:** {sum} / 80

**Risk Level Calculation:**
- 0-20: Low
- 21-40: Medium
- 41-60: High
- 61-80: Critical

### Risk Breakdown

#### Security Risks
- {Risk 1}: {description}
- {Risk 2}: {description}

**Mitigation:**
- {Strategy 1}
- {Strategy 2}

#### Data Integrity Risks
- {Risk 1}: {description}

**Mitigation:**
- {Strategy 1}

#### Performance Risks
- {Risk 1}: {description}

**Mitigation:**
- {Strategy 1}

#### Integration Risks
- {Risk 1}: {description}

**Mitigation:**
- {Strategy 1}

---

## 🔄 Regression Prevention

### Features to Verify

| Feature | Test Method | Status | Notes |
|---------|-------------|--------|-------|
| {Feature 1} | {Manual/Automated} | {Pass/Fail/Pending} | {notes} |
| {Feature 2} | {Manual/Automated} | {Pass/Fail/Pending} | {notes} |

### Automated Regression Tests

**Command:** `{test-command}`

**Expected:** All tests pass

**Results:**
- {summary}

### Manual Regression Checklist

- [ ] {Feature 1}: {specific check}
- [ ] {Feature 2}: {specific check}
- [ ] {Feature 3}: {specific check}

---

## 📈 Metrics & Statistics

### Code Metrics
- **Total Files Changed:** {count}
- **Total LOC Changed:** {count}
- **Files Added:** {count}
- **Files Deleted:** {count}
- **Files Modified:** {count}

### Test Metrics
- **Test Scenarios Created:** {count}
- **Automated Tests:** {count}
- **Manual Tests:** {count}
- **Estimated Test Time:** {duration}
- **Test Coverage:** {percentage}%

### Impact Metrics
- **Components Affected:** {count}
- **API Endpoints Affected:** {count}
- **Database Tables Affected:** {count}
- **Edge Cases Identified:** {count}

### Risk Metrics
- **Critical Issues:** {count}
- **High Priority Issues:** {count}
- **Medium Priority Issues:** {count}
- **Low Priority Issues:** {count}
- **Overall Risk Score:** {score}/80

---

## 📝 Additional Notes

### Assumptions Made
- {Assumption 1}
- {Assumption 2}

### Limitations
- {Limitation 1}
- {Limitation 2}

### Future Considerations
- {Consideration 1}
- {Consideration 2}

---

## ❓ Unresolved Questions

1. **{Question 1}**
   - **Context:** {Why this is unclear}
   - **Impact:** {What depends on this}
   - **Action:** {Who should answer}

2. **{Question 2}**
   - **Context:** {context}
   - **Impact:** {impact}
   - **Action:** {action}

---

## 📎 Appendices

### Appendix A: Git Diff Summary
```bash
{git diff --stat output}
```

### Appendix B: Dependency Graph
```
{ASCII dependency tree}
```

### Appendix C: Test Data
```json
{test-data.json}
```

### Appendix D: Related Documents
- [Original Plan]({link})
- [API Documentation]({link})
- [Architecture Diagram]({link})

---

**Report Generated:** {timestamp}
**Tool Version:** impact-analyzer v1.0.0
**Next Review:** {date}
```

## Compact Report Template (For Quick Reviews)

```markdown
# Impact Analysis - Quick Report

**Changes:** {count} files | **Risk:** {level} | **Test Time:** {duration}

## Changed
{file-list}

## Affected
{affected-component-list}

## Edge Cases
{critical-issues-only}

## Test Scenarios
{priority-0-and-1-only}

## Actions
{immediate-actions-only}

## Questions
{unresolved-questions}
```

## Report Sections Guide

### When to Include Each Section

| Section | Always | High Risk | Complex | Simple |
|---------|--------|-----------|---------|--------|
| Executive Summary | ✅ | ✅ | ✅ | ✅ |
| Changed Files | ✅ | ✅ | ✅ | ✅ |
| Dependencies | ✅ | ✅ | ✅ | Optional |
| Edge Cases | ✅ | ✅ | ✅ | If found |
| Test Scenarios | ✅ | ✅ | ✅ | ✅ |
| Test Checklist | ✅ | ✅ | ✅ | ✅ |
| Recommended Actions | ✅ | ✅ | ✅ | ✅ |
| Risk Assessment | Optional | ✅ | ✅ | Optional |
| Regression Prevention | ✅ | ✅ | ✅ | Optional |
| Metrics | Optional | ✅ | Optional | No |
| Appendices | Optional | ✅ | Optional | No |

## Output Naming

Use pattern from hooks: `impact-analysis-{date}-{slug}.md`

**Examples:**
- `impact-analysis-251218-1430-auth-refactor.md`
- `impact-analysis-251218-1445-GH-123-user-api.md`
