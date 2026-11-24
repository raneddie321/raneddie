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

export type CampaignProduct = { name: string; text: string; href: string; inDevelopment: boolean };
export type Campaign = {
  /** Off = no banner and /support shows nothing about the campaign. */
  enabled: boolean;
  url: string;
  /** YYYY-MM-DD; the banner hides itself after this day. */
  endsAt: string;
  bannerText: string;
  bannerBold: string;
  bannerCta: string;
  kicker: string;
  title: string;
  lead: string;
  ctaLabel: string;
  note: string;
  productsTitle: string;
  products: CampaignProduct[];
  moneyTitle: string;
  money: string[];
  shareTitle: string;
  shareText: string;
  /** The message people send when they share (WhatsApp, X). */
  shareMessage: string;
  bottomCtaLabel: string;
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
  /** The crowdfunding campaign: the banner on every page and the /support page. Edited in Studio → Campaign. */
  campaign: Campaign;
  /** Docs pages edited or added in Studio (overrides of the built-in library, matched by slug). */
  docs: DocPage[];
  /** Built-in docs pages hidden in Studio. */
  docsRemoved: string[];
  schema: number;
};

import catalogue from '@/data/products.json';

/** Bump when defaults gain items that older saves should pick up (see withDefaults). */
export const CONTENT_SCHEMA = 3;

/** The RanEddie logo shipped with the site (the old one was hot-linked from an image host). */
export const DEFAULT_LOGO = '/images/raneddie-mark.png';
const OLD_LOGO = 'https://i.ibb.co/spvRBsHC/Chat-GPT-Image-Mar-23-2026-06-23-40-PM-removebg-preview-1-1.png';

export const FIZZ_URL = 'https://fizzbrowser.vercel.app/';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie';
export const RANEDDIE_ID_URL = 'https://id.raneddie.com';

