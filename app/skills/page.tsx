import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { Reveal } from '@/components/fx/Reveal';
import SkillsView from './SkillsView';

export const metadata: Metadata = {
  title: 'Skills — Full-Stack, AI/ML, DevOps & Mobile Development',
  description:
    'Saroj Prasad Mainali\'s technical skills: Next.js, React, FastAPI, Django, Python, Flutter, TensorFlow, PyTorch, Docker, Kubernetes, PostgreSQL, TypeScript and more. 5+ years, full-stack to low-level.',
  keywords: [
    'full-stack developer skills Nepal', 'Next.js developer', 'FastAPI developer Nepal',
    'Flutter developer Nepal', 'Python developer Nepal', 'TensorFlow developer', 'PyTorch Nepal',
    'TypeScript developer', 'Docker Kubernetes Nepal', 'React developer Kathmandu',
    'machine learning engineer Nepal', 'SaaS developer skills', 'VoidCU skills',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Skills — Saroj Prasad Mainali (VoidCU)',
    description: 'Full-stack to low-level. Frontend, backend, AI/ML, mobile, DevOps, and design. 5+ years of real production experience.',
    type: 'website',
    url: 'https://voidcu.com/skills',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Technical Skills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills — Saroj Prasad Mainali (VoidCU)',
    description: 'Full-stack to low-level. Frontend, backend, AI/ML, DevOps, and more. 5 years of real production work.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/skills' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Skills', item: 'https://voidcu.com/skills' },
  ],
};

/* Volume motif — instrument grid (brief §5): calibration grid with
   crosshair ticks and gauge dials. Rendered at 4% by the plate. */
function InstrumentGridMotif() {
  return (
    <svg
      className="h-full w-full text-ink"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="vol04-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" stroke="currentColor" strokeWidth="1" />
          <path d="M32 28v8M28 32h8" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="520" fill="url(#vol04-grid)" />
      <g stroke="currentColor" strokeWidth="1">
        {/* primary dial */}
        <circle cx="288" cy="256" r="160" />
        <circle cx="288" cy="256" r="112" strokeDasharray="2 10" />
        <circle cx="288" cy="256" r="56" />
        <path d="M288 80v32M288 400v32M112 256h32M448 256h32" />
        {/* secondary dial */}
        <circle cx="1088" cy="160" r="96" />
        <circle cx="1088" cy="160" r="64" strokeDasharray="2 8" />
        <path d="M1088 40v24M1088 256v24M968 160h24M1184 160h24" />
        {/* calibration tick rows */}
        <path d="M704 448h512" strokeDasharray="1 15" />
        <path d="M640 64h256" strokeDasharray="1 15" />
      </g>
    </svg>
  );
}

export default function SkillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="relative min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.04"
          title="INSTRUMENTS"
          altitude="5,300M"
          motif={<InstrumentGridMotif />}
        >
          <p className="label numeric">TECHNICAL SKILLS — FIELD MANIFEST</p>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm leading-relaxed text-dim md:text-base">
              I work across the whole stack and a few domains most engineers never touch. None of this
              is from a tutorial. It is from shipping things, breaking them, and fixing them under
              pressure, usually with the power about to go out.
            </p>
          </Reveal>
        </VolumePlate>

        <SkillsView />

        <ChapterNav current="/skills" />
      </main>
      <Footer />
    </>
  );
}
