# Setup Guide

> How to set up and run CafeKit (antigravity-kit) locally.

---

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | >= 18.0 | `node -v` |
| pnpm | >= 8.0 | `pnpm -v` |
| Python | >= 3.11 | `python3 --version` |
| Git | >= 2.0 | `git --version` |

---

## Quick Start

```bash
# 1. Clone repository
git clone git@github.com:hapo-nghialuu/hapo-cafekit.git
cd hapo-cafekit

# 2. Install dependencies
pnpm install

# 3. Run development (all packages)
pnpm dev
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development for all packages in parallel |
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests for all packages |
| `pnpm clean` | Clean node_modules and build artifacts |

---

## Demo Website (cafekit-web)

```bash
# Navigate to demo web
cd cafekit-web

# Install dependencies (if not done from root)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Demo runs at `http://localhost:3000`

### Demo Web Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.1.3 | React framework with App Router |
| React | 19.2.3 | UI library |
| Tailwind CSS | v4 | Styling |
| TypeScript | ^5 | Type safety |

---

## Project Structure

```
antigravity-kit/
├── .claude/           # CafeKit plugin (agents, skills, commands)
│   ├── agents/        # 20 specialist agents
│   ├── skills/        # 66 domain skills
│   ├── commands/      # 18 slash commands
│   └── docs/          # Project documentation
├── cafekit-web/       # Demo website (Next.js 16.1.3)
├── packages/          # Shared packages
│   └── spec/          # Spec utilities
└── package.json       # Root monorepo config (pnpm)
```

---

## Troubleshooting

### Port already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Dependencies not installing

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Python scripts not running

```bash
# Ensure Python 3.11+
python3 --version

# Install if needed (macOS)
brew install python@3.11
```

---

## See Also

- Deploy: `DEPLOY.md`
- Main docs: `../../README.md`
