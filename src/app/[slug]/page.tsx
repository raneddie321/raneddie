import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, BookOpen, Check } from 'lucide-react';
import { getContent } from '@/lib/content-store';
import { renderMarkdown } from '@/lib/markdown';
import { allDocs } from '@/lib/docs';
import { JsonLd, productLd } from '@/lib/seo';
import { slugify } from '@/lib/content';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { CardVisual, HeroVisual } from '@/components/visuals';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await getContent();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getContent()).products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    alternates: { canonical: `/${product.slug}` },
    description: product.summary,
    openGraph: { title: `${product.name} — ${product.tagline}`, description: product.summary, ...(product.image && !product.image.endsWith('.svg') ? { images: [product.image] } : {}) },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const product = content.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { html } = renderMarkdown(product.body);
  const others = content.products.filter((p) => p.slug !== product.slug);
  const productDocs = allDocs(content).filter((d) => d.section.toLowerCase() === product.name.toLowerCase());
  const relatedDocs = productDocs.slice(0, 6);

  return (
    <main className="site" dir="ltr">
      <JsonLd data={productLd(product)} />
      <SiteHeader site={content.site} />

      <section className={`hero product-hero hero-${product.visual}`}>
        <div className="hero-inner">
          <div className="hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> <span>/</span> <a href="/#products">Products</a> <span>/</span> <b>{product.name}</b>
            </nav>
            <div className="eyebrow"><span /> {product.category}</div>
            <h1>
              {product.name}.<br />
              <strong>{product.tagline}</strong>
            </h1>
            <p>{product.summary}</p>
            <div className="product-ctas">
              {product.status === 'coming-soon' ? (
                <span className="status-pill">Coming soon</span>
              ) : (
                product.primaryCta.label && (
                  <a className="hero-cta" href={product.primaryCta.href}>
                    {product.primaryCta.label}
                    <ArrowUpRight size={19} />
                  </a>
                )
              )}
              {product.secondaryCta.label && (
                <a className="ghost-cta" href={product.secondaryCta.href}>
                  {product.secondaryCta.label}
                </a>
              )}
            </div>
            {product.platforms.length > 0 && (
              <div className="platforms">
                {product.platforms.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            )}
          </div>
          <div className="hero-visual">
            <HeroVisual visual={product.visual} image={product.image} alt={product.name} />
          </div>
        </div>
      </section>

      {product.features.length > 0 && (
        <section className="products-section">
          <div className="section-title">
            <span>WHY {product.name.toUpperCase()}</span>
            <h2>Made to feel great.</h2>
          </div>
          <div className="feature-grid">
            {product.features.map((f) => (
              <article key={f.title}>
                <i><Check size={18} /></i>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {product.body.trim() && (
        <section className="lab-section product-about">
          <div className="about-grid">
            <div>
              <span className="kicker">ABOUT</span>
              <h2>{product.name}</h2>
            </div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      )}

      {relatedDocs.length > 0 && (
        <section className="products-section">
          <div className="section-title">
            <span>DOCS</span>
            <h2>Learn more</h2>
            {productDocs.length > relatedDocs.length && (
              <p>
                <a className="text-link" href={`/docs/topics/${slugify(product.name)}`}>All {productDocs.length} {product.name} articles →</a>
              </p>
            )}
          </div>
          <div className="doc-cards">
            {relatedDocs.map((d) => (
              <a key={d.slug} href={`/docs/${d.slug}`} className="doc-card">
                <BookOpen size={18} />
                <b>{d.title}</b>
                <small>{d.description}</small>
              </a>
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="products-section more-products">
          <div className="section-title">
            <span>MORE FROM RANEDDIE</span>
            <h2>Explore the collection</h2>
          </div>
          <div className="product-row">
            {others.map((p) => (
              <a key={p.slug} className={`product-card ${p.visual === 'fizz' ? 'fizz-card' : 'snake-card'}`} href={`/${p.slug}`}>
                <div>
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <p>{p.tagline}</p>
                  <b>Explore <ArrowUpRight size={16} /></b>
                </div>
                <CardVisual visual={p.visual} image={p.image} alt={p.name} />
              </a>
            ))}
          </div>
        </section>
      )}

      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
