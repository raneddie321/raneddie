/**
 * Server-only admin access.
 *
 * - ADMIN_PATH: the secret URL segment the admin panel lives at (middleware rewrites it).
 * - ADMIN_ACCESS_CODE: the code typed on the admin login screen.
 * The session is an HttpOnly cookie signed with a key derived from server secrets, valid 12 hours.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';

export const SESSION_COOKIE = '__re_admin';
const SESSION_HOURS = 12;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_ACCESS_CODE && process.env.ADMIN_PATH);
}

function key() {
  // No extra secret to manage: derived from values that only exist on the server.
  return createHmac('sha256', 'raneddie-admin-session-v1')
    .update(`${process.env.ADMIN_ACCESS_CODE ?? ''}|${process.env.ADMIN_PATH ?? ''}|${process.env.BLOB_READ_WRITE_TOKEN ?? ''}|${process.env.CLERK_SECRET_KEY ?? ''}`)
    .digest();
}

const sign = (body: string) => createHmac('sha256', key()).update(body).digest('base64url');

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function codeMatches(code: unknown) {
  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected || typeof code !== 'string') return false;
  // Compare fixed-length digests so the code length isn't leaked by timing.
  const h = (s: string) => createHmac('sha256', key()).update(s).digest('base64url');
  return safeEqual(h(code.trim()), h(expected));
}

export function createSession() {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_HOURS * 3600_000 })).toString('base64url');
  return { value: `${body}.${sign(body)}`, maxAge: SESSION_HOURS * 3600 };
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!raw) return false;
  const [body, sig] = raw.split('.');
  if (!body || !sig || !safeEqual(sig, sign(body))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(body, 'base64url').toString()) as { exp: number };
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

/** Admin is only served on *.vercel.app hosts (and localhost for development), never on raneddie.com. */
export function isAdminHost(host: string | null | undefined) {
  const h = (host ?? '').split(':')[0].toLowerCase();
  return h.endsWith('.vercel.app') || h === 'localhost' || h === '127.0.0.1';
}

export async function requestIsAdmin() {
  const h = await headers();
  return isAdminHost(h.get('x-forwarded-host') ?? h.get('host')) && (await isAdmin());
}

// ---- Brute-force protection: per IP, 5 wrong codes → locked for 15 minutes (per server instance). ----
const attempts = new Map<string, { fails: number; until: number }>();

export function loginBlocked(ip: string) {
  const a = attempts.get(ip);
  return a && a.until > Date.now() ? Math.ceil((a.until - Date.now()) / 60000) : 0;
}

export function recordLogin(ip: string, ok: boolean) {
  if (ok) return void attempts.delete(ip);
  const a = attempts.get(ip) ?? { fails: 0, until: 0 };
  a.fails += 1;
  if (a.fails >= 5) {
    a.until = Date.now() + 15 * 60_000;
    a.fails = 0;
  }
  attempts.set(ip, a);
}
