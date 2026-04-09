# Impact Analysis Scripts

Helper scripts for performing advanced impact analysis techniques.

## 📋 Overview

These scripts implement industry techniques from `references/industry-techniques.md`:

1. **ast-analyze.js** - AST-based analysis (Technique #3)
2. **find-dependencies.sh** - Dependency analysis (Technique #2)
3. **calculate-risk.js** - Risk scoring (Technique #6)
4. **run-analysis.sh** - Master script that runs all

## 🚀 Quick Start

### Prerequisites

```bash
# For AST analysis (optional)
npm install --save-dev @babel/parser @babel/traverse

# For all scripts
chmod +x scripts/*.sh
```

### Run Complete Analysis

```bash
# Analyze uncommitted changes
./scripts/run-analysis.sh

# Analyze specific files
./scripts/run-analysis.sh --files "src/services/authService.ts,src/components/Login.tsx"

# Custom output file
./scripts/run-analysis.sh --output my-report.md
```

## 📚 Individual Scripts

### 1. AST Analysis

Phân tích function signatures, type changes, breaking changes.

**Usage:**
```bash
# Analyze single file
node scripts/ast-analyze.js src/services/authService.ts

# Compare before/after
git show HEAD~1:src/services/authService.ts > /tmp/before.ts
node scripts/ast-analyze.js src/services/authService.ts --compare /tmp/before.ts
```

**Output:**
```
📊 AST Analysis Results

File: src/services/authService.ts

📈 Summary:
  Functions: 8 (5 exported, 3 async)
  Classes: 2
  Interfaces: 3
  Types: 1

🔧 Functions:
  📤 async login(email, password) - line 23
  📤 async logout() - line 45
  📤 validateUser(email) - line 67
  ...

🔍 Changes Detected

⚠️  Functions Modified (BREAKING):
  ~ login
    Before: email, password
    After:  email, password, rememberMe
    Reason: Parameter count changed: 2 → 3
```

**Features:**
- Detect function signature changes
- Detect interface/type changes
- Identify breaking changes
- Compare before/after versions

### 2. Dependency Analysis

Tìm tất cả files bị ảnh hưởng bởi code changes.

**Usage:**
```bash
# Analyze dependencies for a file
./scripts/find-dependencies.sh src/services/authService.ts

# Set custom source directory
SRC_DIR=app ./scripts/find-dependencies.sh src/services/authService.ts
```

**Output:**
```
🔍 Finding dependencies for: src/services/authService.ts

📦 Direct Imports:
Files that import this module:

  - src/screens/Auth/LoginScreen.tsx
  - src/hooks/useAuth.ts
  - src/api/client.ts
  ...

🔧 Function/Class Usage:
  Searching for: login
    - src/screens/Auth/LoginScreen.tsx
    - src/screens/Auth/SignupScreen.tsx
    ...

🌐 API Endpoint Usage:
  Endpoint: /api/auth/login
    - src/screens/Auth/LoginScreen.tsx
    ...

⚛️  Component Usage:
  - src/screens/Home/HomeScreen.tsx
  ...

🧪 Related Tests:
  - src/services/__tests__/authService.test.ts
  ...

📊 Summary:
  Direct imports: 12
  Related tests: 3

💡 Recommendations:
  ⚠️  HIGH IMPACT: This file is imported by many files (12)
     → Test thoroughly before deploying
     → Consider backward compatibility
```

**Features:**
- Find direct imports
- Find function/class usage
- Find API endpoint consumers
- Find component usage
- Find related tests
- Provide recommendations

### 3. Risk Calculation

Đánh giá mức độ risk của code changes.

**Usage:**
```bash
# Calculate risk for uncommitted changes
node scripts/calculate-risk.js

# Calculate risk for specific files
node scripts/calculate-risk.js --files "file1.ts,file2.ts"

# JSON output
node scripts/calculate-risk.js --json
```

**Output:**
```
🎯 Risk Assessment Report

════════════════════════════════════════════════════════════

📊 Risk Score: 18/25
🎚️  Risk Level: ⚠️⚠️ HIGH

📋 Summary:
  Files changed: 5
  Lines changed: 250 (+180, -70)
  Dependencies: 12 files affected
  Breaking changes: 2

📁 File Classification:
  🔴 auth: 2 file(s)
     - src/services/authService.ts
     - src/utils/biometric/biometricHelper.ts
  🟡 api: 1 file(s)
     - src/api/auth.ts
  🟢 frontend: 2 file(s)
     - src/screens/Auth/LoginScreen.tsx
     - src/components/LoginButton.tsx

⚖️  Risk Breakdown:
  • 2 auth file(s) changed
    Points: 10 (weight: 5)
  • 250 lines changed (large)
    Points: 2 (weight: 2)
  • 12 files depend on changes (some)
    Points: 2 (weight: 2)
  • 2 potential breaking change(s)
    Points: 4 (weight: 2)

⚠️  Potential Breaking Changes:
  1. src/services/authService.ts
     Type: function_signature
     Function signature may have changed

  2. src/api/auth.ts
     Type: api_endpoint
     API endpoint may have changed

💡 Recommendations:
  🔴 [CRITICAL] Extensive testing required
     Run full test suite including integration and E2E tests
  🔴 [CRITICAL] Code review required
     Get at least 2 senior developers to review changes
  🔴 [CRITICAL] Security review
     Review authentication flow and test all auth scenarios
  🟡 [HIGH] Update all consumers
     Update 12 files that depend on changed code

════════════════════════════════════════════════════════════
```

**Features:**
- File type risk scoring
- Change size risk scoring
- Dependency risk scoring
- Breaking change detection
- Actionable recommendations

**Risk Levels:**
- **CRITICAL** (≥15): Extensive testing, multiple reviews required
- **HIGH** (≥10): Thorough testing, code review required
- **MEDIUM** (≥5): Standard testing, review recommended
- **LOW** (<5): Basic testing sufficient

### 4. Master Script

Chạy tất cả analysis techniques và tạo comprehensive report.

**Usage:**
```bash
# Run complete analysis
./scripts/run-analysis.sh

# Analyze specific files
./scripts/run-analysis.sh --files "file1.ts,file2.ts"

# Custom output
./scripts/run-analysis.sh --output my-report.md
```

**Output:**
- Comprehensive markdown report
- Includes all analysis results
- Actionable recommendations
- Testing checklist

**Report Sections:**
1. Change Detection
2. Risk Assessment
3. Dependency Analysis
4. AST Analysis (semantic changes)
5. Test Coverage Analysis
6. Feature Impact Map
7. Recommendations
8. Summary

## 🔧 Configuration

### Environment Variables

```bash
# Source directory (default: src)
export SRC_DIR=app

# Output file (default: impact-analysis-report.md)
export OUTPUT_FILE=my-report.md
```

### Risk Scoring Configuration

Edit `calculate-risk.js` to customize risk weights:

```javascript
const RISK_CONFIG = {
  fileTypes: {
    database: 5,      // High risk
    api: 3,           // Medium risk
    frontend: 1,      // Low risk
    // ... customize
  },
  
  changeSize: {
    huge: { threshold: 500, weight: 3 },
    large: { threshold: 200, weight: 2 },
    // ... customize
  },
  
  levels: {
    critical: { threshold: 15 },
    high: { threshold: 10 },
    // ... customize
  }
};
```

## 📊 Integration Examples

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running impact analysis..."
./scripts/run-analysis.sh --output .git/impact-report.md

# Show summary
echo ""
echo "Impact Analysis Summary:"
node scripts/calculate-risk.js

# Ask for confirmation if high risk
RISK_LEVEL=$(node scripts/calculate-risk.js --json | jq -r '.risk.level')
if [ "$RISK_LEVEL" = "HIGH" ] || [ "$RISK_LEVEL" = "CRITICAL" ]; then
  echo ""
  echo "⚠️  HIGH RISK changes detected!"
  read -p "Continue with commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

### CI/CD Pipeline

```yaml
# .github/workflows/impact-analysis.yml
name: Impact Analysis

on: [pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install --save-dev @babel/parser @babel/traverse
      
      - name: Run Impact Analysis
        run: |
          chmod +x scripts/*.sh
          ./scripts/run-analysis.sh --output impact-report.md
      
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('impact-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
      
      - name: Check Risk Level
        run: |
          RISK_LEVEL=$(node scripts/calculate-risk.js --json | jq -r '.risk.level')
          echo "Risk Level: $RISK_LEVEL"
          if [ "$RISK_LEVEL" = "CRITICAL" ]; then
            echo "::error::CRITICAL risk level detected"
            exit 1
          fi
```

### VS Code Task

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Impact Analysis",
      "type": "shell",
      "command": "./scripts/run-analysis.sh",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Quick Risk Check",
      "type": "shell",
      "command": "node scripts/calculate-risk.js",
      "problemMatcher": []
    }
  ]
}
```

## 🐛 Troubleshooting

### AST Analysis Fails

**Problem**: `Cannot find module '@babel/parser'`

**Solution**:
```bash
npm install --save-dev @babel/parser @babel/traverse
```

### Dependency Analysis Returns Empty

**Problem**: No dependencies found

**Solutions**:
1. Check source directory: `SRC_DIR=app ./scripts/find-dependencies.sh file.ts`
2. Ensure file exists and has correct path
3. Check if files use ES6 imports (not CommonJS require)

### Risk Calculation Shows Wrong Level

**Problem**: Risk level doesn't match expectations

**Solution**: Customize risk weights in `calculate-risk.js`:
```javascript
const RISK_CONFIG = {
  fileTypes: {
    // Increase weight for critical files
    auth: 10,  // was 5
    payment: 10  // was 5
  }
};
```

### Git Commands Fail

**Problem**: `fatal: not a git repository`

**Solution**: Ensure you're in a git repository or use `--files` flag:
```bash
./scripts/run-analysis.sh --files "file1.ts,file2.ts"
```

## 📚 Further Reading

- `references/industry-techniques.md` - Industry techniques overview
- `references/practical-techniques-guide.md` - Detailed usage guide
- `references/project-detection.md` - Project-specific customization

## 🤝 Contributing

To add new analysis techniques:

1. Create new script in `scripts/`
2. Add to `run-analysis.sh`
3. Update this README
4. Add tests if applicable

## 📝 License

Part of CafeKit Impact Analysis skill.
