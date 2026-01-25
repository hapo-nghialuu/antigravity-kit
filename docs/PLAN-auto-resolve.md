# Plan: Auto-Resolve AI Review Threads

## Goal Description
Enhance `ai_reviewer.py` to automatically resolve outdated review threads created by the bot. This ensures that when new code is pushed or the AI re-runs, the PR doesn't get cluttered with old, potentially irrelevant comments.

## Proposed Changes

### Logic Script (`scripts/ai_reviewer.py`)
1.  **Add `resolve_thread(thread_id)` function**:
    *   Construct a GraphQL mutation:
        ```graphql
        mutation ResolveThread($threadId: ID!) {
          resolveReviewThread(input: {threadId: $threadId}) {
            thread {
              isResolved
            }
          }
        }
        ```
    *   Execute this via `requests.post("https://api.github.com/graphql", ...)` using `GITHUB_TOKEN`.

2.  **Add `get_unresolved_bot_threads(pr_node_id)` function**:
    *   Use GraphQL query to fetch all review threads for the PR.
    *   Filter for threads where:
        *   `isResolved` is `false`.
        *   The author is `github-actions[bot]`.

3.  **Update `main` flow**:
    *   **Step 1 (New)**: Before analyzing code, fetch all unresolved bot threads.
    *   **Step 2 (New)**: Resolve them all. (Strategy: "Flush & Refresh").
    *   **Step 3**: Analyze code and post new comments as usual.

### Rationale for "Flush & Refresh"
Attempting to map old comments to new line numbers is complex and error-prone. The most reliable "stateless" approach for an AI bot is to clear its previous "state" (unresolved threads) and re-evaluate the current state of the code.

## Verification Plan
1.  **Manual Verification**:
    *   Create a PR with a bug. Let bot comment.
    *   Push a fix (or just an empty commit to trigger re-run).
    *   Verify that the *old* comment is marked as "Resolved" (check icon) in the GitHub UI.
