import type { Metadata } from 'next';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { getContent } from '@/lib/content-store';
import { renderMarkdown } from '@/lib/markdown';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({
  title: 'Press and Media Kit',
  description: 'RanEddie press kit: company facts, founders, logos, product links and press contact (support@raneddie.com).',
  path: '/press',
});

const PRESS_MD = `## Press contact

[support@raneddie.com](mailto:support@raneddie.com)

## Fast facts

- **Company:** RanEddie
- **Started:** 2024, Israel
- **Founders:** Eddie Katsir and Ran Nachshon (both 13)
- **Partner:** Tomer Katsir
- **What it does:** a multi-industry technology company: software, AI, cloud, gaming and media, all connected by one account, RanEddie ID
- **Tagline:** One Company. Multiple Industries. Unlimited Possibilities.
- **Website:** [raneddie.com](https://raneddie.com)

## Boilerplate

RanEddie is a technology and innovation company started in 2024 in Israel by 13-year-old entrepreneurs Eddie Katsir and Ran Nachshon, with Tomer Katsir as its adult partner. The company builds software, games, AI and digital services connected by a single account, RanEddie ID. Learn more at raneddie.com.

## Products available today

- **Fizz Browser**: [raneddie.com/fizz](/fizz)
- **Snake Brawl**: [raneddie.com/snake-brawl](/snake-brawl)
- **RanEddie ID**: [id.raneddie.com](https://id.raneddie.com)

## Logos

- [RanEddie logo (PNG)](/images/raneddie-mark.png)
- [RanEddie icon (PNG)](/favicon.png)

Please don't alter the logo's colors or proportions.

## More

- [About RanEddie](/about)
- [Crunchbase](https://www.crunchbase.com/organization/raneddie)
`;

export default async function PressPage() {
  const content = await getContent();
  const { html } = renderMarkdown(PRESS_MD);
  return (
    <main className="site" dir="ltr">
      <JsonLd data={webPageLd({ name: 'RanEddie Press and Media Kit', description: 'Company facts, founders, logos and press contact.', path: '/press' })} />
      <SiteHeader site={content.site} />
      <section className="page-hero">
        <div>
          <span className="kicker">PRESS</span>
          <h1>Press &amp; media kit.</h1>
          <p>Everything you need to write about RanEddie.</p>
        </div>
      </section>
      <section className="lab-section product-about">
        <div className="about-grid">
          <div>
            <span className="kicker">NEWSROOM</span>
            <h2>For journalists</h2>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
