import type { ReactNode } from "react"
import {
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  EllipsisVertical,
  FileCog,
  FilePlus2,
  Filter,
  Highlighter,
  History,
  LayoutList,
  MessageSquare,
  MessageSquareDashed,
  MessageSquarePlus,
  Palette,
  PenTool,
  Plus,
  RefreshCw,
  Search,
  SearchCode,
  Send,
  Settings,
  Sparkles,
  SquarePen,
  Trash2,
  User,
} from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenMobileScreen = "capture" | "chat" | "writing" | "canvas" | "settings"

const MOBILE_LOGICAL_WIDTH = 390
const MOBILE_LOGICAL_HEIGHT = 862.5

function MobileIconButton({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground", className)}>{children}</span>
}

function MobileAvatarButton() {
  return <MobileIconButton className="relative rounded-full text-foreground"><span className="flex size-8 items-center justify-center rounded-full bg-muted"><User className="size-[18px]" /></span></MobileIconButton>
}

export function NoteGenMobileFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto h-[585px] w-[270px] shrink-0 overflow-hidden rounded-[2.2rem] border-[5px] border-foreground bg-background shadow-2xl", className)}>
      <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground" />
      <div
        className="absolute left-0 top-0 origin-top-left bg-background text-base"
        style={{ width: MOBILE_LOGICAL_WIDTH, height: MOBILE_LOGICAL_HEIGHT, transform: "scale(0.6666667)" }}
      >
        {children}
      </div>
    </div>
  )
}

export function NoteGenMobileStatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-xs font-semibold">
      <span>9:41</span>
      <span className="flex items-end gap-1" aria-hidden>
        <span className="flex items-end gap-0.5"><i className="h-1 w-0.5 rounded-full bg-foreground" /><i className="h-1.5 w-0.5 rounded-full bg-foreground" /><i className="h-2 w-0.5 rounded-full bg-foreground" /><i className="h-2.5 w-0.5 rounded-full bg-foreground" /></span>
        <i className="size-2.5 rounded-full border-2 border-foreground" />
        <i className="h-2.5 w-4 rounded-[3px] border border-foreground after:ml-[1px] after:block after:h-1.5 after:w-2.5 after:rounded-[1px] after:bg-foreground" />
      </span>
    </div>
  )
}

export function NoteGenMobileHeader({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return <header className="flex h-14 min-h-14 items-center border-b bg-background px-2"><h2 className="px-2 text-sm font-medium">{title}</h2><div className="ml-auto flex items-center">{trailing ?? <MobileIconButton><Search className="size-[18px]" /></MobileIconButton>}</div></header>
}

export function NoteGenMobileDock({ screen = "capture", lang = "cn" }: { screen?: NoteGenMobileScreen; lang?: NoteGenReplicaLanguage }) {
  const activeScreen = screen === "settings" ? "chat" : screen
  const items = [
    { id: "chat", icon: MessageSquare, label: lang === "en" ? "Chat" : "对话" },
    { id: "writing", icon: SquarePen, label: lang === "en" ? "Write" : "写作" },
    { id: "quick", icon: Plus, label: lang === "en" ? "Quick" : "快记" },
    { id: "capture", icon: Highlighter, label: lang === "en" ? "Records" : "记录" },
    { id: "canvas", icon: Palette, label: lang === "en" ? "Canvas" : "画布" },
  ]

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-24 items-end bg-gradient-to-t from-background via-background/95 to-transparent px-3 pb-3">
      <nav
        className="pointer-events-auto grid h-14 w-full items-center gap-1 rounded-[1.35rem] border border-border/60 bg-background/70 backdrop-blur-xl"
        style={{ gridTemplateColumns: items.map((item) => item.id === activeScreen ? "80px" : "67px").join(" ") }}
      >
        {items.map((item) => {
          const active = activeScreen === item.id
          return (
            <span key={item.id} aria-current={active ? "page" : undefined} className="flex h-12 min-w-0 items-center justify-center rounded-2xl px-0.5">
              <span className={cn("flex h-10 min-w-8 max-w-full items-center justify-center rounded-2xl px-2 text-muted-foreground", active && "gap-1.5 bg-muted px-2.5 text-foreground shadow-sm")}>
                <item.icon className="size-5 shrink-0" />
                {active ? <strong className="truncate text-xs font-medium leading-none">{item.label}</strong> : null}
              </span>
            </span>
          )
        })}
      </nav>
    </div>
  )
}

