# Dependency Inspection - Finding Affected Files

Methods for finding and analyzing dependencies to determine impact scope.

## Inspection Strategies

### 1. Import Analysis (Direct Dependencies)

Find files that import the modified code:

```bash
# JavaScript/TypeScript
grep -r "from ['\"].*{module-name}" src/
grep -r "import.*{module-name}" src/
grep -r "require(['\"].*{module-name}" src/

# Python
grep -r "from {module} import" src/
grep -r "import {module}" src/

# Go
grep -r "import.*{package}" .
```

**Example:**
```bash
# Changed: src/utils/auth.ts
# Find who imports it:
grep -r "from.*utils/auth" src/

# Output:
# src/api/users.ts:import { verifyToken } from '@/utils/auth'
# src/middleware/auth.ts:import { verifyToken } from '@/utils/auth'
```

### 2. Function/Class Usage (Reverse Dependencies)

Find where functions/classes are used:

```bash
# Function calls
grep -r "{function-name}(" src/

# Class instantiation
grep -r "new {ClassName}" src/

# Method calls
grep -r "\.{method-name}(" src/
```

**Example:**
```bash
# Changed function: validateEmail()
grep -r "validateEmail(" src/

# Output:
# src/api/auth.ts:  if (!validateEmail(email)) {
# src/components/SignupForm.tsx:  const isValid = validateEmail(value)
```

### 3. API Endpoint Consumers

If backend API is modified, find frontend calls:

```bash
# Fetch/Axios calls
grep -r "fetch.*['\"].*{endpoint}" src/
grep -r "axios.*['\"].*{endpoint}" src/
grep -r "api\.{method}.*{endpoint}" src/

# API client methods
grep -r "api\.(get|post|put|delete).*{endpoint}" src/
```

**Example:**
```bash
# Changed: POST /api/users
grep -r "api/users" src/

# Output:
# src/services/userService.ts:  return fetch('/api/users', { method: 'POST' })
# src/hooks/useUsers.ts:  const { data } = useSWR('/api/users')
```

### 4. Database Dependencies

If database schema is modified:

```bash
# Table usage
grep -r "{table_name}" src/

# Column usage
grep -r "{column_name}" src/

# Prisma queries
grep -r "prisma\.{model}\." src/
```

**Example:**
```bash
# Changed: users table, added 'role' column
grep -r "users\." src/
grep -r "\.role" src/

# Find queries that need updating
grep -r "prisma.user.findMany" src/
```

### 5. Type/Interface Dependencies

Find where types are used:

```bash
# TypeScript interfaces
grep -r ":\s*{TypeName}" src/
grep -r "as {TypeName}" src/
grep -r "extends {TypeName}" src/

# Type imports
grep -r "import.*type.*{TypeName}" src/
```

**Example:**
```bash
# Changed: User interface
grep -r ": User" src/
grep -r "as User" src/

# Output:
# src/api/users.ts:  const user: User = await getUser()
# src/components/UserCard.tsx:  props: { user: User }
```

## Using /hapo:inspect for Dependency Inspection

When multiple files change, use `/hapo:inspect` for scoped discovery first:

```
/hapo:inspect Inspect dependencies for these changes.

Scope:
- src/api/
- src/utils/
- prisma/

Changed files:
- src/api/auth.ts (authentication logic)
- src/utils/validation.ts (email validation)
- prisma/schema.prisma (users table)

Find:
1. Files importing these modules
2. Functions/classes being used
3. API endpoints affected
4. Database queries using changed tables
5. Frontend components calling changed APIs
6. Test files covering changed code

Keep scope narrow. Do not scan repo root.
```

## Dependency Graph

### Build Dependency Map

```javascript
// dependency-map.js
const dependencies = {
  "src/api/auth.ts": {
    directDeps: [
      "src/utils/validation.ts",
      "src/services/userService.ts"
    ],
    reverseDeps: [
      "src/middleware/auth.ts",
      "src/api/users.ts"
    ],
    integrationPoints: [
      "POST /api/login",
      "POST /api/register"
    ]
  }
};
```

### Visualize Impact

