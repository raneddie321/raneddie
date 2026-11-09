'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import type { SiteContent } from '@/lib/content';
import { SiteFooter, SiteHeader, Logo } from '@/components/site-chrome';
import { CardVisual, HeroVisual } from '@/components/visuals';

export default function HomeClient({ content }: { content: SiteContent }) {
  const { slides } = content;
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[slide % slides.length];

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 8000);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  const homeProducts = content.products.filter((p) => p.showOnHome);

  return (
    <main className="site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className={'hero hero-' + current.visual} id="home">
        <div className="hero-inner">
          <div className="hero-copy" key={slide}>
            <div className="eyebrow"><span /> {current.label}</div>
            <h1>
              {current.titleLine1}
              {current.titleLine2 && (
                <>
                  <br />
                  <strong>{current.titleLine2}</strong>
                </>
              )}
            </h1>
            <p>{current.description}</p>
            {current.cta.label && (
              <a className="hero-cta" href={current.cta.href}>
                {current.cta.label}
                <ArrowUpLeft size={19} />
              </a>
            )}
          </div>
          <div className="hero-visual">
            <HeroVisual visual={current.visual} image={current.image} alt={current.titleLine1} badge={current.badge} />
          </div>
        </div>
      </section>
      {slides.length > 1 && (
        <div className="slider-controls">
          <button className="slider-arrow" onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Previous slide">
            <ArrowLeft />
          </button>
          <div className="slider-center">
            <button className="pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play carousel' : 'Pause carousel'}>
              {paused ? '▶' : 'Ⅱ'}
            </button>
            <div className="dots">
              {slides.map((s, i) => (
                <button key={s.id || i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={'Show slide ' + (i + 1)} />
              ))}
            </div>
          </div>
          <button className="slider-arrow" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide">
            <ArrowRight />
          </button>
        </div>
      )}
      <section className="products-section" id="products">
        <div className="section-title">
          <span>{content.productsSection.eyebrow}</span>
          <h2>{content.productsSection.title}</h2>
          <p>{content.productsSection.subtitle}</p>
        </div>
        <div className="product-row">
          {homeProducts.map((p, i) => (
            <a key={p.slug} className={`product-card ${p.visual === 'fizz' ? 'fizz-card' : 'snake-card'}`} href={`/${p.slug}`}>
              <div>
                <small>{String(i + 1).padStart(2, '0')} / {p.category}</small>
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <b>Explore {p.name.split(' ')[0]} <ArrowUpRight size={16} /></b>
              </div>
              <CardVisual visual={p.visual} image={p.image} alt={p.name} />
            </a>
          ))}
        </div>
      </section>
      {content.lab.length > 0 && (
        <section className="lab-section" id="lab">
          <div className="section-title">
            <span>{content.labSection.eyebrow}</span>
            <h2>{content.labSection.title}</h2>
          </div>
          <div className="lab-row">
            {content.lab.map((l) => (
              <article key={l.id}>
                <small>{l.meta}</small>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="studio-section" id="studio">
        <div className="studio-logo"><Logo src={content.site.logo} /></div>
        <div>
          <span>{content.studio.eyebrow}</span>
          <h2>{content.studio.title}</h2>
          <p>{content.studio.text}</p>
        </div>
      </section>
      <SiteFooter content={content} />
    </main>
  );
}
