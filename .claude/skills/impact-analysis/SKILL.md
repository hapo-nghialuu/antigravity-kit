---
name: impact-analysis
description: "Analyze code change impacts and generate test scenarios. Use after code changes, before commit, or when checking for regressions. Automatically detects affected files, dependencies, and edge cases."
argument-hint: "[files] OR auto"
version: 1.0.0
---

# Impact Analysis - Impact Analysis & Test Guidance

Analyze the impact of code changes and provide detailed test guidance to prevent regression bugs.

## Arguments

- **Default (no args)**: Analyze most recent git diff
- **`auto`**: Automatically detect changes and analyze
- **`{files}`**: Analyze specific files (comma-separated)

## When to Use

✅ **Should use:**
- After code changes, before commit
- Before creating Pull Request
- After fixing bugs (ensure no new bugs introduced)
- When refactoring code (verify functionality not broken)
- When adding new features (find integration points)

❌ **Not needed:**
- Only documentation changes
- Only comment changes
- Config changes that don't affect logic

## Quick Start

```bash
# Analyze most recent changes
/impact-analysis

# Auto-detect and analyze
/impact-analysis auto

# Analyze specific files
/impact-analysis src/api/auth.ts,src/components/Login.tsx
```

## Workflow

### 0. Auto-Detect Project Type (NEW)

Load `references/project-detection.md` to:
- Automatically detect project type (React Native, Next.js, Node.js API, etc.)
- Load appropriate profile with patterns and edge cases
- Check for custom config file (`impact-analysis.config.js`)
- Merge custom config with default profile

### 1. Detect Changes

Load `references/change-detection.md` to:
- Detect changed files (git diff)
- Classify changes (backend/frontend/database)
- Assess risk level

### 2. Inspect Dependencies

Load `references/dependency-scouting.md` to:
- Find files that import/use modified code
- Detect reverse dependencies
- Identify integration points

**Advanced**: Load `references/industry-techniques.md` to:
- Use Call Graph Analysis (Technique #2)
- Use Dependency Graph tools
- Apply AST-based analysis (Technique #3) for semantic changes

### 3. Identify Edge Cases

Load `references/edge-case-identification.md` to:
- Analyze data flow
- Find boundary conditions
- Identify error scenarios
- Detect race conditions

**Advanced**: Load `references/industry-techniques.md` to:
- Use Static Analysis (Technique #4) for data/control flow
- Use Type Analysis for type compatibility
- Apply Test-Based Analysis (Technique #6) for coverage mapping

### 4. Generate Test Scenarios

Load `references/test-scenario-generation.md` to:
- Create happy path scenarios
- Create error handling scenarios
- Create integration test scenarios
- Create regression test checklist

### 5. Create Report

Load `references/report-template.md` to:
- Consolidate findings
- Assess risk
- Provide recommendations
- Create actionable checklist

## Output

```markdown
# Impact Analysis Report

## 📋 Summary
- Changed: 3 files
- Affected: 12 components
- Risk: Medium
- Test Time: ~30 mins

## 🔍 Changes
{detailed analysis}

## 🔗 Dependencies
{affected files}

## ⚠️ Edge Cases
{identified issues}

## 🧪 Test Scenarios
{detailed scenarios}

## ✅ Checklist
{actionable items}
```

## Integration

### With Code Review

```
1. Make changes
2. /impact-analysis
3. Review findings
4. /review (includes impact report)
```

### With Testing

```
1. /impact-analysis
2. Get test scenarios
3. /test (execute scenarios)
4. Verify all pass
```

## References

### Core References
- `references/project-detection.md` - Auto-detect project type & load profile
- `references/change-detection.md` - Git diff analysis
- `references/dependency-scouting.md` - Finding affected files
- `references/edge-case-identification.md` - Edge case patterns
- `references/test-scenario-generation.md` - Test templates
- `references/report-template.md` - Output format

### Advanced References
- `references/industry-techniques.md` - 9 techniques from industry & research
- `references/practical-techniques-guide.md` - Detailed implementation guide
- `references/react-native-customization.md` - React Native specific guide

### Scripts
- `scripts/README.md` - Helper scripts documentation
- `scripts/ast-analyze.js` - AST-based analysis
- `scripts/find-dependencies.sh` - Dependency analysis
- `scripts/calculate-risk.js` - Risk scoring
- `scripts/run-analysis.sh` - Master script

## Advanced Techniques

This skill supports advanced analysis techniques from industry:

### Available Scripts

Located in `scripts/` directory:

1. **ast-analyze.js** - AST-based semantic analysis
   - Detect function signature changes
   - Identify breaking changes
   - Compare before/after versions

2. **find-dependencies.sh** - Comprehensive dependency analysis
   - Find all affected files
   - Map API consumers
   - Identify integration points

3. **calculate-risk.js** - Automated risk scoring
   - Multi-factor risk assessment
   - Actionable recommendations
   - JSON output for CI/CD

4. **run-analysis.sh** - Master script
   - Run all techniques
   - Generate comprehensive report
   - Markdown output

### Usage

```bash
# Quick risk check
node scripts/calculate-risk.js

# Full analysis
./scripts/run-analysis.sh

# Specific files
./scripts/run-analysis.sh --files "file1.ts,file2.ts"
```

See `scripts/README.md` for detailed documentation.

## Best Practices

1. **Run early** - Analyze immediately after coding, don't wait until commit
2. **Focus on risk** - Prioritize high-risk changes
3. **Automate** - Integrate into automated workflow (pre-commit, CI/CD)
4. **Document** - Save findings for future reference
5. **Verify** - Always run tests after generating scenarios
6. **Use scripts** - Leverage advanced techniques for deep analysis

## Examples

### Example 1: API Change

```bash
# Changed: src/api/users.ts (added new field)
/impact-analysis

# Output:
# - Affected: 5 frontend components using user data
# - Edge cases: Null handling, backward compatibility
# - Test: Verify old clients still work
```

### Example 2: Database Migration

```bash
# Changed: prisma/schema.prisma (renamed column)
/impact-analysis

# Output:
# - Affected: 15 queries using old column name
# - Edge cases: Migration rollback, data integrity
# - Test: Verify all queries updated
```

### Example 3: Component Refactor

```bash
# Changed: components/Button.tsx (props interface)
/impact-analysis

# Output:
# - Affected: 23 components using Button
# - Edge cases: TypeScript errors, missing props
# - Test: Visual regression, interaction tests
```

## Troubleshooting

**Q: Cannot detect changes?**
A: Check git status, ensure there are staged/committed changes

**Q: Too many affected files?**
A: Use `--scope` to limit scope

**Q: Test scenarios not sufficient?**
A: Load `edge-case-identification.md` and review manually
