# RanEddie — Product Studio

A premium, dark-first one-page studio website built with Next.js, React, Tailwind CSS v4 and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

## RanEddie ID (sign-in)

Accounts are handled by the separate **RanEddie ID** app (`raneddie321/kaki`, folder `raneddie-id/`,
Vercel project `kaki`) at https://accounts.raneddie.com. This site only:

- shows a **Sign in** button that sends visitors to `https://accounts.raneddie.com/sign-in?redirect_url=<current page>`, and
- once signed in (the Clerk session cookie is shared across `*.raneddie.com`), shows an account menu with
  **Account Center** (`https://accounts.raneddie.com/account`) and **Sign out**.

Environment variables (Vercel project `raneddie-xisa`, Production target):

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Same Clerk application as RanEddie ID (`pk_live_…`). If unset, the site still works and just shows the Sign in button |
| `CLERK_SECRET_KEY` | Server only. Never commit it |

Clerk production sessions only load on `raneddie.com` / `www.raneddie.com`; on `*.vercel.app` URLs the
button simply stays a Sign in link.

## Products
- Fizz Browser: https://fizzbrowser.vercel.app/
- Snake Brawl: https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie

The Fizz browser visual is an original concept mockup, not a captured product screenshot. No unverified download counts or ratings are presented as facts.
