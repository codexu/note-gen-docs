"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
import { NoteGenDesktopReplica } from "@/components/home/notegen-desktop-replica"

const desktopRecords = [
  ["语音", "西湖边想走慢一点", "曲院风荷、北山街和孤山安排在周六上午。", "刚刚"],
  ["链接", "法喜寺预约说明", "https://example.com/hangzhou-faxi", "12 分钟前"],
  ["文本", "想吃的杭帮菜", "龙井虾仁、东坡肉，记得提前订晚餐。", "09:40"],
  ["图片", "天目里建筑路线", "保存了园区地图和几家想逛的小店。", "昨天"],
]

const mobileRecords = [
  { type: "recording", label: "录音", preview: "西湖边想走慢一点：曲院风荷、北山街和孤山", time: "10:42" },
  { type: "link", label: "链接", preview: "法喜寺预约与开放时间", time: "10:16" },
  { type: "text", label: "文本", preview: "晚餐想吃杭帮菜，记得提前订座", time: "09:40" },
]

const mobileRecordTone = {
  recording: "border-rose-300/80 bg-rose-100 text-rose-900",
  link: "border-blue-300/80 bg-blue-100 text-blue-900",
  text: "border-lime-300/80 bg-lime-100 text-lime-900",
  image: "border-fuchsia-300/80 bg-fuchsia-100 text-fuchsia-900",
}

export function NoteGenDemo() {
  return (
    <div className="flex flex-col gap-20">
      <section
        aria-label="NoteGen 桌面端与移动端预览"
        className="relative mx-auto w-full"
      >
        <div className="hidden w-full pb-[3.5%] md:block">
          <div className="w-[96%]">
            <MacBookFrame>
              <NoteGenDesktopReplica />
            </MacBookFrame>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px] px-2 md:absolute md:bottom-0 md:right-0 md:mx-0 md:w-[23%] md:min-w-[170px] md:max-w-[360px] md:px-0">
          <MobileReplica />
        </div>
      </section>

      <section className="hidden md:block">
        <DesktopScenes />
      </section>
    </div>
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
  return (
    <div className="mt-16 flex flex-col gap-28">
      <DesktopScene
        badge="记录"
        title="先把发生的事情留下。"
        description="文字、语音、截图、图片、链接、文件和待办进入同一条记录流。标签以折叠分组呈现，真正需要时再筛选和整理。"
      >
        <RecordScene />
      </DesktopScene>
      <DesktopScene
        badge="写作"
        title="在普通 Markdown 文件里继续。"
        description="文件树、标签页、编辑工具栏和正文处在同一个连续界面。内容最终仍然是你可以随时打开和迁移的普通文件。"
        reverse
      >
        <WritingScene />
      </DesktopScene>
      <DesktopScene
        badge="Agent"
        title="让 Agent 使用你的本地知识。"
        description="Agent 在右侧执行检索、读取文件和整理结构。过程、引用来源和最终回答都保留在同一个对话上下文中。"
      >
        <AgentScene />
      </DesktopScene>
      <DesktopScene
        badge="画布"
        title="把材料放到无限画布上。"
        description="笔记、图片、网页和 AI 生成结果可以成为独立节点。用连接关系梳理研究、流程和仍未成形的想法。"
        reverse
      >
        <CanvasScene />
      </DesktopScene>
    </div>
  )
}

