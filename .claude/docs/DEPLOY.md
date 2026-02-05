# Deployment Guide

> How to deploy this project to production.

---

## Quick Deploy

```bash
# Build and deploy
npm run build
npm run deploy
```

---

## Environments

| Environment | URL | Branch | Auto-deploy |
|-------------|-----|--------|-------------|
| Development | `localhost:3000` | `develop` | No |
| Staging | `staging.example.com` | `staging` | Yes |
| Production | `example.com` | `main` | Manual |

---

## Deployment Checklist

### Pre-deployment
- [ ] All tests passing (`npm test`)
- [ ] No lint errors (`npm run lint`)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Build successful (`npm run build`)

### Post-deployment
- [ ] Health check passing
- [ ] Smoke tests passing
- [ ] Logs monitored for errors
- [ ] Rollback plan ready

---

## Platform-Specific

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Docker
```bash
# Build image
docker build -t app-name .

# Run container
docker run -p 3000:3000 app-name

# Push to registry
docker push registry/app-name:latest
```

### Manual Server
```bash
# SSH to server
ssh user@server

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production

# Build
npm run build

# Restart service
pm2 restart app-name
```

---

## Environment Variables (Production)

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Use production database |
| `NODE_ENV` | Yes | Set to `production` |
| `API_KEY` | Yes | Production API key |

---

## Rollback

```bash
# Revert to previous deployment
git revert HEAD
git push origin main

# Or restore previous Docker image
docker pull registry/app-name:previous-tag
docker-compose up -d
```

---

## Monitoring

| Tool | Purpose | Dashboard |
|------|---------|-----------|
| Sentry | Error tracking | sentry.io |
| Datadog | Performance | datadoghq.com |
| Vercel Analytics | Web vitals | vercel.com |

---

## See Also

- Setup: `SETUP.md`
- Architecture: `ARCHITECTURE.md`
- Troubleshooting: `TROUBLESHOOTING.md`
