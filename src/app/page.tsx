import HomeClient from '@/components/home-client';
import { getContent } from '@/lib/content-store';

export const revalidate = 600;

export default async function Home() {
  const content = await getContent();
  // The homepage doesn't need docs; keep the page payload small.
  return <HomeClient content={{ ...content, docs: [] }} />;
}
