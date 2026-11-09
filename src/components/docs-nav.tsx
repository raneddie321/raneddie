'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export type DocLink = { slug: string; section: string; title: string; description: string };

export function DocsSearch({ docs, big = false }: { docs: DocLink[]; big?: boolean }) {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return docs
      .filter((d) => `${d.title} ${d.description} ${d.section}`.toLowerCase().includes(t))
      .slice(0, 8);
  }, [q, docs]);
  return (
    <div className={big ? 'docs-search big' : 'docs-search'}>
      <Search size={big ? 20 : 16} aria-hidden />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs"
        aria-label="Search docs"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) window.location.href = `/docs/${results[0].slug}`;
          if (e.key === 'Escape') setQ('');
        }}
      />
      {q && (
        <button type="button" onClick={() => setQ('')} aria-label="Clear search">
          <X size={15} />
        </button>
      )}
      {q && (
        <div className="docs-results" role="listbox">
          {results.length ? (
            results.map((r) => (
              <a key={r.slug} href={`/docs/${r.slug}`} role="option" aria-selected={false}>
                <small>{r.section}</small>
                <b>{r.title}</b>
                <span>{r.description}</span>
              </a>
            ))
          ) : (
            <p>No results for “{q}”.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({ docs, active }: { docs: DocLink[]; active?: string }) {
  const [open, setOpen] = useState(false);
  const sections = useMemo(() => {
    const map = new Map<string, DocLink[]>();
    for (const d of docs) map.set(d.section, [...(map.get(d.section) ?? []), d]);
    return [...map.entries()];
  }, [docs]);
  return (
    <aside className={open ? 'docs-sidebar open' : 'docs-sidebar'}>
      <button className="docs-sidebar-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>Browse docs</span> <ChevronDown size={16} />
      </button>
      <div className="docs-sidebar-body">
        <DocsSearch docs={docs} />
        <nav aria-label="Documentation">
          {sections.map(([section, items]) => (
            <div key={section} className="docs-group">
              <p>{section}</p>
              {items.map((d) => (
                <a key={d.slug} href={`/docs/${d.slug}`} className={d.slug === active ? 'active' : undefined} aria-current={d.slug === active ? 'page' : undefined}>
                  {d.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
