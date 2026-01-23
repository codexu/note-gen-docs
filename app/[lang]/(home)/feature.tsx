"use client";
import { useParams } from 'next/navigation';
import { Eye, ExternalLink, Heart, Palette, Shield, SquareM, TabletSmartphone } from 'lucide-react';
import SectionWrap from './section-wrap';

type Feature = {
  icon: React.ReactNode;
  title: {
    cn: string;
    en: string;
  };
  shortDescription: {
    cn: string;
    en: string;
  };
  description: {
    cn: string;
    en: string;
  };
  link?: string;
}

export default function HomeFeature() {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';

  const features = [
    {
      icon: <Heart className="size-4" />,
      title: {
        cn: "开源免费",
        en: "Open Source & Free",
      },
      shortDescription: {
        cn: "永久免费使用",
        en: "Free Forever",
      },
      description: {
        cn: "完全开源，永久免费。软件内无广告，无隐藏收费，纯净的笔记体验。",
        en: "Fully open source and free forever. No ads, no hidden fees, just a pure note-taking experience.",
      },
    },
    {
      icon: <TabletSmartphone className="size-4" />,
      title: {
        cn: "跨平台",
        en: "Cross Platform",
      },
      shortDescription: {
        cn: "支持主流设备",
        en: "Supports Mainstream Devices",
      },
      description: {
        cn: "基于 Tarui2 框架开发，支持 Windows、Mac、Linux、Android、iOS，安装包仅 20MB 左右",
        en: "Based on Tarui2 framework, supports Windows, Mac, Linux, Android, iOS. Only 20MB.",
      },
    },
    {
      icon: <Shield className="size-4" />,
      title: {
        cn: "本地优先",
        en: "Local First",
      },
      shortDescription: {
        cn: "数据本地存储",
        en: "Data Stored Locally",
      },
      description: {
        cn: "所有数据存储在本地，完全掌控你的笔记。无需登录即可使用，隐私安全有保障。",
        en: "All data is stored locally, giving you full control over your notes. No login required, privacy and security guaranteed.",
      },
    },
    {
      icon: <SquareM className="size-4" />,
      title: {
        cn: "Markdown",
        en: "Markdown",
      },
      shortDescription: {
        cn: "标准语法 + 扩展语法",
        en: "Standard + Extended",
      },
      description: {
        cn: "支持标准 Markdown 语法，同时支持扩展语法，如数学公式、脑图、图表、流程图等",
        en: "Supports standard Markdown and extends syntax, such as math formula, mind map, chart, flow chart, etc.",
      },
    },
    {
      icon: <Eye className="size-4" />,
      title: {
        cn: "所见即所得",
        en: "WYSIWYG",
      },
      shortDescription: {
        cn: "Vditor",
        en: "Vditor",
      },
      description: {
        cn: "使用 Vditor 编辑器，支持所见即所得模式，类似 Typora 的即时渲染体验。",
        en: "Powered by Vditor editor, supports WYSIWYG mode with instant rendering experience like Typora.",
      },
      link: "https://github.com/Vanessa219/vditor",
    },
    {
      icon: <Palette className="size-4" />,
      title: {
        cn: "主题",
        en: "Themes",
      },
      shortDescription: {
        cn: "多主题 + 深色模式",
        en: "Multiple Themes + Dark Mode",
      },
      description: {
        cn: "内置 12 种精心设计的预设主题，支持自定义主题颜色。提供深色模式，保护你的眼睛。",
        en: "Supports 12 preset themes with customizable theme colors. Includes dark mode.",
      },
    },
  ];

  return (
    <SectionWrap isPadding={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} lang={lang} index={index} />
        ))}
      </div>
    </SectionWrap>
  );
}

function FeatureItem({ feature, lang, index }: { feature: Feature, lang: 'cn' | 'en', index: number }) {
  const col = index % 3;
  const hasRightBorder = col < 2;
  const hasBottomBorder = index < 3;

  return (
    <div className={`flex flex-col justify-start items-start gap-3 sm:gap-4 p-6 md:p-8 lg:p-12 ${hasBottomBorder ? 'border-b' : ''} border-fd-border border-dashed ${hasRightBorder ? 'border-r' : ''}`}>
      <h5 className="flex gap-2 text-xs text-fd-muted-foreground">
        {feature.icon}
        {feature.shortDescription[lang]}
      </h5>
      {feature.link ? (
        <a href={feature.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-fd-primary hover:underline flex items-center gap-1">
          {feature.title[lang]}
          <ExternalLink className="size-3" />
        </a>
      ) : (
        <h3 className="text-lg font-bold">{feature.title[lang]}</h3>
      )}
      <p className="text-fd-muted-foreground text-sm">{feature.description[lang]}</p>
    </div>
  );
}