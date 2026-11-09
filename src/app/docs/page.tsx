import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Gamepad2, Globe2, LifeBuoy, ShieldCheck } from 'lucide-react';
import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { DocsSearch } from '@/components/docs-nav';

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const { docsHome } = await getContent();
  return { title: 'Docs', description: docsHome.subtitle };
}

const ICONS: Record<string, React.ReactNode> = {
  'RanEddie ID': <ShieldCheck size={22} />,
  'Fizz Browser': <Globe2 size={22} />,
  'Snake Brawl': <Gamepad2 size={22} />,
  Support: <LifeBuoy size={22} />,
};

export default async function DocsHome() {
  const content = await getContent();
  const links = content.docs.map(({ slug, section, title, description }) => ({ slug, section, title, description }));
  const sections = new Map<string, typeof links>();
  for (const d of links) sections.set(d.section, [...(sections.get(d.section) ?? []), d]);

  return (
    <main className="site docs-site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className="docs-hero">
        <div>
          <span className="kicker">DOCUMENTATION</span>
          <h1>{content.docsHome.title}</h1>
          <p>{content.docsHome.subtitle}</p>
          <DocsSearch docs={links} big />
        </div>
      </section>
      <section className="docs-sections">
        {[...sections.entries()].map(([section, items]) => (
          <article key={section} className="docs-section-card">
            <header>
              <i>{ICONS[section] ?? <BookOpen size={22} />}</i>
              <h2>{section}</h2>
            </header>
            <ul>
              {items.map((d) => (
                <li key={d.slug}>
                  <a href={`/docs/${d.slug}`}>
                    <b>{d.title}</b>
                    <small>{d.description}</small>
                  </a>
                </li>
              ))}
            </ul>
            <a className="docs-section-more" href={`/docs/${items[0].slug}`}>
              Start reading <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </section>
      <SiteFooter content={content} />
    </main>
  );
}
