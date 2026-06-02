# Industry Techniques - Code Change Impact Analysis

Compilation of techniques and tools for analyzing code change impacts from industry and research.

## 📚 References

Based on research and industry best practices from:
- Academic papers (ACM, ResearchGate, arXiv)
- Static analysis tools (NDepend, CppDepend, SonarQube)
- Software engineering practices
- Open source tools

---

## 🎯 Main Methods

### 1. Traceability-Based Impact Analysis

**Concept:**
Use links between requirements, specifications, design elements, and tests to determine scope of changes.

**How it works:**
```
Requirement → Design → Code → Tests
     ↓           ↓        ↓       ↓
  Change    → Impact → Affected → Test Cases
```

**Application in Impact Analysis:**
- Map code changes to requirements
- Identify affected user stories
- Generate test scenarios từ requirements

**Ví dụ:**
```javascript
// Requirement: FR-1 - User can login with biometric
// Design: Add BiometricHelper module
// Code: src/utils/biometric/biometricHelper.ts
// Tests: Test biometric authentication flow

// Khi sửa biometricHelper.ts:
// → Affected requirement: FR-1
// → Affected user story: "As a user, I want to login with Face ID"
// → Test scenarios: Biometric login happy path, error cases
```

**Tools:**
- JIRA (requirement tracking)
- Azure DevOps (work item linking)
- Custom traceability matrices

---

### 2. Dependency-Based Impact Analysis

**Concept:**
Analyze dependencies (imports, function calls, class usage) to find affected files.

**How it works:**

#### A. Call Graph Analysis
```
Function A calls Function B
Function B calls Function C
→ Change in C affects B and A
```

**Ví dụ:**
```typescript
// authService.ts
export function login(email, password) {
  const user = validateUser(email, password); // calls validateUser
  return generateToken(user); // calls generateToken
}

// Khi sửa validateUser():
// → Affected: login() function
// → Affected: All callers of login()
// → Test: Login flow, validation logic
```

#### B. Dependency Graph
```
Module A imports Module B
Module B imports Module C
→ Change in C may affect A through B
```

**Tools:**
- **NDepend** (.NET): Dependency matrix, metrics
- **CppDepend** (C++): Call graphs, architecture validation
- **Madge** (JavaScript): Circular dependency detection
- **jdeps** (Java): Package dependencies

**Application:**
```bash
# Find all files importing authService
grep -r "from.*authService" src/

# Find all function calls to login()
grep -r "login(" src/

# Build dependency graph
madge --image graph.png src/
```

---

### 3. AST-Based Impact Analysis

**Concept:**
Use Abstract Syntax Tree to analyze code structure and detect changes at semantic level.

**How it works:**
```
Source Code → Parser → AST → Analysis → Impact Report
```

**AST Nodes:**
- Function declarations
- Class definitions
- Import statements
- Function calls
- Variable assignments

**Ví dụ:**
```javascript
// Before AST:
function login(email, password) {
  return authenticate(email, password);
}

// After change:
function login(email, password, rememberMe) {
  return authenticate(email, password, rememberMe);
}

// AST Analysis detects:
// - Function signature changed (new parameter)
// - All callers need update
// - Breaking change detected
```

**Tools:**
- **Babel** (JavaScript): AST transformation
- **TypeScript Compiler API**: Type-aware AST
- **Python ast module**: Python AST analysis
- **Roslyn** (.NET): C# AST analysis

**Application:**
```javascript
# Detect function signature changes
const ast = parse(sourceCode);
ast.body.forEach(node => {
  if (node.type === 'FunctionDeclaration') {
    const params = node.params.length;
    // Check if params changed
  }
});
```

---

### 4. Static Analysis-Based Impact

**Concept:**
Analyze code without executing to detect issues, dependencies, and potential impacts.

**Techniques:**

#### A. Data Flow Analysis
Track how data flows through the program:
```
Input → Function A → Function B → Output
```

**Ví dụ:**
```typescript
// Data flow:
const email = getUserInput(); // Source
const validated = validateEmail(email); // Transform
const user = findUser(validated); // Use
const token = generateToken(user); // Output

// Change in validateEmail():
// → Affects: findUser, generateToken
// → Test: Email validation, user lookup
```

