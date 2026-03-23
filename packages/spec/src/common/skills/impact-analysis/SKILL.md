---
name: impact-analysis
description: "Phân tích tác động code changes và tạo test scenarios. Sử dụng sau khi sửa code, trước commit, hoặc khi cần kiểm tra regression. Tự động phát hiện affected files, dependencies, edge cases."
argument-hint: "[files] OR auto"
version: 1.0.0
---

# Impact Analysis - Phân Tích Tác Động & Test Guidance

Phân tích tác động của code changes và đưa ra hướng dẫn test chi tiết để tránh regression bugs.

## Arguments

- **Default (no args)**: Phân tích git diff gần nhất
- **`auto`**: Tự động phát hiện changes và phân tích
- **`{files}`**: Phân tích files cụ thể (comma-separated)

## Khi Nào Sử Dụng

✅ **Nên dùng:**
- Sau khi sửa code, trước khi commit
- Trước khi tạo Pull Request
- Sau khi fix bug (đảm bảo không tạo bug mới)
- Khi refactor code (verify không phá functionality)
- Khi thêm feature mới (tìm integration points)

❌ **Không cần:**
- Chỉ sửa documentation
- Chỉ sửa comments
- Thay đổi config không ảnh hưởng logic

## Quick Start

```bash
# Phân tích changes gần nhất
/impact-analysis

# Tự động detect và phân tích
/impact-analysis auto

# Phân tích files cụ thể
/impact-analysis src/api/auth.ts,src/components/Login.tsx
```

## Workflow

### 0. Auto-Detect Project Type (NEW)

Load `references/project-detection.md` để:
- Tự động detect project type (React Native, Next.js, Node.js API, etc.)
- Load appropriate profile với patterns và edge cases
- Check for custom config file (`impact-analysis.config.js`)
- Merge custom config với default profile

### 1. Detect Changes

Load `references/change-detection.md` để:
- Phát hiện files đã thay đổi (git diff)
- Phân loại thay đổi (backend/frontend/database)
- Đánh giá mức độ risk

### 2. Scout Dependencies

Load `references/dependency-scouting.md` để:
- Tìm files import/sử dụng code đã sửa
- Phát hiện reverse dependencies
- Xác định integration points

**Advanced**: Load `references/industry-techniques.md` để:
- Sử dụng Call Graph Analysis (Technique #2)
- Sử dụng Dependency Graph tools
- Áp dụng AST-based analysis (Technique #3) cho semantic changes

### 3. Identify Edge Cases

Load `references/edge-case-identification.md` để:
- Phân tích data flow
- Tìm boundary conditions
- Xác định error scenarios
- Phát hiện race conditions

**Advanced**: Load `references/industry-techniques.md` để:
- Sử dụng Static Analysis (Technique #4) cho data/control flow
- Sử dụng Type Analysis cho type compatibility
- Áp dụng Test-Based Analysis (Technique #6) cho coverage mapping

### 4. Generate Test Scenarios

Load `references/test-scenario-generation.md` để:
- Tạo happy path scenarios
- Tạo error handling scenarios
- Tạo integration test scenarios
- Tạo regression test checklist

### 5. Create Report

Load `references/report-template.md` để:
- Tổng hợp findings
- Đánh giá risk
- Đưa ra recommendations
- Tạo actionable checklist

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
- `references/industry-techniques.md` - 9 techniques từ industry & research
- `references/practical-techniques-guide.md` - Detailed implementation guide
- `references/react-native-customization.md` - React Native specific guide

### Scripts
- `scripts/README.md` - Helper scripts documentation
- `scripts/ast-analyze.js` - AST-based analysis
- `scripts/find-dependencies.sh` - Dependency analysis
- `scripts/calculate-risk.js` - Risk scoring
- `scripts/run-analysis.sh` - Master script

## Advanced Techniques

Skill này hỗ trợ advanced analysis techniques từ industry:

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

1. **Run early** - Phân tích ngay sau khi code, không đợi đến commit
2. **Focus on risk** - Ưu tiên high-risk changes
3. **Automate** - Integrate vào workflow tự động (pre-commit, CI/CD)
4. **Document** - Lưu findings để reference sau
5. **Verify** - Luôn chạy tests sau khi có scenarios
6. **Use scripts** - Leverage advanced techniques cho deep analysis

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

**Q: Không detect được changes?**
A: Check git status, đảm bảo có staged/committed changes

**Q: Quá nhiều affected files?**
A: Sử dụng `--scope` để giới hạn phạm vi

**Q: Test scenarios không đủ?**
A: Load `edge-case-identification.md` và review manual
