"use client"

import { memo, useEffect, useState } from "react"
import {
  CalendarDays,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  CopySlash,
  Download,
  Database,
  EllipsisVertical,
  FilePlus,
  FilePlus2,
  FileText,
  Files,
  Filter,
  Folder,
  FolderOpen,
  FolderPlus,
  Grid3X3,
  Highlighter,
  ImageIcon,
  ImagePlus,
  Languages,
  Link,
  List,
  Magnet,
  Maximize2,
  MessageSquareDashed,
  MessageSquarePlus,
  Mic,
  PanelLeft,
  PanelRight,
  Palette,
  Pin,
  Plus,
  Redo2,
  RefreshCw,
  ScanText,
  Search,
  Send,
  Settings,
  ShieldQuestion,
  Sparkles,
  SquarePen,
  Tag,
  Tags,
  ToolCase,
  Trash2,
  Type,
  Undo2,
  WandSparkles,
  Wrench,
  X,
  ZoomOut,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CanvasThumbnail } from "@/components/home/canvas-thumbnail"
import { cn } from "@/lib/utils"

const records = [
  {
    type: "录音",
    title: "西湖边想走慢一点",
    content: "西湖边想走慢一点：曲院风荷、北山街和孤山",
    time: "刚刚",
    icon: Mic,
  },
  {
    type: "链接",
    title: "法喜寺预约与开放时间",
    content: "法喜寺预约、开放时间与出行说明",
    time: "12 分钟前",
    icon: Link,
  },
  {
    type: "文本",
    title: "晚餐想吃杭帮菜",
    content: "晚餐想吃杭帮菜，记得提前订座",
    time: "09:40",
    icon: Type,
  },
  {
    type: "图片",
    title: "天目里建筑与店铺地图",
    content: "天目里建筑与店铺地图",
    time: "昨天",
    icon: ImageIcon,
  },
]

const recordsEn = [
  {
    type: "Audio",
    title: "Take it slow along the Seine",
    content: "A slow walk from Île Saint-Louis past the Louvre to the Tuileries",
    time: "Just now",
    icon: Mic,
  },
  {
    type: "Link",
    title: "Musée d’Orsay reservations and hours",
    content: "Reservation, opening hours, and travel information",
    time: "12 min ago",
    icon: Link,
  },
  {
    type: "Text",
    title: "A Paris bistro for dinner",
    content: "Remember to book a table in advance",
    time: "09:40",
    icon: Type,
  },
  {
    type: "Image",
    title: "Le Marais galleries and shops map",
    content: "Le Marais galleries and shops map",
    time: "Yesterday",
    icon: ImageIcon,
  },
]

const recordTools = [
  CopySlash,
  Mic,
  ScanText,
  ImagePlus,
  Link,
  FilePlus,
  CheckSquare,
]

const recordBadgeTone = {
  录音: "border-rose-300/80 bg-rose-100 text-rose-900 dark:border-rose-900/80 dark:bg-rose-950 dark:text-rose-200",
  链接: "border-blue-300/80 bg-blue-100 text-blue-900 dark:border-blue-900/80 dark:bg-blue-950 dark:text-blue-200",
  文本: "border-lime-300/80 bg-lime-100 text-lime-900 dark:border-lime-900/80 dark:bg-lime-950 dark:text-lime-200",
  图片: "border-fuchsia-300/80 bg-fuchsia-100 text-fuchsia-900 dark:border-fuchsia-900/80 dark:bg-fuchsia-950 dark:text-fuchsia-200",
  Audio: "border-rose-300/80 bg-rose-100 text-rose-900 dark:border-rose-900/80 dark:bg-rose-950 dark:text-rose-200",
  Link: "border-blue-300/80 bg-blue-100 text-blue-900 dark:border-blue-900/80 dark:bg-blue-950 dark:text-blue-200",
  Text: "border-lime-300/80 bg-lime-100 text-lime-900 dark:border-lime-900/80 dark:bg-lime-950 dark:text-lime-200",
  Image: "border-fuchsia-300/80 bg-fuchsia-100 text-fuchsia-900 dark:border-fuchsia-900/80 dark:bg-fuchsia-950 dark:text-fuchsia-200",
} satisfies Record<string, string>

function IconButton({
  icon: Icon,
  active = false,
  className,
}: {
  icon: typeof Search
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground",
        active && "bg-accent text-foreground",
        className
      )}
    >
      <Icon className="size-4" strokeWidth={1.7} />
    </span>
  )
}

const MemoizedEditor = memo(Editor)
const MemoizedEnglishEditor = memo(EnglishEditor)
const MemoizedAgentPanel = memo(AgentPanel)

