// src/components/MajorProjects.tsx
'use client';
import { useState } from 'react';

interface Project {
  title: string;
  desc: string;
  url?: string;
}

interface Category {
  id: string;
  title: string;
  items: Project[];
}

const categories: Category[] = [
  {
    id: 'saas',
    title: 'SaaS & Web Apps',
    items: [
      {
        title: 'Modular Student Management Platform',
        desc: 'Core FastAPI + Next.js micro-services (LMS, CRM, Finance, Library, SMS, Chatbot) with multi-tenant RBAC & JWT auth.',
      },
      {
        title: 'Authentication & RBAC Modules',
        desc: 'Access/refresh-token flow, user/role CRUD, dynamic module-level permissions.',
      },
      {
        title: 'Higher-Ed Time-Scheduling App',
        desc: 'Optimises room, teacher, batch & elective allocations from Excel inputs.',
      },
      {
        title: 'Bulk SMS Service',
        desc: 'Stand-alone gateway planned for telco connectivity & OTP APIs.',
      },
      {
        title: 'Workout-Tracking Mobile App',
        desc: 'Flutter MVP + local storage; later Postgres back-end.',
      },
      {
        title: 'Share-Purchase Modal',
        desc: 'Country-aware React/Next.js modal for investment workflows.',
      },
      {
        title: 'KS Photography Station',
        desc: 'Next.js + headless CMS + AI photo-culling tool.',
      },
      {
        title: '100+ SME Sites',
        desc: 'Static/WordPress/Shopify builds for branding, SEO & hosting.',
      },
      {
        title: '25+ Apps & Bots',
        desc: 'Delivered via Elytra Solutions (ERP modules, inventory, RPA).',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    items: [
      {
        title: 'Devanagari OCR',
        desc: 'CNN @ 99.98% accuracy + Android draw-and-predict app.',
      },
      {
        title: 'Perceparator',
        desc: 'Transformer-based dual-speaker separation (LibriMix).',
      },
      {
        title: 'Sentiment Pipeline',
        desc: 'PySpark Random-Forest / Naïve-Bayes on reviews (84% accuracy).',
      },
      {
        title: 'Nepali NLP Corpus',
        desc: 'Scrapy pipeline collecting 300k articles; transformer pre-training.',
      },
      {
        title: 'Godawari WEAP Model',
        desc: 'Hydrological scenario to 2050 with CMIP6 bias-correction.',
      },
      {
        title: 'SWAT Calibration',
        desc: 'Groundwater inversion with NSE/KGE evaluation.',
      },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & DevOps',
    items: [
      {
        title: 'Hospital RPA',
        desc: 'Selenium script auto-inputs patient data with probabilistic logic.',
      },
      {
        title: 'Playwright Bots',
        desc: 'Client automations saving ≈1 500 hrs/yr.',
      },
      {
        title: 'CI/CD Migration',
        desc: 'Dockerized micro-services + GitHub Actions pipelines.',
      },
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Low-Level',
    items: [
      {
        title: 'Custom OS Coursework',
        desc: 'FAT16 layout, cooperative multitasking, context switching (C/ASM).',
      },
    ],
  },
  {
    id: 'games',
    title: 'Games & Misc Apps',
    items: [
      {
        title: 'Ranabhumi Fireman Game',
        desc: 'OpenGL OOP firefighting game.',
      },
      {
        title: 'Snake & Ladder 3D',
        desc: 'C++/OpenGL board game.',
      },
      {
        title: 'Fitness Flow',
        desc: 'Habit & sleep tracker web app.',
      },
      {
        title: 'Slaabur Year-Event Site',
        desc: 'Random historical-event generator.',
      },
      {
        title: 'BCT 2075 Batch App',
        desc: 'Flutter app for student records & notices.',
      },
    ],
  },
];

export default function MajorProjects() {
  const [active, setActive] = useState<string>(categories[0].id);

  const activeCategory = categories.find(c => c.id === active)!;

  return (
    <section id="major-projects" className="py-16 bg-[#111827]">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-8">
          Major Projects
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition
                ${active === cat.id
                  ? 'bg-teal-400 text-black'
                  : 'bg-gray-800 text-slate-300 hover:bg-gray-700'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {activeCategory.items.map(proj => (
            <LinkCard key={proj.title} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url ?? '#'}
      target="_blank"
      className="block rounded-xl p-6 bg-gradient-to-br from-gray-800 to-gray-900
                 shadow-lg hover:shadow-2xl transition-shadow group"
    >
      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-teal-300">
        {project.title}
      </h3>
      <p className="text-slate-300 leading-relaxed">{project.desc}</p>
    </a>
  );
}
