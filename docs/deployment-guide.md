# Deployment Guide

## Platform

The CafeKit documentation website is deployed on **Vercel**.

- **Framework**: Next.js 16
- **Platform**: Vercel
- **Domain**: https://cafekit.vercel.app

## Quick Deploy

### Prerequisites

- Node.js 18+
- pnpm
- Vercel account (for production deployment)

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Or from root with workspace
pnpm --filter cafekit-web dev
```

### Production Build

```bash
# Build for production
pnpm --filter cafekit-web build

# The output will be in cafekit-web/.next/
```

### Deploy to Vercel

```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod

# Or push to main branch (auto-deploy)
git push origin main
```

## Environment Variables

Create a `.env.local` file in `cafekit-web/` if needed:

```bash
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://cafekit.vercel.app
```

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Monorepo Deployment

### Structure

```
root/
├── cafekit-web/        # Deploy this directory
├── packages/
└── ...
```

### Vercel Configuration

For monorepo deployment on Vercel:

1. **Root Directory**: `cafekit-web`
2. **Build Command**: `pnpm build`
3. **Output Directory**: `.next`

Or use `vercel.json` in root:

```json
{
  "buildCommand": "cd cafekit-web && pnpm build",
  "outputDirectory": "cafekit-web/.next",
  "installCommand": "pnpm install"
}
```

## NPM Package Publishing

### @haposoft/cafekit-spec

```bash
# Navigate to package
cd packages/spec

# Update version
npm version patch|minor|major

# Publish
npm publish --access public
```

### Automated Publishing

```bash
# Login to npm (first time)
npm login

# Publish
npm publish --access public
```

## Continuous Deployment

### GitHub Actions (if configured)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm --filter cafekit-web build
      - run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Pre-deployment Checklist

- [ ] All tests passing
- [ ] Lint checks passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] SEO meta tags present
- [ ] Analytics configured (if applicable)
- [ ] 404 page working
- [ ] Sitemap generated

## Post-deployment Verification

1. **Homepage loads** - https://cafekit.vercel.app
2. **Documentation pages** - Check all major routes
3. **Dark mode toggle** - Verify theme switching
4. **Mobile responsiveness** - Test on mobile devices
5. **Performance** - Check Lighthouse scores
6. **Links** - Verify all internal links work

## Rollback

### Vercel

1. Go to Vercel Dashboard
2. Select project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "Promote to Production"

### Emergency Rollback

```bash
# Revert to previous commit
git revert HEAD
git push

# Or force deploy specific commit
vercel --prod -c <commit-hash>
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
pnpm --filter cafekit-web build
npx @next/bundle-analyzer cafekit-web/.next
```

### Image Optimization

- Use Next.js `<Image>` component
- Enable `images.remotePatterns` in `next.config.js`
- Use appropriate image formats (WebP, AVIF)

### Static Generation

```tsx
// Use generateStaticParams for dynamic routes
export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}
```

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf cafekit-web/.next
rm -rf node_modules
pnpm install
pnpm --filter cafekit-web build
```

### MDX Errors

- Check frontmatter syntax
- Verify MDX component imports
- Check for special characters in content

### Vercel Deployment Issues

1. Check build logs in Vercel dashboard
2. Verify environment variables
3. Check Node.js version compatibility
4. Ensure `output: 'standalone'` if using App Router

## Domain Configuration

### Custom Domain (if needed)

1. Add domain in Vercel dashboard
2. Update DNS records
3. Configure SSL certificate
4. Update `NEXT_PUBLIC_SITE_URL`

```javascript
// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};
```
