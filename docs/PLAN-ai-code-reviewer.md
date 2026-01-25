# Plan: Custom AI Code Reviewer (GitHub Actions + Gemini)

## Goal Description
Implement a "White Box" AI Code Review system where a custom Python script runs inside GitHub Actions. It will fetch Pull Request changes, filter them, send them to Google Gemini for analysis, and post review comments back to the PR. This approach offers maximum control over costs, context, and review quality.

## User Review Required
> [!IMPORTANT]
> **API Key Required**: You will need a Google Gemini API Key. It must be stored in your GitHub Repository Secrets as `GEMINI_API_KEY`.

> [!NOTE]
> **Token Usage**: This script will be optimized to only send necessary text (code diffs). However, large PRs might still consume significant tokens. We will implement basic filtering to mitigate this.

## Proposed Changes

### Architecture
1.  **GitHub Action Workflow**: Triggers on `pull_request` types (opened, synchronized). Sets up Python, installs dependencies, and runs the script.
2.  **Python Script (`scripts/ai_reviewer.py`)**:
    *   **Input**: `GITHUB_TOKEN`, `GEMINI_API_KEY`, and PR Context (from `GITHUB_EVENT_PATH`).
    *   **Logic**:
        1.  Connect to GitHub API via `PyGithub`.
        2.  Get the current Pull Request object.
        3.  Iterate through `pr.get_files()`.
        4.  **Filter**: Ignore `package-lock.json`, `dist/`, images, deleted files.
        5.  **Prompting**: Construct a prompt for Gemini `1.5-flash` (balanced speed/cost) asking for review in JSON format.
        6.  **Response Handling**: Parse JSON response.
        7.  **Commenting**: Post comments to the exact line in the PR diff.

### Component: Scripts
#### [NEW] [ai_reviewer.py](file:///Users/nghialuutrung/Desktop/antigravity-kit/scripts/ai_reviewer.py)
The core logic script. It will use:
*   `PyGithub`: To interact with the repository and PRs.
*   `google-generativeai`: To communicate with Gemini.

#### [NEW] [requirements.txt](file:///Users/nghialuutrung/Desktop/antigravity-kit/scripts/requirements.txt)
Dependencies for the script:
```text
PyGithub
google-generativeai
```

### Component: Workflows
#### [NEW] [ai-review.yml](file:///Users/nghialuutrung/Desktop/antigravity-kit/.github/workflows/ai-review.yml)
The workflow file to orchestrate the process.

## Verification Plan

### Automated Tests
*   Since this relies on external APIs (GitHub, Google), true automated unit tests are mocking-heavy.
*   **Dry Run Mode**: We can implement a `--dry-run` flag in the script to print what *would* be commented instead of actually commenting.

### Manual Verification
1.  Create a dummy PR with some obvious "bad code" (e.g., `console.log` with secrets, infinite loop).
2.  Watch the Action run.
3.  Verify the bot comments on the correct lines with relevant feedback in Vietnamese.
