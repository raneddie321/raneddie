import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { getContent } from '@/lib/content-store';
import { JsonLd, organizationLd } from '@/lib/seo';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: { default: site.title, template: '%s · RanEddie' },
    description: site.description,
    metadataBase: new URL('https://raneddie.com'),
    icons: { icon: [{ url: '/favicon.png?v=2', type: 'image/png' }], shortcut: '/favicon.png?v=2', apple: '/favicon.png?v=2' },
    openGraph: { title: 'RanEddie', description: site.description, type: 'website' },
    twitter: { card: 'summary_large_image', title: 'RanEddie', description: site.description },
  };
}

// Apply the saved theme before the first paint so dark mode doesn't flash light.
const themeScript = `try{if(localStorage.getItem('raneddie-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { site } = await getContent();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationLd(site.contactEmail, site.description)} />
      </head>
      <body>
        {clerkEnabled ? <ClerkProvider>{children}</ClerkProvider> : children}
        <Analytics />
      </body>
    </html>
  );
}
