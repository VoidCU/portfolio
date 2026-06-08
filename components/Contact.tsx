'use client';
import { useState } from 'react';
import Link from 'next/link';
import { profile } from '@/data/profile';

type Form = { name: string; email: string; msg: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

const contactInfo = [
  { label: 'Email',    value: profile.contacts.email,    href: `mailto:${profile.contacts.email}` },
  { label: 'Location', value: profile.contacts.location,  href: null },
  { label: 'GitHub',   value: '@VoidCU',                  href: profile.contacts.github },
  { label: 'LinkedIn', value: 'saroj-prasad-mainali',     href: profile.contacts.linkedin },
  { label: 'LeetCode', value: '@VoidCU',                  href: profile.contacts.leetcode },
];

export default function Contact() {
  const [form, setForm]     = useState<Form>({ name: '', email: '', msg: '' });
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
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
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

  return (
    <section id="contact" className="bg-[#0d140d] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            CONTACT
          </h2>
          <span className="label">07 / 07</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 border border-[rgba(74,222,128,0.08)]">

          {/* Left: info */}
          <div className="p-8 lg:border-r border-b lg:border-b-0 border-[rgba(74,222,128,0.08)] space-y-8">
            <div>
              <h3 className="font-heading font-bold text-[#e8fdf0] text-xl mb-2">
                Let&apos;s build something.
              </h3>
              <p className="text-[#4d7c5a] text-sm leading-relaxed">
                Open to freelance work, full-time roles, and interesting collaborations. I respond within 24 hours.
              </p>
            </div>

            {/* Availability */}
            <div className="border border-[rgba(74,222,128,0.08)] p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-[#4ade80] opacity-80" />
                <span className="label">Available</span>
              </div>
              <p className="text-[#4d7c5a] text-xs mt-1">
                Taking new projects &amp; exploring full-time opportunities.
              </p>
            </div>

            {/* Contact details */}
            <div className="divide-y divide-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.08)]">
              {contactInfo.map(({ label, value, href }) => (
                <div key={label} className="group px-4 py-3 flex items-center justify-between gap-4 hover:bg-[#4ade80] transition-colors">
                  <span className="label group-hover:text-[#080d08]">{label}</span>
                  {href ? (
                    <Link
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-[#86efac] group-hover:text-[#080d08] text-xs font-mono transition-colors truncate"
                    >
                      {value}
                    </Link>
                  ) : (
                    <span className="text-[#86efac] group-hover:text-[#080d08] text-xs font-mono transition-colors">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
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
                className={`w-full px-4 py-3 bg-transparent border text-[#e8fdf0] placeholder-[#1f3a28] text-sm font-mono focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-[rgba(74,222,128,0.5)]'
                    : 'border-[rgba(74,222,128,0.12)] focus:border-[rgba(74,222,128,0.4)]'
                }`}
              />
              {errors.name && <p className="text-[#86efac] text-xs font-mono mt-1">{errors.name}</p>}
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
                className={`w-full px-4 py-3 bg-transparent border text-[#e8fdf0] placeholder-[#1f3a28] text-sm font-mono focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-[rgba(74,222,128,0.5)]'
                    : 'border-[rgba(74,222,128,0.12)] focus:border-[rgba(74,222,128,0.4)]'
                }`}
              />
              {errors.email && <p className="text-[#86efac] text-xs font-mono mt-1">{errors.email}</p>}
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
                className={`w-full px-4 py-3 bg-transparent border text-[#e8fdf0] placeholder-[#1f3a28] text-sm font-mono focus:outline-none resize-none transition-colors ${
                  errors.msg
                    ? 'border-[rgba(74,222,128,0.5)]'
                    : 'border-[rgba(74,222,128,0.12)] focus:border-[rgba(74,222,128,0.4)]'
                }`}
              />
              {errors.msg && <p className="text-[#86efac] text-xs font-mono mt-1">{errors.msg}</p>}
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
              <div className="border border-[rgba(74,222,128,0.2)] p-3">
                <p className="text-[#4ade80] text-sm font-mono">Message sent. I&apos;ll get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="border border-[rgba(74,222,128,0.1)] p-3">
                <p className="text-[#4d7c5a] text-sm font-mono">Error. Please email me directly at {profile.contacts.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
