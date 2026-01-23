"use client";
import { useParams } from 'next/navigation';
import { FileEdit, Puzzle, Sparkles, Database } from 'lucide-react';
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
    cn: "强大的 Agent 能力",
    en: "Powerful Agent Capabilities",
  }[lang];

  const sectionDescription = {
    cn: "让 AI 成为你的写作助手，智能辅助内容创作与文档管理",
    en: "Make AI your writing assistant, intelligently assisting with content creation and document management",
  }[lang];

  const agentFeatures: AgentFeature[] = [
    {
      icon: <FileEdit className="size-4" />,
      title: {
        cn: "智能内容编辑",
        en: "Intelligent Content Editing",
      },
      shortDescription: {
        cn: "上下文感知编辑",
        en: "Context-Aware Editing",
      },
      description: {
        cn: "Agent 可以精准读取文档内容，理解写作上下文后进行智能修改。支持批量操作和多文档联动，让内容创作和文档修改变得简单高效。",
        en: "Agent can accurately read document contents, understand writing context, and make intelligent edits. Supports batch operations and multi-document collaboration, making content creation and document modification simple and efficient.",
      },
    },
    {
      icon: <Puzzle className="size-4" />,
      title: {
        cn: "MCP 协议支持",
        en: "MCP Protocol Support",
      },
      shortDescription: {
        cn: "扩展 AI 能力边界",
        en: "Extend AI Capabilities",
      },
      description: {
        cn: "通过模型上下文协议（MCP），Agent 可以访问外部工具、数据库和服务，如网络搜索、API 调用、系统操作等，实现真正的智能交互。",
        en: "Through Model Context Protocol (MCP), Agent can access external tools, databases and services, such as web search, API calls, system operations, achieving true intelligent interaction.",
      },
    },
    {
      icon: <Sparkles className="size-4" />,
      title: {
        cn: "Skills 技能系统",
        en: "Skills System",
      },
      shortDescription: {
        cn: "可定制的工作流",
        en: "Customizable Workflows",
      },
      description: {
        cn: "内置丰富的技能系统，支持自定义工作流和任务链。Agent 可以根据任务需求自动选择合适的技能，完成复杂的多步骤操作。",
        en: "Built-in rich skill system, supports customizable workflows and task chains. Agent can automatically select appropriate skills based on task requirements, completing complex multi-step operations.",
      },
    },
    {
      icon: <Database className="size-4" />,
      title: {
        cn: "RAG 知识库",
        en: "RAG Knowledge Base",
      },
      shortDescription: {
        cn: "本地知识检索",
        en: "Local Knowledge Retrieval",
      },
      description: {
        cn: "基于你的笔记构建本地知识库，使用向量和重排序模型进行智能检索。Agent 可以从你的知识库中提取相关信息，生成更准确的回答。",
        en: "Build local knowledge base from your notes, using vector and re-ranking models for intelligent retrieval. Agent can extract relevant information from your knowledge base to generate more accurate responses.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {agentFeatures.map((feature, index) => (
            <AgentFeatureItem key={index} feature={feature} lang={lang} />
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

function AgentFeatureItem({ feature, lang }: { feature: AgentFeature, lang: 'cn' | 'en' }) {
  return (
    <div className="p-6 relative overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10 flex flex-col gap-3 border-[0.5px] border-fd-border hover:bg-fd-muted/50 transition-colors">
      <div className="flex items-center gap-2 text-fd-primary">
        {feature.icon}
        <h3 className="font-semibold text-lg">{feature.title[lang]}</h3>
      </div>
      <h5 className="text-xs text-fd-muted-foreground font-medium">
        {feature.shortDescription[lang]}
      </h5>
      <p className="text-sm text-fd-muted-foreground leading-relaxed">
        {feature.description[lang]}
      </p>
    </div>
  );
}
