# Rename Plan: antigravity-kit → cafekit

**STATUS: IN PROGRESS - Manual rename approach (Approach B) selected**

## Files Requiring Updates (41 files)

### **Critical Files (Must Update):**

#### **1. Root Documentation:**
- [ ] `README.md`
- [ ] `CLAUDE.md`
- [ ] `CHANGELOG.md`
- [ ] `AGENT_FLOW.md`
- [ ] `package.json`
- [ ] `package-lock.json`

#### **2. Documentation Files (.docs/):**
- [ ] `.docs/CAFEKIT-ROADMAP.md` (just created)
- [ ] `.docs/SYSTEM-COMPARISON.md`
- [ ] `.docs/claude-code-cli/ASKUSERQUESTION-SUMMARY.md`
- [ ] `.docs/claude-code-cli/ASKUSERQUESTION-INTEGRATION.md`
- [ ] `.docs/claude-code-cli/BRAINSTORMING-ANALYSIS.md`
- [ ] `.docs/claude-code-cli/BOOTSTRAP-EVIDENCE.md`
- [ ] `.docs/claude-code-cli/FLOW-ANALYSIS.md`
- [ ] `.docs/drawio/agent-architecture.drawio`

#### **3. Claude Code Plugin:**
- [ ] `.claude/README.md`
- [ ] `.claude/.claude-plugin/plugin.json`
- [ ] `.claude/scripts/validate_dispatcher.py`
- [ ] `.claude/scripts/session_manager.py`
- [ ] `.claude/scripts/bootstrap.py`
- [ ] `.claude/scripts/auto_preview.py`

#### **4. Antigravity Agent:**
- [ ] `.agent/ARCHITECTURE.md`
- [ ] `.agent/rules/GEMINI.md`
- [ ] `.agent/skills/doc.md`
- [ ] `.agent/scripts/session_manager.py`
- [ ] `.agent/scripts/auto_preview.py`
- [ ] `.agent/scripts/verify_all.py`
- [ ] `.agent/scripts/checklist.py`

#### **5. Spec Files:**
- [ ] `.specs/dark-mode-toggle/requirements.md`
- [ ] `.specs/dark-mode-toggle/design.md`

#### **6. Web Demo (Optional - Can keep or remove):**
- [ ] `web/README.md`
- [ ] `web/package.json`
- [ ] `web/src/app/page.tsx`
- [ ] `web/src/app/layout.tsx`
- [ ] `web/src/app/docs/page.tsx`
- [ ] `web/src/app/docs/layout.tsx`
- [ ] `web/src/app/docs/guide/examples/web-app/page.tsx`
- [ ] `web/src/app/docs/agents/page.tsx`
- [ ] `web/src/app/docs/installation/page.tsx`
- [ ] `web/src/app/docs/cli/page.tsx`
- [ ] `web/src/components/layout/header/index.tsx`
- [ ] `web/src/components/layout/header/components/mobile-menu.tsx`
- [ ] `web/src/components/layout/footer/index.tsx`

---

## Rename Patterns

### **Pattern 1: Project Name**
```
antigravity-kit → cafekit
Antigravity Kit → CafeKit
ANTIGRAVITY-KIT → CAFEKIT
```

### **Pattern 2: URLs & Paths**
```
/Users/luutrungnghia/projects/antigravity-kit
→ /Users/luutrungnghia/projects/cafekit

github.com/yourteam/antigravity-kit
→ github.com/haposoft/cafekit
```

### **Pattern 3: NPM Package Names**
```
@yourteam/antigravity-kit → @haposoft/cafekit
antigravity-kit → cafekit
```

### **Pattern 4: Descriptions**
```
"Antigravity Kit - a tool..."
→ "CafeKit - a tool..."

"comprehensive agent kit for Antigravity"
→ "comprehensive agent kit for Antigravity & Claude Code"
```

---

## Recommended Approach

### **Option A: Automated Rename (Fast, 10 mins)**

**Pros:**
- ✅ Fast (10 minutes for all files)
- ✅ Consistent
- ✅ No missed references

