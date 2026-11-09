import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

/** The shared look of every social share card. */
export async function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  const mark = await readFile(path.join(process.cwd(), 'public/images/raneddie-mark.png'));
  const logo = `data:image/png;base64,${mark.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'radial-gradient(ellipse at 80% 20%, #1d3f78 0%, #0b1428 55%, #070b16 100%)', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={74} height={58} alt="" />
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5 }}>RanEddie</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: '#6fb6ff' }}>{kicker.toUpperCase()}</span>
          <span style={{ fontSize: title.length > 40 ? 62 : 80, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, marginTop: 14 }}>{title}</span>
          {subtitle && <span style={{ fontSize: 30, color: '#b7c4da', marginTop: 20, lineHeight: 1.35 }}>{subtitle.length > 120 ? subtitle.slice(0, 117) + '…' : subtitle}</span>}
        </div>
        <span style={{ fontSize: 22, color: '#8ea0bf' }}>raneddie.com</span>
      </div>
    ),
    OG_SIZE,
  );
}
