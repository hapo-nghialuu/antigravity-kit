# CafeKit Website Implementation - Sprint 1

> **Project:** CafeKit Official Website
> **Sprint:** 1 (Website Creation)
> **Tech Stack:** Next.js 15 + Tailwind CSS 4 + TypeScript + MDX
> **Estimated Time:** ~9.5 hours (split across 4 days)

---

## Overview

Create a professional documentation website for CafeKit with:
- Clean landing page (hero + features + quick start)
- Comprehensive documentation with MDX support
- Responsive sidebar navigation
- Code syntax highlighting
- Coffee-themed design system
- Vercel deployment

**This sprint focuses ONLY on website creation. Rename tasks are handled separately.**

---

## Project Type

**WEB** - Documentation website with static content and MDX-based docs

---

## Success Criteria

| Criteria | Definition |
|----------|------------|
| Landing page live | Hero, features, quick start sections working |
| Docs infrastructure ready | Sidebar, MDX rendering, code highlighting functional |
| Core docs written | Installation, quickstart, spec workflow guides complete |
| Deployed to Vercel | Accessible via public URL |
| Responsive design | Works on mobile, tablet, desktop |
| CafeKit theme applied | Coffee brown colors, clean typography |

---

## Tech Stack

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Next.js** | 15 | Web framework | App Router, built-in optimization, Vercel native |
| **TypeScript** | 5.x | Type safety | Better DX, catch errors early |
| **Tailwind CSS** | 4 | Styling | Utility-first, fast iteration, small bundle |
| **MDX** | Latest | Content | Write docs in markdown with React components |
| **next-mdx-remote** | Latest | MDX rendering | Server-side MDX compilation |
| **rehype-highlight** | Latest | Syntax highlighting | Code block highlighting |
| **lucide-react** | Latest | Icons | Lightweight, tree-shakeable icons |
| **pnpm** | Latest | Package manager | Fast, disk-efficient, workspace support |

---

## File Structure

```
website/                              # NEW folder in project root
├── app/                              # Next.js 15 App Router
│   ├── layout.tsx                    # Root layout (navbar, footer)
│   ├── page.tsx                      # Landing page (/)
│   ├── globals.css                   # Global styles + Tailwind
│   └── docs/
│       ├── layout.tsx                # Docs layout with sidebar
│       ├── page.tsx                  # Docs home (/docs)
│       └── [slug]/                   # Dynamic route for docs pages
│           └── page.tsx
│
├── components/
│   ├── landing/
│   │   ├── hero.tsx                  # Hero section
│   │   ├── features.tsx              # 3-card features grid
│   │   └── quick-start.tsx           # Code example section
│   ├── docs/
│   │   ├── sidebar.tsx               # Navigation sidebar
│   │   ├── toc.tsx                   # Table of contents
│   │   ├── mdx-components.tsx        # Custom MDX components
│   │   └── code-block.tsx            # Syntax highlighted code
│   └── shared/
│       ├── navbar.tsx                # Top navigation
│       └── footer.tsx                # Footer with links
│
├── content/                          # MDX documentation files
│   ├── docs/
│   │   ├── getting-started/
│   │   │   ├── installation.mdx
│   │   │   └── quickstart.mdx
│   │   ├── guides/
│   │   │   ├── spec-workflow.mdx
│   │   │   ├── agents.mdx
│   │   │   └── skills.mdx
│   │   └── reference/
│   │       ├── cli-commands.mdx
│   │       ├── agents-list.mdx
│   │       └── skills-list.mdx
│   └── config.ts                     # Sidebar navigation config
│
├── lib/
│   ├── mdx.ts                        # MDX parsing utilities
│   └── constants.ts                  # Colors, fonts, config
│
├── public/
│   ├── favicon.ico
│   └── logo.svg                      # CafeKit logo
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts                # CafeKit theme colors
├── next.config.ts
└── README.md
```

---

## Component Architecture

### Landing Page Flow

```
page.tsx (/)
├── <Navbar />                  # Shared component
├── <Hero />                    # Install command, CTA
├── <Features />                # 3 cards: Spec, Agents, Skills
├── <QuickStart />              # Code example
└── <Footer />                  # Shared component
```

### Docs Page Flow

