import type { Metadata } from 'next';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { getContent } from '@/lib/content-store';
import { renderMarkdown } from '@/lib/markdown';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({
  title: 'About RanEddie',
  description: 'RanEddie is a multi-industry technology company started in Israel in 2024 by young founders Eddie Katsir and Ran Nachshon. One company, multiple industries, unlimited possibilities.',
  path: '/about',
});

const ABOUT_MD = `RanEddie is a technology and innovation company started in **2024** in **Israel** by two 13-year-old entrepreneurs, **Eddie Katsir** and **Ran Nachshon**. **Tomer Katsir** is the company's adult partner and is responsible for its legal, financial and business side.

Instead of building a single app, RanEddie is built as a multi-industry company: software, artificial intelligence, cloud, gaming, media and consumer technology. Every product connects to one account, [RanEddie ID](https://id.raneddie.com), so people sign in once and use everything.

## Our mission

To create innovative products, develop valuable technologies, build lasting brands and grow into a recognized international technology company.

## What we're building

- **[Fizz Browser](/fizz)**: the browser that rewards you.
- **[Snake Brawl](/snake-brawl)**: a fast multiplayer snake game.
- **[RanEddie ID](https://id.raneddie.com)**: one free, secure account for every RanEddie product.
- And more on the way: Cloudly, rEmail, workIT, EditTime, BlueBear Media and others. [See all products](/#products).

## Our values

Innovation, ambition, quality, independence, collaboration, responsibility, long-term thinking and customer focus.

## The team

- **Eddie Katsir**: co-founder
- **Ran Nachshon**: co-founder
- **Tomer Katsir**: partner

## Get in touch

Press: [support@raneddie.com](mailto:support@raneddie.com) · Everything else: [contact us](/contact) · [Press kit](/press)
`;

export default async function AboutPage() {
  const content = await getContent();
  const { html } = renderMarkdown(ABOUT_MD);
  return (
    <main className="site" dir="ltr">
      <JsonLd data={webPageLd({ type: 'AboutPage', name: 'About RanEddie', description: 'About RanEddie, its founders and its mission.', path: '/about' })} />
      <SiteHeader site={content.site} />
      <section className="page-hero">
        <div>
          <span className="kicker">ABOUT</span>
          <h1>One company. Multiple industries.</h1>
          <p>Unlimited possibilities.</p>
        </div>
      </section>
      <section className="lab-section product-about">
        <div className="about-grid">
          <div>
            <span className="kicker">RANEDDIE</span>
            <h2>Building the future.</h2>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
