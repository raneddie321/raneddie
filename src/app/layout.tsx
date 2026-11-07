import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'RanEddie — Product Studio', description: 'Building Fizz, Snake Brawl and future products people love.', metadataBase: new URL('https://raneddie.com'), openGraph: { title: 'RanEddie — Product Studio', description: 'Building the Future of Play & Productivity.', type: 'website' }, twitter: { card: 'summary_large_image', title: 'RanEddie — Product Studio', description: 'Building the Future of Play & Productivity.' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
