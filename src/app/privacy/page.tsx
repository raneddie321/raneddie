import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { PRIVACY_MD, PRIVACY_UPDATED } from '@/lib/legal/privacy';

export const revalidate = 600;
export const metadata: Metadata = { title: 'Privacy Policy', description: 'How RanEddie collects, uses and protects your personal information.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated={PRIVACY_UPDATED} markdown={PRIVACY_MD} />;
}
