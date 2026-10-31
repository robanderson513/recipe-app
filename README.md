# Recipe App

A TypeScript monorepo with a React web app, a NestJS API, and PostgreSQL persistence through TypeORM.

For repository-specific guidance for AI assistants and code review quality checks, see [AGENTS.md](./AGENTS.md).

## Run everything in Docker

Install and start [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) first. The web app, API, and PostgreSQL all run in containers; you do not need to install Node.js or PostgreSQL to run them with Docker Compose.

The web app uses a private GitHub Packages dependency. Sign in to GitHub Packages with npm so your user `.npmrc` contains a token with package-read access. `npm run dev` and `npm run docker:up` automatically pass that user config to Docker Compose as a temporary BuildKit secret; the credential is not copied into the image or repository. If needed, set `GITHUB_NPMRC` to override the user `.npmrc`.

The committed `.npmrc` only selects the package registry.

From the repository root, start the stack with:

```sh
npm run dev
```

This builds and starts the web app, API, and database in the foreground. Press `Ctrl+C` to stop them. Open [http://localhost:5173](http://localhost:5173). The API listens at [http://localhost:3000/api](http://localhost:3000/api); try `/api/health` to check it. Source files are mounted into the containers, so code changes are picked up while developing. Each start refreshes the app containers' dependency volumes from the latest image while preserving PostgreSQL data.

Useful commands:

```sh
npm run docker:up    # Start the stack in the background
npm run docker:logs  # Follow web, API, and database logs
npm run docker:down  # Stop and remove containers; database data is kept
```

The starter database credentials have local-development defaults in Compose. To change them, copy `.env.example` to `.env` and edit the values. Keep `.env` private.

## Run with Node.js outside Docker

Requires Node.js 20 or newer, npm 10 or newer, and Docker Compose for PostgreSQL:

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL with `docker compose up -d postgres`.
3. Install dependencies with `npm install`.
4. Start the web app and API with `npm run dev:local`.

Run either app by itself with `npm run dev:web` or `npm run dev:api`. Build both with `npm run build`.

## Repository layout

```text
apps/
  api/    NestJS HTTP API and TypeORM database configuration
  web/    React + TypeScript single-page application
```

Database schema synchronization is disabled. Add schema changes as TypeORM migrations as the app's domain features are introduced.