```
app/docs/layout.tsx
├── <Navbar />                  # Shared component
├── <Sidebar />                 # Left navigation
└── children                    # MDX content
    ├── <TableOfContents />     # Right sidebar (on-page nav)
    └── <MDXContent />          # Rendered markdown
```

### MDX Rendering Pipeline

```
1. Read MDX file from content/docs/
2. Parse frontmatter (title, description)
3. Compile MDX to React components
4. Apply custom components (CodeBlock, Callout, Cards)
5. Render in docs layout
```

---

## Task Breakdown

### Priority: P0 - Foundation (Must Have)

#### **TASK 1: Project Setup**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`, `frontend-design`
**Priority:** P0 (Blocker)
**Dependencies:** None
**Estimated Time:** 1 hour

**INPUT:**
- Empty `/website` folder path
- Next.js 15 requirements
- Package manager: pnpm

**OUTPUT:**
- Next.js 15 project initialized with TypeScript + Tailwind
- Dependencies installed: `@tailwindcss/typography`, `next-mdx-remote`, `rehype-highlight`, `lucide-react`
- `package.json` configured with scripts
- `tsconfig.json` strict mode enabled
- `tailwind.config.ts` with CafeKit theme colors
- Project builds successfully

**VERIFY:**
```bash
cd /Users/luutrungnghia/projects/antigravity-kit/website
pnpm install
pnpm run dev
# → Server starts on http://localhost:3000
# → No TypeScript errors
# → Tailwind CSS loads correctly
```

**Commands:**
```bash
cd /Users/luutrungnghia/projects/antigravity-kit
mkdir -p website
cd website
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
pnpm add @tailwindcss/typography next-mdx-remote rehype-highlight lucide-react
```

**Rollback:** Delete `/website` folder

---

#### **TASK 2: Configure CafeKit Theme**

**Agent:** `frontend-specialist`
**Skills:** `tailwind-patterns`, `frontend-design`
**Priority:** P0 (Blocker)
**Dependencies:** TASK 1
**Estimated Time:** 30 minutes

**INPUT:**
- `tailwind.config.ts` file
- CafeKit color palette (from WEBSITE-PLAN.md)
- Typography requirements (Inter, Cal Sans, JetBrains Mono)

**OUTPUT:**
- `tailwind.config.ts` updated with:
  - Coffee brown primary colors
  - Cream accent colors
  - Custom font families
  - Typography plugin configured
- `app/globals.css` with CSS variables for theme
- Font imports configured

**VERIFY:**
```bash
# Check config file
cat tailwind.config.ts | grep "primary.*6F4E37"
# → Should find coffee brown color

# Start dev server
pnpm run dev
# → Tailwind processes custom theme
# → No CSS errors in console
```

**Rollback:** Revert `tailwind.config.ts` to default

---

#### **TASK 3: Create Shared Components (Navbar + Footer)**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`, `frontend-design`
**Priority:** P0 (Blocker)
**Dependencies:** TASK 2
**Estimated Time:** 1 hour

**INPUT:**
- CafeKit logo requirements
- Navigation links: Home, Docs, GitHub
- Footer links: Documentation, GitHub, Haposoft

**OUTPUT:**
- `components/shared/navbar.tsx` with:
  - Logo (left)
  - Navigation links (center/right)
  - Mobile hamburger menu
  - Responsive design
- `components/shared/footer.tsx` with:
  - Links to docs, GitHub, Haposoft
  - Copyright text
- Both components TypeScript typed
- Responsive on mobile/tablet/desktop

**VERIFY:**
```bash
# Import in app/layout.tsx
# Start dev server
pnpm run dev
# → Open http://localhost:3000
# → Navbar visible at top
# → Footer visible at bottom
# → Click links → navigate correctly
# → Resize browser → mobile menu appears
```

**Rollback:** Remove components, revert layout.tsx

---

### Priority: P1 - Landing Page (Core Value)

#### **TASK 4: Build Hero Section**

**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `nextjs-react-expert`
**Priority:** P1 (High)
**Dependencies:** TASK 3
**Estimated Time:** 45 minutes

**INPUT:**
- Hero copy: "CafeKit - Smart agent kit for Antigravity & Claude Code"
- Install command: `npx @haposoft/cafekit-spec`
- CTA: "Read Documentation →" (links to /docs)

**OUTPUT:**
- `components/landing/hero.tsx` with:
  - Large heading with gradient text effect
  - Subtitle description
  - Install command in copyable code block
  - CTA button with hover effect
  - Centered layout
  - Responsive typography
- Component exported and typed

**VERIFY:**
```bash
# Import in app/page.tsx
pnpm run dev
# → Open http://localhost:3000
# → Hero section visible
# → Copy button works on install command
# → CTA button links to /docs
# → Text scales on mobile
```

**Rollback:** Remove hero.tsx, revert page.tsx

---

#### **TASK 5: Build Features Grid**

**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `tailwind-patterns`
**Priority:** P1 (High)
**Dependencies:** TASK 3
**Estimated Time:** 45 minutes

**INPUT:**
- 3 features:
  1. 🎯 Spec-Driven Workflow - "Structured development process"
  2. 🤖 20 Specialist Agents - "Frontend, backend, mobile, security"
  3. 🧩 39 Domain Skills - "Next.js, React Native, API patterns"

**OUTPUT:**
- `components/landing/features.tsx` with:
  - 3-column grid (responsive to 1 column on mobile)
  - Card component for each feature
  - Icon, title, description
  - Hover effects (lift, shadow)
  - Coffee brown accent colors
- TypeScript typed props

**VERIFY:**
```bash
# Import in app/page.tsx
pnpm run dev
# → 3 cards displayed in grid
# → Hover on card → lifts slightly
# → Mobile view → stacks vertically
# → Icons and text aligned
```

**Rollback:** Remove features.tsx, revert page.tsx

---

#### **TASK 6: Build Quick Start Section**

**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `nextjs-react-expert`
**Priority:** P1 (High)
**Dependencies:** TASK 3
**Estimated Time:** 30 minutes

**INPUT:**
- Quick start code example:
  ```bash
  npx @haposoft/cafekit-spec
  /spec-init my-feature
  ```
- Link to full quickstart guide

**OUTPUT:**
- `components/landing/quick-start.tsx` with:
  - Section heading "Quick Start"
  - Code block with syntax highlighting
  - Copy button
  - Link to /docs/getting-started/quickstart
  - Responsive layout
- Component exported and typed

**VERIFY:**
```bash
# Import in app/page.tsx
pnpm run dev
# → Quick start section visible
# → Code block syntax highlighted
# → Copy button copies code
# → Link navigates to quickstart doc
```

**Rollback:** Remove quick-start.tsx, revert page.tsx

---

#### **TASK 7: Assemble Landing Page**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`, `frontend-design`
**Priority:** P1 (High)
**Dependencies:** TASK 4, 5, 6
**Estimated Time:** 30 minutes

**INPUT:**
- Hero, Features, QuickStart components
- Layout requirements (spacing, max-width)

**OUTPUT:**
- `app/page.tsx` imports and renders:
  1. `<Hero />`
  2. `<Features />`
  3. `<QuickStart />`
- Sections properly spaced (py-12, py-20)
- Max width container (max-w-6xl mx-auto)
- Responsive padding
- SEO metadata (title, description)

**VERIFY:**
```bash
pnpm run dev
# → Open http://localhost:3000
# → All sections visible in order
# → Proper spacing between sections
# → No layout shifts
# → Mobile responsive
# → View source → meta tags present
```

**Rollback:** Revert page.tsx to default

---

### Priority: P2 - Docs Infrastructure (Scalability)

#### **TASK 8: Setup MDX Rendering**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`, `frontend-design`
**Priority:** P2 (Important)
**Dependencies:** TASK 1
**Estimated Time:** 1 hour

**INPUT:**
- MDX parsing requirements
- Frontmatter support (title, description)
- Custom components (CodeBlock, Callout, Cards)

**OUTPUT:**
- `lib/mdx.ts` with functions:
  - `getMDXFiles()` - list all .mdx files
  - `getMDXContent(slug)` - read and parse MDX file
  - `parseFrontmatter()` - extract metadata
- `components/docs/mdx-components.tsx` with custom components:
  - `<CodeBlock />` - syntax highlighted code
  - `<Callout />` - info/warning/error boxes
  - `<Cards />` - grid of linked cards
