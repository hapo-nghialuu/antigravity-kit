# Scope Inquiry

## Purpose

Before investing time in planning, confirm with the user the appropriate level of investment. Avoid wasting time on deep research for simple tasks, or missing risks for complex ones.

## Skip Conditions

Skip Scope Inquiry when:
- Task is clearly trivial (1 file, typo fix, config change)
- Description is under 20 words and unambiguous
- User signals urgency ("just do it", "quick", etc.)

## 3 Core Questions

### 1. What already exists?
- Scan codebase for reusable code/patterns
- Check existing utilities, services, patterns
- Warn if spec would rebuild something that already exists

### 2. What's the minimum change?
- Identify work that can be deferred without affecting the main goal
- Detect scope creep: nice-to-haves disguised as requirements
- Ruthlessly separate essential from aspirational

### 3. How complex is this?
- If spec affects **> 8 files**: challenge whether fewer files are possible
- If spec adds **> 2 new classes/services**: demand justification for each
- If spec needs **> 3 major tasks**: explore consolidation

## Level Selection

After answering the 3 questions, present via `AskUserQuestion`:

**Title:** "Scope Inquiry"
**Question:** "Based on analysis, what scope level do you want?"

| Option | Description | Impact |
|---|---|---|
| **Expand** | Deep research, explore multiple approaches, add stretch features | More research, stretch requirements, more tasks |
| **Hold** | Keep scope as described, prioritize quality | Focus on edge cases, test coverage, failure modes |
| **Reduce** | Core only, defer everything non-essential | Fewer tasks, simpler architecture, defer non-blocking parts |

## Immutable Rule

**Once user picks a level, respect it throughout the entire workflow:**
- Don't silently shrink when user chose Expand or Hold
- Don't silently expand when user chose Reduce
- Raise scope concerns ONCE at this step. Then commit and optimize within the chosen scope.

## Output Format

```
Scope Inquiry:
- Existing code: [list reusable code/patterns]
- Minimum change: [list essential vs deferrable]
- Complexity: [estimate files, new abstractions, major tasks]
- User chose: [Expand / Hold / Reduce]
```
