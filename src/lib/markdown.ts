import { Marked, type Tokens } from 'marked';

export type TocItem = { id: string; text: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headingId(text: string, used: Map<string, number>) {
  const base =
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n ? `${base}-${n}` : base;
}

const SAFE_HREF = /^(https?:|mailto:|\/|#)/i;

/** Markdown → HTML for admin-written content. Raw HTML is shown as text; links are limited to safe schemes. */
export function renderMarkdown(md: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      html(token: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(token.text);
      },
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const level = Math.min(Math.max(token.depth, 2), 4);
        const id = headingId(token.text, used);
        if (level === 2) toc.push({ id, text: token.text.replace(/[*_`]/g, '') });
        return `<h${level} id="${id}"><a class="doc-anchor" href="#${id}" aria-hidden="true">#</a>${inner}</h${level}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        if (!SAFE_HREF.test(token.href)) return inner;
        const external = /^https?:/i.test(token.href) && !/^https?:\/\/(www\.)?raneddie\.com/i.test(token.href);
        return `<a href="${escapeHtml(token.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inner}</a>`;
      },
      image(token: Tokens.Image) {
        if (!SAFE_HREF.test(token.href)) return '';
        return `<img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}" loading="lazy" />`;
      },
    },
  });
  const html = marked.parse(md ?? '', { async: false }) as string;
  return { html, toc };
}