- TypeScript types for frontmatter
- Error handling for missing files

**VERIFY:**
```bash
# Create test MDX file
echo "---
title: Test
---
# Hello World" > content/docs/test.mdx

# Test parsing in Node REPL
node -e "const { getMDXContent } = require('./lib/mdx'); console.log(getMDXContent('test'))"
# → Returns parsed content with frontmatter
```

**Rollback:** Delete lib/mdx.ts, remove mdx-components.tsx

---

#### **TASK 9: Create Sidebar Navigation**

**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `nextjs-react-expert`
**Priority:** P2 (Important)
**Dependencies:** TASK 2
**Estimated Time:** 1 hour

**INPUT:**
- Sidebar config structure:
  - Getting Started (Installation, Quickstart)
  - Guides (Spec Workflow, Agents, Skills)
  - Reference (CLI, Agents List, Skills List)
- Mobile drawer behavior

**OUTPUT:**
- `content/config.ts` with `docsConfig` export:
  - Sidebar navigation tree
  - TypeScript typed structure
- `components/docs/sidebar.tsx` with:
  - Collapsible sections
  - Active link highlighting
  - Mobile drawer (hidden by default, toggle button)
  - Scroll to active item on load
- Responsive: drawer on mobile, fixed on desktop

**VERIFY:**
```bash
pnpm run dev
# → Open /docs page
# → Sidebar visible on desktop (left side)
# → Mobile: hamburger icon toggles sidebar
# → Click link → navigates and highlights active
# → Sections collapsible
```

**Rollback:** Remove sidebar.tsx, revert config.ts

---

#### **TASK 10: Create Docs Layout**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`, `frontend-design`
**Priority:** P2 (Important)
**Dependencies:** TASK 9
**Estimated Time:** 45 minutes

**INPUT:**
- Sidebar component
- Content area for MDX
- Table of contents (right sidebar)

**OUTPUT:**
- `app/docs/layout.tsx` with:
  - 3-column layout: Sidebar | Content | TOC
  - Responsive: mobile (stacked), tablet (2-col), desktop (3-col)
  - Proper spacing and max-widths
  - Scroll handling
- `components/docs/toc.tsx` (table of contents):
  - Auto-generate from MDX headings
  - Smooth scroll to section
  - Highlight active section on scroll

**VERIFY:**
```bash
pnpm run dev
# → Open /docs/test-page
# → Layout renders with 3 columns (desktop)
# → Sidebar on left, content in center, TOC on right
# → Mobile: TOC hidden, sidebar toggleable
# → TOC links scroll smoothly to headings
```

**Rollback:** Revert app/docs/layout.tsx

---

#### **TASK 11: Create Dynamic Docs Route**

**Agent:** `frontend-specialist`
**Skills:** `nextjs-react-expert`
**Priority:** P2 (Important)
**Dependencies:** TASK 8, 10
**Estimated Time:** 1 hour

**INPUT:**
- Dynamic route pattern: `/docs/[slug]`
- MDX parsing from `lib/mdx.ts`
- Custom MDX components

**OUTPUT:**
- `app/docs/[slug]/page.tsx` with:
  - Dynamic params parsing
  - `generateStaticParams()` for all MDX files
  - MDX content rendering via `next-mdx-remote`
  - Custom components applied
  - Metadata from frontmatter (title, description)
  - 404 handling for invalid slugs
- TypeScript typed params and props

**VERIFY:**
```bash
# Create test MDX
echo "---
title: Test Page
---
# Test Heading
Code example:
\`\`\`bash
echo 'test'
\`\`\`" > content/docs/test-page.mdx

pnpm run dev
# → Navigate to /docs/test-page
# → Heading renders
# → Code block syntax highlighted
# → 404 for /docs/invalid-page
```

**Rollback:** Delete app/docs/[slug] folder

---

### Priority: P3 - Content (Documentation)

#### **TASK 12: Write Installation Guide**

**Agent:** `documentation-writer`
**Skills:** `documentation-templates`
**Priority:** P3 (Nice-to-have)
**Dependencies:** TASK 11
**Estimated Time:** 45 minutes

**INPUT:**
- Installation steps:
  1. Prerequisites (Node.js 18+, Antigravity/Claude Code)
  2. Run `npx @haposoft/cafekit-spec`
  3. Verify installation
