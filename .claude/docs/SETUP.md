# Setup Guide

> How to set up and run this project locally.

---

## Quick Start

```bash
# 1. Clone repository
git clone <repo-url>
cd <project-name>

# 2. Install dependencies
npm install  # or pnpm install / yarn

# 3. Set up environment
cp .env.example .env
# Edit .env with your values

# 4. Run development server
npm run dev
```

---

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | >= 18.0 | `node -v` |
| npm/pnpm | >= 8.0 | `npm -v` |
| Git | >= 2.0 | `git --version` |

---

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Database connection string | `postgresql://...` |
| `API_KEY` | Yes | API authentication key | `sk-...` |
| `NODE_ENV` | No | Environment mode | `development` |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests |
| `npm run lint` | Run linter |
| `npm run format` | Format code |

---

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (if available)
npx prisma db seed
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
rm -rf node_modules package-lock.json
npm install
```

### Database connection failed
- Check `DATABASE_URL` in `.env`
- Ensure database server is running
- Verify network connectivity

---

## See Also

- Deploy: `DEPLOY.md`
- Testing: `TESTING.md`
- Architecture: `ARCHITECTURE.md`