export const DEFAULT_CONTENT: SiteContent = {
  site: {
    logo: DEFAULT_LOGO,
    title: 'RanEddie — Building the Future of Play & Productivity',
    description: 'Discover products by RanEddie: Fizz Browser, Snake Brawl and what comes next.',
    navCta: { label: 'Get started', href: '/#products' },
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
  campaign: {
    enabled: true,
    url: 'https://headstart.co.il/project/92954',
    endsAt: '2027-02-11',
    bannerText: 'Two 13-year-olds are building RanEddie.',
    bannerBold: 'Back us on Headstart',
    bannerCta: 'Learn more →',
    kicker: 'HEADSTART CAMPAIGN',
    title: 'Two 13-year-olds. One tech company. And you.',
    lead: "We're Eddie and Ran, both 13, from Hadera, Israel. We started building RanEddie in 2024, and since then we've been building an AI assistant, a PC game, a clothing brand and one account that connects them all. Now we need you to keep going.",
    ctaLabel: 'Back us on Headstart →',
    note: "It's all-or-nothing: if we don't reach the goal, we get nothing. Every pledge, even ₪18, helps us get there.",
    productsTitle: "What we're building",
    products: [
      { name: 'Fizz', text: 'An AI assistant, plus Fizz Dev: an agent that builds websites, apps and games.', href: 'https://fizz.raneddie.com', inDevelopment: true },
      { name: 'Floppy', text: 'A PC game we are building ourselves, heading for Steam.', href: '', inDevelopment: true },
      { name: 'Editime', text: 'AI video creation: turn an idea into a finished video.', href: '', inDevelopment: true },
      { name: 'Sam Bot', text: 'An AI bot we are building. More soon.', href: '', inDevelopment: true },
      { name: 'PandBand', text: 'A clothing brand with an online store: tees, hoodies and more.', href: 'https://pandband.raneddie.com', inDevelopment: false },
      { name: 'RanEddie ID', text: 'One account for all our products, with privacy and security built in.', href: 'https://id.raneddie.com', inDevelopment: false },
    ],
    moneyTitle: 'Where the money goes',
    money: [
      'Servers, cloud services and AI models our products run on',
      'Finishing Fizz and launching it to everyone',
      'Steam and Google Play developer accounts to launch our games',
      'Launching Floppy and building our next games',
      'Development tools, software licences and equipment',
      'Design, branding and new PandBand collections',
      'Registering the company and the legal side of things',
      'Marketing, so more people find our products',
    ],
    shareTitle: 'You can help without money too',
    shareText: 'Share the campaign with one friend. It helps more than you think.',
    shareMessage: 'Two 13-year-olds from Israel are building a tech company, RanEddie. Back them on Headstart 🚀',
    bottomCtaLabel: 'Go to the campaign →',
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

/**
 * A button link exactly as typed in Studio, made into something the browser opens as intended:
 * "pandband.raneddie.com" or "www.x.com/y" become "https://…" (otherwise the browser would treat them as a page
 * on raneddie.com). Links that already have a scheme (https:, mailto:, tel:…), site paths ("/docs") and anchors
 * ("#products") are kept as they are.
 */
export function normalizeHref(href: string | undefined | null): string {
  const h = String(href ?? '').trim();
  if (!h) return '';
  if (h.startsWith('//')) return `https:${h}`;
  if (/^(\/|#|\?)/.test(h)) return h;
  if (/^[a-z][a-z0-9+.-]*:/i.test(h)) return /^javascript:/i.test(h) ? '' : h;
  // Looks like a domain (has a dot before any slash): an outside website.
  if (/^[^\s/]+\.[^\s/]+/.test(h)) return `https://${h}`;
  // Anything else ("docs", "fizz") is a page on this site.
  return `/${h}`;
}
const cta = <T extends { href: string }>(c: T): T => ({ ...c, href: normalizeHref(c.href) });

/** Fills anything missing in saved content from the defaults, so older saves keep working. */
export function withDefaults(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONTENT;
  const d = DEFAULT_CONTENT;
  return {
    site: (() => {
      const site = { ...d.site, ...(saved.site ?? {}) };
      // Schema 3: local logo instead of the hot-linked image, and a company-wide top button.
      if ((saved.schema ?? 1) < 3) {
        if (site.logo === OLD_LOGO) site.logo = DEFAULT_LOGO;
        if (site.navCta?.label === 'Get Fizz') site.navCta = d.site.navCta;
      }
      return { ...site, navCta: cta(site.navCta) };
    })(),
    slides: Array.isArray(saved.slides) && saved.slides.length ? saved.slides.map((s) => ({ ...d.slides[0], ...s, cta: cta({ ...d.slides[0].cta, ...(s?.cta ?? {}) }) })) : d.slides,
    productsSection: { ...d.productsSection, ...(saved.productsSection ?? {}) },
    products: (() => {
      const fill = (p: Partial<Product>): Product => ({
        ...d.products[0],
        ...p,
        primaryCta: cta({ ...d.products[0].primaryCta, ...(p?.primaryCta ?? {}) }),
        secondaryCta: cta({ ...{ label: '', href: '' }, ...(p?.secondaryCta ?? {}) }),
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
    campaign: (() => {
      const c = { ...d.campaign, ...(saved.campaign ?? {}) };
      return {
        ...c,
        url: normalizeHref(c.url) || d.campaign.url,
        products: Array.isArray(c.products) ? c.products.map((p: Partial<CampaignProduct>) => ({ name: String(p?.name ?? ''), text: String(p?.text ?? ''), href: normalizeHref(p?.href), inDevelopment: Boolean(p?.inDevelopment) })) : d.campaign.products,
        money: Array.isArray(c.money) ? c.money.filter((m) => typeof m === 'string') : d.campaign.money,
      };
    })(),
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
export const RESERVED_SLUGS = new Set(['privacy', 'terms', 'contact', 'sitemap.xml', 'robots.txt', 'opengraph-image', 'docs', 'api', 'images', '_next', 're-admin-internal', 'admin', 'sign-in', 'sign-up', 'account', 'support']);
