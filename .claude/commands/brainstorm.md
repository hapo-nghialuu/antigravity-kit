---
description: Structured brainstorming for projects and features. Explores multiple options before implementation.
---

# /brainstorm - Structured Idea Exploration

$ARGUMENTS

---

## Purpose

This command activates BRAINSTORM mode for structured idea exploration. Use when you need to explore options before committing to an implementation.

---

## Behavior

When `/brainstorm` is triggered:

1. **Understand the goal**
   - What problem are we solving?
   - Who is the user?
   - What constraints exist?

2. **Generate options**
   - Provide at least 3 different approaches
   - Each with pros and cons
   - Consider unconventional solutions

3. **Present options using AskUserQuestion tool**
   - Use tool to let user select preferred approach
   - Options shown with pros/cons in descriptions
   - User can select or provide custom approach

---

## Output Format

### Step 1: Analysis (Text Output)

```markdown
## 🧠 Brainstorm: [Topic]

### Context
[Brief problem statement]

### Generated Options

I've identified 3 viable approaches for [topic]:
```

### Step 2: Selection (Use AskUserQuestion Tool)

```json
{
  "questions": [
    {
      "question": "Which approach would you like to explore for [topic]?",
      "header": "Approach",
      "options": [
        {
          "label": "[Option A Name]",
          "description": "Pros: [benefit 1, benefit 2] | Cons: [drawback] | Effort: [Low/Med/High]"
        },
        {
          "label": "[Option B Name]",
          "description": "Pros: [benefit] | Cons: [drawback 1, drawback 2] | Effort: [Low/Med/High]"
        },
        {
          "label": "[Option C Name]",
          "description": "Pros: [benefit] | Cons: [drawback] | Effort: [Low/Med/High]"
        }
      ],
      "multiSelect": false
    }
  ]
}
```

### Step 3: Follow-up (After Selection)

```markdown
## 💡 Selected: [User's Choice]

**Why this is a good choice:**
[Reasoning based on context]

**Next steps:**
1. [Concrete action 1]
2. [Concrete action 2]
3. [Concrete action 3]

Would you like me to proceed with implementation?
```

---

## Examples

**Example 1: Authentication System**

```
User: /brainstorm authentication system

Claude:
## 🧠 Brainstorm: Authentication System

### Context
Need to implement user authentication for the application. Considerations: security, UX, development time.

### Generated Options
I've identified 3 viable approaches:
```

Then use AskUserQuestion with options:
- "Email/Password with JWT" (Pros: Full control, standard | Cons: 4-5 hrs dev time | Effort: Medium)
- "Social Login (OAuth)" (Pros: 1-2 hrs, smooth UX | Cons: Less control | Effort: Low)
- "Auth Service (Clerk/Auth0)" (Pros: 1 hr, production-ready | Cons: Monthly cost | Effort: Low)

**Example 2: State Management**

```
User: /brainstorm state management for complex form
```

Use AskUserQuestion with options:
- "React Context + useReducer" (Pros: Built-in, no deps | Cons: Verbose | Effort: Low)
- "Zustand" (Pros: Simple API, 1KB | Cons: Learning curve | Effort: Low)
- "Redux Toolkit" (Pros: DevTools, ecosystem | Cons: Boilerplate | Effort: Medium)

---

## Key Principles

- **No code** - this is about ideas, not implementation
- **Visual when helpful** - use diagrams for architecture
- **Honest tradeoffs** - don't hide complexity
- **Defer to user** - present options, let them decide
