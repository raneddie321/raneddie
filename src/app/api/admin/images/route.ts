import { requestIsAdmin } from '@/lib/admin-auth';
import { listImages } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requestIsAdmin())) return Response.json({ error: 'Not signed in.' }, { status: 401 });
  return Response.json({ images: await listImages() }, { headers: { 'Cache-Control': 'no-store' } });
}
