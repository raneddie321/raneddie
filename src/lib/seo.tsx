/**
 * Structured data (schema.org JSON-LD) for search engines. Invisible on the page.
 * Add official profile URLs (Crunchbase, LinkedIn, X, GitHub…) to SAME_AS.
 */
import type { Metadata } from 'next';
import type { Product, DocPage } from './content';

export const SITE = 'https://raneddie.com';
export const SAME_AS: string[] = [
  'https://www.crunchbase.com/organization/raneddie',
  'https://www.facebook.com/people/RanEddie/61596527725996/?rdid=P8ilncoQVyLpvyMx&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1QuezS6Zfu%2F',
  'https://x.com/RanEddiegk',
  'https://www.instagram.com/raneddie_/',
  'https://www.threads.com/@raneddie_',
  'https://www.youtube.com/@raneddie_inc',
  'https://github.com/RanEddie',
  // 'https://www.linkedin.com/company/…',
];

export function JsonLd({ data }: { data: object }) {
  // Escape "<" so content can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function organizationLd(contactEmail: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'RanEddie',
        alternateName: ['RanEddie Studio', 'רנאדי'],
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}/images/raneddie-mark.png`, width: 333, height: 262 },
        description,
        email: contactEmail,
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: contactEmail, url: `${SITE}/contact`, availableLanguage: ['English'] }],
        ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        name: 'RanEddie',
        alternateName: 'רנאדי',
        url: SITE,
        publisher: { '@id': `${SITE}/#organization` },
        inLanguage: 'en',
      },
    ],
  };
}

const APP_CATEGORY: Record<string, string> = {
  BROWSER: 'BrowserApplication', GAME: 'GameApplication', GAMES: 'GameApplication', PRODUCTIVITY: 'BusinessApplication',
  VIDEO: 'MultimediaApplication', CLOUD: 'UtilitiesApplication', EMAIL: 'CommunicationApplication', DEVELOPERS: 'DeveloperApplication',
  SECURITY: 'SecurityApplication', FINANCE: 'FinanceApplication',
};

export function productLd(p: Product) {
  const url = `${SITE}/${p.slug}`;
  const image = p.image ? (p.image.startsWith('http') ? p.image : `${SITE}${p.image}`) : undefined;
  const crumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE}/#products` },
      { '@type': 'ListItem', position: 3, name: p.name, item: url },
    ],
  };
  const category = APP_CATEGORY[p.category];
  const main = category
    ? { '@type': p.category.startsWith('GAME') ? ['SoftwareApplication', 'VideoGame'] : 'SoftwareApplication', applicationCategory: category, operatingSystem: p.platforms.join(', ') || undefined }
    : { '@type': 'Brand' };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...main, '@id': `${url}#product`, name: p.name, url, description: p.summary, slogan: p.tagline, image, publisher: { '@id': `${SITE}/#organization` }, ...(category ? {} : { logo: image }) },
      crumbs,
    ],
  };
}

export function docLd(d: DocPage, sectionSlug: string) {
  const url = `${SITE}/docs/${d.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TechArticle', headline: d.title, description: d.description, url, articleSection: d.section, inLanguage: 'en', publisher: { '@id': `${SITE}/#organization` }, isPartOf: { '@id': `${SITE}/#website` } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Docs', item: `${SITE}/docs` },
          { '@type': 'ListItem', position: 2, name: d.section, item: `${SITE}/docs/topics/${sectionSlug}` },
          { '@type': 'ListItem', position: 3, name: d.title, item: url },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------- page metadata

const TWITTER = '@RanEddiegk';

/** Title, description, canonical URL, Open Graph and Twitter card for one page. */
export function pageMeta({ title, description, path, type = 'website', absoluteTitle = false, image = '/opengraph-image' }: { title: string; description: string; path: string; type?: 'website' | 'article'; absoluteTitle?: boolean; image?: string }): Metadata {
  const img = { url: `${SITE}${image}`, width: 1200, height: 630, alt: title };
  const fullTitle = absoluteTitle ? title : `${title} | RanEddie`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: `${SITE}${path}`, siteName: 'RanEddie', type, locale: 'en_US', images: [img] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, site: TWITTER, creator: TWITTER, images: [img] },
  };
}

/** Docs pages named "<product> FAQ" / "Frequently asked questions" are written as "## Question\nAnswer". */
export function faqLd(d: DocPage) {
  const qa = [...d.body.matchAll(/^## (.+\?)\s*\n([\s\S]*?)(?=\n## |\s*$)/gm)]
    .map(([, q, a]) => ({ q: q.trim(), a: a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim() }))
    .filter((x) => x.a);
  if (qa.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function productListLd(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RanEddie products',
    itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${p.slug}`, name: p.name })),
  };
}

export function collectionLd({ name, description, path, items, crumbs }: { name: string; description: string; path: string; items: { title: string; slug: string }[]; crumbs: { name: string; path: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name,
        description,
        url: `${SITE}${path}`,
        isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items.slice(0, 100).map((d, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/docs/${d.slug}`, name: d.title })) },
      },
      { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE}${c.path}` })) },
    ],
  };
}

export function webPageLd({ type = 'WebPage', name, description, path }: { type?: 'WebPage' | 'ContactPage' | 'AboutPage'; name: string; description: string; path: string }) {
  return { '@context': 'https://schema.org', '@type': type, name, description, url: `${SITE}${path}`, isPartOf: { '@id': `${SITE}/#website` }, publisher: { '@id': `${SITE}/#organization` } };
}
