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
- Put reusable UI primitives in `apps/web/src/components/ui`; keep feature-specific compositions with their feature or page.
- Reuse the existing patterns and design-system package instead of introducing new styling systems or custom CSS frameworks. Prefer its utility classes for common layout and spacing (such as flex, gaps, and padding) before writing equivalent component CSS.
- On an element, use either design-system utility classes or a feature/component-specific CSS class, not both. Use utilities while the element needs only standard utility styling; once it needs a specific class, put all of that element's styling in the specific class and use design-system tokens there where applicable.
- Use CSS nesting to scope related styles and increase specificity when needed, but keep nesting shallow and avoid specificity escalation without a clear need.
- Prefer component-scoped class names and CSS nesting over BEM-style naming; avoid BEM conventions where the existing component structure can provide clear scope.
- Build CSS iteratively: start with an MVP using simple semantic structure and the smallest set of layout rules that communicates the intended design (for example, flex layout, spacing, and alignment for a header). Rely on browser defaults, inherited styles, and design-system utilities or tokens where they fit. Then refine specific details in response to user feedback or demonstrated needs. Do not front-load fine-grained typography, fixed dimensions, offsets, calculations, or other visual polish without a reason; do not invent precision.
- Use design-system spacing tokens and utilities for padding, margins, and gaps. Do not invent arbitrary spacing values (for example, `0.3rem`, `0.65rem`, or `0.8rem`); if no existing token fits, explain the need and choose a value deliberately rather than adding an unexplained magic number.
- Use Material Design as a guideline for UI elements and interaction patterns. Prefer reusable components that fit the existing design system; do not add a Material UI dependency unless explicitly requested.
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

- In interactive mode, a direct user request authorizes the requested work only after the user explicitly confirms the implementation scope and the agent has checked the current task against the repo and the ask.
- Interactive-mode implementation gate: before writing, editing, deleting, renaming, or otherwise modifying repository files, tests, scripts, dependencies, or generated artifacts, the agent must pause and verify the change with the user or developer. Do not assume the issue text alone is authorization to code.
- Ask before acting when a consequential choice or scope expansion is not specified. You may gather information and explain options without approval.
- In auto mode, the agent does not need explicit approval from the user for routine implementation within the requested scope; it may proceed without pausing for routine approval while staying within the scope of the task.
- In all modes, implementation should be staged in small, reviewable slices instead of a single monolithic pass. Prefer a minimal route/shell change first, then the feature behavior, then tests and polish as separate incremental steps when needed.

When submitting a PR, review the diff with the same standards above: prefer correctness, consistency, and minimal scope over cleverness.
