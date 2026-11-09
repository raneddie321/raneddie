import { Gamepad2, Globe2, Layers3, Sparkles } from 'lucide-react';
import type { Visual } from '@/lib/content';

/* eslint-disable @next/next/no-img-element */

export function FizzArt() {
  return (
    <div className="m365-art" aria-label="Fizz browser concept">
      <div className="app-tile tile-a"><span>f.</span></div>
      <div className="app-tile tile-b"><Globe2 /></div>
      <div className="app-tile tile-c"><Sparkles /></div>
      <div className="app-tile tile-d"><Layers3 /></div>
      <div className="browser-window">
        <div className="browser-top"><i /><i /><i /><span>fizz browser</span></div>
        <div className="browser-main">
          <div className="fizz-symbol">f.</div>
          <b>fizz<span>.</span></b>
          <small>Explore more. Get more back.</small>
          <div className="browser-search">⌕ &nbsp; Search the web</div>
          <div className="browser-dock">
            <span>✦<small>Discover</small></span>
            <span>◉<small>Rewards</small></span>
            <span>⌁<small>Private</small></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageArt({ src, alt, badge }: { src: string; alt: string; badge?: string }) {
  return (
    <div className="snake-art">
      <div className="snake-glow" />
      {src && <img src={src} alt={alt} className="art-img" />}
      {badge && (
        <span className="snake-badge">
          <Gamepad2 /> {badge}
        </span>
      )}
    </div>
  );
}

export function HeroVisual({ visual, image, alt, badge }: { visual: Visual; image: string; alt: string; badge?: string }) {
  if (visual === 'fizz') return <FizzArt />;
  return <ImageArt src={image || '/images/snake-brawl-art.svg'} alt={alt} badge={badge} />;
}

/** The small illustration on the right side of a product card. */
export function CardVisual({ visual, image, alt }: { visual: Visual; image: string; alt: string }) {
  if (visual === 'fizz')
    return (
      <div className="mini-browser">
        <div className="mini-bar"><i /><i /><i /></div>
        <div className="mini-fizz">f<span>.</span><small>Search the web</small></div>
      </div>
    );
  return (
    <div className="snake-thumb">
      <img src={image || '/images/snake-brawl-art.svg'} alt={alt} className="art-img" />
    </div>
  );
}
