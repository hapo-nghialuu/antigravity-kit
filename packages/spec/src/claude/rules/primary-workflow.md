# Primary Workflow

**IMPORTANT:** Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT**: Ensure token efficiency while maintaining high quality.

#### 1. Code Implementation
- Before you start, delegate to `spector` agent to create a implementation plan with TODO tasks in `./specs` directory.
- When in planning/specification phase, use multiple `researcher` agents in parallel to conduct research on different relevant technical topics and report back to `spector` agent to create implementation plan.
- Write clean, readable, and maintainable code
- Follow established architectural patterns
- Implement features according to specifications
- Handle edge cases and error scenarios
- **DO NOT** create new enhanced files, update to the existing files directly.
- **[IMPORTANT]** After creating or modifying code file, run compile build or run to check for any compile errors.

#### 2. Testing
- Delegate to `tester` agent to run tests on the **simplified code**
  - Write comprehensive unit tests
  - Ensure high code coverage
  - Test error scenarios
  - Validate performance requirements
- Tests verify the FINAL code that will be reviewed and merged
- **DO NOT** ignore failing tests just to pass the build.
- **IMPORTANT:** make sure you don't use fake data, mocks, cheats, tricks, temporary solutions, just to pass the build or github actions.
- **IMPORTANT:** Always fix failing tests follow the recommendations and delegate to `tester` agent to run tests again, only finish your session when all tests pass.

#### 3. Code Quality
- After testing passes, delegate to `reviewer` agent to review clean, tested code.
- Follow coding standards and conventions
- Write self-documenting code
- Add meaningful comments for complex logic
- Optimize for performance and maintainability

#### 4. Integration
- Always follow the plan given by `spector` agent
- Ensure seamless integration with existing code
- Follow API contracts precisely
- Maintain backward compatibility
- Document breaking changes
- Delegate to `docs-manager` agent to update docs in `./docs` directory if any.

#### 5. Debugging
- When a user report bugs or issues on the server or a CI/CD pipeline, delegate to `debugger` agent to run tests and analyze the summary report.
- Read the summary report from `debugger` agent and implement the fix.
- Delegate to `tester` agent to run tests and analyze the summary report.
- If the `tester` agent reports failed tests, fix them follow the recommendations and repeat from the **Step 3**.
