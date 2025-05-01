// src/components/Contact.tsx
'use client';
import { useState } from 'react';

type Form = { name: string; email: string; msg: string };

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', msg: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const errs: Partial<Form> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Valid email required';
    if (!form.msg.trim()) errs.msg = 'Message cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
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
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      setForm({ name: '', email: '', msg: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#111827]">
      <div className="container mx-auto max-w-md px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-8">
          Get In Touch
        </h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={update}
              className={`w-full p-3 rounded bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 ${
                errors.name ? 'ring-red-500' : 'ring-teal-400'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              className={`w-full p-3 rounded bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 ${
                errors.email ? 'ring-red-500' : 'ring-teal-400'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="msg" className="block text-sm font-medium text-slate-300 mb-1">
              Message
            </label>
            <textarea
              id="msg"
              name="msg"
              rows={5}
              value={form.msg}
              onChange={update}
              className={`w-full p-3 rounded bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 ${
                errors.msg ? 'ring-red-500' : 'ring-teal-400'
              }`}
            />
            {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg}</p>}
          </div>

          <button
            onClick={send}
            disabled={status === 'sending'}
            className="w-full py-3 text-lg font-semibold rounded-full bg-teal-400 text-black
                       hover:bg-teal-300 disabled:opacity-50 transition"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-center">Your message has been sent!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center">Error sending message. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}
