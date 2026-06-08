'use client';
import { useState } from 'react';

type Form = { name: string; email: string; subject: string; msg: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [form, setForm] = useState<Form>({ name: '', email: '', subject: '', msg: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  const validate = (): boolean => {
    const errs: Partial<Form> = {};
    if (form.name.trim().length < 2) errs.name = 'At least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.subject.trim().length < 2) errs.subject = 'Required';
    if (form.msg.trim().length < 10) errs.msg = 'At least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const send = async () => {
    if (!validate()) return;
    setStatus('sending');
    setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrMsg(json.error ?? 'Something went wrong.');
        setStatus('error');
        return;
      }
      setStatus('success');
      setForm({ name: '', email: '', subject: '', msg: '' });
    } catch {
      setErrMsg(`Something went wrong. Email me directly at ${fallbackEmail}`);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const inputBase =
    'w-full px-4 py-3 bg-transparent border text-[var(--c-text)] placeholder-[var(--c-ghost)] text-sm font-mono focus:outline-none transition-colors';

  const fieldClass = (field: keyof Form) =>
    `${inputBase} ${
      errors[field]
        ? 'border-red-500'
        : 'border-[var(--c-b3)] focus:border-[var(--c-accent)]'
    }`;

  return (
    <div className="p-8 space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="label block mb-2">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={update}
          placeholder="Your full name"
          autoComplete="name"
          className={fieldClass('name')}
        />
        {errors.name && <p className="text-red-500 text-xs font-mono mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label block mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          placeholder="your@email.com"
          autoComplete="email"
          className={fieldClass('email')}
        />
        {errors.email && <p className="text-red-500 text-xs font-mono mt-1">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="label block mb-2">Subject</label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={update}
          placeholder="Project inquiry, collaboration, job offer..."
          className={fieldClass('subject')}
        />
        {errors.subject && <p className="text-red-500 text-xs font-mono mt-1">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="msg" className="label block mb-2">Message</label>
        <textarea
          id="msg"
          name="msg"
          rows={6}
          value={form.msg}
          onChange={update}
          placeholder="Tell me about your project or what you have in mind..."
          className={`${fieldClass('msg')} resize-none`}
        />
        {errors.msg && <p className="text-red-500 text-xs font-mono mt-1">{errors.msg}</p>}
      </div>

      {/* Submit */}
      <button
        onClick={send}
        disabled={status === 'sending'}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="border border-[var(--c-b3)] bg-[var(--c-b1)] p-4">
          <p className="text-[var(--c-accent)] text-sm font-mono">
            Message sent. Check your inbox for a confirmation email from me.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-red-400 text-sm font-mono">{errMsg}</p>
        </div>
      )}
    </div>
  );
}
