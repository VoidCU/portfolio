import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

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

export default function SkillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              SKILLS
            </h1>
            <span className="label">02 / 07</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm max-w-2xl leading-relaxed mb-12">
            I work across the whole stack and a few domains most engineers never touch. None of this
            is from a tutorial. It is from shipping things, breaking them, and fixing them under
            pressure, usually with the power about to go out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[var(--c-b2)]">
            {profile.skills.map((cat, idx) => (
              <div
                key={cat.category}
                className="p-6 border-b border-[var(--c-b2)] md:odd:border-r last:border-b-0 lg:odd:border-r-0"
                style={{
                  borderRight: undefined,
                  borderBottom: idx === profile.skills.length - 1 ? 'none' : undefined,
                }}
              >
                <p className="label mb-5 text-[var(--c-accent)]">{cat.category}</p>
                <ul className="space-y-2.5">
                  {cat.items.map((skill) => (
                    <li key={skill} className="group flex items-center gap-3">
                      <span className="w-1 h-px bg-[var(--c-accent)] group-hover:w-4 transition-all duration-200 flex-shrink-0" />
                      <span className="text-[var(--c-dim)] group-hover:text-[var(--c-text)] text-sm transition-colors duration-200">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
            <p className="label whitespace-nowrap">5 years · full-stack to low-level</p>
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="label hover:text-[var(--c-accent)] transition-colors">SEE THE PROJECTS →</Link>
            <Link href="/uses" className="label hover:text-[var(--c-accent)] transition-colors">MY SETUP →</Link>
            <Link href="/experience" className="label hover:text-[var(--c-accent)] transition-colors">EXPERIENCE →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
