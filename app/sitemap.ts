import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/seo';

const staticPaths = [
  '',
  '/download',
  '/web-clipper/download',
  '/community',
  '/self-hosted',
  '/business',
  '/donate',
] as const;

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}

function languageAlternates(pathname: string) {
  return {
    'zh-CN': absoluteUrl(`/cn${pathname}`),
    en: absoluteUrl(`/en${pathname}`),
    'x-default': absoluteUrl(`/cn${pathname}`),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.flatMap((pathname) => {
    const alternates = { languages: languageAlternates(pathname) };

    return [
      {
        url: absoluteUrl(`/cn${pathname}`),
        changeFrequency: pathname === '' ? 'weekly' : 'monthly',
        priority: pathname === '' ? 1 : pathname === '/download' ? 0.9 : pathname === '/web-clipper/download' ? 0.8 : 0.6,
        alternates,
      },
      {
        url: absoluteUrl(`/en${pathname}`),
        changeFrequency: pathname === '' ? 'weekly' : 'monthly',
        priority: pathname === '' ? 1 : pathname === '/download' ? 0.9 : pathname === '/web-clipper/download' ? 0.8 : 0.6,
        alternates,
      },
    ] satisfies MetadataRoute.Sitemap;
  });

  const docsEntries = source.getPages().map((page) => {
    const pathname = page.url.replace(/^\/(?:cn|en)/, '');

    return {
      url: absoluteUrl(page.url),
      changeFrequency: 'monthly',
      priority: pathname === '/docs' ? 0.8 : 0.7,
      alternates: {
        languages: languageAlternates(pathname),
      },
    } satisfies MetadataRoute.Sitemap[number];
  });

  return [...staticEntries, ...docsEntries];
}
