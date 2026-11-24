import type { Metadata } from 'next';
import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { campaignLive } from '@/lib/campaign';
import { ShareButtons } from './share-buttons';

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const { campaign } = await getContent();
  return pageMeta({ title: campaign.title || 'Back RanEddie', description: campaign.lead.slice(0, 160), path: '/support' });
}

/** The campaign page. Everything on it is edited in Studio → Campaign. */
export default async function SupportPage() {
  const content = await getContent();
  const c = content.campaign;
  const live = campaignLive(c);
  const money = c.money.map((m) => m.trim()).filter(Boolean);
  return (
    <main className="site">
      <JsonLd data={webPageLd({ name: c.title, description: c.lead.slice(0, 160), path: '/support' })} />
      <SiteHeader site={content.site} />
      <div className="support-page">
        {c.kicker && <span className="kicker">{c.kicker}</span>}
        <h1>{c.title}</h1>
        {c.lead && <p className="lead">{c.lead}</p>}
        {live ? (
          <>
            <a className="support-cta" href={c.url} target="_blank" rel="noopener noreferrer">{c.ctaLabel}</a>
            {c.note && <p className="support-note">{c.note}</p>}
          </>
        ) : (
          <p className="support-note">The campaign has ended. Thank you to everyone who supported us!</p>
        )}

        {c.products.length > 0 && (
          <>
            <h2>{c.productsTitle}</h2>
            <div className="support-grid">
              {c.products.map((p) => (
                <article key={p.name}>
                  <b>
                    {p.href ? <a href={p.href}>{p.name}</a> : p.name}
                    {p.inDevelopment && <span className="support-badge">In development</span>}
                  </b>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </>
        )}

        {money.length > 0 && (
          <>
            <h2>{c.moneyTitle}</h2>
            <ul>{money.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </>
        )}

        {live && (
          <>
            <h2>{c.shareTitle}</h2>
            {c.shareText && <p className="lead" style={{ fontSize: 16, marginBottom: 0 }}>{c.shareText}</p>}
            <ShareButtons url="https://raneddie.com/support" text={c.shareMessage} />
            <p style={{ marginTop: 34 }}>
              <a className="support-cta" href={c.url} target="_blank" rel="noopener noreferrer">{c.bottomCtaLabel}</a>
            </p>
          </>
        )}
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
