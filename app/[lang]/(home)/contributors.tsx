"use client";
import { useParams } from 'next/navigation';
import { Users, Github, Book } from 'lucide-react';
import SectionWrap from './section-wrap';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';

type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

interface HomeContributorsProps {
  contributors?: Contributor[];
}

export default function HomeContributors({ contributors = [] }: HomeContributorsProps) {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';
  const contributorsPerRow = 16;

  const titleText = {
    cn: "开源贡献者",
    en: "Open Source Contributors",
  }[lang];

  const subtitleText = {
    cn: "感谢每一位参与代码、文档和问题反馈的贡献者",
    en: "Thanks to everyone contributing code, docs, and feedback to NoteGen",
  }[lang];

  const promotionalText = {
    cn: "NoteGen 保持开源透明，也欢迎修复问题、补充文档、提出想法或参与功能实现。",
    en: "NoteGen stays open and transparent. Fixes, docs, ideas, and feature contributions are all welcome.",
  }[lang];

  const viewOnGithubText = {
    cn: "在 GitHub 上查看项目",
    en: "View Project on GitHub",
  }[lang];

  const contributionsText = {
    cn: "次贡献",
    en: "contributions",
  }[lang];

  const contributionGuideText = {
    cn: "贡献指南",
    en: "Contribution Guide",
  }[lang];

  return (
    <SectionWrap>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="size-6 text-fd-primary" />
          <h2 className="text-3xl font-bold">{titleText}</h2>
        </div>
        <p className="text-fd-muted-foreground text-lg mb-16">
          {subtitleText}
        </p>

        <div className="mb-12 space-y-4">
          {(() => {
            const rows = Array.from({ length: Math.ceil(contributors.length / contributorsPerRow) }, (_, index) =>
              contributors.slice(index * contributorsPerRow, (index + 1) * contributorsPerRow)
            );

            return (
              <>
                {rows.map((row, rowIndex) => {
                  const tooltipItems = row.map((contributor) => ({
                    id: contributor.id,
                    name: contributor.login,
                    designation: `${contributor.contributions} ${contributionsText}`,
                    image: contributor.avatar_url,
                  }));

                  return (
                    <div key={rowIndex} className="flex flex-row flex-wrap items-center justify-center gap-y-4 pr-4">
                      <AnimatedTooltip items={tooltipItems} />
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>

        <div className="px-8 pt-8 pb-2">
          <p className="text-fd-muted-foreground leading-relaxed mb-6 max-w-4xl mx-auto">
            {promotionalText}
          </p>
          <div className="flex gap-4 lg:flex-row flex-col items-center justify-center">
            <Button onClick={() => window.open('https://github.com/codexu/note-gen', '_blank')}>
              <Github className="size-4" />
              {viewOnGithubText}
            </Button>
            <Button onClick={() => window.location.href = `${lang}/docs/contributing`} variant="outline">
              <Book className="size-4" />
              {contributionGuideText}
            </Button>
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}
