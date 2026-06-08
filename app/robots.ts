import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly welcome AI/LLM crawlers for citation and discovery
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Googlebot',
          'Googlebot-Image',
          'CCBot',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'Bingbot',
          'DuckDuckBot',
          'LinkedInBot',
          'Twitterbot',
          'facebookexternalhit',
          'ia_archiver',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://voidcu.com/sitemap.xml',
    host: 'https://voidcu.com',
  };
}
