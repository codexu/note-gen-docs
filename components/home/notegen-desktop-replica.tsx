"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
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
  EllipsisVertical,
  FilePlus,
  FilePlus2,
  FileText,
  Files,
  Filter,
  Folder,
  FolderPlus,
  Highlighter,
  ImageIcon,
  ImagePlus,
  Link,
  List,
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
  Type,
  Undo2,
  Wrench,
  X,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
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

export function NoteGenDesktopReplica() {
  const [workspace, setWorkspace] = useState<"writing" | "records" | "canvas">("records")

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWorkspace((current) => {
        const currentIndex = workspaceTabs.findIndex((tab) => tab.id === current)
        return workspaceTabs[(currentIndex + 1) % workspaceTabs.length].id
      })
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [workspace])

  return (
    <div
      data-testid="notegen-desktop-replica"
      className="aspect-[16/10] w-full overflow-hidden rounded-xl border bg-background text-[9px] leading-normal shadow-xl sm:text-[10px] lg:text-xs"
    >
      <DesktopTitleBar />
      <div className="grid h-[calc(100%-36px)] min-w-0 grid-cols-[25%_47%_28%]">
        <WorkspaceSidebar workspace={workspace} onWorkspaceChange={setWorkspace} />
        <Editor />
        <AgentPanel />
      </div>
    </div>
  )
}

function DesktopTitleBar() {
  return (
    <header className="relative flex h-9 items-center border-b bg-background pl-[72px]">
      <div className="absolute left-3 top-1/2 flex -translate-y-1/2 gap-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex shrink-0 items-center gap-0.5 px-2">
        {recordTools.map((Icon, index) => (
          <IconButton key={index} icon={Icon} />
        ))}
      </div>

      <div className="mx-auto flex h-6 w-[34%] min-w-44 max-w-md items-center justify-center gap-2 rounded-sm border text-[10px] text-muted-foreground">
        <Search className="size-3.5" strokeWidth={1.7} />
        <span className="truncate">搜索笔记、记录和画布</span>
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
    </header>
  )
}

type Workspace = "writing" | "records" | "canvas"

const workspaceTabs = [
  { id: "writing", label: "写作", icon: Files },
  { id: "records", label: "记录", icon: Highlighter },
  { id: "canvas", label: "画布", icon: Palette },
] satisfies Array<{ id: Workspace; label: string; icon: typeof Files }>

const workspaceTabButtonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".375rem",
    paddingRight: ".375rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".375rem" : 0,
    paddingLeft: isSelected ? "0.75rem" : ".375rem",
    paddingRight: isSelected ? "0.75rem" : ".375rem",
  }),
}

const workspaceTabLabelVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
}

const workspaceTabTransition = {
  delay: 0.1,
  type: "spring" as const,
  bounce: 0,
  duration: 0.6,
}

