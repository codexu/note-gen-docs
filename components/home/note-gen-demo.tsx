"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUpIcon,
  BoldIcon,
  BotIcon,
  CalendarDaysIcon,
  CheckIcon,
  CheckCircle2Icon,
  CheckSquareIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  CircleIcon,
  Code2Icon,
  CopyIcon,
  DatabaseIcon,
  FileTextIcon,
  FilePlus2Icon,
  FilesIcon,
  FilterIcon,
  HighlighterIcon,
  ImageIcon,
  ImageUpIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  LanguagesIcon,
  Loader2Icon,
  MessageSquareIcon,
  MicIcon,
  NetworkIcon,
  PanelLeftIcon,
  PanelRightIcon,
  PaletteIcon,
  PaperclipIcon,
  PlusIcon,
  HistoryIcon,
  MessageSquareDashedIcon,
  MessageSquarePlusIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  GitBranchIcon,
  GitCommitIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImagePlusIcon,
  LayersIcon,
  ListOrderedIcon,
  MapIcon,
  MinusIcon,
  PilcrowIcon,
  PieChartIcon,
  QuoteIcon,
  Redo2Icon,
  SearchCodeIcon,
  SigmaIcon,
  Table2Icon,
  Undo2Icon,
  WorkflowIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShieldQuestionIcon,
  SquarePenIcon,
  Trash2Icon,
  TypeIcon,
  SparklesIcon,
  ChevronRightIcon,
  ToolCaseIcon,
  UserRoundIcon,
  Volume2Icon,
  WifiIcon,
  BatteryFullIcon,
  WrenchIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  NoteGenMobileDock,
  type NoteGenDockItem,
} from "@/components/notegen-mobile-dock"
import { CanvasThumbnail } from "@/components/home/canvas-thumbnail"
import { NoteGenDesktopReplica } from "@/components/home/notegen-desktop-replica"
import { NoteGenSettingsReplica } from "@/components/notegen"

const desktopRecords = [
  ["语音", "西湖边想走慢一点", "曲院风荷、北山街和孤山安排在周六上午。", "刚刚"],
  ["链接", "法喜寺预约说明", "https://example.com/hangzhou-faxi", "12 分钟前"],
  ["文本", "想吃的杭帮菜", "龙井虾仁、东坡肉，记得提前订晚餐。", "09:40"],
  ["图片", "天目里建筑路线", "保存了园区地图和几家想逛的小店。", "昨天"],
]

const mobileRecordsCn = [
  { type: "recording", label: "录音", preview: "西湖边想走慢一点：曲院风荷、北山街和孤山", time: "10:42" },
  { type: "link", label: "链接", preview: "法喜寺预约与开放时间", time: "10:16" },
  { type: "text", label: "文本", preview: "晚餐想吃杭帮菜，记得提前订座", time: "09:40" },
]

const mobileRecordsEn = [
  { type: "recording", label: "Audio", preview: "A slow walk along the Seine: Île Saint-Louis, the Louvre, and the Tuileries", time: "10:42" },
  { type: "link", label: "Link", preview: "Musée d’Orsay reservations and opening hours", time: "10:16" },
  { type: "text", label: "Text", preview: "Book a table at a Paris bistro tonight", time: "09:40" },
]

const mobileRecordTone = {
  recording: "border-rose-300/80 bg-rose-100 text-rose-900",
  link: "border-blue-300/80 bg-blue-100 text-blue-900",
  text: "border-lime-300/80 bg-lime-100 text-lime-900",
  image: "border-fuchsia-300/80 bg-fuchsia-100 text-fuchsia-900",
}

type DemoLang = "cn" | "en"

const DemoLanguageContext = createContext<DemoLang>("cn")

function useDemoLanguage() {
  const lang = useContext(DemoLanguageContext)
  return {
    lang,
    text: (cn: string, en: string) => lang === "en" ? en : cn,
  }
}

export function NoteGenDemo({ lang }: { lang: DemoLang }) {
  const text = (cn: string, en: string) => lang === "en" ? en : cn

  return (
    <DemoLanguageContext.Provider value={lang}>
      <div className="flex flex-col">
        <section
          aria-label={lang === "en" ? "NoteGen desktop and mobile preview" : "NoteGen 桌面端与移动端预览"}
          className="relative mx-auto w-full"
        >
          <div className="hidden w-full pb-[3.5%] md:block">
            <div className="w-[96%]">
              <MacBookFrame>
                <NoteGenDesktopReplica lang={lang} />
              </MacBookFrame>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[360px] px-2 md:absolute md:bottom-0 md:right-0 md:mx-0 md:w-[23%] md:min-w-[170px] md:max-w-[360px] md:px-0">
            <MobileReplica />
          </div>
        </section>

        <div id="workflow" className="mt-20 scroll-mt-14 pb-20 lg:pb-28">
          <section className="mx-auto w-full max-w-5xl pb-12 pt-20 lg:pb-16 lg:pt-28">
            <div className="flex max-w-4xl flex-col items-start gap-6">
              <Badge variant="secondary">
                {text("为什么是 NoteGen", "Why NoteGen")}
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                {text("记录时，不用先想好放在哪里。", "You don't need to decide where a note belongs before writing it down.")}
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {text(
                  "想到什么就记下来，不用马上分类。写周报、文章或整理项目资料时，可以从记录里选出需要的内容。",
                  "Capture an idea without sorting it immediately. When writing a report, article, or project document, select the records you need."
                )}
              </p>
            </div>
          </section>

          <section className="hidden md:block">
            <DesktopScenes />
          </section>
        </div>
      </div>
    </DemoLanguageContext.Provider>
  )
}

function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative rounded-[1.55rem] border border-[#737373] bg-[linear-gradient(145deg,#4b4b4d_0%,#171719_12%,#080809_50%,#202023_88%,#58585a_100%)] p-[6px] shadow-[0_42px_100px_-52px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.34)] lg:rounded-[1.9rem] lg:p-[8px]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] bg-[#030303] lg:rounded-[1.48rem]">
          <div className="absolute left-0 top-0 h-[125%] w-[125%] origin-top-left scale-[0.8] transform-gpu">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function DesktopScenes() {
  const { text } = useDemoLanguage()

  return (
    <div className="flex flex-col gap-28">
      <DesktopScene
        step="01"
        badge={text("记录", "Capture")}
        title={text("文字、图片、语音等内容统一记录。", "Keep text, images, voice, and more in one place.")}
        description={text("文字、语音、截图、图片、链接、文件和待办进入同一条记录流。标签以折叠分组呈现，真正需要时再筛选和整理。", "Text, audio, screenshots, images, links, files, and tasks enter one stream. Filter and organize them only when needed.")}
        details={[
          [text("支持内容", "Formats"), text("文字、语音、截图、图片、链接、文件、待办", "Text, audio, screenshots, images, links, files, and tasks")],
          [text("整理方式", "Organization"), text("标签折叠分组，按需筛选", "Collapsible tag groups and on-demand filters")],
          [text("数据位置", "Storage"), text("默认保存在本地", "Stored locally by default")],
        ]}
      >
        <RecordScene />
      </DesktopScene>
      <DesktopScene
        step="02"
        badge={text("画布", "Canvas")}
        title={text("在无限画布上自由绘图。", "Draw freely on an infinite canvas.")}
        description={text("笔记、图片、网页和 AI 生成结果可以成为独立节点。用连接关系梳理研究、流程和仍未成形的想法。", "Notes, images, web pages, and AI output become independent nodes. Connect them to map research, workflows, and emerging ideas.")}
        details={[
          [text("节点类型", "Nodes"), text("笔记、记录、图片、链接、图形与图表", "Notes, records, images, links, shapes, and charts")],
          [text("组织方式", "Structure"), text("自由连接、分组与自动布局", "Free connections, grouping, and auto layout")],
          [text("AI 能力", "AI"), text("生成图表、流程图与 Mermaid", "Generate charts, flowcharts, and Mermaid")],
        ]}
      >
        <CanvasScene />
      </DesktopScene>
      <DesktopScene
        step="03"
        badge="Agent"
        title={text("让 Agent 使用你的本地知识。", "Let the Agent use your local knowledge.")}
        description={text("Agent 在右侧执行检索、读取文件和整理结构。过程、引用来源和最终回答都保留在同一个对话上下文中。", "The Agent searches, reads files, and organizes information on the right, keeping its process, sources, and answer in one conversation.")}
        details={[
          [text("知识来源", "Knowledge"), text("记录、文件、画布与知识库", "Records, files, canvases, and knowledge bases")],
          [text("执行过程", "Process"), text("检索、工具调用与引用来源可见", "Visible searches, tool calls, and sources")],
          [text("结果去向", "Output"), text("回答可继续整理并写回文件", "Continue refining answers and write them back to files")],
        ]}
      >
        <AgentScene />
      </DesktopScene>
      <DesktopScene
        step="04"
        badge={text("写作", "Writing")}
        title={text("在标准 Markdown 文件里继续。", "Continue in standard Markdown files.")}
        description={text("文件树、标签页、编辑工具栏和正文处在同一个连续界面。内容最终仍然是你可以随时打开和迁移的普通文件。", "The file tree, tabs, toolbar, and document share one continuous workspace. Your content remains portable plain files.")}
        details={[
          [text("文件格式", "Format"), text("标准 Markdown 文件", "Standard Markdown files")],
          [text("工作界面", "Workspace"), text("文件树、标签页与连续编辑", "File tree, tabs, and continuous editing")],
          [text("内容能力", "Content"), text("文本、表格、公式、图表与 Mermaid", "Text, tables, math, diagrams, and Mermaid")],
        ]}
      >
        <WritingScene />
      </DesktopScene>
      <DesktopScene
        step="05"
        badge={text("设置", "Settings")}
        title={text("每一项偏好，都保持清楚可见。", "Every preference stays clear and easy to find.")}
        description={text("设置页完整复刻了搜索、分组导航、设置分区与控件层级。文档和官网可以直接组合这些组件，展示真实界面而不再依赖截图。", "The settings replica includes search, grouped navigation, sections, and controls. Documentation and marketing pages can compose the real interface without screenshots.")}
        details={[
          [text("导航结构", "Navigation"), text("基础、AI 与扩展、数据", "Basic, AI & extensions, and data")],
          [text("可复用单元", "Primitives"), text("设置页、分组、设置项与控件", "Pages, sections, rows, and controls")],
          [text("展示方式", "Presentation"), text("可交互、可组合、支持中英文", "Interactive, composable, and bilingual")],
        ]}
      >
        <SettingsScene />
      </DesktopScene>
    </div>
  )
}

function DesktopScene({
  step,
  badge,
  title,
  description,
  details,
  children,
}: {
  step: string
  badge: string
  title: string
  description: string
  details: Array<[string, string]>
  children: React.ReactNode
}) {
  const reverse = Number(step) % 2 === 0

  return (
    <article
      className={cn(
        "mx-auto grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-0"
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-lg flex-col gap-5",
          reverse
            ? "lg:col-start-2 lg:row-start-1 lg:justify-self-end"
            : "lg:col-start-1 lg:row-start-1 lg:justify-self-start"
        )}
      >
        <Badge variant="outline" className="w-fit">{badge}</Badge>
        <h3 className="text-balance text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h3>
        <p className="text-pretty text-base leading-7 text-muted-foreground">{description}</p>
        <dl className="mt-2 border-y text-sm">
          {details.map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                "grid grid-cols-[5.5rem_1fr] gap-4 py-3",
                index > 0 && "border-t"
              )}
            >
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="leading-5 text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className={cn(
          "w-full max-w-[540px] overflow-hidden rounded-[1.5rem] bg-muted/40 p-3",
          reverse
            ? "lg:col-start-1 lg:row-start-1 lg:justify-self-start"
            : "lg:col-start-2 lg:row-start-1 lg:justify-self-end"
        )}
      >
        <div className="aspect-[4/3] w-full">
          {children}
        </div>
      </div>
    </article>
  )
}

