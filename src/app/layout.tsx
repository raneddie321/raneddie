import type { Metadata, Viewport } from 'next';
import { DM_Sans, Heebo } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { getContent } from '@/lib/content-store';
import { JsonLd, organizationLd } from '@/lib/seo';
import './globals.css';
import { CampaignBanner } from '@/components/campaign-banner';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-dm-sans' });
const heebo = Heebo({ subsets: ['latin', 'hebrew'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-heebo' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8f2' },
    { media: '(prefers-color-scheme: dark)', color: '#090b10' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: { default: site.title, template: '%s | RanEddie' },
    applicationName: 'RanEddie',
    authors: [{ name: 'RanEddie', url: 'https://raneddie.com' }],
    creator: 'RanEddie',
    publisher: 'RanEddie',
    keywords: ['RanEddie', 'רנאדי', 'RanEddie ID', 'Fizz Browser', 'Snake Brawl', 'technology company', 'apps', 'games', 'devices', 'cloud'],
    category: 'technology',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    manifest: '/manifest.webmanifest',
    ...(process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined } }
      : {}),
    description: site.description,
    metadataBase: new URL('https://raneddie.com'),
    alternates: { canonical: '/' },
    icons: { icon: [{ url: '/favicon.png', type: 'image/png' }], shortcut: '/favicon.png', apple: '/favicon.png' },
    openGraph: { title: site.title, description: site.description, url: 'https://raneddie.com', siteName: 'RanEddie', type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: site.title, description: site.description, site: '@RanEddiegk', creator: '@RanEddiegk' },
  };
}

// Apply the saved theme before the first paint so dark mode doesn't flash light.
const themeScript = `try{if(localStorage.getItem('raneddie-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { site } = await getContent();
  return (
    <html lang="en" className={`${dmSans.variable} ${heebo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationLd(site.contactEmail, site.description)} />
      </head>
      <body>
        <CampaignBanner />
        {clerkEnabled ? <ClerkProvider>{children}</ClerkProvider> : children}
        <Analytics />
      </body>
    </html>
  );
}
