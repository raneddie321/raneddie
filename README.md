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

## Products
- Fizz Browser: https://fizzbrowser.vercel.app/
- Snake Brawl: https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie

The Fizz browser visual is an original concept mockup, not a captured product screenshot. No unverified download counts or ratings are presented as facts.

## Editing the site (RanEddie Studio)
All homepage text, products (pages at `raneddie.com/<product>`), docs (`/docs`), images and the logo are edited in RanEddie Studio.

- Lives at a secret path on the Vercel domain only (`*.vercel.app/<ADMIN_PATH>`); everywhere else it is a 404.
- Login with `ADMIN_ACCESS_CODE`. Both are Vercel environment variables — never commit them.
- Content and uploaded images are stored in Vercel Blob (`BLOB_READ_WRITE_TOKEN`). Every publish keeps a version (last 40) that can be restored from **History**.
- Without saved content the site shows the defaults in `src/lib/content.ts`.

## Products and docs library
Products, product illustrations and the ~700 built-in docs are generated from `scripts/content/*.py`:

```bash
python3 scripts/generate-content.py
```

This writes `src/data/products.json`, `src/data/docs-library.json` and `public/images/products/*.svg`, and fails on duplicate slugs or broken internal links. Pages edited in RanEddie Studio are stored as overrides on top of the library.
