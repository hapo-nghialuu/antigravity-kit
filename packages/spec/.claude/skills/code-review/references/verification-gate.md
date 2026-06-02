---
name: verification-gate
description: The Iron Law of Proof. Prohibits reporting a 'PASS' status without providing concrete execution proofs (like exit code 0 or successfully passing tests).
---

# Verification Gate: The Iron Law of Proof

In the Hapo ecosystem, words are cheap. Code that "looks right" to an AI can easily break in production. This reference defines the strictest, most uncompromising rule for Code Review.

## 1. The Iron Law
**You MUST NOT issue a final score of PASS unless you hold concrete, verifiable execution proof.**

## 2. Hallucination Block
Never use the following phrases or implications to assess code functionality:
- "The code looks good."
- "The logic seems sound."
- "This should work as expected."
- "There are no obvious errors."

If you have not compiled it, ran it, or seen it pass tests, **you do not know if it works**.

## 3. Accepted Proofs of Execution
To clear the Verification Gate, you must cite one of the following concrete proofs in your report:

- **Test Suite Logs:** Output showing tests ran and passed (e.g., `PASS src/components/Login.test.tsx`).
- **Compilation/Build Status:** Terminal output proving the typescript compiler (`tsc`) or bundler succeeded with `Exit code: 0`.
- **Linter Completion:** Output proving no syntax errors exist.
- **Multimodal Visual Evidence:** `hapo:ai-multimodal` confirming that the visual rendering perfectly matches the design layout.

## 4. How to Handle Missing Proof
If you are asked to review a PR or commit and no execution proof is available in the memory or context:
1. **Demand Action:** Instruct the `god-developer` or `test-runner` to run the test suite and provide you with the terminal logs.
2. **Issue an Incomplete PASS:** If you must proceed due to workflow limitations, explicitly state: *"Verdict is tentative. Cannot issue an unconditional PASS because execution logs were not provided."*