function DesktopReplica() {
  return (
    <div className="aspect-[16/10] min-h-[360px] overflow-hidden rounded-lg border bg-background text-[9px] shadow-lg sm:min-h-[520px] lg:text-[10px]">
      <DesktopTitleBar />
      <div className="flex h-[calc(100%-36px)] min-w-0">
        <DesktopAppRail />
        <div className="grid min-w-0 flex-1 grid-cols-[26%_44%_30%]">
          <DesktopLeftPanel />
          <DesktopEditor />
          <DesktopChat />
        </div>
      </div>
    </div>
  )
}

function DesktopTitleBar() {
  const tools = [
    FileTextIcon,
    MicIcon,
    ImageUpIcon,
    ImageIcon,
    LinkIcon,
    PaperclipIcon,
    CheckSquareIcon,
  ]

  return (
    <div className="relative flex h-9 items-center border-b px-2">
      <div className="mr-3 flex w-12 gap-1.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
      </div>
      <div className="flex items-center gap-0.5">
        {tools.map((Icon, index) => (
          <span key={index} className="flex size-7 items-center justify-center rounded-md">
            <Icon className="size-3.5" />
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 flex h-6 w-[30%] -translate-x-1/2 items-center justify-center gap-1.5 rounded-sm border text-muted-foreground">
        <SearchIcon className="size-3" />
        <span>搜索笔记、记录和画布</span>
      </div>
      <div className="ml-auto flex items-center gap-0.5">
        {[PanelLeftIcon, SquarePenIcon, PanelRightIcon, CalendarDaysIcon].map((Icon, index) => (
          <span key={index} className="flex size-7 items-center justify-center rounded-md">
            <Icon className="size-3.5" />
          </span>
        ))}
      </div>
    </div>
  )
}

function DesktopAppRail() {
  return (
    <aside className="flex w-12 shrink-0 flex-col items-center border-r py-2">
      <div className="mb-4 flex size-7 items-center justify-center rounded-md bg-muted">
        <span className="size-2 rounded-full bg-foreground" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <RailIcon icon={SquarePenIcon} active />
        <RailIcon icon={SearchIcon} />
        <RailIcon icon={ImageUpIcon} />
      </div>
      <RailIcon icon={SettingsIcon} />
    </aside>
  )
}

function RailIcon({ icon: Icon, active = false }: { icon: typeof SearchIcon; active?: boolean }) {
  return (
    <span className={cn("flex size-8 items-center justify-center rounded-lg", active && "bg-muted")}>
      <Icon className="size-4" />
    </span>
  )
}

function DesktopLeftPanel() {
  return (
    <section className="flex min-w-0 flex-col border-r">
      <div className="flex h-12 items-center justify-between border-b px-2">
        <div className="flex h-8 items-center gap-1 rounded-lg bg-muted p-1">
          <span className="flex size-6 items-center justify-center rounded-md">
            <FilesIcon className="size-3" />
          </span>
          <span className="flex h-6 items-center gap-1 rounded-md bg-background px-2 font-medium shadow-sm">
            <HighlighterIcon className="size-3" /> 记录
          </span>
          <span className="flex size-6 items-center justify-center rounded-md">
            <PaletteIcon className="size-3" />
          </span>
        </div>
        <span className="flex size-7 items-center justify-center">
          <PlusIcon className="size-3.5" />
        </span>
      </div>
      <div className="flex h-9 items-center justify-between border-b px-3">
        <div className="flex items-center gap-1.5 font-medium">
          <ChevronDownIcon className="size-3" />
          杭州旅行
          <span className="font-normal text-muted-foreground">4</span>
        </div>
        <span className="flex size-6 items-center justify-center"><PlusIcon className="size-3" /></span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {desktopRecords.map(([type, title, body, time], index) => (
          <div key={title} className={cn("border-t px-3 py-2.5", index === 0 && "bg-muted/60")}>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="h-4 px-1 text-[8px]">{type}</Badge>
              <span className="text-[8px] text-muted-foreground">{time}</span>
            </div>
            <p className="mt-1 truncate font-medium">{title}</p>
            <p className="mt-0.5 truncate text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
      <div className="flex h-6 items-center border-t px-2 text-[8px] text-muted-foreground">
        当前显示 4 条记录
      </div>
    </section>
  )
}

function DesktopEditor() {
  return (
    <section className="flex min-w-0 flex-col border-r">
      <div className="flex h-9 items-end border-b bg-muted/20 px-1">
        <div className="flex h-9 min-w-0 items-center gap-1.5 border-b-2 border-foreground px-3">
          <FileTextIcon className="size-3" />
          <span className="truncate">周末杭州行程.md</span>
          <CircleIcon className="size-1.5 fill-current" />
        </div>
      </div>
      <div className="flex h-9 items-center justify-between border-b px-2">
        <div className="flex items-center">
          {[BoldIcon, ItalicIcon, ListIcon, Code2Icon, LinkIcon].map((Icon, index) => (
            <span key={index} className="flex size-6 items-center justify-center">
              <Icon className="size-3" />
            </span>
          ))}
        </div>
        <Badge variant="secondary" className="h-4 text-[8px]">Markdown</Badge>
      </div>
      <article className="min-h-0 flex-1 overflow-hidden px-[8%] py-[6%]">
        <p className="font-mono text-[8px] text-muted-foreground">TRAVEL / HANGZHOU / WEEKEND</p>
        <h2 className="mt-2 text-[clamp(14px,1.7vw,25px)] font-semibold tracking-tight">
          周末杭州行程
        </h2>
        <p className="mt-4 leading-[1.9] text-muted-foreground">
          两天以西湖和城西为主，少赶路，给散步、吃饭和临时停留留出时间。
        </p>
        <h3 className="mt-5 text-[11px] font-semibold">周六 · 西湖与象山</h3>
        <p className="mt-2 leading-[1.9] text-muted-foreground">
          上午从曲院风荷走到孤山，下午去中国美院象山校区，晚上吃提前预约的杭帮菜。
        </p>
        <div className="my-4 border-l-2 pl-3 leading-5 text-muted-foreground">
          雨天备选：浙江省博物馆孤山馆区。
        </div>
        <div className="flex flex-col gap-2">
          {["预约周六晚餐", "确认法喜寺开放时间", "下载离线路线"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded border">
                <CheckIcon className="size-2.5" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </article>
      <div className="flex h-7 items-center justify-between border-t px-3 text-[8px] text-muted-foreground">
        <span>Markdown · UTF-8</span>
        <span>326 字 · 已保存</span>
      </div>
    </section>
  )
}

function ConversationContextStrip({
  compact = false,
  count = 3,
}: {
  compact?: boolean
  count?: number
}) {
  const { lang, text } = useDemoLanguage()
  const contextsCn = [
    { icon: HighlighterIcon, label: "西湖边想走慢一点" },
    { icon: PaletteIcon, label: "杭州周末路线" },
    { icon: FileTextIcon, label: "餐厅收藏.md" },
  ]
  const contextsEn = [
    { icon: HighlighterIcon, label: "A slow walk along the Seine" },
    { icon: PaletteIcon, label: "Weekend Paris Route" },
    { icon: FileTextIcon, label: "Saved Restaurants.md" },
  ]
  const contexts = (lang === "en" ? contextsEn : contextsCn).slice(0, count)

  return (
    <div className={cn("flex w-full max-w-full flex-wrap gap-1", !compact && "px-1 pt-1")}>
      {contexts.map(({ icon: Icon, label }) => (
        <Badge
          key={label}
          variant="secondary"
          className={cn(
            "max-w-40 shrink-0 gap-1 rounded-lg font-normal",
            compact ? "h-5 px-1.5 text-[8px]" : "h-7 pl-2 pr-0.5"
          )}
          title={label}
        >
          <span className="flex size-3.5 shrink-0 items-center justify-center self-center [&>svg]:size-3.5">
            <Icon />
          </span>
          <span className="truncate leading-none">{label}</span>
          {!compact ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-6 shrink-0"
              aria-label={text(`移除 ${label}`, `Remove ${label}`)}
            >
              <XIcon />
            </Button>
          ) : null}
        </Badge>
      ))}
    </div>
  )
}

type AssociationKind = "record" | "canvas" | "file"

function ComposerResourceMenu({
  kind,
}: {
  kind: AssociationKind
}) {
  const { lang, text } = useDemoLanguage()
  const resourcesCn = {
    record: {
      group: "记录",
      items: [
        { icon: HighlighterIcon, label: "西湖边想走慢一点", description: "曲院风荷、北山街和孤山" },
        { icon: LinkIcon, label: "法喜寺预约说明", description: "开放时间与预约入口" },
      ],
    },
    canvas: {
      group: "画布",
      items: [
        { icon: PaletteIcon, label: "杭州周末路线", description: "3 个节点 · 2 条关系" },
        { icon: PaletteIcon, label: "雨天备选", description: "2 个节点 · 1 条关系" },
      ],
    },
    file: {
      group: "文件",
      items: [
        { icon: FileTextIcon, label: "餐厅收藏.md", description: "杭州旅行 / 餐厅收藏.md" },
        { icon: FileTextIcon, label: "杭州想去的地方.md", description: "杭州旅行 / 地点.md" },
      ],
    },
  }
  const resourcesEn = {
    record: {
      group: "Records",
      items: [
        { icon: HighlighterIcon, label: "A slow walk along the Seine", description: "Île Saint-Louis, the Louvre, and the Tuileries" },
        { icon: LinkIcon, label: "Musée d’Orsay reservation guide", description: "Opening hours and booking details" },
      ],
    },
    canvas: {
      group: "Canvas",
      items: [
        { icon: PaletteIcon, label: "Weekend Paris Route", description: "3 nodes · 2 connections" },
        { icon: PaletteIcon, label: "Rainy-day Alternative", description: "2 nodes · 1 connection" },
      ],
    },
    file: {
      group: "Files",
      items: [
        { icon: FileTextIcon, label: "Saved Restaurants.md", description: "Paris Trip / Saved Restaurants.md" },
        { icon: FileTextIcon, label: "Places to Visit in Paris.md", description: "Paris Trip / Places.md" },
      ],
    },
  }
  const resources = (lang === "en" ? resourcesEn : resourcesCn) satisfies Record<AssociationKind, {
    group: string
    items: Array<{
      icon: typeof FileTextIcon
      label: string
      description: string
    }>
  }>
  const resource = resources[kind]

  return (
    <div
      className="absolute inset-x-1 bottom-[calc(100%+0.375rem)] z-[70] overflow-hidden rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg"
      role="listbox"
      aria-label={text("关联内容", "Related content")}
    >
      <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">
        {resource.group}
      </div>
      <div className="flex flex-col gap-0.5">
        {resource.items.map(({ icon: Icon, label, description }, index) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start rounded-lg",
              index === 0 && "bg-muted"
            )}
            role="option"
            aria-selected={index === 0}
          >
            <Icon data-icon="inline-start" />
            <span className="flex min-w-0 flex-1 items-baseline gap-1.5">
              <span className="shrink-0 truncate text-xs font-medium">{label}</span>
              <span className="ml-auto truncate text-right text-[11px] font-normal text-muted-foreground">
                {description}
              </span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}

function DesktopChat() {
  return (
    <section className="flex min-w-0 flex-col">
      <div className="flex h-12 items-center justify-between border-b px-3">
        <div className="flex items-center gap-2 font-medium">
          <BotIcon className="size-3.5" /> 新对话
        </div>
        <PlusIcon className="size-3.5" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-3">
        <ConversationContextStrip compact />
        <div className="ml-6 rounded-lg bg-muted px-3 py-2 leading-5">
          结合这些记录、画布和旧笔记，整理一份周末杭州行程
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <NetworkIcon className="size-3" /> 正在使用本地知识
        </div>
        <div className="rounded-lg border p-2.5">
          {["搜索杭州旅行笔记", "读取记录与路线画布", "写入周末杭州行程.md"].map((item) => (
            <div key={item} className="flex items-center gap-2 py-1 text-muted-foreground">
              <span className="flex size-4 items-center justify-center rounded-full bg-muted">
                <CheckIcon className="size-2.5" />
              </span>
              {item}
            </div>
          ))}
        </div>
        <p className="leading-5">
          已按地点和交通距离整理为两天行程，并补充了餐厅预约、雨天备选和返程提醒。
        </p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="h-4 text-[8px]">杭州想去的地方.md</Badge>
          <Badge variant="secondary" className="h-4 text-[8px]">餐厅收藏.md</Badge>
        </div>
      </div>
      <div className="p-2">
        <div className="flex h-20 flex-col justify-between rounded-lg border p-2 text-muted-foreground">
          <span>输入消息或按 / 使用 Skills</span>
          <div className="flex items-center justify-between">
            <div className="flex gap-2"><PaperclipIcon className="size-3.5" /><NetworkIcon className="size-3.5" /></div>
            <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
              <ArrowUpIcon className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function RecordScene() {
  const { lang } = useDemoLanguage()
  return (
    <NoteGenDesktopReplica
      lang={lang}
      initialWorkspace="records"
      autoCycle={false}
      panelLayout="two"
      titleBarMode="none"
      fill
    />
  )
}

function WritingScene() {
  const { lang } = useDemoLanguage()
  return (
    <NoteGenDesktopReplica
      lang={lang}
      initialWorkspace="writing"
      autoCycle={false}
      panelLayout="two"
      titleBarMode="none"
      fill
    />
  )
}

function AgentScene() {
  const { lang } = useDemoLanguage()
  return (
    <NoteGenDesktopReplica
      lang={lang}
      initialWorkspace="writing"
      autoCycle={false}
      panelLayout="right"
      titleBarMode="none"
      fill
    />
  )
}

function CanvasScene() {
  const { lang } = useDemoLanguage()
  return (
    <NoteGenDesktopReplica
      lang={lang}
      initialWorkspace="canvas"
      autoCycle={false}
      panelLayout="two"
      titleBarMode="none"
      fill
    />
  )
}

function SettingsScene() {
  const { lang } = useDemoLanguage()
  return <NoteGenSettingsReplica lang={lang} />
}

function MobileReplica() {
  const { lang, text } = useDemoLanguage()
  const [page, setPage] = useState<"chat" | "writing" | "record" | "canvas">("chat")
  const [quickOpen, setQuickOpen] = useState(false)
  const dockItems = useMemo<NoteGenDockItem[]>(() => [
    { id: "chat", icon: MessageSquareIcon, label: text("对话", "Chat") },
    { id: "writing", icon: SquarePenIcon, label: text("写作", "Write") },
    { id: "quick-action", icon: PlusIcon, label: text("快捷", "Quick") },
    { id: "record", icon: HighlighterIcon, label: text("记录", "Record") },
    { id: "canvas", icon: PaletteIcon, label: text("画布", "Canvas") },
  ], [lang])
  const routeActiveIndex = dockItems.findIndex((item) => item.id === page)
  const quickActionIndex = dockItems.findIndex((item) => item.id === "quick-action")
  const activeIndex = quickOpen ? quickActionIndex : Math.max(routeActiveIndex, 0)

  return (
    <>
      <div className="relative mx-auto aspect-[9/19.5] w-full">
        <span className="absolute -left-1 top-[17%] h-7 w-1 rounded-l-md bg-[#303034] shadow-sm" />
        <span className="absolute -left-1 top-[25%] h-12 w-1 rounded-l-md bg-[#303034] shadow-sm" />
        <span className="absolute -left-1 top-[34%] h-12 w-1 rounded-l-md bg-[#303034] shadow-sm" />
        <span className="absolute -right-1 top-[27%] h-20 w-1 rounded-r-md bg-[#303034] shadow-sm" />

        <div className="absolute inset-0 rounded-[3rem] bg-[linear-gradient(135deg,#6a6a6f_0%,#202024_18%,#08080a_50%,#29292d_82%,#5b5b60_100%)] p-[3px] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.75)]">
          <div className="notegen-mobile-replica relative isolate h-full transform-gpu overflow-hidden rounded-[2.82rem] border-[5px] border-[#111114] bg-background">
            <div className="relative h-full w-full transform-gpu md:h-[125%] md:w-[125%] md:origin-top-left md:scale-[0.8]">
            <div className="pointer-events-none absolute left-1/2 top-2 z-[60] flex h-6 w-[5.25rem] -translate-x-1/2 items-center justify-end rounded-full bg-[#050507] px-2.5">
              <span className="size-1.5 rounded-full bg-[#111b24]" />
            </div>
            <div className="flex h-9 items-start justify-between px-6 pt-2.5 text-[10px] font-semibold">
              <span>10:42</span>
              <div className="flex items-center gap-1.5">
                <span className="flex h-3 items-end gap-px" aria-hidden="true">
                  <span className="h-1 w-0.5 rounded-full bg-foreground" />
                  <span className="h-1.5 w-0.5 rounded-full bg-foreground" />
                  <span className="h-2 w-0.5 rounded-full bg-foreground" />
                  <span className="h-2.5 w-0.5 rounded-full bg-foreground" />
                </span>
                <WifiIcon className="size-3" />
                <BatteryFullIcon className="size-4" />
              </div>
            </div>
            <div className="h-[calc(100%-36px)]">
              {page === "chat" && <MobileChatPage onComplete={() => setPage("writing")} />}
              {page === "writing" && <MobileWritingPage />}
              {page === "record" && <MobileRecordPage />}
              {page === "canvas" && <MobileCanvasPage />}
            </div>
            <div className="notegen-demo-footbar-fade pointer-events-none absolute inset-x-0 z-40 bg-[linear-gradient(to_top,var(--background)_0%,color-mix(in_oklab,var(--background)_96%,transparent)_18%,color-mix(in_oklab,var(--background)_72%,transparent)_44%,color-mix(in_oklab,var(--background)_28%,transparent)_72%,transparent_100%)]">
              <div className="notegen-demo-footbar pointer-events-auto absolute inset-x-0 flex items-center justify-center px-2 min-[380px]:px-3">
                <NoteGenMobileDock
                  items={dockItems}
                  activeIndex={activeIndex}
                  onActiveIndexChange={(_, item) => {
                    if (item.id === "quick-action") {
                      setQuickOpen((open) => !open)
                      return
                    }
                    setQuickOpen(false)
                    setPage(item.id as "chat" | "writing" | "record" | "canvas")
                  }}
                />
              </div>
            </div>
            {quickOpen ? (
              <div
                className="absolute inset-0 z-50 flex items-end bg-foreground/10"
                role="presentation"
                onClick={() => setQuickOpen(false)}
              >
                <div
                  className="w-full rounded-t-[24px] border-x border-t bg-background px-2 pb-[calc(0.5rem+var(--notegen-demo-safe-area-bottom))] pt-3 shadow-2xl"
                  role="dialog"
                  aria-label={text("快速记录", "Quick capture")}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-muted" />
                  <MobileQuickTools onClose={() => setQuickOpen(false)} />
                </div>
              </div>
            ) : null}
            <span className="pointer-events-none absolute bottom-1.5 left-1/2 z-[60] h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileQuickTools({ onClose }: { onClose: () => void }) {
  const { text } = useDemoLanguage()

  return (
    <div className="flex w-full flex-col gap-2">
      <ToolSectionLabel>{text("写作", "Writing")}</ToolSectionLabel>
      <div className="grid w-full grid-cols-2 gap-1.5">
        <MobileQuickTool icon={SquarePenIcon} label={text("笔记", "Note")} showChevron onClick={onClose} />
        <MobileQuickTool icon={SparklesIcon} label={text("整理成笔记", "Organize into note")} showChevron onClick={onClose} />
      </div>
      <ToolSectionLabel>{text("记录", "Capture")}</ToolSectionLabel>
      <div className="grid w-full grid-cols-2 gap-1.5">
        <MobileQuickTool icon={TypeIcon} label={text("文本", "Text")} onClick={onClose} />
        <MobileQuickTool icon={MicIcon} label={text("录音", "Audio")} onClick={onClose} />
        <MobileQuickTool icon={ImageUpIcon} label={text("图片", "Image")} onClick={onClose} />
        <MobileQuickTool icon={LinkIcon} label={text("链接", "Link")} onClick={onClose} />
        <MobileQuickTool icon={PaperclipIcon} label={text("文件", "File")} onClick={onClose} />
        <MobileQuickTool icon={CheckSquareIcon} label={text("待办", "Task")} onClick={onClose} />
      </div>
    </div>
  )
}

function ToolSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <span className="text-xs font-medium text-[var(--component-inactive-color)]">{children}</span>
      <span className="h-px flex-1 bg-border/60" />
    </div>
  )
}

function MobileQuickTool({
  icon: Icon,
  label,
  showChevron = false,
  onClick,
}: {
  icon: typeof TypeIcon
  label: string
  showChevron?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="group flex min-h-12 min-w-0 items-center justify-start gap-2 rounded-2xl border border-border/50 bg-background/50 px-2.5 py-2 text-foreground backdrop-blur transition-[background-color,border-color,transform] duration-200 hover:border-border/70 hover:bg-[var(--component-active-bg)] active:scale-[0.98]"
      aria-label={label}
      onClick={onClick}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[var(--component-active-bg)]">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-sm font-medium leading-none">{label}</span>
      {showChevron ? <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" /> : null}
    </button>
  )
}

function MobileRecordPage() {
  const { lang, text } = useDemoLanguage()
  const mobileRecords = lang === "en" ? mobileRecordsEn : mobileRecordsCn

  return (
    <div className="h-full">
      <header className="flex h-14 items-center justify-between border-b px-2">
        <div className="flex h-11 items-center gap-1 px-2 text-sm font-medium">
          {text("全部记录", "All records")} <ChevronDownIcon className="size-4 text-muted-foreground" />
        </div>
        <div className="flex">
          {[FilterIcon, CheckSquareIcon, Trash2Icon].map((Icon, index) => (
            <span key={index} className="flex size-11 items-center justify-center">
              <Icon className="size-[18px]" />
            </span>
          ))}
        </div>
      </header>
      <main className="notegen-demo-under-dock h-[calc(100%-56px)] overflow-y-auto px-3 py-2">
        <div className="mb-2 text-xs font-medium text-muted-foreground">{text("今天", "Today")}</div>
        <div className="flex flex-col gap-2">
          {mobileRecords.map((record) => (
            <div key={record.preview} className="rounded-xl border bg-background px-3 py-3">
              <div className="flex items-center justify-between">
                <span className={cn(
                  "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
                  mobileRecordTone[record.type as keyof typeof mobileRecordTone]
                )}>
                  {record.label}
                </span>
                <span className="text-xs text-muted-foreground">{record.time}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-5">{record.preview}</p>
            </div>
          ))}
        </div>
        <div className="mb-2 mt-4 text-xs font-medium text-muted-foreground">{text("昨天", "Yesterday")}</div>
        <div className="rounded-xl border bg-background px-3 py-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-md border border-fuchsia-300/80 bg-fuchsia-100 px-1.5 py-0.5 text-[10px] font-medium text-fuchsia-900">{text("图片", "Image")}</span>
            <span className="text-xs text-muted-foreground">18:22</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <ImageIcon className="size-4 text-muted-foreground" />
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{text("天目里建筑与店铺地图", "Le Marais galleries and shops map")}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function MobileChatPage({ onComplete }: { onComplete: () => void }) {
  const { lang, text } = useDemoLanguage()
  const [processOpen, setProcessOpen] = useState(true)
  const [ragOpen, setRagOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const prompt = text("结合这些内容，整理周末杭州行程并保存。", "Use this material to organize and save a weekend Paris itinerary.")
  const associationSteps = [
    { kind: "record", query: text("西湖", "Seine"), start: 250, selectAt: 1150 },
    { kind: "canvas", query: text("杭州", "Paris"), start: 1300, selectAt: 2200 },
    { kind: "file", query: text("餐厅", "Restaurants"), start: 2350, selectAt: 3250 },
  ] as const
  const typingStart = 3450
  const typingSpeed = 58
  const typedPromptLength = Math.min(
    prompt.length,
    Math.max(0, Math.floor((elapsed - typingStart) / typingSpeed))
  )
  const promptFullyTyped = typedPromptLength >= prompt.length
  const activeAssociation = associationSteps.find(
    (step) => elapsed >= step.start && elapsed < step.selectAt
  )
  const selectedContextCount = associationSteps.filter(
    (step) => elapsed >= step.selectAt
  ).length
  const associationQueryLength = activeAssociation
    ? Math.min(
        activeAssociation.query.length,
        Math.max(0, Math.floor((elapsed - activeAssociation.start - 120) / 160))
      )
    : 0
  const composerText = activeAssociation
    ? `@${activeAssociation.query.slice(0, associationQueryLength)}`
    : elapsed >= typingStart
      ? prompt.slice(0, typedPromptLength)
      : ""
  const messageSentAt = 5300
  const processStart = 5450
  const agentEvents = [
    { label: text("记录 · 读取 3 条杭州收藏", "Records · Read 3 Paris items"), start: 5600, duration: 680 },
    { label: text("画布 · 读取杭州周末路线", "Canvas · Read weekend Paris route"), start: 6380, duration: 540 },
    { label: text("笔记 · 检索杭州旅行历史", "Notes · Search Paris travel history"), start: 7020, duration: 980 },
    { label: text("笔记 · 写入周末杭州行程.md", "Notes · Write Weekend Paris Itinerary.md"), start: 8100, duration: 840 },
  ] as const
  const responseStart = 9100
  const responseSegments = [
    text("已读取关联的 3 条旅行记录、1 个路线画布和 2 篇历史笔记。", "I read 3 related travel records, 1 route canvas, and 2 previous notes."),
    text("我重新安排了两天路线，减少跨区往返，并补充了餐厅预约、雨天备选和返程提醒。", "I reorganized the two-day route to reduce travel and added restaurant bookings, a rainy-day alternative, and a return reminder."),
    text("行程已保存，正在为你打开写作页面。", "The itinerary is saved. Opening it in Writing now."),
  ] as const
  const responseLength = responseSegments.reduce((total, segment) => total + segment.length, 0)
  const visibleCharacters = Math.min(
    responseLength,
    Math.max(0, Math.floor((elapsed - responseStart) / 26))
  )
  const responseComplete = visibleCharacters >= responseLength
  const processComplete = elapsed >= responseStart
  const messageSent = elapsed >= messageSentAt
  const processElapsed = Math.max(0, elapsed - processStart)
  const visibleEvents = agentEvents.filter((event) => elapsed >= event.start)

  useEffect(() => {
    const startedAt = performance.now()
    const totalDuration = responseStart + responseLength * 26
    const timer = window.setInterval(() => {
      const nextElapsed = Math.min(totalDuration, performance.now() - startedAt)
      setElapsed(nextElapsed)
      if (nextElapsed >= totalDuration) {
        window.clearInterval(timer)
      }
    }, 32)

    return () => window.clearInterval(timer)
  }, [responseLength])

  useEffect(() => {
    const scrollArea = chatScrollRef.current
    if (!scrollArea || !messageSent) return
    scrollArea.scrollTop = scrollArea.scrollHeight
  }, [elapsed, messageSent, visibleCharacters, visibleEvents.length])

  useEffect(() => {
    if (!processComplete) return
    setProcessOpen(false)
  }, [processComplete])

  useEffect(() => {
    if (!responseComplete) return
    const timer = window.setTimeout(onComplete, 2400)
    return () => window.clearTimeout(timer)
  }, [onComplete, responseComplete])

  function formatDuration(duration: number) {
    return duration < 1000 ? `${Math.round(duration)}ms` : `${(duration / 1000).toFixed(1)}s`
  }

  function visibleSegment(index: number) {
    const previousLength = responseSegments
      .slice(0, index)
      .reduce((total, segment) => total + segment.length, 0)
    return responseSegments[index].slice(
      0,
      Math.max(0, visibleCharacters - previousLength)
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background px-2">
        <div className="flex size-11 items-center justify-center">
          <span className="flex size-7 items-center justify-center rounded-full bg-muted">
            <UserRoundIcon className="size-4" />
          </span>
        </div>
        <div className="ml-auto flex items-center">
          {[SearchIcon, HistoryIcon, MessageSquareDashedIcon, MessageSquarePlusIcon].map((Icon, index) => (
            <span key={index} className="flex size-11 items-center justify-center">
              <Icon className="size-4" />
            </span>
          ))}
        </div>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div ref={chatScrollRef} className="notegen-demo-chat-scroll relative h-full overflow-y-auto p-4">
          {messageSent ? (
            <div className="ml-auto flex max-w-[85%] justify-end">
              <div className="rounded-lg border px-3 py-2 text-sm leading-6">
                {prompt}
              </div>
            </div>
          ) : null}

          {elapsed >= processStart ? <div className="mt-4 w-full text-sm leading-6">
            <Marker
              render={
                <button
                  type="button"
                  aria-expanded={processOpen}
                  onClick={() => setProcessOpen((open) => !open)}
                />
              }
              className="group py-1.5 transition-colors"
            >
              <MarkerIcon>
                {processComplete ? <CheckCircle2Icon /> : <Loader2Icon className="animate-spin text-primary" />}
              </MarkerIcon>
              <MarkerContent className="flex-1 truncate">
                {processComplete ? text("已处理", "Processed") : text("处理中", "Processing")}{" "}
                {formatDuration(Math.min(processElapsed, responseStart - processStart))} · {text(`执行 ${visibleEvents.length} 次`, `${visibleEvents.length} actions`)}
              </MarkerContent>
              <MarkerIcon>
                <ChevronRightIcon className={cn("transition-transform", processOpen && "rotate-90")} />
              </MarkerIcon>
            </Marker>

            {processOpen ? (
              <div className="flex flex-col gap-1">
                {elapsed >= 5550 ? <Marker
                  render={
                    <button
                      type="button"
                      aria-expanded={ragOpen}
                      onClick={() => setRagOpen((open) => !open)}
                    />
                  }
                  className="py-1.5"
                >
                  <MarkerIcon><DatabaseIcon /></MarkerIcon>
                  <MarkerContent className="flex-1 truncate">{text("检索到 2 个知识库来源", "Found 2 knowledge sources")}</MarkerContent>
                  <MarkerIcon>
                    <ChevronRightIcon className={cn("transition-transform", ragOpen && "rotate-90")} />
                  </MarkerIcon>
                </Marker> : null}
                {elapsed >= 5550 && ragOpen ? (
                  <div className="flex flex-col gap-1 pl-6">
                    {(lang === "en" ? ["Places to Visit in Paris.md", "Saved Restaurants.md"] : ["杭州想去的地方.md", "餐厅收藏.md"]).map((source) => (
                      <Marker key={source} className="py-1 text-xs">
                        <MarkerIcon><FileTextIcon /></MarkerIcon>
                        <MarkerContent className="flex-1 truncate">{source}</MarkerContent>
                      </Marker>
                    ))}
                  </div>
                ) : null}

                {elapsed >= 7950 ? <Marker
                  render={
                    <button
                      type="button"
                      aria-expanded={skillsOpen}
                      onClick={() => setSkillsOpen((open) => !open)}
                    />
                  }
                  className="py-1.5"
                >
                  <MarkerIcon><SparklesIcon /></MarkerIcon>
                  <MarkerContent className="flex-1 truncate">{text("已使用 1 个技能", "Used 1 skill")}</MarkerContent>
                  <MarkerIcon>
                    <ChevronRightIcon className={cn("transition-transform", skillsOpen && "rotate-90")} />
                  </MarkerIcon>
                </Marker> : null}
                {elapsed >= 7950 && skillsOpen ? (
                  <Marker className="py-1 pl-6 text-xs">
                    <MarkerIcon><SparklesIcon /></MarkerIcon>
                    <MarkerContent className="flex-1 truncate">trip-planner</MarkerContent>
                  </Marker>
                ) : null}

                <div className="flex flex-col gap-1">
                  {visibleEvents.map((event) => {
                    const eventElapsed = Math.min(event.duration, Math.max(0, elapsed - event.start))
                    const running = eventElapsed < event.duration
                    return <Marker key={event.label} className="items-start py-1.5">
                      <MarkerIcon className="mt-0.5">
                        {running ? <Loader2Icon className="animate-spin text-primary" /> : <WrenchIcon />}
                      </MarkerIcon>
                      <MarkerContent className="flex-1 truncate">{event.label}</MarkerContent>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        {formatDuration(eventElapsed)}
                      </span>
                    </Marker>
                  })}
                </div>
              </div>
            ) : null}

            {visibleCharacters > 0 ? (
              <div className="mt-4">
                {visibleSegment(0) ? <p>{visibleSegment(0)}</p> : null}
                {visibleSegment(1) ? <p className="mt-2">{visibleSegment(1)}</p> : null}
                {visibleSegment(2) ? <p className="mt-2 text-muted-foreground">{visibleSegment(2)}</p> : null}
                {!responseComplete ? (
                  <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-foreground align-middle" />
                ) : null}
              </div>
            ) : null}

            {responseComplete ? <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
              <span className="-translate-x-3 px-3 text-xs text-muted-foreground">{text("刚刚", "Just now")}</span>
              <div className="ml-auto flex items-center">
                {[HighlighterIcon, CopyIcon, LanguagesIcon, Volume2Icon, XIcon].map((Icon, index) => (
                  <span key={index} className="flex size-8 items-center justify-center text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                ))}
              </div>
            </div> : null}
          </div> : null}
        </div>
        <div className="notegen-demo-chat-input absolute inset-x-3 z-50 pb-1">
          <InputGroup className="mobile-dock-surface min-h-[82px] flex-col items-stretch gap-1 rounded-[1.35rem] p-1.5">
            {!messageSent && selectedContextCount > 0 ? (
              <ConversationContextStrip count={selectedContextCount} />
            ) : null}
            <div className="relative w-full">
              {activeAssociation ? (
                <ComposerResourceMenu kind={activeAssociation.kind} />
              ) : null}
              <InputGroupTextarea
                aria-label={text("对话输入", "Chat input")}
                placeholder={messageSent || composerText.length === 0 ? text("你可以提问或将记录整理为文章...", "Ask a question or organize records into an article...") : undefined}
                value={messageSent ? "" : composerText}
                readOnly
                className="min-h-10 max-h-10 w-full px-2 py-2 text-sm placeholder:text-[13px]"
              />
            </div>
            <InputGroupAddon align="block-end" className="justify-between p-0">
              <div className="flex items-center gap-1">
                <InputGroupButton size="icon-sm" aria-label={text("添加附件", "Add attachment")}><PaperclipIcon /></InputGroupButton>
                <InputGroupButton size="icon-sm" aria-label={text("选择工具", "Choose tool")}><ToolCaseIcon /></InputGroupButton>
              </div>
              <div className="flex items-center gap-2 pr-1">
                <InputGroupButton size="icon-sm" aria-label={text("权限设置", "Permission settings")}><ShieldQuestionIcon /></InputGroupButton>
                <InputGroupButton
                  size="icon-sm"
                  variant="secondary"
                  aria-label={text("发送", "Send")}
                  disabled={messageSent || !promptFullyTyped}
                  className={cn(
                    "transition-transform",
                    !messageSent && elapsed >= messageSentAt - 160 && "scale-90"
                  )}
                >
                  <SendIcon />
                </InputGroupButton>
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}

function MobileWritingPage() {
  const { lang, text } = useDemoLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [writingElapsed, setWritingElapsed] = useState(0)
  const writingScrollRef = useRef<HTMLElement>(null)
  const writingStreamComplete = writingElapsed >= 5800

  useEffect(() => {
    const startedAt = performance.now()
    const timer = window.setInterval(() => {
      const nextElapsed = Math.min(5800, performance.now() - startedAt)
      setWritingElapsed(nextElapsed)
      if (nextElapsed >= 5800) {
        window.clearInterval(timer)
      }
    }, 32)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (writingStreamComplete) return
    const scrollArea = writingScrollRef.current
    if (!scrollArea) return
    scrollArea.scrollTop = scrollArea.scrollHeight
  }, [writingElapsed, writingStreamComplete])

  return (
    <div className="relative flex h-full flex-col">
      <header className="flex h-14 items-center justify-between gap-2 border-b bg-background px-2">
        <div className="flex shrink-0 items-center">
          {[Undo2Icon, Redo2Icon].map((Icon, index) => (
            <span key={index} className={cn("flex size-10 items-center justify-center", index === 1 && "text-muted-foreground")}>
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {[SearchCodeIcon, ListIcon, FolderIcon].map((Icon, index) => (
            <span key={index} className="flex size-10 items-center justify-center">
              <Icon className="size-4" />
            </span>
          ))}
        </div>
      </header>
      <article
        ref={writingScrollRef}
        className={cn(
          "min-h-0 flex-1 cursor-text overflow-y-auto px-5 pt-6 text-sm leading-7 outline-none",
          isEditing ? "notegen-demo-writing-scroll" : "notegen-demo-under-dock"
        )}
        aria-label={text("编辑周末杭州行程", "Edit weekend Paris itinerary")}
        tabIndex={0}
        onClick={() => setIsEditing(true)}
        onFocus={() => setIsEditing(true)}
      >
        {writingStreamComplete && lang === "en" ? (
          <MobileWritingEnglishDocument />
        ) : writingStreamComplete ? (
          <>
        <h1 className="text-2xl font-semibold tracking-tight">周末杭州行程</h1>
        <p className="mt-4 text-muted-foreground">
          两天以 <strong className="font-semibold text-foreground">西湖、象山和城西</strong>
          为主，减少跨区往返，把时间留给散步、吃饭和临时停留。完整地址都放在
          {" "}
          <a className="font-medium text-foreground underline underline-offset-4" href="#route">
            路线备忘
          </a>
          {" "}里。
        </p>

        <blockquote className="mt-5 border-l-2 pl-4 italic text-muted-foreground">
          不赶景点，只确定每天的一条主线；如果遇到喜欢的地方，就多停一会儿。
        </blockquote>

        <h2 className="mt-7 text-base font-semibold">行程概览</h2>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li>周六：西湖慢走、中国美院象山校区、杭帮菜</li>
          <li>周日：法喜寺、天目里、返程前购买伴手礼</li>
        </ul>

        <div className="mt-5 overflow-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[310px] border-collapse text-left text-xs">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="border-b px-3 py-2 font-medium">日期</th>
                  <th className="border-b px-3 py-2 font-medium">主路线</th>
                  <th className="border-b px-3 py-2 font-medium">步行</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-b px-3 py-2">周六</td>
                  <td className="border-b px-3 py-2">北山街 → 象山</td>
                  <td className="border-b px-3 py-2">约 9 km</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">周日</td>
                  <td className="px-3 py-2">法喜寺 → 天目里</td>
                  <td className="px-3 py-2">约 6 km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="mt-7 text-base font-semibold">周六 · 西湖与象山</h2>
        <h3 className="mt-3 font-medium">09:00—12:00　西湖慢走</h3>
        <p className="mt-1 text-muted-foreground">
          从<mark className="rounded bg-muted px-1 text-foreground">曲院风荷</mark>
          出发，沿北山街走到孤山。途中经过荷区、秋水山庄和西泠桥，不安排固定打卡时间。
        </p>
        <h3 className="mt-4 font-medium">12:15—13:30　午餐</h3>
        <p className="mt-1 text-muted-foreground">
          在孤山附近简单吃面，避开热门餐厅排队，把正式的杭帮菜留到晚上。
        </p>
        <h3 className="mt-4 font-medium">15:00—17:30　中国美院象山校区</h3>
        <p className="mt-1 text-muted-foreground">
          从西湖打车前往象山，重点看建筑与公共空间；离开前预留半小时在附近喝咖啡。
        </p>
        <h3 className="mt-4 font-medium">19:00　杭帮菜晚餐</h3>
        <p className="mt-1 text-muted-foreground">
          选择收藏里的餐厅，提前预约靠窗座位。想吃龙井虾仁、东坡肉和时令蔬菜。
        </p>

        <Separator className="my-7" />

        <h2 className="mt-7 text-base font-semibold">周日 · 法喜寺与天目里</h2>
        <h3 className="mt-3 font-medium">08:30—11:00　法喜寺</h3>
        <p className="mt-1 text-muted-foreground">
          早一点出发避开人流，按收藏的预约说明提前准备证件。寺内慢慢走，不再叠加灵隐寺行程。
        </p>
        <h3 className="mt-4 font-medium">13:30—16:30　天目里</h3>
        <p className="mt-1 text-muted-foreground">
          按画布中的路线逛建筑、书店和小店，中间留出一小时坐下来休息。
        </p>
        <h3 className="mt-4 font-medium">17:00　返程</h3>
        <p className="mt-1 text-muted-foreground">
          前往车站前购买茶叶和糕点，至少提前四十五分钟到达。
        </p>

        <h2 className="mt-7 text-base font-semibold">出发前确认</h2>
        <div className="mt-3 flex flex-col gap-2 text-muted-foreground">
          {([
            ["预约周六晚餐", true],
            ["确认法喜寺开放时间", true],
            ["下载西湖与城西离线路线", false],
            ["携带雨具和舒适的步行鞋", false],
          ] as const).map(([item, checked]) => (
            <div key={item} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded border",
                  checked && "bg-primary text-primary-foreground"
                )}
              >
                {checked ? <CheckIcon className="size-3" /> : null}
              </span>
              <span className={cn(checked && "line-through opacity-60")}>{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-7 text-base font-semibold">雨天备选</h2>
        <p className="mt-2 text-muted-foreground">
          如果天气显示 <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">rain &gt; 70%</code>
          ，将西湖步行替换为浙江省博物馆孤山馆区；象山校区不变，出发时间顺延一小时。
        </p>

        <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-6 text-foreground">
          <code>{`雨天路线
博物馆孤山馆区 → 午餐
→ 象山校区 → 杭帮菜`}</code>
        </pre>

        <p className="mt-5 text-xs text-muted-foreground">
          最后更新：周五 22:30 · <em>天气和开放时间以出发前查询为准</em>
        </p>
          </>
        ) : (
          <MobileWritingStream elapsed={writingElapsed} />
        )}
      </article>
      {isEditing ? (
        <div className="notegen-demo-writing-toolbar absolute inset-x-0 z-40">
          <MobileWritingToolbarDemo />
        </div>
      ) : null}
    </div>
  )
}

function revealWritingText(text: string, elapsed: number, start: number, speed: number) {
  return text.slice(0, Math.max(0, Math.floor((elapsed - start) / speed)))
}

function WritingCursor({ active }: { active: boolean }) {
  return active ? (
    <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-foreground align-middle" />
  ) : null
}

function MobileWritingEnglishDocument() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Weekend in Paris</h1>
      <p className="mt-4 text-muted-foreground">
        Focus the two days on <strong className="font-semibold text-foreground">the Seine, Le Marais, and Montmartre</strong>,
        leaving more time for walks, meals, and spontaneous stops. Full addresses are saved in the{" "}
        <a className="font-medium text-foreground underline underline-offset-4" href="#route">route notes</a>.
      </p>
      <blockquote className="mt-5 border-l-2 pl-4 italic text-muted-foreground">
        Choose one main route each day. If a place feels right, stay a little longer.
      </blockquote>
      <h2 className="mt-7 text-base font-semibold">Itinerary overview</h2>
      <ul className="mt-2 list-disc pl-5 text-muted-foreground">
        <li>Saturday: the Seine, the Louvre courtyard, Le Marais, and a Paris bistro</li>
        <li>Sunday: Montmartre, Musée d’Orsay, and gifts before departure</li>
      </ul>
      <div className="mt-5 overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[310px] border-collapse text-left text-xs">
            <thead className="bg-muted/60 text-foreground">
              <tr>
                <th className="border-b px-3 py-2 font-medium">Day</th>
                <th className="border-b px-3 py-2 font-medium">Main route</th>
                <th className="border-b px-3 py-2 font-medium">Walking</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr>
                <td className="border-b px-3 py-2">Sat</td>
                <td className="border-b px-3 py-2">Île Saint-Louis → Le Marais</td>
                <td className="border-b px-3 py-2">About 8 km</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Sun</td>
                <td className="px-3 py-2">Montmartre → Musée d’Orsay</td>
                <td className="px-3 py-2">About 7 km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="mt-7 text-base font-semibold">Saturday · The Seine and Le Marais</h2>
      <h3 className="mt-3 font-medium">09:00—12:00　Seine walk</h3>
      <p className="mt-1 text-muted-foreground">Start on Île Saint-Louis, walk past the Louvre courtyard to the Tuileries, and leave time for unplanned stops.</p>
      <h3 className="mt-4 font-medium">12:15—13:30　Lunch</h3>
      <p className="mt-1 text-muted-foreground">Have a simple lunch near the Palais Royal and save the classic Paris bistro for dinner.</p>
      <h3 className="mt-4 font-medium">15:00—17:30　Le Marais</h3>
      <p className="mt-1 text-muted-foreground">Explore the galleries and courtyards, with time for coffee before leaving.</p>
      <h2 className="mt-7 text-base font-semibold">Before departure</h2>
      <div className="mt-3 flex flex-col gap-2 text-muted-foreground">
        {([
          ["Book Saturday dinner", true],
          ["Confirm Musée d’Orsay hours", true],
          ["Download the offline route", false],
          ["Pack rain gear and walking shoes", false],
        ] as const).map(([item, checked]) => (
          <div key={item} className="flex items-center gap-2">
            <span className={cn("flex size-4 shrink-0 items-center justify-center rounded border", checked && "bg-primary text-primary-foreground")}>
              {checked ? <CheckIcon className="size-3" /> : null}
            </span>
            <span className={cn(checked && "line-through opacity-60")}>{item}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function MobileWritingStream({ elapsed }: { elapsed: number }) {
  const { text } = useDemoLanguage()
  const title = text("周末杭州行程", "Weekend in Paris")
  const intro = text("两天以西湖、象山和城西为主，减少跨区往返，把时间留给散步、吃饭和临时停留。完整地址都放在路线备忘里。", "Focus the two days on the Seine, Le Marais, and Montmartre, leaving more time for walks, meals, and spontaneous stops.")
  const quote = text("不赶景点，只确定每天的一条主线；如果遇到喜欢的地方，就多停一会儿。", "Choose one main route each day. If a place feels right, stay a little longer.")
  const firstDay = text("周六：西湖慢走、中国美院象山校区、杭帮菜", "Saturday: the Seine, Le Marais, and a Paris bistro")
  const secondDay = text("周日：法喜寺、天目里、返程前购买伴手礼", "Sunday: Montmartre, Musée d’Orsay, and gifts before departure")
  const titleEnd = 220 + title.length * 54
  const introStart = titleEnd + 180
  const introEnd = introStart + intro.length * 17
  const quoteStart = introEnd + 180
  const quoteEnd = quoteStart + quote.length * 19
  const overviewStart = quoteEnd + 220
  const overviewEnd = overviewStart + 260
  const firstDayStart = overviewEnd + 120
  const firstDayEnd = firstDayStart + firstDay.length * 16
  const secondDayStart = firstDayEnd + 100
  const secondDayEnd = secondDayStart + secondDay.length * 16
  const tableStart = secondDayEnd + 220

  return (
    <>
      <h1 className="min-h-8 text-2xl font-semibold tracking-tight">
        {revealWritingText(title, elapsed, 220, 54)}
        <WritingCursor active={elapsed >= 220 && elapsed < titleEnd} />
      </h1>

      {elapsed >= introStart ? (
        <p className="mt-4 text-muted-foreground">
          {revealWritingText(intro, elapsed, introStart, 17)}
          <WritingCursor active={elapsed < introEnd} />
        </p>
      ) : null}

      {elapsed >= quoteStart ? (
        <blockquote className="mt-5 border-l-2 pl-4 italic text-muted-foreground">
          {revealWritingText(quote, elapsed, quoteStart, 19)}
          <WritingCursor active={elapsed < quoteEnd} />
        </blockquote>
      ) : null}

      {elapsed >= overviewStart ? (
        <h2 className="mt-7 text-base font-semibold">
          {revealWritingText(text("行程概览", "Itinerary overview"), elapsed, overviewStart, 52)}
          <WritingCursor active={elapsed < overviewEnd} />
        </h2>
      ) : null}

      {elapsed >= firstDayStart ? (
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li>
            {revealWritingText(firstDay, elapsed, firstDayStart, 16)}
            <WritingCursor active={elapsed < firstDayEnd} />
          </li>
          {elapsed >= secondDayStart ? (
            <li>
              {revealWritingText(secondDay, elapsed, secondDayStart, 16)}
              <WritingCursor active={elapsed < secondDayEnd} />
            </li>
          ) : null}
        </ul>
      ) : null}

      {elapsed >= tableStart ? (
        <div className="mt-5 overflow-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[310px] border-collapse text-left text-xs">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="border-b px-3 py-2 font-medium">{text("日期", "Day")}</th>
                  <th className="border-b px-3 py-2 font-medium">{text("主路线", "Main route")}</th>
                  <th className="border-b px-3 py-2 font-medium">{text("步行", "Walking")}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-b px-3 py-2">
                    {revealWritingText(text("周六", "Sat"), elapsed, tableStart, 70)}
                  </td>
                  <td className="border-b px-3 py-2">
                    {revealWritingText(text("北山街 → 象山", "Île Saint-Louis → Le Marais"), elapsed, tableStart + 140, 32)}
                  </td>
                  <td className="border-b px-3 py-2">
                    {revealWritingText(text("约 9 km", "About 8 km"), elapsed, tableStart + 420, 40)}
                  </td>
                </tr>
                {elapsed >= tableStart + 720 ? (
                  <tr>
                    <td className="px-3 py-2">
                      {revealWritingText(text("周日", "Sun"), elapsed, tableStart + 720, 70)}
                    </td>
                    <td className="px-3 py-2">
                      {revealWritingText(text("法喜寺 → 天目里", "Montmartre → Musée d’Orsay"), elapsed, tableStart + 860, 28)}
                    </td>
                    <td className="px-3 py-2">
                      {revealWritingText(text("约 6 km", "About 7 km"), elapsed, tableStart + 1160, 40)}
                      <WritingCursor active={elapsed < 5800} />
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  )
}

type WritingToolbarMenu = "root" | "ai" | "title" | "list" | "block" | "math" | "diagram"

type WritingToolbarItem =
  | {
      kind: "menu"
      menu: Exclude<WritingToolbarMenu, "root">
      label: string
      icon: typeof SparklesIcon
    }
  | {
      kind: "action"
      action: string
      label: string
      icon: typeof SparklesIcon
    }

const writingToolbarRootItems: WritingToolbarItem[] = [
  { kind: "menu", menu: "ai", label: "AI", icon: SparklesIcon },
  { kind: "menu", menu: "title", label: "标题", icon: Heading2Icon },
  { kind: "menu", menu: "list", label: "列表", icon: ListIcon },
  { kind: "menu", menu: "block", label: "块级", icon: QuoteIcon },
  { kind: "menu", menu: "math", label: "数学", icon: SigmaIcon },
  { kind: "menu", menu: "diagram", label: "图表", icon: WorkflowIcon },
]

const writingToolbarMenuLabels: Record<Exclude<WritingToolbarMenu, "root">, string> = {
  ai: "AI",
  title: "标题",
  list: "列表",
  block: "块级",
  math: "数学",
  diagram: "图表",
}

const writingToolbarSecondaryItems: Record<
  Exclude<WritingToolbarMenu, "root">,
  WritingToolbarItem[]
> = {
  ai: [
    { kind: "action", action: "ai-continue", label: "续写", icon: SparklesIcon },
    { kind: "action", action: "ai-section", label: "生成章节", icon: SparklesIcon },
    { kind: "action", action: "ai-summary", label: "总结全文", icon: SparklesIcon },
    { kind: "action", action: "ai-custom", label: "自定义", icon: SparklesIcon },
  ],
  title: [
    { kind: "action", action: "paragraph", label: "正文", icon: PilcrowIcon },
    { kind: "action", action: "heading-1", label: "一级标题", icon: Heading1Icon },
    { kind: "action", action: "heading-2", label: "二级标题", icon: Heading2Icon },
    { kind: "action", action: "heading-3", label: "三级标题", icon: Heading3Icon },
  ],
  list: [
    { kind: "action", action: "bullet-list", label: "无序列表", icon: ListIcon },
    { kind: "action", action: "ordered-list", label: "有序列表", icon: ListOrderedIcon },
    { kind: "action", action: "task-list", label: "待办列表", icon: CheckSquareIcon },
  ],
  block: [
    { kind: "action", action: "quote", label: "引用", icon: QuoteIcon },
    { kind: "action", action: "code-block", label: "代码块", icon: Code2Icon },
    { kind: "action", action: "divider", label: "分割线", icon: MinusIcon },
    { kind: "action", action: "image", label: "图片", icon: ImagePlusIcon },
    { kind: "action", action: "table", label: "表格", icon: Table2Icon },
  ],
  math: [
    { kind: "action", action: "inline-math", label: "行内公式", icon: SigmaIcon },
    { kind: "action", action: "block-math", label: "块级公式", icon: SigmaIcon },
  ],
  diagram: [
    { kind: "action", action: "flowchart", label: "流程图", icon: GitBranchIcon },
    { kind: "action", action: "sequence", label: "时序图", icon: GitCommitIcon },
    { kind: "action", action: "gantt", label: "甘特图", icon: CalendarDaysIcon },
    { kind: "action", action: "class", label: "类图", icon: LayersIcon },
    { kind: "action", action: "state", label: "状态图", icon: WorkflowIcon },
    { kind: "action", action: "pie", label: "饼图", icon: PieChartIcon },
    { kind: "action", action: "er", label: "ER 图", icon: DatabaseIcon },
    { kind: "action", action: "journey", label: "用户旅程", icon: MapIcon },
  ],
}

const writingToolbarEnglishLabels: Record<string, string> = {
  标题: "Heading",
  列表: "List",
  块级: "Block",
  数学: "Math",
  图表: "Diagram",
  续写: "Continue",
  生成章节: "Generate section",
  总结全文: "Summarize",
  自定义: "Custom",
  正文: "Paragraph",
  一级标题: "Heading 1",
  二级标题: "Heading 2",
  三级标题: "Heading 3",
  无序列表: "Bullet list",
  有序列表: "Numbered list",
  待办列表: "Task list",
  引用: "Quote",
  代码块: "Code block",
  分割线: "Divider",
  图片: "Image",
  表格: "Table",
  行内公式: "Inline math",
  块级公式: "Block math",
  流程图: "Flowchart",
  时序图: "Sequence",
  甘特图: "Gantt",
  类图: "Class",
  状态图: "State",
  饼图: "Pie",
  "ER 图": "ER",
  用户旅程: "Journey",
}

function MobileWritingToolbarDemo() {
  const { lang, text } = useDemoLanguage()
  const [activeMenu, setActiveMenu] = useState<WritingToolbarMenu>("root")
  const items =
    activeMenu === "root"
      ? writingToolbarRootItems
      : writingToolbarSecondaryItems[activeMenu]

  return (
    <div className="border-t bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div
        key={activeMenu}
        className="flex items-center gap-1 overflow-x-auto px-2"
      >
        {activeMenu !== "root" ? (
          <Button
            type="button"
            aria-label={text("返回一级菜单", "Back to main menu")}
            title={text("返回一级菜单", "Back to main menu")}
            size="sm"
            className="h-10 min-w-10 shrink-0 rounded-full px-3 text-xs"
            onClick={() => setActiveMenu("root")}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            <span>{lang === "en" ? writingToolbarEnglishLabels[writingToolbarMenuLabels[activeMenu]] ?? writingToolbarMenuLabels[activeMenu] : writingToolbarMenuLabels[activeMenu]}</span>
          </Button>
        ) : null}

        {items.map((item) => {
          const Icon = item.icon
          const key = item.kind === "menu" ? item.menu : item.action
          const label = lang === "en" ? writingToolbarEnglishLabels[item.label] ?? item.label : item.label

          return (
            <Button
              key={key}
              type="button"
              aria-label={label}
              title={label}
              variant="ghost"
              size="sm"
              className="h-10 min-w-10 shrink-0 rounded-full px-3 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              onClick={() => {
                if (item.kind === "menu") {
                  setActiveMenu(item.menu)
                  return
                }

                setActiveMenu("root")
              }}
            >
              <Icon data-icon="inline-start" />
              <span>{label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function MobileCanvasPage() {
  const { lang, text } = useDemoLanguage()
  const canvases = lang === "en"
    ? ["Weekend Paris Route", "Seine Walk", "Restaurants and Coffee", "Rainy-day Alternative"]
    : ["杭州周末路线", "西湖散步", "餐厅与咖啡", "雨天备选"]

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background px-2">
        <span className="text-sm font-semibold">{text("画布", "Canvas")}</span>
        <div className="ml-auto flex items-center">
          <span className="flex size-10 items-center justify-center"><FilePlus2Icon className="size-5" /></span>
          <span className="flex size-10 items-center justify-center"><EllipsisVerticalIcon className="size-5" /></span>
        </div>
      </header>
      <div className="notegen-demo-under-dock grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-y-auto px-3 pt-3">
        {canvases.map((title, index) => (
          <div key={title} className="relative">
            <button type="button" className="w-full min-w-0 overflow-hidden rounded-xl border bg-background text-left">
              <div className="relative aspect-[4/3] bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:12px_12px]">
                <CanvasThumbnail variant={index} />
              </div>
              <span className="block truncate px-2.5 py-2 text-xs font-medium">{title}</span>
            </button>
            <span className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-md bg-secondary">
              <EllipsisVerticalIcon className="size-3.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
