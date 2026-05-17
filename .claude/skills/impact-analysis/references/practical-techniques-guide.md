# Practical Techniques Guide - Hướng Dẫn Áp Dụng Thực Tế

Hướng dẫn chi tiết cách áp dụng các industry techniques vào Impact Analysis.

## 📋 Overview

Document này cung cấp:
- Scripts và commands thực tế cho từng technique
- Ví dụ cụ thể cho từng loại project
- Integration với existing workflow
- Troubleshooting và best practices

---

## 🎯 Technique #1: Dependency Analysis (MUST HAVE)

### Purpose
Find all files affected by code changes.

### Tools & Commands

#### JavaScript/TypeScript Projects

**1. Find Direct Imports**
```bash
# Find files importing modified module
grep -r "from.*authService" src/ --include="*.ts" --include="*.tsx"
grep -r "import.*authService" src/ --include="*.ts" --include="*.tsx"

# Hoặc dùng ripgrep (nhanh hơn)
rg "from.*authService" src/ -t ts -t tsx
```

**2. Find Function Calls**
```bash
# Find files calling modified function
grep -r "login\(" src/ --include="*.ts" --include="*.tsx"

# Exclude test files
grep -r "login\(" src/ --include="*.ts" --include="*.tsx" --exclude="*.test.*"
```

**3. Build Dependency Graph**
```bash
# Install madge
npm install -g madge

# Generate dependency graph
madge --image graph.png src/

# Find circular dependencies
madge --circular src/

# Show dependencies for specific file
madge src/services/authService.ts
```

**4. Find API Consumers**
```bash
# Find frontend components calling API
grep -r "fetch.*\/api\/auth" src/
grep -r "axios.*\/api\/auth" src/
grep -r "\/api\/auth" src/ --include="*.ts" --include="*.tsx"
```

#### React/React Native Projects

**Find Component Usage**
```bash
# Find components using modified component
grep -r "<LoginButton" src/ --include="*.tsx"
grep -r "LoginButton" src/ --include="*.tsx" | grep "import"
```

#### Python Projects

```bash
# Find imports
grep -r "from.*auth_service" . --include="*.py"
grep -r "import auth_service" . --include="*.py"

# Find function calls
grep -r "login(" . --include="*.py"
```

### Output Format

```markdown
## 🔗 Dependencies & Affected Files

### Direct Imports (5 files)
- `src/screens/Auth/LoginScreen.tsx` → imports `authService`
- `src/hooks/useAuth.ts` → imports `authService`
- `src/api/client.ts` → imports `authService`
- `src/utils/session.ts` → imports `authService`
- `src/services/userService.ts` → imports `authService`

### Function Calls (8 locations)
- `src/screens/Auth/LoginScreen.tsx:45` → calls `login()`
- `src/screens/Auth/SignupScreen.tsx:67` → calls `login()`
- `src/hooks/useAuth.ts:23` → calls `login()`
- ...

### API Consumers (3 components)
- `src/screens/Profile/ProfileScreen.tsx` → calls `/api/auth/me`
- `src/components/Header.tsx` → calls `/api/auth/logout`
- `src/screens/Settings/SettingsScreen.tsx` → calls `/api/auth/change-password`
```

---

## 🎯 Technique #2: AST-Based Analysis (NICE TO HAVE)

### Purpose
Detect semantic changes (function signature, type changes, breaking changes).

### Tools & Setup

#### JavaScript/TypeScript

**Install Dependencies**
```bash
npm install --save-dev @babel/parser @babel/traverse
# Or
npm install --save-dev typescript
```

**Script: Detect Function Signature Changes**

Create `scripts/ast-analyze.js`:

```javascript
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function analyzeFunctionSignatures(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });
  
  const functions = [];
  
  traverse(ast, {
    FunctionDeclaration(path) {
      functions.push({
        name: path.node.id.name,
        params: path.node.params.length,
        async: path.node.async,
        line: path.node.loc.start.line
      });
    },
    ArrowFunctionExpression(path) {
      if (path.parent.type === 'VariableDeclarator') {
        functions.push({
          name: path.parent.id.name,
          params: path.node.params.length,
          async: path.node.async,
          line: path.node.loc.start.line
        });
      }
    }
  });
  
  return functions;
}

// Usage
const file = process.argv[2];
const functions = analyzeFunctionSignatures(file);
console.log(JSON.stringify(functions, null, 2));
```

**Usage**
```bash
node scripts/ast-analyze.js src/services/authService.ts
```

