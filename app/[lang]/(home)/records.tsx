"use client";
import { useParams } from 'next/navigation';
import {
  FileText,
  Camera,
  ImagePlus,
  Link,
  File,
  Mic,
  ListTodo,
  Sparkles,
  Brain,
  Lightbulb,
  FileOutput,
  Inbox
} from 'lucide-react';
import SectionWrap from './section-wrap';

type RecordFeature = {
  icon: React.ReactNode;
  title: {
    cn: string;
    en: string;
  };
  time: {
    cn: string;
    en: string;
  };
  description: {
    cn: string;
    en: string;
  };
}

type OrganizeFeature = {
  icon: React.ReactNode;
  title: {
    cn: string;
    en: string;
  };
  tag: {
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
    cn: "把任何素材先留下",
    en: "Capture anything first",
  }[lang];

  const sectionDescription = {
    cn: "看到什么、想到什么，都可以先放进记录里。等到需要输出时，再决定如何整理。",
    en: "Save what you see and what you think first. Organize only when you need to write.",
  }[lang];

  const recordFeatures: RecordFeature[] = [
    {
      icon: <FileText className="size-4" />,
      title: {
        cn: "文本记录",
        en: "Text Recording",
      },
      time: {
        cn: "2 分钟前",
        en: "2m ago",
      },
      description: {
        cn: "粘贴想法、摘录、草稿，快速保存文字内容。",
        en: "Save thoughts, snippets, and drafts quickly.",
      },
    },
    {
      icon: <Camera className="size-4" />,
      title: {
        cn: "截图记录",
        en: "Screenshot Recording",
      },
      time: {
        cn: "12 分钟前",
        en: "12m ago",
      },
      description: {
        cn: "截取屏幕内容，通过 OCR 或 VLM 识别文字和画面。",
        en: "Capture the screen and recognize text or visuals.",
      },
    },
    {
      icon: <ImagePlus className="size-4" />,
      title: {
        cn: "插图记录",
        en: "Image Recording",
      },
      time: {
        cn: "28 分钟前",
        en: "28m ago",
      },
      description: {
        cn: "保存图片素材，整理时插入到合适的笔记位置。",
        en: "Keep image references for later notes.",
      },
    },
    {
      icon: <Link className="size-4" />,
      title: {
        cn: "链接记录",
        en: "Link Recording",
      },
      time: {
        cn: "1 小时前",
        en: "1h ago",
      },
      description: {
        cn: "保存网页链接，自动提取标题和页面信息。",
        en: "Save links and extract page details.",
      },
    },
    {
      icon: <File className="size-4" />,
      title: {
        cn: "文件记录",
        en: "File Recording",
      },
      time: {
        cn: "2 小时前",
        en: "2h ago",
      },
      description: {
        cn: "导入纯文本、PDF 等文件，提取可用内容。",
        en: "Import text and PDF files as usable material.",
      },
    },
    {
      icon: <Mic className="size-4" />,
      title: {
        cn: "语音记录",
        en: "Voice Recording",
      },
      time: {
        cn: "4 小时前",
        en: "4h ago",
      },
      description: {
        cn: "口述想法，自动转成文字记录。",
        en: "Dictate ideas and turn them into text.",
      },
    },
    {
      icon: <ListTodo className="size-4" />,
      title: {
        cn: "待办记录",
        en: "Todo Recording",
      },
      time: {
        cn: "昨天",
        en: "Yesterday",
      },
      description: {
        cn: "把临时任务先记下来，整理时保留行动项。",
        en: "Save quick tasks and keep action items visible.",
      },
    },
  ];

  const aiOrganizeInfo = {
    title: {
      cn: '整理时再决定结构',
      en: 'Organize when it matters',
    },
    subtitle: {
      cn: '记录先自由进入记录箱，真正要写的时候，再让 AI 帮你归并、排序并生成草稿。',
      en: 'Keep captures loose first. When you need to write, let AI group, order, and draft.',
    },
    features: [
      {
        icon: <Sparkles className="size-5" />,
        title: {
          cn: '筛选相关记录',
          en: 'Select related captures',
        },
        tag: {
          cn: '选择',
          en: 'Select',
        },
        description: {
          cn: '从记录箱里挑出同一主题的素材。',
          en: 'Pick material around one topic.',
        },
      },
      {
        icon: <Brain className="size-5" />,
        title: {
          cn: '交给 AI 整理',
          en: 'Ask AI to organize',
        },
        tag: {
          cn: '整理',
          en: 'Organize',
        },
        description: {
          cn: '自动归并重点、删除重复并补齐上下文。',
          en: 'Group points, remove repeats, and add context.',
        },
      },
      {
        icon: <Lightbulb className="size-5" />,
        title: {
          cn: '生成笔记大纲',
          en: 'Create an outline',
        },
        tag: {
          cn: '大纲',
          en: 'Outline',
        },
        description: {
          cn: '先得到标题、层级和段落顺序。',
          en: 'Get headings, hierarchy, and section order.',
        },
      },
      {
        icon: <FileOutput className="size-5" />,
        title: {
          cn: '补成 Markdown 草稿',
          en: 'Draft in Markdown',
        },
        tag: {
          cn: '草稿',
          en: 'Draft',
        },
        description: {
          cn: '把素材放进合适位置，生成可继续编辑的文档。',
          en: 'Place material into an editable note.',
        },
      },
    ],
  };

  return (
    <>
      <SectionWrap isPadding={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12 border-b lg:border-b-0 border-fd-border border-dashed">
            <div>
              <div className="flex items-center gap-2 text-fd-muted-foreground text-xs mb-4">
                <Inbox className="size-4" />
                {lang === 'cn' ? '记录列表' : 'Record list'}
              </div>
              <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>
              <p className="text-fd-muted-foreground text-sm leading-relaxed">{sectionDescription}</p>
            </div>

            <div className="mt-8 border border-fd-border border-dashed">
              {recordFeatures.map((feature, index) => (
                <RecordListItem key={index} feature={feature} lang={lang} index={index} isLast={index === recordFeatures.length - 1} />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 flex items-center">
            <RecordIllustration lang={lang} />
          </div>
        </div>
      </SectionWrap>

      <SectionWrap isPadding={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12 border-b lg:border-b-0 border-fd-border border-dashed">
            <div>
              <div className="flex items-center gap-2 text-fd-muted-foreground text-xs mb-4">
                <Sparkles className="size-4" />
                {lang === 'cn' ? '整理工作台' : 'Organize desk'}
              </div>
              <h2 className="text-xl font-semibold mb-4">{aiOrganizeInfo.title[lang]}</h2>
              <p className="text-fd-muted-foreground text-sm leading-relaxed">{aiOrganizeInfo.subtitle[lang]}</p>
            </div>

            <div className="mt-8 border border-fd-border border-dashed">
              {aiOrganizeInfo.features.map((feature, index) => (
                <OrganizeListItem key={index} feature={feature} lang={lang} isLast={index === aiOrganizeInfo.features.length - 1} />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 flex items-center justify-center">
            <OrganizeIllustration lang={lang} />
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

function RecordListItem({ feature, lang, isLast }: { feature: RecordFeature, lang: 'cn' | 'en', index: number, isLast: boolean }) {
  return (
    <div className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-4 py-3 hover:bg-fd-muted/50 transition-colors ${isLast ? '' : 'border-b'} border-fd-border border-dashed`}>
      <div className="text-fd-primary">
        {feature.icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-sm">{feature.title[lang]}</h3>
        <p className="text-xs text-fd-muted-foreground line-clamp-1 mt-1">{feature.description[lang]}</p>
      </div>
      <span className="text-xs text-fd-muted-foreground whitespace-nowrap">{feature.time[lang]}</span>
    </div>
  );
}

function RecordIllustration({ lang }: { lang: 'cn' | 'en' }) {
  const copy = {
    title: {
      cn: '统一进入记录箱',
      en: 'One record inbox',
    },
    note: {
      cn: '不用先判断位置，也不用立刻写成文章。',
      en: 'No folder choice, no writing pressure.',
    },
  };

  const floatingRecords = [
    { icon: <FileText className="size-4" />, className: 'left-6 top-8 w-40', lineClassName: 'left-44 top-[4.25rem] w-28 rotate-[28deg]' },
    { icon: <Camera className="size-4" />, className: 'right-6 top-10 w-36', lineClassName: 'right-40 top-[4.75rem] w-28 -rotate-[30deg]' },
    { icon: <ImagePlus className="size-4" />, className: 'left-16 top-28 w-32', lineClassName: 'left-48 top-[8.75rem] w-24 rotate-[18deg]' },
    { icon: <Link className="size-4" />, className: 'right-16 top-30 w-40', lineClassName: 'right-56 top-[9.25rem] w-24 -rotate-[18deg]' },
    { icon: <File className="size-4" />, className: 'left-8 top-48 w-36', lineClassName: 'left-44 top-[13.5rem] w-28 rotate-[6deg]' },
    { icon: <Mic className="size-4" />, className: 'right-8 top-52 w-32', lineClassName: 'right-40 top-[14.25rem] w-28 -rotate-[8deg]' },
    { icon: <ListTodo className="size-4" />, className: 'left-1/2 top-20 w-36 -translate-x-1/2', lineClassName: 'left-1/2 top-[8rem] h-36 border-l -translate-x-1/2' },
  ];

  return (
    <div className="relative min-h-[420px] w-full overflow-hidden">
      {floatingRecords.map((record, index) => (
        <div key={`line-${index}`} className={`absolute border-t border-fd-border border-dashed opacity-70 ${record.lineClassName}`} />
      ))}

      {floatingRecords.map((record, index) => (
        <div key={index} className={`absolute ${record.className} border border-fd-border border-dashed bg-background p-3 flex items-center gap-3 text-fd-muted-foreground`}>
          <div className="text-fd-primary">
            {record.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-2 w-16 bg-fd-muted-foreground/30" />
            <div className="h-2 w-full bg-fd-muted-foreground/15 mt-2" />
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 bottom-8 w-72 -translate-x-1/2 border border-fd-border border-dashed bg-background">
        <div className="border-b border-fd-border border-dashed p-4 flex items-center justify-between">
          <div className="font-semibold text-sm">{copy.title[lang]}</div>
          <Inbox className="size-4 text-fd-primary" />
        </div>
        <div className="p-4">
          <div className="h-2 w-28 bg-fd-muted-foreground/30" />
          <div className="h-2 w-36 bg-fd-muted-foreground/15 mt-3" />
          <div className="h-2 w-20 bg-fd-muted-foreground/15 mt-3" />
          <p className="text-xs text-fd-muted-foreground mt-5 leading-relaxed">{copy.note[lang]}</p>
        </div>
      </div>
    </div>
  );
}

function OrganizeListItem({ feature, lang, isLast }: { feature: OrganizeFeature, lang: 'cn' | 'en', isLast: boolean }) {
  return (
    <div className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-4 py-3 hover:bg-fd-muted/50 transition-colors ${isLast ? '' : 'border-b'} border-fd-border border-dashed`}>
      <div className="text-fd-primary">
        {feature.icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-sm">{feature.title[lang]}</h3>
        <p className="text-xs text-fd-muted-foreground line-clamp-1 mt-1">{feature.description[lang]}</p>
      </div>
      <span className="text-xs text-fd-muted-foreground whitespace-nowrap">{feature.tag[lang]}</span>
    </div>
  );
}

function OrganizeIllustration({ lang }: { lang: 'cn' | 'en' }) {
  const labels = {
    inbox: {
      cn: '收集箱',
      en: 'Inbox',
    },
    ai: {
      cn: 'AI',
      en: 'AI',
    },
    draft: {
      cn: '成文',
      en: 'Draft',
    },
  };

  const materialItems = [
    { icon: <FileText className="size-4" />, lineWidth: 'w-12' },
    { icon: <Camera className="size-4" />, lineWidth: 'w-10' },
    { icon: <ImagePlus className="size-4" />, lineWidth: 'w-14' },
    { icon: <Link className="size-4" />, lineWidth: 'w-11' },
    { icon: <File className="size-4" />, lineWidth: 'w-12' },
    { icon: <Mic className="size-4" />, lineWidth: 'w-10' },
  ];

  const organizeIcons = [
    <Sparkles key="sparkles" className="size-4" />,
    <Lightbulb key="lightbulb" className="size-4" />,
    <FileOutput key="file-output" className="size-4" />,
  ];

  return (
    <div className="relative flex min-h-[420px] w-full max-w-[30rem] items-center overflow-hidden">
      <div className="grid w-full grid-cols-[8rem_minmax(0.75rem,0.25fr)_8rem_minmax(0.75rem,0.25fr)_8rem] items-center">
        <div className="border border-fd-border border-dashed bg-background">
          <div className="border-b border-fd-border border-dashed p-3 flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.inbox[lang]}</span>
            <Inbox className="size-5 text-fd-primary" />
          </div>
          <div>
            {materialItems.map((item, index) => (
              <div key={index} className={`flex h-8 items-center gap-2 border-fd-border border-dashed px-3 text-fd-primary ${index === materialItems.length - 1 ? '' : 'border-b'}`}>
                {item.icon}
                <div className={`h-1.5 ${item.lineWidth} bg-fd-muted-foreground/20`} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-fd-border border-dashed" />

        <div className="border border-fd-border border-dashed bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.ai[lang]}</span>
            <Brain className="size-7 text-fd-primary" />
          </div>
          <div className="mt-5 grid grid-cols-3 border border-fd-border border-dashed">
            {organizeIcons.map((icon, index) => (
              <div key={index} className={`flex h-9 items-center justify-center text-fd-muted-foreground ${index === organizeIcons.length - 1 ? '' : 'border-r'} border-fd-border border-dashed`}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-fd-border border-dashed" />

        <div className="border border-fd-border border-dashed bg-background">
          <div className="border-b border-fd-border border-dashed p-3 flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.draft[lang]}</span>
            <FileText className="size-5 text-fd-primary" />
          </div>
          <div className="p-4 space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <div className="size-2 border border-fd-border border-dashed" />
                  <div className="h-1.5 w-14 bg-fd-muted-foreground/35" />
                </div>
                <div className="mt-2 ml-4 space-y-1.5">
                  <div className="h-1.5 w-full bg-fd-muted-foreground/15" />
                  <div className="h-1.5 w-4/5 bg-fd-muted-foreground/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
