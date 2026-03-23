# Test Scenario Generation - Tạo Test Scenarios

Templates và patterns để tạo comprehensive test scenarios từ impact analysis.

## Scenario Templates

### Template 1: Happy Path

```markdown
## Test Scenario: {Feature} - Happy Path

**Objective:** Verify {feature} works correctly under normal conditions

**Preconditions:**
- {Condition 1}
- {Condition 2}

**Test Steps:**
1. {Action 1}
2. {Action 2}
3. {Action 3}

**Expected Results:**
- {Result 1}
- {Result 2}
- {Result 3}

**Verification:**
- [ ] {Check 1}
- [ ] {Check 2}

**Affected Components:**
- {Component 1}
- {Component 2}
```

**Example:**
```markdown
## Test Scenario: User Login - Happy Path

**Objective:** Verify user can login with valid credentials

**Preconditions:**
- User exists in database
- User account is active
- Credentials are valid

**Test Steps:**
1. Navigate to /login
2. Enter email: test@example.com
3. Enter password: ValidPass123!
4. Click "Login" button
5. Wait for redirect

**Expected Results:**
- User redirected to /dashboard
- Auth token stored in localStorage
- User profile loaded in header
- Welcome message displayed

**Verification:**
- [ ] localStorage.getItem('token') returns valid JWT
- [ ] API call to /api/me succeeds
- [ ] User name displayed in header

**Affected Components:**
- src/components/LoginForm.tsx
- src/api/auth.ts
- src/hooks/useAuth.ts
```

### Template 2: Error Handling

```markdown
## Test Scenario: {Feature} - Error Case

**Objective:** Verify {feature} handles errors gracefully

**Preconditions:**
- {Setup error condition}

**Test Steps:**
1. {Trigger error}
2. {Observe behavior}

**Expected Results:**
- {Error message shown}
- {No crash/data loss}
- {Recovery possible}

**Edge Cases:**
- {Edge case 1}
- {Edge case 2}
```

**Example:**
```markdown
## Test Scenario: User Login - Invalid Credentials

**Objective:** Verify login handles invalid credentials correctly

**Preconditions:**
- User exists but password is wrong

**Test Steps:**
1. Navigate to /login
2. Enter email: test@example.com
3. Enter password: WrongPassword
4. Click "Login"

**Expected Results:**
- Error message: "Invalid email or password"
- No redirect occurs
- Form remains interactive
- No token stored
- Password field cleared

**Edge Cases:**
- Empty email/password
- SQL injection attempts: ' OR '1'='1
- Very long password (1000+ chars)
- Special characters in password
- Multiple failed attempts (rate limiting)

**Verification:**
- [ ] Error message visible
- [ ] localStorage.getItem('token') returns null
- [ ] Login button re-enabled after error
- [ ] No console errors
```

### Template 3: Integration Test

```markdown
## Test Scenario: {Feature A} → {Feature B} Integration

**Objective:** Verify {feature A} integrates correctly with {feature B}

**Preconditions:**
- {Both features working independently}

**Test Steps:**
1. {Use feature A}
2. {Transition to feature B}
3. {Verify data flow}

**Expected Results:**
- {Data passed correctly}
- {State synchronized}
- {No data loss}
```

**Example:**
```markdown
## Test Scenario: Login → Profile Update Integration

**Objective:** Verify auth token works across features

**Preconditions:**
- User logged in successfully
- Auth token valid

**Test Steps:**
1. Login with valid credentials
2. Navigate to /profile
3. Update profile information
4. Click "Save"
5. Verify update persisted

**Expected Results:**
- Profile API receives valid auth token
- Update succeeds with 200 status
- UI reflects changes immediately
- Success message displayed
- Changes persist after page refresh

**Edge Cases:**
- Token expires during update
- Network failure mid-update
- Concurrent profile updates
- Invalid data in update

**Verification:**
- [ ] Authorization header present in API call
- [ ] Token not expired
- [ ] Database updated correctly
- [ ] No race conditions
```

### Template 4: Regression Test

```markdown
## Test Scenario: {Existing Feature} - Regression Check

**Objective:** Verify {existing feature} still works after changes

**Preconditions:**
- {Feature worked before changes}

**Test Steps:**
1. {Original test steps}

**Expected Results:**
- {Same as before changes}

**Regression Risks:**
- {Risk 1}
- {Risk 2}
```

**Example:**
```markdown
## Test Scenario: User Registration - Regression Check

**Objective:** Verify registration still works after auth changes

**Preconditions:**
- Registration worked before auth refactor

**Test Steps:**
1. Navigate to /register
2. Fill registration form
3. Submit form
4. Verify account created

**Expected Results:**
- Account created in database
- Welcome email sent
- Auto-login after registration
- Redirect to onboarding

**Regression Risks:**
- Password hashing changed
- Email validation broken
- Auto-login token generation
- Database schema mismatch

**Verification:**
- [ ] User exists in database
- [ ] Password hashed correctly (bcrypt)
- [ ] Email sent (check logs)
- [ ] Token generated and valid
```

