import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Contact — Hire Saroj Prasad Mainali for Your Project',
  description:
    'Get in touch with Saroj Prasad Mainali (VoidCU). Open to freelance projects, full-time roles, and technical collaborations. Based in Kathmandu, Nepal. Responds within 1-2 business days.',
  keywords: [
    'hire developer Nepal', 'hire full-stack engineer Nepal', 'freelance developer Kathmandu',
    'Nepal software consultant', 'contact Saroj Prasad Mainali', 'VoidCU contact',
    'hire Next.js developer Nepal', 'hire FastAPI developer', 'software engineer for hire Nepal',
    'Kathmandu developer contact', 'Nepal IT freelancer', 'full-stack engineer available',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Contact Saroj Prasad Mainali (VoidCU)',
    description: 'Open to freelance work, full-time roles, and interesting technical collaborations. Based in Kathmandu, Nepal.',
    type: 'website',
    url: 'https://voidcu.com/contact',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Contact Saroj Prasad Mainali' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Saroj Prasad Mainali (VoidCU)',
    description: 'Open to freelance, full-time roles, and collaborations. Available now. Response within 1-2 days.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/contact' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://voidcu.com/contact' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Saroj Prasad Mainali',
    url: 'https://voidcu.com/contact',
    description: 'Contact form and details to reach Saroj Prasad Mainali for freelance, full-time, or collaboration opportunities.',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://voidcu.com/#person',
      name: 'Saroj Prasad Mainali',
      email: 'sarojprasadmainali@gmail.com',
      url: 'https://voidcu.com',
    },
  },
];

const contactInfo = [
  { label: 'Email', value: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
  { label: 'Location', value: profile.contacts.location, href: null },
  { label: 'GitHub', value: '@VoidCU', href: profile.contacts.github },
  { label: 'LinkedIn', value: 'saroj-prasad-mainali', href: profile.contacts.linkedin },
  { label: 'LeetCode', value: '@VoidCU', href: profile.contacts.leetcode },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              CONTACT
            </h1>
            <span className="label">07 / 07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border border-[var(--c-b2)]">

            <div className="p-6 md:p-8 lg:border-r border-b lg:border-b-0 border-[var(--c-b2)] space-y-8">
              <div>
                <h2 className="font-heading font-bold text-[var(--c-text)] text-xl mb-2">
                  Let us build something.
                </h2>
                <p className="text-[var(--c-dim)] text-sm leading-relaxed">
                  Open to freelance work, full-time roles, and collaborations that are actually
                  interesting. I read everything and respond within a day, usually faster.
                </p>
              </div>

              <div className="border border-[var(--c-b2)] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-[var(--c-accent)]" />
                  <span className="label text-[var(--c-accent)]">Available</span>
                </div>
                <p className="text-[var(--c-dim)] text-xs mt-1">
                  Taking new projects and exploring full-time opportunities.
                </p>
              </div>

              <div className="divide-y divide-[var(--c-b2)] border border-[var(--c-b2)]">
                {contactInfo.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="group px-4 py-3 flex items-center justify-between gap-4 hover:bg-[var(--c-accent)] transition-colors"
                  >
                    <span className="label group-hover:text-[var(--c-on-accent)]">{label}</span>
                    {href ? (
                      <Link
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-[var(--c-dim)] group-hover:text-[var(--c-on-accent)] text-xs font-mono transition-colors truncate"
                      >
                        {value}
                      </Link>
                    ) : (
                      <span className="text-[var(--c-dim)] group-hover:text-[var(--c-on-accent)] text-xs font-mono transition-colors">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Link href="/assets/pdfs/SarojResume.pdf" target="_blank" className="btn-secondary text-xs inline-block">
                Download Resume →
              </Link>
            </div>

            <ContactForm fallbackEmail={profile.contacts.email} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
