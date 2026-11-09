'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Clock,
  ExternalLink,
  Eye,
  FlaskConical,
  Home,
  ImageIcon,
  LogOut,
  Package,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  DEFAULT_CONTENT,
  RESERVED_SLUGS,
  slugify,
  type Cta,
  type DocPage,
  type LabItem,
  type Product,
  type SiteContent,
  type Slide,
  type Visual,
} from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';

/* eslint-disable @next/next/no-img-element */

type Tab = 'home' | 'products' | 'lab' | 'docs' | 'site' | 'images' | 'history';
const TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Homepage', icon: <Home size={17} /> },
  { id: 'products', label: 'Products', icon: <Package size={17} /> },
  { id: 'lab', label: 'Lab & Studio', icon: <FlaskConical size={17} /> },
  { id: 'docs', label: 'Docs', icon: <BookOpen size={17} /> },
  { id: 'site', label: 'Site settings', icon: <Settings size={17} /> },
  { id: 'images', label: 'Images', icon: <ImageIcon size={17} /> },
  { id: 'history', label: 'History', icon: <Clock size={17} /> },
];

const uid = () => Math.random().toString(36).slice(2, 9);

// ------------------------------------------------------------------ small form building blocks

function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function Text({ label, value, onChange, hint, placeholder }: { label: string; value: string; onChange: (v: string) => void; hint?: ReactNode; placeholder?: string }) {
  return (
    <Field label={label} hint={hint}>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

function Area({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: ReactNode }) {
  return (
    <Field label={label} hint={hint}>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

function CtaField({ label, value, onChange }: { label: string; value: Cta; onChange: (v: Cta) => void }) {
  return (
    <div className="adm-row">
      <Text label={`${label} — text`} value={value.label} onChange={(v) => onChange({ ...value, label: v })} />
      <Text label={`${label} — link`} value={value.href} placeholder="https://… or /docs/…" onChange={(v) => onChange({ ...value, href: v })} />
    </div>
  );
}

function VisualField({ value, onChange }: { value: Visual; onChange: (v: Visual) => void }) {
  return (
    <Field label="Visual">
      <select value={value} onChange={(e) => onChange(e.target.value as Visual)}>
        <option value="fizz">Fizz browser illustration</option>
        <option value="snake">Snake Brawl artwork</option>
        <option value="image">Custom image</option>
      </select>
    </Field>
  );
}

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? 'Upload failed.');
  return data.url;
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="adm-field">
      <span>{label}</span>
      <div className="adm-image">
        <div className="adm-image-preview">{value ? <img src={value} alt="" /> : <ImageIcon size={22} />}</div>
        <div className="adm-image-actions">
          <input value={value} placeholder="Image URL" onChange={(e) => onChange(e.target.value)} />
          <div>
            <button type="button" className="adm-btn" disabled={busy} onClick={() => input.current?.click()}>
              <Upload size={15} /> {busy ? 'Uploading…' : 'Upload'}
            </button>
            {value && (
              <button type="button" className="adm-btn ghost" onClick={() => onChange('')}>
                Remove
              </button>
            )}
          </div>
          {error && <small className="adm-error-text">{error}</small>}
        </div>
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (!file) return;
            setBusy(true);
            setError(null);
            try {
              onChange(await uploadFile(file));
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Upload failed.');
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
    </div>
  );
}

function Markdown({ label, value, onChange, rows = 14 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  const [preview, setPreview] = useState(false);
  const html = useMemo(() => (preview ? renderMarkdown(value).html : ''), [preview, value]);
  return (
    <div className="adm-field">
      <span className="adm-md-head">
        {label}
        <button type="button" className="adm-link" onClick={() => setPreview(!preview)}>
          <Eye size={14} /> {preview ? 'Edit' : 'Preview'}
        </button>
      </span>
      {preview ? (
        <div className="adm-md-preview prose" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <textarea className="mono" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <small>
        Markdown: <code>## Heading</code>, <code>**bold**</code>, <code>[link](https://…)</code>, <code>- list</code>, <code>![alt](image-url)</code>
      </small>
    </div>
  );
}

/** Up / down / delete buttons for a list item. */
function ItemTools({ index, count, onMove, onRemove }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void }) {
  return (
    <div className="adm-item-tools">
      <button type="button" onClick={() => onMove(index - 1)} disabled={index === 0} aria-label="Move up"><ArrowUp size={15} /></button>
      <button type="button" onClick={() => onMove(index + 1)} disabled={index === count - 1} aria-label="Move down"><ArrowDown size={15} /></button>
      <button type="button" className="danger" onClick={onRemove} aria-label="Delete"><Trash2 size={15} /></button>
    </div>
  );
}

function move<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function Panel({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="adm-panel">
      <header>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

// ------------------------------------------------------------------ sections

function HomeTab({ c, set }: { c: SiteContent; set: (fn: (c: SiteContent) => SiteContent) => void }) {
  const update = (i: number, patch: Partial<Slide>) =>
    set((c) => ({ ...c, slides: c.slides.map((s, k) => (k === i ? { ...s, ...patch } : s)) }));
  return (
    <>
      <Panel
        title="Hero slides"
        subtitle="The big headlines at the top of the homepage. They rotate every 8 seconds."
        action={
          <button
            className="adm-btn"
            onClick={() =>
              set((c) => ({
                ...c,
                slides: [...c.slides, { ...DEFAULT_CONTENT.slides[1], id: uid(), label: 'NEW', titleLine1: 'New headline.', titleLine2: 'Second line.', visual: 'image', image: '', badge: '' }],
              }))
            }
          >
            <Plus size={15} /> Add slide
          </button>
        }
      >
        {c.slides.map((s, i) => (
          <div key={s.id || i} className="adm-card">
            <div className="adm-card-head">
              <b>Slide {i + 1}: {s.titleLine1 || 'Untitled'}</b>
              <ItemTools
                index={i}
                count={c.slides.length}
                onMove={(to) => set((c) => ({ ...c, slides: move(c.slides, i, to) }))}
                onRemove={() => c.slides.length > 1 && confirm('Delete this slide?') && set((c) => ({ ...c, slides: c.slides.filter((_, k) => k !== i) }))}
              />
            </div>
            <Text label="Small label above the title" value={s.label} onChange={(v) => update(i, { label: v })} />
            <div className="adm-row">
              <Text label="Title — line 1" value={s.titleLine1} onChange={(v) => update(i, { titleLine1: v })} />
              <Text label="Title — line 2 (bold)" value={s.titleLine2} onChange={(v) => update(i, { titleLine2: v })} />
            </div>
            <Area label="Description" value={s.description} onChange={(v) => update(i, { description: v })} />
            <CtaField label="Button" value={s.cta} onChange={(v) => update(i, { cta: v })} />
            <div className="adm-row">
              <VisualField value={s.visual} onChange={(v) => update(i, { visual: v })} />
              <Text label="Badge on the image (optional)" value={s.badge} onChange={(v) => update(i, { badge: v })} />
            </div>
            {s.visual !== 'fizz' && <ImageField label="Image" value={s.image} onChange={(v) => update(i, { image: v })} />}
          </div>
        ))}
      </Panel>
      <Panel title="Products section" subtitle="The heading above the product cards.">
        <div className="adm-card">
          <Text label="Small label" value={c.productsSection.eyebrow} onChange={(v) => set((c) => ({ ...c, productsSection: { ...c.productsSection, eyebrow: v } }))} />
          <Text label="Title" value={c.productsSection.title} onChange={(v) => set((c) => ({ ...c, productsSection: { ...c.productsSection, title: v } }))} />
          <Text label="Subtitle" value={c.productsSection.subtitle} onChange={(v) => set((c) => ({ ...c, productsSection: { ...c.productsSection, subtitle: v } }))} />
        </div>
      </Panel>
    </>
  );
}

function ProductsTab({ c, set }: { c: SiteContent; set: (fn: (c: SiteContent) => SiteContent) => void }) {
  const [sel, setSel] = useState(0);
  const p = c.products[sel];
  const update = (patch: Partial<Product>) =>
    set((c) => ({ ...c, products: c.products.map((x, k) => (k === sel ? { ...x, ...patch } : x)) }));
  const slugProblem = p && (RESERVED_SLUGS.has(p.slug) ? 'This address is used by the site.' : c.products.some((x, k) => k !== sel && x.slug === p.slug) ? 'Another product uses this address.' : null);

  return (
    <div className="adm-split">
      <aside className="adm-list">
        {c.products.map((x, i) => (
          <button key={i} className={i === sel ? 'active' : ''} onClick={() => setSel(i)}>
            {x.image ? <img src={x.image} alt="" /> : <i>{x.name.slice(0, 1) || '?'}</i>}
            <span>
              <b>{x.name || 'Untitled'}</b>
              <small>/{x.slug}</small>
            </span>
          </button>
        ))}
        <button
          className="adm-list-add"
          onClick={() => {
            const n = c.products.length + 1;
            set((c) => ({
              ...c,
              products: [
                ...c.products,
                { ...DEFAULT_CONTENT.products[1], slug: `new-product-${n}`, name: 'New product', category: 'APP', tagline: 'A short tagline.', summary: '', body: '', visual: 'image', image: '', features: [], platforms: [], status: 'coming-soon', showOnHome: false, primaryCta: { label: '', href: '' }, secondaryCta: { label: '', href: '' } },
              ],
            }));
            setSel(c.products.length);
          }}
        >
          <Plus size={15} /> Add product
        </button>
      </aside>
      {p ? (
        <Panel
          title={p.name || 'Untitled product'}
          subtitle={`raneddie.com/${p.slug}`}
          action={
            <div className="adm-actions">
              <ItemTools
                index={sel}
                count={c.products.length}
                onMove={(to) => {
                  set((c) => ({ ...c, products: move(c.products, sel, to) }));
                  setSel(Math.max(0, Math.min(c.products.length - 1, to)));
                }}
                onRemove={() => {
                  if (!confirm(`Delete “${p.name}”? Its page will stop working.`)) return;
                  set((c) => ({ ...c, products: c.products.filter((_, k) => k !== sel) }));
                  setSel(0);
                }}
              />
            </div>
          }
        >
          <div className="adm-card">
            <div className="adm-row">
              <Text label="Name" value={p.name} onChange={(v) => update({ name: v })} />
              <Text
                label="Page address"
                value={p.slug}
                hint={slugProblem ? <span className="adm-error-text">{slugProblem}</span> : `raneddie.com/${p.slug || '…'}`}
                onChange={(v) => update({ slug: slugify(v) })}
              />
            </div>
            <div className="adm-row">
              <Text label="Category" value={p.category} placeholder="BROWSER, GAME, APP…" onChange={(v) => update({ category: v.toUpperCase() })} />
              <Text label="Tagline" value={p.tagline} onChange={(v) => update({ tagline: v })} />
            </div>
            <Area label="Summary" value={p.summary} onChange={(v) => update({ summary: v })} hint="One or two sentences. Used on the page intro and in search results." />
            <div className="adm-row">
              <Field label="Status">
                <select value={p.status} onChange={(e) => update({ status: e.target.value as Product['status'] })}>
                  <option value="available">Available</option>
                  <option value="coming-soon">Coming soon</option>
                </select>
              </Field>
              <Field label="Homepage">
                <select value={p.showOnHome ? 'yes' : 'no'} onChange={(e) => update({ showOnHome: e.target.value === 'yes' })}>
                  <option value="yes">Show a card on the homepage</option>
                  <option value="no">Don't show on the homepage</option>
                </select>
              </Field>
            </div>
          </div>
          <div className="adm-card">
            <div className="adm-card-head"><b>Look</b></div>
            <VisualField value={p.visual} onChange={(v) => update({ visual: v })} />
            {p.visual !== 'fizz' && <ImageField label="Product image" value={p.image} onChange={(v) => update({ image: v })} />}
          </div>
          <div className="adm-card">
            <div className="adm-card-head"><b>Buttons</b></div>
            <CtaField label="Main button" value={p.primaryCta} onChange={(v) => update({ primaryCta: v })} />
            <CtaField label="Second button" value={p.secondaryCta} onChange={(v) => update({ secondaryCta: v })} />
            <Text label="Platforms" value={p.platforms.join(', ')} hint="Comma separated, e.g. Android, iOS, Web" onChange={(v) => update({ platforms: v.split(',').map((s) => s.trim()).filter(Boolean) })} />
          </div>
          <div className="adm-card">
            <div className="adm-card-head">
              <b>Features</b>
              <button className="adm-btn small" onClick={() => update({ features: [...p.features, { title: 'New feature', text: '' }] })}>
                <Plus size={14} /> Add
              </button>
            </div>
            {p.features.map((f, i) => (
              <div key={i} className="adm-subitem">
                <div className="adm-row">
                  <Text label="Title" value={f.title} onChange={(v) => update({ features: p.features.map((x, k) => (k === i ? { ...x, title: v } : x)) })} />
                  <Text label="Text" value={f.text} onChange={(v) => update({ features: p.features.map((x, k) => (k === i ? { ...x, text: v } : x)) })} />
                </div>
                <ItemTools index={i} count={p.features.length} onMove={(to) => update({ features: move(p.features, i, to) })} onRemove={() => update({ features: p.features.filter((_, k) => k !== i) })} />
              </div>
            ))}
          </div>
          <div className="adm-card">
            <Markdown label="About (product page)" value={p.body} onChange={(v) => update({ body: v })} />
          </div>
        </Panel>
      ) : (
        <Panel title="No products">Add a product to get started.</Panel>
      )}
    </div>
  );
}

function LabTab({ c, set }: { c: SiteContent; set: (fn: (c: SiteContent) => SiteContent) => void }) {
  const update = (i: number, patch: Partial<LabItem>) => set((c) => ({ ...c, lab: c.lab.map((x, k) => (k === i ? { ...x, ...patch } : x)) }));
  return (
    <>
      <Panel
        title="Lab — in development"
        subtitle="Upcoming projects on the homepage. Remove them all to hide the section."
        action={
          <button className="adm-btn" onClick={() => set((c) => ({ ...c, lab: [...c.lab, { id: uid(), meta: 'PROJECT · COMING SOON', title: 'NEW', text: '' }] }))}>
            <Plus size={15} /> Add project
          </button>
        }
      >
        <div className="adm-card">
          <div className="adm-row">
            <Text label="Section label" value={c.labSection.eyebrow} onChange={(v) => set((c) => ({ ...c, labSection: { ...c.labSection, eyebrow: v } }))} />
            <Text label="Section title" value={c.labSection.title} onChange={(v) => set((c) => ({ ...c, labSection: { ...c.labSection, title: v } }))} />
          </div>
        </div>
        {c.lab.map((l, i) => (
          <div key={l.id} className="adm-card">
            <div className="adm-card-head">
              <b>{l.title || 'Untitled'}</b>
              <ItemTools index={i} count={c.lab.length} onMove={(to) => set((c) => ({ ...c, lab: move(c.lab, i, to) }))} onRemove={() => set((c) => ({ ...c, lab: c.lab.filter((_, k) => k !== i) }))} />
            </div>
            <div className="adm-row">
              <Text label="Small label" value={l.meta} onChange={(v) => update(i, { meta: v })} />
              <Text label="Title" value={l.title} onChange={(v) => update(i, { title: v })} />
            </div>
            <Text label="Text" value={l.text} onChange={(v) => update(i, { text: v })} />
          </div>
        ))}
      </Panel>
      <Panel title="Studio section" subtitle="About RanEddie, near the bottom of the homepage.">
        <div className="adm-card">
          <div className="adm-row">
            <Text label="Small label" value={c.studio.eyebrow} onChange={(v) => set((c) => ({ ...c, studio: { ...c.studio, eyebrow: v } }))} />
            <Text label="Title" value={c.studio.title} onChange={(v) => set((c) => ({ ...c, studio: { ...c.studio, title: v } }))} />
          </div>
          <Area label="Text" rows={4} value={c.studio.text} onChange={(v) => set((c) => ({ ...c, studio: { ...c.studio, text: v } }))} />
        </div>
      </Panel>
    </>
  );
}

function DocsTab({ c, set }: { c: SiteContent; set: (fn: (c: SiteContent) => SiteContent) => void }) {
  const [sel, setSel] = useState(0);
  const d = c.docs[sel];
  const sections = [...new Set(c.docs.map((x) => x.section))];
  const update = (patch: Partial<DocPage>) => set((c) => ({ ...c, docs: c.docs.map((x, k) => (k === sel ? { ...x, ...patch } : x)) }));
  return (
    <div className="adm-split">
      <aside className="adm-list">
        <div className="adm-card compact">
          <Text label="Docs title" value={c.docsHome.title} onChange={(v) => set((c) => ({ ...c, docsHome: { ...c.docsHome, title: v } }))} />
          <Text label="Docs subtitle" value={c.docsHome.subtitle} onChange={(v) => set((c) => ({ ...c, docsHome: { ...c.docsHome, subtitle: v } }))} />
        </div>
        {sections.map((s) => (
          <div key={s} className="adm-list-group">
            <p>{s}</p>
            {c.docs.map((x, i) =>
              x.section === s ? (
                <button key={i} className={i === sel ? 'active' : ''} onClick={() => setSel(i)}>
                  <span>
                    <b>{x.title || 'Untitled'}</b>
                    <small>/docs/{x.slug}</small>
                  </span>
                </button>
              ) : null,
            )}
          </div>
        ))}
        <button
          className="adm-list-add"
          onClick={() => {
            set((c) => ({ ...c, docs: [...c.docs, { slug: `new-page-${c.docs.length + 1}`, section: d?.section ?? 'Get started', title: 'New page', description: '', body: '## First heading\nWrite here.' }] }));
            setSel(c.docs.length);
          }}
        >
          <Plus size={15} /> Add page
        </button>
      </aside>
      {d ? (
        <Panel
          title={d.title || 'Untitled page'}
          subtitle={`raneddie.com/docs/${d.slug}`}
          action={
            <ItemTools
              index={sel}
              count={c.docs.length}
              onMove={(to) => {
                set((c) => ({ ...c, docs: move(c.docs, sel, to) }));
                setSel(Math.max(0, Math.min(c.docs.length - 1, to)));
              }}
              onRemove={() => {
                if (!confirm(`Delete “${d.title}”?`)) return;
                set((c) => ({ ...c, docs: c.docs.filter((_, k) => k !== sel) }));
                setSel(0);
              }}
            />
          }
        >
          <div className="adm-card">
            <div className="adm-row">
              <Text label="Title" value={d.title} onChange={(v) => update({ title: v })} />
              <Text label="Address" value={d.slug} hint={`raneddie.com/docs/${d.slug}`} onChange={(v) => update({ slug: slugify(v) })} />
            </div>
            <div className="adm-row">
              <Field label="Section" hint="Pick one, or type a new section name.">
                <input list="adm-sections" value={d.section} onChange={(e) => update({ section: e.target.value })} />
                <datalist id="adm-sections">{sections.map((s) => <option key={s} value={s} />)}</datalist>
              </Field>
              <Text label="Short description" value={d.description} onChange={(v) => update({ description: v })} />
            </div>
            <Markdown label="Page content" rows={22} value={d.body} onChange={(v) => update({ body: v })} />
          </div>
        </Panel>
      ) : (
        <Panel title="No pages">Add a docs page to get started.</Panel>
      )}
    </div>
  );
}

function SiteTab({ c, set }: { c: SiteContent; set: (fn: (c: SiteContent) => SiteContent) => void }) {
  const site = (patch: Partial<SiteContent['site']>) => set((c) => ({ ...c, site: { ...c.site, ...patch } }));
  return (
    <Panel title="Site settings" subtitle="Logo, search-engine text, the top-right button and the footer.">
      <div className="adm-card">
        <ImageField label="Logo" value={c.site.logo} onChange={(v) => site({ logo: v })} />
        <Text label="Browser tab title" value={c.site.title} onChange={(v) => site({ title: v })} />
        <Area label="Search-engine description" value={c.site.description} onChange={(v) => site({ description: v })} />
        <CtaField label="Top-right button" value={c.site.navCta} onChange={(v) => site({ navCta: v })} />
        <div className="adm-row">
          <Text label="Contact email" value={c.site.contactEmail} onChange={(v) => site({ contactEmail: v })} />
          <Text label="Footer text" value={c.site.footerText} onChange={(v) => site({ footerText: v })} />
        </div>
      </div>
    </Panel>
  );
}

function ImagesTab() {
  const [images, setImages] = useState<{ url: string; size: number }[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const load = useCallback(() => {
    fetch('/api/admin/images', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { images?: { url: string; size: number }[] }) => setImages(d.images ?? []))
      .catch(() => setImages([]));
  }, []);
  useEffect(load, [load]);
  return (
    <Panel
      title="Images"
      subtitle="Everything you uploaded. Copy a link to use an image anywhere, including in docs."
      action={
        <>
          <button className="adm-btn" disabled={busy} onClick={() => input.current?.click()}>
            <Upload size={15} /> {busy ? 'Uploading…' : 'Upload image'}
          </button>
          <input
            ref={input}
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={async (e) => {
              const files = [...(e.target.files ?? [])];
              e.target.value = '';
              setBusy(true);
              setMsg(null);
              try {
                for (const f of files) await uploadFile(f);
                load();
              } catch (err) {
                setMsg(err instanceof Error ? err.message : 'Upload failed.');
              } finally {
                setBusy(false);
              }
            }}
          />
        </>
      }
    >
      {msg && <div className="adm-alert error">{msg}</div>}
      {images === null ? (
        <p className="adm-muted">Loading…</p>
      ) : images.length === 0 ? (
        <p className="adm-muted">No images uploaded yet.</p>
      ) : (
        <div className="adm-gallery">
          {images.map((im) => (
            <figure key={im.url}>
              <img src={im.url} alt="" />
              <figcaption>
                <button
                  className="adm-link"
                  onClick={() => {
                    navigator.clipboard.writeText(im.url);
                    setMsg(null);
                  }}
                >
                  Copy link
                </button>
                {im.size > 0 && <small>{Math.round(im.size / 1024)} KB</small>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Panel>
  );
}

function HistoryTab({ onRestored }: { onRestored: (c: SiteContent) => void }) {
  const [versions, setVersions] = useState<{ id: string; savedAt: number }[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(() => {
    fetch('/api/admin/history', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { versions?: { id: string; savedAt: number }[] }) => setVersions(d.versions ?? []))
      .catch(() => setVersions([]));
  }, []);
  useEffect(load, [load]);
  return (
    <Panel title="History" subtitle="Every time you publish, a copy is kept (the last 40). Restoring publishes that version again.">
      {versions === null ? (
        <p className="adm-muted">Loading…</p>
      ) : versions.length === 0 ? (
        <p className="adm-muted">Nothing published from the Studio yet — the site shows its original content.</p>
      ) : (
        <div className="adm-history">
          {versions.map((v, i) => (
            <div key={v.id}>
              <span>
                <b>{new Date(v.savedAt).toLocaleString()}</b>
                {i === 0 && <em>Live</em>}
              </span>
              {i > 0 && (
                <button
                  className="adm-btn small"
                  disabled={!!busy}
                  onClick={async () => {
                    if (!confirm('Publish this older version? Your current content stays in History.')) return;
                    setBusy(v.id);
                    const res = await fetch('/api/admin/restore', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: v.id }) });
                    const data = (await res.json().catch(() => ({}))) as { content?: SiteContent; error?: string };
                    setBusy(null);
                    if (data.content) {
                      onRestored(data.content);
                      load();
                    } else alert(data.error ?? 'Restore failed.');
                  }}
                >
                  {busy === v.id ? 'Restoring…' : 'Restore'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ------------------------------------------------------------------ app shell

export default function AdminApp({ initial, storageReady }: { initial: SiteContent; storageReady: boolean }) {
  const [tab, setTab] = useState<Tab>('home');
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const dirty = JSON.stringify(content) !== saved;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function publish() {
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
      const data = (await res.json().catch(() => ({}))) as { content?: SiteContent; error?: string };
      if (res.status === 401) return window.location.reload();
      if (!res.ok || !data.content) throw new Error(data.error ?? 'Save failed.');
      setContent(data.content);
      setSaved(JSON.stringify(data.content));
      setNotice({ tone: 'ok', text: 'Published. The live site updates within a few seconds.' });
    } catch (err) {
      setNotice({ tone: 'error', text: err instanceof Error ? err.message : 'Save failed.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm">
      <aside className="adm-nav">
        <div className="adm-brand">
          <div className="adm-mark">R</div>
          <div>
            <b>RanEddie Studio</b>
            <small>Website editor</small>
          </div>
        </div>
        <nav>
          {TABS.map((t) => (
            <button key={t.id} className={t.id === tab ? 'active' : ''} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
        <div className="adm-nav-foot">
          <a href="https://raneddie.com" target="_blank" rel="noreferrer">
            <ExternalLink size={15} /> View live site
          </a>
          <button
            onClick={async () => {
              if (dirty && !confirm('You have unpublished changes. Sign out anyway?')) return;
              await fetch('/api/admin/logout', { method: 'POST' });
              window.location.reload();
            }}
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <h1>{TABS.find((t) => t.id === tab)?.label}</h1>
          <div className="adm-top-actions">
            {dirty ? <span className="adm-dirty">Unpublished changes</span> : <span className="adm-clean">All changes published</span>}
            {dirty && (
              <button className="adm-btn ghost" onClick={() => confirm('Discard all unpublished changes?') && setContent(JSON.parse(saved))}>
                Discard
              </button>
            )}
            <button className="adm-btn primary" onClick={publish} disabled={busy || !dirty || !storageReady}>
              <Save size={15} /> {busy ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </header>
        {!storageReady && (
          <div className="adm-alert error">Storage isn&apos;t connected yet (Vercel Blob). You can look around, but publishing is disabled.</div>
        )}
        {notice && <div className={`adm-alert ${notice.tone === 'ok' ? 'ok' : 'error'}`}>{notice.text}</div>}

        {tab === 'home' && <HomeTab c={content} set={setContent} />}
        {tab === 'products' && <ProductsTab c={content} set={setContent} />}
        {tab === 'lab' && <LabTab c={content} set={setContent} />}
        {tab === 'docs' && <DocsTab c={content} set={setContent} />}
        {tab === 'site' && <SiteTab c={content} set={setContent} />}
        {tab === 'images' && <ImagesTab />}
        {tab === 'history' && (
          <HistoryTab
            onRestored={(c) => {
              setContent(c);
              setSaved(JSON.stringify(c));
              setNotice({ tone: 'ok', text: 'Older version restored and published.' });
            }}
          />
        )}
      </div>
    </div>
  );
}
