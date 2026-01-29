# CafeKit - Distribution Roadmap for Haposoft

> **Organization:** Haposoft
> **GitHub:** https://github.com/haposoft
> **NPM Registry:** Private npm registry
> **Target Platform:** Google Antigravity + Claude Code CLI
> **Update Frequency:** Weekly
> **Installation:** npx (no global install)

---

## 📊 Project Overview

### **Goal:**
Distribute agent kit to all Haposoft projects with smart initialization based on project analysis.

### **Current Status:**
- ✅ 6 spec skills tested and ready
- ⏳ Other agents/skills pending testing
- 📦 Ready for Week 1-2 MVP (spec skills only)

### **Phased Approach:**
```
Week 1-2: MVP (Spec Skills Only)
Week 3-4: Add Project Analyzer
Week 5-8: Gradual Agent Addition (TBD based on testing)
Week 9+:  Full Kit Rollout
```

---

## 🎯 Week 1-2: MVP - Spec Skills Distribution

### **Deliverable:**
`@haposoft/cafekit-spec` package với 6 spec skills

### **Features:**
- ✅ Platform detection (Antigravity vs Claude Code)
- ✅ Auto-copy 6 spec skills to correct location
- ✅ Support both `.agent/workflows/` and `.claude/commands/`
- ✅ No global installation needed (npx only)

### **Tasks Breakdown:**

#### **Task 1: Rename Project (30 mins)**
```bash
# Current: antigravity-kit
# New: cafekit

Files to update:
- Package names
- Documentation references
- README files
- CLAUDE.md
```

#### **Task 2: Create Monorepo Structure (1 hour)**
```
cafekit/
├── packages/
│   ├── spec/                    # @haposoft/cafekit-spec
│   └── cli/                     # @haposoft/cafekit (future)
├── scripts/
├── pnpm-workspace.yaml
└── package.json
```

#### **Task 3: Extract Spec Skills (2 hours)**
```
@haposoft/cafekit-spec/
├── bin/
│   └── install.js               # CLI installer
├── src/
│   ├── antigravity/
│   │   └── workflows/
│   │       ├── spec-init.md
│   │       ├── spec-requirements.md
│   │       ├── spec-design.md
│   │       ├── spec-tasks.md
│   │       ├── spec-impl.md
│   │       └── spec-status.md
│   └── claude/
│       └── commands/
│           └── (same 6 files)
├── package.json
└── README.md
```

#### **Task 4: Implement CLI Installer (3 hours)**
```javascript
// bin/install.js
Features:
- Detect platform (.agent/ or .claude/)
- Prompt if not detected
- Copy 6 spec files to correct location
- Skip if file exists
- Success message with next steps
```

#### **Task 5: Local Testing (1 hour)**
```bash
# Test Scenarios:
1. Fresh Next.js project (Claude Code)
2. Fresh React Native project (Antigravity)
3. Existing project with .agent/ folder
4. Existing project with .claude/ folder
5. Project without either folder (prompt user)
```

#### **Task 6: Documentation (1 hour)**
```markdown
README.md:
- Installation instructions (npx @haposoft/cafekit-spec)
- Usage examples
- Troubleshooting
- Team-specific notes for Haposoft
```

#### **Task 7: Private Registry Setup (1 hour)**
```bash
# Setup .npmrc for Haposoft private registry
# Publish instructions
# Access control for team members
```

---

## 📦 Package Details

### **@haposoft/cafekit-spec**

**package.json:**
```json
{
  "name": "@haposoft/cafekit-spec",
  "version": "0.1.0",
  "description": "Spec-Driven Development workflow for Haposoft projects",
  "author": "Haposoft <nghialt@haposoft.com>",
  "license": "UNLICENSED",
  "private": true,
  "bin": {
    "cafekit-spec": "./bin/install.js"
  },
  "files": ["bin", "src", "README.md"],
  "publishConfig": {
    "registry": "https://npm.haposoft.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/haposoft/cafekit.git"
  },
  "keywords": [
    "haposoft",
    "antigravity",
    "claude-code",
    "spec-driven",
    "workflow"
  ]
}
```

**Installation:**
```bash
# For Haposoft team members
npx @haposoft/cafekit-spec

# Result:
# → Detects platform (Antigravity or Claude Code)
# → Copies 6 spec skills to .agent/workflows/ or .claude/commands/
# → Ready to use /spec-init
```

---

## 🔬 Week 3-4: Add Project Analyzer

### **Deliverable:**
`@haposoft/cafekit` CLI với smart analysis

### **Features:**
- 🔍 Auto-detect framework (Next.js, React Native, Express, etc.)
- 🔍 Auto-detect features (auth, API, database, payments)
- 💡 Recommend agents/skills based on project type
- 📦 Smart installation of recommended components

### **New Commands:**
```bash
npx @haposoft/cafekit init         # Smart init with analysis
npx @haposoft/cafekit analyze      # Analyze only (no install)
npx @haposoft/cafekit add <name>   # Add specific agent/skill
npx @haposoft/cafekit list         # Show available agents/skills
```

