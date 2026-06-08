import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';

const BASE = 'https://voidcu.com';
const UPDATED = new Date('2025-06-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                   lastModified: UPDATED, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/about`,        lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/projects`,     lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`,         lastModified: UPDATED, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/experience`,   lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/skills`,       lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,      lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/clients`,      lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/achievements`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/open-source`,  lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/now`,          lastModified: UPDATED, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/uses`,         lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogRoutes];
}
