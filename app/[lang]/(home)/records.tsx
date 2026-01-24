"use client";
import { useParams } from 'next/navigation';
import {
  FileText,
  Camera,
  ImagePlus,
  Link,
  File,
  Mic
} from 'lucide-react';
import SectionWrap from './section-wrap';

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
    cn: "随时碎片记录，AI 一键整理",
    en: "Record fragments anytime, AI organizes with one click",
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

  return (
    <SectionWrap isPadding={false}>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{sectionTitle}</h1>
          <p className="text-fd-muted-foreground text-sm">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recordFeatures.map((feature, index) => (
            <RecordFeatureItem key={index} feature={feature} lang={lang} />
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

function RecordFeatureItem({ feature, lang }: { feature: RecordFeature, lang: 'cn' | 'en' }) {
  return (
    <div className="p-6 relative overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10 flex flex-col gap-3 border-[0.5px] border-fd-border hover:bg-fd-muted/50 transition-colors">
      <div className="flex items-center gap-2 text-fd-primary">
        {feature.icon}
        <h3 className="font-semibold text-lg">{feature.title[lang]}</h3>
      </div>
      <p className="text-sm text-fd-muted-foreground leading-relaxed">
        {feature.description[lang]}
      </p>
    </div>
  );
}
