import type { Metadata } from 'next';
import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { CAMPAIGN } from '@/lib/campaign';
import { ShareButtons } from './share-buttons';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({
  title: 'תמכו ב-RanEddie בהדסטארט',
  description: 'שני בני 13 מחדרה בונים חברת טכנולוגיה: עוזר AI, משחק למחשב ומותג בגדים. תמכו בנו בקמפיין בהדסטארט.',
  path: '/support',
});

const PRODUCTS = [
  { name: 'Fizz', text: 'עוזר בינה מלאכותית, ו-Fizz Dev: סוכן שבונה אתרים, אפליקציות ומשחקים.', href: 'https://fizz.raneddie.com' },
  { name: 'Floppy', text: 'משחק מחשב שאנחנו מפתחים בעצמנו, לקראת השקה ב-Steam.', href: '' },
  { name: 'PandBand', text: 'מותג בגדים עם חנות אונליין: חולצות, קפוצ׳ונים ועוד.', href: 'https://pandband.raneddie.com' },
  { name: 'RanEddie ID', text: 'חשבון אחד לכל המוצרים שלנו, עם פרטיות ואבטחה.', href: 'https://id.raneddie.com' },
];

export default async function SupportPage() {
  const content = await getContent();
  const shareUrl = 'https://raneddie.com/support';
  return (
    <main className="site">
      <JsonLd data={webPageLd({ name: 'תמכו ב-RanEddie', description: 'הקמפיין של RanEddie בהדסטארט.', path: '/support' })} />
      <SiteHeader site={content.site} />
      <div className="support-page" dir="rtl" lang="he">
        <span className="kicker">קמפיין בהדסטארט</span>
        <h1>שני בני 13. חברת טכנולוגיה אחת. ואתם.</h1>
        <p className="lead">
          אנחנו אדי ורן, שנינו בני 13 מחדרה. ב-2024 התחלנו לבנות את RanEddie, ומאז בנינו בעצמנו עוזר בינה מלאכותית,
          משחק למחשב, מותג בגדים וחשבון אחד שמחבר את הכל. עכשיו אנחנו צריכים אתכם כדי להמשיך.
        </p>
        <a className="support-cta" href={CAMPAIGN.url} target="_blank" rel="noopener noreferrer">תמכו בנו בהדסטארט ←</a>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 12 }}>
          הקמפיין הוא &quot;הכל או כלום&quot;: אם לא נגיע ליעד, לא נקבל כלום. כל תמיכה, גם ₪18, עוזרת לנו להגיע לשם.
        </p>

        <h2>מה כבר בנינו</h2>
        <div className="support-grid">
          {PRODUCTS.map((p) => (
            <article key={p.name}>
              <b>{p.href ? <a href={p.href}>{p.name}</a> : p.name}</b>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <h2>לאן הולך הכסף</h2>
        <ul>
          <li>שרתים ושירותי ענן שהמוצרים שלנו רצים עליהם</li>
          <li>חשבונות מפתחים ב-Steam וב-Google Play, כדי להשיק את המשחקים</li>
          <li>פיתוח המוצרים הבאים והשקה של Floppy</li>
        </ul>

        <h2>אפשר לעזור גם בלי כסף</h2>
        <p className="lead" style={{ fontSize: 16, marginBottom: 0 }}>שתפו את הקמפיין עם חבר אחד. זה עוזר לנו יותר ממה שנדמה.</p>
        <ShareButtons url={shareUrl} text={CAMPAIGN.shareText} />

        <p style={{ marginTop: 34 }}>
          <a className="support-cta" href={CAMPAIGN.url} target="_blank" rel="noopener noreferrer">לעמוד הקמפיין ←</a>
        </p>
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
