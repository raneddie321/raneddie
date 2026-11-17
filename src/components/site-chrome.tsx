'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import AuthNav from '@/components/auth-nav';
import { DEFAULT_LOGO, type SiteContent } from '@/lib/content';

/* eslint-disable @next/next/no-img-element */

/** The RanEddie mark + wordmark, or a custom logo image uploaded in Studio. */
export function Logo({ src }: { src: string }) {
  if (src && src !== DEFAULT_LOGO) return <img src={src} alt="RanEddie" width={126} height={52} className="real-logo" />;
  return (
    <span className="re-logo">
      <img src={DEFAULT_LOGO} alt="" width={40} height={31} />
      <span>RanEddie</span>
    </span>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);
  const change = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('raneddie-theme', next);
    } catch {}
  };
  return (
    <button
      className="theme-toggle"
      onClick={() => change(theme === 'light' ? 'dark' : 'light')}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export function SiteHeader({ site }: { site: SiteContent['site'] }) {
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);
  return (
    <header className="topbar">
      <a href="/" className="brandmark" aria-label="RanEddie home">
        <Logo src={site.logo} />
      </a>
      <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Open navigation" aria-expanded={menu}>
        {menu ? <X /> : <Menu />}
      </button>
      <nav className={menu ? 'navlinks open' : 'navlinks'}>
        <a href="/#products" onClick={close}>Products</a>
        <a href="/docs" onClick={close}>Docs</a>
        <a href="/#studio" onClick={close}>About</a>
        <a href="/contact" onClick={close}>Contact</a>
      </nav>
      <div className="navtools">
        <AuthNav />
        {site.navCta.label && (
          <a className="navlink" href={site.navCta.href}>
            {site.navCta.label} <ArrowUpRight size={15} />
          </a>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}


const SOCIAL = [
  { name: 'Facebook', href: 'https://www.facebook.com/people/RanEddie/61596527725996/?rdid=P8ilncoQVyLpvyMx&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1QuezS6Zfu%2F', path: 'M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z' },
  { name: 'X', href: 'https://x.com/RanEddiegk', path: 'M17.8 3h3.1l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21H2.3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z' },
  { name: 'Instagram', href: 'https://www.instagram.com/raneddie_/', path: 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.1 4.1-.1zM12 2C9.3 2 8.9 2 7.9 2.1 4.2 2.2 2.2 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.7-2.1-5.7-5.8-5.8C15.1 2 14.7 2 12 2z' },
  { name: 'Threads', href: 'https://www.threads.com/@raneddie_', path: 'M16.7 11.2c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7-1.7 0-3.1.7-3.9 2l1.5 1c.6-.9 1.5-1.1 2.4-1.1 1 0 1.7.3 2.2.8.3.4.6.9.7 1.6-.8-.1-1.7-.2-2.6-.1-2.6.2-4.3 1.7-4.2 3.8.1 1.1.6 2 1.5 2.6.8.5 1.8.8 2.8.7 1.4-.1 2.5-.6 3.2-1.6.6-.7.9-1.7 1.1-2.9.7.4 1.2.9 1.4 1.6.5 1.2.5 3.1-1.1 4.7-1.4 1.4-3 2-5.5 2-2.8 0-4.9-.9-6.3-2.7C4.3 17.1 3.6 14.8 3.6 12s.7-5.1 2-6.8c1.4-1.8 3.5-2.7 6.3-2.7 2.8 0 5 .9 6.4 2.7.7.9 1.3 2 1.6 3.3l1.7-.5c-.4-1.6-1.1-2.9-2-4.1C17.8 1.7 15.2.6 11.9.6 8.6.6 6 1.7 4.3 3.9 2.8 5.9 2 8.6 2 12s.8 6.1 2.3 8.1c1.7 2.2 4.3 3.3 7.6 3.3 2.9 0 5-.8 6.7-2.5 2.3-2.3 2.2-5.1 1.5-6.8-.5-1.2-1.6-2.2-3.4-2.9zm-4.9 4.5c-1.1.1-2.3-.4-2.3-1.5-.1-.8.6-1.8 2.6-1.9h.7c.7 0 1.4.1 2 .2-.2 2.4-1.4 3.1-3 3.2z' },
  { name: 'YouTube', href: 'https://www.youtube.com/@raneddie_inc', path: 'M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4 0-1.4.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.8.2 7.5.2 7.5.2s4.6 0 7.8-.3c.4 0 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.2V8.6l6.1 3.3-6.1 3.3z' },
  { name: 'GitHub', href: 'https://github.com/RanEddie', path: 'M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.9 18.3 5.2 18.3 5.2c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z' },
];

function SocialLinks() {
  return (
    <div className="social-links">
      {SOCIAL.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`RanEddie on ${s.name}`} title={s.name}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d={s.path} /></svg>
        </a>
      ))}
    </div>
  );
}

export function SiteFooter({ content }: { content: SiteContent }) {
  const available = content.products.filter((p) => p.status === 'available');
  const others = content.products.filter((p) => p.status !== 'available');
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-top">
        <div className="footer-about">
          <a href="/" className="footer-brand" aria-label="RanEddie home">
            <Logo src={content.site.logo} />
          </a>
          <p>{content.site.description}</p>
          <SocialLinks />
        </div>
        <div className="footer-col">
          <b>Products</b>
          {available.map((p) => <a key={p.slug} href={`/${p.slug}`}>{p.name}</a>)}
          <a href="/#products">All products</a>
        </div>
        {others.length > 0 && (
          <div className="footer-col">
            <b>Coming soon</b>
            {others.slice(0, 6).map((p) => <a key={p.slug} href={`/${p.slug}`}>{p.name}</a>)}
          </div>
        )}
        <div className="footer-col">
          <b>Help</b>
          <a href="/docs">Docs</a>
          <a href="/docs/topics/raneddie-id">RanEddie ID</a>
          <a href="/docs/support-faq">FAQ</a>
          <a href="/contact">Contact us</a>
        </div>
        <div className="footer-col">
          <b>Company</b>
          <a href="/#studio">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href={`mailto:${content.site.contactEmail}`}>{content.site.contactEmail}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{content.site.footerText}</span>
        <span>
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/sitemap.xml">Sitemap</a>
        </span>
      </div>
    </footer>
  );
}
