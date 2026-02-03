# Team Onboarding: Using @haposoft/cafekit-spec

## Quick Setup (5 minutes)

### Step 1: Get GitHub Token

1. Go to: https://github.com/settings/tokens
2. Generate new token with `read:packages` scope
3. Copy token (starts with `ghp_`)

### Step 2: Configure npm

Add to `~/.npmrc`:
```
@haposoft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### Step 3: Install in Project

```bash
cd your-project
npx @haposoft/cafekit-spec
```

Done! You now have 6 spec workflow commands.

## What You Get

### Workflow Commands

| Command | Purpose |
|---------|---------|
| `/spec-init` | Initialize feature spec |
| `/spec-requirements` | Generate requirements |
| `/spec-design` | Create technical design |
| `/spec-tasks` | Break down tasks |
| `/spec-impl` | Implement task |
| `/spec-status` | Check progress |

### File Structure

After installation, you'll see:

**Google Antigravity Format (.agent/):**
```
.agent/
├── workflows/
│   ├── spec-init.md
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── spec-impl.md
│   └── spec-status.md
└── templates/
    └── spec-template.md
```

**Claude Code Format (.claude/):**
```
.claude/
├── commands/
│   ├── spec-init.md
│   ├── spec-requirements.md
│   ├── spec-design.md
│   ├── spec-tasks.md
│   ├── spec-impl.md
│   └── spec-status.md
└── templates/
    └── spec-template.md
```

## Basic Usage

### 1. Start a New Feature

```bash
# In your IDE with Claude Code or Antigravity
/spec-init user-authentication
```

This creates: `.specs/user-authentication/`

### 2. Generate Requirements

```bash
/spec-requirements user-authentication
```

Creates: `.specs/user-authentication/requirements.md`

### 3. Create Technical Design

```bash
/spec-design user-authentication
```

Creates: `.specs/user-authentication/design.md`

### 4. Break Down Tasks

```bash
/spec-tasks user-authentication
```

Creates: `.specs/user-authentication/tasks/sprint-1.md`

### 5. Implement Tasks

```bash
/spec-impl user-authentication 1
```

Implements task #1 from sprint plan.

### 6. Check Progress

```bash
/spec-status user-authentication
```

Shows completion status and blockers.

## Full Workflow Example

```bash
# 1. Initialize
/spec-init payment-gateway

# 2. Requirements (answers user questions)
/spec-requirements payment-gateway

# 3. Design (proposes architecture)
/spec-design payment-gateway

# 4. Tasks (creates sprint plan)
/spec-tasks payment-gateway

# 5. Implement each task
/spec-impl payment-gateway 1
/spec-impl payment-gateway 2
...

# 6. Check status
/spec-status payment-gateway
```

## What Makes CafeKit Different?

### Traditional Approach
```
User: "Build user login"
AI: *writes code immediately*
Result: Missing edge cases, no tests, no docs
```

### CafeKit Approach
```
User: "/spec-init user-login"
AI: *asks clarifying questions*
User: *answers*
AI: *generates requirements doc*
User: "/spec-design user-login"
AI: *proposes architecture*
User: "/spec-tasks user-login"
AI: *creates detailed task plan*
User: "/spec-impl user-login 1"
AI: *implements with tests, docs, validation*
```

**Result:** Complete, tested, documented feature.

## Common Questions

### Q: Do I need to install in every project?

**A:** Yes, each project needs its own copy of workflow files. This allows project-specific customization.

### Q: What if I already have .agent/ or .claude/?

**A:** The installer checks for conflicts and asks before overwriting. You can merge manually if needed.

### Q: Can I customize the workflows?

**A:** Yes! After installation, edit the workflow files to fit your team's process.

### Q: What if the package updates?

**A:** Run `npx @haposoft/cafekit-spec` again to reinstall. Installer will show what changed.

### Q: Does this work with Cursor/Windsurf/other IDEs?

**A:** Yes, for Google Antigravity format (.agent/). Claude Code format (.claude/) requires Claude Code CLI.

## Troubleshooting

### Error: 401 Unauthorized

**Solution:** Check your GitHub token in ~/.npmrc

```bash
cat ~/.npmrc | grep npm.pkg.github.com
```

### Error: Command not found

**Solution:** Make sure you're in a project directory

```bash
cd your-project
npx @haposoft/cafekit-spec
```

### Workflows not showing in IDE

**Solution:** Restart your IDE after installation

```bash
# Close and reopen your IDE
# Or reload window (VSCode: Cmd+Shift+P → "Reload Window")
```

## IDE-Specific Setup

### Claude Code CLI

Workflows automatically discovered from `.claude/commands/`

### Windsurf/Cursor (Antigravity)

Workflows automatically discovered from `.agent/workflows/`

### VSCode with AI Extensions

May need manual configuration. Check your extension's documentation.

## Best Practices

### 1. Always Start with /spec-init

Don't skip directly to coding. The spec workflow prevents mistakes.

### 2. Answer Questions Thoroughly

The AI asks questions for a reason. Detailed answers = better output.

### 3. Review Generated Docs

Requirements and design docs are starting points. Review and refine.

### 4. Implement Tasks in Order

Tasks are ordered by dependency. Don't skip ahead.

### 5. Use /spec-status Regularly

Track progress and identify blockers early.

## Next Steps

1. **Read the full guide:** `.specs/cafekit/publishing/npm-publishing-guide.md`
2. **Start a feature:** `/spec-init my-feature`
3. **Follow the workflow:** init → requirements → design → tasks → impl
4. **Share feedback:** #cafekit-support (Slack)

## Support

- **Slack:** #cafekit-support
- **Email:** nghialt@haposoft.com
- **Docs:** https://github.com/haposoft/cafekit
- **Issues:** https://github.com/haposoft/cafekit/issues

---

**Welcome to CafeKit!** Enjoy spec-driven development.

**Last Updated:** 2026-02-02
**Package Version:** 0.1.0
