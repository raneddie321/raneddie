/**
 * Structured data (schema.org JSON-LD) for search engines. Invisible on the page.
 * Add official profile URLs (Crunchbase, LinkedIn, X, GitHub…) to SAME_AS.
 */
import type { Product, DocPage } from './content';

export const SITE = 'https://raneddie.com';
export const SAME_AS: string[] = [
  // 'https://www.crunchbase.com/organization/…',
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
