import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/content-store';
import { allDocs, sections } from '@/lib/docs';

const BASE = 'https://raneddie.com';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const docs = allDocs(content);
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ...content.products.map((p) => ({ url: `${BASE}/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...sections(docs).map((s) => ({ url: `${BASE}/docs/topics/${s.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...docs.map((d) => ({ url: `${BASE}/docs/${d.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
}
