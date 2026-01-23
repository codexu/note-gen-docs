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

  const titleText = {
    cn: "开源贡献者",
    en: "Open Source Contributors",
  }[lang];

  const subtitleText = {
    cn: "感谢所有为 NoteGen 项目贡献代码的开发者们",
    en: "Thanks to all developers who contributed code to the NoteGen project",
  }[lang];

  const promotionalText = {
    cn: "🚀 加入我们的开源社区，体验协作开发的乐趣！无论是修复 Bug、添加新功能，还是改进文档，每一个贡献都让 NoteGen 变得更好。开源不仅是代码的分享，更是知识与创意的碰撞。让我们一起构建更优秀的工具，让更多人受益！",
    en: "🚀 Join our open source community and experience the joy of collaborative development! Whether fixing bugs, adding new features, or improving documentation, every contribution makes NoteGen better. Open source is not just about sharing code, but also about the collision of knowledge and creativity. Let's build better tools together and benefit more people!",
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

        <div className="flex flex-row items-center justify-center mb-12 flex-wrap">
          {(() => {
            const displayContributors = contributors.slice(0, 30);
            const remainingCount = contributors.length - displayContributors.length;

            const tooltipItems = displayContributors.map((contributor) => ({
              id: contributor.id,
              name: contributor.login,
              designation: `${contributor.contributions} ${contributionsText}`,
              image: contributor.avatar_url,
            }));

            return (
              <>
                <AnimatedTooltip items={tooltipItems} />
                {remainingCount > 0 && (
                  <div
                    className="relative h-14 w-14 rounded-full bg-fd-muted flex items-center justify-center border-2 border-fd-border hover:border-fd-primary transition-all duration-200 cursor-pointer"
                    onClick={() => window.open('https://github.com/codexu/note-gen/graphs/contributors', '_blank')}
                  >
                    <span className="text-sm font-bold text-fd-muted-foreground">
                      +{remainingCount}
                    </span>
                  </div>
                )}
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
