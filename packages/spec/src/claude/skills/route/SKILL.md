---
name: cf:route
description: "Route ambiguous, multi-step, multi-domain, or risk-elevated work through the shortest valid chain of installed CafeKit skills and agents."
user-invocable: true
when_to_use: "Use when no single obvious installed skill covers the request; skip for an explicitly named skill, one clear low-risk intent, or a direct factual answer."
category: utilities
keywords: [routing, workflow, orchestration, delegation, risk]
argument-hint: "<task>"
metadata:
  author: haposoft
  version: "1.0.0"
---
# Route — proportional native routing

Choose the shortest valid path through capabilities that are installed now.
Route is a decision layer: it classifies, composes, and hands off; each selected
skill or agent still owns its domain contract and evidence.

## 1. Proportional gate

Apply these exits before discovery, classification, or delegation:

1. **Explicit installed skill:** when the user names a valid installed skill,
   invoke that skill directly. Do not reclassify it or add routing ceremony.
2. **One obvious intent:** when exactly one installed skill clearly covers a
   low-risk request, use it directly without constructing a chain.
3. **Direct factual conversation:** answer a factual question directly, or use
   the installed evidence-answering skill when repository or current evidence is
   needed. Do not create a route chain or spawn agents merely to answer it.
4. Continue in Route only for ambiguity, multiple dependent steps, multiple
   domains, elevated/high risk, or no obvious installed capability.

An explicitly named capability that is absent, invalid, duplicate, ambiguous,
or retired is not an installed route. Name the gap; do not invent a substitute
with broader authority.

## 2. Classify material work

Load `references/task-taxonomy.md`. Record exactly one class based on the final
deliverable, then record size (`trivial | standard | epic`), the highest-link
risk (`low | elevated | high`), and the number of material domains. Never
average risk down across links.

Use the runtime's live installed skill and agent catalogs. Never synthesize a
skill, agent, command, or optional bundle from examples in these instructions.
If inventory is unavailable, use only capabilities the runtime visibly exposes;
otherwise name the capability gap and keep the path inline where safe.

## 3. Compose the shortest valid chain

Load `references/chaining-patterns.md` only when two or more links are required.
Start from `understand -> decide -> execute -> verify -> deliver`, remove every
link whose output is already evidenced, and add a link only when a modifier
requires it. Every retained link has an entry condition, an observable exit
artifact, and exactly one owner.

Prefer the user-named skill, then the narrowest domain skill, then a generic
workflow skill. One intent has one primary skill. Supporting skills may produce
inputs for it but may not compete for ownership.

## 4. Agents and risk gates

Load `references/agent-timing.md` only when delegation may materially improve
fresh context, specialization, tool isolation, or safe parallel work. Discover
agents from the current runtime; if the preferred agent is missing, continue
inline when safe or return the named gap. Never synthesize an unavailable agent.

- `low`: the owning link's normal proof is sufficient.
- `elevated`: add explicit verification appropriate to the changed surface.
- `high`: require independent review and user confirmation before advancing
  past the high-risk gate. When an irreversible or external action is present,
  obtain that confirmation immediately before the action.

## 5. Authority is monotonic

The route may narrow user authority but never expand it. Read-only stays
read-only; diagnosis does not authorize repair; implementation does not
authorize commit, push, deploy, publish, or release; local work does not
authorize an external action. Stop before any mutation or delivery link that
the user did not already authorize and state what authority is missing.

## 6. Return and handoff

Return a compact route record before the first material handoff:

```text
Route: <class> | size=<trivial|standard|epic> | risk=<low|elevated|high> | domains=<n>
Chain: <owner: entry -> exit> [-> ...]
Gates: <authority, verification, confirmation, or named gap>
```

Do not claim that source text or installed projection proves live-model
adherence. That behavior remains `[UNPROVEN]` until a separate host run observes
it.