**Compare Before/After**
```bash
# Analyze before
git show HEAD~1:src/services/authService.ts > /tmp/before.ts
node scripts/ast-analyze.js /tmp/before.ts > /tmp/before.json

# Analyze after
node scripts/ast-analyze.js src/services/authService.ts > /tmp/after.json

# Compare
diff /tmp/before.json /tmp/after.json
```

### Output Format

```markdown
## 🔍 Semantic Changes Detected (AST Analysis)

### Function Signature Changes

**1. `login()` - BREAKING CHANGE**
- **Before**: `login(email, password)` (2 params)
- **After**: `login(email, password, rememberMe)` (3 params)
- **Impact**: All 8 callers need update
- **Files affected**: [list]

**2. `validateUser()` - Non-breaking**
- **Before**: `validateUser(email)` (1 param)
- **After**: `validateUser(email, options = {})` (2 params, optional)
- **Impact**: Backward compatible, no changes needed

### Type Changes

**1. `User` interface - BREAKING CHANGE**
- **Added fields**: `biometricEnabled: boolean`
- **Impact**: Serialization/deserialization affected
- **Files affected**: [list]
```

---

## 🎯 Technique #3: Static Analysis (NICE TO HAVE)

### Purpose
Detect code quality issues, security issues, and potential bugs.

### Tools

#### ESLint (JavaScript/TypeScript)

```bash
# Run ESLint on changed files
eslint src/services/authService.ts --format json > eslint-report.json

# Check specific rules
eslint src/ --rule 'no-console: error' --rule 'no-unused-vars: error'
```

#### TypeScript Compiler

```bash
# Type check
tsc --noEmit

# Type check specific file
tsc --noEmit src/services/authService.ts

# Get diagnostics
tsc --noEmit --pretty false 2>&1 | grep "error TS"
```

#### SonarQube (Advanced)

```bash
# Run SonarQube scanner
sonar-scanner \
  -Dsonar.projectKey=my-project \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000
```

### Output Format

```markdown
## 🔍 Static Analysis Results

### Type Errors (3)
1. **src/services/authService.ts:45**
   - Error: Property 'biometricEnabled' does not exist on type 'User'
   - Fix: Add field to User interface

2. **src/hooks/useAuth.ts:23**
   - Error: Argument of type 'string' is not assignable to parameter of type 'User'
   - Fix: Update function call

### Code Quality Issues (5)
1. **Unused variable** - `src/services/authService.ts:67`
2. **Missing error handling** - `src/services/authService.ts:89`
3. **Console.log in production** - `src/services/authService.ts:102`
```

---

## 🎯 Technique #4: Test Coverage Analysis (SHOULD HAVE)

### Purpose
Find affected tests and identify untested code.

### Tools & Commands

#### Jest (JavaScript/TypeScript)

**1. Find Related Tests**
```bash
# Find tests covering changed files
jest --findRelatedTests src/services/authService.ts

# Run with coverage
jest --coverage --collectCoverageFrom="src/services/authService.ts"
```

**2. Generate Coverage Report**
```bash
# HTML report
jest --coverage --coverageReporters=html

# JSON report
jest --coverage --coverageReporters=json

# View report
open coverage/index.html
```

**3. Coverage Thresholds**
```bash
# Check if coverage meets threshold
jest --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80}}'
```

#### Python (pytest + coverage)

```bash
# Run tests with coverage
pytest --cov=src/services --cov-report=html

# Find tests for specific file
pytest --collect-only | grep auth_service
```

### Output Format

```markdown
## 🧪 Test Coverage Analysis

### Affected Tests (12 tests)

**Unit Tests** (5 tests)
- `authService.test.ts` - 8 tests
  - ✅ login() with valid credentials
  - ✅ login() with invalid credentials
  - ✅ logout()
  - ❌ login() with biometric (NEW - not covered)
  - ❌ biometric permission handling (NEW - not covered)

**Integration Tests** (4 tests)
- `auth.integration.test.ts` - 4 tests
  - ✅ Full login flow
  - ✅ Session persistence
  - ❌ Biometric login flow (NEW - not covered)

**E2E Tests** (3 tests)
- `e2e/auth.spec.ts` - 3 tests
  - ✅ User can login
  - ✅ User can logout
  - ❌ User can login with biometric (NEW - not covered)

### Coverage Gaps

**Uncovered Lines** (45 lines)
- `src/services/authService.ts:89-102` - Biometric authentication logic
- `src/services/authService.ts:145-156` - Permission handling
- `src/utils/biometric/biometricHelper.ts:23-67` - Entire file

**Coverage**: 67% (target: 80%)
**Action**: Add 8 new tests to reach 80%
```

---

## 🎯 Technique #5: Feature Mapping (MUST HAVE)

### Purpose
Map code changes to features and user actions.

### Implementation

**Pattern-Based Mapping**

