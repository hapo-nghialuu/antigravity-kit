# System Architecture

## Overview
Hybrid architecture consisting of a CLI tool/Agent configuration and a companion Web Application.

## Components
| Component | Tech | Purpose |
|-----------|------|---------|
| CLI / Agents | Node.js / Antigravity | AI coding assistance and automation logic |
| Web Frontend | React / Next.js | User interface for interacting with CafeKit features |
| Documentation | Markdown | Static documentation site or reference |

## API Structure
- Slash commands guide the AI agent interactions.
- Workflow files (`.agent/workflows/*.md`) define procedural logic.
