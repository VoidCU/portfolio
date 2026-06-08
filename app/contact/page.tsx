import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Saroj Prasad Mainali. Open to freelance work, full-time roles, and interesting collaborations. Based in Kathmandu, Nepal.',
  openGraph: {
    title: 'Contact · Saroj Prasad Mainali',
    description: 'Open to freelance work, full-time roles, and collaborations.',
    type: 'website',
    url: 'https://voidcu.com/contact',
  },
  alternates: { canonical: 'https://voidcu.com/contact' },
};

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
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              CONTACT
            </h1>
            <span className="label">07 / 07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 border border-[rgba(74,222,128,0.08)]">

            {/* Left: info */}
            <div className="p-8 lg:border-r border-b lg:border-b-0 border-[rgba(74,222,128,0.08)] space-y-8">
              <div>
                <h2 className="font-heading font-bold text-[#e8fdf0] text-xl mb-2">
                  Let us build something.
                </h2>
                <p className="text-[#86efac] text-sm leading-relaxed">
                  Open to freelance work, full-time roles, and collaborations that are actually
                  interesting. I read everything and I respond within a day, usually faster.
                </p>
              </div>

              {/* Availability */}
              <div className="border border-[rgba(74,222,128,0.08)] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-[#4ade80]" />
                  <span className="label text-[#4ade80]">Available</span>
                </div>
                <p className="text-[#86efac] text-xs mt-1">
                  Taking new projects and exploring full-time opportunities.
                </p>
              </div>

              {/* Contact details */}
              <div className="divide-y divide-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.08)]">
                {contactInfo.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="group px-4 py-3 flex items-center justify-between gap-4 hover:bg-[#4ade80] transition-colors"
                  >
                    <span className="label group-hover:text-[#080d08]">{label}</span>
                    {href ? (
                      <Link
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-[#86efac] group-hover:text-[#080d08] text-xs font-mono-custom transition-colors truncate"
                      >
                        {value}
                      </Link>
                    ) : (
                      <span className="text-[#86efac] group-hover:text-[#080d08] text-xs font-mono-custom transition-colors">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Resume */}
              <Link
                href="/assets/pdfs/SarojResume.pdf"
                target="_blank"
                className="btn-secondary text-xs inline-block"
              >
                Download Resume →
              </Link>
            </div>

            {/* Right: form */}
            <ContactForm fallbackEmail={profile.contacts.email} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
