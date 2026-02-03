# CafeKit Official Website Plan

> **Tech Stack:** Next.js 15 + Tailwind CSS 4 + TypeScript
> **Hosting:** Vercel
> **URL:** cafekit.dev (or docs.haposoft.com/cafekit)
> **Style:** Docs-first (simple hero + comprehensive documentation)

---

## 🎯 Goals

1. **Landing Page:** Simple, elegant intro to CafeKit
2. **Documentation:** Comprehensive guides for Haposoft team
3. **SEO-Friendly:** Good for discovery
4. **Easy to Update:** Team can contribute docs via markdown

---

## 📂 Project Structure

```
cafekit/                           # Main project
├── packages/                      # NPM packages
│   └── spec/                      # @haposoft/cafekit-spec
│
├── cafekit-web/                   # ✅ ACTIVE - Official website
│   ├── src/                       # Next.js 15 App Router
│   │   ├── app/                   # App routes
│   │   └── components/            # React components
│   ├── content/                   # 🔑 Markdown docs (easier to edit)
│   │   └── docs/
│   │       ├── index.mdx          # Docs home
│   │       ├── getting-started/
│   │       │   ├── installation.mdx
│   │       │   └── quickstart.mdx
│   │       └── guides/
│   │           └── spec-workflow.mdx
│   ├── public/
│   └── package.json
│
├── .claude/                       # ✅ ACTIVE - Spec workflow commands
│   └── commands/                  # 6 spec workflow commands
│       ├── spec-init.md
│       ├── spec-requirements.md
│       ├── spec-design.md
│       ├── spec-tasks.md
│       ├── spec-impl.md
│       └── spec-status.md
│
└── .docs/                         # Internal docs (not published)
```

---

## 🎨 Design System (Based on Docs-First Style)

### **Inspiration:**
- **VitePress** - Clean, minimal, fast
- **Next.js Docs** - Modern, searchable
- **Supabase** - Developer-friendly

### **Color Palette (CafeKit Theme):**
```css
/* Primary - Coffee Brown */
--primary: #6F4E37        /* Coffee brown */
--primary-dark: #4A3320   /* Dark roast */
--primary-light: #A67C52  /* Latte */

/* Accent - Cream */
--accent: #F5E6D3         /* Cream */
--accent-dark: #E8D4B8    /* Darker cream */

/* Neutral - Clean */
--background: #FFFFFF     /* White */
--surface: #F9FAFB        /* Light gray */
--border: #E5E7EB         /* Border gray */

/* Text */
--text-primary: #111827   /* Almost black */
--text-secondary: #6B7280 /* Gray */
--text-muted: #9CA3AF     /* Light gray */

/* Code */
--code-bg: #1E293B        /* Dark slate */
--code-text: #E2E8F0      /* Light text */
```

### **Typography:**
```css
/* Fonts */
font-family:
  /* Body */ 'Inter', sans-serif
  /* Headings */ 'Cal Sans', 'Inter', sans-serif
  /* Code */ 'JetBrains Mono', monospace

/* Scale */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
```

---

## 📄 Page Breakdown

### **1. Landing Page (/)** - Simple Hero

```tsx
// app/page.tsx
<main>
  {/* Hero Section */}
  <section className="py-20">
    <h1>CafeKit</h1>
    <p>Smart agent kit for Antigravity & Claude Code</p>
    <code>npx @haposoft/cafekit-spec</code>
    <Link href="/docs">Read Documentation →</Link>
  </section>

  {/* Features (3 cards) */}
  <section className="py-12">
    <Card>
      <Icon>🎯</Icon>
      <h3>6-Phase Workflow</h3>
      <p>From requirements to implementation</p>
    </Card>
    <Card>
      <Icon>📋</Icon>
      <h3>Structured Specs</h3>
      <p>Clear documentation for every feature</p>
    </Card>
    <Card>
      <Icon>🚀</Icon>
      <h3>AI-Guided</h3>
      <p>Step-by-step implementation help</p>
    </Card>
  </section>

  {/* Quick Start */}
  <section className="py-12">
    <h2>Quick Start</h2>
    <CodeBlock>
      npx @haposoft/cafekit-spec
      /spec-init my-feature
    </CodeBlock>
  </section>
</main>
```

