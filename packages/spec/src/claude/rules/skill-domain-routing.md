# Skill Domain Routing

Use this decision tree to choose domain skills from the installed CafeKit skill set. This is advisory routing, not an automatic hook.

## Frontend And UI

```text
User wants to...
├── choose style, color, layout, UX, design system       -> /hapo:frontend-design
├── build React/TypeScript UI components                 -> /hapo:frontend-development
├── optimize React/Next.js performance or rerenders      -> /hapo:react-best-practices
├── apply deep UI/UX intelligence, visual polish         -> /hapo:ui-ux-pro-max
└── test UI in browser                                   -> /hapo:web-testing or /hapo:agent-browser
```

Use `/hapo:react-best-practices` for performance/re-render patterns. Use `/hapo:frontend-development` for normal implementation.

## Backend, Data, And Infrastructure

```text
User wants to...
├── API, service, auth, database-backed feature          -> /hapo:backend-development
├── deployment, Docker, Kubernetes, Cloudflare, CI/CD     -> /hapo:devops
├── mobile apps, iOS, Android, React Native, Flutter     -> /hapo:mobile-development
└── impact of changing existing behavior                 -> /hapo:impact-analysis
```

## Codebase Understanding

```text
User wants to...
├── answer questions from source code/docs/specs/config    -> /hapo:question
├── find files, locate code, scan project structure       -> /hapo:inspect
├── diagnose an error or failing check                    -> /hapo:debug
├── understand possible side effects                      -> /hapo:impact-analysis
└── compare external approaches or best practices         -> /hapo:research
```

Local source truth comes from `/hapo:inspect`; external/current knowledge comes from `/hapo:research`.

## Documentation

```text
User wants to...
├── ask/answer documentation questions from source         -> /hapo:question
├── create missing project docs                           -> /hapo:docs --init
├── update docs after source changes                      -> /hapo:docs --update
├── summarize codebase quickly                            -> /hapo:docs --summarize
├── reconstruct as-is docs from legacy source code        -> /hapo:docs --reconstruct <scope>
└── create a future feature spec                          -> /hapo:specs
```

Keep as-is reconstruction separate from future requirements. Reconstructed docs document current behavior; specs define requested changes.

## Testing And Browser

```text
User wants to...
├── run test suites, coverage, scoped verification        -> /hapo:test
├── E2E/unit/integration/load/security/a11y strategy      -> /hapo:web-testing
├── drive a browser with snapshots or Browserbase         -> /hapo:agent-browser
└── Chrome DevTools/Puppeteer evidence                    -> /hapo:chrome-devtools
```

## Documents And Media

```text
User wants to...
├── PowerPoint/slides                                     -> /hapo:pptx
├── Word documents                                        -> /hapo:docx
├── PDFs                                                  -> /hapo:pdf
├── spreadsheets/CSV/XLSX                                 -> /hapo:xlsx
└── image/audio/video/document multimodal analysis        -> /hapo:ai-multimodal
```

## Git And Release

```text
User wants to...
├── commit, branch, tag, push, release prep               -> /hapo:git
└── review before release                                 -> /hapo:code-review
```

## Usage Notes

- Read the selected skill's `SKILL.md` before acting.
- Do not activate a skill only because one keyword appears. Use the whole user intent.
- If a task spans multiple domains, name the primary skill and mention the secondary skill in the plan.
- If no domain skill fits, use the core CafeKit workflow in `skill-workflow-routing.md`.
