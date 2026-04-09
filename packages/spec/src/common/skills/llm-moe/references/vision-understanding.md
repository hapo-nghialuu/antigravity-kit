# Vision Understanding

The `hapo:llm-moe` skill leverages the `visual-analyze.js` agent-compatible script to convert unstructured screenshots and pictures into structured JSON insights.

## Quick Start (Node.js)

To parse an image, run the script from bash:

```bash
cd <skills_dir>/llm-moe/scripts
npm install  # (only required on first setup to load @google/generative-ai)

node visual-analyze.js \
  --image "../../test/screenshots/ui-error.png" \
  --prompt "Find the login button and describe its visual state."
```

## Prompt Engineering for Vision

To get the most accurate layout results from `gemma-4-31b-it` or `gemini-2.5-flash`, structure your `--prompt` effectively:

### Regression Testing (UI Checks)
Instead of asking "Is it broken?", ask for explicit state analysis:
> `"List all elements that are overlapping. Determine if the main text is cut off by the border constraints. Return only the issues found."`

### Component Identification
> `"Identify the CSS Hex color of the top primary button and describe its corner radius visually."`

### Accessibility Visual Check
> `"Look at the form inputs in this image. Do their text contrasts against the background seem accessible? Are the labels visually aligned with the inputs?"`

## Technical Details

- **Supported Inputs:** PNG, JPEG, WEBP.
- **Size Limitation:** Try to keep screenshots under 4MB to ensure fast tokenization.
- **Model Loading:** The script creates an inline base64 string and embeds it directly into the Prompt Part payload of the `@google/generative-ai` request matrix.
