/**
 * Everything on raneddie.com that can be edited from the admin panel.
 * The defaults below are the live site content; the admin saves a full copy of this shape.
 */

export type Visual = 'fizz' | 'snake' | 'image';

export type Cta = { label: string; href: string };

export type Slide = {
  id: string;
  label: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  cta: Cta;
  visual: Visual;
  /** Used when visual is "image" (and as the Snake Brawl artwork). */
  image: string;
  badge: string;
};

export type Feature = { title: string; text: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  /** One or two sentences: product card, page intro and search snippets. */
  summary: string;
  /** Markdown, shown on the product page under "About". */
  body: string;
  visual: Visual;
  image: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  features: Feature[];
  platforms: string[];
  status: 'available' | 'coming-soon';
  showOnHome: boolean;
};

export type LabItem = { id: string; meta: string; title: string; text: string };

export type DocPage = {
  slug: string;
  section: string;
  title: string;
  description: string;
  /** Markdown. "## Heading" lines become the "On this page" links. */
  body: string;
};

export type SiteContent = {
  site: {
    logo: string;
    title: string;
    description: string;
    navCta: Cta;
    contactEmail: string;
    footerText: string;
  };
  slides: Slide[];
  productsSection: { eyebrow: string; title: string; subtitle: string };
  products: Product[];
  labSection: { eyebrow: string; title: string };
  lab: LabItem[];
  studio: { eyebrow: string; title: string; text: string };
  docsHome: { title: string; subtitle: string };
  /** Docs pages edited or added in Studio (overrides of the built-in library, matched by slug). */
  docs: DocPage[];
  /** Built-in docs pages hidden in Studio. */
  docsRemoved: string[];
  schema: number;
};

import catalogue from '@/data/products.json';

/** Bump when defaults gain items that older saves should pick up (see withDefaults). */
export const CONTENT_SCHEMA = 2;

export const FIZZ_URL = 'https://fizzbrowser.vercel.app/';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie';
export const RANEDDIE_ID_URL = 'https://id.raneddie.com';

export const DEFAULT_CONTENT: SiteContent = {
  site: {
    logo: 'https://i.ibb.co/spvRBsHC/Chat-GPT-Image-Mar-23-2026-06-23-40-PM-removebg-preview-1-1.png',
    title: 'RanEddie — Building the Future of Play & Productivity',
    description: 'Discover products by RanEddie: Fizz Browser, Snake Brawl and what comes next.',
    navCta: { label: 'Get Fizz', href: FIZZ_URL },
    contactEmail: 'contact@raneddie.com',
    footerText: '© 2026 RanEddie Studio. All rights reserved.',
  },
  slides: [
    {
      id: 'fizz',
      label: 'BROWSER, REIMAGINED',
      titleLine1: 'Meet Fizz.',
      titleLine2: 'The browser that rewards you.',
      description:
        'A fresh way to explore the web. Discover a faster, more personal browsing experience, with rewards built into the journey.',
      cta: { label: 'Discover Fizz', href: FIZZ_URL },
      visual: 'fizz',
      image: '',
      badge: '',
    },
    {
      id: 'snake',
      label: 'A NEW KIND OF CLASSIC',
      titleLine1: 'Snake Brawl.',
      titleLine2: 'Enter the arena.',
      description: 'Classic Snake meets modern multiplayer competition. Grow, outplay and make every round count.',
      cta: { label: 'Play on Google Play', href: PLAY_URL },
      visual: 'snake',
      image: '/images/snake-brawl-art.svg',
      badge: 'MULTIPLAYER ARENA',
    },
  ],
  productsSection: {
    eyebrow: 'THE RANEDDIE COLLECTION',
    title: 'Made to move you forward.',
    subtitle: 'Useful by design. Memorable by nature.',
  },
  products: catalogue as Product[],
  labSection: { eyebrow: 'IN DEVELOPMENT', title: "There's more in the making." },
  lab: [
    { id: 'neon', meta: 'PROJECT NEON · Q1 2027', title: 'NEON', text: 'A new kind of digital energy.' },
    { id: 'vault', meta: 'PROJECT VAULT · COMING SOON', title: 'VAULT', text: 'Something worth keeping close.' },
    { id: 'flow', meta: 'PROJECT FLOW · RESEARCH', title: 'FLOW', text: 'Make space for what matters.' },
  ],
  studio: {
    eyebrow: 'THE STUDIO',
    title: 'Ideas into experiences.',
    text: 'RanEddie is an independent product studio building digital products across browsers, games, apps and the web. Thoughtful design, careful engineering, and a belief that software should feel great to use.',
  },
  docsHome: {
    title: 'RanEddie Docs',
    subtitle: 'Guides and answers for RanEddie ID, Fizz Browser and Snake Brawl.',
  },
  // Built-in docs live in src/data/docs-library.json; this holds only pages edited or added in Studio.
  docs: [],
  docsRemoved: [],
  schema: CONTENT_SCHEMA,
};

/** Fills anything missing in saved content from the defaults, so older saves keep working. */
export function withDefaults(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONTENT;
  const d = DEFAULT_CONTENT;
  return {
    site: { ...d.site, ...(saved.site ?? {}) },
    slides: Array.isArray(saved.slides) && saved.slides.length ? saved.slides.map((s) => ({ ...d.slides[0], ...s, cta: { ...d.slides[0].cta, ...(s?.cta ?? {}) } })) : d.slides,
    productsSection: { ...d.productsSection, ...(saved.productsSection ?? {}) },
    products: (() => {
      const fill = (p: Partial<Product>): Product => ({
        ...d.products[0],
        ...p,
        primaryCta: { ...d.products[0].primaryCta, ...(p?.primaryCta ?? {}) },
        secondaryCta: { ...{ label: '', href: '' }, ...(p?.secondaryCta ?? {}) },
        features: Array.isArray(p?.features) ? p.features : [],
        platforms: Array.isArray(p?.platforms) ? p.platforms : [],
      });
      if (!Array.isArray(saved.products)) return d.products;
      const list = saved.products.map(fill);
      // Saves from before this schema don't know about newer default products: add them.
      if ((saved.schema ?? 1) < CONTENT_SCHEMA) {
        const have = new Set(list.map((p) => p.slug));
        for (const p of d.products) if (!have.has(p.slug)) list.push(p);
      }
      return list;
    })(),
    labSection: { ...d.labSection, ...(saved.labSection ?? {}) },
    lab: Array.isArray(saved.lab) ? saved.lab : d.lab,
    studio: { ...d.studio, ...(saved.studio ?? {}) },
    docsHome: { ...d.docsHome, ...(saved.docsHome ?? {}) },
    docs: Array.isArray(saved.docs) ? saved.docs : d.docs,
    docsRemoved: Array.isArray(saved.docsRemoved) ? saved.docsRemoved : [],
    schema: CONTENT_SCHEMA,
  };
}

/** URL-safe slug: lowercase letters, numbers and dashes. */
export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** Paths a product slug may not use, because the site already has pages there. */
export const RESERVED_SLUGS = new Set(['docs', 'api', 'images', '_next', 're-admin-internal', 'admin', 'sign-in', 'sign-up', 'account']);