## Scenario Generation Process

### Step 1: Analyze Changed Code

```typescript
// Changed: src/api/auth.ts
export async function login(email: string, password: string) {
  // NEW: Added rate limiting
  await checkRateLimit(email);
  
  const user = await findUser(email);
  if (!user || !await verifyPassword(password, user.hash)) {
    throw new UnauthorizedError();
  }
  
  // NEW: Added refresh token
  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  
  return { accessToken, refreshToken };
}
```

### Step 2: Identify Test Areas

From changes above:
1. **New feature**: Rate limiting → Test rate limit enforcement
2. **New feature**: Refresh token → Test token refresh flow
3. **Existing**: Login logic → Regression test
4. **Integration**: Frontend using new tokens → Integration test

### Step 3: Generate Scenarios

```markdown
## Scenario 1: Rate Limiting (New Feature)
Test that rate limiting blocks excessive login attempts

## Scenario 2: Refresh Token (New Feature)
Test that refresh token can renew access token

## Scenario 3: Login Flow (Regression)
Test that existing login still works

## Scenario 4: Frontend Integration (Integration)
Test that frontend handles new token structure
```

## Scenario Prioritization

### Priority Matrix

| Priority | Criteria | Example |
|----------|----------|---------|
| **P0 (Critical)** | Security, data loss, payment | Auth bypass, data deletion |
| **P1 (High)** | Core functionality, user-facing | Login, checkout, search |
| **P2 (Medium)** | Secondary features, edge cases | Profile update, filters |
| **P3 (Low)** | Nice-to-have, cosmetic | Tooltips, animations |

### Risk-Based Prioritization

```javascript
function calculatePriority(scenario) {
  const riskScore = 
    (scenario.affectedUsers * 3) +
    (scenario.dataLossRisk * 5) +
    (scenario.securityRisk * 5) +
    (scenario.businessImpact * 2);
  
  if (riskScore >= 15) return 'P0';
  if (riskScore >= 10) return 'P1';
  if (riskScore >= 5) return 'P2';
  return 'P3';
}
```

## Test Data Preparation

### Test User Accounts

```typescript
const testUsers = {
  valid: {
    email: 'test@example.com',
    password: 'ValidPass123!',
    role: 'user'
  },
  admin: {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    role: 'admin'
  },
  inactive: {
    email: 'inactive@example.com',
    password: 'Pass123!',
    status: 'inactive'
  },
  deleted: {
    email: 'deleted@example.com',
    deleted: true
  }
};
```

### Edge Case Data

```typescript
const edgeCaseInputs = {
  emails: [
    '',                           // Empty
    'invalid',                    // No @
    'test@',                      // No domain
    '@example.com',               // No local
    'a'.repeat(300) + '@test.com', // Too long
    'test+tag@example.com',       // Plus addressing
    'test@subdomain.example.com', // Subdomain
  ],
  passwords: [
    '',                           // Empty
    'short',                      // Too short
    'a'.repeat(1000),            // Too long
    'NoNumbers!',                 // Missing numbers
    'nonumbers123',               // Missing special
    '12345678',                   // Only numbers
    'password',                   // Common password
  ]
};
```

## Automated Scenario Generation

```typescript
// generate-scenarios.ts
function generateScenarios(changedFiles: string[]) {
  const scenarios = [];
  
  for (const file of changedFiles) {
    // Happy path
    scenarios.push({
      type: 'happy-path',
      file,
      priority: 'P1'
    });
    
    // Error handling
    scenarios.push({
      type: 'error-handling',
      file,
      priority: 'P1'
    });
    
    // Edge cases
    const edgeCases = detectEdgeCases(file);
    for (const edge of edgeCases) {
      scenarios.push({
        type: 'edge-case',
        file,
        case: edge,
        priority: 'P2'
      });
    }
    
    // Regression
    const dependencies = findDependencies(file);
    for (const dep of dependencies) {
      scenarios.push({
        type: 'regression',
        file: dep,
        changedFile: file,
        priority: 'P2'
      });
    }
  }
  
  return scenarios;
}
```

## Output Format

```json
{
  "scenarios": [
    {
      "id": "TS-001",
      "title": "User Login - Happy Path",
      "type": "happy-path",
      "priority": "P1",
      "estimatedTime": "5 min",
      "automated": false,
      "steps": [...],
      "expectedResults": [...],
      "affectedComponents": [...]
    }
  ],
  "summary": {
    "total": 15,
    "byPriority": { "P0": 2, "P1": 5, "P2": 6, "P3": 2 },
    "byType": { "happy-path": 4, "error": 4, "integration": 3, "regression": 4 },
    "estimatedTime": "2 hours"
  }
}
```

## Integration with Test Execution

```bash
# Generate scenarios
node generate-scenarios.js > test-scenarios.json

# Execute automated tests
npm test -- --scenarios=test-scenarios.json

# Manual test checklist
cat test-scenarios.json | jq '.scenarios[] | select(.automated == false)'
```
