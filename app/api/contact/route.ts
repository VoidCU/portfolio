import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const OWNER_EMAIL = 'sarojprasadmainali@gmail.com';
const OWNER_NAME = 'Saroj Prasad Mainali';
const SITE = 'https://voidcu.com';

// ── In-memory rate limiter ─────────────────────────────────────────────────
// 3 submissions per IP per hour. Good enough for a portfolio contact form.
const rateMap = new Map<string, { count: number; reset: number }>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

// ── Anti-bot: signed form token ────────────────────────────────────────────
// The form fetches a token (GET) when it mounts. A submission must carry a
// valid, unexpired token that is at least MIN_FILL_MS old — scripts that POST
// directly, or fill the form instantly, are rejected.
const MIN_FILL_MS = 4_000;
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;

function secret(): string {
  return process.env.CONTACT_SECRET ?? `contact:${process.env.BREVO_API_KEY ?? ''}`;
}

function sign(ts: string): string {
  return createHmac('sha256', secret()).update(ts).digest('base64url');
}

function issueToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

function tokenProblem(token: unknown): string | null {
  if (typeof token !== 'string') return 'missing';
  const [ts, sig] = token.split('.');
  if (!ts || !sig) return 'malformed';
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'bad-signature';
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < MIN_FILL_MS) return 'too-fast';
  if (age > MAX_TOKEN_AGE_MS) return 'expired';
  return null;
}

// ── Anti-bot: content heuristics ───────────────────────────────────────────
// Catches keyboard-mash payloads like "aTjXrdnLvMpKASBWEyqSTn".
function looksRandom(text: string): boolean {
  return text.split(/\s+/).some((word) => {
    if (word.length < 10 || !/^[a-zA-Z]+$/.test(word)) return false;
    const caseFlips = word.slice(1).split('').filter((c, i) => {
      const prev = word[i];
      return (c === c.toUpperCase()) !== (prev === prev.toUpperCase());
    }).length;
    const vowels = (word.match(/[aeiou]/gi) ?? []).length / word.length;
    return caseFlips >= 4 || vowels < 0.15;
  });
}