#### B. Control Flow Analysis
Track execution paths:
```
if (condition) {
  path A
} else {
  path B
}
```

**Ví dụ:**
```typescript
function login(email, password) {
  if (isBiometricEnabled()) {
    return biometricLogin(); // Path A
  } else {
    return passwordLogin(email, password); // Path B
  }
}

// Change in biometricLogin():
// → Affects: Path A only
// → Test: Biometric enabled scenario
```

#### C. Type Analysis
Track type changes and compatibility:
```typescript
// Before:
interface User {
  id: string;
  name: string;
}

// After:
interface User {
  id: string;
  name: string;
  email: string; // New field
}

// Impact:
// - All User consumers may need update
// - Serialization/deserialization affected
// - Database schema may need migration
```

**Tools:**
- **SonarQube**: Code quality, security
- **ESLint**: JavaScript linting
- **Pylint**: Python static analysis
- **Checkstyle**: Java code style

---

### 5. Model-Based Impact Analysis

**Concept:**
Use models (UML, architecture diagrams) to predict impact before coding.

**How it works:**
```
Architecture Model → Component Dependencies → Impact Prediction
```

**Ví dụ:**
```
[Frontend] → [API Gateway] → [Auth Service] → [Database]
                                    ↓
                              [User Service]

// Change in Auth Service:
// → Affects: API Gateway, User Service
// → May affect: Frontend (if API contract changes)
```

**Tools:**
- **Enterprise Architect**: UML modeling
- **ArchiMate**: Architecture modeling
- **C4 Model**: Software architecture diagrams

---

### 6. Test-Based Impact Analysis

**Concept:**
Use test coverage to identify affected tests and features.

**How it works:**
```
Code Change → Test Coverage Map → Affected Tests → Affected Features
```

**Ví dụ:**
```javascript
// authService.ts changed
// → Tests covering authService:
//   - authService.test.ts (unit tests)
//   - login.integration.test.ts (integration tests)
//   - e2e/auth.spec.ts (e2e tests)
// → Features tested:
//   - Login flow
//   - Token generation
//   - Session management
```

**Tools:**
- **Jest**: JavaScript test coverage
- **Coverage.py**: Python coverage
- **JaCoCo**: Java code coverage
- **Istanbul**: JavaScript coverage

**Application:**
```bash
# Run tests with coverage
npm test -- --coverage

# Find tests covering changed files
jest --findRelatedTests src/services/authService.ts

# Generate coverage report
jest --coverage --coverageReporters=html
```

---

### 7. Behavior-Driven Impact Analysis

**Concept:**
Map code changes to user behaviors and scenarios (BDD approach).

**How it works:**
```
Code Change → Feature Mapping → User Scenarios → Test Scenarios
```

**BDD Format:**
```gherkin
Feature: User Login
  Scenario: Login with biometric
    Given user has Face ID enabled
    When user taps "Login with Face ID"
    Then Face ID prompt appears
    And user is logged in after authentication
```

**Ví dụ:**
```typescript
// Changed: biometricHelper.ts

// Affected Feature: User Login
// Affected Scenarios:
// - Login with Face ID (iOS)
// - Login with Touch ID (iOS)
// - Login with Fingerprint (Android)
// - Biometric not enrolled
// - Permission denied

// Test Scenarios:
describe('Biometric Login', () => {
  it('should login with Face ID', async () => {
    // Given
    await enableBiometric();
    // When
    await tapLoginButton();
    // Then
    expect(faceIDPrompt).toBeVisible();
  });
});
```

**Tools:**
- **Cucumber**: BDD testing framework
- **SpecFlow** (.NET): BDD for .NET
- **Behave** (Python): BDD for Python

---

### 8. Feature Mapping Techniques

**Concept:**
Map code files to features and user actions.

**Techniques:**