- Platform detection info

**OUTPUT:**
- `content/docs/getting-started/installation.mdx` with:
  - Frontmatter (title, description)
  - Prerequisites section
  - Step-by-step install instructions
  - Platform-specific notes (Antigravity vs Claude Code)
  - Verification commands
  - Troubleshooting tips
  - Next steps links

**VERIFY:**
```bash
pnpm run dev
# → Navigate to /docs/getting-started/installation
# → Content renders correctly
# → Code blocks syntax highlighted
# → Links to next steps work
# → Mobile readable
```

**Rollback:** Delete installation.mdx

---

#### **TASK 13: Write Quickstart Guide**

**Agent:** `documentation-writer`
**Skills:** `documentation-templates`
**Priority:** P3 (Nice-to-have)
**Dependencies:** TASK 11
**Estimated Time:** 1 hour

**INPUT:**
- Quickstart workflow:
  1. Run `/spec-init my-feature`
  2. Fill requirements
  3. Generate design doc
  4. Create tasks
  5. Implement
  6. Verify

**OUTPUT:**
- `content/docs/getting-started/quickstart.mdx` with:
  - Complete walkthrough of first spec workflow
  - Screenshots or code examples at each step
  - Expected outputs
  - Common pitfalls
  - Next steps (link to full spec workflow guide)

**VERIFY:**
```bash
pnpm run dev
# → Navigate to /docs/getting-started/quickstart
# → Step-by-step guide visible
# → Code examples copyable
# → Links to related guides work
```

**Rollback:** Delete quickstart.mdx

---

#### **TASK 14: Write Spec Workflow Guide**

**Agent:** `documentation-writer`
**Skills:** `documentation-templates`, `plan-writing`
**Priority:** P3 (Nice-to-have)
**Dependencies:** TASK 11
**Estimated Time:** 1.5 hours

**INPUT:**
- Spec workflow phases:
  1. Requirements gathering
  2. Design documentation
  3. Task breakdown
  4. Implementation
  5. Status tracking
- Best practices

**OUTPUT:**
- `content/docs/guides/spec-workflow.mdx` with:
  - Overview of spec-driven development
  - Each phase explained in detail
  - Examples from real features
  - When to use each command
  - Tips for effective specs
  - Troubleshooting

**VERIFY:**
```bash
pnpm run dev
# → Navigate to /docs/guides/spec-workflow
# → Comprehensive guide visible
# → Examples render correctly
# → Table of contents shows all sections
```

**Rollback:** Delete spec-workflow.mdx

---

#### **TASK 15: Create Docs Home Page**

**Agent:** `frontend-specialist`
**Skills:** `frontend-design`
**Priority:** P3 (Nice-to-have)
**Dependencies:** TASK 10
**Estimated Time:** 30 minutes

**INPUT:**
- Quick links to main doc sections
- 4 cards: Installation, Spec Workflow, Agents, Skills

**OUTPUT:**
- `app/docs/page.tsx` with:
  - Heading "Documentation"
  - 2x2 grid of linked cards:
    - 🚀 Installation
    - 📋 Spec Workflow
    - 🤖 Agents Reference
    - 🧩 Skills Reference
  - Each card links to respective doc
  - Responsive grid (2 cols on mobile)

**VERIFY:**
```bash
pnpm run dev
# → Navigate to /docs
# → 4 cards displayed in grid
# → Click card → navigates to correct page
# → Mobile: 2x2 grid adapts
```

**Rollback:** Revert app/docs/page.tsx

---

### Priority: P4 - Deployment (Launch)

#### **TASK 16: Configure Vercel Deployment**

**Agent:** `devops-engineer`
**Skills:** `deployment-procedures`
**Priority:** P4 (Launch)
**Dependencies:** TASK 7, 11
**Estimated Time:** 30 minutes

**INPUT:**
- Vercel account access
- Project name: cafekit
- Build settings: Next.js auto-detect
- Root directory: `website/`

**OUTPUT:**
- Vercel project configured
- Build settings verified:
  - Framework: Next.js
  - Build command: `pnpm run build`
  - Output directory: `.next`
  - Install command: `pnpm install`
  - Root directory: `website/`