export function NoteGenDesktopReplica({
  lang = "cn",
  initialWorkspace = "records",
  autoCycle = true,
  panelLayout = "three",
  titleBarMode = "full",
  fill = false,
}: {
  lang?: "cn" | "en"
  initialWorkspace?: Workspace
  autoCycle?: boolean
  panelLayout?: "three" | "left" | "center" | "right"
  titleBarMode?: "full" | "none" | "record-tools" | "writing-tools" | "agent-tools" | "canvas-tools"
  fill?: boolean
}) {
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace)

  useEffect(() => {
    if (!autoCycle) return

    const timer = window.setTimeout(() => {
      setWorkspace((current) => {
        const currentIndex = workspaceTabs.findIndex((tab) => tab.id === current)
        return workspaceTabs[(currentIndex + 1) % workspaceTabs.length].id
      })
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [autoCycle, workspace])

  return (
    <div
      data-testid="notegen-desktop-replica"
      className={cn(
        "w-full overflow-hidden rounded-xl border bg-background text-[9px] leading-normal shadow-xl sm:text-[10px] lg:text-xs",
        fill ? "h-full" : "aspect-[16/10]"
      )}
    >
      {titleBarMode !== "none" ? <DesktopTitleBar lang={lang} mode={titleBarMode} /> : null}
      <div className={cn("overflow-hidden", titleBarMode === "none" ? "h-full" : "h-[calc(100%-36px)]")}>
        <div
          className={cn(
            "grid min-w-0 origin-top-left",
            panelLayout === "three"
              ? "h-full w-full grid-cols-[26%_44%_30%]"
              : "h-[117.647%] w-[117.647%] scale-[0.85] grid-cols-1"
          )}
        >
          {panelLayout === "three" || panelLayout === "left" ? (
            <WorkspaceSidebar lang={lang} workspace={workspace} onWorkspaceChange={setWorkspace} />
          ) : null}
          {panelLayout === "three" || panelLayout === "center" ? (
            <>
              {workspace === "records" ? <RecordDetailReplica lang={lang} /> : null}
              {workspace === "writing" && (lang === "en" ? <MemoizedEnglishEditor /> : <MemoizedEditor />)}
              {workspace === "canvas" ? <CanvasEditorReplica lang={lang} /> : null}
            </>
          ) : null}
          {panelLayout === "three" || panelLayout === "right" ? <MemoizedAgentPanel lang={lang} /> : null}
        </div>
      </div>
    </div>
  )
}

function DesktopTitleBar({
  lang,
  mode,
}: {
  lang: "cn" | "en"
  mode: "full" | "record-tools" | "writing-tools" | "agent-tools" | "canvas-tools"
}) {
  const compactTools = mode === "writing-tools"
    ? [Undo2, Redo2, FilePlus, FolderPlus]
    : mode === "agent-tools"
      ? [Search, MessageSquareDashed, MessageSquarePlus]
      : mode === "canvas-tools"
        ? [Undo2, Redo2, Palette, EllipsisVertical]
        : recordTools
  const titleTools = mode === "full" ? recordTools : compactTools

  return (
    <header className={cn("relative flex h-9 items-center border-b bg-background", mode === "full" ? "pl-[72px]" : "pl-2")}>
      {mode === "full" ? (
        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 gap-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
      ) : null}

      <div className="flex shrink-0 items-center gap-0.5 px-2">
        {titleTools.map((Icon, index) => (
          <IconButton key={index} icon={Icon} />
        ))}
      </div>

      {mode === "full" ? (
        <>
          <div className="mx-auto flex h-6 w-[34%] min-w-44 max-w-md items-center justify-center gap-2 rounded-sm border text-[10px] text-muted-foreground">
            <Search className="size-3.5" strokeWidth={1.7} />
            <span className="truncate">{lang === "en" ? "Search notes, records, and canvases" : "搜索笔记、记录和画布"}</span>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 px-2">
            <IconButton icon={PanelLeft} />
            <IconButton icon={SquarePen} />
            <IconButton icon={PanelRight} />
            <IconButton icon={CalendarDays} />
            <IconButton icon={Cloud} />
            <IconButton icon={Pin} />
            <IconButton icon={Settings} />
          </div>
        </>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
    </header>
  )
}

type Workspace = "writing" | "records" | "canvas"

const workspaceTabs = [
  { id: "writing", label: "写作", icon: Files },
  { id: "records", label: "记录", icon: Highlighter },
  { id: "canvas", label: "画布", icon: Palette },
] satisfies Array<{ id: Workspace; label: string; icon: typeof Files }>

const workspaceTabsEn = [
  { id: "writing", label: "Writing", icon: Files },
  { id: "records", label: "Records", icon: Highlighter },
  { id: "canvas", label: "Canvas", icon: Palette },
] satisfies Array<{ id: Workspace; label: string; icon: typeof Files }>

function WorkspaceTabs({
  lang,
  workspace,
  onWorkspaceChange,
}: {
  lang: "cn" | "en"
  workspace: Workspace
  onWorkspaceChange: (workspace: Workspace) => void
}) {
  return (
    <div
      aria-label={lang === "en" ? "Switch workspace" : "切换工作区"}
      className="flex flex-wrap items-center gap-0.5 rounded-xl border bg-background p-0.5"
    >
      {(lang === "en" ? workspaceTabsEn : workspaceTabs).map(({ id, label, icon: Icon }) => {
        const active = workspace === id

        return (
          <button
            key={id}
            type="button"
            onClick={() => onWorkspaceChange(id)}
            aria-pressed={active}
            aria-label={label}
            className={cn(
              "relative flex h-7 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150 ease-out",
              active
                ? "gap-1.5 bg-muted px-3 text-primary"
                : "px-1.5 text-muted-foreground opacity-70 hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {active ? <span className="whitespace-nowrap text-[10px]">{label}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

function WorkspaceSidebar({
  lang,
  workspace,
  onWorkspaceChange,
}: {
  lang: "cn" | "en"
  workspace: Workspace
  onWorkspaceChange: (workspace: Workspace) => void
}) {
  return (
    <section className="flex min-w-0 flex-col border-r">
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-2">
        <WorkspaceTabs lang={lang} workspace={workspace} onWorkspaceChange={onWorkspaceChange} />
        <WorkspaceActions workspace={workspace} />
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className={cn("absolute inset-0 transition-opacity duration-150", workspace === "writing" ? "opacity-100" : "pointer-events-none opacity-0")}>
          <WritingSidebarContent lang={lang} />
        </div>
        <div className={cn("absolute inset-0 transition-opacity duration-150", workspace === "records" ? "opacity-100" : "pointer-events-none opacity-0")}>
          <RecordsSidebarContent lang={lang} />
        </div>
        <div className={cn("absolute inset-0 transition-opacity duration-150", workspace === "canvas" ? "opacity-100" : "pointer-events-none opacity-0")}>
          <CanvasSidebarContent lang={lang} />
        </div>
      </div>

      <WorkspaceFooter lang={lang} workspace={workspace} />
    </section>
  )
}

function WorkspaceActions({ workspace }: { workspace: Workspace }) {
  const actions = workspace === "writing"
    ? [FilePlus, FolderPlus, RefreshCw, EllipsisVertical]
    : workspace === "canvas"
      ? [FilePlus2, EllipsisVertical]
      : [Filter, Sparkles, EllipsisVertical]

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {workspace === "records" ? (
        <span className="relative flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground">
          <Tag className="size-4" strokeWidth={1.7} />
          <Plus className="absolute right-1 top-1 size-2.5 rounded-full bg-background" strokeWidth={2.2} />
        </span>
      ) : null}
      {actions.map((Icon, index) => (
        <IconButton key={`${workspace}-${index}`} icon={Icon} />
      ))}
    </div>
  )
}

function RecordsSidebarContent({ lang }: { lang: "cn" | "en" }) {
  const visibleRecords = lang === "en" ? recordsEn : records

  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <div className="border-b">
        <div className="flex h-10 items-center justify-between px-3 font-medium">
          <div className="flex min-w-0 items-center gap-2">
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
            <Tags className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{lang === "en" ? "Paris trip" : "杭州旅行"}</span>
          </div>
          <span className="text-[10px] font-normal text-muted-foreground">4</span>
        </div>
        <div className="border-t border-border/60">
          {visibleRecords.map((record, index) => (
            <RecordItem key={record.title} record={record} active={index === 0} />
          ))}
        </div>
      </div>

      <div className="flex h-10 items-center justify-between px-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChevronRight className="size-3.5" />
          <Tags className="size-3.5" />
          <span>{lang === "en" ? "Product ideas" : "产品想法"}</span>
        </div>
        <span className="text-[10px]">7</span>
      </div>
      <div className="flex h-10 items-center justify-between border-t px-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChevronRight className="size-3.5" />
          <Tags className="size-3.5" />
          <span>{lang === "en" ? "Daily notes" : "日常记录"}</span>
        </div>
        <span className="text-[10px]">18</span>
      </div>
    </div>
  )
}

function WritingSidebarContent({ lang }: { lang: "cn" | "en" }) {
  const files = lang === "en" ? [
    { label: "00 Inbox", depth: 0, folder: true, open: true },
    { label: "Places to Visit.md", depth: 1, folder: false },
    { label: "01 Projects", depth: 0, folder: true, open: true },
    { label: "Paris Trip", depth: 1, folder: true, open: true },
    { label: "Weekend Itinerary.md", depth: 2, folder: false, active: true },
    { label: "Saved Restaurants.md", depth: 2, folder: false },
    { label: "02 Areas", depth: 0, folder: true },
    { label: "03 Resources", depth: 0, folder: true },
  ] : [
    { label: "00 Inbox", depth: 0, folder: true, open: true },
    { label: "杭州想去的地方.md", depth: 1, folder: false },
    { label: "01 Projects", depth: 0, folder: true, open: true },
    { label: "杭州旅行", depth: 1, folder: true, open: true },
    { label: "周末杭州行程.md", depth: 2, folder: false, active: true },
    { label: "餐厅收藏.md", depth: 2, folder: false },
    { label: "02 Areas", depth: 0, folder: true },
    { label: "03 Resources", depth: 0, folder: true },
  ]

  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <div className="p-2">
        <div className="flex h-7 items-center gap-2 rounded-md border px-2 text-muted-foreground">
          <Search className="size-3.5" />
          <span>{lang === "en" ? "Search files" : "搜索文件"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-2">
        {files.map((file) => (
          <div
            key={file.label}
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-md pr-2",
              file.active && "bg-accent font-medium"
            )}
            style={{ paddingLeft: 8 + file.depth * 14 }}
          >
            <span className="flex size-3 shrink-0 items-center justify-center text-muted-foreground">
              {file.folder ? (
                file.open ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />
              ) : null}
            </span>
            {file.folder ? (
              <Folder className="size-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <FileText className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{file.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CanvasSidebarContent({ lang }: { lang: "cn" | "en" }) {
  const canvases = lang === "en" ? [
    ["Weekend Paris Route", "3 nodes · Just now"],
    ["Seine Walk", "4 nodes · Today"],
    ["Restaurants and Coffee", "5 nodes · Yesterday"],
    ["Rainy-day Alternative", "4 nodes · Yesterday"],
  ] : [
    ["杭州周末路线", "3 个节点 · 刚刚"],
    ["西湖散步", "4 个节点 · 今天"],
    ["餐厅与咖啡", "5 个节点 · 昨天"],
    ["雨天备选", "4 个节点 · 昨天"],
  ]

  return (
    <div className="min-h-0 flex-1 overflow-hidden p-2">
      <div className="mb-2 flex h-7 items-center gap-2 rounded-md border px-2 text-muted-foreground">
        <Search className="size-3.5" />
        <span>{lang === "en" ? "Search canvases" : "搜索画布"}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {canvases.map(([name, meta], index) => (
          <div
            key={name}
            className={cn(
              "min-w-0 overflow-hidden rounded-lg border bg-background",
              index === 0 && "ring-1 ring-foreground/30"
            )}
          >
            <div className="relative aspect-[4/3] border-b bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:10px_10px]">
              <CanvasThumbnail variant={index} />
            </div>
            <div className="min-w-0 px-2 py-1.5">
              <p className="truncate font-medium">{name}</p>
              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkspaceFooter({ lang, workspace }: { lang: "cn" | "en"; workspace: Workspace }) {
  const englishLabel = workspace === "writing"
    ? "Local workspace · 6 files"
    : workspace === "canvas"
      ? "4 canvases"
      : "Showing 4 records"
  const label = workspace === "writing"
      ? "本地工作区 · 6 个文件"
    : workspace === "canvas"
      ? "共 4 个画布"
      : "当前显示 4 条记录"

  return (
    <footer className="flex h-6 shrink-0 items-center border-t bg-background px-2 text-[10px] text-muted-foreground">
      <span>{lang === "en" ? englishLabel : label}</span>
    </footer>
  )
}

function RecordItem({
  record,
  active,
}: {
  record: (typeof records)[number] | (typeof recordsEn)[number]
  active?: boolean
}) {
  const Icon = record.icon

  return (
    <div className={cn("border-b border-border/60 px-3 py-2.5", active && "bg-accent")}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex h-4 items-center gap-1 rounded border px-1.5 text-[9px] font-medium",
            recordBadgeTone[record.type as keyof typeof recordBadgeTone]
          )}
        >
          <Icon className="size-2.5" />
          {record.type}
        </span>
        <span className="shrink-0 text-[9px] text-muted-foreground">{record.time}</span>
      </div>
      <p className="truncate font-medium">{record.title}</p>
      <p className="mt-1 truncate text-[10px] text-muted-foreground">{record.content}</p>
    </div>
  )
}

function SharedEditorTabs({
  lang,
  workspace,
}: {
  lang: "cn" | "en"
  workspace: Workspace
}) {
  const isEnglish = lang === "en"
  const tabs = [
    {
      id: "writing",
      kind: "file" as const,
      label: isEnglish ? "Weekend Itinerary.md" : "周末杭州行程.md",
      active: workspace === "writing",
    },
    {
      id: "records",
      kind: "record" as const,
      label: isEnglish ? "Seine walk" : "西湖边想走慢一点",
      active: workspace === "records",
    },
    {
      id: "canvas",
      kind: "canvas" as const,
      label: isEnglish ? "Paris Route" : "杭州周末路线",
      active: workspace === "canvas",
    },
  ]

  return (
    <div className="flex h-12 shrink-0 items-center border-b bg-background">
      <div className="flex h-full shrink-0 items-center gap-0.5 border-r px-2">
        <IconButton icon={Undo2} className="text-foreground" />
        <IconButton icon={Redo2} className="opacity-35" />
      </div>
      <div className="flex min-w-0 flex-1 items-center overflow-hidden px-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "relative flex h-9 min-w-0 flex-1 items-center gap-1.5 px-2.5",
              tab.active ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {tab.kind === "record" ? (
              <Mic className={cn("size-3.5 shrink-0 text-rose-500", tab.active && "text-rose-600")} />
            ) : tab.kind === "canvas" ? (
              <Palette className={cn("size-3.5 shrink-0", tab.active && "text-primary")} />
            ) : (
              <FileText className={cn("size-3.5 shrink-0", tab.active && "text-primary")} />
            )}
            <span className="truncate">{tab.label}</span>
            {tab.active ? <X className="size-3 shrink-0 text-muted-foreground/70" /> : null}
            {tab.active ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" /> : null}
          </div>
        ))}
        <IconButton icon={Plus} className="ml-auto mr-1" />
      </div>
    </div>
  )
}

function RecordDetailReplica({ lang }: { lang: "cn" | "en" }) {
  const isEnglish = lang === "en"

  return (
    <section className="flex min-h-0 min-w-0 flex-col border-r">
      <SharedEditorTabs lang={lang} workspace="records" />

      <div className="shrink-0 border-b bg-background/95 px-5 py-3">
        <div className="flex min-w-0 items-center gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
            <Mic className="size-11 text-rose-500/20" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className={cn(
                  "shrink-0 rounded border px-2 py-0.5 text-[9px] font-medium",
                  recordBadgeTone[isEnglish ? "Audio" : "录音"]
                )}>
                  {isEnglish ? "Audio" : "录音"}
                </span>
                <span className="truncate text-[9px] text-muted-foreground">
                  2026-07-31 09:40:12
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <IconButton icon={Tag} className="size-7" />
                <IconButton icon={FolderOpen} className="size-7" />
                <IconButton icon={Sparkles} className="size-7" />
                <IconButton icon={Trash2} className="size-7 text-destructive/70" />
              </div>
            </div>
            <p className="truncate text-[10px] text-muted-foreground">
              {isEnglish ? "Take it slow along the Seine" : "西湖边想走慢一点"}
            </p>
          </div>
        </div>
      </div>

      <article className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="flex flex-col gap-3 border-b px-5 py-4">
          <h2 className="text-[10px] font-medium text-muted-foreground">
            {isEnglish ? "Audio" : "录音"}
          </h2>
          <div className="flex h-11 items-center gap-3 rounded-md border px-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <Mic className="size-3" />
            </span>
            <div className="flex h-6 min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
              {[8, 13, 18, 10, 22, 16, 25, 12, 19, 8, 14, 21, 11, 17, 9, 13, 7, 15, 10, 6].map((height, index) => (
                <span
                  key={index}
                  className={cn("w-0.5 shrink-0 rounded-full", index < 9 ? "bg-foreground/70" : "bg-muted-foreground/25")}
                  style={{ height }}
                />
              ))}
            </div>
            <span className="shrink-0 text-[9px] text-muted-foreground">00:42</span>
          </div>
        </section>
        <section className="px-5 py-4">
          <h2 className="text-[10px] font-medium text-muted-foreground">
            {isEnglish ? "Content" : "内容"}
          </h2>
          <div className="mt-4 leading-6">
            <p>
              {isEnglish
                ? "I want to take it slow along the Seine. Start on Île Saint-Louis, walk past the Louvre, and reach the Tuileries before lunch."
                : "西湖边想走慢一点。从曲院风荷出发，沿北山街走到孤山，中午之前结束这段路线。"}
            </p>
            <p className="mt-3 text-muted-foreground">
              {isEnglish
                ? "Leave enough time for unplanned stops and do not schedule fixed check-in times."
                : "给散步和临时停留留出时间，不安排固定的打卡节点。"}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-[9px] text-muted-foreground">
            <span>{isEnglish ? "61 characters · 2 lines" : "42 字 · 2 行"}</span>
          </div>
        </section>
      </article>
    </section>
  )
}

function CanvasEditorReplica({ lang }: { lang: "cn" | "en" }) {
  const isEnglish = lang === "en"
  const tools = [SquarePen, Type, FileText, ImagePlus, Link, CheckSquare]

  return (
    <section className="flex min-h-0 min-w-0 flex-col border-r">
      <SharedEditorTabs lang={lang} workspace="canvas" />
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:14px_14px]">
        <svg
          className="pointer-events-none absolute inset-0 size-full text-muted-foreground/50"
          viewBox="0 0 500 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 185 105 C 250 105, 245 190, 305 190" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 305 215 C 260 270, 230 285, 190 305" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="185" cy="105" r="2.5" fill="currentColor" />
          <circle cx="305" cy="190" r="2.5" fill="currentColor" />
          <circle cx="190" cy="305" r="2.5" fill="currentColor" />
        </svg>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-0.5 rounded-lg border bg-background p-1 shadow-sm">
          {tools.map((Icon, index) => (
            <span key={index} className={cn("flex size-7 items-center justify-center rounded-md text-muted-foreground", index === 0 && "bg-muted text-foreground")}>
              <Icon className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="absolute left-[17%] top-[15%] w-[36%] rounded-md border bg-background shadow-sm">
          <div className="flex items-center gap-1.5 border-b px-3 py-2 text-[9px] text-muted-foreground">
            <FileText className="size-3" />
            {isEnglish ? "Note" : "笔记"}
          </div>
          <div className="p-3">
            <p className="font-medium">{isEnglish ? "Seine walking route" : "西湖步行路线"}</p>
            <p className="mt-1.5 text-[9px] leading-4 text-muted-foreground">
              {isEnglish ? "Île Saint-Louis → Louvre → Tuileries" : "曲院风荷 → 北山街 → 孤山"}
            </p>
          </div>
        </div>
        <div className="absolute right-[7%] top-[40%] w-[36%] rounded-md border-2 border-primary/70 bg-background shadow-md">
          <div className="flex items-center gap-1.5 border-b px-3 py-2 text-[9px] text-muted-foreground">
            <Mic className="size-3 text-rose-500" />
            {isEnglish ? "Record" : "记录"}
          </div>
          <div className="p-3">
            <p className="font-medium">{isEnglish ? "Take it slow along the Seine" : "西湖边想走慢一点"}</p>
            <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-muted-foreground">
              {isEnglish ? "Keep Saturday morning open for walking and unplanned stops." : "周六上午留给散步和临时停留，不安排固定打卡时间。"}
            </p>
          </div>
        </div>
        <div className="absolute bottom-[9%] left-[20%] w-[36%] rounded-md border bg-background shadow-sm">
          <div className="flex items-center gap-1.5 border-b px-3 py-2 text-[9px] text-muted-foreground">
            <Link className="size-3 text-blue-500" />
            {isEnglish ? "Link" : "链接"}
          </div>
          <div className="p-3">
            <p className="font-medium">{isEnglish ? "Musée d’Orsay reservation" : "法喜寺预约说明"}</p>
            <p className="mt-1.5 truncate text-[9px] text-muted-foreground">
              {isEnglish ? "example.com/paris-orsay" : "example.com/hangzhou-faxi"}
            </p>
          </div>
        </div>
      </div>
      <footer className="flex h-6 shrink-0 items-center justify-between border-t bg-background px-3 text-[9px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Grid3X3 className="size-3" />
          <Magnet className="size-3" />
          <WandSparkles className="size-3" />
          <Download className="size-3" />
        </div>
        <div className="flex items-center gap-2">
          <ZoomOut className="size-3" />
          <span>100%</span>
          <Maximize2 className="size-3" />
        </div>
      </footer>
    </section>
  )
}

function EnglishEditor() {
  return (
    <section className="flex min-h-0 min-w-0 flex-col border-r">
      <SharedEditorTabs lang="en" workspace="writing" />
      <article className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto max-w-[590px] px-[8%] py-[7%]">
          <h1 className="text-[clamp(20px,2.1vw,30px)] font-bold tracking-tight">Weekend in Paris</h1>
          <p className="mt-4 leading-6 text-muted-foreground">
            Focus the two days on <strong className="font-semibold text-foreground">the Seine, Le Marais, and Montmartre</strong>,
            leaving more time for walks, meals, and spontaneous stops.
          </p>
          <blockquote className="my-5 border-l-2 pl-4 italic leading-5 text-muted-foreground">
            Choose one main route each day. If a place feels right, stay a little longer.
          </blockquote>
          <h2 className="mt-6 text-sm font-semibold">Itinerary overview</h2>
          <ul className="mt-2 list-disc pl-5 leading-6 text-muted-foreground">
            <li>Saturday: the Seine, the Louvre courtyard, Le Marais, and a Paris bistro</li>
            <li>Sunday: Montmartre, Musée d’Orsay, and gifts before departure</li>
          </ul>
          <div className="mt-5 overflow-hidden rounded-lg border">
            <table className="w-full border-collapse text-left text-[10px]">
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
          <h2 className="mt-6 text-sm font-semibold">Saturday · The Seine and Le Marais</h2>
          <h3 className="mt-3 font-medium">09:00—12:00　Seine walk</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            Start on Île Saint-Louis and walk past the Louvre courtyard to the Tuileries, leaving time for unplanned stops.
          </p>
          <h3 className="mt-4 font-medium">12:15—13:30　Lunch</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            Have a simple lunch near the Palais Royal and save the classic Paris bistro for dinner.
          </p>
          <h3 className="mt-4 font-medium">15:00—17:30　Le Marais</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            Explore the architecture and public spaces, with time for coffee before leaving.
          </p>
          <h2 className="mt-6 text-sm font-semibold">Before departure</h2>
          <div className="mt-3 flex flex-col gap-2 text-muted-foreground">
            {(["Book Saturday dinner", "Confirm Musée d’Orsay hours", "Download the offline route", "Pack rain gear"] as const).map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <span className={cn("flex size-4 shrink-0 items-center justify-center rounded border", index < 2 && "bg-primary text-primary-foreground")}>
                  {index < 2 ? <Check className="size-3" /> : null}
                </span>
                <span className={cn(index < 2 && "line-through opacity-60")}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
      <footer className="flex h-6 shrink-0 items-center justify-between border-t bg-background px-3 text-[9px] text-muted-foreground">
        <span>862 characters · 4 min</span>
        <span className="flex items-center gap-1"><Cloud className="size-3" /> Synced</span>
      </footer>
    </section>
  )
}

function Editor() {
  return (
    <section className="flex min-h-0 min-w-0 flex-col border-r">
      <SharedEditorTabs lang="cn" workspace="writing" />

      <article className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto max-w-[590px] px-[8%] py-[7%]">
          <h1 className="text-[clamp(20px,2.1vw,30px)] font-bold tracking-tight">
            周末杭州行程
          </h1>
          <p className="mt-4 leading-6 text-muted-foreground">
            两天以 <strong className="font-semibold text-foreground">西湖、象山和城西</strong>
            为主，减少跨区往返，把时间留给散步、吃饭和临时停留。完整地址都放在
            <span className="font-medium text-foreground underline underline-offset-2">路线备忘</span>里。
          </p>

          <blockquote className="my-5 border-l-2 pl-4 italic leading-5 text-muted-foreground">
            不赶景点，只确定每天的一条主线；如果遇到喜欢的地方，就多停一会儿。
          </blockquote>

          <h2 className="mt-6 text-sm font-semibold">行程概览</h2>
          <ul className="mt-2 list-disc pl-5 leading-6 text-muted-foreground">
            <li>周六：西湖慢走、中国美院象山校区、杭帮菜</li>
            <li>周日：法喜寺、天目里、返程前购买伴手礼</li>
          </ul>

          <div className="mt-5 overflow-hidden rounded-lg border">
            <table className="w-full border-collapse text-left text-[10px]">
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

          <h2 className="mt-6 text-sm font-semibold">周六 · 西湖与象山</h2>
          <h3 className="mt-3 font-medium">09:00—12:00　西湖慢走</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            从<mark className="rounded bg-muted px-1 text-foreground">曲院风荷</mark>
            出发，沿北山街走到孤山。途中经过荷区、秋水山庄和西泠桥，不安排固定打卡时间。
          </p>
          <h3 className="mt-4 font-medium">12:15—13:30　午餐</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            在孤山附近简单吃面，避开热门餐厅排队，把正式的杭帮菜留到晚上。
          </p>
          <h3 className="mt-4 font-medium">15:00—17:30　中国美院象山校区</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            从西湖打车前往象山，重点看建筑与公共空间；离开前预留半小时在附近喝咖啡。
          </p>
          <h3 className="mt-4 font-medium">19:00　杭帮菜晚餐</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            选择收藏里的餐厅，提前预约靠窗座位。想吃龙井虾仁、东坡肉和时令蔬菜。
          </p>

          <Separator className="my-6" />

          <h2 className="text-sm font-semibold">周日 · 法喜寺与天目里</h2>
          <h3 className="mt-3 font-medium">08:30—11:00　法喜寺</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            早一点出发避开人流，按收藏的预约说明提前准备证件。寺内慢慢走，不再叠加灵隐寺行程。
          </p>
          <h3 className="mt-4 font-medium">13:30—16:30　天目里</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            按画布中的路线逛建筑、书店和小店，中间留出一小时坐下来休息。
          </p>
          <h3 className="mt-4 font-medium">17:00　返程</h3>
          <p className="mt-1 leading-6 text-muted-foreground">
            前往车站前购买茶叶和糕点，至少提前四十五分钟到达。
          </p>

          <h2 className="mt-6 text-sm font-semibold">出发前确认</h2>
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
                  {checked ? <Check className="size-3" /> : null}
                </span>
                <span className={cn(checked && "line-through opacity-60")}>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-6 text-sm font-semibold">雨天备选</h2>
          <p className="mt-2 leading-6 text-muted-foreground">
            如果天气显示{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
              rain &gt; 70%
            </code>
            ，将西湖步行替换为浙江省博物馆孤山馆区；象山校区不变，出发时间顺延一小时。
          </p>

          <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-[10px] leading-5 text-foreground">
            <code>{`雨天路线
博物馆孤山馆区 → 午餐
→ 象山校区 → 杭帮菜`}</code>
          </pre>

          <p className="mt-5 text-[9px] text-muted-foreground">
            最后更新：周五 22:30 · <em>天气和开放时间以出发前查询为准</em>
          </p>
        </div>
      </article>

      <footer className="flex h-6 shrink-0 items-center justify-between border-t bg-background px-3 text-[9px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>862 字符 · 4 分钟</span>
          <Code2 className="size-3" />
          <Copy className="size-3" />
          <Download className="size-3" />
          <span className="flex items-center gap-1">
            <List className="size-3" />
            大纲
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="size-3" />
          <span>已同步</span>
        </div>
      </footer>
    </section>
  )
}

function AgentPanel({ lang }: { lang: "cn" | "en" }) {
  const [processOpen, setProcessOpen] = useState(true)
  const agentEvents = lang === "en" ? [
    "Records · Read 3 Paris items",
    "Canvas · Read weekend Paris route",
    "Notes · Search Paris travel history",
    "Notes · Write Weekend Itinerary.md",
  ] : [
    "记录 · 读取 3 条杭州收藏",
    "画布 · 读取杭州周末路线",
    "笔记 · 检索杭州旅行历史",
    "笔记 · 写入周末杭州行程.md",
  ]

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <header className="flex h-12 shrink-0 items-center justify-between border-b px-3">
        <div className="flex min-w-0 items-center gap-1.5 font-medium">
          <span className="truncate">{lang === "en" ? "Weekend in Paris" : "杭州周末行程"}</span>
          <span className="text-[10px] font-normal text-muted-foreground">(3)</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1">
          <IconButton icon={MessageSquareDashed} />
          <IconButton icon={MessageSquarePlus} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-lg border bg-muted/35 px-3 py-2 leading-5">
            {lang === "en" ? "Use this material to organize and save a weekend Paris itinerary." : "结合这些内容，整理周末杭州行程并保存。"}
          </div>
        </div>

        <div>
          <button
            type="button"
            aria-expanded={processOpen}
            onClick={() => setProcessOpen((open) => !open)}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-1 py-1.5 text-left transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-2 font-medium">
              <Check className="size-3.5" />
              {lang === "en" ? "Processed" : "已处理"}
            </div>
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
              {lang === "en" ? "3.7s · 4 actions" : "3.7s · 执行 4 次"}
              <ChevronRight className={cn("size-3 transition-transform", processOpen && "rotate-90")} />
            </span>
          </button>
          {processOpen ? <div className="ml-1 border-l pl-3 pt-1">
            <div className="mb-1 flex items-center gap-2 py-1 text-[10px] text-muted-foreground">
              <Cloud className="size-3" />
              <span>{lang === "en" ? "Found 2 knowledge sources · Used trip-planner" : "检索到 2 个知识库来源 · 已使用 trip-planner"}</span>
            </div>
            {agentEvents.map((label) => (
              <div key={label} className="flex items-center gap-2 py-1 text-[10px] text-muted-foreground">
                <Wrench className="size-3" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div> : null}
        </div>

        <div className="leading-5">
          <p>{lang === "en" ? "I read 3 related travel records, 1 route canvas, and 2 previous notes." : "已读取关联的 3 条旅行记录、1 个路线画布和 2 篇历史笔记。"}</p>
          <p className="mt-2">{lang === "en" ? "I reorganized the two-day route and added restaurant bookings, a rainy-day alternative, and a return reminder." : "我重新安排了两天路线，减少跨区往返，并补充了餐厅预约、雨天备选和返程提醒。"}</p>
          <p className="mt-2 text-muted-foreground">{lang === "en" ? "The itinerary is saved. Opening it in Writing now." : "行程已保存，正在为你打开写作页面。"}</p>
        </div>
      </div>

      <div className="shrink-0 p-1">
        <div className="rounded-lg border bg-background shadow-sm">
          <div className="min-h-12 px-3 py-2 text-muted-foreground">
            {lang === "en" ? "Ask a question or organize records into an article..." : "你可以提问或将记录整理为文章..."}
          </div>
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              <IconButton icon={Plus} />
              <IconButton icon={Languages} />
              <IconButton icon={Tags} />
              <IconButton icon={Files} />
              <IconButton icon={Database} />
              <IconButton icon={ToolCase} />
            </div>
            <div className="flex items-center gap-2 pr-1">
              <span className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[10px] text-muted-foreground">
                <ShieldQuestion className="size-4" />
                <span>{lang === "en" ? "Ask" : "询问"}</span>
              </span>
              <span className="flex h-8 items-center justify-center rounded-md bg-primary px-3 text-primary-foreground">
                <Send className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
