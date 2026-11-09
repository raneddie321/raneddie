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
  docs: DocPage[];
};

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
  products: [
    {
      slug: 'fizz',
      name: 'Fizz Browser',
      category: 'BROWSER',
      tagline: 'The browser that rewards you.',
      summary:
        'A fresh way to explore the web — a faster, more personal browsing experience with rewards built into the journey.',
      body: `Fizz is RanEddie's take on what a browser should feel like today: quick to open, calm to look at and personal from the first tab.

## Built around you
Fizz keeps the things you use most one tap away, so getting where you want to go takes less effort.

## Rewards in the journey
Rewards are part of the experience rather than an add-on — explore the web the way you normally would.

## Your RanEddie ID
Sign in with the same RanEddie ID you use across RanEddie products.`,
      visual: 'fizz',
      image: '',
      primaryCta: { label: 'Get Fizz', href: FIZZ_URL },
      secondaryCta: { label: 'Read the docs', href: '/docs/fizz-getting-started' },
      features: [
        { title: 'Fast by default', text: 'A lightweight experience that gets out of the way.' },
        { title: 'Rewards built in', text: 'Explore the web and get more back along the way.' },
        { title: 'Personal', text: 'Make Fizz yours with the things you use most.' },
      ],
      platforms: ['Web'],
      status: 'available',
      showOnHome: true,
    },
    {
      slug: 'snake-brawl',
      name: 'Snake Brawl',
      category: 'GAME',
      tagline: 'Nostalgia meets competition.',
      summary: 'Classic Snake meets modern multiplayer competition. Grow, outplay and make every round count.',
      body: `Snake Brawl takes the game everyone knows and turns it into an arena.

## Play your way
Jump into a quick solo round or challenge a friend on the same Wi-Fi network.

## Keep your progress
Connect your RanEddie ID to back up your progress to the cloud and pick it up on another device.

## Made for phones
Snake Brawl is built for touch, with controls that feel natural from the first round.`,
      visual: 'snake',
      image: '/images/snake-brawl-art.svg',
      primaryCta: { label: 'Get it on Google Play', href: PLAY_URL },
      secondaryCta: { label: 'Read the docs', href: '/docs/snake-brawl-getting-started' },
      features: [
        { title: 'Arena multiplayer', text: 'Play with a friend on the same local Wi-Fi network.' },
        { title: 'Cloud saves', text: 'Connect your RanEddie ID to keep your progress safe.' },
        { title: 'Classic, upgraded', text: 'The Snake you know, rebuilt for competition.' },
      ],
      platforms: ['Android'],
      status: 'available',
      showOnHome: true,
    },
  ],
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
  docs: [
    {
      slug: 'getting-started',
      section: 'Get started',
      title: 'Welcome to RanEddie Docs',
      description: 'Find your way around RanEddie products and your RanEddie ID.',
      body: `RanEddie builds browsers, games and apps that share one account: your **RanEddie ID**.

## What you can find here
- **RanEddie ID** — creating an account, signing in, security and connected games.
- **Fizz Browser** — getting started with Fizz.
- **Snake Brawl** — playing, multiplayer and cloud saves.
- **Support** — answers to common questions and how to reach us.

## Need help?
If you can't find what you're looking for, email [contact@raneddie.com](mailto:contact@raneddie.com).`,
    },
    {
      slug: 'raneddie-id-create-account',
      section: 'RanEddie ID',
      title: 'Create a RanEddie ID',
      description: 'One account for every RanEddie product.',
      body: `A RanEddie ID lets you sign in to RanEddie products and keep your progress and purchases safe.

## Before you start
- You need an email address you can open.
- You must be at least 13 years old.

## Create your account
1. Go to [id.raneddie.com/sign-up](https://id.raneddie.com/sign-up).
2. Enter your email and choose a password of at least 15 characters. A short phrase works well.
3. Enter your date of birth and country.
4. Complete the quick security check.
5. Pick a username — this is how other players see you.
6. Enter the 6-digit code we email you.

## Tips for a strong password
Use a phrase of several words that you don't use anywhere else. Passwords that appeared in known data leaks are rejected automatically.`,
    },
    {
      slug: 'raneddie-id-sign-in',
      section: 'RanEddie ID',
      title: 'Sign in',
      description: 'Sign in to your RanEddie ID on any device.',
      body: `## Sign in
1. Select **Sign in** at the top of raneddie.com, or go to [id.raneddie.com/sign-in](https://id.raneddie.com/sign-in).
2. Enter your email, then your password.

## Signing in on a new device
When you sign in on a device we haven't seen before, we email you a 6-digit code to confirm it's you.

## Two-step verification
If you turned on an authenticator app, you'll be asked for the 6-digit code from the app after your password.

## The page keeps loading
Make sure you're on **id.raneddie.com**, check your connection and turn off content blockers for the page, then try again.`,
    },
    {
      slug: 'raneddie-id-reset-password',
      section: 'RanEddie ID',
      title: 'Reset your password',
      description: 'Forgot your password? Get back in with a code sent to your email.',
      body: `## Reset your password
1. On the sign-in page, enter your email and select **Forgot password?**
2. Enter the 6-digit code we send to your email.
3. Choose a new password of at least 15 characters.

You're signed in right away, and you're signed out on your other devices.

## Didn't get the email?
Check your spam folder and wait a minute, then select **Send a new code**.`,
    },
    {
      slug: 'raneddie-id-security',
      section: 'RanEddie ID',
      title: 'Security and devices',
      description: 'Password, two-step verification and active sessions.',
      body: `Manage security from the **Security** page of your [Account Center](https://id.raneddie.com/account).

## Change your password
Enter your current password and a new one. Your other sessions are signed out.

## Authenticator app
Add an authenticator app to require a 6-digit code when you sign in.

## Active sessions
See where you're signed in and revoke any session you don't recognize.`,
    },
    {
      slug: 'raneddie-id-connect-game',
      section: 'RanEddie ID',
      title: 'Connect a game',
      description: 'Link Snake Brawl or Fizz App to your RanEddie ID.',
      body: `## Connect
1. In the game, select **Connect RanEddie ID**.
2. Sign in, or create a RanEddie ID.
3. Approve the connection — you're sent back to the game.

## Disconnect
Open **Connected products** in your [Account Center](https://id.raneddie.com/account) and select **Disconnect**. The game is signed out on every device.`,
    },
    {
      slug: 'fizz-getting-started',
      section: 'Fizz Browser',
      title: 'Get started with Fizz',
      description: 'Start browsing with Fizz.',
      body: `## Open Fizz
Go to [fizzbrowser.vercel.app](https://fizzbrowser.vercel.app/) to get Fizz.

## Sign in
Use your RanEddie ID to keep things in sync across RanEddie products.

## Questions
Email [contact@raneddie.com](mailto:contact@raneddie.com).`,
    },
    {
      slug: 'snake-brawl-getting-started',
      section: 'Snake Brawl',
      title: 'Get started with Snake Brawl',
      description: 'Install the game and play your first round.',
      body: `## Install
Get Snake Brawl from [Google Play](${PLAY_URL}).

## Play with a friend
Friends mode works for two players on the same local Wi-Fi network. One player hosts and the other joins.

## Save your progress
Connect your RanEddie ID from the game to back up your progress. See [Connect a game](/docs/raneddie-id-connect-game).`,
    },
    {
      slug: 'support-faq',
      section: 'Support',
      title: 'Frequently asked questions',
      description: 'Quick answers to common questions.',
      body: `## Is a RanEddie ID free?
Yes. Creating a RanEddie ID is free.

## How old do I need to be?
You must be at least 13 years old to create a RanEddie ID.

## How do I delete my account?
If account deletion is available, you'll find it under **Privacy** in your [Account Center](https://id.raneddie.com/account). Otherwise, contact us.

## How do I contact RanEddie?
Email [contact@raneddie.com](mailto:contact@raneddie.com).`,
    },
  ],
};