### **Analysis Output Example:**
```
🔍 Analyzing project...

📊 Project Analysis:
  Platform: claude
  Framework: nextjs
  Language: typescript
  Type: fullstack-web
  Database: prisma

📦 Recommended Agents:
  ⭐ frontend-specialist - Next.js detected
  ⭐ backend-specialist - API routes found
  ○ database-architect - Prisma schema detected

🧩 Recommended Skills:
  ⭐ spec-driven-development - Tested workflow
  ⭐ nextjs-react-expert - Performance optimization
  ○ database-design - Schema optimization

Install recommended? (Y/n)
```

---

## 📈 Week 5-8: Gradual Agent Addition (TBD)

**To be decided based on:**
1. Which agents Haposoft tests first
2. Priority based on common project types
3. Team feedback from Week 1-4

**Candidate agents for early addition:**
- `frontend-specialist` (for Next.js/React projects)
- `backend-specialist` (for API projects)
- `mobile-developer` (if Haposoft has RN projects)
- `security-auditor` (for auth/payment features)

---

## 🚀 Week 9+: Full Kit Rollout

**Target state:**
- All 20 agents available
- All 39 skills available
- All 17 commands available
- Smart recommendations working
- Version management established
- Team training complete

---

## 📝 Usage Workflow (After Week 1-2 MVP)

### **Scenario 1: New Haposoft Project**
```bash
# Developer starts new Next.js project
npx create-next-app hapo-crm

cd hapo-crm

# Install CafeKit spec workflow
npx @haposoft/cafekit-spec

# Result: .claude/commands/spec-*.md installed

# Use spec workflow
/spec-init user-management
/spec-requirements user-management
/spec-design user-management
/spec-tasks user-management
/spec-impl user-management 1.1
```

### **Scenario 2: Existing Haposoft Project**
```bash
cd existing-hapo-project

# Install spec workflow
npx @haposoft/cafekit-spec

# If already has .agent/ or .claude/ → Auto-detected
# If not → Prompt to choose platform
```

---

## 🔐 Private Registry Setup

### **Option 1: Verdaccio (Self-hosted)**
```bash
# Install Verdaccio
npm install -g verdaccio

# Start server
verdaccio

# Configure team .npmrc
npm set registry https://npm.haposoft.com
npm login
```

### **Option 2: GitHub Packages (Easier)**
```bash
# Use GitHub Packages as private registry
# .npmrc in cafekit project:
@haposoft:registry=https://npm.pkg.github.com

# Team members authenticate:
npm login --scope=@haposoft --registry=https://npm.pkg.github.com
```

### **Option 3: Artifactory/Nexus (Enterprise)**
```bash
# If Haposoft already has Artifactory/Nexus
# Point to existing registry
```

**Recommended for Haposoft:** GitHub Packages (free + easy)

---

## 📊 Success Metrics

### **Week 1-2 MVP Success:**
- ✅ 5+ Haposoft projects successfully install spec skills
- ✅ Zero installation errors reported
- ✅ Developers use /spec-init successfully
- ✅ Positive feedback from team

### **Week 3-4 Analyzer Success:**
- ✅ Analyzer correctly detects 90% of project types
- ✅ Recommendations match team expectations
- ✅ Reduces manual setup time by 50%

### **Full Rollout Success:**
- ✅ 50%+ of Haposoft projects use CafeKit
- ✅ Weekly updates adopted smoothly
- ✅ Team contributes back improvements (fork + PR)

---

## 🤝 Team Collaboration

### **For Contributors:**
```bash
# Fork cafekit on GitHub
git clone https://github.com/yourname/cafekit.git

# Make improvements
cd cafekit/packages/spec
vim src/claude/commands/spec-init.md

# Test locally
pnpm link --global
cd test-project
npx @haposoft/cafekit-spec

# Submit PR
git push origin feature/improve-spec-init
# → Open PR to haposoft/cafekit
```

### **For Maintainer (You):**
```bash
# Review PR
# Merge if useful for all Haposoft projects
# Reject if too project-specific

# Weekly release cycle
git tag v0.2.0
npm publish
# → All teams get update on next npx
```

---

## 📞 Support & Questions

**For Haposoft Team:**
- Internal Slack channel: #cafekit-support
- Documentation: https://github.com/haposoft/cafekit
- Issues: https://github.com/haposoft/cafekit/issues

---

## 🎯 Next Immediate Actions

### **Action 1: Rename Project (NOW)**
```bash
cd antigravity-kit
# Rename references to cafekit
```

### **Action 2: Create Monorepo (Week 1)**
```bash
mkdir cafekit
cd cafekit
pnpm init
# Setup workspace structure
```

### **Action 3: Extract Spec Package (Week 1)**
```bash
cd packages/spec
# Copy 6 spec skills
# Implement installer
```

### **Action 4: Test (Week 1)**
```bash
# Test with 2-3 Haposoft sample projects
# Get feedback
```

### **Action 5: Publish (Week 2)**
```bash
# Setup private registry
npm publish
# Announce to team
```

---

**Ready to proceed with Action 1 (Rename)?** I can help you rename all references from antigravity-kit to cafekit.
