import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing on software engineering, AI, building in Nepal, and the chaos in between. Honest notes from Saroj Prasad Mainali (VoidCU).',
  openGraph: {
    title: 'Blog · Saroj Prasad Mainali',
    description:
      'Writing on software engineering, AI, building in Nepal, and the chaos in between.',
    type: 'website',
    url: 'https://voidcu.com/blog',
  },
  alternates: { canonical: 'https://voidcu.com/blog' },
};

function yearOf(date: string): string {
  // date is "Month DD, YYYY"
  return date.trim().slice(-4);
}

export default function BlogPage() {
  // Sort newest first by parsed date.
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by year, keeping sorted order.
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

  // Continuous post numbering across the whole list (01, 02, ...).
  let counter = 0;

  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              BLOG
            </h1>
            <span className="label">{String(blogPosts.length).padStart(2, '0')} POSTS</span>
          </div>

          {/* Intro */}
          <p className="text-[#86efac] text-sm max-w-2xl leading-relaxed mb-16">
            Notes on engineering, AI, leadership, and building software from Kathmandu.
            No tutorials, mostly. Just the honest parts: the bugs, the 2am fixes, the
            opinions I have earned the hard way.
          </p>

          {/* Posts grouped by year */}
          <div className="space-y-16">
            {years.map((year) => (
              <section key={year}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-heading font-black text-[#4d7c5a] text-2xl tracking-tight">
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-[rgba(74,222,128,0.08)]" />
                  <span className="label">{byYear[year].length} entries</span>
                </div>

                <div className="border-t border-[rgba(74,222,128,0.08)]">
                  {byYear[year].map((post) => {
                    counter += 1;
                    const num = String(counter).padStart(2, '0');
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block border-b border-[rgba(74,222,128,0.08)] py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-4 hover:bg-[rgba(74,222,128,0.03)] transition-colors"
                      >
                        {/* Number */}
                        <span className="font-mono-custom text-[#4d7c5a] text-sm pt-1 w-8 flex-shrink-0">
                          {num}
                        </span>

                        {/* Content */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="label text-[#4ade80]">{post.category}</span>
                            {post.featured && (
                              <span className="label text-[#4d7c5a]">● Featured</span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-[#e8fdf0] text-2xl tracking-tight group-hover:text-[#4ade80] transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-[#86efac] text-sm leading-relaxed max-w-2xl">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-row lg:flex-col gap-x-4 gap-y-1 items-start lg:items-end pt-1">
                          <span className="label whitespace-nowrap">{post.date}</span>
                          <span className="label whitespace-nowrap text-[#4d7c5a]">
                            {post.readTime}
                          </span>
                          <span className="label text-[#4ade80] opacity-0 group-hover:opacity-100 transition-opacity">
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

          {/* Bottom navigation */}
          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(74,222,128,0.08)]" />
            <Link href="/" className="label hover:text-[#4ade80] transition-colors whitespace-nowrap">
              ← BACK TO HOME
            </Link>
            <div className="flex-1 h-px bg-[rgba(74,222,128,0.08)]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