- Environment variables (if needed)

**VERIFY:**
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login and link project
cd website
vercel login
vercel link

# Test build locally
pnpm run build
# → Build succeeds
# → No errors in output
```

**Rollback:** Remove Vercel project link

---

#### **TASK 17: Deploy to Vercel**

**Agent:** `devops-engineer`
**Skills:** `deployment-procedures`
**Priority:** P4 (Launch)
**Dependencies:** TASK 16
**Estimated Time:** 15 minutes

**INPUT:**
- Vercel project linked
- Production build verified

**OUTPUT:**
- Website deployed to Vercel
- Public URL active (e.g., `cafekit.vercel.app`)
- Auto-deploy on git push configured
- Preview deployments enabled

**VERIFY:**
```bash
# Deploy to production
vercel --prod

# → Deployment succeeds
# → URL returned (e.g., https://cafekit.vercel.app)

# Test deployed site
curl -I https://cafekit.vercel.app
# → Returns 200 OK

# Open in browser
# → Landing page loads
# → Navigate to /docs → works
# → All styles/scripts load
```

**Rollback:** Delete Vercel deployment

---

#### **TASK 18: Verify Production Build**

**Agent:** `test-engineer`
**Skills:** `webapp-testing`, `testing-patterns`
**Priority:** P4 (Launch)
**Dependencies:** TASK 17
**Estimated Time:** 30 minutes

**INPUT:**
- Deployed URL
- Checklist of features to verify

**OUTPUT:**
- Manual testing completed:
  - [ ] Landing page loads
  - [ ] Hero section visible
  - [ ] Features grid renders
  - [ ] Quick start code copyable
  - [ ] Navbar links work
  - [ ] Footer links work
  - [ ] /docs page loads
  - [ ] Sidebar navigation functional
  - [ ] MDX docs render correctly
  - [ ] Code syntax highlighting works
  - [ ] Table of contents functional
  - [ ] Mobile responsive
  - [ ] No console errors
- Lighthouse audit run
- Issues logged (if any)

**VERIFY:**
```bash
# Run Lighthouse audit
python /Users/luutrungnghia/projects/antigravity-kit/.claude/skills/performance-profiling/scripts/lighthouse_audit.py https://cafekit.vercel.app

# Check all pages
# → Performance score > 90
# → Accessibility score > 90
# → Best Practices score > 90
# → SEO score > 90
```

**Rollback:** N/A (testing only)

---

## Phase X: Verification (MANDATORY)

### Step 1: Code Quality Checks

```bash
cd /Users/luutrungnghia/projects/antigravity-kit/website

# Lint check
pnpm run lint
# → Expected: No errors

# Type check
npx tsc --noEmit
# → Expected: No TypeScript errors

# Build check
pnpm run build
# → Expected: Build succeeds, no warnings
```

### Step 2: UX Audit

```bash
# Run UX audit script
python /Users/luutrungnghia/projects/antigravity-kit/.claude/skills/frontend-design/scripts/ux_audit.py /Users/luutrungnghia/projects/antigravity-kit/website

# Expected checks:
# ✅ Fitts's Law - Click targets > 44px
# ✅ Hick's Law - Max 7 nav items
# ✅ Color contrast WCAG AA
# ✅ Touch targets for mobile
# ✅ Loading states present
```

### Step 3: Accessibility Check

```bash
# Run accessibility checker
python /Users/luutrungnghia/projects/antigravity-kit/.claude/skills/frontend-design/scripts/accessibility_checker.py /Users/luutrungnghia/projects/antigravity-kit/website

# Expected:
# ✅ Semantic HTML used
# ✅ Alt text on images
# ✅ ARIA labels where needed
# ✅ Keyboard navigation works
# ✅ Focus indicators visible
```

### Step 4: Performance Audit (Lighthouse)

```bash
# Start local server
pnpm run dev &

# Wait for server
sleep 5

# Run Lighthouse audit
python /Users/luutrungnghia/projects/antigravity-kit/.claude/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000

# Kill server
pkill -f "next dev"

