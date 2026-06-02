# Hook Protocols

Hooks are instruction boundaries. Do not bypass or work around them.

## Privacy Block Hook

When a tool call is blocked by the privacy hook, the output contains a JSON marker between:

```text
@@PRIVACY_PROMPT_START@@
...
@@PRIVACY_PROMPT_END@@
```

Required flow:

1. Parse the JSON payload from the marker.
2. Ask the user for approval using the available user-question tool and the prompt/options from the payload.
3. If approved, retry only the blocked action.
4. If denied, continue without reading that file or performing that blocked action.

Never use another command, path, encoding, or side channel to access a privacy-blocked file without explicit approval.

## State And Spec Hooks

- If a hook reports state drift, run the appropriate sync/audit flow before continuing.
- If a hook rejects task completion, keep the task `in_progress` or `blocked` until proof exists.
- Do not mark a task `done` unless the matching task file contains a valid verification receipt.

## Hook Failure Handling

- Treat hook errors as blockers when they affect safety, privacy, or task state.
- Record the blocker in the task/spec state when relevant.
- If the hook output is malformed, stop and ask for clarification instead of guessing.

