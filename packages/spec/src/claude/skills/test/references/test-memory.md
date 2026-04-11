# Test Memory

The `packages/spec/src/claude/test-memory.json` file serves as the Long-Term Memory for the testing ecosystem. 

## Schema

If the file does not exist, the `hapo:test` skill (or the orchestrator) MUST create it automatically with the following structure:

```json
{
  "env_setup_commands": [],
  "flaky_tests": [],
  "known_issues": []
}
```

## Usage by `test-runner`

The `test-runner` agent is Read-Only. At Phase 1, it must read `.hapo/test-memory.json` (if it exists) to factor into its testing process:
- **`env_setup_commands`**: Commands that must be run before tests (e.g. `docker compose up -d redis`). If listed, flag missing dependencies instead of immediate failure.
- **`flaky_tests`**: Array of test file paths. If a failure occurs in one of these files, the verdict should explicitly note `(Known Flaky Test)`.
- **`known_issues`**: Issues that god-developer or user marked as ignored.

## Writing to Memory

Because `test-runner` is restricted from editing files, it cannot update the memory directly. Instead, when completing its test suite, `test-runner` MUST output a `<lessons_learned>` block inside its verdict.

Example:
```markdown
### Action
→ [FAIL] Return to god-developer: Fix CSS layout offset.

<lessons_learned>
{
  "flaky_tests_added": ["src/e2e/payment.test.ts"]
}
</lessons_learned>
```

The orchestrating `hapo:test` skill (Phase 4) then intercepts this block and automatically merges it into `packages/spec/src/claude/test-memory.json`.
