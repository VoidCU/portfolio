import { NextRequest, NextResponse } from 'next/server';

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

// ── Brevo email sender ─────────────────────────────────────────────────────
async function sendEmail(payload: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
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
      sender: {
        name: 'Saroj Prasad Mainali',
        email: process.env.BREVO_EMAIL_ADDRESS,
      },
      ...payload,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

// ── Email templates ────────────────────────────────────────────────────────
function notificationHtml(name: string, email: string, subject: string, msg: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Contact from ${name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0a0f0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#e2fcea;-webkit-font-smoothing:antialiased}
  .wrap{max-width:600px;margin:0 auto;padding:32px 16px}
  .card{background:#0f1a0f;border:1px solid rgba(74,222,128,0.2);border-radius:2px;overflow:hidden}
  .header{padding:36px 40px 28px;border-bottom:1px solid rgba(74,222,128,0.15)}
  .logo{font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#4ade80;margin-bottom:20px}
  .header h1{font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.2}
  .header p{font-size:13px;color:#6ee7b7;margin-top:6px;font-family:monospace;letter-spacing:0.05em}
  .body{padding:36px 40px}
  .field{margin-bottom:24px}
  .field-label{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4ade80;font-family:monospace;margin-bottom:8px}
  .field-value{font-size:15px;color:#ffffff;line-height:1.6;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);padding:14px 16px;border-radius:1px;word-break:break-word}
  .field-value a{color:#4ade80;text-decoration:none}
  .divider{height:1px;background:rgba(74,222,128,0.12);margin:28px 0}
  .cta{display:inline-block;background:#4ade80;color:#020403;font-weight:700;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;text-decoration:none;font-family:monospace;border-radius:1px}
  .footer{padding:24px 40px;background:#0a0f0a;border-top:1px solid rgba(74,222,128,0.1);text-align:center}
  .footer p{font-size:11px;color:#2d6a4f;font-family:monospace;letter-spacing:0.05em}
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <div class="logo">VOIDCU · Portfolio</div>
      <h1>New message from ${name}</h1>
      <p>${new Date().toUTCString()}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">From</div>
        <div class="field-value">${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</div>
      </div>
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${subject}</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="field-value" style="white-space:pre-wrap">${msg}</div>
      </div>
      <div class="divider"></div>
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="cta">Reply to ${name}</a>
    </div>
    <div class="footer">
      <p>Sent via voidcu.com contact form · Saroj Prasad Mainali</p>
    </div>
  </div>
</div>
</body>
</html>`;
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Got your message, ${name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#f8fff9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0f3d22;-webkit-font-smoothing:antialiased}
  .wrap{max-width:600px;margin:0 auto;padding:32px 16px}
  .card{background:#ffffff;border:1px solid #dcfce7;border-radius:2px;overflow:hidden;box-shadow:0 2px 24px rgba(22,101,52,0.06)}
  .header{padding:48px 40px 36px;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%);text-align:center;border-bottom:2px solid #16a34a}
  .logo{font-family:monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#16a34a;margin-bottom:20px}
  .checkmark{width:52px;height:52px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:24px;color:#fff;line-height:52px;text-align:center}
  .header h1{font-size:28px;font-weight:900;color:#030a05;letter-spacing:-0.03em;line-height:1.15}
  .header p{font-size:14px;color:#166534;margin-top:8px;line-height:1.5}
  .body{padding:40px}
  .body p{font-size:15px;color:#0f3d22;line-height:1.75;margin-bottom:16px}
  .body p strong{color:#030a05}
  .highlight{background:#f0fdf4;border-left:3px solid #16a34a;padding:16px 20px;margin:24px 0;border-radius:0 2px 2px 0}
  .highlight p{font-size:14px;color:#166534;margin:0;font-style:italic}
  .divider{height:1px;background:#dcfce7;margin:28px 0}
  .links{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
  .link-btn{display:inline-block;padding:11px 22px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:monospace;text-decoration:none;border-radius:1px}
  .link-primary{background:#16a34a;color:#ffffff}
  .link-secondary{border:1px solid rgba(22,101,52,0.3);color:#16a34a}
  .signature{margin-top:32px;padding-top:24px;border-top:1px solid #dcfce7}
  .sig-name{font-size:16px;font-weight:800;color:#030a05;letter-spacing:-0.01em}
  .sig-role{font-size:12px;color:#166534;font-family:monospace;letter-spacing:0.05em;margin-top:2px}
  .footer{padding:24px 40px;background:#f0fdf4;border-top:1px solid #dcfce7;text-align:center}
  .footer p{font-size:11px;color:#86efac;font-family:monospace;letter-spacing:0.05em}
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <div class="logo">SAROJ PRASAD MAINALI</div>
      <div class="checkmark" style="background:#16a34a;color:#fff;line-height:52px">&#10003;</div>
      <h1>Got your message, ${name}.</h1>
      <p>Thank you for reaching out. I will get back to you soon.</p>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        Your message landed in my inbox. I read every message personally and try to respond within 1-2 business days. If your project is time-sensitive, feel free to follow up directly.
      </p>
      <div class="highlight">
        <p>"I build things that ship, not just things that demo. Looking forward to hearing more about what you have in mind."</p>
      </div>
      <p>In the meantime, feel free to check out my recent work or connect on LinkedIn.</p>
      <div class="links">
        <a href="https://voidcu.com/projects" class="link-btn link-primary">View My Work</a>
        <a href="https://www.linkedin.com/in/saroj-prasad-mainali" class="link-btn link-secondary">LinkedIn</a>
        <a href="https://github.com/VoidCU" class="link-btn link-secondary">GitHub</a>
      </div>
      <div class="divider"></div>
      <div class="signature">
        <div class="sig-name">Saroj Prasad Mainali</div>
        <div class="sig-role">Full-Stack Engineer · Kathmandu, Nepal</div>
      </div>
    </div>
    <div class="footer">
      <p>voidcu.com · sarojprasadmainali@gmail.com</p>
    </div>
  </div>
</div>
</body>
</html>`;
}

// ── Validation ─────────────────────────────────────────────────────────────
function validateInput(data: unknown): { name: string; email: string; subject: string; msg: string } | null {
  if (typeof data !== 'object' || data === null) return null;
  const { name, email, subject, msg } = data as Record<string, unknown>;
  if (typeof name !== 'string' || name.trim().length < 2) return null;
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return null;
  if (typeof subject !== 'string' || subject.trim().length < 2) return null;
  if (typeof msg !== 'string' || msg.trim().length < 10) return null;
  // Prevent absurdly long inputs
  if (name.length > 100 || email.length > 200 || subject.length > 200 || msg.length > 5000) return null;
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    msg: msg.trim(),
  };
}

// ── Route handler ──────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait an hour before trying again.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = validateInput(body);
  if (!data) {
    return NextResponse.json(
      { error: 'Please fill in all fields correctly. Message must be at least 10 characters.' },
      { status: 400 }
    );
  }

  const { name, email, subject, msg } = data;

  try {
    // Send both emails concurrently
    await Promise.all([
      // 1. Notification to Saroj
      sendEmail({
        to: [{ email: 'sarojprasadmainali@gmail.com', name: 'Saroj Prasad Mainali' }],
        subject: `[Portfolio] ${subject} — from ${name}`,
        htmlContent: notificationHtml(name, email, subject, msg),
        replyTo: { email, name },
      }),
      // 2. Confirmation to sender
      sendEmail({
        to: [{ email, name }],
        subject: `Got your message, ${name.split(' ')[0]} — Saroj Prasad Mainali`,
        htmlContent: confirmationHtml(name.split(' ')[0]),
        replyTo: { email: 'sarojprasadmainali@gmail.com', name: 'Saroj Prasad Mainali' },
      }),
    ]);

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please email me directly at sarojprasadmainali@gmail.com' },
      { status: 500 }
    );
  }
}
