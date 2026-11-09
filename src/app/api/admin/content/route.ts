import { requestIsAdmin } from '@/lib/admin-auth';
import { getContentFresh, saveContent } from '@/lib/content-store';
import { RESERVED_SLUGS, slugify, withDefaults, type SiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const deny = () => Response.json({ error: 'Not signed in.' }, { status: 401 });

export async function GET() {
  if (!(await requestIsAdmin())) return deny();
  return Response.json(await getContentFresh(), { headers: { 'Cache-Control': 'no-store' } });
}

function validate(c: SiteContent): string | null {
  const seen = new Set<string>();
  for (const p of c.products) {
    if (!p.name.trim()) return 'Every product needs a name.';
    if (!p.slug) return `“${p.name}” needs a page address.`;
    if (RESERVED_SLUGS.has(p.slug)) return `The address “/${p.slug}” is used by the site. Choose another.`;
    if (seen.has(p.slug)) return `Two products use the address “/${p.slug}”.`;
    seen.add(p.slug);
  }
  const docs = new Set<string>();
  for (const d of c.docs) {
    if (!d.title.trim()) return 'Every doc needs a title.';
    if (!d.slug) return `“${d.title}” needs an address.`;
    if (docs.has(d.slug)) return `Two docs use the address “/docs/${d.slug}”.`;
    docs.add(d.slug);
  }
  if (!c.slides.length) return 'Keep at least one homepage slide.';
  return null;
}

export async function PUT(req: Request) {
  if (!(await requestIsAdmin())) return deny();
  const raw = await req.text();
  if (raw.length > 1_500_000) return Response.json({ error: 'Content is too large.' }, { status: 413 });
  let parsed: SiteContent;
  try {
    parsed = withDefaults(JSON.parse(raw));
  } catch {
    return Response.json({ error: 'Invalid content.' }, { status: 400 });
  }
  parsed.products = parsed.products.map((p) => ({ ...p, slug: slugify(p.slug || p.name) }));
  parsed.docs = parsed.docs.map((d) => ({ ...d, slug: slugify(d.slug || d.title) }));
  const problem = validate(parsed);
  if (problem) return Response.json({ error: problem }, { status: 400 });
  try {
    const savedAt = await saveContent(parsed);
    return Response.json({ ok: true, savedAt, content: parsed });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Save failed.' }, { status: 500 });
  }
}
