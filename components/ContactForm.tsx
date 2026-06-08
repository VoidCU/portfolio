'use client';
import { useState } from 'react';

type Form = { name: string; email: string; msg: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [form, setForm] = useState<Form>({ name: '', email: '', msg: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const errs: Partial<Form> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Valid email required';
    if (!form.msg.trim()) errs.msg = 'Required';
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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', msg: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputBase =
    'w-full px-4 py-3 bg-transparent border text-[#e8fdf0] placeholder-[#4d7c5a] text-sm font-mono-custom focus:outline-none transition-colors';

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
          className={`${inputBase} ${
            errors.name
              ? 'border-[#4ade80]'
              : 'border-[rgba(74,222,128,0.14)] focus:border-[#4ade80]'
          }`}
        />
        {errors.name && <p className="text-[#4ade80] text-xs font-mono-custom mt-1">{errors.name}</p>}
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
          className={`${inputBase} ${
            errors.email
              ? 'border-[#4ade80]'
              : 'border-[rgba(74,222,128,0.14)] focus:border-[#4ade80]'
          }`}
        />
        {errors.email && <p className="text-[#4ade80] text-xs font-mono-custom mt-1">{errors.email}</p>}
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
          placeholder="Tell me about your project or opportunity..."
          className={`${inputBase} resize-none ${
            errors.msg
              ? 'border-[#4ade80]'
              : 'border-[rgba(74,222,128,0.14)] focus:border-[#4ade80]'
          }`}
        />
        {errors.msg && <p className="text-[#4ade80] text-xs font-mono-custom mt-1">{errors.msg}</p>}
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
        <div className="border border-[rgba(74,222,128,0.14)] p-3">
          <p className="text-[#4ade80] text-sm font-mono-custom">Message sent. I will get back to you soon.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="border border-[rgba(74,222,128,0.08)] p-3">
          <p className="text-[#86efac] text-sm font-mono-custom">
            Error. Please email me directly at {fallbackEmail}
          </p>
        </div>
      )}
    </div>
  );
}
