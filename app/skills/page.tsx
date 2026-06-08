import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Full-stack skills across React, Next.js, FastAPI, Django, Python, Flutter, TensorFlow, PyTorch, Docker, Kubernetes, and more. 5 years, full-stack to low-level.',
  openGraph: {
    title: 'Skills · Saroj Prasad Mainali',
    description: 'Full-stack to low-level. Frontend, backend, AI, DevOps, and design.',
    type: 'website',
    url: 'https://voidcu.com/skills',
  },
  alternates: { canonical: 'https://voidcu.com/skills' },
};

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              SKILLS
            </h1>
            <span className="label">02 / 07</span>
          </div>

          {/* Intro */}
          <p className="text-[#86efac] text-sm max-w-2xl leading-relaxed mb-12">
            I work across the whole stack and a few domains most engineers never touch. None of this
            is from a tutorial. It is from shipping things, breaking them, and fixing them under
            pressure, usually with the power about to go out.
          </p>

          {/* Skills table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(74,222,128,0.08)]">
            {profile.skills.map((cat, idx) => (
              <div
                key={cat.category}
                className={`p-6 border-[rgba(74,222,128,0.08)] ${
                  idx % 3 !== 2 ? 'lg:border-r' : ''
                } ${
                  idx % 2 !== 1 ? 'md:border-r lg:border-r-0' : 'md:border-r-0'
                } ${
                  idx < profile.skills.length - 3 ? 'lg:border-b' : ''
                } ${
                  idx < profile.skills.length - 2 ? 'md:border-b' : ''
                } ${
                  idx < profile.skills.length - 1 ? 'border-b md:border-b-0' : ''
                }`}
              >
                <p className="label mb-5 text-[#4ade80]">{cat.category}</p>
                <ul className="space-y-2.5">
                  {cat.items.map((skill) => (
                    <li key={skill} className="group flex items-center gap-3">
                      <span className="w-1 h-px bg-[#4ade80] group-hover:w-4 transition-all duration-200" />
                      <span className="text-[#86efac] group-hover:text-[#e8fdf0] text-sm transition-colors duration-200">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(74,222,128,0.08)]" />
            <p className="label whitespace-nowrap">5 years · full-stack to low-level</p>
            <div className="flex-1 h-px bg-[rgba(74,222,128,0.08)]" />
          </div>

          {/* Cross links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="label hover:text-[#4ade80] transition-colors">SEE THE PROJECTS →</Link>
            <Link href="/uses" className="label hover:text-[#4ade80] transition-colors">MY SETUP →</Link>
            <Link href="/experience" className="label hover:text-[#4ade80] transition-colors">EXPERIENCE →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
