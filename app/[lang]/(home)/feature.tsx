"use client";
import { useParams } from 'next/navigation';
import { Bot, Brain, Cloud, LaptopMinimal, SquareM, TabletSmartphone } from 'lucide-react';
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

  const lang = (useParams().lang as 'cn' | 'en') || 'cn';

  const features1 = [
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
      icon: <Bot className="size-4" />,
      title: {
        cn: "AI 集成",
        en: "AI Capabilities",
      },
      shortDescription: {
        cn: "支持自定义模型",
        en: "Supports Custom LLMs",
      },
      description: {
        cn: "支持主流模型，如 OpenAI、Deepseek、Gemini等，支持 Ollama 等本地模型。",
        en: "Supports LLMs, such as OpenAI、Deepseek、Gemini, etc. Supports local models such as Ollama.",
      },
    },
    {
      icon: <Cloud className="size-4" />,
      title: {
        cn: "免费安全同步",
        en: "Free Safe Synchronization",
      },
      shortDescription: {
        cn: "多种同步方案可选",
        en: "Multiple Synchronization Schemes",
      },
      description: {
        cn: "主要同步方案支持 Github、GitLab、Gitee，备用方案支持 WebDAV。",
        en: "Main synchronization schemes support Github、GitLab、Gitee, backup scheme support WebDAV.",
      },
    },
  ];
  const features2 = [
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
      icon: <LaptopMinimal className="size-4" />,
      title: {
        cn: "所见即所得",
        en: "Wysiwyg",
      },
      shortDescription: {
        cn: "三种编辑模式",
        en: "Three editing modes",
      },
      description: {
        cn: "支持类似 Typora 的即时渲染，并且还支持所见即所得、分屏预览。 ",
        en: "Supports instant rendering like Typora, supports wysiwyg, split screen preview.",
      },
    },
    {
      icon: <Brain className="size-4" />,
      title: {
        cn: "RAG",
        en: "RAG",
      },
      shortDescription: {
        cn: "本地知识库",
        en: "Local Knowledge Base",
      },
      description: {
        cn: "你的笔记就是你的知识库，支持嵌入模型、重排序模型。",
        en: "Your notes are your knowledge base, supports embedding models, reordering models.",
      },
    },
  ];

  return (
    <SectionWrap isPadding={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {features1.map((feature, index) => (
          <FeatureItem key={index} feature={feature} lang={lang} isBorderBottom={true} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {features2.map((feature, index) => (
          <FeatureItem key={index} feature={feature} lang={lang} isBorderBottom={false} />
        ))}
      </div>
    </SectionWrap>
  );
}

function FeatureItem({ feature, lang, isBorderBottom }: { feature: Feature, lang: 'cn' | 'en', isBorderBottom?: boolean }) {
  return (
    <div className={`
      flex flex-col justify-start items-start gap-3 sm:gap-4 p-6 md:p-8 lg:p-12
      lg:not-first:border-l ${isBorderBottom ? 'border-b' : ''} border-fd-border border-dashed
    `}>
      <h5 className="flex gap-2 text-xs text-fd-muted-foreground">
        {feature.icon}
        {feature.shortDescription[lang]}
      </h5>
      <h3 className="text-lg font-bold">{feature.title[lang]}</h3>
      <p className="text-fd-muted-foreground text-sm">{feature.description[lang]}</p>
    </div>
  );
}