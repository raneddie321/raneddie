import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getContent } from '@/lib/content-store';
import { allDocs, sections } from '@/lib/docs';
import { renderMarkdown } from '@/lib/markdown';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { DocsSidebar } from '@/components/docs-nav';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

// Pre-render the most-visited pages at build time; the rest render on first visit and are cached.
export async function generateStaticParams() {
  return allDocs(await getContent())
    .slice(0, 60)
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = allDocs(await getContent()).find((d) => d.slug === slug);
  return doc ? { title: `${doc.title} — Docs`, description: doc.description } : {};
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const docs = allDocs(content);
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const all = sections(docs);
  const current = all.find((s) => s.name === doc.section)!;
  const i = current.items.findIndex((d) => d.slug === doc.slug);
  const prev = current.items[i - 1];
  const next = current.items[i + 1];
  const { html, toc } = renderMarkdown(doc.body);
  const sectionLinks = all.map((s) => ({ name: s.name, slug: s.slug, count: s.items.length }));

  return (
    <main className="site docs-site" dir="ltr">
      <SiteHeader site={content.site} />
      <div className="docs-layout">
        <DocsSidebar
          section={{ name: current.name, slug: current.slug, count: current.items.length }}
          items={current.items.map((d) => ({ slug: d.slug, title: d.title }))}
          sections={sectionLinks}
          active={doc.slug}
        />
        <article className="docs-article">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/docs">Docs</a> <span>/</span> <a href={`/docs/topics/${current.slug}`}>{doc.section}</a> <span>/</span> <b>{doc.title}</b>
          </nav>
          <h1>{doc.title}</h1>
          {doc.description && <p className="docs-lead">{doc.description}</p>}
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="docs-pager">
            {prev ? (
              <a href={`/docs/${prev.slug}`}>
                <small><ArrowLeft size={13} /> Previous</small>
                <b>{prev.title}</b>
              </a>
            ) : <span />}
            {next && (
              <a href={`/docs/${next.slug}`} className="next">
                <small>Next <ArrowRight size={13} /></small>
                <b>{next.title}</b>
              </a>
            )}
          </div>
          <p className="docs-help">
            Still need help? <a href={`mailto:${content.site.contactEmail}`}>Contact us</a>
          </p>
        </article>
        {toc.length > 1 && (
          <aside className="docs-toc" aria-label="On this page">
            <p>On this page</p>
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`}>{t.text}</a>
            ))}
          </aside>
        )}
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