# Expected scores:
# Performance: > 90
# Accessibility: > 90
# Best Practices: > 90
# SEO: > 90
```

### Step 5: Manual Verification

**Landing Page Checklist:**
- [ ] Hero section displays correctly
- [ ] Install command copyable
- [ ] CTA button links to /docs
- [ ] Features grid shows 3 cards
- [ ] Quick start section visible
- [ ] Navbar links functional
- [ ] Footer links functional
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] CafeKit theme colors applied (coffee brown primary)

**Docs Page Checklist:**
- [ ] /docs home page shows 4 cards
- [ ] Sidebar navigation visible (desktop)
- [ ] Sidebar toggles on mobile
- [ ] Active link highlighted
- [ ] MDX content renders
- [ ] Code blocks syntax highlighted
- [ ] Table of contents appears (desktop)
- [ ] TOC smooth scrolls to sections
- [ ] 404 page for invalid slugs
- [ ] Metadata (title, description) in head

**Deployment Checklist:**
- [ ] Deployed to Vercel
- [ ] Public URL accessible
- [ ] HTTPS enabled
- [ ] Auto-deploy on git push configured
- [ ] Preview deployments work
- [ ] No build errors in Vercel dashboard

### Step 6: Documentation Verification

```bash
# Check required docs exist
ls -la content/docs/getting-started/installation.mdx
ls -la content/docs/getting-started/quickstart.mdx
ls -la content/docs/guides/spec-workflow.mdx

# Verify frontmatter
head -5 content/docs/getting-started/installation.mdx
# → Should show:
# ---
# title: Installation
# description: ...
# ---
```

---

## Implementation Order

**CRITICAL PATH:** Tasks that MUST be done in sequence.

```
TASK 1 (Setup)
    ↓
TASK 2 (Theme)
    ↓
TASK 3 (Navbar/Footer) ─┬→ TASK 4 (Hero) ──┬→ TASK 7 (Assemble Landing)
                        ├→ TASK 5 (Features) ┘
                        └→ TASK 6 (Quick Start)

TASK 1 (Setup)
    ↓
TASK 8 (MDX)
    ↓
TASK 9 (Sidebar)
    ↓
TASK 10 (Docs Layout)
    ↓
TASK 11 (Dynamic Route) ─┬→ TASK 12 (Installation)
                         ├→ TASK 13 (Quickstart)
                         ├→ TASK 14 (Spec Workflow)
                         └→ TASK 15 (Docs Home)

TASK 7 + TASK 11
    ↓
TASK 16 (Configure Vercel)
    ↓
TASK 17 (Deploy)
    ↓
