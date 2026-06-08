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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://voidcu.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: `https://voidcu.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  // Newer post sits earlier in the array, older sits later.
  const newer = index > 0 ? orderedPosts[index - 1] : null;
  const older = index < orderedPosts.length - 1 ? orderedPosts[index + 1] : null;

  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-20">

          {/* Back */}
          <div className="mb-12">
            <Link
              href="/blog"
              className="label text-[#4d7c5a] hover:text-[#4ade80] transition-colors"
            >
              ← BACK TO BLOG
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-[rgba(74,222,128,0.08)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
              <span className="label text-[#4ade80]">{post.category}</span>
              <span className="label">{post.date}</span>
              <span className="label text-[#4d7c5a]">{post.readTime}</span>
            </div>
            <h1 className="font-heading font-black text-[#e8fdf0] text-3xl md:text-5xl leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </header>

          {/* Content */}
          <div
            className="prose-blog text-[#86efac] text-[1.0625rem] leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author footer */}
          <div className="mt-16 pt-8 border-t border-[rgba(74,222,128,0.08)] flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[#e8fdf0] font-heading font-bold text-sm">
                Saroj Prasad Mainali
              </p>
              <p className="label mt-1">Full-Stack Engineer · Kathmandu</p>
            </div>
            <Link href="/now" className="label hover:text-[#4ade80] transition-colors">
              WHAT I AM DOING NOW →
            </Link>
          </div>

          {/* Prev / Next */}
          <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group p-5 border border-[rgba(74,222,128,0.08)] hover:border-[#4ade80] hover:bg-[#4ade80] transition-colors"
              >
                <p className="label group-hover:text-[#080d08] mb-2">← Older</p>
                <p className="text-[#e8fdf0] group-hover:text-[#080d08] text-sm font-semibold leading-snug transition-colors">
                  {older.title}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group p-5 border border-[rgba(74,222,128,0.08)] hover:border-[#4ade80] hover:bg-[#4ade80] transition-colors sm:text-right"
              >
                <p className="label group-hover:text-[#080d08] mb-2">Newer →</p>
                <p className="text-[#e8fdf0] group-hover:text-[#080d08] text-sm font-semibold leading-snug transition-colors">
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
