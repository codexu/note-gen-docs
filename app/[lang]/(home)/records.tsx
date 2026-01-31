"use client";
import { useParams } from 'next/navigation';
import {
  FileText,
  Camera,
  ImagePlus,
  Link,
  File,
  Mic,
  Sparkles,
  Brain,
  Lightbulb,
  FileOutput
} from 'lucide-react';
import SectionWrap from './section-wrap';
import DisplayCards from '@/components/ui/display-cards';

type RecordFeature = {
  icon: React.ReactNode;
  title: {
    cn: string;
    en: string;
  };
  description: {
    cn: string;
    en: string;
  };
}

export default function HomeRecords() {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';

  const sectionTitle = {
    cn: "记录工具",
    en: "Recording Tools",
  }[lang];

  const sectionDescription = {
    cn: "随时随地碎片化记录，捕捉每个灵感瞬间",
    en: "Capture fragmented thoughts anytime, never miss an idea",
  }[lang];

  const recordFeatures: RecordFeature[] = [
    {
      icon: <FileText className="size-4" />,
      title: {
        cn: "文本记录",
        en: "Text Recording",
      },
      description: {
        cn: "快速记录文字内容",
        en: "Quickly record text content",
      },
    },
    {
      icon: <Camera className="size-4" />,
      title: {
        cn: "截图记录",
        en: "Screenshot Recording",
      },
      description: {
        cn: "使用 VLM 或 OCR 技术，快速捕捉屏幕内容",
        en: "Use VLM or OCR technology to quickly capture screen content",
      },
    },
    {
      icon: <ImagePlus className="size-4" />,
      title: {
        cn: "插图记录",
        en: "Image Recording",
      },
      description: {
        cn: "保存图片并图像识别，整理笔记时插入到适合的位置",
        en: "Save images with image recognition, insert to appropriate position when organizing notes",
      },
    },
    {
      icon: <Link className="size-4" />,
      title: {
        cn: "链接记录",
        en: "Link Recording",
      },
      description: {
        cn: "保存网页链接，自动抓取页面信息",
        en: "Save web links and automatically extract page information",
      },
    },
    {
      icon: <File className="size-4" />,
      title: {
        cn: "文件记录",
        en: "File Recording",
      },
      description: {
        cn: "支持纯文本、PDF 等文本识别",
        en: "Support text recognition for plain text, PDF, etc.",
      },
    },
    {
      icon: <Mic className="size-4" />,
      title: {
        cn: "语音记录",
        en: "Voice Recording",
      },
      description: {
        cn: "语音转文字功能，将口述内容自动转换为文本",
        en: "Voice-to-text functionality automatically converts spoken content to text",
      },
    },
  ];

  // DisplayCards 配置 - 使用 recordFeatures 的内容
  const cardClassNames = [
    '[grid-area:stack] hover:-translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[""] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0',
    '[grid-area:stack] translate-x-8 translate-y-8 hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[""] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0',
    '[grid-area:stack] translate-x-16 translate-y-16 hover:-translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[""] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0',
    '[grid-area:stack] translate-x-24 translate-y-24 hover:translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[""] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0',
    '[grid-area:stack] translate-x-32 translate-y-32 hover:translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[""] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0',
    '[grid-area:stack] translate-x-40 translate-y-40 hover:translate-y-20',
  ];

  const displayCardsConfig = [...recordFeatures].reverse().map((feature, index) => ({
    icon: <div className="text-blue-300">{feature.icon}</div>,
    title: feature.title[lang],
    description: feature.description[lang],
    date: '',
    iconClassName: 'text-blue-500',
    titleClassName: 'text-blue-500',
    className: cardClassNames[index],
  }));

  // AI 整理功能的介绍
  const aiOrganizeInfo = {
    title: {
      cn: 'AI 整理',
      en: 'AI Organization',
    },
    subtitle: {
      cn: '将碎片记录转化为完整笔记',
      en: 'Transform fragments into complete notes',
    },
    features: [
      {
        icon: <Sparkles className="size-5" />,
        title: {
          cn: '一键生成',
          en: 'One-Click Generation',
        },
        description: {
          cn: '整合所有相关记录，生成结构完整的笔记文档',
          en: 'Integrate all related records into complete notes',
        },
      },
      {
        icon: <FileOutput className="size-5" />,
        title: {
          cn: '拖拽插入',
          en: 'Drag to Insert',
        },
        description: {
          cn: '可随意拖拽记录到已存在的笔记中',
          en: 'Drag records into existing notes with ease',
        },
      },
      {
        icon: <Brain className="size-5" />,
        title: {
          cn: '标签管理',
          en: 'Tag Management',
        },
        description: {
          cn: '通过标签组织和管理记录，方便查找和归类',
          en: 'Organize and manage records with tags for easy access',
        },
      },
      {
        icon: <Lightbulb className="size-5" />,
        title: {
          cn: '整理模板',
          en: 'Organization Templates',
        },
        description: {
          cn: '支持时间范围选择、自定义提示词等灵活配置',
          en: 'Flexible configuration with time range and custom prompts',
        },
      },
    ],
  };

  return (
    <SectionWrap isPadding={false}>
      {/* 左右布局：左侧记录工具，右侧 AI 整理 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
        {/* 左侧：记录工具 */}
        <div className="space-y-6 p-6 md:p-8 lg:p-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>
              <p className="text-fd-muted-foreground text-sm">{sectionDescription}</p>
            </div>
            <div className="flex justify-center items-center max-md:mb-24 min-h-[240px] lg:-translate-x-16">
              <DisplayCards cards={displayCardsConfig} />
            </div>
          </div>

          {/* 右侧：AI 整理介绍 */}
          <div className="space-y-6 p-6 md:p-8 lg:p-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">{aiOrganizeInfo.title[lang]}</h2>
              <p className="text-fd-muted-foreground text-sm">{aiOrganizeInfo.subtitle[lang]}</p>
            </div>

            <div className="space-y-4">
              {aiOrganizeInfo.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-fd-muted/30 border border-fd-border/50 hover:bg-fd-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 text-fd-primary mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title[lang]}</h3>
                    <p className="text-sm text-fd-muted-foreground">{feature.description[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 中间虚线分隔符 */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none">
            <div className="h-full border-l border-dashed border-fd-border"></div>
          </div>
      </div>
    </SectionWrap>
  );
}
