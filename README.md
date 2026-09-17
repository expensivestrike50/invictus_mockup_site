# Invictus mockup site

Football agency CRM marketing/mockup site. This is a local-only dev setup —
run it on `localhost`, no external editor or deploy target required.

## Prerequisites

- Node.js & npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Run it on localhost

```sh
# Step 1: Clone the repository.
git clone https://github.com/expensivestrike50/invictus_mockup_site.git
cd invictus_mockup_site

# Step 2: Copy the example env file (fills in the Supabase project vars).
cp .env.example .env

# Step 3: Install dependencies.
npm i

# Step 4: Start the dev server.
npm run dev
```

The app is served at **http://localhost:8080**.

If you see a blank page with `Error: supabaseUrl is required` in the browser
console, `.env` is missing — go back to Step 2.

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
