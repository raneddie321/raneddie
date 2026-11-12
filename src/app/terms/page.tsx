import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { TERMS_MD, TERMS_UPDATED } from '@/lib/legal/terms';

export const revalidate = 600;
export const metadata: Metadata = { title: 'Terms of Use', description: 'The terms that apply to raneddie.com, RanEddie ID and RanEddie products.', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated={TERMS_UPDATED} markdown={TERMS_MD} />;
}
