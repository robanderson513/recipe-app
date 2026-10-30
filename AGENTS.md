# Development guidance

## Scope and collaboration

- Implement the behavior requested; don't add placeholder pages, features, or abstractions that weren't asked for.
- Prefer a small, coherent design over minimizing the number of files. Keep components and styles organized by responsibility instead of growing a catch-all component.
- When a request is ambiguous in a way that changes the design or scope, ask before choosing an expansive interpretation.
- Explain meaningful React-specific choices and tradeoffs without assuming the developer is new to software development or to React.

## React application

- Keep reusable UI in focused components and keep page content separate from application shell and navigation.
- Keep related component files together. Co-locate focused tests with the component or module they cover; reserve a top-level test directory for integration or end-to-end tests.
- Use React Router for route-aware navigation and active-route behavior. Don't expand hand-written pathname matching into an application router.
- Follow the existing TypeScript, styling, and test patterns. Update the relevant test command when adding a new test location.