```
src/api/auth.ts (CHANGED)
├── Direct Dependencies (what it uses)
│   ├── src/utils/validation.ts
│   └── src/services/userService.ts
│
└── Reverse Dependencies (who uses it)
    ├── src/middleware/auth.ts
    │   └── src/api/users.ts (affected)
    │   └── src/api/posts.ts (affected)
    └── src/api/profile.ts (affected)
```

## Integration Points Analysis

### API Endpoints

```bash
# Find route definitions
grep -r "router\.(get|post|put|delete)" src/api/

# Find endpoint usage in frontend
grep -r "fetch.*api/" src/components/
grep -r "axios.*api/" src/services/
```

### Event Handlers

```bash
# React event handlers
grep -r "onClick.*{handler}" src/
grep -r "onChange.*{handler}" src/

# Event emitters
grep -r "emit(['\"].*{event}" src/
grep -r "on(['\"].*{event}" src/
```

### State Management

```bash
# Redux actions
grep -r "dispatch.*{action}" src/

# Context usage
grep -r "useContext.*{Context}" src/

# Zustand stores
grep -r "use{Store}" src/
```

## Automated Inspection Script

```bash
#!/bin/bash
# inspect-dependencies.sh

CHANGED_FILE=$1

echo "=== Dependency inspection for: $CHANGED_FILE ==="
echo ""

# Extract module name
MODULE_NAME=$(basename "$CHANGED_FILE" | sed 's/\.[^.]*$//')

echo "1. Direct Imports:"
grep -r "from.*$MODULE_NAME" src/ | head -10
echo ""

echo "2. Function Usage:"
# Extract function names from changed file
FUNCTIONS=$(grep -E "^(export )?(function|const) \w+" "$CHANGED_FILE" | awk '{print $2}' | sed 's/[=(].*//')
for func in $FUNCTIONS; do
    echo "  - $func:"
    grep -r "$func(" src/ | grep -v "$CHANGED_FILE" | head -5
done
echo ""

echo "3. Type Usage:"
TYPES=$(grep -E "^(export )?(interface|type) \w+" "$CHANGED_FILE" | awk '{print $2}')
for type in $TYPES; do
    echo "  - $type:"
    grep -r ": $type" src/ | grep -v "$CHANGED_FILE" | head -5
done
echo ""

echo "4. API Endpoints (if applicable):"
grep -E "router\.(get|post|put|delete)" "$CHANGED_FILE" | while read line; do
    ENDPOINT=$(echo "$line" | grep -oE "['\"][^'\"]+['\"]" | head -1 | tr -d "'\"")
    echo "  - $ENDPOINT:"
    grep -r "$ENDPOINT" src/ | grep -v "$CHANGED_FILE" | head -5
done
```

## Output Format

```json
{
  "changedFile": "src/api/auth.ts",
  "dependencies": {
    "direct": [
      {
        "file": "src/utils/validation.ts",
        "imports": ["validateEmail", "validatePassword"],
        "risk": "medium"
      }
    ],
    "reverse": [
      {
        "file": "src/middleware/auth.ts",
        "uses": ["verifyToken", "refreshToken"],
        "impact": "high",
        "reason": "Authentication middleware affected"
      },
      {
        "file": "src/api/users.ts",
        "uses": ["verifyToken"],
        "impact": "medium",
        "reason": "User API needs auth"
      }
    ],
    "integrationPoints": [
      {
        "type": "api",
        "endpoint": "POST /api/login",
        "consumers": [
          "src/components/LoginForm.tsx",
          "src/services/authService.ts"
        ]
      }
    ]
  },
  "affectedComponents": 8,
  "riskLevel": "high"
}
```

## Best Practices

1. **Start with direct imports** - Easiest to find
2. **Use parallel inspection** - For multiple files
3. **Check integration points** - APIs, events, state
4. **Verify test coverage** - Find test files
5. **Document findings** - For test scenario generation

## Next Steps

After inspection, proceed to:
1. **Edge Case Identification** - Analyze risks in affected files
2. **Test Scenario Generation** - Create tests for affected components
