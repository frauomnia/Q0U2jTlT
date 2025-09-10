# QA Engineer Challenge – autarc

This repository contains my solution for the autarc QA Engineer coding challenge.  

---

## Deliverables

### Part 1 – Test Strategy & Planning
See [TEST_STRATEGY.md](./TEST_STRATEGY.md).

### Part 2 – Test Implementation
Implemented with **Vitest + React Testing Library** and **Playwright**:

- Integration tests for component functions, nested comments, and persistence
- E2E tests (4 critical user journeys, including cross-tab sync)
- Achieved >80% coverage
- CI/CD setup via GitHub Actions (runs tests on push)

### Part 3 – QA Process Design
See [QA_PROCESS.md](./QA_PROCESS.md).

### Bonus – Bug Reports
See [BUG_REPORTS.md](./BUG_REPORTS.md) for 4 issues discovered during testing.

## Notes / Future Improvements

- With more time, I would add a **manual test plan** covering structured test cases and exploratory scenarios.  
- I would extend the automated tests to include **error handling and negative user journeys** (e.g., invalid input, offline mode, edge cases).  
- I limited bug reporting to a few examples to **showcase my bug reporting style and prioritization**. In a real project, I would perform a broader exploratory session and file additional bugs as needed.  

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the app (http://localhost:5173/)
npm run dev

# Run integration tests
npx vitest

# Run integration tests with coverage
npx vitest --coverage

# Run end-to-end (E2E) tests
npx playwright test
