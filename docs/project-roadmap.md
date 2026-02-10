# Project Roadmap

## Current Status (v2.0.0)

### Completed ✅

- [x] Core spec-driven workflow (6 commands)
  - `/spec-init` - Initialize feature specification
  - `/spec-requirements` - Generate EARS-format requirements
  - `/spec-design` - Create technical design
  - `/spec-tasks` - Break down into implementable tasks
  - `/spec-impl` - Implement specific tasks
  - `/spec-status` - Check spec progress

- [x] Multi-platform support
  - Claude Code (`.claude/` directory)
  - Antigravity (`.agent/` directory)

- [x] Documentation website
  - Next.js 16 + Tailwind CSS v4
  - Multi-language support (English, Vietnamese)
  - MDX-based content
  - Dark/light theme support

- [x] NPM package distribution
  - `@haposoft/cafekit-spec` published
  - CLI installer with auto-detection

- [x] Skill library
  - 40+ skills in `.agent/skills/`
  - Covers api-patterns, app-builder, architecture, database-design, frontend-design, etc.

## Short Term (30 days)

### Features

- [ ] Additional language support
  - Japanese documentation
  - Korean documentation

- [ ] More skill templates
  - Mobile app development (React Native, Flutter)
  - AI/ML integration patterns
  - Security best practices

- [ ] Integration examples
  - Example projects using CafeKit workflow
  - Sample specs for common features

- [ ] Video tutorials
  - Getting started guide
  - Spec workflow walkthrough
  - Platform setup instructions

### Improvements

- [ ] Enhanced error handling in commands
- [ ] Better progress tracking in `/spec-status`
- [ ] Spec templates for different project types

## Medium Term (90 days)

### Features

- [ ] VS Code extension
  - Inline spec commands
  - Spec file tree view
  - Progress visualization

- [ ] Web-based spec editor
  - Visual spec creation
  - Drag-and-drop task management
  - Real-time collaboration

- [ ] Community skill sharing
  - Skill marketplace
  - Rating and review system
  - Import/export skills

- [ ] Automated testing integration
  - Test generation from specs
  - Coverage tracking
  - CI/CD pipeline templates

### Technical

- [ ] Migrate to Next.js 17 (when available)
- [ ] Implement proper error boundaries
- [ ] Add comprehensive E2E tests
- [ ] Performance optimization for docs site

## Long Term (6 months)

### Features

- [ ] AI-powered spec generation
  - Natural language to spec conversion
  - Auto-requirement detection
  - Smart task breakdown

- [ ] Real-time collaboration
  - Multi-user spec editing
  - Comments and discussions
  - Version control for specs

- [ ] Enterprise features
  - SSO integration
  - Team management
  - Audit logs
  - Custom branding

- [ ] Plugin ecosystem
  - Third-party integrations
  - Custom command support
  - Webhook support

### Expansion

- [ ] Support for additional AI platforms
  - GitHub Copilot extensions
  - Cursor IDE integration
  - Windsurf support

- [ ] Mobile companion app
  - Spec status tracking
  - Push notifications
  - Mobile-optimized workflow

## Tech Debt

### Current

- [ ] Standardize skill formats between `.claude/` and `.agent/`
- [ ] Consolidate duplicate conventions documentation
- [ ] Improve repomix configuration for better AI context

### Planned

- [ ] Refactor documentation website components
- [ ] Optimize build times
- [ ] Reduce bundle size
- [ ] Improve TypeScript strictness

## Infrastructure

### Completed

- [x] Vercel deployment for docs
- [x] NPM package publishing
- [x] GitHub repository setup

### Planned

- [ ] Automated testing pipeline
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] Automated dependency updates

## Metrics

### Current Baseline

- GitHub Stars: Track growth
- NPM Downloads: Monitor weekly
- Website Traffic: Vercel Analytics
- Community Engagement: Discord/Discussions

### Targets

- **3 months**: 100+ GitHub stars
- **6 months**: 1000+ NPM downloads/month
- **12 months**: 10+ community contributions

## Release Schedule

| Version | Target Date | Features |
|---------|-------------|----------|
| v2.1.0 | +30 days | Languages, skills, examples |
| v2.2.0 | +60 days | VS Code extension beta |
| v3.0.0 | +90 days | Web editor, testing |
| v3.1.0 | +120 days | AI features, collaboration |

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to help with roadmap items.

Priority areas for contributors:
1. Skill templates
2. Documentation translations
3. Example projects
4. Bug fixes and testing
