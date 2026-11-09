import HomeClient from '@/components/home-client';
import { getContent } from '@/lib/content-store';

export const revalidate = 600;

export default async function Home() {
  return <HomeClient content={await getContent()} />;
}
