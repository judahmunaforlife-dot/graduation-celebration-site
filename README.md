# Graduation Celebration Site

A single-page graduation celebration site with a launch screen, floating
decorations, an audio synth backdrop, confetti, themed UI presets, a journey
timeline, share-card downloads, event RSVP, and live guestbook walls backed by
Supabase.

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

Build, test, and preview the static export:

```bash
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest unit tests for the lib helpers
pnpm build       # emits out/
pnpm preview     # serves out/ on http://localhost:3000
pnpm test:e2e    # Playwright smoke test (run pnpm build first)
```

CI runs `lint` and `build` on every push/PR via `.github/workflows/ci.yml`.

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
   `wishes`, `blessings`, and `rsvps` tables, Row Level Security (public
   read of visible rows + public insert), live guestbook publication,
   race-safe heart-increment functions, a private RSVP count
   (`count_attending()`), and optional starter content
   (edit/delete the seed inserts per graduate).
3. Copy the project URL and anon key from **Project Settings > API** into your
   env vars.

### Moderating guestbook content

Every wish and blessing has a `status` column (`visible`/`hidden`). To remove
spam or inappropriate posts without touching code, run in the SQL editor or
flip it in the Table editor:

```sql
update public.wishes set status = 'hidden' where id = '<row-id>';
update public.blessings set status = 'hidden' where id = '<row-id>';
```

Hidden rows are no longer served by the select policies, so they disappear
from the walls instantly.

### Rate limiting (recommended)

The anon key allows anyone to insert wishes/blessings/RSVPs and increment
hearts, so add API-level rate limits in **Dashboard > API settings** for these
endpoints to keep a public guestbook abuse-proof:

- `POST /rest/v1/wishes`
- `POST /rest/v1/blessings`
- `POST /rest/v1/rsvps`
- `POST /rest/v1/rpc/increment_wish_hearts`
- `POST /rest/v1/rpc/increment_blessing_hearts`

## Deploy to Netlify

1. Push this repo to GitHub.
2. Netlify > Add new site > Import from GitHub.
3. Configure the build (also preset in `netlify.toml`):
   - Build command: `pnpm build`
   - Publish directory: `out`
   - Node version: `22`
4. Add the environment variables from the table above. Set
   `NEXT_PUBLIC_SITE_URL` to your final custom domain (e.g.
   `https://celebrate.example.com`) so Open Graph tags, `sitemap.xml`, and
   `robots.txt` point at the right host.
5. Deploy.

## Creating another instance (one site per graduate)

Each graduate gets a full clone with its own repo, Netlify site, and its own
Supabase project, so all data is fully isolated.

1. **Fork/clone this repo** into a new GitHub repository.
2. **Create a new Supabase project** for this instance and run
   `supabase/schema.sql` in its SQL Editor.
3. **Personalize content** in `src/lib/celebration-data.ts`:
   - `graduate` (name, degree, school, quote)
   - `siteTheme` (`luxury`, `black`, `gold`, `pink`, `lemon`, `rose`, `midnight`, or `school`)
   - `achievements` list
   - `memories` captions
4. **Swap the photos** in `public/` (`graduate-portrait.png`, `memory-1..3.png`).
   For a new portrait, adjust `portrait.objectPosition` in
   `src/lib/celebration-data.ts` if needed to keep the subject centered in the
   decorative frame.
5. **Set the event details** in `celebrationEvent` in
   `src/lib/celebration-data.ts`. Set `celebrationEvent.rsvpEnabled` to `true`
   only when this instance should collect RSVPs. When `false` (the default for
   a first deploy), the entire "Celebrate With Us" section is hidden and the
   `rsvps` table goes unused.
6. **Create a new Netlify site** from the new repo and set its env vars
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
7. Deploy. Repeat for the next graduate.

## Scripts

- `scripts/key-frame.mjs` — build-time asset tool that chroma-keys a magenta
  background out of `public/gold-frame-key.png` into `public/gold-frame.png`.