Create `scripts/map-features.js`:

```javascript
const featurePatterns = {
  'Authentication & Login': {
    patterns: [
      '**/api/auth**',
      '**/auth**',
      '**/login**',
      '**/services/auth*'
    ],
    keywords: ['login', 'signin', 'authenticate', 'token', 'session'],
    userActions: [
      'Login',
      'Logout',
      'Sign Up',
      'Password Reset',
      'Session Management',
      '2FA',
      'Biometric Authentication'
    ]
  },
  'User Profile Management': {
    patterns: [
      '**/api/users**',
      '**/user**',
      '**/profile**'
    ],
    keywords: ['profile', 'avatar', 'bio', 'settings'],
    userActions: [
      'View Profile',
      'Edit Profile',
      'Upload Avatar',
      'Change Settings',
      'Update Bio'
    ]
  },
  // ... more features
};

function mapFeatures(changedFiles) {
  const affectedFeatures = [];
  
  for (const [featureName, config] of Object.entries(featurePatterns)) {
    const matched = changedFiles.some(file => 
      config.patterns.some(pattern => 
        minimatch(file, pattern)
      )
    );
    
    if (matched) {
      affectedFeatures.push({
        name: featureName,
        userActions: config.userActions,
        files: changedFiles.filter(file =>
          config.patterns.some(pattern => minimatch(file, pattern))
        )
      });
    }
  }
  
  return affectedFeatures;
}
```

### Output Format

```markdown
## 🎯 Feature Impact Map

### Feature 1: Authentication & Login (HIGH IMPACT)

**Files Changed** (3):
- src/services/authService.ts
- src/utils/biometric/biometricHelper.ts
- src/screens/Auth/LoginScreen.tsx

**User Actions Affected** (7):
- ✓ Login (modified)
- ✓ Logout (no change)
- ✓ Sign Up (no change)
- ✓ Password Reset (no change)
- ✓ Session Management (modified)
- ✓ 2FA (no change)
- 🆕 Biometric Authentication (NEW)

**Impact Scenarios**:
1. **When user tries to login**
   - Can now use biometric (Face ID/Touch ID)
   - Password login still works
   - Session storage changed (may need re-login)

2. **When user opens app**
   - May see biometric prompt
   - May need to re-login after update
```

---

## 🎯 Technique #6: Risk Scoring (SHOULD HAVE)

### Purpose
Assess risk level of changes.

### Algorithm

```javascript
function calculateRiskScore(changes) {
  let score = 0;
  
  // File type risk
  if (changes.database.length > 0) score += 5; // Database changes = high risk
  if (changes.api.length > 0) score += 3; // API changes = medium risk
  if (changes.frontend.length > 0) score += 1; // Frontend = low risk
  
  // Change size risk
  const totalLines = changes.linesAdded + changes.linesRemoved;
  if (totalLines > 500) score += 3;
  else if (totalLines > 200) score += 2;
  else if (totalLines > 50) score += 1;
  
  // Dependency risk
  const affectedFiles = changes.dependencies.length;
  if (affectedFiles > 20) score += 3;
  else if (affectedFiles > 10) score += 2;
  else if (affectedFiles > 5) score += 1;
  
  // Feature risk
  const criticalFeatures = ['auth', 'payment', 'security'];
  const hasCritical = changes.features.some(f => 
    criticalFeatures.some(cf => f.toLowerCase().includes(cf))
  );
  if (hasCritical) score += 5;
  
  // Breaking changes
  if (changes.breakingChanges > 0) score += 5;
  
  // Test coverage
  if (changes.testCoverage < 50) score += 2;
  else if (changes.testCoverage < 70) score += 1;
  
  return {
    score,
    level: score >= 15 ? 'CRITICAL' : score >= 10 ? 'HIGH' : score >= 5 ? 'MEDIUM' : 'LOW'
  };
}
```

### Output Format

```markdown
## 🎯 Risk Assessment

**Risk Score**: 18/25
**Risk Level**: CRITICAL ⚠️⚠️⚠️

### Risk Breakdown

| Factor | Score | Reason |
|--------|-------|--------|
| Database Changes | 5 | Schema migration required |
| API Changes | 3 | Breaking changes in auth API |
| Change Size | 2 | 250 lines changed |
| Dependencies | 2 | 12 files affected |
| Critical Feature | 5 | Authentication system |
| Breaking Changes | 5 | Function signature changed |
| Test Coverage | 0 | 75% coverage (good) |

### Mitigation Recommendations

1. **Database Migration**
   - Create rollback script
   - Test migration on staging
   - Backup production data

2. **Breaking Changes**
   - Update all 8 callers
   - Add deprecation warnings
   - Document migration guide

3. **Testing**
   - Add 8 new test scenarios
   - Run full regression suite
   - Test on multiple devices
```

