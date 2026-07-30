import HomeLanding from './landing';
import { getHomeAlternates, getHomeJsonLd, homeSeo, normalizeLang, siteConfig } from '@/lib/seo';
import type { Metadata } from 'next';

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const jsonLd = getHomeJsonLd(language);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <HomeLanding lang={language} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const seo = homeSeo[language];

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: getHomeAlternates(language),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/${language}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: language === 'cn' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'cn' ? ['en_US'] : ['zh_CN'],
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
