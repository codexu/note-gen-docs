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
      cn: '按模板整理成文',
      en: 'Turn captures into notes',
    },
    subtitle: {
      cn: '选择整理模板和记录范围，确认要整理的素材，再让 AI 生成一篇可继续编辑的 Markdown 笔记。',
      en: 'Choose a template, select records, and let AI draft an editable Markdown note.',
    },
    features: [
      {
        icon: <Sparkles className="size-5" />,
        title: {
          cn: '模板驱动整理',
          en: 'Template-based organizing',
        },
        tag: {
          cn: '模板',
          en: 'Template',
        },
        description: {
          cn: '选择已启用的整理模板，也可以沿用上次使用的模板。',
          en: 'Use enabled templates or continue with your last one.',
        },
      },
      {
        icon: <Brain className="size-5" />,
        title: {
          cn: '灵活选择素材',
          en: 'Flexible record selection',
        },
        tag: {
          cn: '选择',
          en: 'Select',
        },
        description: {
          cn: '可按时间范围和标签筛选，也可以手动勾选要整理的记录。',
          en: 'Filter by range or tags, or manually pick records.',
        },
      },
      {
        icon: <Lightbulb className="size-5" />,
        title: {
          cn: '多类型素材预览',
          en: 'Preview every record type',
        },
        tag: {
          cn: '预览',
          en: 'Preview',
        },
        description: {
          cn: '文本、图片、链接、录音、待办等内容都能一起整理。',
          en: 'Text, images, links, audio, and todos can be combined.',
        },
      },
      {
        icon: <FileOutput className="size-5" />,
        title: {
          cn: '实时生成成文',
          en: 'Stream into a note',
        },
        tag: {
          cn: '生成',
          en: 'Draft',
        },
        description: {
          cn: '设置标题、保存位置和生成要求，输出可编辑的 Markdown。',
          en: 'Set title, location, and rules, then draft Markdown.',
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
                {lang === 'cn' ? '记录工作台' : 'Capture desk'}
              </div>
              <h1 className="text-3xl font-bold mb-4">{sectionTitle}</h1>
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

      <SectionWrap isPadding={false} className="h-6 sm:h-8 lg:h-12"><span></span></SectionWrap>

      <SectionWrap isPadding={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12 border-b lg:border-b-0 border-fd-border border-dashed">
            <div>
              <div className="flex items-center gap-2 text-fd-muted-foreground text-xs mb-4">
                <Sparkles className="size-4" />
                {lang === 'cn' ? '整理工作台' : 'Organize desk'}
              </div>
              <h1 className="text-3xl font-bold mb-4">{aiOrganizeInfo.title[lang]}</h1>
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
      cn: '记录箱',
      en: 'Records',
    },
  };

  const floatingRecords = [
    { icon: <FileText className="size-4" />, className: 'left-1/2 top-2 w-32 -translate-x-1/2', lineClassName: 'left-1/2 top-[4rem] h-14 border-l -translate-x-1/2', flightClassName: 'record-flight-1', lineWidth: 'w-16' },
    { icon: <Camera className="size-4" />, className: 'left-9 top-14 w-28', lineClassName: 'left-[8.5rem] top-[6.75rem] w-16 rotate-[22deg] border-t', flightClassName: 'record-flight-2', lineWidth: 'w-12' },
    { icon: <ImagePlus className="size-4" />, className: 'right-9 top-14 w-28', lineClassName: 'right-[8.5rem] top-[6.75rem] w-16 -rotate-[22deg] border-t', flightClassName: 'record-flight-3', lineWidth: 'w-14' },
    { icon: <Link className="size-4" />, className: 'left-5 top-[11rem] w-28', lineClassName: 'left-[8.25rem] top-[12.4rem] w-20 border-t', flightClassName: 'record-flight-4', lineWidth: 'w-16' },
    { icon: <File className="size-4" />, className: 'right-5 top-[11rem] w-28', lineClassName: 'right-[8.25rem] top-[12.4rem] w-20 border-t', flightClassName: 'record-flight-5', lineWidth: 'w-12' },
    { icon: <Mic className="size-4" />, className: 'left-12 bottom-12 w-28', lineClassName: 'left-[9rem] bottom-[8rem] w-16 -rotate-[22deg] border-t', flightClassName: 'record-flight-6', lineWidth: 'w-10' },
    { icon: <ListTodo className="size-4" />, className: 'right-12 bottom-12 w-28', lineClassName: 'right-[9rem] bottom-[8rem] w-16 rotate-[22deg] border-t', flightClassName: 'record-flight-7', lineWidth: 'w-14' },
    { icon: <Sparkles className="size-4" />, className: 'left-1/2 bottom-2 w-32 -translate-x-1/2', lineClassName: 'left-1/2 bottom-[4rem] h-12 border-l -translate-x-1/2', flightClassName: 'record-flight-8', lineWidth: 'w-12' },
  ];

  return (
    <div className="record-illustration relative min-h-[380px] w-full overflow-hidden">
      {floatingRecords.map((record, index) => (
        <div
          key={`line-${index}`}
          className={`record-connector absolute border-fd-border border-dashed opacity-70 ${record.lineClassName}`}
          style={{ animationDelay: `${index * 800}ms` }}
        />
      ))}

      {floatingRecords.map((record, index) => (
        <div key={index} className={`record-source-wrap absolute ${record.className} ${record.flightClassName}`}>
          <div
            className="record-source-card w-full border border-fd-border border-dashed bg-background p-2.5 flex items-center gap-2.5 text-fd-muted-foreground"
            style={{ animationDelay: `${index * 800}ms` }}
          >
            <div className="text-fd-primary">
              {record.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="record-card-line h-2 w-16 bg-fd-muted-foreground/30" />
              <div className="record-card-line h-2 w-full bg-fd-muted-foreground/15 mt-2" />
            </div>
          </div>
        </div>
      ))}

      <div className="record-inbox absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 border border-fd-border border-dashed bg-background">
        <div className="border-b border-fd-border border-dashed p-4 flex items-center justify-between">
          <div className="font-semibold text-sm">{copy.title[lang]}</div>
          <Inbox className="size-4 text-fd-primary" />
        </div>
        <div className="p-4">
          <div className="record-inbox-stream relative h-[7.5rem] overflow-hidden">
            {floatingRecords.map((record, index) => (
              <div
                key={`slot-${index}`}
                className="record-inbox-row absolute left-0 right-0 flex h-6 items-center gap-2 border border-fd-border border-dashed px-2 text-fd-primary"
                style={{ animationDelay: `${index * 800}ms` }}
              >
                {record.icon}
                <div className={`record-card-line h-1.5 ${record.lineWidth} bg-fd-muted-foreground/20`} />
              </div>
            ))}
          </div>
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
      cn: '记录箱',
      en: 'Records',
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
    <div className="organize-illustration relative flex min-h-[420px] w-full max-w-[30rem] items-center overflow-hidden">
      <div className="organize-motion-layer" aria-hidden="true">
        {materialItems.map((item, index) => (
          <div
            key={index}
            className="organize-moving-card flex h-8 w-32 items-center gap-2 border border-fd-border border-dashed bg-background px-3 text-fd-primary"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {item.icon}
            <div className={`h-1.5 ${item.lineWidth} bg-fd-muted-foreground/20`} />
          </div>
        ))}

        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="organize-result-card"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="h-1 w-8 bg-fd-primary/35" />
            <div className="h-1 w-5 bg-fd-muted-foreground/25" />
          </div>
        ))}

        <div className="organize-ai-pulse">
          <Sparkles className="size-4" />
        </div>
      </div>

      <div className="relative z-10 grid w-full grid-cols-[8rem_minmax(0.75rem,0.25fr)_8rem_minmax(0.75rem,0.25fr)_8rem] items-center">
        <div className="organize-stage organize-stage-inbox border border-fd-border border-dashed bg-background">
          <div className="border-b border-fd-border border-dashed p-3 flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.inbox[lang]}</span>
            <Inbox className="size-5 text-fd-primary" />
          </div>
          <div>
            {materialItems.map((item, index) => (
              <div
                key={index}
                className={`organize-material-row flex h-8 items-center gap-2 border-fd-border border-dashed px-3 text-fd-primary ${index === materialItems.length - 1 ? '' : 'border-b'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="organize-material-content flex items-center gap-2" style={{ animationDelay: `${index * 150}ms` }}>
                  {item.icon}
                  <div className={`organize-line h-1.5 ${item.lineWidth} bg-fd-muted-foreground/20`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="organize-flow-space" />

        <div className="organize-stage organize-stage-ai border border-fd-border border-dashed bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.ai[lang]}</span>
            <Brain className="organize-ai-brain size-7 text-fd-primary" />
          </div>
          <div className="mt-5 grid grid-cols-3 border border-fd-border border-dashed">
            {organizeIcons.map((icon, index) => (
              <div
                key={index}
                className={`organize-ai-step flex h-9 items-center justify-center text-fd-muted-foreground ${index === organizeIcons.length - 1 ? '' : 'border-r'} border-fd-border border-dashed`}
                style={{ animationDelay: `${index * 110}ms` }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className="organize-flow-space" />

        <div className="organize-stage organize-stage-draft border border-fd-border border-dashed bg-background">
          <div className="border-b border-fd-border border-dashed p-3 flex items-center justify-between">
            <span className="text-xs font-semibold">{labels.draft[lang]}</span>
            <FileText className="size-5 text-fd-primary" />
          </div>
          <div className="flex h-48 flex-col justify-center gap-3 p-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="organize-draft-block" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="flex items-center gap-2">
                  <div className="size-2 border border-fd-border border-dashed" />
                  <div className={`organize-line h-1.5 bg-fd-muted-foreground/35 ${index % 2 === 0 ? 'w-12' : 'w-14'}`} />
                </div>
                <div className="mt-2 ml-4 space-y-1.5">
                  <div className="organize-line h-1.5 w-full bg-fd-muted-foreground/15" />
                  <div className={`organize-line h-1.5 bg-fd-muted-foreground/15 ${index === 3 ? 'w-2/3' : 'w-4/5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
