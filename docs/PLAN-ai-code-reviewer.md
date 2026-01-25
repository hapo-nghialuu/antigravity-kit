# Plan: Custom AI Code Reviewer (GitHub Actions + OpenRouter)

## Goal Description
Implement AI Code Reviewer using **OpenRouter** (Mistral) instead of Gemini. Fix dependency conflicts and ensure compliance with OpenRouter API standards.

## User Review Required
> [!IMPORTANT]
> **API Key**: Ensure `OPENROUTER_API_KEY` is set in GitHub Secrets.
> **Model**: Using `mistralai/devstral-2512:free` as requested (Note: verification of exact model ID recommended).

## Proposed Changes

### Dependencies
#### [MODIFY] [requirements.txt](file:///Users/nghialuutrung/Desktop/antigravity-kit/scripts/requirements.txt)
*   Update `openai>=1.55.0` to resolve `httpx` proxy argument conflict.
*   Keep `PyGithub`.

### Logic Script
#### [MODIFY] [ai_reviewer.py](file:///Users/nghialuutrung/Desktop/antigravity-kit/scripts/ai_reviewer.py)
*   **Client Initialization**:
    ```python
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
        default_headers={
            "HTTP-Referer": "https://github.com/hapo-nghialuu/antigravity-kit", # Attribution
            "X-Title": "Antigravity AI Reviewer"
        }
    )
    ```
*   **Model**: Set `MODEL_NAME = "mistralai/devstral-2512:free"`.
*   **JSON Handling**: Add robust try-catch for JSON parsing as free models might chatter.

## Verification Plan

### Manual Verification
1.  **Re-run GitHub Action**: Trigger the workflow again on the existing PR.
2.  **Check Logs**: Verify "OpenRouter response received" and no 404/401 errors.
