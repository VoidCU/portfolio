import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

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
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              BLOG
            </h1>
            <span className="label">{String(blogPosts.length).padStart(2, '0')} POSTS</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm max-w-2xl leading-relaxed mb-16">
            Notes on engineering, AI, leadership, and building software from Kathmandu.
            No tutorials, mostly. Just the honest parts: the bugs, the 2am fixes, the
            opinions I have earned the hard way.
          </p>

          <div className="space-y-16">
            {years.map((year) => (
              <section key={year} aria-label={`Posts from ${year}`}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-heading font-black text-[var(--c-muted)] text-2xl tracking-tight">
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-[var(--c-b2)]" />
                  <span className="label">{byYear[year].length} entries</span>
                </div>

                <div className="border-t border-[var(--c-b2)]">
                  {byYear[year].map((post) => {
                    counter += 1;
                    const num = String(counter).padStart(2, '0');
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block border-b border-[var(--c-b2)] py-7 md:py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-4 hover:bg-[rgba(74,222,128,0.06)] transition-colors"
                      >
                        <span className="font-mono text-[var(--c-muted)] text-sm pt-1 w-8 flex-shrink-0 hidden lg:block">
                          {num}
                        </span>

                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="label text-[var(--c-accent)]">{post.category}</span>
                            {post.featured && (
                              <span className="label text-[var(--c-muted)]">● Featured</span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-[var(--c-text)] text-xl md:text-2xl tracking-tight group-hover:text-[var(--c-accent)] transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-[var(--c-dim)] text-sm leading-relaxed max-w-2xl">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-x-4 gap-y-1 items-center lg:items-end pt-1">
                          <span className="label whitespace-nowrap">{post.date}</span>
                          <span className="label whitespace-nowrap text-[var(--c-muted)]">{post.readTime}</span>
                          <span className="label text-[var(--c-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                            READ →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
            <Link href="/" className="label hover:text-[var(--c-accent)] transition-colors whitespace-nowrap">
              ← BACK TO HOME
            </Link>
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
