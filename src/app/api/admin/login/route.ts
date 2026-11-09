import { cookies, headers } from 'next/headers';
import { SESSION_COOKIE, adminConfigured, codeMatches, createSession, loginBlocked, recordLogin } from '@/lib/admin-auth';

export async function POST(req: Request) {
  if (!adminConfigured()) return Response.json({ error: 'Admin is not configured.' }, { status: 503 });
  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || h.get('x-real-ip') || 'unknown';

  const minutes = loginBlocked(ip);
  if (minutes) return Response.json({ error: `Too many attempts. Try again in ${minutes} min.` }, { status: 429 });

  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  // Slow every attempt down a little: guessing codes takes far longer.
  await new Promise((r) => setTimeout(r, 700));
  const ok = codeMatches(code);
  recordLogin(ip, ok);
  if (!ok) return Response.json({ error: 'Wrong code.' }, { status: 401 });

  const session = createSession();
  (await cookies()).set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: session.maxAge,
  });
  return Response.json({ ok: true });
}
