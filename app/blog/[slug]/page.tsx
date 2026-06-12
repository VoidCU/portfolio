import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChapterNav from '@/components/fx/ChapterNav';
import Magnetic from '@/components/fx/Magnetic';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { blogPosts } from '@/data/blog';
import JournalRules from '../JournalRules';
import ReadingAltimeter from './ReadingAltimeter';

export const dynamic = 'force-static';

type Props = { params: Promise<{ slug: string }> };

// Posts ordered newest-first, the same order the blog index uses.
const orderedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'Saroj Prasad Mainali', 'VoidCU', 'Nepal developer', 'software engineering blog'],
    authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Saroj Prasad Mainali'],
      tags: [post.category, 'software engineering', 'Nepal'],
      url: `https://voidcu.com/blog/${post.slug}`,
      images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@VoidCU',
      images: ['/assets/me.jpeg'],
    },
    alternates: { canonical: `https://voidcu.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Saroj Prasad Mainali',
      url: 'https://voidcu.com',
      '@id': 'https://voidcu.com/#person',
    },
    publisher: {
      '@type': 'Person',
      name: 'Saroj Prasad Mainali',
      url: 'https://voidcu.com',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://voidcu.com/blog/${post.slug}` },
    url: `https://voidcu.com/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: 'en-US',
    image: { '@type': 'ImageObject', url: 'https://voidcu.com/assets/me.jpeg' },
  };

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  // Newer post sits earlier in the array, older sits later.
  const newer = index > 0 ? orderedPosts[index - 1] : null;
  const older = index < orderedPosts.length - 1 ? orderedPosts[index + 1] : null;

  const entryNum = String(index + 1).padStart(2, '0');
  const entryTotal = String(orderedPosts.length).padStart(2, '0');

  // Related field notes — same category first, newest recent posts as fallback.
  const sameCategory = orderedPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );
  const related = (
    sameCategory.length > 0
      ? sameCategory
      : orderedPosts.filter((p) => p.slug !== post.slug)
  ).slice(0, 3);
  const relatedLabel =
    sameCategory.length > 0
      ? `MORE IN ${post.category.toUpperCase()}`
      : 'MORE FIELD NOTES';
  const relatedCols =
    related.length >= 3 ? 'sm:grid-cols-3' : related.length === 2 ? 'sm:grid-cols-2' : '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <ReadingAltimeter />
      <main className="min-h-screen bg-bg">
        {/* ── Entry plate — VOL.08 field-note header ─────────────────── */}
        <header className="relative overflow-hidden border-b border-line-2 pb-10 pt-28 md:pb-14 md:pt-36">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <JournalRules id="motif-field-note-entry" />
          </div>
          <span
            aria-hidden
            className="ghost-outline font-display numeric pointer-events-none absolute -top-6 right-0 select-none text-[clamp(8rem,22vw,20rem)] leading-none"
          >
            {entryNum}
          </span>

          <div className="relative mx-auto w-full max-w-3xl px-6">
            <div className="mb-8">
              <Link
                href="/blog"
                className="swipe group numeric font-mono text-label uppercase tracking-[0.18em] text-ink"
              >
                <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-1.5">
                  ←
                </span>{' '}
                BACK TO BLOG
              </Link>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-y-2">
              <LineMask as="p" className="label numeric">
                {`VOL.08 — FIELD NOTES · ENTRY ${entryNum}/${entryTotal}`}
              </LineMask>
              <LineMask as="p" delay={0.08} className="label numeric">
                ▲ 8,200M
              </LineMask>
            </div>

            <LineMask delay={0.12} className="mb-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="numeric border border-line-3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {post.category}
                </span>
                <span className="label numeric">{post.date}</span>
                <span className="label numeric">{post.readTime}</span>
              </div>
            </LineMask>

            <LineMask as="h1" delay={0.18} className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {post.title}
            </LineMask>
          </div>
        </header>

        <article className="mx-auto w-full max-w-3xl px-6 py-14 md:py-16">
          {/* Content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author footer */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-2 pt-8">
            <div>
              <p className="font-display text-sm font-medium tracking-tight text-ink">
                Saroj Prasad Mainali
              </p>
              <p className="label numeric mt-1.5">Full-Stack Engineer · Kathmandu</p>
            </div>
            <Link
              href="/now"
              className="swipe group numeric font-mono text-label uppercase tracking-[0.18em] text-ink"
            >
              WHAT I AM DOING NOW{' '}
              <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {/* Related field notes — by category */}
          {related.length > 0 && (
            <section aria-label="Related posts" className="mt-16">
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  <p className="label numeric whitespace-nowrap">{relatedLabel}</p>
                  <div className="h-px flex-1 bg-line-2" />
                  <p className="label numeric">{String(related.length).padStart(2, '0')}</p>
                </div>
              </Reveal>
              {/* deterministic grid borders: cells t+l, wrapper r+b */}
              <div className={`grid grid-cols-1 border-b border-r border-line-2 ${relatedCols}`}>
                {related.map((p, i) => (
                  <Reveal
                    key={p.slug}
                    delay={i * 0.06}
                    className="border-l border-t border-line-2"
                  >
                    <Link
                      href={`/blog/${p.slug}`}
                      data-cursor="read"
                      className="group flex h-full flex-col gap-3 p-5 transition-transform duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="label numeric">{p.date}</span>
                      <span className="font-display text-base font-medium leading-snug tracking-tight text-ink">
                        <span className="swipe">{p.title}</span>
                      </span>
                      <span className="label numeric mt-auto pt-2">
                        {p.readTime}{' '}
                        <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next */}
          <nav aria-label="Post navigation" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {older ? (
              <Magnetic className="block h-full">
                <Link
                  href={`/blog/${older.slug}`}
                  data-cursor="read"
                  className="group flex h-full flex-col gap-2 border border-line-2 p-5 transition-colors duration-200 hover:border-line-4"
                >
                  <p className="label numeric">
                    <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-1.5">
                      ←
                    </span>{' '}
                    OLDER
                  </p>
                  <p className="font-display text-base font-medium leading-snug tracking-tight text-ink">
                    <span className="swipe">{older.title}</span>
                  </p>
                </Link>
              </Magnetic>
            ) : (
              <div className="hidden sm:block" />
            )}
            {newer ? (
              <Magnetic className="block h-full">
                <Link
                  href={`/blog/${newer.slug}`}
                  data-cursor="read"
                  className="group flex h-full flex-col gap-2 border border-line-2 p-5 transition-colors duration-200 hover:border-line-4 sm:items-end sm:text-right"
                >
                  <p className="label numeric">
                    NEWER{' '}
                    <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5">
                      →
                    </span>
                  </p>
                  <p className="font-display text-base font-medium leading-snug tracking-tight text-ink">
                    <span className="swipe">{newer.title}</span>
                  </p>
                </Link>
              </Magnetic>
            ) : (
              <div className="hidden sm:block" />
            )}
          </nav>
        </article>

        <ChapterNav current="/blog" />
      </main>
      <Footer />
    </>
  );
}
