# RanEddie — Product Studio

A premium, responsive product-studio website built with Next.js, React, Tailwind CSS v4 and Framer Motion.

## Products
- **Fizz** — AI chat for questions, research, writing and ideas.
- **Fizz DEV** — AI coding and build agent for writing code, building websites, connecting integrations and helping with product research and purchasing tasks.
- **Snake Brawl** — Multiplayer Snake battle arena. [Google Play](https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie)

## RanEddie ID
The `/account` area integrates with the existing custom RanEddie ID Edge Function in the Supabase project `RanEddie ID`:
- Signup and email verification
- Login by email, username or RanEddie ID
- Session validation and logout
- Profile updates (full name, username, avatar URL, bio and website)

Profile updates are written by the Edge Function to `public.raneddie_users` and `metadata.profile`. The browser only uses the project's publishable key; the service-role key and JWT signing secret remain server-side.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

The Snake Brawl artwork and RanEddie logo use the exact image URLs supplied for this site.
