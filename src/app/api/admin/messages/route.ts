import { requestIsAdmin } from '@/lib/admin-auth';
import { deleteMessage, listMessages } from '@/lib/content-store';

export const dynamic = 'force-dynamic';
const deny = () => Response.json({ error: 'Not signed in.' }, { status: 401 });

export async function GET() {
  if (!(await requestIsAdmin())) return deny();
  return Response.json({ messages: await listMessages() }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function DELETE(req: Request) {
  if (!(await requestIsAdmin())) return deny();
  const { ref } = (await req.json().catch(() => ({}))) as { ref?: string };
  if (!ref) return Response.json({ error: 'Missing message.' }, { status: 400 });
  await deleteMessage(ref);
  return Response.json({ ok: true });
}