function WorkspaceTabs({
  workspace,
  onWorkspaceChange,
}: {
  workspace: Workspace
  onWorkspaceChange: (workspace: Workspace) => void
}) {
  return (
    <div
      aria-label="切换工作区"
      className="flex flex-wrap items-center gap-0.5 rounded-xl border bg-background p-0.5"
    >
      {workspaceTabs.map(({ id, label, icon: Icon }) => {
        const active = workspace === id

        return (
          <motion.button
            key={id}
            type="button"
            variants={workspaceTabButtonVariants}
            initial={false}
            animate="animate"
            custom={active}
            transition={workspaceTabTransition}
            onClick={() => onWorkspaceChange(id)}
            aria-pressed={active}
            aria-label={label}
            className={cn(
              "relative flex cursor-pointer items-center rounded-lg py-1.5 text-sm font-medium transition-colors duration-300",
              active
                ? "bg-muted text-primary"
                : "text-muted-foreground opacity-70 hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <AnimatePresence initial={false}>
              {active ? (
                <motion.span
                  variants={workspaceTabLabelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={workspaceTabTransition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {label}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}

function WorkspaceSidebar({
  workspace,
  onWorkspaceChange,
}: {
  workspace: Workspace
  onWorkspaceChange: (workspace: Workspace) => void
}) {
  return (
    <section className="flex min-w-0 flex-col border-r">
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-2">
        <WorkspaceTabs workspace={workspace} onWorkspaceChange={onWorkspaceChange} />
        <WorkspaceActions workspace={workspace} />
      </div>

      {workspace === "writing" ? <WritingSidebarContent /> : null}
      {workspace === "records" ? <RecordsSidebarContent /> : null}
      {workspace === "canvas" ? <CanvasSidebarContent /> : null}

      <WorkspaceFooter workspace={workspace} />
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

function RecordsSidebarContent() {
  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <div className="border-b">
        <div className="flex h-10 items-center justify-between px-3 font-medium">
          <div className="flex min-w-0 items-center gap-2">
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
            <Tags className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">杭州旅行</span>
          </div>
          <span className="text-[10px] font-normal text-muted-foreground">4</span>
        </div>
        <div className="border-t border-border/60">
          {records.map((record, index) => (
            <RecordItem key={record.title} record={record} active={index === 0} />
          ))}
        </div>
      </div>

      <div className="flex h-10 items-center justify-between px-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChevronRight className="size-3.5" />
          <Tags className="size-3.5" />
          <span>产品想法</span>
        </div>
        <span className="text-[10px]">7</span>
      </div>
      <div className="flex h-10 items-center justify-between border-t px-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChevronRight className="size-3.5" />
          <Tags className="size-3.5" />
          <span>日常记录</span>
        </div>
        <span className="text-[10px]">18</span>
      </div>
    </div>
  )
}

function WritingSidebarContent() {
  const files = [
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
          <span>搜索文件</span>
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

function CanvasSidebarContent() {
  const canvases = [
    ["杭州周末路线", "3 个节点 · 刚刚"],
    ["西湖散步", "4 个节点 · 今天"],
    ["餐厅与咖啡", "5 个节点 · 昨天"],
    ["雨天备选", "4 个节点 · 昨天"],
  ]

  return (
    <div className="min-h-0 flex-1 overflow-hidden p-2">
      <div className="mb-2 flex h-7 items-center gap-2 rounded-md border px-2 text-muted-foreground">
        <Search className="size-3.5" />
        <span>搜索画布</span>
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
              <span className="absolute left-[10%] top-[18%] h-[28%] w-[38%] rounded border bg-background" />
              <span className="absolute bottom-[16%] right-[8%] h-[28%] w-[38%] rounded border bg-background" />
              <span className={cn("absolute left-[40%] top-1/2 h-px w-[30%] bg-border", index % 2 === 1 && "rotate-12")} />
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

function WorkspaceFooter({ workspace }: { workspace: Workspace }) {
  const label = workspace === "writing"
      ? "本地工作区 · 6 个文件"
    : workspace === "canvas"
      ? "共 4 个画布"
      : "当前显示 4 条记录"

  return (
    <footer className="flex h-6 shrink-0 items-center border-t bg-background px-2 text-[10px] text-muted-foreground">
      <span>{label}</span>
    </footer>
  )
}

function RecordItem({
  record,
  active,
}: {
  record: (typeof records)[number]
  active?: boolean
}) {
  const Icon = record.icon

  return (
    <div className={cn("border-b border-border/60 px-3 py-2.5", active && "bg-accent")}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex h-4 items-center gap-1 rounded border px-1.5 text-[9px] font-medium",
            recordBadgeTone[record.type]
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

function Editor() {
  return (
    <section className="flex min-h-0 min-w-0 flex-col border-r">
      <div className="flex h-12 shrink-0 items-center border-b bg-background">
        <div className="flex h-full shrink-0 items-center gap-0.5 border-r px-2">
          <IconButton icon={Undo2} className="text-foreground" />
          <IconButton icon={Redo2} className="opacity-35" />
        </div>
        <div className="flex min-w-0 flex-1 items-center px-1">
          <div className="relative flex h-9 min-w-0 max-w-[55%] items-center gap-1.5 px-3 font-medium">
            <FileText className="size-3.5 shrink-0" />
            <span className="truncate">周末杭州行程.md</span>
            <X className="size-3 shrink-0 text-muted-foreground" />
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
          </div>
          <div className="flex h-9 min-w-0 items-center gap-1.5 px-3 text-muted-foreground">
            <FileText className="size-3.5 shrink-0" />
            <span className="truncate">餐厅收藏.md</span>
          </div>
          <IconButton icon={Plus} className="ml-auto mr-1" />
        </div>
      </div>

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

function AgentPanel() {
  const [processOpen, setProcessOpen] = useState(false)
  const agentEvents = [
    "记录 · 读取 3 条杭州收藏",
    "画布 · 读取杭州周末路线",
    "笔记 · 检索杭州旅行历史",
    "笔记 · 写入周末杭州行程.md",
  ]

  return (
    <section className="flex min-w-0 flex-col">
      <header className="flex h-12 shrink-0 items-center justify-between border-b px-3">
        <div className="flex min-w-0 items-center gap-1.5 font-medium">
          <span className="truncate">杭州周末行程</span>
          <span className="text-[10px] font-normal text-muted-foreground">(3)</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1">
          <IconButton icon={MessageSquareDashed} />
          <IconButton icon={MessageSquarePlus} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-lg border bg-muted/35 px-3 py-2 leading-5">
            结合这些内容，整理周末杭州行程并保存。
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
              已处理
            </div>
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
              3.7s · 执行 4 次
              <ChevronRight className={cn("size-3 transition-transform", processOpen && "rotate-90")} />
            </span>
          </button>
          {processOpen ? <div className="ml-1 border-l pl-3 pt-1">
            <div className="mb-1 flex items-center gap-2 py-1 text-[10px] text-muted-foreground">
              <Cloud className="size-3" />
              <span>检索到 2 个知识库来源 · 已使用 trip-planner</span>
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
          <p>已读取关联的 3 条旅行记录、1 个路线画布和 2 篇历史笔记。</p>
          <p className="mt-2">我重新安排了两天路线，减少跨区往返，并补充了餐厅预约、雨天备选和返程提醒。</p>
          <p className="mt-2 text-muted-foreground">行程已保存，正在为你打开写作页面。</p>
        </div>
      </div>

      <div className="shrink-0 p-1">
        <div className="rounded-lg border bg-background shadow-sm">
          <div className="min-h-12 px-3 py-2 text-muted-foreground">
            你可以提问或将记录整理为文章...
          </div>
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              <IconButton icon={Plus} />
              <IconButton icon={ToolCase} />
            </div>
            <div className="flex items-center gap-2 pr-1">
              <span className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[10px] text-muted-foreground">
                <ShieldQuestion className="size-4" />
                <span>询问</span>
              </span>
              <span className="flex h-8 items-center justify-center rounded-md bg-primary px-3 text-primary-foreground">
                <Send className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex h-6 shrink-0 items-center justify-between border-t px-2 text-[9px] text-muted-foreground">
        <span>GPT-5</span>
        <span>通用助手</span>
      </footer>
    </section>
  )
}
