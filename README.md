# Day 8: Playwright with AI

The suite lives in `tests/` at the top of the repository and runs against the Orion Shop (`shop-app/`), which Playwright starts for you.

## Run the tests
```
npx playwright test
npx playwright show-report        # open the forwarded port to see the report
```

## Your task (TODO in `tests/cart.spec.ts`)
Three tests for one acceptance criterion: "The minimum cart value is Rs 500. A cart of exactly Rs 500 qualifies."
Positive (Rs 1000), negative (Rs 499), boundary (Rs 500). Ask an AI chat to draft them, read every line, run them.
If a test fails because the shop is wrong, that is a bug report, not a broken test.

## Playwright's AI test agents
```
npx playwright init-agents --loop=vscode
```
This adds three agents for Copilot Chat in VS Code: **planner** (explores the shop and writes a test plan in `specs/`),
**generator** (writes tests from the plan) and **healer** (debugs failing tests). Pick them from the agent list in Copilot Chat.
If your Copilot plan does not offer the model named in `.github/agents/*.agent.md`, change the `model:` line to one you have.

## CI
`.github/workflows/playwright.yml` runs the suite on every push and keeps the HTML report as an artifact.
