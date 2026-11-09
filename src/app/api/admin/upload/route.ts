import { requestIsAdmin } from '@/lib/admin-auth';
import { uploadImage } from '@/lib/content-store';

const TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']);
const MAX = 4 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await requestIsAdmin())) return Response.json({ error: 'Not signed in.' }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'No file.' }, { status: 400 });
  if (!TYPES.has(file.type)) return Response.json({ error: 'Use a PNG, JPG, WebP, GIF, AVIF or SVG image.' }, { status: 400 });
  if (file.size > MAX) return Response.json({ error: 'Images must be 4 MB or smaller.' }, { status: 413 });
  try {
    return Response.json({ url: await uploadImage(file) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 500 });
  }
}
