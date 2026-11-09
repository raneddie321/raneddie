import { requestIsAdmin } from '@/lib/admin-auth';
import { getContentFresh, restoreVersion } from '@/lib/content-store';

export async function POST(req: Request) {
  if (!(await requestIsAdmin())) return Response.json({ error: 'Not signed in.' }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return Response.json({ error: 'Missing version.' }, { status: 400 });
  try {
    await restoreVersion(id);
    return Response.json({ ok: true, content: await getContentFresh() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Restore failed.' }, { status: 500 });
  }
}