#### A. Pattern-Based Mapping
```javascript
const featurePatterns = {
  'Authentication': [
    '**/auth/**',
    '**/login/**',
    '**/services/auth*'
  ],
  'User Profile': [
    '**/profile/**',
    '**/user/**'
  ]
};

// Match changed files to features
const changedFiles = ['src/services/authService.ts'];
const affectedFeatures = matchPatterns(changedFiles, featurePatterns);
// → ['Authentication']
```

#### B. Keyword-Based Mapping
```javascript
const featureKeywords = {
  'Authentication': ['login', 'signin', 'authenticate', 'token'],
  'Payment': ['payment', 'checkout', 'stripe', 'paypal']
};

// Scan file content for keywords
const content = readFile('src/services/authService.ts');
const affectedFeatures = matchKeywords(content, featureKeywords);
// → ['Authentication']
```

#### C. Annotation-Based Mapping
```typescript
/**
 * @feature Authentication
 * @userAction Login
 * @priority P0
 */
export function login(email: string, password: string) {
  // ...
}

// Parse annotations to map features
```

---

### 9. Machine Learning-Based Impact Analysis

**Concept:**
Use ML models to predict impact based on historical data.

**How it works:**
```
Historical Changes + Outcomes → ML Model → Predict Impact
```

**Ví dụ:**
```python
# Train model on historical data
features = [
  'files_changed',
  'lines_changed',
  'complexity',
  'dependencies_count'
]
labels = [
  'bugs_introduced',
  'tests_failed',
  'features_affected'
]

model = train_model(features, labels)

# Predict impact for new change
new_change = {
  'files_changed': 5,
  'lines_changed': 200,
  'complexity': 15,
  'dependencies_count': 8
}
predicted_impact = model.predict(new_change)
# → High risk, 3 features affected, 12 tests may fail
```

**Tools:**
- **GPT-based models**: Code understanding
- **CodeBERT**: Pre-trained model for code
- **GraphCodeBERT**: Graph-based code model

**Research:**
- "Using GPT for Code-change Impact Analysis" (arXiv 2024)
- "Enhancing Code Understanding with Transformers" (ACM 2024)

---

## 🛠️ Industry Tools

### Static Analysis Tools

| Tool | Language | Features | Use Case |
|------|----------|----------|----------|
| **NDepend** | .NET | Dependency matrix, metrics, trends | .NET projects |
| **CppDepend** | C++ | Call graphs, architecture validation | C++ projects |
| **SonarQube** | Multi | Code quality, security, coverage | All projects |
| **Understand** | Multi | Code visualization, metrics | Large codebases |
| **CodeScene** | Multi | Behavioral code analysis | Team analytics |

### Dependency Analysis Tools

| Tool | Language | Features |
|------|----------|----------|
| **Madge** | JavaScript | Dependency graphs, circular deps |
| **jdeps** | Java | Package dependencies |
| **pipdeptree** | Python | Package dependency tree |
| **cargo tree** | Rust | Dependency tree |

### AST Tools

| Tool | Language | Features |
|------|----------|----------|
| **Babel** | JavaScript | AST transformation |
| **TypeScript Compiler API** | TypeScript | Type-aware AST |
| **Roslyn** | C# | Compiler as a service |
| **Python ast** | Python | AST manipulation |

---

## 💡 Best Practices từ Industry

### 1. Combine Multiple Techniques

Không dùng một technique duy nhất, mà combine nhiều:

```
Dependency Analysis + AST Analysis + Test Coverage
→ Comprehensive Impact Report
```

### 2. Automate Impact Analysis

Integrate vào CI/CD pipeline:

```yaml
# .github/workflows/impact-analysis.yml
on: [pull_request]
jobs:
  impact-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Impact Analysis
        run: npm run impact-analysis
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: impactReport
            })
```

### 3. Focus on User Impact

Không chỉ technical impact, mà focus vào user impact:

```
Code Change → Feature Impact → User Action Impact → Test Scenarios
```

### 4. Prioritize by Risk

Use risk scoring:

```javascript
const riskScore = 
  (affectedUsers * 3) +
  (dataLossRisk * 5) +
  (securityRisk * 5) +
  (businessImpact * 2);

if (riskScore >= 15) return 'CRITICAL';
if (riskScore >= 10) return 'HIGH';
if (riskScore >= 5) return 'MEDIUM';
return 'LOW';
```

