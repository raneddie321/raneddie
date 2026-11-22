import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  // Share-card images read the logo from /public at runtime.
  outputFileTracingIncludes: { '/**/opengraph-image': ['./public/images/raneddie-mark.png'] },
};
export default nextConfig;
