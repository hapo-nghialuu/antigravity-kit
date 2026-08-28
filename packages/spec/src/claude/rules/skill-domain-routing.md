# Skill Domain Routing

Advisory routing for installed domain skills (not an automatic hook). Read the selected skill's `SKILL.md` before acting.

| Domain / intent | Skill |
|---|---|
| answer questions from source code/docs/specs/config | `/hapo:ask` |
| file discovery, structure, blast radius | `/hapo:scout` |
| style / layout / design system | `/hapo:frontend-design` |
| React/TypeScript UI implementation | `/hapo:frontend-development` |
| React/Next performance / re-renders | `/hapo:react-best-practices` |
| deep UI/UX polish | `/hapo:ui-ux-pro-max` |
| API, service, auth, database | `/hapo:backend-development` |
| deploy / Docker / K8s / Cloudflare / CI | `/hapo:devops` |
| mobile (RN / Flutter / iOS / Android) | `/hapo:mobile-development` |
| docs init / update / summarize | `/hapo:docs --init` / `--update` / `--summarize` |
| as-is reconstruction from legacy code | `/hapo:docs --reconstruct <scope>` |
| future feature requirements | `/hapo:specs` |
| run suites / scoped verification | `/hapo:test` |
| E2E / load / a11y strategy | `/hapo:web-testing` |
| browser snapshots / Browserbase | `/hapo:agent-browser` |
| Chrome DevTools evidence | `/hapo:chrome-devtools` |
| diagnose error / CI failure | `/hapo:debug` |
| external best practices / tool compare | `/hapo:research` |
| pptx / docx / pdf / xlsx / multimodal | `/hapo:pptx` / `docx` / `pdf` / `xlsx` / `ai-multimodal` |
| commit / branch / release prep | `/hapo:git` |
| review before release | `/hapo:code-review` |

Pick one primary domain skill; name a secondary only when it changes execution. If none fit, use `skill-workflow-routing.md`.
