# Subagent Invocation Patterns

Standard prompt templates for delegating work to subagents within the develop workflow.

## Task Tool Pattern
Use when the Task tool is available in the environment:
```
Task(subagent_type="[agent-name]", prompt="[task description]", description="[short title]")
```

## Codebase Inspection Phase
```
Task(subagent_type="inspector", prompt="Scan and identify all files related to [feature-name] in the current codebase.", description="Scout [feature-name]")
```

## Code Implementation Phase
```
Task(subagent_type="god-developer", prompt="Implement the sub-tasks from [tasks-directory] based on the specification in [spec.json]", description="Code Feature [feature]")
```

## UI Implementation Phase
```
Task(subagent_type="ui-ux-designer", prompt="Implement the frontend code for [feature] following ./docs/design-guidelines.md", description="Code UI [feature]")
```

## Code Review Phase
```
Task(subagent_type="code-auditor", prompt="Review all recently written code. Check for security holes, performance issues, and adherence to YAGNI/KISS/DRY. Return score (X/10), list of critical issues, warnings, and suggestions.", description="Review [phase]")
```

## Test Execution Phase
```
Task(subagent_type="test-runner",
  prompt="Run tests for recently implemented code. Apply blast-radius scoping
    unless --full is requested. Return structured verdict with Status, Results,
    Coverage, Failures, and Action.",
  description="Test [feature]")
```

## Parallel Quality Gate (Step 4)
Spawn both simultaneously — do NOT wait for one before starting the other:
```
Task(subagent_type="test-runner",  prompt="...", description="Test [feature]")
Task(subagent_type="code-auditor", prompt="...", description="Review [feature]")
```
Wait for both results → apply quality-gate.md combine logic.
