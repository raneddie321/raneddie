import { headers } from 'next/headers';
import { saveMessage } from '@/lib/content-store';

const TOPICS = new Set(['General', 'Support', 'RanEddie ID', 'Business', 'Press', 'Privacy']);
const recent = new Map<string, number[]>();

export async function POST(req: Request) {
  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (hits.length >= 5) return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  // Honeypot: real people never fill this hidden field.
  if (typeof body.website === 'string' && body.website) return Response.json({ ok: true });
  const name = String(body.name ?? '').trim().slice(0, 100);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const topic = TOPICS.has(String(body.topic)) ? String(body.topic) : 'General';
  const message = String(body.message ?? '').trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10)
    return Response.json({ error: 'Please fill in your name, a valid email and a message of at least 10 characters.' }, { status: 400 });

  try {
    await saveMessage({ name, email, topic, message });
    recent.set(ip, [...hits, now]);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'We couldn’t send your message. Please email contact@raneddie.com.' }, { status: 500 });
  }
}
