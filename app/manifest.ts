import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saroj Prasad Mainali — Full-Stack Engineer',
    short_name: 'VoidCU',
    description:
      'Full-stack engineer from Kathmandu, Nepal. 5+ years building SaaS, AI systems, and mobile apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['technology', 'portfolio', 'developer'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
