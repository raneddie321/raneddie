import { getContent } from '@/lib/content-store';
import { allDocs } from '@/lib/docs';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'RanEddie Docs';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = allDocs(await getContent()).find((x) => x.slug === slug);
  return ogCard({ kicker: `Docs · ${d?.section ?? 'RanEddie'}`, title: d?.title ?? 'RanEddie Docs', subtitle: d?.description });
}
