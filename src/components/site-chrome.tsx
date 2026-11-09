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
