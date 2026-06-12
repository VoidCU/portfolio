'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/profile';
import { Scramble } from './fx/Scramble';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FieldName = 'name' | 'email' | 'subject' | 'msg';
type FormState = Record<FieldName, string>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: FormState = { name: '', email: '', subject: '', msg: '' };

const FIELDS: {
  name: FieldName;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}[] = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject' },
  { name: 'msg', label: 'Message', multiline: true },
];

/**
 * BRIEF §4.10 — the single source for the contact form (homepage + /contact).
 * POST shape to /api/contact is unchanged: { name, email, subject, msg }.
 */
export default function ContactForm({
  fallbackEmail = profile.contacts.email,
}: {
  fallbackEmail?: string;
}) {
  const uid = useId();
  const reduced = useReducedMotion();
  const [scope, animateShake] = useAnimate();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [focused, setFocused] = useState<FieldName | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (form.name.trim().length < 2) errs.name = 'At least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.subject.trim().length < 2) errs.subject = 'Required';
    if (form.msg.trim().length < 10) errs.msg = 'At least 10 characters';
    setErrors(errs);
    const bad = Object.keys(errs) as FieldName[];
    if (bad.length > 0 && !reduced) {
      // 4px x-shake, 3 keyframes — skipped under reduced motion (BRIEF §4.10)
      for (const field of bad) {
        animateShake(`[data-field="${field}"]`, { x: [-4, 4, 0] }, { duration: 0.3 });
      }
    }
    return bad.length === 0;
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
      setForm(EMPTY);
    } catch {
      setErrMsg(`Something went wrong. Email me directly at ${fallbackEmail}`);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const sending = status === 'sending';

  return (
    <form
      ref={scope}
      noValidate
      aria-busy={sending}
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
      className="relative border border-line-2 bg-surface p-6 sm:p-8 lg:p-10"
    >
      <p className="label numeric mb-8">TX/07 — RELAY FORM · 27.7172°N 85.3240°E</p>

      <div className="space-y-7">
        {FIELDS.map((f) => {
          const error = errors[f.name];
          const active = focused === f.name || form[f.name] !== '';
          const fieldId = `${uid}-${f.name}`;
          const errId = `${fieldId}-err`;
          const controlProps = {
            id: fieldId,
            name: f.name,
            value: form[f.name],
            onChange: update,
            onFocus: () => setFocused(f.name),
            onBlur: () => setFocused(null),
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? errId : undefined,
            className:
              'block w-full bg-transparent pt-6 pb-2.5 font-mono text-sm text-ink caret-accent focus:outline-none',
          };
          return (
            <div key={f.name} data-field={f.name} className="relative">
              {f.multiline ? (
                <textarea
                  {...controlProps}
                  rows={6}
                  className={`${controlProps.className} resize-none`}
                />
              ) : (
                <input
                  {...controlProps}
                  type={f.type ?? 'text'}
                  autoComplete={f.autoComplete}
                />
              )}

              {/* Floating mono label — shrinks/translates on focus/filled */}
              <label
                htmlFor={fieldId}
                className="label pointer-events-none absolute left-0 top-6 origin-left select-none"
                style={{
                  transform: active ? 'translateY(-1.35rem) scale(0.82)' : 'none',
                  transition: 'transform 0.2s var(--ease-micro)',
                }}
              >
                {f.label}
              </label>

              {/* 1px bottom border + accent scaleX draw on focus */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-px transition-colors duration-200 ${
                  error ? 'bg-danger' : 'bg-line-3'
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
                style={{
                  transform: focused === f.name ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s var(--ease-micro)',
                }}
              />

              {error && (
                <p id={errId} role="alert" className="mt-1.5 font-mono text-xs text-danger">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit — label y-mask swap + indeterminate 1px sweep beam */}
      <button
        type="submit"
        disabled={sending}
        className="btn-primary relative mt-8 block w-full overflow-hidden disabled:cursor-not-allowed"
      >
        <span className="relative block h-[1.1em] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={sending ? 'sending' : 'idle'}
              className="block"
              initial={reduced ? { opacity: 0 } : { y: '120%' }}
              animate={reduced ? { opacity: 1 } : { y: '0%' }}
              exit={reduced ? { opacity: 0 } : { y: '-120%' }}
              transition={{ duration: 0.3, ease: EASE_RISE }}
            >
              {sending ? 'TRANSMITTING…' : 'SEND MESSAGE'}
            </motion.span>
          </AnimatePresence>
        </span>
        {sending &&
          (reduced ? (
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-on-accent/60" />
          ) : (
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-1/3 bg-on-accent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
      </button>

      {/* Status panels — AnimatePresence swaps, no setTimeout pops */}
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' && (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: 0.35, ease: EASE_RISE }}
            className="mt-5 flex items-start gap-3 border border-line-2 bg-bg p-4"
          >
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" aria-hidden="true">
              <motion.path
                d="M4 12.5 10 18.5 20 6.5"
                stroke="currentColor"
                strokeWidth={1.5}
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: EASE_RISE, delay: 0.15 }}
              />
            </svg>
            <div className="min-w-0">
              <Scramble
                text="TRANSMISSION RECEIVED — 27.7172°N"
                play="mount"
                className="numeric font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent"
              />
              <p className="mt-1.5 font-mono text-xs text-dim">
                Message sent. Check your inbox for a confirmation email from me.
              </p>
            </div>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: 0.35, ease: EASE_RISE }}
            className="mt-5 border border-danger/30 p-4"
          >
            <p className="font-mono text-sm text-danger">{errMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
