import type { Metadata } from 'next';
import { JsonLd, pageMeta, webPageLd } from '@/lib/seo';
import { LegalPage } from '@/components/legal-page';
import { TERMS_MD, TERMS_UPDATED } from '@/lib/legal/terms';

export const revalidate = 600;
export const metadata: Metadata = pageMeta({ title: 'Terms of Use', description: 'The terms that apply to raneddie.com, RanEddie ID and RanEddie products.', path: '/terms' });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={webPageLd({ name: 'Terms of Use', description: 'The terms that apply to raneddie.com, RanEddie ID and RanEddie products.', path: '/terms' })} />
      <LegalPage title="Terms of Use" updated={TERMS_UPDATED} markdown={TERMS_MD} />
    </>
  );
}
