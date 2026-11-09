/**
 * Server-only: reads and saves the site content.
 *
 * Production: Vercel Blob (BLOB_READ_WRITE_TOKEN is added by Vercel when the Blob store is
 * connected to the project). Every save is a new file `content/site-<timestamp>.json`, so the
 * admin panel can show history and restore older versions.
 * Local development without a token: a JSON file in .data/ (never used on Vercel).
 */
import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { del, list, put } from '@vercel/blob';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONTENT, withDefaults, type SiteContent } from './content';

const PREFIX = 'content/site-';
const KEEP_VERSIONS = 40;
const LOCAL_DIR = path.join(process.cwd(), '.data');

export const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const useLocal = () => !hasBlob() && process.env.NODE_ENV !== 'production' && !process.env.VERCEL;

export type Version = { id: string; savedAt: number; url: string; size: number };

async function listVersions(): Promise<Version[]> {
  if (useLocal()) {
    const files = await fs.readdir(LOCAL_DIR).catch(() => [] as string[]);
    return files
      .filter((f) => f.startsWith('site-') && f.endsWith('.json'))
      .map((f) => ({ id: f, savedAt: Number(f.slice(5, -5)), url: path.join(LOCAL_DIR, f), size: 0 }))
      .sort((a, b) => b.savedAt - a.savedAt);
  }
  if (!hasBlob()) return [];
  const out: Version[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    for (const b of page.blobs) {
      const savedAt = Number(b.pathname.slice(PREFIX.length).replace(/\.json$/, ''));
      if (Number.isFinite(savedAt)) out.push({ id: b.pathname, savedAt, url: b.url, size: b.size });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out.sort((a, b) => b.savedAt - a.savedAt);
}

async function readVersion(v: Version): Promise<SiteContent> {
  if (useLocal()) return withDefaults(JSON.parse(await fs.readFile(v.url, 'utf8')));
  // Each version has its own URL and never changes, so it is safe to cache.
  const res = await fetch(v.url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Could not read content (${res.status})`);
  return withDefaults(await res.json());
}

/** Latest saved content, or the defaults when nothing was saved yet (or storage is unreachable). */
async function loadLatest(): Promise<SiteContent> {
  try {
    const [latest] = await listVersions();
    return latest ? await readVersion(latest) : DEFAULT_CONTENT;
  } catch (error) {
    console.error('[content] falling back to defaults:', error);
    return DEFAULT_CONTENT;
  }
}

/** Cached for every visitor; saving from the admin clears the cache right away. */
export const getContent = unstable_cache(loadLatest, ['site-content-v1'], { tags: ['site-content'], revalidate: 600 });

/** Uncached read for the admin panel. */
export const getContentFresh = loadLatest;

export async function getHistory() {
  return (await listVersions()).map(({ id, savedAt, size }) => ({ id, savedAt, size }));
}

export async function saveContent(content: SiteContent) {
  const savedAt = Date.now();
  const body = JSON.stringify(content, null, 2);
  if (useLocal()) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, `site-${savedAt}.json`), body);
  } else {
    if (!hasBlob()) throw new Error('Storage is not connected (BLOB_READ_WRITE_TOKEN is missing).');
    await put(`${PREFIX}${savedAt}.json`, body, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
  }
  // Trim old versions
  const versions = await listVersions();
  const old = versions.slice(KEEP_VERSIONS);
  if (old.length) {
    if (useLocal()) await Promise.all(old.map((v) => fs.unlink(v.url).catch(() => undefined)));
    else await del(old.map((v) => v.url)).catch(() => undefined);
  }
  publish();
  return savedAt;
}

export async function restoreVersion(id: string) {
  const v = (await listVersions()).find((x) => x.id === id);
  if (!v) throw new Error('That version no longer exists.');
  return saveContent(await readVersion(v));
}

/** Refresh every page that shows content. */
export function publish() {
  revalidateTag('site-content');
  revalidatePath('/', 'layout');
}

export async function uploadImage(file: File) {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').slice(-60) || 'image';
  if (useLocal()) {
    const dir = path.join(process.cwd(), 'public', 'uploads-local');
    await fs.mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${safe}`;
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return `/uploads-local/${name}`;
  }
  if (!hasBlob()) throw new Error('Storage is not connected (BLOB_READ_WRITE_TOKEN is missing).');
  const blob = await put(`uploads/${safe}`, file, { access: 'public', addRandomSuffix: true, contentType: file.type });
  return blob.url;
}

export async function listImages() {
  if (useLocal()) {
    const dir = path.join(process.cwd(), 'public', 'uploads-local');
    const files = await fs.readdir(dir).catch(() => [] as string[]);
    return files.map((f) => ({ url: `/uploads-local/${f}`, size: 0, uploadedAt: 0 }));
  }
  if (!hasBlob()) return [];
  const page = await list({ prefix: 'uploads/', limit: 200 });
  return page.blobs
    .map((b) => ({ url: b.url, size: b.size, uploadedAt: new Date(b.uploadedAt).getTime() }))
    .sort((a, b) => b.uploadedAt - a.uploadedAt);
}
