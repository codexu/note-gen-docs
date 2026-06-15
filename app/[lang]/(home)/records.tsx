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

  const recordItems: SvgRecordItem[] = [
    { kind: 'text', x: 202, y: 18, dx: '0px', dy: '148px', lineWidth: 52 },
    { kind: 'camera', x: 48, y: 64, dx: '154px', dy: '118px', lineWidth: 44 },
    { kind: 'image', x: 356, y: 64, dx: '-154px', dy: '118px', lineWidth: 50 },
    { kind: 'link', x: 28, y: 146, dx: '174px', dy: '53px', lineWidth: 56 },
    { kind: 'file', x: 376, y: 146, dx: '-174px', dy: '53px', lineWidth: 46 },
    { kind: 'mic', x: 58, y: 270, dx: '144px', dy: '-88px', lineWidth: 40 },
    { kind: 'todo', x: 346, y: 270, dx: '-144px', dy: '-88px', lineWidth: 52 },
    { kind: 'sparkles', x: 202, y: 326, dx: '0px', dy: '-144px', lineWidth: 44 },
  ];

  return (
    <svg
      className="record-svg-illustration"
      viewBox="0 0 520 380"
      role="img"
      aria-label={copy.title[lang]}
    >
      <g>
        {recordItems.map((record, index) => (
          <line
            key={`connector-${index}`}
            className="record-svg-connector"
            x1={record.x + 58}
            y1={record.y + 17}
            x2="260"
            y2="204"
            style={{ animationDelay: `${index * 800}ms` }}
          />
        ))}
      </g>

      {recordItems.map((record, index) => (
        <g key={`source-${index}`} transform={`translate(${record.x} ${record.y})`}>
          <g
            className="record-svg-source"
            style={{
              animationDelay: `${index * 800}ms`,
              '--record-svg-x': record.dx,
              '--record-svg-y': record.dy,
            } as React.CSSProperties}
          >
            <rect className="flow-svg-panel" width="116" height="34" />
            <SvgIcon kind={record.kind} x={12} y={9} size={16} />
            <rect className="flow-svg-line-strong" x="36" y="10" width={record.lineWidth} height="4" rx="2" />
            <rect className="flow-svg-line" x="36" y="20" width="66" height="4" rx="2" />
          </g>
        </g>
      ))}

      <g className="record-svg-inbox" transform="translate(180 126)">
        <rect className="flow-svg-panel" width="160" height="150" />
        <line className="flow-svg-border" x1="0" y1="42" x2="160" y2="42" />
        <text className="flow-svg-title" x="16" y="27">{copy.title[lang]}</text>
        <SvgIcon kind="inbox" x={132} y={13} size={17} />

        <svg x="16" y="56" width="128" height="78" overflow="hidden">
          {recordItems.map((record, index) => (
            <g
              key={`row-${index}`}
              className="record-svg-row"
              style={{ animationDelay: `${index * 800}ms` }}
            >
              <rect className="flow-svg-panel-soft" width="128" height="22" />
              <SvgIcon kind={record.kind} x={8} y={4} size={14} />
              <rect className="flow-svg-line" x="30" y="9" width={record.lineWidth} height="4" rx="2" />
            </g>
          ))}
        </svg>
      </g>
    </svg>
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

  const materialItems: SvgMaterialItem[] = [
    { kind: 'text', lineWidth: 48 },
    { kind: 'camera', lineWidth: 40 },
    { kind: 'image', lineWidth: 54 },
    { kind: 'link', lineWidth: 44 },
    { kind: 'file', lineWidth: 48 },
    { kind: 'mic', lineWidth: 40 },
  ];

  const aiSteps: SvgIconKind[] = [
    'sparkles',
    'lightbulb',
    'output',
  ];

  return (
    <svg
      className="organize-svg-illustration"
      viewBox="0 0 520 380"
      role="img"
      aria-label={labels.draft[lang]}
    >
      <g className="organize-svg-stage" transform="translate(32 92)">
        <rect className="flow-svg-panel" width="132" height="196" />
        <line className="flow-svg-border" x1="0" y1="38" x2="132" y2="38" />
        <text className="flow-svg-title" x="14" y="25">{labels.inbox[lang]}</text>
        <SvgIcon kind="inbox" x={104} y={12} size={16} />

        {materialItems.map((item, index) => (
          <g
            key={index}
            className="organize-svg-row"
            transform={`translate(14 ${52 + index * 24})`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <rect className="flow-svg-panel-soft" width="104" height="20" />
            <SvgIcon kind={item.kind} x={8} y={3} size={14} />
            <rect className="flow-svg-line" x="30" y="8" width={item.lineWidth} height="4" rx="2" />
          </g>
        ))}
      </g>

      <g className="organize-svg-stage organize-svg-ai" transform="translate(210 138)">
        <rect className="flow-svg-panel" width="100" height="104" />
        <text className="flow-svg-title" x="14" y="25">{labels.ai[lang]}</text>
        <SvgIcon kind="brain" x={66} y={11} size={20} />
        <g transform="translate(14 56)">
          <rect className="flow-svg-panel-soft" width="72" height="30" />
          {aiSteps.map((kind, index) => (
            <g
              key={kind}
              className="organize-svg-ai-step"
              transform={`translate(${index * 24} 0)`}
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <SvgIcon kind={kind} x={5} y={7} size={13} />
            </g>
          ))}
        </g>
      </g>

      <g className="organize-svg-stage" transform="translate(356 92)">
        <rect className="flow-svg-panel" width="132" height="196" />
        <line className="flow-svg-border" x1="0" y1="38" x2="132" y2="38" />
        <text className="flow-svg-title" x="14" y="25">{labels.draft[lang]}</text>
        <SvgIcon kind="text" x={104} y={11} size={17} />

        {[0, 1, 2, 3].map((index) => (
          <g
            key={index}
            className="organize-svg-draft-block"
            transform={`translate(16 ${56 + index * 32})`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <rect className="flow-svg-dot" x="0" y="1" width="7" height="7" />
            <rect className="organize-svg-draft-line flow-svg-line-strong" x="14" y="2" width={index % 2 === 0 ? 44 : 54} height="4" rx="2" />
            <rect className="organize-svg-draft-line flow-svg-line" x="14" y="14" width="90" height="4" rx="2" />
            <rect className="organize-svg-draft-line flow-svg-line" x="14" y="23" width={index === 3 ? 58 : 76} height="4" rx="2" />
          </g>
        ))}
      </g>

      <g aria-hidden="true">
        {materialItems.map((item, index) => {
          const startY = 144 + index * 24;
          return (
            <g key={`moving-${index}`} transform={`translate(46 ${startY})`}>
              <g
                className="organize-svg-moving-card"
                style={{
                  animationDelay: `${index * 120}ms`,
                  '--organize-move-x': '166px',
                  '--organize-move-y': `${190 - (startY + 10)}px`,
                  '--organize-mid-y': `${(190 - (startY + 10)) * 0.68}px`,
                } as React.CSSProperties}
              >
                <rect className="flow-svg-panel" width="104" height="20" />
                <SvgIcon kind={item.kind} x={8} y={3} size={14} />
                <rect className="flow-svg-line" x="30" y="8" width={item.lineWidth} height="4" rx="2" />
              </g>
            </g>
          );
        })}

        {[0, 1, 2].map((index) => (
          <g key={`result-${index}`} transform={`translate(242 ${174 + index * 18})`}>
            <g
              className="organize-svg-result-card"
              style={{
                animationDelay: `${index * 90}ms`,
                '--organize-result-y': `${(index - 1) * 4}px`,
              } as React.CSSProperties}
            >
              <rect className="flow-svg-panel" width="44" height="14" />
              <rect className="flow-svg-line-strong" x="7" y="4" width="26" height="3" rx="1.5" />
              <rect className="flow-svg-line" x="7" y="9" width="18" height="3" rx="1.5" />
            </g>
          </g>
        ))}

        <g transform="translate(260 190)">
          <g className="organize-svg-ai-pulse">
            <circle className="organize-svg-pulse-ring" r="21" />
            <SvgIcon kind="sparkles" x={-8} y={-8} size={16} />
          </g>
        </g>
      </g>
    </svg>
  );
}

type SvgIconKind = 'text' | 'camera' | 'image' | 'link' | 'file' | 'mic' | 'todo' | 'sparkles' | 'inbox' | 'brain' | 'lightbulb' | 'output';

type SvgRecordItem = {
  kind: SvgIconKind;
  x: number;
  y: number;
  dx: string;
  dy: string;
  lineWidth: number;
}

type SvgMaterialItem = {
  kind: SvgIconKind;
  lineWidth: number;
}

function SvgIcon({ kind, x = 0, y = 0, size = 16 }: { kind: SvgIconKind, x?: number, y?: number, size?: number }) {
  return (
    <g
      className="flow-svg-icon"
      transform={`translate(${x} ${y}) scale(${size / 16})`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === 'text' && (
        <>
          <path d="M4 2.5h5.2L12 5.3v8.2H4z" />
          <path d="M9.2 2.5v3h2.8" />
          <path d="M6 8h4.8M6 10.5h4.8" />
        </>
      )}
      {kind === 'camera' && (
        <>
          <path d="M3 5.2h2.7l1-1.7h2.6l1 1.7H13v7.3H3z" />
          <circle cx="8" cy="8.8" r="2" />
        </>
      )}
      {kind === 'image' && (
        <>
          <rect x="3" y="3.5" width="10" height="9" />
          <path d="M4.5 11l2.3-2.4 1.7 1.7 2.1-2.7 1.9 3.4" />
          <circle cx="6.2" cy="6.1" r=".8" />
        </>
      )}
      {kind === 'link' && (
        <>
          <path d="M6.8 5.3l1-1a3 3 0 0 1 4.2 4.2l-1 1" />
          <path d="M9.2 10.7l-1 1A3 3 0 0 1 4 7.5l1-1" />
          <path d="M6.6 9.4l2.8-2.8" />
        </>
      )}
      {kind === 'file' && (
        <>
          <path d="M4 2.5h5.4L12 5.1v8.4H4z" />
          <path d="M9.4 2.5v2.8H12" />
          <path d="M6 8h4M6 10.5h3.2" />
        </>
      )}
      {kind === 'mic' && (
        <>
          <rect x="6" y="2.5" width="4" height="7" rx="2" />
          <path d="M4 8a4 4 0 0 0 8 0M8 12v2M6 14h4" />
        </>
      )}
      {kind === 'todo' && (
        <>
          <rect x="3" y="3" width="10" height="10" />
          <path d="M5.2 7.8l1.5 1.5 3.8-4" />
          <path d="M5.5 11h5" />
        </>
      )}
      {kind === 'sparkles' && (
        <>
          <path d="M8 2.5l1.2 3.1L12.5 7 9.2 8.4 8 11.5 6.8 8.4 3.5 7l3.3-1.4z" />
          <path d="M12.2 2.2v2M13.2 3.2h-2M3.8 11.8v2M4.8 12.8h-2" />
        </>
      )}
      {kind === 'inbox' && (
        <>
          <path d="M3 4h10l-1.2 5.2H9.4a1.8 1.8 0 0 1-2.8 0H4.2z" />
          <path d="M4.2 9.2v3.3h7.6V9.2" />
        </>
      )}
      {kind === 'brain' && (
        <>
          <path d="M6.2 4.2a2.2 2.2 0 0 1 3.6 0 2.4 2.4 0 0 1 2.4 2.4 2.5 2.5 0 0 1-.8 1.8 2.4 2.4 0 0 1-2.3 3.5H6.9a2.4 2.4 0 0 1-2.3-3.5 2.5 2.5 0 0 1-.8-1.8 2.4 2.4 0 0 1 2.4-2.4z" />
          <path d="M8 4.2v7.7M6.2 7h3.6M5.5 9.4h2.2M8.3 9.4h2.2" />
        </>
      )}
      {kind === 'lightbulb' && (
        <>
          <path d="M5.2 7.2a2.8 2.8 0 1 1 5.6 0c0 1.1-.6 1.7-1.2 2.4-.4.4-.7.8-.8 1.4H7.2c-.1-.6-.4-1-.8-1.4-.6-.7-1.2-1.3-1.2-2.4z" />
          <path d="M7.1 12h1.8M7.4 14h1.2" />
        </>
      )}
      {kind === 'output' && (
        <>
          <path d="M4 2.5h5.2L12 5.3v8.2H4z" />
          <path d="M9.2 2.5v3h2.8" />
          <path d="M6 9.5h4M8 7v5" />
        </>
      )}
    </g>
  );
}
