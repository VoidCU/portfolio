import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Saroj Prasad Mainali is currently working on, learning, and thinking about. Lead Developer at Neuron Nest, Technical Head at KS Photography, based in Kathmandu.',
  openGraph: {
    title: 'Now · Saroj Prasad Mainali',
    description: 'A snapshot of what I am working on, learning, and building right now.',
    type: 'website',
    url: 'https://voidcu.com/now',
  },
  alternates: { canonical: 'https://voidcu.com/now' },
};

export default function NowPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-20">

          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              NOW
            </h1>
            <span className="label">June 2025 · Kathmandu</span>
          </div>

          <p className="text-[#4d7c5a] text-xs font-mono-custom mb-12">
            A /now page is a snapshot. What is true today may not be true in three months.
          </p>

          <div className="space-y-10">

            <div className="border border-[rgba(74,222,128,0.08)] p-6">
              <p className="label mb-4">Work</p>
              <ul className="space-y-4 text-[#86efac] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>Leading engineering at Neuron Nest. Building out the LMS module. We have schools onboarding now, which means real users hitting real bugs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>Technical Head at KS Photography Station. Finishing an AI photo-culling pipeline that reduces post-production time significantly for wedding photography workflows.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>One active freelance client. EdTech migrations. Data cleanup is 60% of the work, which nobody mentions in the proposal.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[rgba(74,222,128,0.08)] p-6">
              <p className="label mb-4">Learning</p>
              <ul className="space-y-4 text-[#86efac] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>Going deeper into LLM fine-tuning. Specifically LoRA and QLoRA approaches that are viable without massive compute budgets.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>Kubernetes advanced patterns. Service meshes, specifically Istio. More complex than I expected.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[rgba(74,222,128,0.08)] p-6">
              <p className="label mb-4">Personal Projects</p>
              <ul className="space-y-4 text-[#86efac] text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>Void Social is in active development. Multi-tenant social media management platform. Hoping to soft-launch by August.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4ade80] mt-1 flex-shrink-0">→</span>
                  <span>This portfolio. It has been rebuilt more times than I want to admit.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[rgba(74,222,128,0.08)] p-6">
              <p className="label mb-4">Where I Am</p>
              <p className="text-[#86efac] text-sm leading-relaxed">
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
