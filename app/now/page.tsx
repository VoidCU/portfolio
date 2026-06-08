import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Now — What Saroj Prasad Mainali Is Working On',
  description:
    'Saroj Prasad Mainali\'s /now page: Leading engineering at Neuron Nest, building AI photo-culling at KS Photography, learning LLM fine-tuning and Kubernetes Istio. Updated June 2025 from Kathmandu.',
  keywords: [
    'Saroj Prasad Mainali now', 'VoidCU current work 2025', 'Neuron Nest lead developer',
    'KS Photography AI pipeline', 'LLM fine-tuning Nepal', 'Kubernetes Istio learning',
    'Void Social development', 'Nepal developer now page', 'what saroj is doing',
    'developer now page Kathmandu', 'now page Nepal',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Now — Saroj Prasad Mainali (VoidCU)',
    description: 'What I am working on right now: Neuron Nest LMS, AI photo pipeline, LLM fine-tuning, Void Social. June 2025 from Kathmandu.',
    type: 'website',
    url: 'https://voidcu.com/now',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali — Now Page' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Now — Saroj Prasad Mainali (VoidCU)',
    description: 'Leading engineering at Neuron Nest, building AI photo pipelines, learning LLM fine-tuning. Kathmandu, June 2025.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/now' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Now', item: 'https://voidcu.com/now' },
  ],
};

export default function NowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              NOW
            </h1>
            <span className="label">June 2025 · Kathmandu</span>
          </div>

          <p className="text-[var(--c-muted)] text-xs font-mono mb-12">
            A /now page is a snapshot. What is true today may not be true in three months.
          </p>

          <div className="space-y-8 md:space-y-10">

            <div className="border border-[var(--c-b2)] p-6">
              <p className="label mb-4">Work</p>
              <ul className="space-y-4 text-[var(--c-dim)] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>Leading engineering at Neuron Nest. Building out the LMS module. We have schools onboarding now, which means real users hitting real bugs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>Technical Head at KS Photography Station. Finishing an AI photo-culling pipeline that reduces post-production time significantly for wedding photography workflows.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>One active freelance client. EdTech migrations. Data cleanup is 60% of the work, which nobody mentions in the proposal.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[var(--c-b2)] p-6">
              <p className="label mb-4">Learning</p>
              <ul className="space-y-4 text-[var(--c-dim)] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>Going deeper into LLM fine-tuning. Specifically LoRA and QLoRA approaches that are viable without massive compute budgets.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>Kubernetes advanced patterns. Service meshes, specifically Istio. More complex than I expected.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[var(--c-b2)] p-6">
              <p className="label mb-4">Personal Projects</p>
              <ul className="space-y-4 text-[var(--c-dim)] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>Void Social is in active development. Multi-tenant social media management platform. Hoping to soft-launch by August.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--c-accent)] mt-1 flex-shrink-0">→</span>
                  <span>This portfolio. It has been rebuilt more times than I want to admit.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[var(--c-b2)] p-6">
              <p className="label mb-4">Where I Am</p>
              <p className="text-[var(--c-dim)] text-sm leading-relaxed">
                Kathmandu, Nepal. Working from home most days. Occasional coffee shop when I need a change of context. Power cuts are less frequent than they used to be. The internet is still unreliable at the worst moments.
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
