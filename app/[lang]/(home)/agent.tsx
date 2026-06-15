"use client";
import { useParams } from 'next/navigation';
import { Database, FileEdit, Plug, Sparkles } from 'lucide-react';
import SectionWrap from './section-wrap';

type AgentFeature = {
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

export default function HomeAgent() {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';

  const sectionTitle = {
    cn: "让 AI 读懂你的笔记",
    en: "Let AI understand your notes",
  }[lang];

  const sectionDescription = {
    cn: "不止是聊天。NoteGen 的 AI 可以读取当前文档和本地笔记，帮你改写、查找、整理和完成更复杂的任务。",
    en: "More than chat. NoteGen AI can read your documents and local notes to help rewrite, search, organize, and complete complex tasks.",
  }[lang];

  const agentFeatures: AgentFeature[] = [
    {
      icon: <FileEdit className="size-4" />,
      title: {
        cn: "按上下文改写",
        en: "Rewrite with context",
      },
      shortDescription: {
        cn: "读懂当前文档",
        en: "Understands the note",
      },
      description: {
        cn: "AI 会读取当前笔记内容，帮你补充、改写、润色或调整结构。",
        en: "AI reads the current note, then helps expand, rewrite, polish, or restructure it.",
      },
    },
    {
      icon: <Database className="size-4" />,
      title: {
        cn: "从笔记里查找",
        en: "Search your notes",
      },
      shortDescription: {
        cn: "本地知识检索",
        en: "Local knowledge",
      },
      description: {
        cn: "基于你的本地笔记检索相关内容，让回答更贴近已有资料。",
        en: "Retrieve related local notes so answers stay grounded in your own material.",
      },
    },
    {
      icon: <Sparkles className="size-4" />,
      title: {
        cn: "完成多步骤任务",
        en: "Handle multi-step tasks",
      },
      shortDescription: {
        cn: "Skills 自定义技能",
        en: "Custom Skills",
      },
      description: {
        cn: "把常用流程做成 Skills，让 AI 按步骤整理、生成或处理内容。",
        en: "Turn repeat workflows into Skills so AI can organize, generate, or process content step by step.",
      },
    },
    {
      icon: <Plug className="size-4" />,
      title: {
        cn: "连接外部工具",
        en: "Connect external tools",
      },
      shortDescription: {
        cn: "MCP 扩展能力",
        en: "MCP extensions",
      },
      description: {
        cn: "通过 MCP 接入搜索、API 或其他服务，扩展更高级的工作流。",
        en: "Use MCP to connect search, APIs, or services for advanced workflows.",
      },
    },
  ];

  return (
    <SectionWrap isPadding={false}>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{sectionTitle}</h1>
          <p className="text-fd-muted-foreground text-sm">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-fd-border border-dashed">
          {agentFeatures.map((feature, index) => (
            <AgentFeatureItem key={index} feature={feature} lang={lang} index={index} />
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

function AgentFeatureItem({ feature, lang, index }: { feature: AgentFeature, lang: 'cn' | 'en', index: number }) {
  const isTopRow = index < 2;
  const isLeftCol = index % 2 === 0;
  const isLast = index === 3;
  const bottomBorder = isTopRow ? 'border-b' : !isLast ? 'border-b md:border-b-0' : '';
  const rightBorder = isLeftCol ? 'md:border-r' : '';

  return (
    <div className={`p-6 md:p-8 lg:p-10 flex flex-col gap-3 border-fd-border border-dashed hover:bg-fd-muted/50 transition-colors ${bottomBorder} ${rightBorder}`}>
      <div className="flex items-center gap-2 text-fd-primary">
        {feature.icon}
        <h3 className="font-semibold text-lg">{feature.title[lang]}</h3>
      </div>
      <h5 className="text-xs text-fd-muted-foreground font-medium">
        {feature.shortDescription[lang]}
      </h5>
      <p className="text-sm text-fd-muted-foreground leading-relaxed line-clamp-2">
        {feature.description[lang]}
      </p>
    </div>
  );
}
