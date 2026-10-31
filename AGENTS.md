# AI agent guidance for Recipe App

This repository is a TypeScript monorepo for a recipe application with a React web client and a NestJS API backed by PostgreSQL. These instructions keep AI-assisted work aligned with the intended architecture and quality bar for the project.

## Project overview

- `apps/web` contains the React + TypeScript UI, routing, and client-side state.
- `apps/api` contains NestJS application code, TypeORM entities, validation, and database configuration.
- PostgreSQL runs through Docker Compose by default. Keep local setup reproducible and avoid committing secrets or personal environment values.
- Schema changes must be implemented as TypeORM migrations instead of ad hoc schema drift.

## Expected agent skills

### Front-end work

- Keep page-level UI separate from shared application shell concerns.
- Prefer small, focused React components over broad abstraction.
- Reuse the existing patterns and design-system package instead of introducing new styling systems or custom CSS frameworks.
- Maintain route-aware navigation and avoid hand-rolled path logic when the project already has React Router patterns available.
- Keep component logic and styling close to the feature they serve.

### API and persistence work

- Keep validation and business logic in the API layer rather than the UI.
- Prefer typed TypeORM entities and service-layer logic over scattered database access.
- Validate inbound data before persisting it and avoid trusting client-provided state.
- Do not mutate database schema in place; add migration coverage for meaningful schema changes.

### Review and maintenance work

- Keep scopes tight. Do not add placeholder screens, speculative abstractions, or temporary navigation helpers that are not needed for the task.
- Follow the present architecture instead of inventing parallel patterns.
- Ensure code remains readable, explicit, and easy to test.

## Code quality checklist

Before finishing a change, confirm all of the following:

- The solution matches the requested behavior without unrelated scope creep.
- Existing project conventions are followed rather than introducing a parallel pattern.
- TypeScript remains type-safe and data flow is explicit.
- The change does not leak secrets, credentials, or environment-specific values into the repository.
- Any schema or API contract change is reflected in the relevant migration, docs, or caller code.
- Tests or validation are added or updated when behavior changes.
- The patch is small, understandable, and easy to review.

## PR review guidance

Use these prompts to flag issues during code review:

- Missing or weak validation for API inputs or user-driven state.
- Unrelated refactors bundled into a task-sized change.
- New database schema changes without a migration or rollback path.
- Client-side code that reaches into persistence concerns instead of using the API boundary.
- UI work with broad global styling selectors or route logic that bypasses established patterns.
- Changes without tests for bug fixes, edge cases, or new behavior.
- Placeholder implementations, hardcoded secrets, or environment assumptions that would not work for teammates.

## Feature pull requests

- Use the title format `{{Issue Number}} - {{Domain}} {{Minor Description of Ticket}}`.
- Keep the body to a high-level summary of the changes, describing them in domain terms.
- This format currently applies to feature work; do not expand it to other ticket types without guidance.
- Follow the repository's `.github/PULL_REQUEST_TEMPLATE.md`.

## Working conventions

- Prefer the simplest solution that satisfies the existing app architecture.
- Keep file organization aligned with the feature or layer they serve.
- Treat questions and discussion as conversation, not permission to broaden scope arbitrarily.
- When the requirement is ambiguous, clarify before taking a larger design direction.

## Session mode and approval

- In interactive mode, a direct user request authorizes the requested work; do not ask for approval to do what the user explicitly asked.
- Ask before acting when a consequential choice or scope expansion is not specified. You may gather information and explain options without approval.
- In auto mode, make reasonable decisions within the requested scope and proceed without pausing for routine approval.

When submitting a PR, review the diff with the same standards above: prefer correctness, consistency, and minimal scope over cleverness.
