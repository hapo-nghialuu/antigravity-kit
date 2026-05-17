# Edge Case Identification - Identifying Edge Cases

Methods for detecting and analyzing edge cases to avoid potential bugs.

## Edge Case Categories

### 1. Data Flow Issues

#### Null/Undefined Handling

```typescript
// ❌ Dangerous
function getUser(id: string) {
  const user = users.find(u => u.id === id);
  return user.name; // Crash if user not found
}

// ✅ Safe
function getUser(id: string) {
  const user = users.find(u => u.id === id);
  return user?.name ?? 'Unknown';
}
```

**Check:**
- [ ] Check null/undefined before access?
- [ ] Optional chaining (`?.`) used?
- [ ] Nullish coalescing (`??`) for default values?
- [ ] Type guards for union types?

#### Empty Collections

```typescript
// ❌ Assumes array has items
const firstUser = users[0].name;

// ✅ Handles empty array
const firstUser = users.length > 0 ? users[0].name : null;
```

**Check:**
- [ ] Array.length check before accessing index?
- [ ] Empty array handling in map/filter/reduce?
- [ ] Object.keys() check before iterating?

#### Type Coercion

```typescript
// ❌ Implicit coercion
if (value) { } // false for 0, '', false, null, undefined

// ✅ Explicit check
if (value !== null && value !== undefined) { }
```

**Check:**
- [ ] Strict equality (`===`) instead of loose (`==`)?
- [ ] Explicit type checks for boolean logic?
- [ ] Number validation (isNaN, isFinite)?

### 2. Boundary Conditions

#### String Length

```typescript
// Edge cases
const inputs = [
  '',                    // Empty
  'a',                   // Single char
  'x'.repeat(1000),      // Very long
  '🎉',                  // Unicode/emoji
  'hello\nworld',        // Newlines
  '  spaces  '           // Leading/trailing spaces
];
```

**Check:**
- [ ] Min/max length validation?
- [ ] Trim whitespace?
- [ ] Unicode/emoji handling?
- [ ] Special characters escaped?

#### Numeric Ranges

```typescript
// Edge cases
const numbers = [
  0,                     // Zero
  -1,                    // Negative
  Number.MAX_SAFE_INTEGER, // Max
  Number.MIN_SAFE_INTEGER, // Min
  0.1 + 0.2,            // Float precision
  Infinity,              // Infinity
  NaN                    // Not a number
];
```

**Check:**
- [ ] Min/max bounds validation?
- [ ] Zero handling (division by zero)?
- [ ] Negative number handling?
- [ ] Float precision issues?
- [ ] Infinity/NaN checks?

#### Date/Time

```typescript
// Edge cases
const dates = [
  new Date('2024-02-29'), // Leap year
  new Date('2024-12-31'), // Year boundary
  new Date('invalid'),     // Invalid date
  new Date(0),            // Unix epoch
  new Date('2024-03-10T02:30:00'), // DST transition
];
```

**Check:**
- [ ] Timezone handling?
- [ ] Leap year logic?
- [ ] Date validation?
- [ ] DST transitions?
- [ ] Date range limits?

### 3. Error Scenarios

#### Network Failures

```typescript
// ❌ No error handling
const data = await fetch('/api/users');
return data.json();

// ✅ Comprehensive error handling
try {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
} catch (error) {
  if (error instanceof TypeError) {
    // Network error
  } else {
    // Other errors
  }
  throw error;
}
```

**Check:**
- [ ] Network timeout handling?
- [ ] HTTP error status handling?
- [ ] Retry logic for transient failures?
- [ ] Offline mode support?

#### Database Errors

```typescript
// ❌ No transaction
await prisma.user.create({ data: userData });
await prisma.profile.create({ data: profileData });

// ✅ Transaction with rollback
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData });
  await tx.profile.create({ data: profileData });
});
```

**Check:**
- [ ] Transaction boundaries?
- [ ] Rollback on error?
- [ ] Unique constraint violations?
- [ ] Foreign key violations?
- [ ] Connection pool exhaustion?

#### Permission Denied

```typescript
// ❌ Assumes authorized
function deleteUser(userId: string) {
  return prisma.user.delete({ where: { id: userId } });
}

// ✅ Authorization check
function deleteUser(userId: string, currentUserId: string) {
  if (userId !== currentUserId && !isAdmin(currentUserId)) {
    throw new UnauthorizedError();
  }
  return prisma.user.delete({ where: { id: userId } });
}
```

**Check:**
- [ ] Authentication check?
- [ ] Authorization check?
- [ ] Role-based access control?
- [ ] Resource ownership validation?

### 4. Race Conditions

#### Concurrent Requests

