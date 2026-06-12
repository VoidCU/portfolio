import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { profile } from '@/data/profile';
import ProjectsView from './ProjectsView';

export const metadata: Metadata = {
  title: 'Projects — SaaS, AI Research & Civic Tech from Nepal',
  description:
    'Saroj Prasad Mainali\'s projects: Devanagari OCR at 99.98% accuracy, Amarnepal civic data platform, Void Social multi-tenant inbox, Project Lakhey donor system, and Perceparator audio separation. 100+ shipped products.',
  keywords: [
    'Saroj Prasad Mainali projects', 'Nepal software projects', 'Devanagari OCR Nepal',
    'Amarnepal civic tech', 'Void Social SaaS', 'Project Lakhey NGO', 'Perceparator audio separation',
    'Nepal AI projects', 'multi-tenant SaaS Nepal', 'Next.js projects Nepal',
    'open source Nepal developer', 'VoidCU projects', 'SaaS architect Nepal',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Projects — Saroj Prasad Mainali (VoidCU)',
    description: 'Civic tech, multi-tenant SaaS, AI research, and mobile apps. Things I have actually shipped and am proud of.',
    type: 'website',
    url: 'https://voidcu.com/projects',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Saroj Prasad Mainali (VoidCU)',
    description: 'Devanagari OCR, Amarnepal, Void Social, Project Lakhey, and more. Real products from a Nepal-based engineer.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/projects' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://voidcu.com/projects' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Saroj Prasad Mainali',
    description: 'Selected software projects by Saroj Prasad Mainali (VoidCU)',
    itemListElement: profile.featuredProjects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.desc,
      url: p.url ?? p.github ?? 'https://voidcu.com/projects',
    })),
  },
];

const domains = [
  { title: 'SaaS & Web Platforms', desc: 'Multi-tenant systems, RBAC, dashboards, CRMs, and Jamstack sites that ship and stay up.' },
  { title: 'AI & Machine Learning', desc: 'CNNs, transformers, NLP, and culling pipelines. Research that turns into something a person can use.' },
  { title: 'Mobile Apps', desc: 'Flutter and React Native apps for clients who want two platforms on one budget.' },
  { title: 'Automation & RPA', desc: 'Playwright bots and scripted workflows that removed roughly 1,500 hours of manual work a year.' },
  { title: 'Climate & Hydrology', desc: 'WEAP scenario modeling, SWAT calibration, and CMIP6 bias correction for NGO water studies.' },
  { title: 'DevOps & Infra', desc: 'Docker, Kubernetes, and CI/CD pipelines, run on real infrastructure in a place where the power goes out.' },
];

/** Topo-contour motif — VOL.02 plate art (BRIEF §5), rendered at 4% by VolumePlate. */
function TopoMotif() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {/* wandering contour bands */}
      <path d="M0 90 C 180 40, 360 130, 560 95 S 940 30, 1140 85 S 1360 130, 1440 100" />
      <path d="M0 170 C 200 120, 420 210, 640 170 S 1020 110, 1240 165 S 1400 200, 1440 180" />
      <path d="M0 260 C 160 220, 380 300, 600 255 S 1000 200, 1220 250 S 1390 290, 1440 265" />
      <path d="M0 350 C 220 310, 440 390, 660 345 S 1040 290, 1260 340 S 1410 380, 1440 355" />
      <path d="M0 445 C 180 405, 400 480, 620 440 S 1020 385, 1240 435 S 1400 470, 1440 450" />
      <path d="M0 540 C 240 500, 460 575, 680 535 S 1060 480, 1280 530 S 1420 560, 1440 545" />
      {/* summit ring cluster */}
      <ellipse cx="1050" cy="210" rx="170" ry="95" />
      <ellipse cx="1040" cy="205" rx="130" ry="70" />
      <ellipse cx="1030" cy="200" rx="92" ry="48" />
      <ellipse cx="1022" cy="196" rx="58" ry="30" />
      <ellipse cx="1016" cy="192" rx="28" ry="14" />
      {/* secondary knoll */}
      <ellipse cx="300" cy="120" rx="110" ry="55" />
      <ellipse cx="294" cy="116" rx="72" ry="34" />
      <ellipse cx="288" cy="112" rx="38" ry="17" />
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate volume="VOL.02" title="EXPEDITIONS" altitude="3,500M" motif={<TopoMotif />}>
          <LineMask as="p" delay={0.2} className="font-voice text-epigraph text-dim">
            The public slice, documented.
          </LineMask>
          <LineMask as="p" delay={0.28} className="mt-5">
            <span className="block max-w-2xl text-sm leading-relaxed text-dim">
              A few things I have built that I am happy to talk about. Most client work is under NDA,
              so this is the public slice: civic tech, multi-tenant SaaS, and a couple of AI research
              projects that I did mostly because I could not stop thinking about them.
            </span>
          </LineMask>
        </VolumePlate>

        <ProjectsView domains={domains} />

        <ChapterNav current="/projects" />
      </main>
      <Footer />
    </>
  );
}
