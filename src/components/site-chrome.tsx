'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import AuthNav from '@/components/auth-nav';
import type { SiteContent } from '@/lib/content';

export function Logo({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="RanEddie" width={126} height={52} className="real-logo" />;
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
        <a href="/#lab" onClick={close}>Lab</a>
        <a href="/#studio" onClick={close}>Studio</a>
        <a href="/#contact" onClick={close}>Contact</a>
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
  return (
    <footer id="contact">
      <a href="/" className="footer-brand">
        <Logo src={content.site.logo} />
      </a>
      <div className="footer-links">
        {content.products.map((p) => (
          <a key={p.slug} href={`/${p.slug}`}>{p.name}</a>
        ))}
        <a href="/docs">Docs</a>
        <a href="/#lab">Lab</a>
        <a href={`mailto:${content.site.contactEmail}`}>Contact</a>
      </div>
      <span>{content.site.footerText}</span>
    </footer>
  );
}
