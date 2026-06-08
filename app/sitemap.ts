import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';

const BASE = 'https://voidcu.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,                     priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${BASE}/about`,          priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/projects`,       priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`,           priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/experience`,     priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/skills`,         priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/clients`,        priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/achievements`,   priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contact`,        priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/uses`,           priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE}/now`,            priority: 0.7, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/open-source`,    priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages.map(p => ({ ...p, lastModified: new Date() })),
    ...blogRoutes,
  ];
}
