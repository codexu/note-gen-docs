"use client";
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
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

export default function HomeHero() {

  const lang = (useParams().lang as 'cn' | 'en') || 'cn';

  const h1Text = {
    cn: "一款跨平台的 Markdown AI 笔记软件",
    en: "A cross-platform Markdown AI note-taking software.",
  }[lang];

  const pText = {
    cn: "致力于使用 AI 建立记录和写作的桥梁",
    en: "Bridging the Gap Between Recording and Writing with LLM.",
  }[lang];

  const downloadLink = {
    cn: "下载客户端",
    en: "Download Client",
  }[lang];

  const docsLink = {
    cn: "使用文档",
    en: "Get Started",
  }[lang];

  // 获取 Github star
  const [starCount, setStarCount] = useState(0);
  useEffect(() => {
    fetch('/api/github-stats')
      .then(response => response.json())
      .then(data => setStarCount(data.stargazers_count || 0))
      .catch(error => {
        console.error('Failed to fetch GitHub stats:', error);
        setStarCount(0);
      });
  }, []);

  return (
    <SectionWrap className='flex lg:flex-row flex-col justify-between gap-24'>
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <p className="text-5xl font-bold mb-6">NoteGen</p>
        </div>
        <h1 className="mb-4 text-2xl font-bold">{h1Text}</h1>
        <p className="text-fd-muted-foreground">
          {pText}
        </p>
        <div className="flex gap-4 mt-12">
          <Button onClick={() => window.location.href = `${lang}/docs/download`} variant="default">
            <Download />
            {downloadLink}
          </Button>
          <Button onClick={() => window.location.href = `${lang}/docs`} variant="default">
            <Book />
            {docsLink}
          </Button>
          <Button onClick={() => window.open('https://github.com/codexu/note-gen', '_blank')} variant="outline">
            <Github /> Github {starCount ? formatNumber(starCount) : ''}
          </Button>
        </div>
      </div>
      <Image
        src="https://s2.loli.net/2025/06/13/UbVGPrhFl3etnQz.png"
        alt="NoteGen"
        width={1280}
        height={720}
        className="w-full lg:w-[640px] object-contain"
      />
    </SectionWrap>
  );
}
