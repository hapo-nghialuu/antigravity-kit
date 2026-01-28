# 🎬 Orchestrator Mechanism - Ví Dụ Thực Tế

> Các scenarios thực tế minh họa cách orchestrator hoạt động trong `.claude/` plugin

---

## 📋 MỤC LỤC

1. [Ví Dụ 1: Simple Task (Không Cần Orchestrator)](#ví-dụ-1-simple-task)
2. [Ví Dụ 2: Multi-Domain Task (Auto-Select Orchestrator)](#ví-dụ-2-multi-domain-task)
3. [Ví Dụ 3: Complex Task với PLAN.md Requirement](#ví-dụ-3-complex-task-với-planmd)
4. [Ví Dụ 4: Boundary Violation Prevention](#ví-dụ-4-boundary-violation-prevention)
5. [Ví Dụ 5: Real-World E-Commerce Project](#ví-dụ-5-real-world-e-commerce)
6. [Ví Dụ 6: Security Audit](#ví-dụ-6-security-audit)
7. [Ví Dụ 7: Mobile App Development](#ví-dụ-7-mobile-app-development)

---

## VÍ DỤ 1: SIMPLE TASK

### 🎯 Scenario: "Fix button styling"

**User Input:**
```
"The submit button looks off. Make it blue with rounded corners."
```

### 📊 Analysis Flow

```
┌──────────────────────────────────────────────────┐
│ STEP 1: MODEL ROUTING                            │
│ ────────────────────────────────────────────     │
│ Keywords detected: "button", "blue", "rounded"   │
│ Domain analysis:                                 │
│   ├─ Frontend: ✅ (button, styling)             │
│   ├─ Backend: ❌                                 │
│   ├─ Database: ❌                                │
│   └─ Security: ❌                                │
│                                                  │
│ Total domains: 1 (Frontend only)                 │
│ Complexity: LOW                                  │
│                                                  │
│ 🚫 NO ORCHESTRATOR NEEDED                       │
│ ✅ Select: frontend-specialist directly         │
└──────────────────────────────────────────────────┘
```

### 🔄 Execution

```
┌──────────────────────────────────────────────────┐
│ FRONTEND-SPECIALIST ACTIVATED                    │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ Step 1: Find button component                   │
│ $ grep -r "submit.*button" components/          │
│ Found: components/forms/SubmitButton.tsx        │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ Step 2: Edit component                          │
│ File: components/forms/SubmitButton.tsx         │
│                                                  │
│ Changes:                                         │
│ - className="bg-blue-500 rounded-lg ..."        │
│ - Added Tailwind utilities                      │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ Step 3: Validation (Auto via Hook)              │
│ PostToolUse:Edit triggered                      │
│ → validate_dispatcher.py                        │
│ → react_performance_checker.py                  │
│ → ✅ No performance issues                      │
└──────────────────────────────────────────────────┘
```

### 📤 Output

```
✅ I've updated the submit button styling:

Changes made:
├─ File: components/forms/SubmitButton.tsx
├─ Background: Changed to blue (bg-blue-500)
├─ Corners: Added rounded (rounded-lg)
└─ Validated: No performance issues detected

The button now has a clean blue background with rounded corners.
```

**Execution Time:** ~5 seconds
**Agents Used:** 1 (frontend-specialist)
**Memory Cost:** ~50KB

---

## VÍ DỤ 2: MULTI-DOMAIN TASK

### 🎯 Scenario: "Add dark mode to the app"

**User Input:**
```
"Add dark mode support to the entire application.
Make sure it persists across sessions."
```

### 📊 Analysis Flow

```
┌──────────────────────────────────────────────────┐
│ STEP 1: MODEL ROUTING                            │
│ ────────────────────────────────────────────     │
│ Keywords: "dark mode", "entire application",     │
│           "persists", "sessions"                 │
│                                                  │
│ Domain analysis:                                 │
│   ├─ Frontend: ✅ (UI styling, theme switching) │
│   ├─ Backend: ✅ (persist preference)           │
│   ├─ Database: ✅ (store user preference)       │
│   └─ Testing: ✅ (verify theme switching)       │
│                                                  │
│ Total domains: 4 (Multi-domain task)             │
│ Complexity: HIGH                                 │
│                                                  │
│ ✅ AUTO-SELECT ORCHESTRATOR                     │
└──────────────────────────────────────────────────┘
```

### 🔄 Execution

```
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR ACTIVATED                           │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ 🔴 STEP 0: PRE-FLIGHT CHECKS                    │
│ ────────────────────────────────────────────     │
│ [x] Check for PLAN.md                            │
│     → Read docs/PLAN-dark-mode.md                │
│     → ❌ NOT FOUND                               │
│                                                  │
│ Action: Create plan first                        │
│ → Invoke project-planner                         │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ PROJECT-PLANNER CREATES PLAN                     │
│ ────────────────────────────────────────────     │
│ File: docs/PLAN-dark-mode.md                     │
│                                                  │
│ Content:                                         │
│ ## Task: Add Dark Mode                          │
│                                                  │
│ ### Tech Stack                                   │
│ - Frontend: React Context API                   │
│ - Backend: API endpoint for preference          │
│ - Database: User table column                   │
│ - Storage: localStorage (fallback)              │
│                                                  │
│ ### Tasks                                        │
│ 1. Create ThemeContext                          │
│ 2. Add dark mode CSS variables                  │
│ 3. Create API endpoint: PATCH /user/theme       │
│ 4. Add theme column to User table               │
│ 5. Implement theme toggle component             │
│ 6. Test theme switching                         │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR RESUMES                             │
│ ────────────────────────────────────────────     │
│ ✅ PLAN.md verified                              │
│ ✅ Project type: WEB                             │
│ ✅ Agent routing valid                           │
│                                                  │
│ Proceeding with agent invocation...              │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 1: FRONTEND-SPECIALIST                     │
│ ────────────────────────────────────────────     │
│ Task: Implement theme context and UI             │
│                                                  │
│ Actions:                                         │
│ 1. Create contexts/ThemeContext.tsx              │
│    - useTheme hook                               │
│    - ThemeProvider component                     │
│                                                  │
│ 2. Add CSS variables to globals.css              │
│    - Light theme colors                          │
│    - Dark theme colors                           │
│                                                  │
│ 3. Create components/ThemeToggle.tsx             │
│    - Toggle button                               │
│    - Moon/Sun icons                              │
│                                                  │
│ Files created:                                   │
│ ├─ contexts/ThemeContext.tsx                     │
│ ├─ components/ThemeToggle.tsx                    │
│ └─ styles/globals.css (modified)                 │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 2: DATABASE-ARCHITECT                      │
│ ────────────────────────────────────────────     │
│ Task: Add theme column to User schema            │
│                                                  │
│ Actions:                                         │
│ 1. Update prisma/schema.prisma                   │
│    - Add: theme String @default("light")         │
│                                                  │
│ 2. Generate migration                            │
│    - Migration name: add_user_theme              │
│                                                  │
│ Files modified:                                  │
│ ├─ prisma/schema.prisma                          │
│ └─ prisma/migrations/xxx_add_user_theme/         │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 3: BACKEND-SPECIALIST                      │
│ ────────────────────────────────────────────     │
│ Task: Create API endpoint for theme preference   │
│                                                  │
│ Actions:                                         │
│ 1. Create api/user/theme/route.ts                │
│    - PATCH handler                               │
│    - Validate input: "light" | "dark"            │
│    - Update user in database                     │
│                                                  │
│ 2. Add GET endpoint to return current theme      │
│                                                  │
│ Files created:                                   │
│ └─ api/user/theme/route.ts                       │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 4: TEST-ENGINEER                           │
│ ────────────────────────────────────────────     │
│ Task: Write tests for theme functionality        │
│                                                  │
│ Actions:                                         │
│ 1. Create __tests__/ThemeContext.test.tsx        │
│    - Test theme switching                        │
│    - Test localStorage persistence               │
│                                                  │
│ 2. Create __tests__/api/theme.test.ts            │
│    - Test PATCH /api/user/theme                  │
│    - Test input validation                       │
│                                                  │
│ Files created:                                   │
│ ├─ __tests__/ThemeContext.test.tsx               │
│ └─ __tests__/api/theme.test.ts                   │
│                                                  │
│ Test Results:                                    │
│ ✅ All tests passed (12/12)                      │
│ ✅ Coverage: 92%                                 │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ SYNTHESIS                                        │
│ ────────────────────────────────────────────     │
│ Orchestrator combines all results...             │
└──────────────────────────────────────────────────┘
```

### 📤 Output

```
✅ Dark mode has been successfully added to your application!

## Summary

I coordinated 4 specialized agents to implement dark mode:

### 🎨 Frontend (frontend-specialist)
Created:
├─ ThemeContext with useTheme hook
├─ ThemeToggle component (Moon/Sun icons)
└─ CSS variables for light/dark themes

### 🗄️ Database (database-architect)
Updated:
├─ User schema with theme column
└─ Migration: add_user_theme

### 🔧 Backend (backend-specialist)
Created:
└─ API endpoint: PATCH /api/user/theme
   - Validates input: "light" | "dark"
   - Persists to database

### ✅ Testing (test-engineer)
Created:
├─ ThemeContext tests (theme switching, persistence)
└─ API endpoint tests (validation, updates)
Results: 12/12 passed, 92% coverage

## How It Works

1. **Toggle**: Click ThemeToggle button (top-right)
2. **Persist**: Theme saved to localStorage (instant)
3. **Sync**: If logged in, also saved to database
4. **Load**: Theme auto-applied on page load

## Files Changed (8 files)

Frontend:
├─ contexts/ThemeContext.tsx (new)
├─ components/ThemeToggle.tsx (new)
└─ styles/globals.css (modified)

Backend:
├─ api/user/theme/route.ts (new)
└─ prisma/schema.prisma (modified)

Tests:
├─ __tests__/ThemeContext.test.tsx (new)
└─ __tests__/api/theme.test.ts (new)

Documentation:
└─ docs/PLAN-dark-mode.md (new)

Would you like me to:
1. Add more theme options (auto, sepia)?
2. Create theme customization settings?
3. Add transition animations?
```

**Execution Time:** ~45 seconds
**Agents Used:** 5 (project-planner + 4 specialists)
**Memory Cost:** ~250KB

---

## VÍ DỤ 3: COMPLEX TASK VỚI PLAN.MD

### 🎯 Scenario: "Build e-commerce checkout"

**User Input:**
```
"Build a complete checkout flow with payment processing,
order confirmation, and email notifications."
```

### 📊 Analysis Flow

```
┌──────────────────────────────────────────────────┐
│ STEP 1: MODEL ROUTING                            │
│ ────────────────────────────────────────────     │
│ Keywords: "checkout", "payment", "order",        │
│           "email notifications"                  │
│                                                  │
│ Domain analysis:                                 │
│   ├─ Frontend: ✅ (checkout UI, forms)          │
│   ├─ Backend: ✅ (payment API, order logic)     │
│   ├─ Database: ✅ (Order, Payment tables)       │
│   ├─ Security: ✅ (payment security)            │
│   ├─ Testing: ✅ (checkout flow tests)          │
│   └─ DevOps: ✅ (email service config)          │
│                                                  │
│ Total domains: 6 (Very complex)                  │
│ Complexity: VERY HIGH                            │
│                                                  │
│ ✅ AUTO-SELECT ORCHESTRATOR                     │
│ ✅ SOCRATIC GATE TRIGGERED                      │
└──────────────────────────────────────────────────┘
```

### 🔄 Execution

```
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR ACTIVATED                           │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ 🛑 SOCRATIC GATE (MANDATORY)                    │
│ ────────────────────────────────────────────     │
│ Request is VAGUE and COMPLEX                     │
│ → MUST ask clarifying questions                  │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR ASKS 3 QUESTIONS                    │
└──────────────────────────────────────────────────┘

Claude: "Before I coordinate the agents to build the checkout
flow, I need to clarify a few important details:

### 🎯 **Payment Integration**
Which payment provider should we use?
- **Stripe** (Most popular, easy integration)
- **PayPal** (Good for international)
- **Square** (Good for small business)
- Other?

**Why this matters:** Different providers have different
security requirements and implementation patterns.

### 📦 **Order Workflow**
What should happen after successful payment?
- Immediate order confirmation?
- Send to fulfillment queue?
- Update inventory?
- Trigger shipping label creation?

**Why this matters:** This determines the backend architecture
and database schema.

### 📧 **Email Notifications**
Which emails should we send?
- Order confirmation (customer)
- Order notification (admin)
- Payment receipt
- Shipping notification
- All of the above?

**Why this matters:** Each email requires a template and
different trigger points in the workflow."
```

**User Responds:**
```
"Use Stripe for payment. After payment:
1. Create order in database
2. Send confirmation email to customer
3. Send notification to admin

For emails, just order confirmation and admin notification
for now."
```

```
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR PROCEEDS                            │
│ ────────────────────────────────────────────     │
│ ✅ Requirements clarified                        │
│ ✅ Tech stack: Stripe                            │
│ ✅ Workflow: Order → Emails                      │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ 🔴 STEP 0: PRE-FLIGHT CHECKS                    │
│ ────────────────────────────────────────────     │
│ [x] Check for PLAN.md                            │
│     → Read docs/PLAN-checkout.md                 │
│     → ❌ NOT FOUND                               │
│                                                  │
│ Action: Create plan with project-planner         │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ PROJECT-PLANNER CREATES DETAILED PLAN            │
│ ────────────────────────────────────────────     │
│ File: docs/PLAN-checkout.md                      │
│                                                  │
│ ## Checkout Flow Implementation Plan             │
│                                                  │
│ ### Tech Stack                                   │
│ - Payment: Stripe API                            │
│ - Email: SendGrid                                │
│ - Frontend: Next.js + Stripe Elements           │
│ - Backend: Next.js API Routes                    │
│ - Database: Prisma (PostgreSQL)                  │
│                                                  │
│ ### Database Schema                              │
│ Tables:                                          │
│ ├─ Order (id, userId, status, total, etc.)      │
│ ├─ OrderItem (id, orderId, productId, qty)      │
│ └─ Payment (id, orderId, stripeId, status)      │
│                                                  │
│ ### Tasks Breakdown                              │
│ 1. Database schema (database-architect)          │
│ 2. Payment integration (backend-specialist)      │
│ 3. Checkout UI (frontend-specialist)             │
│ 4. Email service (backend-specialist)            │
│ 5. Security audit (security-auditor)             │
│ 6. E2E tests (test-engineer)                     │
│                                                  │
│ ### Security Considerations                      │
│ - PCI compliance for payment                     │
│ - HTTPS only                                     │
│ - CSRF protection                                │
│ - Rate limiting                                  │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR INVOKES 6 AGENTS SEQUENTIALLY       │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 1: DATABASE-ARCHITECT                      │
│ ────────────────────────────────────────────     │
│ Task: Design schema for orders and payments      │
│                                                  │
│ Created:                                         │
│ ├─ prisma/schema.prisma                          │
│ │  ├─ Order model                                │
│ │  ├─ OrderItem model                            │
│ │  └─ Payment model                              │
│ └─ Migrations                                    │
│                                                  │
│ Status: ✅ COMPLETED                             │
│ Output: Schema designed with proper relations    │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 2: BACKEND-SPECIALIST                      │
│ ────────────────────────────────────────────     │
│ Task: Implement payment API and email service    │
│                                                  │
│ Created:                                         │
│ ├─ api/checkout/route.ts                         │
│ │  └─ POST handler with Stripe integration       │
│ ├─ api/webhooks/stripe/route.ts                  │
│ │  └─ Handle Stripe events                       │
│ ├─ lib/stripe.ts                                 │
│ │  └─ Stripe client configuration                │
│ └─ lib/email.ts                                  │
│    ├─ sendOrderConfirmation()                    │
│    └─ sendAdminNotification()                    │
│                                                  │
│ Status: ✅ COMPLETED                             │
│ Output: Payment processing + Email ready         │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 3: FRONTEND-SPECIALIST                     │
│ ────────────────────────────────────────────     │
│ Task: Build checkout UI with Stripe Elements     │
│                                                  │
│ Created:                                         │
│ ├─ components/checkout/CheckoutForm.tsx          │
│ │  ├─ Stripe CardElement                         │
│ │  ├─ Order summary                              │
│ │  └─ Submit button                              │
│ ├─ components/checkout/OrderSummary.tsx          │
│ └─ pages/checkout.tsx                            │
│                                                  │
│ Features:                                        │
│ ├─ Real-time validation                          │
│ ├─ Loading states                                │
│ ├─ Error handling                                │
│ └─ Responsive design                             │
│                                                  │
│ Status: ✅ COMPLETED                             │
│ Output: Complete checkout UI                     │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 4: SECURITY-AUDITOR                        │
│ ────────────────────────────────────────────     │
│ Task: Audit payment security                     │
│                                                  │
│ Checked:                                         │
│ ├─ Stripe API keys (server-side only) ✅        │
│ ├─ HTTPS enforcement ✅                          │
│ ├─ CSRF protection ✅                            │
│ ├─ Input validation ✅                           │
│ └─ Webhook signature verification ✅             │
│                                                  │
│ Issues Found:                                    │
│ ⚠️  Missing rate limiting on checkout endpoint  │
│ ⚠️  No retry logic for failed emails            │
│                                                  │
│ Recommendations:                                 │
│ 1. Add rate limiting: 5 requests/minute         │
│ 2. Add email queue with retry                   │
│                                                  │
│ Status: ✅ COMPLETED                             │
│ Output: Security audit report                    │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 5: BACKEND-SPECIALIST (FIXES)              │
│ ────────────────────────────────────────────     │
│ Task: Implement security recommendations         │
│                                                  │
│ Actions:                                         │
│ ├─ Added rate limiting middleware                │
│ │  └─ 5 requests/minute per IP                   │
│ └─ Added email queue with Bull                   │
│    └─ Retry: 3 attempts with backoff             │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ AGENT 6: TEST-ENGINEER                           │
│ ────────────────────────────────────────────     │
│ Task: Write E2E tests for checkout flow          │
│                                                  │
│ Created:                                         │
│ ├─ __tests__/e2e/checkout.spec.ts                │
│ │  ├─ Test successful payment                    │
│ │  ├─ Test payment failure                       │
│ │  ├─ Test validation errors                     │
│ │  └─ Test email sending                         │
│ └─ __tests__/api/checkout.test.ts                │
│                                                  │
│ Test Results:                                    │
│ ✅ E2E: 8/8 passed                               │
│ ✅ Unit: 15/15 passed                            │
│ ✅ Coverage: 89%                                 │
│                                                  │
│ Status: ✅ COMPLETED                             │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ SYNTHESIS & FINAL REPORT                         │
└──────────────────────────────────────────────────┘
```

### 📤 Output

```
## ✅ Checkout Flow Implementation Complete

I coordinated 6 specialized agents to build a complete,
secure checkout system with Stripe integration.

### 📊 Implementation Summary

**Agents Coordinated:**
1. project-planner: Created implementation plan
2. database-architect: Designed schema (3 tables)
3. backend-specialist: Payment API + Email service
4. frontend-specialist: Checkout UI with Stripe Elements
5. security-auditor: Security audit + recommendations
6. test-engineer: E2E and unit tests

### 🗄️ Database Schema (database-architect)

Created 3 tables:
```prisma
model Order {
  id        String   @id @default(cuid())
  userId    String
  status    String   // pending, completed, failed
  total     Float
  items     OrderItem[]
  payment   Payment?
  createdAt DateTime @default(now())
}

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  order     Order  @relation(fields: [orderId])
}

model Payment {
  id          String @id @default(cuid())
  orderId     String @unique
  stripeId    String
  status      String // succeeded, failed, pending
  amount      Float
  order       Order  @relation(fields: [orderId])
}
```

### 🔧 Backend API (backend-specialist)

**Endpoints Created:**
- `POST /api/checkout`
  - Accepts: cart items, payment method
  - Creates: Stripe PaymentIntent
  - Returns: client_secret for frontend

- `POST /api/webhooks/stripe`
  - Handles: payment_intent.succeeded
  - Creates: Order in database
  - Triggers: Email notifications

**Email Service:**
- SendGrid integration
- Templates:
  - Order confirmation (customer)
  - New order notification (admin)
- Queue system with retry (Bull)

**Security:**
- Rate limiting: 5 req/min
- CSRF protection
- Webhook signature verification

### 🎨 Frontend UI (frontend-specialist)

**Components Created:**
- `CheckoutForm.tsx`
  - Stripe CardElement integration
  - Real-time validation
  - Loading states
  - Error handling

- `OrderSummary.tsx`
  - Cart items display
  - Total calculation
  - Tax/shipping preview

**Features:**
- Responsive design (mobile-first)
- Accessible (WCAG AA)
- Progressive enhancement

### 🔒 Security Audit (security-auditor)

**Passed Checks:**
✅ Stripe keys server-side only
✅ HTTPS enforced
✅ CSRF protection enabled
✅ Input validation
✅ Webhook verification

**Implemented Fixes:**
✅ Added rate limiting
✅ Added email retry queue

### ✅ Testing (test-engineer)

**Coverage:**
- E2E tests: 8 scenarios
- Unit tests: 15 functions
- Overall coverage: 89%

**Test Scenarios:**
- ✅ Successful payment flow
- ✅ Payment failure handling
- ✅ Validation errors
- ✅ Email delivery
- ✅ Webhook processing
- ✅ Rate limiting
- ✅ CSRF protection
- ✅ Order creation

### 📁 Files Created (18 files)

**Backend (7 files):**
- api/checkout/route.ts
- api/webhooks/stripe/route.ts
- lib/stripe.ts
- lib/email.ts
- middleware/rateLimit.ts
- services/orderService.ts
- services/emailQueue.ts

**Frontend (4 files):**
- components/checkout/CheckoutForm.tsx
- components/checkout/OrderSummary.tsx
- pages/checkout.tsx
- hooks/useCheckout.ts

**Database (1 file):**
- prisma/schema.prisma (modified)

**Tests (4 files):**
- __tests__/e2e/checkout.spec.ts
- __tests__/api/checkout.test.ts
- __tests__/lib/email.test.ts
- __tests__/services/orderService.test.ts

**Docs (2 files):**
- docs/PLAN-checkout.md
- docs/CHECKOUT-SETUP.md

### 🚀 Setup Instructions

1. **Environment Variables:**
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG...
ADMIN_EMAIL=admin@example.com
```

2. **Database Migration:**
```bash
npx prisma migrate dev
```

3. **Install Dependencies:**
```bash
npm install @stripe/stripe-js stripe bull
```

4. **Start Email Queue:**
```bash
npm run queue:start
```

### 🧪 Testing

**Run E2E tests:**
```bash
npm run test:e2e
```

**Test checkout locally:**
1. Add items to cart
2. Go to /checkout
3. Use Stripe test card: 4242 4242 4242 4242
4. Verify email sent to console

### 📋 Next Steps

Would you like me to:
1. Add shipping address collection?
2. Implement coupon/discount codes?
3. Add order tracking page?
4. Set up webhook monitoring?

The checkout flow is fully functional and ready for testing!
```

**Execution Time:** ~3 minutes
**Agents Used:** 7 (including project-planner)
**Files Created:** 18
**Memory Cost:** ~400KB

---

## VÍ DỤ 4: BOUNDARY VIOLATION PREVENTION

### 🎯 Scenario: Frontend Agent Tries to Write Test File

**Context:**
```
Orchestrator invoked frontend-specialist to create a Button component.
Frontend-specialist completes the component and then tries to write tests.
```

### 🔄 Execution

```
┌──────────────────────────────────────────────────┐
│ FRONTEND-SPECIALIST WORKING                      │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ Step 1: Create component ✅                      │
│ File: components/ui/Button.tsx                   │
│ Status: Created successfully                     │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ Step 2: Attempt to create test ❌               │
│ File: __tests__/Button.test.tsx                  │
│                                                  │
│ 🔴 BOUNDARY VIOLATION DETECTED                  │
│ ────────────────────────────────────────────     │
│ Agent: frontend-specialist                       │
│ Attempted: Write to __tests__/                   │
│ Owner: test-engineer                             │
│                                                  │
│ Action: STOP frontend-specialist                 │
│ → Return control to orchestrator                 │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ ORCHESTRATOR INTERVENES                          │
│ ────────────────────────────────────────────     │
│ Detected boundary violation                      │
│ → frontend-specialist cannot write test files    │
│ → Correct agent: test-engineer                   │
│                                                  │
│ Action: Invoke test-engineer                     │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│ TEST-ENGINEER ACTIVATED                          │
│ ────────────────────────────────────────────     │
│ Context received from orchestrator:              │
│ - Component: Button.tsx created                  │
│ - Props: {variant, size, disabled, onClick}      │
│ - Need: Unit tests                               │
│                                                  │
│ Action: Create test file                         │
│ File: __tests__/Button.test.tsx                  │
│ Status: ✅ Created successfully                  │
└──────────────────────────────────────────────────┘
```

### 📤 Output

```
✅ Button component created with tests

I noticed frontend-specialist tried to create tests but that's
outside their domain. I re-routed to test-engineer to maintain
proper boundaries.

**Files Created:**
- components/ui/Button.tsx (by frontend-specialist)
- __tests__/Button.test.tsx (by test-engineer)

**Boundary Enforcement:**
✅ Each agent stayed within their domain
✅ No cross-domain violations
✅ Proper separation of concerns
```

---

## VÍ DỤ 5: REAL-WORLD E-COMMERCE

### 🎯 Scenario: Complete E-commerce Site

**User Input:**
```
"Build a complete e-commerce site for selling books.
Need: product listing, search, cart, checkout, admin panel."
```

### 📊 High-Level Flow

```
USER INPUT
    ↓
ORCHESTRATOR ACTIVATED
    ↓
🛑 SOCRATIC GATE (asks 5 questions about design, features, etc.)
    ↓
PROJECT-PLANNER CREATES PLAN
    ↓
ORCHESTRATOR INVOKES 10 AGENTS:
    ├─ 1. database-architect (schema for products, orders, users)
    ├─ 2. backend-specialist (API endpoints)
    ├─ 3. frontend-specialist (product pages, cart UI)
    ├─ 4. frontend-specialist (checkout flow)
    ├─ 5. frontend-specialist (admin panel)
    ├─ 6. security-auditor (auth, payment security)
    ├─ 7. test-engineer (E2E tests)
    ├─ 8. performance-optimizer (image optimization, caching)
    ├─ 9. seo-specialist (meta tags, sitemap)
    └─ 10. devops-engineer (deployment config)
    ↓
SYNTHESIS
    ↓
OUTPUT: Complete e-commerce site (50+ files created)
```

**Execution Time:** ~15 minutes
**Files Created:** 52
**Agents Used:** 11 (including project-planner)

---

## VÍ DỤ 6: SECURITY AUDIT

### 🎯 Scenario: Comprehensive Security Review

**User Input:**
```
"Review the entire application for security vulnerabilities."
```

### 🔄 Execution

```
ORCHESTRATOR
    ↓
INVOKES 4 AGENTS:
    ├─ 1. explorer-agent (map codebase, identify critical files)
    ├─ 2. security-auditor (OWASP top 10, auth review)
    ├─ 3. penetration-tester (active vulnerability testing)
    └─ 4. backend-specialist (code quality, error handling)
    ↓
SYNTHESIS REPORT:
    ├─ Found: 3 critical, 5 high, 12 medium issues
    ├─ Recommendations: Prioritized fix list
    └─ Next steps: Implementation plan
```

**Output:** Comprehensive security report with actionable fixes

---

## VÍ DỤ 7: MOBILE APP DEVELOPMENT

### 🎯 Scenario: React Native Mobile App

**User Input:**
```
"Build a mobile app for tracking expenses with offline support."
```

### 📊 Analysis

```
MODEL ROUTING
    ↓
Detected: MOBILE project (keyword: "mobile app")
    ↓
🔴 PROJECT TYPE CHECKPOINT
    ├─ Verified: MOBILE
    ├─ Correct agent: mobile-developer
    └─ Banned agents: frontend-specialist ❌
    ↓
ORCHESTRATOR
    ↓
INVOKES:
    ├─ mobile-developer (UI components, navigation)
    ├─ database-architect (SQLite schema)
    ├─ backend-specialist (sync API)
    └─ test-engineer (mobile tests)
```

**Key Point:** `frontend-specialist` is BLOCKED for mobile projects

---

## 🎯 TÓM TẮT CÁC VÍ DỤ

| Example | Complexity | Orchestrator? | Agents Used | Time |
|---------|-----------|---------------|-------------|------|
| 1. Button styling | LOW | ❌ No | 1 | 5s |
| 2. Dark mode | HIGH | ✅ Yes | 5 | 45s |
| 3. E-commerce checkout | VERY HIGH | ✅ Yes | 7 | 3min |
| 4. Boundary violation | - | ✅ Yes | 2 | 10s |
| 5. Full e-commerce | EXTREME | ✅ Yes | 11 | 15min |
| 6. Security audit | HIGH | ✅ Yes | 4 | 2min |
| 7. Mobile app | HIGH | ✅ Yes | 4 | 3min |

### Khi Nào Dùng Orchestrator?

**✅ USE ORCHESTRATOR:**
- Multi-domain tasks (2+ domains)
- Complex requirements
- Need comprehensive analysis
- Keywords: "complete", "full", "comprehensive"

**❌ DON'T USE ORCHESTRATOR:**
- Single-domain tasks
- Simple modifications
- Quick fixes
- Clear, focused requests

---

**Hy vọng các ví dụ này giúp bạn hiểu rõ hơn về cách orchestrator mechanism hoạt động trong thực tế!**
