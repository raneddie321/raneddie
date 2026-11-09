'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setState('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(out.error ?? 'Something went wrong.');
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('idle');
    }
  }

  if (state === 'sent')
    return (
      <div className="contact-form">
        <div className="form-note ok">Thanks — your message is on its way. We usually reply within two business days.</div>
        <button className="ghost-cta" onClick={() => setState('idle')}>Send another message</button>
      </div>
    );

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="row">
        <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      </div>
      <label>
        Topic
        <select name="topic" defaultValue="General">
          {['General', 'Support', 'RanEddie ID', 'Business', 'Press', 'Privacy'].map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={7} /></label>
      <label className="hp" aria-hidden>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <div className="form-note err" role="alert">{error}</div>}
      <button className="hero-cta" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send message'} <Send size={17} />
      </button>
      <small style={{ color: 'var(--muted)', fontSize: 12 }}>By sending this form you agree to our <a href="/privacy" style={{ color: 'var(--blue)' }}>Privacy Policy</a>.</small>
    </form>
  );
}
