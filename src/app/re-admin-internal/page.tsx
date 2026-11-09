import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { adminConfigured, isAdmin, isAdminHost } from '@/lib/admin-auth';
import { getContentFresh, hasBlob } from '@/lib/content-store';
import AdminApp from './admin-app';
import AdminLogin from './admin-login';
import './admin.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Studio', robots: { index: false, follow: false } };

/** Reached only through the secret path (middleware rewrite); direct visits are a 404. */
export default async function AdminPage() {
  const h = await headers();
  if (!adminConfigured() || !isAdminHost(h.get('x-forwarded-host') ?? h.get('host'))) notFound();
  if (!(await isAdmin())) return <AdminLogin />;
  return <AdminApp initial={await getContentFresh()} storageReady={hasBlob() || process.env.NODE_ENV !== 'production'} />;
}
