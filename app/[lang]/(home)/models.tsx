import { Dot, Eye, MessageSquare, Move3D, Sparkles } from 'lucide-react';
import SectionWrap from './section-wrap';
import Image from 'next/image';

type Model = {
  icon: React.ReactNode;
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
    cn: "开箱即用的免费模型",
    en: "Ready-to-Use Free Models",
  }[lang];

  const sectionDescription = {
    cn: "这些模型都是由 SiliconFlow 提供服务支持",
    en: "All models are powered by SiliconFlow services",
  }[lang];

  const models: Model[] = [
    {
      icon: <MessageSquare className="size-4" />,
      name: "Qwen/Qwen3-8B",
      title: {
        cn: "对话模型",
        en: "Conversation Model",
      },
      description: {
        cn: "适用于日常对话、文本生成等场景",
        en: "Suitable for daily conversations, text generation and other scenarios",
      },
    },
    {
      icon: <Move3D className="size-4" />,
      name: "BAAI/bge-m3",
      title: {
        cn: "嵌入模型",
        en: "Embedding Model",
      },
      description: {
        cn: "用于文本向量化、语义搜索等功能",
        en: "Used for text vectorization, semantic search and other functions",
      },
    },
    {
      icon: <Eye className="size-4" />,
      name: "THUDM/GLM-4.1V-9B-Thinking",
      title: {
        cn: "视觉模型",
        en: "Vision Model",
      },
      description: {
        cn: "支持图像理解、OCR识别等视觉任务",
        en: "Supports image understanding, OCR recognition and other visual tasks",
      },
    },
  ];

  return (
    <SectionWrap isPadding={false}>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex justify-between items-start mb-6">
          <div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <ModelItem key={index} model={model} lang={lang} />
          ))}
        </div>

         <ul className="mt-6 list-disc">
          <li className="text-sm text-fd-muted-foreground leading-relaxed mt-6">
            {lang === 'cn' 
              ? '免费模型能力有限，如果需要更强大的模型，请配置自定义模型。'
              : 'Free models have limited capabilities, if you need more powerful models, please configure custom models.'
            }
          </li>
        </ul>

        {/* 限时体验模型 */}
        {premiumModels.length > 0 && (
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'cn' ? '限时体验模型' : 'Limited-Time Trial Models'}
              </h2>
              <p className="text-fd-muted-foreground text-sm">
                {lang === 'cn' 
                  ? '体验更强大的顶级模型性能，限时使用' 
                  : 'Experience more powerful top-tier model performance, limited-time usage'
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
    <div className="flex flex-col gap-2 p-4 border border-fd-border border-dashed rounded-lg hover:bg-fd-muted/50 transition-colors">
      <div className="flex items-center gap-2 text-fd-primary">
        {model.icon}
        <h3 className="font-semibold text-lg">{model.title[lang]}</h3>
      </div>
      <p className="text-sm font-mono text-fd-muted-foreground bg-fd-muted px-2 py-1 rounded">
        {model.name}
      </p>
      <p className="text-sm text-fd-muted-foreground">
        {model.description[lang]}
      </p>
    </div>
  );
}
