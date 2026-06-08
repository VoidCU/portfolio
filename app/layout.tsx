import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#020403' },
    { media: '(prefers-color-scheme: light)', color: '#f0fdf4' },
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Anti-flash: apply stored theme before first paint */}
        <script
          dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--c-bg)] text-[var(--c-text)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
