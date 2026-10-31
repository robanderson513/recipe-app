# Development guidance

## Scope and collaboration

- Implement the behavior requested; don't add placeholder pages, features, or abstractions that weren't asked for.
- Keep changes focused on the MVP. Don't add temporary route helpers or speculative abstractions when the app's intended routing or behavior is not in place yet.
- Treat questions and discussion as requests for conversation, not permission to edit files. Make changes when asked; if asked to listen, explain, or review, don't change files.
- Prefer a small, coherent design over minimizing the number of files. Keep components and styles organized by responsibility instead of growing a catch-all component.
- Prefer the simplest familiar React pattern. Don't split small code into extra files or declaration files unless the separation adds clarity or reuse.
- When a request is ambiguous in a way that changes the design or scope, ask before choosing an expansive interpretation.
- The developer is an experienced Angular developer learning React patterns. Relate concepts to Angular when useful, explain meaningful React-specific choices, and don't assume they are new to software development.

## React application

- Keep reusable UI in focused components and keep page content separate from application shell and navigation.
- Keep related component files together. Co-locate focused tests with the component or module they cover; reserve a top-level test directory for integration or end-to-end tests.
- Use React Router for route-aware navigation and active-route behavior. Don't expand hand-written pathname matching into an application router.
- Follow the existing TypeScript, styling, and test patterns. Update the relevant test command when adding a new test location.
- Keep styles with the component or layout they affect. Imported regular CSS is global, so avoid broad selectors that can unintentionally affect other components.
