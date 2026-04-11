# Log & CI/CD Pipeline Analysis

Do not attempt to fix logic based on a small snippet of log. Always pull the full context of the execution matrix.

## 1. Local Log Investigation
When debugging the core Backend or Microservices logs running locally:
- **Never just Read the last 10 lines:** Often, the root cause exception was swallowed silently further up in the stack trace. Use robust text extraction (`grep`, `tail -n 200`) to grab wider slices.
- **Timestamp Correlation:** If a database transaction failed at `14:02:45`, immediately search the web server logs and authentication logs for events occurring within a 5-second perimeter of that exact timestamp.

## 2. GitHub Actions (CI/CD) Tracing
If a User reports: "The GitHub Actions workflow keeps failing on the test step":
- Use the `gh run list` command to identify the latest failing job IDs.
- Execute `gh run view <ID> --log-failed` to extract the exact failure trace.
- **Blindspot Warning:** Do not forget to check the environment setup steps (e.g. `npm ci` or `docker compose up`). A test step might fail simply because the database container failed to launch properly in a prior step, masking the actual error.
