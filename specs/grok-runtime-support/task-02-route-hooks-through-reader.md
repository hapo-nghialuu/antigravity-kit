# Task 02 — Every gate hook reads through the reader and denies with a visible reason

Status: pending

## Outcome
The fourteen hooks that parse their own stdin and matter under grok normalize the parsed object through `normalizeHookPayload` before reading any field, so a grok envelope reaches the same code path a Claude payload does. The two hooks that deny with exit 2 emit a JSON deny carrying the full reason, which grok honours regardless of exit code and Claude Code reads natively. The new library ships in the migration manifest and in every hand-copied test fixture. Under Claude the decisions are unchanged; under grok the privacy gate asks, the Stop gate honours its loop guard, the approval hook stops running its stop path on every prompt, and a denial carries its reason.

## Scope
- In: `agent.cjs:44`, `completion-authority.cjs:17` (`readPayload`), `inspect-block.cjs:76`, `privacy-block.cjs:204`, `docs-sync.cjs:22`, `secret-output-guardrail.cjs:27`, `rules.cjs:52`, `precompact.cjs:72`, `session.cjs:199`, `spec-gate.cjs:77`, `semantic-review-authority.cjs:147`, `task-scaffold-guard.cjs:37`, `spec-state.cjs:53`, `state.cjs:228`; the deny-output change at `inspect-block.cjs:92-97,105-110` and `task-scaffold-guard.cjs:75-82`; `src/claude/migration-manifest.json` `runtime.files` gains `hooks/lib/hook-payload.cjs`; the five allow-lists (`src/claude/hooks/__tests__/spec-gate.test.js` `installClaudeGate`, `state.test.js`, `semantic-review-authority.test.js`, `bin/__tests__/develop-contract.test.js`, `bin/__tests__/specs-v2-execution-closeout.test.js`) gain the same file; the `expectedOverlay` anchor in `bin/__tests__/omp-hooks.test.js`, which this task's edit to `privacy-block.cjs` breaks.
- Out: `usage.cjs`, excluded by the C2 decision recorded in `plan.md`; changing what any hook does with a field once it has the Claude shape; `status.cjs`, which grok never invokes; the omp overlay's own content and file count (task 03).

## Coverage
- CP-02

## Ownership
- Modify: `packages/spec/src/claude/hooks/agent.cjs`, `completion-authority.cjs`, `inspect-block.cjs`, `privacy-block.cjs`, `docs-sync.cjs`, `secret-output-guardrail.cjs`, `rules.cjs`, `precompact.cjs`, `session.cjs`, `spec-gate.cjs`, `semantic-review-authority.cjs`, `task-scaffold-guard.cjs`, `spec-state.cjs`, `state.cjs`
- Modify: `packages/spec/src/claude/migration-manifest.json`
- Modify: `packages/spec/src/claude/hooks/__tests__/spec-gate.test.js`, `state.test.js`, `semantic-review-authority.test.js`, `packages/spec/bin/__tests__/develop-contract.test.js`, `bin/__tests__/specs-v2-execution-closeout.test.js` (allow-lists only)
- Modify: `packages/spec/bin/__tests__/omp-hooks.test.js` (`expectedOverlay` anchor only; the overlay listing belongs to task 03)
- Create: `packages/spec/bin/__tests__/grok-envelope.test.js`
- Read: `packages/spec/src/claude/settings/settings.json`

## Acceptance
- AC-02 and AC-03 as stated in `plan.md`.
- **The loop guard reads the raw payload.** In `spec-gate.cjs` and `completion-authority.cjs` the `stop_hook_active` check runs on the parsed object before normalization, accepting either spelling, and the normalized object is used from there on. Both hooks end in a catch that emits a block (`spec-gate.cjs` final catch → `emitBlock`), so a normalization failure above the guard would block every Stop on Claude, not just under grok. This is the one place where the routing is not a single line after `JSON.parse`.
- **One documented exception to the insertion rule.** `semantic-review-authority.cjs:147` parses at its call site; it is routed as `recordFromSubagentStop(normalizeHookPayload(JSON.parse(raw)))` rather than by adding a second parsing path.
- **The deny output is JSON on stdout, and exit 2 stays.** Both hooks emit `{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":<full text>}}` and then exit 2. Grok honours a stdout deny "regardless of exit code" and would otherwise take only the first stderr line, losing the scaffold command that is the whole point of the guard's message. Claude Code reads the same JSON, and the omp bridge already prefers stdout over stderr (`cafekit-bridge.mjs:131-133`); its comment at `cafekit-bridge.mjs:101` saying no CafeKit hook writes a block reason becomes false and is corrected in the same edit.
- After the edits, every hook listed in Scope contains `normalizeHookPayload` at least once, and no hook outside that list contains it.
- The packed-install cases pass, proving the manifest entry: a missing entry reproduces the `Cannot find module` class of failure the previous packet hit.

## Dependencies
- task-01-hook-payload-reader.md

## Verification Plan
- Command: `node --test bin/__tests__/grok-envelope.test.js && node --test src/claude/hooks/__tests__/*.test.js && node --test bin/__tests__/develop-contract.test.js bin/__tests__/specs-v2-execution-closeout.test.js bin/__tests__/omp-hooks.test.js && node --test --test-name-pattern "packed Claude and Codex installs" bin/__tests__/package-inventory.test.js`
- Named probe: `the privacy gate asks on a grok run_terminal_command`, `the privacy gate asks on a grok read_file path`, `the Stop gate honours stopHookActive`, `the Stop gate still blocks an unproven done task`, `the approval hook takes its approve path on a grok prompt`, `a broad glob is denied with its full reason in JSON`, `a nested task write is denied under the grok write tool`, `the secret guardrail sees a grok prompt`; every existing case in the four suites as regression guard; `packed Claude and Codex installs execute semantic kernel behavior without package source` as the manifest guard.
- Reachability: known — `grok-envelope.test.js` copies the manifest hook set plus `scripts/` under `<tmp>/.claude/` in a throwaway git repository with one empty commit (the `runtime-dir.test.js` fixture), and runs each hook as a child process with `CLAUDE_PROJECT_DIR` set to the fixture root as grok does.
- Oracle: exact `permissionDecision` values; exit codes; empty stdout for the honoured loop guard; the full multi-line reason present in `permissionDecisionReason`; no `decision: "block"` on the approval path.
- Counterexample: removing the routing call from `privacy-block.cjs` must fail both privacy cases; removing it from `spec-gate.cjs` must fail the loop-guard case; normalizing above the loop guard with a throwing reader must fail the Stop-still-blocks case; keeping `console.log` instead of the JSON deny must fail the full-reason cases; omitting the manifest entry must fail the packed-install case.
- Artifacts: ephemeral, removed in `finally`.

## Receipt
