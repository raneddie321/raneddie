import type { Metadata } from 'next';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { LegalPage } from '@/components/legal-page';
import { PRIVACY_MD, PRIVACY_UPDATED } from '@/lib/legal/privacy';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({ title: 'Privacy Policy', description: 'How RanEddie collects, uses and protects personal information across raneddie.com, RanEddie ID and RanEddie products.', path: '/privacy' });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageLd({ name: 'Privacy Policy', description: 'How RanEddie collects, uses and protects personal information.', path: '/privacy' })} />
      <LegalPage title="Privacy Policy" updated={PRIVACY_UPDATED} markdown={PRIVACY_MD} />
    </>
  );
}
