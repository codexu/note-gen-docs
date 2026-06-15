"use client";
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Github, Book } from 'lucide-react';
import SectionWrap from './section-wrap';
import Image from 'next/image';

// 格式化数字显示函数
function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

type GitHubStats = {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
};

interface HomeHeroProps {
  githubStats?: GitHubStats;
}

const heroCopy = {
  cn: {
    titleLines: ['先记录，再整理。'],
    description: '灵感、截图、链接、语音和文件，先自然地进入记录箱。等到需要输出时，再让 AI 帮你整理成清晰、可继续编辑的 Markdown 笔记。',
    downloadLink: '下载客户端',
    docsLink: '使用文档',
  },
  en: {
    titleLines: ['Capture first, organize later.'],
    description: 'Drop ideas, screenshots, links, voice notes, and files into one inbox first. When it is time to write, let AI shape them into clear, editable Markdown notes.',
    downloadLink: 'Download Client',
    docsLink: 'Get Started',
  },
} as const;

export default function HomeHero({ githubStats }: HomeHeroProps) {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';
  const copy = heroCopy[lang];

  // 使用服务端传入的数据，避免客户端 API 调用
  const starCount = githubStats?.stargazers_count || 0;

  return (
    <SectionWrap className='flex flex-col lg:flex-row justify-between gap-8 md:gap-16 lg:gap-24'>
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
        <h1 className={`mb-4 sm:mb-5 text-3xl sm:text-4xl ${lang === 'en' ? 'lg:text-4xl' : 'lg:text-5xl'} font-bold leading-tight`}>
          {copy.titleLines.map((line, index) => (
            <span key={line} className={index > 0 ? 'block text-fd-muted-foreground' : 'block'}>
              {line}
            </span>
          ))}
        </h1>
        <p className="text-fd-muted-foreground max-w-prose text-base sm:text-lg leading-7 sm:leading-8">
          {copy.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 lg:mt-12 w-full sm:w-auto">
          <Button className="w-full sm:w-auto" onClick={() => window.location.href = `/${lang}/download`} variant="default">
            <Download />
            {copy.downloadLink}
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => window.location.href = `/${lang}/docs`} variant="default">
            <Book />
            {copy.docsLink}
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => window.open('https://github.com/codexu/note-gen', '_blank')} variant="outline">
            <Github /> Github {starCount ? formatNumber(starCount) : ''}
          </Button>
        </div>
      </div>
      <Image
        src="https://s2.loli.net/2025/12/22/jlpEP2c6ogwHhIA.png"
        alt="NoteGen"
        width={1280}
        height={720}
        className="w-full lg:w-[640px] object-contain"
      />
    </SectionWrap>
  );
}
