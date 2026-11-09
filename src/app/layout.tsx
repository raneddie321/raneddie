import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = { title: 'RanEddie — Building the Future of Play & Productivity', description: 'Discover products by RanEddie: Fizz Browser, Snake Brawl and what comes next.', metadataBase: new URL('https://raneddie.com'), openGraph: { title: 'RanEddie', description: 'Building the Future of Play & Productivity.', type: 'website' }, twitter: { card: 'summary_large_image', title: 'RanEddie', description: 'Building the Future of Play & Productivity.' } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {clerkEnabled ? (
          <ClerkProvider
            signInUrl="https://accounts.raneddie.com/sign-in"
            signUpUrl="https://accounts.raneddie.com/sign-up"
            afterSignOutUrl="/"
          >
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
