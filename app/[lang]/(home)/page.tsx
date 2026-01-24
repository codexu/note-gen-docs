import HomeHero from './hero';
import HomeFeature from './feature';
import HomeAgent from './agent';
import HomeRecords from './records';
import HomeModels from './models';
import HomeSync from './sync';
import HomeFooter from './footer';
import HomeContributors from './contributors';
import SectionWrap from './section-wrap';
import { getContributors, getGitHubStats, getNoteGenModels } from '@/lib/github-data';

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // 在服务端预获取数据，减少客户端 API 调用
  const [contributors, githubStats, premiumModels] = await Promise.all([
    getContributors(),
    getGitHubStats(),
    getNoteGenModels()
  ]);

  return <main>
    <HomeHero githubStats={githubStats} />
    <HomeFeature />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeAgent />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeRecords />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeModels premiumModels={premiumModels} lang={lang as 'cn' | 'en'} />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeSync />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeContributors contributors={contributors} />
    <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>
    <HomeFooter />
  </main>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return {
    title: {
      cn: 'NoteGen - Markdown AI 笔记软件',
      en: 'NoteGen - Markdown AI Note-taking Software',
    }[lang],
    description: {
      cn: '一款跨平台的 Markdown AI 笔记软件，致力于使用 AI 建立记录和写作的桥梁',
      en: 'A cross-platform Markdown AI note-taking software, bridging the gap between recording and writing with LLM.',
    }[lang],
    keywords: {
      cn: ['NoteGen', 'Markdown', "AI", '跨平台', '记录', '写作', '笔记', '软件', '记录和写作的桥梁'],
      en: ['NoteGen', 'Markdown', 'Cross-platform', 'Recording', 'Writing', 'AI', 'Note-taking', 'Software', 'Bridge between recording and writing with LLM'],
    }[lang],
  };
}
