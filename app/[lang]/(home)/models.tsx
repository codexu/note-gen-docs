import { Dot, Eye, MessageSquare, Move3D, Sparkles } from 'lucide-react';
import SectionWrap from './section-wrap';
import Image from 'next/image';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

type Model = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  title: {
    cn: string;
    en: string;
  };
  description: {
    cn: string;
    en: string;
  };
}

type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  supported_endpoint_types: string[];
}

export default async function HomeModels({ premiumModels, lang }: { premiumModels: ApiModel[], lang: 'cn' | 'en' }) {

  const sectionTitle = {
    cn: "AI 模型开箱即用",
    en: "AI models ready to use",
  }[lang];

  const sectionDescription = {
    cn: "内置免费模型可以支持整理、检索和图片理解；需要更强能力时，也可以配置自己的模型服务。",
    en: "Built-in free models cover organizing, search, and image understanding. You can also connect your own model service when needed.",
  }[lang];

  const models: Model[] = [
    {
      icon: MessageSquare,
      name: "Qwen/Qwen3-8B",
      title: {
        cn: "对话与整理",
        en: "Chat and organize",
      },
      description: {
        cn: "支持总结、改写和生成笔记草稿，满足日常整理需求。",
        en: "Summarize, rewrite, and draft notes for everyday organizing.",
      },
    },
    {
      icon: Move3D,
      name: "BAAI/bge-m3",
      title: {
        cn: "语义检索",
        en: "Semantic search",
      },
      description: {
        cn: "在本地笔记里找到相关内容，让回答更贴近自己的资料。",
        en: "Find related local notes so answers stay grounded in your material.",
      },
    },
    {
      icon: Eye,
      name: "THUDM/GLM-4.1V-9B-Thinking",
      title: {
        cn: "图片理解",
        en: "Image understanding",
      },
      description: {
        cn: "识别截图、图片和 OCR 内容，让素材不只停留在文件里。",
        en: "Read screenshots, images, and OCR content beyond raw files.",
      },
    },
  ];

  return (
    <SectionWrap isPadding={false}>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 text-fd-muted-foreground text-xs mb-4">
              <Sparkles className="size-4" />
              {lang === 'cn' ? '模型服务' : 'Model service'}
            </div>
            <h1 className="text-3xl font-bold mb-4">{sectionTitle}</h1>
            <p className="text-fd-muted-foreground text-sm">{sectionDescription}</p>
          </div>
          <div className="hidden lg:flex flex-shrink-0 ml-8">
            <a 
              href="https://cloud.siliconflow.cn/i/O2ciJeZw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              {/* Light mode image */}
              <Image
                src="https://s2.loli.net/2025/09/10/gVhlriQ81PJabSY.png"
                width={200}
                height={150}
                alt="SiliconFlow"
                className="object-contain w-auto h-auto max-w-[200px] dark:hidden"
              />
              {/* Dark mode image */}
              <Image
                src="https://s2.loli.net/2025/09/10/KWPOA5XhIGmYTV9.png"
                width={200}
                height={150}
                alt="SiliconFlow"
                className="object-contain w-auto h-auto max-w-[200px] hidden dark:block"
              />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 divide-y divide-fd-border divide-dashed border border-fd-border border-dashed md:grid-cols-3 md:divide-x md:divide-y-0">
          {models.map((model, index) => (
            <ModelItem key={index} model={model} lang={lang} />
          ))}
        </div>

        <p className="text-sm text-fd-muted-foreground leading-relaxed mt-6">
          {lang === 'cn'
            ? '内置模型适合直接开始使用；如果你有更高要求，可以在设置中切换到自己的模型。'
            : 'Built-in models are enough to start. For higher requirements, switch to your own model in settings.'
          }
        </p>

        {/* 限时体验模型 */}
        {premiumModels.length > 0 && (
          <div className="mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-fd-muted-foreground text-xs mb-3">
                <Sparkles className="size-4" />
                {lang === 'cn' ? '体验模型' : 'Trial access'}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'cn' ? '更强模型，按需体验' : 'Try stronger models when needed'}
              </h2>
              <p className="text-fd-muted-foreground text-sm">
                {lang === 'cn' 
                  ? '部分高级模型会限时开放，适合更复杂的整理、理解和生成任务。' 
                  : 'Some advanced models are available for limited trials, useful for heavier organizing, understanding, and generation.'
                }
              </p>
            </div>
            
            {premiumModels.length > 0 && (
              <div className="space-y-1">
                {premiumModels.map((model) => (
                  <div key={model.id} className="flex items-center gap-2 p-2 hover:bg-fd-muted/50 transition-colors">
                    <Dot className="size-4 text-fd-primary flex-shrink-0" />
                    <span className="text-sm text-fd-foreground truncate">
                      {model.id.split('/')[1] || model.id}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SectionWrap>
  );
}

function ModelItem({ model, lang }: { model: Model, lang: 'cn' | 'en' }) {
  return (
    <FeatureCard
      feature={{
        title: model.title[lang],
        icon: model.icon,
        description: model.description[lang],
        meta: model.name,
      }}
    />
  );
}
