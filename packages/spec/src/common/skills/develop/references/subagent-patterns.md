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
Task(subagent_type="code-reviewer", prompt="Review all recently written code. Check for security holes, performance issues, and adherence to YAGNI/KISS/DRY. Return score (X/10), list of critical issues, warnings, and suggestions.", description="Review [phase]")
```
