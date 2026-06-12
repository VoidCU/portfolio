import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { clash, general, fraunces, jetbrains } from './fonts';
import MotionRoot from '@/components/fx/MotionRoot';
import SmoothScroll from '@/components/fx/SmoothScroll';
import Grain from '@/components/fx/Grain';
import Loupe from '@/components/fx/Loupe';
import ExpeditionRadio from '@/components/fx/ExpeditionRadio';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#050807' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAF6' },
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://voidcu.com'),
  title: {
    default: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    template: '%s · Saroj Prasad Mainali',
  },
  description:
    'Full-stack engineer and technical lead from Kathmandu, Nepal. 5+ years architecting SaaS platforms, AI systems, mobile apps, and production software. 100+ shipped products, 19+ client companies.',
  keywords: [
    'full-stack developer Nepal',
    'software engineer Kathmandu',
    'Next.js developer Nepal',
    'FastAPI developer',
    'TypeScript engineer',
    'AI ML engineer Nepal',
    'SaaS architect',
    'VoidCU',
    'Saroj Prasad Mainali',
    'Saroj Mainali developer',
    'Flutter developer Nepal',
    'Python developer Nepal',
    'freelance developer Nepal',
    'Neuron Nest',
    'Elytra Solutions',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  creator: 'Saroj Prasad Mainali',
  publisher: 'Saroj Prasad Mainali',
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voidcu.com',
    siteName: 'Saroj Prasad Mainali',
    title: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    description:
      'Full-stack engineer from Kathmandu. 5+ years · 100+ shipped products · 19+ companies. Building SaaS, AI systems, and mobile apps that actually ship.',
    images: [
      {
        url: '/assets/me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Saroj Prasad Mainali — Full-Stack Engineer from Kathmandu, Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    description:
      'Full-stack engineer from Kathmandu. Building SaaS, AI systems, and mobile apps that ship. 5+ years · 100+ products.',
    images: ['/assets/me.jpeg'],
    creator: '@VoidCU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://voidcu.com',
  },
  verification: {
    google: '',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://voidcu.com/#person',
    name: 'Saroj Prasad Mainali',
    alternateName: ['VoidCU', 'Saroj Mainali'],
    url: 'https://voidcu.com',
    image: 'https://voidcu.com/assets/me.jpeg',
    jobTitle: 'Full-Stack Engineer & Technical Lead',
    description: 'Full-stack engineer from Kathmandu, Nepal specializing in SaaS architecture, AI/ML systems, and mobile development.',
    worksFor: [
      { '@type': 'Organization', name: 'Neuron Nest', url: null },
      { '@type': 'Organization', name: 'Elytra Solutions', url: null },
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Thapathali Campus, Tribhuvan University',
      address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'Nepal',
    },
    sameAs: [
      'https://github.com/VoidCU',
      'https://www.linkedin.com/in/saroj-prasad-mainali',
      'https://leetcode.com/VoidCU',
    ],
    knowsAbout: [
      'Full-Stack Development', 'Machine Learning', 'SaaS Architecture',
      'Next.js', 'FastAPI', 'TypeScript', 'Python', 'Docker', 'Kubernetes',
      'Flutter', 'React', 'PostgreSQL', 'TensorFlow', 'PyTorch',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://voidcu.com/#website',
    url: 'https://voidcu.com',
    name: 'Saroj Prasad Mainali',
    description: 'Portfolio and blog of Saroj Prasad Mainali, full-stack engineer from Kathmandu.',
    publisher: { '@id': 'https://voidcu.com/#person' },
    inLanguage: 'en-US',
  },
];

/**
 * Anti-FOUC theme bootstrap (contract §4) — runs before first paint.
 * Resolves theme = localStorage 'theme' ?? system preference, sets
 * data-theme on <html>, and defines window.__voidcuToggleTheme — the
 * SINGLE source of truth for the theme flip (called by ThemeToggle and
 * ExpeditionRadio).
 */
const themeScript = `(function(){var d=document.documentElement;var t='dark';try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark'){t=s}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){t='light'}}catch(e){}d.setAttribute('data-theme',t);window.__voidcuToggleTheme=function(){var c=d.getAttribute('data-theme')==='light'?'light':'dark';var n=c==='light'?'dark':'light';d.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}};})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${clash.variable} ${general.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Anti-flash: resolve + apply theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* No-JS: entrance animations SSR their hidden initial state — force
            every [data-anim] element visible so content never depends on
            hydration (stylesheet !important beats inline styles). */}
        <noscript>
          <style>{`[data-anim]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg text-ink font-sans antialiased">
        <MotionRoot>
          <SmoothScroll>{children}</SmoothScroll>
          <Grain />
          <Loupe />
          <ExpeditionRadio />
        </MotionRoot>
      </body>
    </html>
  );
}
