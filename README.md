# H2 Math Lab

A revision site for A-Level H2 Mathematics (9758): topic notes, worked examples and
auto-marked quizzes, with login so students can track their scores.

Built with Next.js (App Router), Tailwind CSS, KaTeX and Supabase.

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. The site works without any configuration; login and score
saving switch on once Supabase is connected.

## Connect Supabase (login and saved scores)

1. Create a project at https://supabase.com.
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env.local` and fill in the project URL and anon key
   (Project Settings → API).
4. In Authentication → URL Configuration, set the Site URL to your domain and add
   `https://your-domain/auth/callback` (and `http://localhost:3000/auth/callback`) to the
   redirect URLs.

When deploying (e.g. Vercel), add the same two environment variables there.

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/topics.ts` | The full topic map shown on the home page |
| `src/content/functions.ts` | Notes, worked examples and quiz for Functions |
| `src/app/topics/functions/` | The Functions pages (notes, examples, quiz) |
| `src/components/Tex.tsx` | Renders `$...$` / `$$...$$` LaTeX with KaTeX |
| `src/components/Quiz.tsx` | Quiz engine; saves attempts when logged in |
| `src/proxy.ts` | Refreshes the session and protects `/dashboard` |
| `supabase/schema.sql` | Database tables and row-level security policies |

## Adding a topic

1. Add a content file like `src/content/functions.ts`.
2. Copy `src/app/topics/functions/` to the new slug and point it at the new content.
3. Set `ready: true` for the topic in `src/content/topics.ts`.

## Roadmap

- More topics.
- Paid plans: `profiles.plan` already exists in the schema as groundwork for gating
  premium content with Stripe.