**Estimated time:** 2 hours to build

---

### **2. Documentation Home (/docs)** - Docs Hub

```tsx
// app/docs/page.tsx
<main>
  <h1>Documentation</h1>

  {/* Quick Links Grid */}
  <Grid>
    <Card href="/docs/getting-started/installation">
      <h3>🚀 Installation</h3>
      <p>Get CafeKit running in 2 minutes</p>
    </Card>
    <Card href="/docs/guides/spec-workflow">
      <h3>📋 Spec Workflow</h3>
      <p>Learn spec-driven development</p>
    </Card>
    <Card href="/docs/reference/agents">
      <h3>🤖 Agents Reference</h3>
      <p>All 20 specialist agents</p>
    </Card>
    <Card href="/docs/reference/skills">
      <h3>🧩 Skills Reference</h3>
      <p>Browse 39 domain skills</p>
    </Card>
  </Grid>
</main>
```

**Estimated time:** 1 hour to build

---

### **3. Docs Pages (MDX-based)**

#### **Structure:**

**Getting Started:**
- `/docs/getting-started/installation` - How to install
- `/docs/getting-started/quickstart` - First spec workflow

**Guides:**
- `/docs/guides/spec-workflow` - Complete spec-driven guide
- `/docs/guides/contributing` - How to contribute

**Examples:**

```mdx
// content/docs/getting-started/installation.mdx
---
title: Installation
description: Install CafeKit Spec in your project
---

# Installation

CafeKit Spec can be installed via npx (no global install needed).

## Prerequisites

- Node.js 18+
- Claude Code CLI

## Install CafeKit Spec

```bash
npx @haposoft/cafekit-spec
```

This will:
1. Detect your project structure
2. Create `.claude/commands/` folder
3. Copy 6 spec workflow commands

## What Gets Installed

CafeKit Spec installs to `.claude/commands/`:

```
.claude/commands/
├── spec-init.md           # Initialize new spec
├── spec-requirements.md   # Gather requirements
├── spec-design.md         # Create design doc
├── spec-tasks.md          # Generate task breakdown
├── spec-impl.md           # Implementation guide
└── spec-status.md         # Track progress
```

**Total: 6 spec workflow commands**

## Verify Installation

Open Claude Code and type:

```
/spec-init
```

You should see the spec initialization workflow start.

## Next Steps

<Cards>
  <Card href="/docs/getting-started/quickstart">
    📖 Follow Quickstart Guide
  </Card>
  <Card href="/docs/guides/spec-workflow">
    🎯 Learn Spec Workflow
  </Card>
</Cards>
```

**Estimated time:**
- 3 hours for content writing
- 1 hour for MDX setup

---

### **4. Sidebar Navigation**

```tsx
// content/config.ts
export const docsConfig = {
  sidebar: [
    {
      title: "Getting Started",
      items: [
        { title: "Installation", href: "/docs/getting-started/installation" },
        { title: "Quickstart", href: "/docs/getting-started/quickstart" }
      ]
    },
    {
      title: "Guides",
      items: [
        { title: "Spec Workflow", href: "/docs/guides/spec-workflow" },
        { title: "Contributing", href: "/docs/guides/contributing" }
      ]
    }
  ]
};
```

---

## 🚀 Implementation Plan

### **Phase 1: Setup Project (1 hour)**

```bash
cd /Users/luutrungnghia/projects/antigravity-kit
mkdir website
cd website

# Create Next.js project
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
pnpm add @tailwindcss/typography
pnpm add next-mdx-remote         # For MDX support
pnpm add rehype-highlight        # Code syntax highlighting
pnpm add lucide-react            # Icons
```

