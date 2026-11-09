import { getContent } from '@/lib/content-store';
import { renderMarkdown } from '@/lib/markdown';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export async function LegalPage({ title, updated, markdown }: { title: string; updated: string; markdown: string }) {
  const content = await getContent();
  const { html, toc } = renderMarkdown(markdown);
  return (
    <main className="site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className="page-hero">
        <div>
          <span className="kicker">LEGAL</span>
          <h1>{title}</h1>
          <p>Last updated {updated}</p>
        </div>
      </section>
      <div className="docs-layout legal-layout">
        <article className="docs-article">
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <aside className="docs-toc" aria-label="On this page">
          <p>On this page</p>
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`}>{t.text}</a>
          ))}
        </aside>
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
