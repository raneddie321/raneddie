import type { Metadata } from 'next';
import { getContent } from '@/lib/content-store';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import ContactForm from './contact-form';

export const revalidate = 600;
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with RanEddie — support, business, press and privacy.', alternates: { canonical: '/contact' } };

export default async function ContactPage() {
  const content = await getContent();
  return (
    <main className="site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className="page-hero">
        <div>
          <span className="kicker">CONTACT</span>
          <h1>Let&apos;s talk.</h1>
          <p>Questions, feedback, partnerships or press — we read every message.</p>
        </div>
      </section>
      <div className="contact-grid">
        <ContactForm />
        <div className="contact-side">
          <div><h3>Need help fast?</h3><p>Most answers are already in the <a href="/docs">RanEddie Docs</a> — over 700 articles.</p></div>
          <div><h3>Account problems</h3><p>Can&apos;t sign in? Start with <a href="/docs/sign-in-recover-an-account-you-can-t-access">recovering your account</a>.</p></div>
          <div><h3>Email</h3><p><a href={`mailto:${content.site.contactEmail}`}>{content.site.contactEmail}</a></p></div>
          <div><h3>Privacy requests</h3><p>Choose the Privacy topic, or read our <a href="/privacy">Privacy Policy</a>.</p></div>
        </div>
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
