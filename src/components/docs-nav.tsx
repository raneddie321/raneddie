'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export type DocLink = { slug: string; section: string; title: string; description: string };
export type SectionLink = { name: string; slug: string; count: number };

/** Searches all docs on the server (the library is too big to send to every page). */
export function DocsSearch({ big = false }: { big?: boolean }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<DocLink[] | null>(null);
  const [active, setActive] = useState(0);
  const req = useRef(0);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults(null);
      return;
    }
    const id = ++req.current;
    const t = window.setTimeout(() => {
      fetch(`/api/docs/search?q=${encodeURIComponent(term)}`)
        .then((r) => r.json())
        .then((d: { results?: DocLink[] }) => {
          if (id === req.current) {
            setResults(d.results ?? []);
            setActive(0);
          }
        })
        .catch(() => id === req.current && setResults([]));
    }, 180);
    return () => window.clearTimeout(t);
  }, [q]);

  return (
    <div className={big ? 'docs-search big' : 'docs-search'}>
      <Search size={big ? 20 : 16} aria-hidden />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search 700+ articles"
        aria-label="Search docs"
        role="combobox"
        aria-expanded={!!results}
        onKeyDown={(e) => {
          if (!results?.length) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === 'Enter') window.location.href = `/docs/${results[active].slug}`;
          else if (e.key === 'Escape') setQ('');
        }}
      />
      {q && (
        <button type="button" onClick={() => setQ('')} aria-label="Clear search">
          <X size={15} />
        </button>
      )}
      {results && (
        <div className="docs-results" role="listbox">
          {results.length ? (
            results.map((r, i) => (
              <a key={r.slug} href={`/docs/${r.slug}`} role="option" aria-selected={i === active} className={i === active ? 'active' : undefined}>
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

export function DocsSidebar({
  section,
  items,
  sections,
  active,
}: {
  section: SectionLink;
  items: { slug: string; title: string }[];
  sections: SectionLink[];
  active?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside className={open ? 'docs-sidebar open' : 'docs-sidebar'}>
      <button className="docs-sidebar-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{section.name}</span> <ChevronDown size={16} />
      </button>
      <div className="docs-sidebar-body">
        <DocsSearch />
        <nav aria-label={`${section.name} articles`}>
          <div className="docs-group">
            <p><a href={`/docs/topics/${section.slug}`}>{section.name}</a></p>
            {items.map((d) => (
              <a key={d.slug} href={`/docs/${d.slug}`} className={d.slug === active ? 'active' : undefined} aria-current={d.slug === active ? 'page' : undefined}>
                {d.title}
              </a>
            ))}
          </div>
        </nav>
        <nav aria-label="Other topics" className="docs-group docs-other">
          <p>Other topics</p>
          {sections
            .filter((s) => s.slug !== section.slug)
            .map((s) => (
              <a key={s.slug} href={`/docs/topics/${s.slug}`}>
                {s.name} <small>{s.count}</small>
              </a>
            ))}
        </nav>
      </div>
    </aside>
  );
}
