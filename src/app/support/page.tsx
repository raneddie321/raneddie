import type { Metadata } from 'next';
import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { CAMPAIGN } from '@/lib/campaign';
import { ShareButtons } from './share-buttons';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({
  title: 'Back RanEddie on Headstart',
  description: 'Two 13-year-olds from Hadera, Israel are building a tech company: an AI assistant, a PC game and a clothing brand. Back our Headstart campaign.',
  path: '/support',
});

const PRODUCTS = [
  { name: 'Fizz', text: 'An AI assistant, plus Fizz Dev: an agent that builds websites, apps and games.', href: 'https://fizz.raneddie.com' },
  { name: 'Floppy', text: 'A PC game we are building ourselves, heading for Steam.', href: '' },
  { name: 'PandBand', text: 'A clothing brand with an online store: tees, hoodies and more.', href: 'https://pandband.raneddie.com' },
  { name: 'RanEddie ID', text: 'One account for all our products, with privacy and security built in.', href: 'https://id.raneddie.com' },
];

export default async function SupportPage() {
  const content = await getContent();
  const shareUrl = 'https://raneddie.com/support';
  return (
    <main className="site">
      <JsonLd data={webPageLd({ name: 'Back RanEddie', description: 'The RanEddie campaign on Headstart.', path: '/support' })} />
      <SiteHeader site={content.site} />
      <div className="support-page">
        <span className="kicker">HEADSTART CAMPAIGN</span>
        <h1>Two 13-year-olds. One tech company. And you.</h1>
        <p className="lead">
          We&apos;re Eddie and Ran, both 13, from Hadera, Israel. We started building RanEddie in 2024, and since then we&apos;ve built
          an AI assistant, a PC game, a clothing brand and one account that connects them all. Now we need you to keep going.
        </p>
        <a className="support-cta" href={CAMPAIGN.url} target="_blank" rel="noopener noreferrer">Back us on Headstart →</a>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 12 }}>
          It&apos;s all-or-nothing: if we don&apos;t reach the goal, we get nothing. Every pledge, even ₪18, helps us get there.
        </p>

        <h2>What we&apos;ve already built</h2>
        <div className="support-grid">
          {PRODUCTS.map((p) => (
            <article key={p.name}>
              <b>{p.href ? <a href={p.href}>{p.name}</a> : p.name}</b>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <h2>Where the money goes</h2>
        <ul>
          <li>Servers and cloud services our products run on</li>
          <li>Steam and Google Play developer accounts to launch our games</li>
          <li>Building our next products and launching Floppy</li>
        </ul>

        <h2>You can help without money too</h2>
        <p className="lead" style={{ fontSize: 16, marginBottom: 0 }}>Share the campaign with one friend. It helps more than you think.</p>
        <ShareButtons url={shareUrl} text={CAMPAIGN.shareText} />

        <p style={{ marginTop: 34 }}>
          <a className="support-cta" href={CAMPAIGN.url} target="_blank" rel="noopener noreferrer">Go to the campaign →</a>
        </p>
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
