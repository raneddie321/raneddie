import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'RanEddie — Building the Future of Play & Productivity';

export default function Image() {
  return ogCard({ kicker: 'RanEddie Studio', title: 'Building the future of play & productivity.', subtitle: 'Browsers, games, devices, apps and the cloud — one RanEddie ID for all of them.' });
}