---

## 🔄 Integration với Workflow

### Step-by-Step Integration

**1. Detect Changes** (existing)
```bash
git diff HEAD --name-only
```

**2. Dependency Analysis** (NEW - Technique #1)
```bash
# For each changed file
for file in $(git diff HEAD --name-only); do
  echo "=== Dependencies for $file ==="
  grep -r "from.*$(basename $file .ts)" src/
done
```

**3. AST Analysis** (NEW - Technique #2)
```bash
# Analyze function signatures
node scripts/ast-analyze.js src/services/authService.ts
```

**4. Feature Mapping** (NEW - Technique #5)
```bash
# Map to features
node scripts/map-features.js $(git diff HEAD --name-only)
```

**5. Test Coverage** (NEW - Technique #4)
```bash
# Find related tests
jest --findRelatedTests $(git diff HEAD --name-only | grep -E '\.(ts|tsx)$')
```

**6. Risk Scoring** (NEW - Technique #6)
```bash
# Calculate risk
node scripts/calculate-risk.js
```

**7. Generate Report** (existing)
```bash
# Combine all findings into report
```

---

## 📊 Complete Example

### Scenario: Added Biometric Authentication

**Input**:
```bash
/impact-analysis biometric-auth
```

**Execution**:

```bash
# 1. Detect changes
git diff feature/biometric-auth --name-only
# Output: 5 files changed

# 2. Dependency analysis
grep -r "from.*authService" src/
# Output: 12 files import authService

# 3. AST analysis
node scripts/ast-analyze.js src/services/authService.ts
# Output: login() signature changed (2 → 3 params)

# 4. Feature mapping
node scripts/map-features.js
# Output: Authentication & Login feature affected

# 5. Test coverage
jest --findRelatedTests src/services/authService.ts
# Output: 8 tests found, 3 new scenarios needed

# 6. Risk scoring
node scripts/calculate-risk.js
# Output: Risk = HIGH (score: 18)
```

**Output Report**: See `impact-analysis-output-example.md`

---

## 🛠️ Helper Scripts

### Create All Helper Scripts

```bash
# Create scripts directory
mkdir -p scripts/impact-analysis

# Create scripts
touch scripts/impact-analysis/ast-analyze.js
touch scripts/impact-analysis/map-features.js
touch scripts/impact-analysis/calculate-risk.js
touch scripts/impact-analysis/find-dependencies.sh
touch scripts/impact-analysis/analyze-coverage.sh
```

### Master Script

Create `scripts/impact-analysis/run-all.sh`:

```bash
#!/bin/bash

echo "🔍 Running Impact Analysis..."

# 1. Detect changes
echo "📝 Detecting changes..."
CHANGED_FILES=$(git diff HEAD --name-only)
echo "$CHANGED_FILES"

# 2. Find dependencies
echo "🔗 Finding dependencies..."
./scripts/impact-analysis/find-dependencies.sh "$CHANGED_FILES"

# 3. AST analysis
echo "🌳 Running AST analysis..."
for file in $CHANGED_FILES; do
  if [[ $file == *.ts ]] || [[ $file == *.tsx ]]; then
    node scripts/impact-analysis/ast-analyze.js "$file"
  fi
done

# 4. Feature mapping
echo "🎯 Mapping features..."
node scripts/impact-analysis/map-features.js "$CHANGED_FILES"

# 5. Test coverage
echo "🧪 Analyzing test coverage..."
./scripts/impact-analysis/analyze-coverage.sh "$CHANGED_FILES"

# 6. Risk scoring
echo "⚠️ Calculating risk..."
node scripts/impact-analysis/calculate-risk.js

echo "✅ Analysis complete!"
```

---

## 💡 Best Practices

### 1. Start Simple
- Begin với Dependency Analysis (Technique #1)
- Add Feature Mapping (Technique #5)
- Gradually add advanced techniques

### 2. Automate
- Create helper scripts
- Integrate vào CI/CD
- Run on pre-commit hook

### 3. Customize
- Adjust patterns cho project
- Tune risk scoring thresholds
- Add project-specific checks

### 4. Iterate
- Review findings
- Improve detection logic
- Add missing patterns

---

## 🚀 Next Steps

1. ✅ Read this guide
2. ⚠️ Create helper scripts
3. ✅ Test on sample changes
4. ✅ Integrate vào workflow
5. ✅ Customize cho project

---

**Estimated setup time**: 2-3 hours
**Estimated time saved per analysis**: 30-60 minutes
**ROI**: High (prevents regression bugs)
