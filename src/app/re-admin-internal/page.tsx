import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { adminConfigured, isAdmin, isAdminHost } from '@/lib/admin-auth';
import { getContentFresh, hasBlob } from '@/lib/content-store';
import { allDocs } from '@/lib/docs';
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
  const content = await getContentFresh();
  // Studio edits the full docs list; the API stores only what changed.
  return <AdminApp initial={{ ...content, docs: allDocs(content), docsRemoved: [] }} storageReady={hasBlob() || process.env.NODE_ENV !== 'production'} />;
}
