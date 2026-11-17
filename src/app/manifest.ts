import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RanEddie',
    short_name: 'RanEddie',
    description: 'RanEddie builds browsers, games, devices, apps and the cloud — with one RanEddie ID for all of them.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f8f2',
    theme_color: '#0878d7',
    icons: [
      { src: '/favicon.png', sizes: 'any', type: 'image/png' },
      { src: '/images/raneddie-mark.png', sizes: '333x262', type: 'image/png' },
    ],
  };
}
