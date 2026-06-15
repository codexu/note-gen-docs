"use client";
import { useParams } from 'next/navigation';
import { FileText, Heart, Inbox, Shield, Sparkles, TabletSmartphone } from 'lucide-react';
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
}

export default function HomeFeature() {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';

  const features = [
    {
      icon: <Inbox className="size-4" />,
      title: {
        cn: "先记录，不打断",
        en: "Capture without breaking flow",
      },
      shortDescription: {
        cn: "灵感先留下",
        en: "Save it first",
      },
      description: {
        cn: "灵感、截图、链接、语音、文件先放进来，不用分类、排序，也不用立刻成文。",
        en: "Capture ideas, screenshots, links, voice, and files first. Sort later.",
      },
    },
    {
      icon: <Sparkles className="size-4" />,
      title: {
        cn: "AI 自动整理",
        en: "AI organizes for you",
      },
      shortDescription: {
        cn: "零散变清晰",
        en: "From scattered to clear",
      },
      description: {
        cn: "把零散记录交给 AI，自动整理成结构清晰、可以继续编辑的笔记。",
        en: "Drop in scattered records. AI turns them into clear, editable notes.",
      },
    },
    {
      icon: <FileText className="size-4" />,
      title: {
        cn: "继续写下去",
        en: "Keep writing",
      },
      shortDescription: {
        cn: "标准 Markdown",
        en: "Standard Markdown",
      },
      description: {
        cn: "整理后的内容是标准 Markdown，可以继续编辑、补充、改写和沉淀。",
        en: "Organized notes stay in Markdown, ready to edit, expand, and keep.",
      },
    },
    {
      icon: <Shield className="size-4" />,
      title: {
        cn: "数据在你手里",
        en: "Your data stays yours",
      },
      shortDescription: {
        cn: "本地优先",
        en: "Local first",
      },
      description: {
        cn: "数据优先保存在本地，无需登录也能开始使用，自己的笔记自己掌控。",
        en: "Stored locally first. Start without login and keep control of your notes.",
      },
    },
    {
      icon: <TabletSmartphone className="size-4" />,
      title: {
        cn: "多端记录，免费同步",
        en: "Capture anywhere, sync for free",
      },
      shortDescription: {
        cn: "桌面端 + 移动端",
        en: "Desktop + mobile",
      },
      description: {
        cn: "桌面端和移动端都能记录，数据可在设备之间免费同步，随时接上自己的笔记现场。",
        en: "Record on desktop or mobile, then sync across devices for free.",
      },
    },
    {
      icon: <Heart className="size-4" />,
      title: {
        cn: "开源且免费",
        en: "Open source and free",
      },
      shortDescription: {
        cn: "适合长期使用",
        en: "Built for the long run",
      },
      description: {
        cn: "无广告、完全免费，代码开放，适合长期使用。",
        en: "No ads, no fees, open source. Built for long-term use.",
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
      <h3 className="text-lg font-bold">{feature.title[lang]}</h3>
      <p className="text-fd-muted-foreground text-sm line-clamp-2">{feature.description[lang]}</p>
    </div>
  );
}
