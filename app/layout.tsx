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
  themeColor: '#080d08',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://voidcu.com'),
  title: {
    default: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    template: '%s · Saroj Prasad Mainali',
  },
  description:
    'Full-stack engineer and technical lead from Kathmandu, Nepal. Architecting scalable SaaS, AI systems, and mobile apps with 5+ years of production experience.',
  keywords: [
    'full-stack developer',
    'Nepal developer',
    'AI engineer',
    'machine learning',
    'Next.js developer',
    'FastAPI developer',
    'TypeScript engineer',
    'VoidCU',
    'Saroj Mainali',
    'Saroj Prasad Mainali',
    'Kathmandu developer',
    'SaaS architect',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  creator: 'Saroj Prasad Mainali',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voidcu.com',
    siteName: 'Saroj Prasad Mainali',
    title: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    description:
      'Full-stack engineer from Kathmandu building scalable SaaS, AI systems, and production software. 5+ years · 100+ shipped products.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/VoidCU/VoidCU/main/assets/saroj.png',
        width: 1200,
        height: 630,
        alt: 'Saroj Prasad Mainali — Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    description:
      'Full-stack engineer from Kathmandu. Building SaaS, AI systems, and mobile apps that ship.',
    images: ['https://raw.githubusercontent.com/VoidCU/VoidCU/main/assets/saroj.png'],
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://voidcu.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saroj Prasad Mainali',
  alternateName: 'VoidCU',
  url: 'https://voidcu.com',
  jobTitle: 'Full-Stack Engineer & Technical Lead',
  worksFor: [
    { '@type': 'Organization', name: 'Neuron Nest' },
    { '@type': 'Organization', name: 'Elytra Solutions' },
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Thapathali Campus, Tribhuvan University',
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
    'Full-Stack Development',
    'Machine Learning',
    'SaaS Architecture',
    'Next.js',
    'FastAPI',
    'TypeScript',
    'Python',
    'Docker',
    'Kubernetes',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#080d08] text-[#e8fdf0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
