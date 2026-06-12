import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { blogPosts } from '@/data/blog';
import JournalRules from './JournalRules';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Software Engineering, AI & Building in Nepal',
  description:
    'Saroj Prasad Mainali writes about software engineering, AI/ML, building products in Nepal, leadership, and the honest side of technical work. 23 posts on real-world experience.',
  keywords: [
    'software engineering blog Nepal', 'AI ML blog Nepal', 'tech blog Kathmandu',
    'full-stack developer blog', 'Nepal developer writing', 'VoidCU blog',
    'Saroj Prasad Mainali blog', 'FastAPI blog', 'Next.js blog Nepal',
    'SaaS building Nepal', 'software leadership Nepal', 'Nepal tech writing',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Blog — Saroj Prasad Mainali (VoidCU)',
    description: 'Writing on engineering, AI, leadership, and building software from Kathmandu. Honest notes from 5+ years of shipping real products.',
    type: 'website',
    url: 'https://voidcu.com/blog',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Saroj Prasad Mainali (VoidCU)',
    description: 'Writing on engineering, AI, and building in Nepal. 23 posts on real-world experience.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/blog' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://voidcu.com/blog' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Saroj Prasad Mainali — Blog',
    description: 'Writing on software engineering, AI, building in Nepal, and the honest side of technical work.',
    url: 'https://voidcu.com/blog',
    author: { '@type': 'Person', '@id': 'https://voidcu.com/#person', name: 'Saroj Prasad Mainali' },
    inLanguage: 'en-US',
  },
];

function yearOf(date: string): string {
  return date.trim().slice(-4);
}

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const years: string[] = [];
  const byYear: Record<string, typeof blogPosts> = {};
  for (const post of sorted) {
    const y = yearOf(post.date);
    if (!byYear[y]) {
      byYear[y] = [];
      years.push(y);
    }
    byYear[y].push(post);
  }

  let counter = 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.08"
          title="FIELD NOTES"
          altitude="8,200M"
          motif={<JournalRules id="motif-field-notes" />}
        >
          <LineMask delay={0.15}>
            <p className="max-w-2xl text-sm leading-relaxed text-dim">
              Notes on engineering, AI, leadership, and building software from Kathmandu.
              No tutorials, mostly. Just the honest parts: the bugs, the 2am fixes, the
              opinions I have earned the hard way.
            </p>
          </LineMask>
          <LineMask delay={0.22} className="mt-5">
            <p className="label numeric">{String(blogPosts.length).padStart(2, '0')} POSTS</p>
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          <div className="space-y-16 md:space-y-20">
            {years.map((year) => (
              <section key={year} aria-label={`Posts from ${year}`}>
                <Reveal>
                  <div className="mb-8 flex items-center gap-4">
                    <h2 className="font-display numeric text-2xl font-semibold tracking-tight text-muted md:text-3xl">
                      {year}
                    </h2>
                    <div className="h-px flex-1 bg-line-2" />
                    <span className="label numeric">{byYear[year].length} ENTRIES</span>
                  </div>
                </Reveal>

                {/* field-note entries — group/log enables sibling dim */}
                <div className="group/log border-t border-line-2">
                  {byYear[year].map((post, i) => {
                    counter += 1;
                    const num = String(counter).padStart(2, '0');
                    return (
                      <LineMask
                        key={post.slug}
                        as="div"
                        delay={Math.min(i * 0.06, 0.36)}
                        className="border-b border-line-2"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          data-cursor="read"
                          className="group block py-7 transition-opacity duration-300 group-hover/log:[&:not(:hover)]:opacity-40 md:py-8"
                        >
                          <div className="grid grid-cols-1 gap-x-10 gap-y-3 transition-transform duration-300 ease-[var(--ease-micro)] group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 lg:grid-cols-[3rem_minmax(0,1fr)_auto]">
                            {/* entry number */}
                            <span className="label numeric hidden pt-1.5 lg:block">
                              {num}
                            </span>

                            <div className="min-w-0 space-y-3">
                              {/* category chip + featured marker */}
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                <span className="numeric border border-line-3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                  {post.category}
                                </span>
                                {post.featured && (
                                  <span className="label numeric">● FEATURED</span>
                                )}
                              </div>

                              <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                                <span className="swipe">{post.title}</span>
                              </h3>

                              <p className="max-w-2xl text-sm leading-relaxed text-dim">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* mono timestamps */}
                            <div className="flex flex-row items-center gap-x-4 gap-y-1 pt-1 lg:flex-col lg:items-end">
                              <span className="label numeric whitespace-nowrap">{post.date}</span>
                              <span className="label numeric whitespace-nowrap">{post.readTime}</span>
                              <span className="numeric whitespace-nowrap font-mono text-label uppercase tracking-[0.18em] text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                                READ{' '}
                                <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5">
                                  →
                                </span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </LineMask>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <Reveal className="mt-16 md:mt-20">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-line-2" />
              <Link
                href="/"
                className="swipe group numeric whitespace-nowrap font-mono text-label uppercase tracking-[0.18em] text-ink"
              >
                <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-1.5">
                  ←
                </span>{' '}
                BACK TO HOME
              </Link>
              <div className="h-px flex-1 bg-line-2" />
            </div>
          </Reveal>
        </div>

        <ChapterNav current="/blog" />
      </main>
      <Footer />
    </>
  );
}
