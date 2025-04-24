# Todo App

This is a full-stack todo list application with the following technologies:

- **Backend**: Hono (web framework), Drizzle ORM (database management), Zod (validation), and Postgres (database).
- **Frontend**: HTMX (dynamic interactions), TailwindCSS (styling), and Vite (bundling and development server).
- **Development Tools**: Docker Compose (database management), ESLint and Prettier (code quality).

The app allows users to:

- View a list of todos.
- Add new todos via a form.
- Delete existing todos.

HTMX enables dynamic updates without full page reloads, and Drizzle manages the database schema and migrations.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or later) and npm/pnpm (the project uses pnpm as its package manager).
- **Docker** and **Docker Compose** (for managing the Postgres database).
- **Make** (optional, for using the `Makefile`).

---

## Setting Up the Environment

1. **Clone the Repository**:
   If you haven't already, clone the repository containing the codebase.

2. **Install Dependencies**:
   Run the following command to install all dependencies listed in `package.json`:

   ```
   pnpm install or npm install
   ```

   (If you don't have pnpm, install it globally with `npm install -g pnpm`.)

3. **Create a `.env` File**:
   The app uses environment variables for configuration, especially for the database. Create a `.env` file in the project root with the following variables:

   ```
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_database_name
   DB_PORT=5432
   DATABASE_URL=postgresql://your_postgres_user:your_postgres_password@localhost:5432/your_database_name
   DB_MIGRATING=false
   DB_SEEDING=false
   ```

   Replace `your_postgres_user`, `your_postgres_password`, and `your_database_name` with your desired values. The `DATABASE_URL` must match these credentials.

   The app uses `src/env.ts` to validate these variables with Zod, ensuring they're all present and correctly formatted.

---

## Running the Database

The app uses Postgres as its database, and Docker Compose simplifies its setup.

1. **Start the Database**:
   Use the `Makefile` to start the Postgres container:

   ```
   make up_db
   ```

   This command uses `docker-compose.db.yml` to start a Postgres container with:

2. **Verify the Database is Running**:
   Check Docker to ensure the container is running:

   ```
   docker ps
   ```

   You should see a container with the name `fin-app-db-1` or similar.

3. **Stop the Database** (when needed):
   To stop the database and remove volumes:
   ```
   make down_db
   ```

---

## Applying Database Migrations

The app uses Drizzle ORM to manage the database schema and migrations. The schema is defined in `src/db/schema.ts`, which creates a `todo` table with UUID IDs and titles.

1. **Generate Migrations** (if needed):
   If you modify the schema, generate new migration files:

   ```
   pnpm run db:generate
   ```

   This uses `drizzle.config.ts` to output migrations to `src/db/migrations`.

2. **Apply Migrations**:
   Apply the migrations to create the `todo` table in the database:

   ```
   pnpm run db:migrate
   ```

   This runs `src/db/migrate.ts`, which:

   - Checks that `DB_MIGRATING=true` (set by the script).
   - Uses Drizzle's migrator to apply migrations.
   - Closes the database connection afterward.

   Ensure the database is running (`make up_db`) before running migrations.

---

## Starting the Development Server

1. **Start the Development Server**:
   Run the following command to start the app in development mode:

   ```
   pnpm run dev
   ```

   This script (`package.json`):

   - First runs `db:migrate` to ensure the database is up-to-date.
   - Then starts Vite, which serves the app using `@hono/vite-dev-server`.

2. **Verify the Server is Running**:
   The app should be available at `http://localhost:3000`. Open this URL in your browser.

---

## Interacting with the App

1. **Visit the App**:
   Open `http://localhost:3000` in your browser. You should see:

   - A header with "Todo".
   - A form to add new todos.
   - Any existing todos listed below the form (initially empty).

2. **Add a Todo**:

   - Enter a title in the form and click "Submit".
   - The new todo appears in the list without a page reload (thanks to HTMX).

3. **Delete a Todo**:
   - Click the "Delete" button next to a todo.
   - The todo disappears from the list (again, thanks to HTMX).

---

## Code Quality Tools

- **Linting** (`eslint.config.mjs`):

  - Uses ESLint with TypeScript support (`typescript-eslint`).
  - Applies strict and stylistic rules.
  - Run linting:
    ```
    pnpm run lint
    ```
  - Fix linting issues:
    ```
    pnpm run lint:fix
    ```

- **Formatting** (`package.json`):
  - Uses Prettier with plugins for TailwindCSS and import organization.
  - Check formatting:
    ```
    pnpm run format
    ```
  - Fix formatting:
    ```
    pnpm run format:fix
    ```

---