export function NoteGenMobileCapture({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const records = [
    { type: lang === "en" ? "Text" : "文本", time: "10:24", body: lang === "en" ? "Capture first and organize only when needed." : "先记录，只在需要时整理。" },
    { type: lang === "en" ? "Recording" : "录音", time: "09:48", body: lang === "en" ? "Product meeting memo · 01:42" : "产品会议速记 · 01:42" },
    { type: lang === "en" ? "Image" : "图片", time: lang === "en" ? "Yesterday" : "昨天", body: lang === "en" ? "Interface references" : "界面参考" },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 min-h-14 items-center border-b bg-background px-2">
        <MobileAvatarButton />
        <span className="flex h-11 min-w-0 items-center px-2 text-sm font-medium">{lang === "en" ? "All records" : "全部记录"}<ChevronDown className="ml-1 size-4 shrink-0 text-muted-foreground" /></span>
        <div className="ml-auto flex items-center">
          <MobileIconButton><Filter className="size-[18px]" /></MobileIconButton>
          <MobileIconButton><CheckSquare className="size-[18px]" /></MobileIconButton>
          <MobileIconButton><Trash2 className="size-[18px]" /></MobileIconButton>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden px-3 py-2 pb-24">
        <p className="mb-2 text-xs font-medium text-muted-foreground">{lang === "en" ? "TODAY" : "今天"}</p>
        <div className="flex flex-col gap-2">
          {records.map((record) => (
            <article key={record.type} className="rounded-xl border bg-background px-3 py-3">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px]">{record.type}</span><time className="ml-auto text-xs text-muted-foreground">{record.time}</time></div>
                  <p className="mt-2 line-clamp-2 text-sm leading-5">{record.body}</p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground"><EllipsisVertical className="size-4" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NoteGenMobileChat({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 min-h-14 items-center gap-2 border-b bg-background px-2">
        <MobileAvatarButton />
        <div className="ml-auto flex items-center">
          <MobileIconButton><Search className="size-[18px]" /></MobileIconButton>
          <MobileIconButton><History className="size-[18px]" /></MobileIconButton>
          <MobileIconButton><MessageSquareDashed className="size-[18px]" /></MobileIconButton>
          <MobileIconButton><MessageSquarePlus className="size-[18px]" /></MobileIconButton>
        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden px-4 py-5 pb-52">
        <div className="flex w-full justify-end"><div className="max-w-[85%] rounded-lg border px-3 py-2 text-sm leading-6">{lang === "en" ? "Summarize today’s captures." : "整理一下今天的记录。"}</div></div>
        <div className="min-w-0 text-sm leading-6">
          <div className="mb-2 flex items-center gap-2 font-medium"><Sparkles className="size-4" />{lang === "en" ? "Today’s summary" : "今日摘要"}</div>
          <p>{lang === "en" ? "You recorded three product ideas, one meeting memo, and two interface references." : "你记录了三个产品想法、一条会议速记和两组界面参考。"}</p>
        </div>
      </div>
      <div className="absolute inset-x-1 bottom-14 z-10 pb-1">
        <div className="mx-2 flex min-h-[104px] flex-col gap-1 rounded-[1.35rem] border border-border/60 bg-background/70 p-1.5 backdrop-blur-xl">
          <p className="min-h-10 p-2 text-sm text-muted-foreground">{lang === "en" ? "Message NoteGen…" : "给 NoteGen 发送消息……"}</p>
          <div className="flex items-center">
            <span className="flex size-10 items-center justify-center rounded-full text-muted-foreground"><Plus className="size-5" /></span>
            <span className="ml-auto flex size-8 items-center justify-center rounded-full border border-border/50 bg-muted text-foreground"><Send className="size-4" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NoteGenMobileWriting({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 min-h-14 items-center gap-2 border-b bg-background px-2 text-sm">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <MobileIconButton className="text-foreground"><ChevronLeft className="size-[18px]" /></MobileIconButton>
          <span className="min-w-0 flex-1 truncate font-medium">{lang === "en" ? "Design principles.md" : "设计原则.md"}</span>
        </div>
        <div className="flex items-center"><MobileIconButton><SearchCode className="size-[18px]" /></MobileIconButton><MobileIconButton><LayoutList className="size-[18px]" /></MobileIconButton></div>
      </header>
      <article className="min-h-0 flex-1 overflow-hidden px-4 py-6 pb-24 text-base leading-7">
        <h1 className="mb-4 mt-8 text-[2em] font-bold leading-tight">{lang === "en" ? "Design for calm writing" : "为安静写作而设计"}</h1>
        <p>{lang === "en" ? "A good workspace reduces interruption and lets ideas stay visible." : "一个好的工作区，会减少打扰，让想法始终保持可见。"}</p>
        <h2 className="mb-2 mt-4 text-[1.5em] font-semibold leading-tight">{lang === "en" ? "Capture first" : "先记录"}</h2>
        <p className="text-muted-foreground">{lang === "en" ? "Structure can wait until it becomes useful." : "结构可以等到真正有用时再出现。"}</p>
      </article>
    </div>
  )
}

export function NoteGenMobileCanvas({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const projects = [lang === "en" ? "Product map" : "产品地图", lang === "en" ? "Research" : "调研资料", lang === "en" ? "Launch plan" : "发布计划"]
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 min-h-14 items-center gap-2 border-b bg-background px-2"><MobileAvatarButton /><div className="ml-auto flex items-center"><MobileIconButton><FilePlus2 className="size-5" /></MobileIconButton><MobileIconButton><EllipsisVertical className="size-5" /></MobileIconButton></div></header>
      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-hidden p-3 pb-24">
        {projects.map((title) => (
          <article key={title} className="relative overflow-hidden rounded-xl border bg-card">
            <div className="relative aspect-[4/3] border-b bg-muted/20 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:12px_12px]">
              <span className="absolute left-4 top-5 h-8 w-14 rounded-md border bg-background" /><span className="absolute bottom-4 right-4 h-10 w-16 rounded-md border bg-muted" />
            </div>
            <h3 className="truncate px-2.5 py-2 text-xs font-medium">{title}</h3>
            <span className="absolute right-1.5 top-1.5 flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground"><EllipsisVertical className="size-4" /></span>
          </article>
        ))}
      </div>
    </div>
  )
}

export function NoteGenMobileSettings({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const settings = [[Settings, lang === "en" ? "General Settings" : "常规设置"], [PenTool, lang === "en" ? "Record Settings" : "记录设置"], [FileCog, lang === "en" ? "Editor Settings" : "编辑器设置"]] as const
  const levels = Array.from({ length: 112 }, (_, index) => ((index * 7 + Math.floor(index / 9)) % 11 < 4 ? 0 : (index * 3) % 4))

  return (
    <div className="min-h-0 flex-1 overflow-hidden px-3 py-4 pb-24">
      <div className="flex flex-col gap-4">
        <section className="rounded-[1.35rem] border border-amber-200/70 bg-background/70 p-4 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-amber-200/80 bg-amber-100 text-amber-700"><Cloud className="size-5" /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-base font-semibold">{lang === "en" ? "Sync platform" : "同步平台"}</p><div className="mt-2 flex flex-wrap items-center gap-2"><span className="rounded-full border border-amber-200 bg-amber-100/80 px-2.5 py-0.5 text-xs text-amber-700">{lang === "en" ? "Local only" : "仅本地"}</span><span className="rounded-full border border-amber-200 bg-amber-100/80 px-2.5 py-0.5 text-xs font-medium text-amber-700">{lang === "en" ? "Unconfigured" : "未配置"}</span></div></div>
          </div>
        </section>
        <section className="rounded-[1.35rem] border border-border/60 bg-background/70 p-4 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold">{lang === "en" ? "Activity" : "写作活动"}</h2><p className="mt-1 text-xs text-muted-foreground">{lang === "en" ? "The last 16 weeks" : "最近 16 周"}</p></div><MobileIconButton><RefreshCw className="size-4" /></MobileIconButton></div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">{levels.map((level, index) => <span key={index} className={cn("aspect-square rounded-[3px]", level === 0 ? "bg-muted" : level === 1 ? "bg-primary/20" : level === 2 ? "bg-primary/45" : "bg-primary/75")} />)}</div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{lang === "en" ? "Tap a day to view its records, writing, chats, and canvas activity." : "点击日期可查看当天的记录、写作、对话和画布活动。"}</p>
        </section>
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.35rem] border border-border/60 bg-background/70 p-4"><p className="text-xs text-muted-foreground">{lang === "en" ? "This week" : "本周活动"}</p><p className="mt-2 text-2xl font-semibold">12</p><p className="mt-1 text-xs text-muted-foreground">{lang === "en" ? "active days" : "个活跃日"}</p></div>
          <div className="rounded-[1.35rem] border border-border/60 bg-background/70 p-4"><p className="text-xs text-muted-foreground">{lang === "en" ? "Current streak" : "连续记录"}</p><p className="mt-2 text-2xl font-semibold">5</p><p className="mt-1 text-xs text-muted-foreground">{lang === "en" ? "days in a row" : "天连续活跃"}</p></div>
        </section>
        <section className="flex flex-col gap-3 px-1">
          <div className="px-1"><h2 className="text-base font-semibold">{lang === "en" ? "Settings" : "设置"}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{lang === "en" ? "Manage NoteGen on this device." : "管理这台设备上的 NoteGen。"}</p></div>
          <div className="flex h-10 items-center gap-2 rounded-lg border px-3 text-sm text-muted-foreground"><Search className="size-4" />{lang === "en" ? "Search settings..." : "搜索设置..."}</div>
          <div>{settings.map(([Icon, label]) => <div key={label} className="flex min-h-11 items-center rounded-xl px-1"><span className="flex size-9 items-center justify-center"><Icon className="size-4" /></span><span className="text-sm">{label}</span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></div>)}</div>
        </section>
      </div>
    </div>
  )
}

export function NoteGenMobileReplica({ lang = "cn", screen = "capture" }: { lang?: NoteGenReplicaLanguage; screen?: NoteGenMobileScreen }) {
  return (
    <NoteGenMobileFrame>
      <div className="relative flex h-full min-h-0 flex-col">
        <NoteGenMobileStatusBar />
        {screen === "capture" ? <NoteGenMobileCapture lang={lang} /> : screen === "chat" ? <NoteGenMobileChat lang={lang} /> : screen === "writing" ? <NoteGenMobileWriting lang={lang} /> : screen === "canvas" ? <NoteGenMobileCanvas lang={lang} /> : <NoteGenMobileSettings lang={lang} />}
        <NoteGenMobileDock screen={screen} lang={lang} />
      </div>
    </NoteGenMobileFrame>
  )
}
