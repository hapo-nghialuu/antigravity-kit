# The Verification Protocol (The Iron Law of Testing)

A fix is NOT considered complete when the code is written. A fix is only complete when it is PROVEN to work.

## The 3-Step Verification Law

1. **Pre-Verification (Reproduce the Bug):**
   Before touching any code, you must execute a command or test script that visibly outputs the failure or reproduces the error. You need a baseline failure state.

2. **Execution (Apply the Fix):**
   Make the precise code modifications required using targeted edits.

3. **Post-Verification (Confirm the Fix):**
   Re-run the EXACT SAME command or test script from step 1. The output MUST prove that the bug is resolved (e.g., terminal output showing "Success", HTTP 200, or a clear log assertion).

## What constitutes "Invalid Proof"?
- **"I have reviewed the code and it looks correct."** -> This is hallucinated confidence. Rejected.
- **"The unit test should pass now."** -> Assuming outcomes without execution. Rejected.

## How to execute tests when no test suite exists?
If the project lacks a formal test suite (e.g., no Jest or Cypress), you must utilize Bash commands to prove it:
- Use `curl -v http://localhost:...` to prove an endpoint stopped throwing `500`.
- Inject temporary `console.log()` outputs, trigger the flow, run the script, and grep the output buffer to prove the variable resolves correctly. (Remember to delete the temporary logs after proof is acquired).