function DesktopScene({
  badge,
  title,
  description,
  reverse = false,
  children,
}: {
  badge: string
  title: string
  description: string
  reverse?: boolean
  children: React.ReactNode
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
      <div className={cn("flex flex-col gap-5", reverse && "lg:order-2")}>
        <Badge variant="outline" className="w-fit">{badge}</Badge>
        <h3 className="text-balance text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h3>
        <p className="text-pretty text-base leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className={cn("overflow-hidden rounded-[1.25rem] bg-muted/40 p-3", reverse && "lg:order-1")}>
        {children}
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
  const contexts = [
    { icon: HighlighterIcon, label: "西湖边想走慢一点" },
    { icon: PaletteIcon, label: "杭州周末路线" },
    { icon: FileTextIcon, label: "餐厅收藏.md" },
  ].slice(0, count)

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
            <Button type="button" variant="ghost" size="icon-xs" className="shrink-0" aria-label={`移除 ${label}`}>
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
  const resources = {
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
  } satisfies Record<AssociationKind, {
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
      aria-label="关联内容"
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

function SceneWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-background text-[9px] shadow-lg lg:text-[10px]">
      <div className="flex h-8 items-center border-b px-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <div className="flex flex-1 justify-center font-medium">NoteGen</div>
        <span className="text-muted-foreground">本地工作区</span>
      </div>
      <div className="h-[calc(100%-32px)]">{children}</div>
    </div>
  )
}

function RecordScene() {
  return (
    <SceneWindow>
      <div className="grid h-full grid-cols-[42%_58%]">
        <div className="flex min-w-0 flex-col border-r">
          <div className="flex h-11 items-center justify-between border-b px-3">
            <div className="flex items-center gap-2 font-medium">
              <HighlighterIcon className="size-3.5" /> 记录
            </div>
            <div className="flex gap-1">
              <FilterIcon className="size-3.5" />
              <PlusIcon className="size-3.5" />
            </div>
          </div>
          <div className="flex h-9 items-center gap-2 border-b px-3 font-medium">
            <ChevronDownIcon className="size-3" /> 杭州旅行
            <span className="font-normal text-muted-foreground">4</span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            {desktopRecords.map(([type, title, body, time], index) => (
              <div key={title} className={cn("border-b px-3 py-3", index === 0 && "bg-muted/60")}>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="h-4 px-1 text-[8px]">{type}</Badge>
                  <span className="text-[8px] text-muted-foreground">{time}</span>
                </div>
                <p className="mt-1.5 truncate font-medium">{title}</p>
                <p className="mt-1 truncate text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <div className="flex h-6 items-center border-t px-3 text-[8px] text-muted-foreground">当前显示 4 条记录</div>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex h-11 items-center justify-between border-b px-3">
            <span className="font-medium">整理记录</span>
            <Badge variant="secondary" className="h-4 text-[8px]">3 条已选择</Badge>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <p className="font-mono text-[8px] text-muted-foreground">TRAVEL / WEEKEND</p>
            <h4 className="text-base font-semibold">整理杭州周末行程</h4>
            <p className="leading-5 text-muted-foreground">
              将收藏的地点、预约链接和用餐想法放入同一个上下文，生成两天行程。
            </p>
            <div className="flex flex-col gap-2 rounded-lg border p-3">
              {["语音 · 西湖散步路线", "链接 · 法喜寺预约", "文本 · 杭帮菜清单"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="flex size-4 items-center justify-center rounded border"><CheckIcon className="size-2.5" /></span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto flex justify-end">
              <span className="rounded-md bg-foreground px-3 py-1.5 text-background">生成行程</span>
            </div>
          </div>
        </div>
      </div>
    </SceneWindow>
  )
}

function WritingScene() {
  return (
    <SceneWindow>
      <div className="grid h-full grid-cols-[30%_70%]">
        <div className="flex min-w-0 flex-col border-r">
          <div className="flex h-11 items-center justify-between border-b px-3">
            <div className="flex items-center gap-2 font-medium"><FilesIcon className="size-3.5" /> 文件</div>
            <PlusIcon className="size-3.5" />
          </div>
          <div className="p-2">
            <div className="flex h-7 items-center gap-2 rounded-md border px-2 text-muted-foreground">
              <SearchIcon className="size-3" /> 搜索文件
            </div>
          </div>
          <div className="flex flex-col gap-0.5 px-2">
            {[
              ["▾", "00 Inbox", 0],
              ["", "杭州想去的地方.md", 1],
              ["▾", "01 Projects", 0],
              ["▾", "杭州旅行", 1],
              ["", "周末杭州行程.md", 2],
              ["", "餐厅收藏.md", 2],
              ["›", "02 Areas", 0],
              ["›", "03 Resources", 0],
            ].map(([marker, label, depth]) => (
              <div
                key={label}
                className={cn("flex h-7 items-center gap-1.5 rounded-md px-2", label === "周末杭州行程.md" && "bg-muted font-medium")}
                style={{ paddingLeft: 8 + Number(depth) * 12 }}
              >
                <span className="w-3 text-muted-foreground">{marker}</span>
                {String(label).endsWith(".md") ? <FileTextIcon className="size-3" /> : <FilesIcon className="size-3" />}
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex h-9 items-end border-b bg-muted/20 px-1">
            <div className="flex h-9 items-center gap-1.5 border-b-2 border-foreground px-3">
              <FileTextIcon className="size-3" /> 周末杭州行程.md <CircleIcon className="size-1.5 fill-current" />
            </div>
          </div>
          <div className="flex h-9 items-center justify-between border-b px-2">
            <div className="flex">
              {[BoldIcon, ItalicIcon, ListIcon, Code2Icon, LinkIcon].map((Icon, index) => (
                <span key={index} className="flex size-6 items-center justify-center"><Icon className="size-3" /></span>
              ))}
            </div>
            <Badge variant="secondary" className="h-4 text-[8px]">Markdown</Badge>
          </div>
          <article className="px-[10%] py-[7%]">
            <p className="font-mono text-[8px] text-muted-foreground">TRAVEL / HANGZHOU</p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight">周末杭州行程</h4>
            <p className="mt-4 leading-5 text-muted-foreground">
              两天以西湖和城西为主，减少往返，把时间留给散步和吃饭。
            </p>
            <h5 className="mt-5 font-semibold">周六 · 西湖与象山</h5>
            <p className="mt-2 leading-5 text-muted-foreground">
              曲院风荷 → 孤山 → 中国美院象山校区 → 杭帮菜晚餐。
            </p>
          </article>
        </div>
      </div>
    </SceneWindow>
  )
}

function AgentScene() {
  return (
    <SceneWindow>
      <div className="grid h-full grid-cols-[55%_45%]">
        <article className="border-r px-[8%] py-[7%]">
          <p className="font-mono text-[8px] text-muted-foreground">TRAVEL / HANGZHOU</p>
          <h4 className="mt-2 text-xl font-semibold">周末杭州行程</h4>
          <p className="mt-4 leading-5 text-muted-foreground">
            两天以西湖、象山和城西为主，减少往返，保留充足的步行时间。
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {["周六 · 西湖与象山", "周日 · 法喜寺与天目里", "雨天 · 博物馆备选"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded border"><CheckIcon className="size-2.5" /></span>
                {item}
              </div>
            ))}
          </div>
        </article>
        <div className="flex min-w-0 flex-col">
          <div className="flex h-11 items-center justify-between border-b px-3 font-medium">
            <span className="flex items-center gap-2"><BotIcon className="size-3.5" /> Agent</span>
            <PlusIcon className="size-3.5" />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-3">
            <ConversationContextStrip compact />
            <div className="ml-5 rounded-lg bg-muted px-3 py-2">结合这些内容，整理周末杭州行程</div>
            <div className="text-muted-foreground">正在使用本地知识</div>
            <div className="rounded-lg border p-2">
              {["搜索杭州旅行笔记", "读取路线画布", "写入行程笔记"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1 text-muted-foreground">
                  <CheckIcon className="size-3" /> {item}
                </div>
              ))}
            </div>
            <p className="leading-5">已整理成两天路线，并补上餐厅预约和雨天备选。</p>
            <div className="mt-auto rounded-lg border p-2 text-muted-foreground">输入消息或按 / 使用 Skills</div>
          </div>
        </div>
      </div>
    </SceneWindow>
  )
}

function CanvasScene() {
  return (
    <SceneWindow>
      <div className="relative h-full bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:18px_18px]">
        <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b bg-background/90 px-3">
          <span className="flex items-center gap-2 font-medium"><PaletteIcon className="size-3.5" /> 杭州周末路线</span>
          <div className="flex items-center gap-2">
            <span className="rounded-md border bg-background px-2 py-1">自动布局</span>
            <span className="rounded-md bg-foreground px-2 py-1 text-background">AI 生成</span>
          </div>
        </div>
        <CanvasNode className="left-[8%] top-[22%]" icon={HighlighterIcon} eyebrow="周六上午" title="西湖步行路线">
          曲院风荷 → 北山街 → 孤山
        </CanvasNode>
        <CanvasNode className="left-[58%] top-[32%] border-2 border-foreground" icon={PaletteIcon} eyebrow="周六下午" title="象山与晚餐">
          美院象山校区 → 杭帮菜
        </CanvasNode>
        <CanvasNode className="bottom-[12%] left-[20%]" icon={FileTextIcon} eyebrow="周日" title="法喜寺与天目里">
          上午礼佛，下午逛街再返程
        </CanvasNode>
        <div className="absolute left-[37%] top-[36%] h-px w-[23%] rotate-[8deg] bg-border" />
        <div className="absolute bottom-[29%] left-[43%] h-px w-[20%] -rotate-[25deg] bg-border" />
      </div>
    </SceneWindow>
  )
}

function CanvasNode({
  className,
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  className: string
  icon: typeof HighlighterIcon
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("absolute w-[34%] rounded-lg border bg-background p-3 shadow-sm", className)}>
      <div className="mb-2 flex items-center gap-2 text-muted-foreground"><Icon className="size-3" /> {eyebrow}</div>
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-muted-foreground">{children}</div>
    </div>
  )
}

function MobileReplica() {
  const [page, setPage] = useState<"chat" | "writing" | "record" | "canvas">("chat")
  const [quickOpen, setQuickOpen] = useState(false)
  const dockItems = useMemo<NoteGenDockItem[]>(() => [
    { id: "chat", icon: MessageSquareIcon, label: "对话" },
    { id: "writing", icon: SquarePenIcon, label: "写作" },
    { id: "quick-action", icon: PlusIcon, label: "快捷" },
    { id: "record", icon: HighlighterIcon, label: "记录" },
    { id: "canvas", icon: PaletteIcon, label: "画布" },
  ], [])
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
                  aria-label="快速记录"
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
  return (
    <div className="flex w-full flex-col gap-2">
      <ToolSectionLabel>写作</ToolSectionLabel>
      <div className="grid w-full grid-cols-2 gap-1.5">
        <MobileQuickTool icon={SquarePenIcon} label="笔记" onClick={onClose} />
        <MobileQuickTool icon={SparklesIcon} label="整理成笔记" onClick={onClose} />
      </div>
      <ToolSectionLabel>记录</ToolSectionLabel>
      <div className="grid w-full grid-cols-2 gap-1.5">
        <MobileQuickTool icon={TypeIcon} label="文本" onClick={onClose} />
        <MobileQuickTool icon={MicIcon} label="录音" onClick={onClose} />
        <MobileQuickTool icon={ImageUpIcon} label="图片" onClick={onClose} />
        <MobileQuickTool icon={LinkIcon} label="链接" onClick={onClose} />
        <MobileQuickTool icon={PaperclipIcon} label="文件" onClick={onClose} />
        <MobileQuickTool icon={CheckSquareIcon} label="待办" onClick={onClose} />
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
  onClick,
}: {
  icon: typeof TypeIcon
  label: string
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
      {label === "笔记" || label === "整理成笔记" ? <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" /> : null}
    </button>
  )
}

function MobileRecordPage() {
  return (
    <div className="h-full">
      <header className="flex h-14 items-center justify-between border-b px-2">
        <div className="flex h-11 items-center gap-1 px-2 text-sm font-medium">
          全部记录 <ChevronDownIcon className="size-4 text-muted-foreground" />
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
        <div className="mb-2 text-xs font-medium text-muted-foreground">今天</div>
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
        <div className="mb-2 mt-4 text-xs font-medium text-muted-foreground">昨天</div>
        <div className="rounded-xl border bg-background px-3 py-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-md border border-fuchsia-300/80 bg-fuchsia-100 px-1.5 py-0.5 text-[10px] font-medium text-fuchsia-900">图片</span>
            <span className="text-xs text-muted-foreground">18:22</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <ImageIcon className="size-4 text-muted-foreground" />
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">天目里建筑与店铺地图</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function MobileChatPage({ onComplete }: { onComplete: () => void }) {
  const [processOpen, setProcessOpen] = useState(true)
  const [ragOpen, setRagOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const prompt = "结合这些内容，整理周末杭州行程并保存。"
  const associationSteps = [
    { kind: "record", query: "西湖", start: 250, selectAt: 1150 },
    { kind: "canvas", query: "杭州", start: 1300, selectAt: 2200 },
    { kind: "file", query: "餐厅", start: 2350, selectAt: 3250 },
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
    { label: "记录 · 读取 3 条杭州收藏", start: 5600, duration: 680 },
    { label: "画布 · 读取杭州周末路线", start: 6380, duration: 540 },
    { label: "笔记 · 检索杭州旅行历史", start: 7020, duration: 980 },
    { label: "笔记 · 写入周末杭州行程.md", start: 8100, duration: 840 },
  ] as const
  const responseStart = 9100
  const responseSegments = [
    "已读取关联的 3 条旅行记录、1 个路线画布和 2 篇历史笔记。",
    "我重新安排了两天路线，减少跨区往返，并补充了餐厅预约、雨天备选和返程提醒。",
    "行程已保存，正在为你打开写作页面。",
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
                {processComplete ? "已处理" : "处理中"}{" "}
                {formatDuration(Math.min(processElapsed, responseStart - processStart))} · 执行 {visibleEvents.length} 次
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
                  <MarkerContent className="flex-1 truncate">检索到 2 个知识库来源</MarkerContent>
                  <MarkerIcon>
                    <ChevronRightIcon className={cn("transition-transform", ragOpen && "rotate-90")} />
                  </MarkerIcon>
                </Marker> : null}
                {elapsed >= 5550 && ragOpen ? (
                  <div className="flex flex-col gap-1 pl-6">
                    {["杭州想去的地方.md", "餐厅收藏.md"].map((source) => (
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
                  <MarkerContent className="flex-1 truncate">已使用 1 个技能</MarkerContent>
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
              <span className="-translate-x-3 px-3 text-xs text-muted-foreground">刚刚</span>
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
                aria-label="对话输入"
                placeholder={messageSent || composerText.length === 0 ? "你可以提问或将记录整理为文章..." : undefined}
                value={messageSent ? "" : composerText}
                readOnly
                className="min-h-10 max-h-10 w-full px-2 py-2 text-sm placeholder:text-[13px]"
              />
            </div>
            <InputGroupAddon align="block-end" className="justify-between p-0">
              <div className="flex items-center gap-1">
                <InputGroupButton size="icon-sm" aria-label="添加附件"><PaperclipIcon /></InputGroupButton>
                <InputGroupButton size="icon-sm" aria-label="选择工具"><ToolCaseIcon /></InputGroupButton>
              </div>
              <div className="flex items-center gap-2 pr-1">
                <InputGroupButton size="icon-sm" aria-label="权限设置"><ShieldQuestionIcon /></InputGroupButton>
                <InputGroupButton
                  size="icon-sm"
                  variant="secondary"
                  aria-label="发送"
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
        aria-label="编辑周末杭州行程"
        tabIndex={0}
        onClick={() => setIsEditing(true)}
        onFocus={() => setIsEditing(true)}
      >
        {writingStreamComplete ? (
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

function MobileWritingStream({ elapsed }: { elapsed: number }) {
  const title = "周末杭州行程"
  const intro = "两天以西湖、象山和城西为主，减少跨区往返，把时间留给散步、吃饭和临时停留。完整地址都放在路线备忘里。"
  const quote = "不赶景点，只确定每天的一条主线；如果遇到喜欢的地方，就多停一会儿。"
  const firstDay = "周六：西湖慢走、中国美院象山校区、杭帮菜"
  const secondDay = "周日：法喜寺、天目里、返程前购买伴手礼"
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
          {revealWritingText("行程概览", elapsed, overviewStart, 52)}
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
                  <th className="border-b px-3 py-2 font-medium">日期</th>
                  <th className="border-b px-3 py-2 font-medium">主路线</th>
                  <th className="border-b px-3 py-2 font-medium">步行</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-b px-3 py-2">
                    {revealWritingText("周六", elapsed, tableStart, 70)}
                  </td>
                  <td className="border-b px-3 py-2">
                    {revealWritingText("北山街 → 象山", elapsed, tableStart + 140, 32)}
                  </td>
                  <td className="border-b px-3 py-2">
                    {revealWritingText("约 9 km", elapsed, tableStart + 420, 40)}
                  </td>
                </tr>
                {elapsed >= tableStart + 720 ? (
                  <tr>
                    <td className="px-3 py-2">
                      {revealWritingText("周日", elapsed, tableStart + 720, 70)}
                    </td>
                    <td className="px-3 py-2">
                      {revealWritingText("法喜寺 → 天目里", elapsed, tableStart + 860, 28)}
                    </td>
                    <td className="px-3 py-2">
                      {revealWritingText("约 6 km", elapsed, tableStart + 1160, 40)}
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

function MobileWritingToolbarDemo() {
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
            aria-label="返回一级菜单"
            title="返回一级菜单"
            size="sm"
            className="h-10 min-w-10 shrink-0 rounded-full px-3 text-xs"
            onClick={() => setActiveMenu("root")}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            <span>{writingToolbarMenuLabels[activeMenu]}</span>
          </Button>
        ) : null}

        {items.map((item) => {
          const Icon = item.icon
          const key = item.kind === "menu" ? item.menu : item.action

          return (
            <Button
              key={key}
              type="button"
              aria-label={item.label}
              title={item.label}
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
              <span>{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function MobileCanvasPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background px-2">
        <span className="text-sm font-semibold">画布</span>
        <div className="ml-auto flex items-center">
          <span className="flex size-10 items-center justify-center"><FilePlus2Icon className="size-5" /></span>
          <span className="flex size-10 items-center justify-center"><EllipsisVerticalIcon className="size-5" /></span>
        </div>
      </header>
      <div className="notegen-demo-under-dock grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-y-auto px-3 pt-3">
        {[
          "杭州周末路线",
          "西湖散步",
          "餐厅与咖啡",
          "雨天备选",
        ].map((title, index) => (
          <div key={title} className="relative">
            <button type="button" className="w-full min-w-0 overflow-hidden rounded-xl border bg-background text-left">
              <div className="relative aspect-[4/3] bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:12px_12px]">
                <span className="absolute left-2 top-3 h-8 w-14 rounded border bg-background" />
                <span className="absolute bottom-3 right-2 h-8 w-14 rounded border bg-background" />
                <span className={cn("absolute left-[42%] top-1/2 h-px w-8 bg-border", index % 2 && "rotate-12")} />
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
