'use client';

import { useRef, useState, type FormEvent } from 'react';

export default function AdminLogin() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  async function submit(code: string, e?: FormEvent) {
    e?.preventDefault();
    if (code.length < 6 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) return window.location.reload();
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? 'Something went wrong.');
      setDigits(Array(6).fill(''));
      refs.current[0]?.focus();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setBusy(false);
    }
  }

  function set(i: number, v: string) {
    const clean = v.replace(/\D/g, '');
    const next = [...digits];
    if (clean.length > 1) {
      // Pasted the whole code
      clean.slice(0, 6).split('').forEach((c, k) => (next[k] = c));
      setDigits(next);
      if (clean.length >= 6) submit(next.join(''));
      else refs.current[Math.min(clean.length, 5)]?.focus();
      return;
    }
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) refs.current[i + 1]?.focus();
    if (next.every(Boolean)) submit(next.join(''));
  }

  return (
    <main className="adm-login">
      <form className="adm-login-card" onSubmit={(e) => submit(digits.join(''), e)}>
        <div className="adm-mark">R</div>
        <h1>RanEddie Studio</h1>
        <p>Enter your access code</p>
        <div className="adm-code" aria-label="Access code">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={6}
              aria-label={`Digit ${i + 1}`}
              autoFocus={i === 0}
              disabled={busy}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
              }}
            />
          ))}
        </div>
        {error && <div className="adm-alert error">{error}</div>}
        <button className="adm-btn primary wide" disabled={busy || digits.some((d) => !d)}>
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </main>
  );
}
