import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Uses — Developer Setup, Tools & Stack',
  description:
    'The exact tools, software, and hardware Saroj Prasad Mainali (VoidCU) uses every day: VS Code, Windows Terminal + WSL 2, Next.js, FastAPI, PostgreSQL, Docker, Kubernetes, Figma, and a custom-built PC.',
  keywords: [
    'developer setup Nepal', 'VS Code setup developer', 'WSL 2 developer Nepal',
    'Next.js FastAPI stack', 'developer tools 2025', 'Saroj Prasad Mainali uses',
    'VoidCU setup', 'developer hardware Nepal', 'Figma design setup',
    'Docker Kubernetes developer', 'JetBrains Mono font', 'Vim VS Code developer',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Uses — Saroj Prasad Mainali (VoidCU)',
    description: 'My daily driver: VS Code + WSL 2, Next.js + FastAPI, Docker, Figma, and a custom Ryzen 7 PC. Updated when things change.',
    type: 'website',
    url: 'https://voidcu.com/uses',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Developer Setup' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uses — Saroj Prasad Mainali (VoidCU)',
    description: 'VS Code + WSL 2, Next.js + FastAPI, Docker, Figma. My real daily setup as a full-stack engineer in Nepal.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/uses' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Uses', item: 'https://voidcu.com/uses' },
  ],
};

const sections = [
  {
    label: 'Editor & Terminal',
    items: [
      { name: 'VS Code', detail: 'Primary editor. Extensions: Pylance, ESLint, Prisma, GitLens, Tailwind IntelliSense' },
      { name: 'Windows Terminal + WSL 2', detail: 'Ubuntu on WSL for dev work, PowerShell for Windows-specific tasks' },
      { name: 'JetBrains Mono', detail: 'The only font I have used for three years and will not change' },
      { name: 'Vim keybindings', detail: 'VS Code Vim extension. Yes, I am one of those people.' },
    ],
  },
  {
    label: 'Stack Defaults',
    items: [
      { name: 'Next.js 15 + TypeScript', detail: 'Frontend default for anything serious. App Router only.' },
      { name: 'FastAPI + Python', detail: 'Backend default. Clean, fast, good type hints.' },
      { name: 'PostgreSQL', detail: 'Primary database. Prisma ORM for TypeScript projects.' },
      { name: 'Docker + Kubernetes', detail: 'Everything runs in containers. No exceptions for production.' },
      { name: 'Tailwind CSS', detail: 'Utility-first and I will not apologize for it.' },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma', detail: 'All UI design work. Shared with clients for feedback.' },
      { name: 'Adobe Photoshop', detail: 'Image editing and compositing for client projects.' },
      { name: 'Adobe Illustrator', detail: 'Vector work, logos, icons.' },
    ],
  },
  {
    label: 'Productivity',
    items: [
      { name: 'Notion', detail: 'Project management, sprint planning, documentation.' },
      { name: 'Obsidian', detail: 'Personal knowledge base and daily notes.' },
      { name: 'Linear', detail: 'Issue tracking on larger projects.' },
      { name: 'Postman', detail: 'API testing. Used daily.' },
    ],
  },
  {
    label: 'Hardware',
    items: [
      { name: 'Custom PC', detail: 'Ryzen 7 5700X, RTX 3060, 32GB RAM. Built it myself. Runs Ubuntu dual-boot.' },
      { name: 'Mechanical keyboard', detail: 'Budget mechanical with brown switches. Loud enough to annoy coworkers.' },
      { name: 'NAS at KS Photography', detail: 'Maintained and configured the studio NAS for photo backup workflows.' },
    ],
  },
  {
    label: 'AI Tools I Actually Use',
    items: [
      { name: 'Claude', detail: 'Code review, documentation, architecture thinking.' },
      { name: 'GitHub Copilot', detail: 'Autocomplete in VS Code. Genuinely useful for boilerplate.' },
      { name: 'Perplexity', detail: 'Research with citations. Better than Googling for technical questions.' },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              USES
            </h1>
            <span className="label">My Setup</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm leading-relaxed max-w-xl mb-14">
            A running list of what I use every day. Updated occasionally when something changes.
          </p>

          <div className="space-y-12">
            {sections.map(section => (
              <div key={section.label}>
                <p className="label mb-5">{section.label}</p>
                <div className="border border-[var(--c-b2)] divide-y divide-[var(--c-b2)]">
                  {section.items.map(item => (
                    <div key={item.name} className="group px-5 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 hover:bg-[rgba(74,222,128,0.06)] transition-colors">
                      <h3 className="text-[var(--c-text)] font-semibold text-sm sm:w-48 flex-shrink-0">{item.name}</h3>
                      <p className="text-[var(--c-dim)] text-sm flex-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
