# CafeKit 101 Slides

This folder contains the CafeKit 101 seminar slide materials.

## Files

```text
docs/seminars/slides/
├── cafekit-101-slides.md                 # Marp source for the full deck
├── cafekit-101-branded-slides.pdf        # Final branded PDF export
├── cafekit-101-branded-slides.pptx       # Final branded PowerPoint export
├── cafekit-101-appendix.md               # Marp source for appendix-only deck
├── cafekit-101-appendix.pdf              # Appendix-only PDF export
├── cafekit-101-appendix.pptx             # Appendix-only PowerPoint export
├── cafekit-101-speaker-notes.md          # Facilitator notes
└── README.md                             # Build/export instructions
```

## Preview

Recommended editor preview:

- Install the "Marp for VS Code" extension.
- Open `cafekit-101-slides.md`.
- Use "Open Preview".

## Export Without Installing Dependencies

From the repository root:

```bash
npx @marp-team/marp-cli docs/seminars/slides/cafekit-101-slides.md --html
npx @marp-team/marp-cli docs/seminars/slides/cafekit-101-slides.md --pdf --allow-local-files --output docs/seminars/slides/cafekit-101-branded-slides.pdf
npx @marp-team/marp-cli docs/seminars/slides/cafekit-101-slides.md --pptx --allow-local-files --output docs/seminars/slides/cafekit-101-branded-slides.pptx
npx @marp-team/marp-cli docs/seminars/slides/cafekit-101-appendix.md --pdf --allow-local-files --output docs/seminars/slides/cafekit-101-appendix.pdf
npx @marp-team/marp-cli docs/seminars/slides/cafekit-101-appendix.md --pptx --allow-local-files --output docs/seminars/slides/cafekit-101-appendix.pptx
```

Generated final outputs are written next to the markdown files:

```text
docs/seminars/slides/cafekit-101-slides.html
docs/seminars/slides/cafekit-101-branded-slides.pdf
docs/seminars/slides/cafekit-101-branded-slides.pptx
docs/seminars/slides/cafekit-101-appendix.pdf
docs/seminars/slides/cafekit-101-appendix.pptx
```

## Suggested Seminar Flow

Use the deck in one of three modes:

| Mode | Duration | Slides |
|---|---:|---|
| Executive overview | 45-60 min | 1-24, 37-42 |
| Technical seminar | 90 min | Full deck, shortened live demo |
| Hands-on workshop | 2.5-3h | Full deck + lab |

## Live Demo Commands

```bash
mkdir triage-dashboard
cd triage-dashboard
npx @haposoft/cafekit@0.8.11
claude
```

Inside Claude Code:

```text
/hapo:specs Build a customer support triage dashboard that helps support agents prioritize tickets, filter work, inspect ticket details, and update ticket status
/hapo:specs customer-support-triage-dashboard --validate
/hapo:develop customer-support-triage-dashboard
/hapo:test customer-support-triage-dashboard
/hapo:code-review --pending
```

Only run `/hapo:develop` after `spec.json` has `ready_for_implementation = true`.

## Recommended Checkpoints

Prepare these branches/tags before a live seminar:

```text
demo-00-empty
demo-01-installed
demo-02-specs-generated
demo-03-specs-validated
demo-04-developed
demo-05-tested-reviewed
```
