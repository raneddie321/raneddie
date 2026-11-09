import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getContent } from '@/lib/content-store';
import { renderMarkdown } from '@/lib/markdown';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { DocsSidebar } from '@/components/docs-nav';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getContent()).docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getContent()).docs.find((d) => d.slug === slug);
  return doc ? { title: `${doc.title} — Docs`, description: doc.description } : {};
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const index = content.docs.findIndex((d) => d.slug === slug);
  if (index < 0) notFound();
  const doc = content.docs[index];
  const { html, toc } = renderMarkdown(doc.body);
  const links = content.docs.map(({ slug, section, title, description }) => ({ slug, section, title, description }));
  const prev = content.docs[index - 1];
  const next = content.docs[index + 1];

  return (
    <main className="site docs-site" dir="ltr">
      <SiteHeader site={content.site} />
      <div className="docs-layout">
        <DocsSidebar docs={links} active={doc.slug} />
        <article className="docs-article">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/docs">Docs</a> <span>/</span> <span>{doc.section}</span> <span>/</span> <b>{doc.title}</b>
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
      <SiteFooter content={content} />
    </main>
  );
}
