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
cafekit/                           # Main project (renamed)
├── packages/                      # NPM packages (Week 1-2)
│   ├── spec/                      # @haposoft/cafekit-spec
│   └── cli/                       # @haposoft/cafekit (future)
│
├── website/                       # 🆕 NEW - Official website
│   ├── app/                       # Next.js 15 App Router
│   │   ├── page.tsx               # Landing page (/)
│   │   ├── docs/
│   │   │   ├── page.tsx           # Docs home (/docs)
│   │   │   ├── getting-started/
│   │   │   │   ├── installation/page.tsx
│   │   │   │   └── quickstart/page.tsx
│   │   │   ├── guides/
│   │   │   │   ├── spec-workflow/page.tsx
│   │   │   │   ├── agents/page.tsx
│   │   │   │   └── skills/page.tsx
│   │   │   ├── reference/
│   │   │   │   ├── cli/page.tsx
│   │   │   │   ├── agents/page.tsx
│   │   │   │   └── skills/page.tsx
│   │   │   └── layout.tsx         # Docs sidebar
│   │   └── layout.tsx             # Root layout
│   │
│   ├── components/
│   │   ├── landing/
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   └── quick-start.tsx
│   │   ├── docs/
│   │   │   ├── sidebar.tsx
│   │   │   ├── toc.tsx            # Table of contents
│   │   │   └── code-block.tsx
│   │   └── shared/
│   │       ├── navbar.tsx
│   │       └── footer.tsx
│   │
│   ├── content/                   # 🔑 Markdown docs (easier to edit)
│   │   ├── docs/
│   │   │   ├── getting-started/
│   │   │   │   ├── installation.mdx
│   │   │   │   └── quickstart.mdx
│   │   │   ├── guides/
│   │   │   │   ├── spec-workflow.mdx
│   │   │   │   ├── agents.mdx
│   │   │   │   └── skills.mdx
│   │   │   └── reference/
│   │   │       ├── cli-commands.mdx
│   │   │       ├── agents-list.mdx
│   │   │       └── skills-list.mdx
│   │   └── config.ts              # Sidebar config
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
│
├── web/                           # OLD demo (keep for reference)
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
      <h3>Spec-Driven Workflow</h3>
      <p>Structured development process</p>
    </Card>
    <Card>
      <Icon>🤖</Icon>
      <h3>20 Specialist Agents</h3>
      <p>Frontend, backend, mobile, security</p>
    </Card>
    <Card>
      <Icon>🧩</Icon>
      <h3>39 Domain Skills</h3>
      <p>Next.js, React Native, API patterns</p>
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
- `/docs/guides/agents` - How to use agents
- `/docs/guides/skills` - How to use skills
- `/docs/guides/contributing` - How to contribute

**Reference:**
- `/docs/reference/cli-commands` - All CLI commands
- `/docs/reference/agents` - 20 agents catalog
- `/docs/reference/skills` - 39 skills catalog
- `/docs/reference/workflows` - 17 workflows

**Examples:**

```mdx
// content/docs/getting-started/installation.mdx
---
title: Installation
description: Install CafeKit in your project
---

# Installation

CafeKit can be installed via npx (no global install needed).

## Prerequisites

- Node.js 18+
- Antigravity Editor or Claude Code CLI

## Install Spec Skills

```bash
npx @haposoft/cafekit-spec
```

This will:
1. Detect your platform (Antigravity or Claude Code)
2. Create `.agent/workflows/` or `.claude/commands/` folder
3. Copy 6 spec skills

## Verify Installation

```bash
# For Antigravity
ls .agent/workflows/spec-*.md

# For Claude Code
ls .claude/commands/spec-*.md
```

You should see:
- `spec-init.md`
- `spec-requirements.md`
- `spec-design.md`
- `spec-tasks.md`
- `spec-impl.md`
- `spec-status.md`

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
        { title: "Using Agents", href: "/docs/guides/agents" },
        { title: "Using Skills", href: "/docs/guides/skills" },
        { title: "Contributing", href: "/docs/guides/contributing" }
      ]
    },
    {
      title: "Reference",
      items: [
        { title: "CLI Commands", href: "/docs/reference/cli-commands" },
        { title: "Agents", href: "/docs/reference/agents" },
        { title: "Skills", href: "/docs/reference/skills" },
        { title: "Workflows", href: "/docs/reference/workflows" }
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
   - Subtitle: "Smart agent kit for Antigravity & Claude Code"
   - Install command: `npx @haposoft/cafekit-spec`
   - CTA: "Read Documentation →"

2. Features
   - 🎯 Spec-Driven Workflow
   - 🤖 20 Specialist Agents
   - 🧩 39 Domain Skills

3. Quick Start
   - Code example
   - Link to quickstart guide

4. Footer
   - GitHub link
   - Haposoft link
   - Documentation link

---

### **Documentation Sections:**

**1. Getting Started**
- Installation (npx command, platform detection)
- Quickstart (first spec workflow)

**2. Guides**
- Spec Workflow (complete tutorial)
- Using Agents (how to invoke, when to use)
- Using Skills (how skills work, loading)
- Contributing (how to add agents/skills)

**3. Reference**
- CLI Commands (all commands with examples)
- Agents (20 agents catalog with descriptions)
- Skills (39 skills catalog with use cases)
- Workflows (17 workflows list)

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
- ⭐ Auto-generate agent/skill docs from metadata
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
2. Auto-generate reference docs
3. Add search functionality

---

Bạn muốn tôi bắt đầu implement ngay không? Tôi có thể:

1. ✅ Create `/website` folder với Next.js setup
2. ✅ Build landing page component
3. ✅ Setup docs layout với sidebar
4. ✅ Write sample documentation content

Hoặc bạn muốn tôi clarify thêm về phần nào trước?
