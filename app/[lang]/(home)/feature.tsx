"use client";
import { useParams } from 'next/navigation';
import { Bot, Brain, Cloud, SquareM, TabletSmartphone, Puzzle } from 'lucide-react';
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
        cn: "AI 智能助手",
        en: "AI Assistant",
      },
      shortDescription: {
        cn: "智能 Agent + 自定义模型",
        en: "Smart Agent + Custom LLMs",
      },
      description: {
        cn: "内置免费模型，支持自定义配置主流模型。智能Agent可自动整理笔记、生成内容。",
        en: "Built-in free models with custom LLM support. Smart Agent organizes notes and generates content.",
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
    {
      icon: <Puzzle className="size-4" />,
      title: {
        cn: "MCP 支持",
        en: "MCP Support",
      },
      shortDescription: {
        cn: "扩展 AI 能力",
        en: "Extend AI Capabilities",
      },
      description: {
        cn: "支持模型上下文协议，让 AI 访问外部工具和数据源，增强智能交互体验。",
        en: "Supports Model Context Protocol, enabling AI to access external tools and data sources.",
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