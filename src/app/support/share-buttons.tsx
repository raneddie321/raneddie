'use client';

import { useState } from 'react';

/** Share the campaign: WhatsApp, Facebook, X and copy link. */
export function ShareButtons({ url, text }: { url: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return (
    <div className="support-share">
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">📘 Facebook</a>
      <a href={`https://x.com/intent/post?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer">𝕏 X</a>
      <button
        type="button"
        onClick={async () => {
          try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
        }}
      >
        {copied ? '✓ Copied' : '🔗 Copy link'}
      </button>
    </div>
  );
}
