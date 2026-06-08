import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-20">

          {/* Back */}
          <div className="mb-12">
            <Link
              href="/blog"
              className="label text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors"
            >
              ← BACK TO BLOG
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-[var(--c-b2)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
              <span className="label text-[var(--c-accent)]">{post.category}</span>
              <span className="label">{post.date}</span>
              <span className="label text-[var(--c-muted)]">{post.readTime}</span>
            </div>
            <h1 className="font-heading font-black text-[var(--c-text)] text-3xl md:text-5xl leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </header>

          {/* Content */}
          <div
            className="prose-blog text-[var(--c-dim)] text-[1.0625rem] leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author footer */}
          <div className="mt-16 pt-8 border-t border-[var(--c-b2)] flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[var(--c-text)] font-heading font-bold text-sm">
                Saroj Prasad Mainali
              </p>
              <p className="label mt-1">Full-Stack Engineer · Kathmandu</p>
            </div>
            <Link href="/now" className="label hover:text-[var(--c-accent)] transition-colors">
              WHAT I AM DOING NOW →
            </Link>
          </div>

          {/* Prev / Next */}
          <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group p-5 border border-[var(--c-b2)] hover:border-[var(--c-accent)] hover:bg-[var(--c-accent)] transition-colors"
              >
                <p className="label group-hover:text-[var(--c-on-accent)] mb-2">← Older</p>
                <p className="text-[var(--c-text)] group-hover:text-[var(--c-on-accent)] text-sm font-semibold leading-snug transition-colors">
                  {older.title}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group p-5 border border-[var(--c-b2)] hover:border-[var(--c-accent)] hover:bg-[var(--c-accent)] transition-colors sm:text-right"
              >
                <p className="label group-hover:text-[var(--c-on-accent)] mb-2">Newer →</p>
                <p className="text-[var(--c-text)] group-hover:text-[var(--c-on-accent)] text-sm font-semibold leading-snug transition-colors">
                  {newer.title}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
