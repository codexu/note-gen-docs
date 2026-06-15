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

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // 在服务端预获取数据，减少客户端 API 调用
  const [contributors, githubStats, premiumModels, issuesData] = await Promise.all([
    getContributors(),
    getGitHubStats(),
    getNoteGenModels(),
    getGitHubIssues()
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
    <HomeIssues issues={issuesData.issues} totalCount={issuesData.totalCount} lang={lang as 'cn' | 'en'} />
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
      cn: 'NoteGen - 先记录，再整理',
      en: 'NoteGen - Capture first, organize later',
    }[lang],
    description: {
      cn: 'NoteGen 让灵感、截图、链接、语音和文件先进入记录箱，再由 AI 整理成可编辑的 Markdown 笔记。',
      en: 'NoteGen lets you capture ideas, screenshots, links, voice notes, and files first, then organize them into editable Markdown notes with AI.',
    }[lang],
    keywords: {
      cn: ['NoteGen', 'Markdown', "AI", '跨平台', '记录', '整理', '写作', '笔记', '软件', '先记录再整理'],
      en: ['NoteGen', 'Markdown', 'Cross-platform', 'Capture', 'Organize', 'Writing', 'AI', 'Note-taking', 'Software', 'Capture first organize later'],
    }[lang],
  };
}