**Cons:**
- ⚠️ May break some web demo links
- ⚠️ Need to review all changes

**Command:**
```bash
# Find and replace in all files
find . -type f \( -name "*.md" -o -name "*.json" -o -name "*.py" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -exec sed -i '' 's/antigravity-kit/cafekit/g' {} +

find . -type f \( -name "*.md" -o -name "*.json" -o -name "*.py" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -exec sed -i '' 's/Antigravity Kit/CafeKit/g' {} +
```

---

### **Option B: Manual Rename Critical Files Only (Safe, 30 mins)**

**Pros:**
- ✅ Safer (manual review)
- ✅ Keep web demo as-is (optional)
- ✅ Focus on distribution files only

**Cons:**
- ⏱️ Takes longer
- ⚠️ May miss some references

**Files to manually update:**
1. Root files (6 files)
2. Documentation (8 files)
3. Plugin files (4 files)
4. Agent files (7 files)
5. Spec files (2 files)

**Total:** 27 critical files (skip web demo 14 files)

---

### **Option C: Git Rename + Content Update (Preserves History, 20 mins)**

**Pros:**
- ✅ Preserves git history
- ✅ Clean commit
- ✅ Safe

**Cons:**
- ⏱️ Two-step process

**Steps:**
```bash
# Step 1: Rename directory (preserves history)
cd ..
git mv antigravity-kit cafekit
cd cafekit

# Step 2: Update content references
# (Use find/replace from Option A)
```

---

## My Recommendation for Haposoft

**Use Option C (Git Rename + Content Update)**

### **Why:**
1. Preserves git history for future reference
2. Clean transition
3. Professional rename
4. Maintains commit history for "who changed what"

### **Steps:**

#### **Step 1: Rename Directory (2 mins)**
```bash
cd /Users/luutrungnghia/projects
git mv antigravity-kit cafekit
cd cafekit
```

#### **Step 2: Update Critical Files (15 mins)**
```bash
# Update package.json
vim package.json
# Change name: "antigravity-kit" → "cafekit"

# Update CLAUDE.md
vim CLAUDE.md
# Find/replace all references

# Update README.md
vim README.md
# Update title, descriptions

# Update .claude/.claude-plugin/plugin.json
vim .claude/.claude-plugin/plugin.json
# Update plugin name
```

#### **Step 3: Automated Replace (5 mins)**
```bash
# Replace remaining references
find . -type f \( -name "*.md" -o -name "*.json" -o -name "*.py" \) \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -not -path "./web/*" \
  -exec sed -i '' 's/antigravity-kit/cafekit/g' {} +
```

#### **Step 4: Commit (2 mins)**
```bash
git add .
git commit -m "refactor: rename antigravity-kit to cafekit

- Rename project to CafeKit by Haposoft
- Update all documentation references
- Update package names to @haposoft/cafekit
- Preserve web demo (legacy references OK)

BREAKING CHANGE: Project renamed from antigravity-kit to cafekit
"
```

---

## Questions for You

### **Q1: Web Demo Folder**
```
❓ Có muốn keep web demo không?
   [ ] Keep (giữ references cũ, chỉ update README)
   [ ] Update all references in web/ too
   [ ] Remove web/ folder (không cần demo)
```

### **Q2: Git Rename**
```
❓ Có muốn rename git directory không?
   [ ] Yes - mv antigravity-kit → cafekit (preserves history)
   [ ] No - keep current folder, just update content
```

### **Q3: Approach**
```
❓ Dùng approach nào?
   [ ] Option A - Automated (fast)
   [ ] Option B - Manual critical only (safe)
   [ ] Option C - Git rename + update (recommended)
```

---

## After Rename

### **Update GitHub:**
```bash
# Update remote URL
git remote set-url origin https://github.com/haposoft/cafekit.git

# Push renamed project
git push origin main
```

### **Update Clone Instructions:**
```bash
# Old:
git clone https://github.com/yourteam/antigravity-kit.git

# New:
git clone https://github.com/haposoft/cafekit.git
```

---

Bạn muốn tôi proceed với Option nào?
