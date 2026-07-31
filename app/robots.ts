import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/cn/cover-capture',
        '/en/cover-capture',
        '/cn/desktop-cover-capture',
        '/en/desktop-cover-capture',
        '/cn/mobile-cover-capture',
        '/en/mobile-cover-capture',
      ],
    },
    sitemap: new URL('/sitemap.xml', siteConfig.url).toString(),
    host: siteConfig.url.origin,
  };
}
