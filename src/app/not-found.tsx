import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { DocsSearch } from '@/components/docs-nav';

export default async function NotFound() {
  const content = await getContent();
  return (
    <main className="site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className="notfound">
        <div>
          <b className="code">404</b>
          <h1>This page wandered off.</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has moved. Try searching the docs:</p>
          <DocsSearch big />
          <div className="notfound-links">
            <a className="hero-cta" href="/">Back to home</a>
            <a className="ghost-cta" href="/#products">Browse products</a>
            <a className="ghost-cta" href="/contact">Contact us</a>
          </div>
        </div>
      </section>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