### 5. Generate Actionable Reports

Report phải actionable:

```markdown
## Vấn Đề Phát Hiện

**1. Thiếu Validate Kích Thước**
- Vấn đề: [description]
- Tác động: [impact]
- Cách sửa: [code example]
- Thời gian: 15 phút
```

---

## 🔬 Research Insights

### Key Findings từ Academic Research:

1. **Traceability IA** (Bohner & Arnold)
   - Links giữa requirements và code giúp predict impact chính xác hơn
   - Traceability matrix giảm 40% effort trong maintenance

2. **Model-Based IA** (Consensus Academic)
   - Model dependencies giúp discover critical components sớm
   - Speed up maintenance process 30-50%

3. **AST-Based Analysis** (ACM 2024)
   - Combining transformers với program dependence graphs
   - Improve accuracy 25% so với traditional methods

4. **Call Graph Analysis** (ResearchGate)
   - Call graphs fundamental cho inter-procedural analysis
   - Enable security analysis, dependency management, debloating

5. **GPT-Based Impact Analysis** (arXiv 2024)
   - LLMs có thể predict impact với 70-80% accuracy
   - Best khi combine với static analysis

---

## 📊 Comparison: Techniques

| Technique | Accuracy | Speed | Automation | Best For |
|-----------|----------|-------|------------|----------|
| Traceability | High | Slow | Medium | Requirements-driven |
| Dependency | High | Fast | High | Code-level impact |
| AST | Very High | Medium | High | Semantic changes |
| Static Analysis | High | Fast | High | Code quality |
| Model-Based | Medium | Fast | Medium | Architecture |
| Test-Based | High | Medium | High | Test coverage |
| BDD | Medium | Slow | Low | User scenarios |
| Feature Mapping | Medium | Fast | High | User impact |
| ML-Based | Medium | Fast | High | Prediction |

---

## 🎯 Recommendations cho Impact Analysis

### Minimum Viable Approach

1. **Dependency Analysis** (must have)
   - Find affected files
   - Build dependency graph

2. **Feature Mapping** (must have)
   - Map files to features
   - Identify user actions

3. **Test Coverage** (should have)
   - Find affected tests
   - Generate test scenarios

### Advanced Approach

4. **AST Analysis** (nice to have)
   - Detect semantic changes
   - Breaking change detection

5. **Static Analysis** (nice to have)
   - Code quality checks
   - Security analysis

6. **ML-Based Prediction** (future)
   - Predict risk
   - Suggest test scenarios

---

## 📚 Further Reading

### Papers
- "A survey of code-based change impact analysis techniques" (ResearchGate 2013)
- "Enhancing Code Understanding for Impact Analysis" (ACM 2024)
- "Using GPT for Code-change Impact Analysis" (arXiv 2024)

### Books
- "Software Change Impact Analysis" by Bohner & Arnold
- "Working Effectively with Legacy Code" by Michael Feathers

### Tools Documentation
- NDepend: https://www.ndepend.com/docs
- SonarQube: https://docs.sonarqube.org
- Madge: https://github.com/pahen/madge

### Online Resources
- AST Explorer: https://astexplorer.net
- Call Graph Visualization: https://github.com/jrfonseca/gprof2dot

---

## ✅ Integration với Impact Analysis Skill

Các techniques này đã được integrate vào skill:

1. ✅ **Dependency Analysis** - `dependency-scouting.md`
2. ✅ **Feature Mapping** - `project-detection.md`
3. ✅ **Test Scenarios** - `test-scenario-generation.md`
4. ✅ **Edge Cases** - `edge-case-identification.md`
5. ✅ **Change Detection** - `change-detection.md`

**Next steps:**
- [ ] Add AST-based analysis
- [ ] Add ML-based prediction
- [ ] Add automated risk scoring
- [ ] Add CI/CD integration examples

---

**Content rephrased for compliance with licensing restrictions. Original research and tool documentation available at cited sources.**
