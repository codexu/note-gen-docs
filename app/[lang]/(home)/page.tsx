import HomeHero from './hero';
import HomeFeature from './feature';
import HomeAgent from './agent';
import HomeRecords from './records';
import HomeModels from './models';
import HomeSync from './sync';
import HomeFooter from './footer';
import HomeContributors from './contributors';
import HomeIssues from './issues';
import SectionWrap from './section-wrap';
import { getContributors, getGitHubStats, getNoteGenModels, getGitHubIssues } from '@/lib/github-data';
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
  
  // 在服务端预获取数据，减少客户端 API 调用
  const [contributors, githubStats, premiumModels, issuesData] = await Promise.all([
    getContributors(),
    getGitHubStats(),
    getNoteGenModels(),
    getGitHubIssues()
  ]);

  return <main>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
    <HomeHero githubStats={githubStats} />
    <HomeFeature />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeAgent />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeRecords />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeModels premiumModels={premiumModels} lang={language} />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeSync />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeContributors contributors={contributors} />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeIssues issues={issuesData.issues} totalCount={issuesData.totalCount} lang={language} />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeFooter />
  </main>
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