/** Fills anything missing in saved content from the defaults, so older saves keep working. */
export function withDefaults(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONTENT;
  const d = DEFAULT_CONTENT;
  return {
    site: { ...d.site, ...(saved.site ?? {}) },
    slides: Array.isArray(saved.slides) && saved.slides.length ? saved.slides.map((s) => ({ ...d.slides[0], ...s, cta: { ...d.slides[0].cta, ...(s?.cta ?? {}) } })) : d.slides,
    productsSection: { ...d.productsSection, ...(saved.productsSection ?? {}) },
    products: Array.isArray(saved.products)
      ? saved.products.map((p) => ({
          ...d.products[0],
          ...p,
          primaryCta: { ...d.products[0].primaryCta, ...(p?.primaryCta ?? {}) },
          secondaryCta: { ...{ label: '', href: '' }, ...(p?.secondaryCta ?? {}) },
          features: Array.isArray(p?.features) ? p.features : [],
          platforms: Array.isArray(p?.platforms) ? p.platforms : [],
        }))
      : d.products,
    labSection: { ...d.labSection, ...(saved.labSection ?? {}) },
    lab: Array.isArray(saved.lab) ? saved.lab : d.lab,
    studio: { ...d.studio, ...(saved.studio ?? {}) },
    docsHome: { ...d.docsHome, ...(saved.docsHome ?? {}) },
    docs: Array.isArray(saved.docs) ? saved.docs : d.docs,
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
