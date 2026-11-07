import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'RanEddie — Building the Future of Play & Productivity', description: 'Discover products by RanEddie: Fizz Browser, Snake Brawl and what comes next.', metadataBase: new URL('https://raneddie.com'), openGraph: { title: 'RanEddie', description: 'Building the Future of Play & Productivity.', type: 'website' }, twitter: { card: 'summary_large_image', title: 'RanEddie', description: 'Building the Future of Play & Productivity.' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }
