import { requestIsAdmin } from '@/lib/admin-auth';
import { getHistory } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requestIsAdmin())) return Response.json({ error: 'Not signed in.' }, { status: 401 });
  return Response.json({ versions: await getHistory() }, { headers: { 'Cache-Control': 'no-store' } });
}