```typescript
// ❌ Race condition
let counter = 0;
async function increment() {
  const current = counter;
  await delay(10);
  counter = current + 1; // Lost updates!
}

// ✅ Atomic operation
async function increment() {
  await prisma.counter.update({
    where: { id: 1 },
    data: { value: { increment: 1 } }
  });
}
```

**Check:**
- [ ] Atomic database operations?
- [ ] Optimistic locking?
- [ ] Idempotency keys?
- [ ] Debouncing/throttling?

#### State Mutations

```typescript
// ❌ Shared mutable state
const state = { count: 0 };
function increment() {
  state.count++; // Race condition
}

// ✅ Immutable updates
function increment(state) {
  return { ...state, count: state.count + 1 };
}
```

**Check:**
- [ ] Immutable data structures?
- [ ] Pure functions?
- [ ] State management (Redux/Zustand)?
- [ ] React concurrent mode safe?

### 5. Integration Points

#### API Contract Changes

```typescript
// Old API response
{ "user": { "name": "John" } }

// New API response (breaking change!)
{ "data": { "user": { "name": "John" } } }
```

**Check:**
- [ ] Backward compatibility?
- [ ] API versioning?
- [ ] Response schema validation?
- [ ] Graceful degradation?

#### Event Handlers

```typescript
// ❌ Missing cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Cleanup on unmount
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Check:**
- [ ] Event listener cleanup?
- [ ] useEffect dependencies correct?
- [ ] Memory leaks prevented?
- [ ] Stale closures avoided?

## Edge Case Checklist

### For Every Change

```markdown
## Data Flow
- [ ] Null/undefined handling
- [ ] Empty collections
- [ ] Type coercion issues

## Boundaries
- [ ] String length (empty, very long, unicode)
- [ ] Numeric ranges (0, negative, max, float)
- [ ] Date/time (timezone, leap year, DST)

## Errors
- [ ] Network failures
- [ ] Database errors
- [ ] Permission denied
- [ ] Validation errors

## Concurrency
- [ ] Race conditions
- [ ] State mutations
- [ ] Atomic operations

## Integration
- [ ] API contract changes
- [ ] Event handler cleanup
- [ ] Dependency updates
```

## Automated Detection

### Static Analysis

```bash
# TypeScript strict mode
tsc --strict --noEmit

# ESLint rules
eslint --rule 'no-unsafe-optional-chaining: error'
eslint --rule 'no-unsafe-member-access: error'
```

### Runtime Checks

```typescript
// Add assertions
function divide(a: number, b: number) {
  if (b === 0) throw new Error('Division by zero');
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Invalid number');
  }
  return a / b;
}
```

## Edge Case Patterns

### Pattern 1: Guard Clauses

```typescript
function processUser(user: User | null) {
  // Early returns for edge cases
  if (!user) return null;
  if (!user.email) return null;
  if (user.deleted) return null;
  
  // Main logic
  return transformUser(user);
}
```

### Pattern 2: Default Values

```typescript
function getConfig(options: Partial<Config> = {}) {
  return {
    timeout: options.timeout ?? 5000,
    retries: options.retries ?? 3,
    cache: options.cache ?? true,
  };
}
```

### Pattern 3: Validation Layer

```typescript
function createUser(data: unknown) {
  // Validate at boundary
  const validated = UserSchema.parse(data);
  
  // Safe to use
  return prisma.user.create({ data: validated });
}
```

## Output Format

```json
{
  "edgeCases": [
    {
      "category": "data-flow",
      "issue": "Null pointer in user.profile.avatar",
      "location": "src/components/Avatar.tsx:15",
      "severity": "high",
      "recommendation": "Add optional chaining: user?.profile?.avatar"
    },
    {
      "category": "boundary",
      "issue": "No max length validation on bio field",
      "location": "src/api/users.ts:45",
      "severity": "medium",
      "recommendation": "Add validation: bio.length <= 500"
    },
    {
      "category": "error",
      "issue": "Network error not handled",
      "location": "src/services/api.ts:23",
      "severity": "high",
      "recommendation": "Add try-catch with retry logic"
    }
  ]
}
```

## Integration with Testing

Edge cases identified → Test scenarios:

```typescript
describe('User API', () => {
  // From edge case analysis
  it('handles null user gracefully', () => {
    expect(getUser(null)).toBe(null);
  });
  
  it('validates email length', () => {
    const longEmail = 'a'.repeat(300) + '@test.com';
    expect(() => createUser({ email: longEmail }))
      .toThrow('Email too long');
  });
  
  it('handles network timeout', async () => {
    mockFetch.mockRejectedValue(new Error('timeout'));
    await expect(fetchUsers()).rejects.toThrow();
  });
});
```
