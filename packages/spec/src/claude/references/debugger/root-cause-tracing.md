# Surgical Root Cause Tracing

When dealing with deep-rooted system failures, avoid modifying the surface layer where the error was thrown. The true failure often originated several layers deeper.

## The 5-Whys Deep Dive
Continuously ask "Why?" until you hit the architectural bedrock:
- **Symptom:** User cannot log in.
- *Why?* The Frontend received an `undefined` profile object.
- *Why?* The Backend API returned null.
- *Why?* The Database query failed silently.
- *Why?* The ORM mapping model was updated yesterday, but the database schema migration was never executed.
- **Fix:** Execute the database migration, DO NOT add an `if (!profile)` fallback check on the Frontend.

## Git Bisect Simulation
If a bug suddenly appears in a previously working system and the cause is completely obscured, utilize Git history profiling.
- Command the terminal to run `git log -p path/to/failing-file` to see exactly who altered the logic and what the previous state was.
- Do not hesitate to use standard Unix commands to track changes over time or locate when a specific variable was dropped.
