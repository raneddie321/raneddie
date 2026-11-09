import { getContent } from '@/lib/content-store';
import { allDocs, searchDocs } from '@/lib/docs';

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get('q') ?? '').slice(0, 100);
  const results = searchDocs(allDocs(await getContent()), q, 10);
  return Response.json({ results }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
}