**Update package.json:**
```json
{
  "name": "cafekit-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

### **Phase 2: Build Landing Page (2 hours)**

**Components:**
1. Hero section with install command
2. Features grid (3 cards)
3. Quick start code block
4. Footer with links

**File:** `app/page.tsx`

---

### **Phase 3: Setup Docs Infrastructure (2 hours)**

**Tasks:**
1. Create docs layout with sidebar
2. Setup MDX rendering
3. Create table of contents component
4. Add code block syntax highlighting

**Files:**
- `app/docs/layout.tsx`
- `components/docs/sidebar.tsx`
- `components/docs/mdx-components.tsx`

---

### **Phase 4: Write Documentation Content (4 hours)**

**Priority docs:**
1. Installation guide
2. Quickstart tutorial
3. Spec workflow guide
4. Agents reference (auto-generate from metadata)
5. Skills reference (auto-generate from metadata)

**Format:** MDX files in `content/docs/`

---

### **Phase 5: Deploy to Vercel (30 mins)**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
cd website
vercel

# Follow prompts:
# Project name: cafekit
# Framework: Next.js
# Root directory: ./
```

**Custom domain (optional):**
- `cafekit.dev` (if buy domain)
- `cafekit.vercel.app` (free Vercel subdomain)
- `docs.haposoft.com/cafekit` (if Haposoft has domain)

---

## 📊 Timeline

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1 | Setup Next.js project | 1h | ⏳ Pending |
| 2 | Build landing page | 2h | ⏳ Pending |
| 3 | Setup docs infrastructure | 2h | ⏳ Pending |
| 4 | Write documentation content | 4h | ⏳ Pending |
| 5 | Deploy to Vercel | 30m | ⏳ Pending |
| **Total** | | **9.5 hours** | |

**Can be split across:**
- Day 1: Phase 1-2 (setup + landing) - 3 hours
- Day 2: Phase 3 (docs infrastructure) - 2 hours
- Day 3: Phase 4 (content writing) - 4 hours
- Day 4: Phase 5 (deploy) - 30 mins

---

## 🎯 Content Outline

### **Landing Page Sections:**
1. Hero
   - Title: "CafeKit"
   - Subtitle: "Spec-driven development workflow for Claude Code"
   - Install command: `npx @haposoft/cafekit-spec`
   - CTA: "Read Documentation →"

2. Features
   - 🎯 6-Phase Spec Workflow
   - 📋 Structured Documentation
   - 🚀 AI-Guided Implementation

3. Quick Start
   - Code example
   - Link to quickstart guide

4. Footer
   - GitHub link (vudovn/cafekit)
   - Documentation link

---

### **Documentation Sections:**

**1. Getting Started**
- Installation (npx command, platform detection)
- Quickstart (first spec workflow)

**2. Guides**
- Spec Workflow (complete tutorial)
- Contributing (how to contribute)

---

## 🔧 Technical Features

### **Must-Have:**
- ✅ MDX support for docs
- ✅ Syntax highlighting for code blocks
- ✅ Responsive sidebar
- ✅ Table of contents
- ✅ Search (Algolia DocSearch - free for open source)
- ✅ Dark mode toggle

### **Nice-to-Have:**
- ⭐ Auto-generate spec documentation
- ⭐ Live code examples (CodeSandbox embeds)
- ⭐ Changelog page (from CHANGELOG.md)
- ⭐ Team page (Haposoft contributors)

---

## 💡 Next Steps

### **Immediate (Today):**
1. Create `/website` folder
2. Setup Next.js project
3. Build basic landing page

### **This Week:**
1. Setup docs infrastructure
2. Write core documentation (installation, quickstart)
3. Deploy to Vercel

### **Next Week:**
1. Write comprehensive guides
2. Create spec templates and examples
3. Add search functionality

---

Bạn muốn tôi bắt đầu implement ngay không? Tôi có thể:

1. ✅ Create `/website` folder với Next.js setup
2. ✅ Build landing page component
3. ✅ Setup docs layout với sidebar
4. ✅ Write sample documentation content

Hoặc bạn muốn tôi clarify thêm về phần nào trước?
