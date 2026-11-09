import { getContent } from '@/lib/content-store';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'RanEddie product';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await getContent()).products.find((x) => x.slug === slug);
  return ogCard({ kicker: p?.category ?? 'RanEddie', title: p ? `${p.name}. ${p.tagline}` : 'RanEddie', subtitle: p?.summary });
}