TASK 18 (Verify)
```

**PARALLEL OPPORTUNITIES:**
- TASK 4, 5, 6 (Landing components) can be built simultaneously after TASK 3
- TASK 12, 13, 14, 15 (Content) can be written simultaneously after TASK 11
- TASK 8 (MDX) and TASK 3 (Navbar) are independent and can run in parallel

---

## Risk Management

| Risk | Impact | Likelihood | Mitigation | Rollback |
|------|--------|------------|------------|----------|
| **MDX rendering fails** | High | Medium | Test with sample .mdx early (TASK 8) | Use static React components instead |
| **Vercel build fails** | High | Low | Test `pnpm run build` locally before deploy | Fix errors, redeploy |
| **Mobile layout breaks** | Medium | Medium | Test responsive at 375px, 768px, 1024px | Add media queries |
| **Syntax highlighting broken** | Medium | Low | Verify `rehype-highlight` integration in TASK 8 | Use plain code blocks temporarily |
| **Performance score < 90** | Low | Medium | Optimize images, lazy load components | Defer to post-launch |
| **Content incomplete** | Low | Medium | Prioritize P3 tasks (TASK 12-15) | Ship minimal docs, iterate |

---

## Day-by-Day Breakdown

### Day 1: Foundation + Landing (3 hours)

**Morning (1.5 hours):**
- TASK 1: Project setup (1h)
- TASK 2: Configure theme (30m)

**Afternoon (1.5 hours):**
- TASK 3: Navbar + Footer (1h)
- TASK 4: Hero section (30m)

**End of Day 1 Checkpoint:**
- [ ] Next.js project running
- [ ] CafeKit theme applied
- [ ] Navbar and footer visible
- [ ] Hero section on homepage

---

### Day 2: Landing Complete + Docs Start (2 hours)

**Morning (1 hour):**
- TASK 5: Features grid (45m)
- TASK 6: Quick start (15m)

**Afternoon (1 hour):**
- TASK 7: Assemble landing page (30m)
- TASK 8: Setup MDX rendering (30m start)

**End of Day 2 Checkpoint:**
- [ ] Landing page complete
- [ ] All 3 sections visible
- [ ] MDX parsing logic started

---

### Day 3: Docs Infrastructure (2.5 hours)

**Morning (1.5 hours):**
- TASK 8: Finish MDX (30m)
- TASK 9: Sidebar navigation (1h)

**Afternoon (1 hour):**
- TASK 10: Docs layout (45m)
- TASK 11: Dynamic route (15m start)

**End of Day 3 Checkpoint:**
- [ ] Sidebar functional
- [ ] Docs layout renders
- [ ] MDX files can be parsed

---

### Day 4: Docs Content + Deploy (2.5 hours)

**Morning (1.5 hours):**
- TASK 11: Finish dynamic route (45m)
- TASK 12: Installation guide (45m)

**Afternoon (1 hour):**
- TASK 13: Quickstart guide (30m)
- TASK 15: Docs home page (30m)

**End of Day 4 Checkpoint:**
- [ ] Core docs written
- [ ] /docs page functional
- [ ] Routes working

---

### Day 5: Deploy + Verify (1.5 hours)

**Morning (1 hour):**
- TASK 14: Spec workflow guide (1h)

**Afternoon (30 minutes):**
- TASK 16: Configure Vercel (15m)
- TASK 17: Deploy (15m)

**End of Day 5 Checkpoint:**
- [ ] Website deployed
- [ ] Public URL live

---

### Day 6: Final Verification (30 minutes)

**Anytime:**
- TASK 18: Verify production (30m)
- Phase X checks

**End of Day 6 (SPRINT COMPLETE):**
- [ ] All Phase X checks pass
- [ ] Lighthouse scores > 90
- [ ] No critical issues

---

## Definition of Done

**Sprint 1 is complete when:**

1. **Landing Page:**
   - [ ] Hero, features, quick start sections visible
   - [ ] All links functional
   - [ ] Mobile responsive
   - [ ] CafeKit theme applied

2. **Docs Infrastructure:**
   - [ ] Sidebar navigation works
   - [ ] MDX files render correctly
   - [ ] Code syntax highlighting active
   - [ ] Table of contents functional

3. **Content:**
   - [ ] Installation guide published
   - [ ] Quickstart guide published
   - [ ] Spec workflow guide published
   - [ ] Docs home page with quick links

4. **Deployment:**
   - [ ] Deployed to Vercel
   - [ ] Public URL accessible
   - [ ] Auto-deploy configured
   - [ ] No build errors

5. **Quality:**
   - [ ] Lighthouse Performance > 90
   - [ ] Lighthouse Accessibility > 90
   - [ ] No TypeScript errors
   - [ ] No console errors
   - [ ] UX audit passes
   - [ ] Accessibility check passes

---

## Post-Sprint Enhancements (Future Sprints)

**Sprint 2 Ideas:**
- Add search functionality (Algolia DocSearch)
- Auto-generate agent/skill reference docs from metadata
- Add dark mode toggle
- Create changelog page from CHANGELOG.md
- Add live code examples (CodeSandbox embeds)
- Create team page (Haposoft contributors)
- Add analytics (Vercel Analytics)
- Create OpenGraph images for social sharing

---

## Notes

- **Folder Location:** Create `/website` in project root (NOT inside `.claude/` or `web/`)
- **Package Manager:** Use `pnpm` consistently
- **No Legacy Folders:** Do NOT modify `.agent/`, `.claude/`, or `web/` during this sprint
- **Content Strategy:** Start minimal (3 core docs), iterate based on user feedback
- **Design Philosophy:** Docs-first (simple landing, comprehensive documentation)
- **Performance:** Optimize images, lazy load non-critical components, use Next.js Image
- **SEO:** Add metadata to all pages, sitemap.xml, robots.txt
- **Monitoring:** Setup Vercel Analytics post-launch to track usage

---

**Created:** 2026-01-30
**Estimated Completion:** 6 days (split sessions)
**Status:** Ready to implement

