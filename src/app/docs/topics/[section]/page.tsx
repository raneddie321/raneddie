import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content-store';
import { allDocs, sections } from '@/lib/docs';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { JsonLd, collectionLd, pageMeta } from '@/lib/seo';
import { DocsSearch } from '@/components/docs-nav';

export const revalidate = 600;

type Props = { params: Promise<{ section: string }> };

export async function generateStaticParams() {
  return sections(allDocs(await getContent())).map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const s = sections(allDocs(await getContent())).find((x) => x.slug === section);
  return s ? pageMeta({ title: `${s.name} Docs and Guides`, description: `${s.items.length} RanEddie help articles about ${s.name}: ${s.items.slice(0, 3).map((d) => d.title).join(', ')} and more.`, path: `/docs/topics/${s.slug}` }) : {};
}

export default async function TopicPage({ params }: Props) {
  const { section } = await params;
  const content = await getContent();
  const all = sections(allDocs(content));
  const s = all.find((x) => x.slug === section);
  if (!s) notFound();
  const product = content.products.find((p) => p.name === s.name);

  return (
    <main className="site docs-site" dir="ltr">
      <JsonLd data={collectionLd({ name: `${s.name} Docs`, description: `${s.items.length} articles about ${s.name}.`, path: `/docs/topics/${s.slug}`, items: s.items, crumbs: [{ name: 'Docs', path: '/docs' }, { name: s.name, path: `/docs/topics/${s.slug}` }] })} />
      <SiteHeader site={content.site} />
      <section className="docs-hero docs-hero-small">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/docs">Docs</a> <span>/</span> <b>{s.name}</b>
          </nav>
          <h1>{s.name}</h1>
          <p>
            {s.items.length} articles
            {product && (
              <>
                {' · '}
                <a href={`/${product.slug}`}>About {product.name}</a>
              </>
            )}
          </p>
          <DocsSearch big />
        </div>
      </section>
      <section className="docs-topic-list">
        {s.items.map((d) => (
          <a key={d.slug} href={`/docs/${d.slug}`}>
            <b>{d.title}</b>
            <small>{d.description}</small>
          </a>
        ))}
      </section>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
