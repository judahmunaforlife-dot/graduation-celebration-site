# Graduation Celebration Site

A single-page graduation celebration site with a launch screen, floating
decorations, an audio synth backdrop, confetti, and two live guestbook walls
(Moments + Blessings) backed by Supabase.

## Tech stack

- Next.js 16.2.10 (App Router, Turbopack) — static export to `out/`
- React 19.2.4, TypeScript 5 (strict)
- Tailwind CSS 4, Geist fonts
- framer-motion 12.42.2, lucide-react 1.23.0, canvas-confetti 1.9.4
- Supabase 2.110.0 — database for wishes/prayers/blessings
- Netlify — hosting (static export + cache headers)
- ESLint 9 (flat config, eslint-config-next)

## Local development

Prerequisites: Node.js 22+, pnpm 10.26+ (11.x recommended).

```bash
pnpm install
cp .env.local.example .env.local   # fill in Supabase values
pnpm dev
```

Build and preview the static export:

```bash
pnpm lint
pnpm build        # emits out/
pnpm preview      # serves out/ on http://localhost:3000
```

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (Project Settings > API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | No | Deployed site URL for OG/sitemap. Set automatically by Netlify. |

If Supabase env vars are missing, the site still renders; the two walls show a
clear error state instead of crashing.

## Supabase setup

1. Create a project at https://supabase.com.
2. Open the SQL Editor and run `supabase/schema.sql`. It creates the
   `wishes` and `blessings` tables, Row Level Security (public read/write),
   race-safe heart-increment functions, and optional starter content
   (edit/delete the seed inserts per graduate).
3. Copy the project URL and anon key from **Project Settings > API** into your
   env vars.

## Deploy to Netlify

1. Push this repo to GitHub.
2. Netlify > Add new site > Import from GitHub.
3. Configure the build (also preset in `netlify.toml`):
   - Build command: `pnpm build`
   - Publish directory: `out`
   - Node version: `22`
4. Add the environment variables from the table above.
5. Deploy.

## Creating another instance (one site per graduate)

Each graduate gets a full clone with its own repo, Netlify site, and its own
Supabase project, so all data is fully isolated.

1. **Fork/clone this repo** into a new GitHub repository.
2. **Create a new Supabase project** for this instance and run
   `supabase/schema.sql` in its SQL Editor.
3. **Personalize content** in `src/lib/celebration-data.ts`:
   - `graduate` (name, degree, school, quote)
   - `achievements` list
   - `memories` captions
4. **Swap the photos** in `public/` (`graduate-portrait.png`, `memory-1..3.png`).
5. **Create a new Netlify site** from the new repo and set its env vars
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
6. Deploy. Repeat for the next graduate.

## Scripts

- `scripts/key-frame.mjs` — build-time asset tool that chroma-keys a magenta
  background out of `public/gold-frame-key.png` into `public/gold-frame.png`.