function spamReason(d: { name: string; subject: string; msg: string }): string | null {
  if (looksRandom(d.name) || looksRandom(d.subject)) return 'gibberish';
  if (!d.msg.includes(' ') && d.msg.length > 15) return 'gibberish';
  if ((d.msg.match(/https?:\/\//g) ?? []).length > 3) return 'links';
  if (/https?:\/\//.test(d.name)) return 'links';
  return null;
}

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

// ── Brevo email sender ─────────────────────────────────────────────────────
async function sendEmail(payload: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent: string;
  replyTo?: { email: string; name?: string };
}) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: OWNER_NAME, email: process.env.BREVO_EMAIL_ADDRESS },
      ...payload,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

// ── Email templates ────────────────────────────────────────────────────────
// Table layout + inline styles: the only thing Gmail/Outlook render reliably.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const C = {
  bg: '#090c12',
  surface: '#10151e',
  raised: '#171e29',
  text: '#f3f1eb',
  dim: '#b6bdc8',
  muted: '#929cae',
  line: '#232b38',
  accent: '#ff956a',
  onAccent: '#15100d',
};
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,monospace";

function shell(preheader: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="dark"/>
<meta name="supported-color-schemes" content="dark"/>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:${C.surface};border:1px solid ${C.line};">
<tr><td style="height:3px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
${inner}
<tr><td style="padding:20px 36px;border-top:1px solid ${C.line};font-family:${MONO};font-size:11px;letter-spacing:0.08em;color:${C.muted};">
<a href="${SITE}" style="color:${C.muted};text-decoration:none;">VOIDCU.COM</a> &nbsp;·&nbsp; KATHMANDU, NEPAL
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function label(text: string): string {
  return `<div style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${C.accent};margin:0 0 8px;">${text}</div>`;
}

function button(href: string, text: string, primary = true): string {
  const style = primary
    ? `background:${C.accent};color:${C.onAccent};border:1px solid ${C.accent};`
    : `background:transparent;color:${C.text};border:1px solid ${C.line};`;
  return `<a href="${href}" style="display:inline-block;${style}font-family:${MONO};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:13px 22px;margin:0 8px 8px 0;">${text}</a>`;
}

function notificationHtml(name: string, email: string, subject: string, msg: string, meta: string): string {
  const n = esc(name), e = esc(email), s = esc(subject);
  const reply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
  return shell(`${name}: ${msg.slice(0, 90)}`, `
<tr><td style="padding:32px 36px 8px;">
  ${label('New enquiry · Portfolio')}
  <h1 style="margin:0;font-family:${SANS};font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-0.02em;color:${C.text};">${s}</h1>
  <p style="margin:10px 0 0;font-family:${SANS};font-size:15px;color:${C.dim};">from <strong style="color:${C.text};">${n}</strong> · <a href="mailto:${e}" style="color:${C.accent};text-decoration:none;">${e}</a></p>
</td></tr>
<tr><td style="padding:24px 36px;">
  ${label('Message')}
  <div style="background:${C.raised};border-left:2px solid ${C.accent};padding:18px 20px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.text};white-space:pre-wrap;word-break:break-word;">${esc(msg)}</div>
</td></tr>
<tr><td style="padding:0 36px 28px;">
  ${button(reply, `Reply to ${esc(name.split(' ')[0])}`)}
</td></tr>
<tr><td style="padding:0 36px 24px;font-family:${MONO};font-size:11px;line-height:1.6;color:${C.muted};">${esc(meta)}</td></tr>`);
}

function confirmationHtml(firstName: string, subject: string, msg: string): string {
  const excerpt = msg.length > 280 ? `${msg.slice(0, 280)}…` : msg;
  return shell('Thanks for reaching out — I read every message personally.', `
<tr><td style="padding:36px 36px 8px;">
  ${label('Message received')}
  <h1 style="margin:0;font-family:${SANS};font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-0.03em;color:${C.text};">Thanks, ${esc(firstName)}.</h1>
</td></tr>
<tr><td style="padding:16px 36px 8px;font-family:${SANS};font-size:15px;line-height:1.75;color:${C.dim};">
  <p style="margin:0 0 14px;">Your message reached my inbox. I read everything personally and usually reply within one to two business days.</p>
  <p style="margin:0;">If it&rsquo;s time-sensitive, just reply to this email — it comes straight to me.</p>
</td></tr>
<tr><td style="padding:20px 36px;">
  ${label('What you sent')}
  <div style="background:${C.raised};border:1px solid ${C.line};padding:16px 18px;">
    <div style="font-family:${SANS};font-size:14px;font-weight:700;color:${C.text};margin:0 0 6px;">${esc(subject)}</div>
    <div style="font-family:${SANS};font-size:14px;line-height:1.65;color:${C.muted};white-space:pre-wrap;word-break:break-word;">${esc(excerpt)}</div>
  </div>
</td></tr>
<tr><td style="padding:8px 36px 24px;">
  ${button(`${SITE}/projects`, 'View my work')}${button('https://github.com/VoidCU', 'GitHub', false)}${button('https://www.linkedin.com/in/saroj-prasad-mainali', 'LinkedIn', false)}
</td></tr>
<tr><td style="padding:0 36px 32px;">
  <div style="font-family:${SANS};font-size:16px;font-weight:800;color:${C.text};">${OWNER_NAME}</div>
  <div style="font-family:${MONO};font-size:11px;letter-spacing:0.08em;color:${C.muted};margin-top:4px;">FULL-STACK ENGINEER</div>
</td></tr>`);
}

// ── Validation ─────────────────────────────────────────────────────────────
function validateInput(data: unknown): { name: string; email: string; subject: string; msg: string } | null {
  if (typeof data !== 'object' || data === null) return null;
  const { name, email, subject, msg } = data as Record<string, unknown>;
  if (typeof name !== 'string' || name.trim().length < 2) return null;
  if (typeof email !== 'string' || !/^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(email.trim())) return null;
  if (typeof subject !== 'string' || subject.trim().length < 2) return null;
  if (typeof msg !== 'string' || msg.trim().length < 10) return null;
  if (name.length > 100 || email.length > 200 || subject.length > 200 || msg.length > 5000) return null;
  // No header-injection characters in single-line fields
  if (/[\r\n]/.test(name) || /[\r\n]/.test(subject)) return null;
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    msg: msg.trim(),
  };
}

// ── Route handlers ─────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ token: issueToken() }, { headers: { 'cache-control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  const ok = NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });

  if (!originAllowed(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait an hour before trying again.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: hidden field humans never see. Pretend success so bots move on.
  if (typeof body?.website === 'string' && body.website !== '') {
    console.warn('Contact blocked: honeypot', ip);
    return ok;
  }

  const tokenIssue = tokenProblem(body?.token);
  if (tokenIssue === 'too-fast' || tokenIssue === 'missing' || tokenIssue === 'malformed' || tokenIssue === 'bad-signature') {
    console.warn(`Contact blocked: token ${tokenIssue}`, ip);
    return ok;
  }
  if (tokenIssue === 'expired') {
    return NextResponse.json({ error: 'This form expired. Please refresh the page and try again.' }, { status: 400 });
  }

  const data = validateInput(body);
  if (!data) {
    return NextResponse.json(
      { error: 'Please fill in all fields correctly. Message must be at least 10 characters.' },
      { status: 400 }
    );
  }

  const spam = spamReason(data);
  if (spam) {
    console.warn(`Contact blocked: ${spam}`, ip);
    return ok;
  }

  const { name, email, subject, msg } = data;
  const firstName = name.split(' ')[0];
  const meta = `Received ${new Date().toUTCString()} · IP ${ip}`;

  try {
    // Owner notification first; confirmation only goes out once that succeeds.
    await sendEmail({
      to: [{ email: OWNER_EMAIL, name: OWNER_NAME }],
      subject: `[Portfolio] ${subject} — ${name}`,
      htmlContent: notificationHtml(name, email, subject, msg, meta),
      textContent: `New portfolio message\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${msg}\n\n${meta}`,
      replyTo: { email, name },
    });
    await sendEmail({
      to: [{ email, name }],
      subject: `Thanks for reaching out, ${firstName}`,
      htmlContent: confirmationHtml(firstName, subject, msg),
      textContent: `Hi ${firstName},\n\nThanks for your message — I read everything personally and usually reply within one to two business days. Reply to this email if it's time-sensitive.\n\n— ${OWNER_NAME}\n${SITE}`,
      replyTo: { email: OWNER_EMAIL, name: OWNER_NAME },
    });

    return ok;
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json(
      { error: `Failed to send message. Please email me directly at ${OWNER_EMAIL}` },
      { status: 500 }
    );
  }
}
