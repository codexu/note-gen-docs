import type { ReactNode } from "react"
import { Bot, FileText, Home, Image, Mic, MoreHorizontal, Plus, Search, Send, Settings, Sparkles } from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenMobileScreen = "capture" | "chat" | "writing" | "canvas" | "settings"

export function NoteGenMobileFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative mx-auto aspect-[9/19.5] w-full max-w-[270px] overflow-hidden rounded-[2.2rem] border-[5px] border-foreground bg-background text-[9px] shadow-2xl", className)}><div className="absolute left-1/2 top-1.5 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground" />{children}</div>
}

export function NoteGenMobileStatusBar() {
  return <div className="flex h-7 items-center justify-between px-5 pt-1 text-[8px] font-medium"><span>9:41</span><span>● ◒ ▰</span></div>
}

export function NoteGenMobileHeader({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return <header className="flex h-11 items-center border-b px-4"><h2 className="text-sm font-semibold">{title}</h2><div className="ml-auto flex items-center gap-3 text-muted-foreground">{trailing ?? <Search className="size-4" />}</div></header>
}

export function NoteGenMobileDock({ screen = "capture", lang = "cn" }: { screen?: NoteGenMobileScreen; lang?: NoteGenReplicaLanguage }) {
  const items = [{ id: "capture", icon: Home, label: lang === "en" ? "Capture" : "记录" }, { id: "writing", icon: FileText, label: lang === "en" ? "Writing" : "写作" }, { id: "chat", icon: Bot, label: "Agent" }, { id: "canvas", icon: Sparkles, label: lang === "en" ? "Canvas" : "画布" }]
  return <nav className="grid h-14 grid-cols-4 border-t bg-background/95 px-2 pb-1">{items.map((item) => <div key={item.id} className={cn("flex flex-col items-center justify-center gap-0.5 text-[7px] text-muted-foreground", screen === item.id && "text-foreground")}><item.icon className="size-4" strokeWidth={screen === item.id ? 2.2 : 1.7} />{item.label}</div>)}</nav>
}

export function NoteGenMobileCapture({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex min-h-0 flex-1 flex-col"><NoteGenMobileHeader title={lang === "en" ? "Capture" : "记录"} trailing={<><Search className="size-4" /><Settings className="size-4" /></>} /><div className="flex gap-2 overflow-hidden px-4 py-3"><span className="rounded-full bg-foreground px-3 py-1 text-[8px] text-background">{lang === "en" ? "All" : "全部"}</span><span className="rounded-full bg-muted px-3 py-1 text-[8px]">{lang === "en" ? "Ideas" : "灵感"}</span><span className="rounded-full bg-muted px-3 py-1 text-[8px]">{lang === "en" ? "Todo" : "待办"}</span></div><div className="min-h-0 flex-1 space-y-2 overflow-hidden px-3"><article className="rounded-xl border bg-card p-3 shadow-xs"><div className="flex gap-2"><FileText className="size-4 text-muted-foreground" /><div><h3 className="font-medium">{lang === "en" ? "A calm capture workflow" : "安静的记录流程"}</h3><p className="mt-1 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "Capture first and organize only when needed." : "先记录，只在需要时整理。"}</p></div></div><p className="mt-2 text-[7px] text-muted-foreground">10:24 · #idea</p></article><article className="rounded-xl border bg-card p-3"><div className="flex items-center gap-2"><Mic className="size-4" /><span className="font-medium">{lang === "en" ? "Voice memo" : "语音速记"}</span><span className="ml-auto text-muted-foreground">01:42</span></div></article><article className="rounded-xl border bg-card p-3"><div className="flex items-center gap-2"><Image className="size-4" /><span className="font-medium">{lang === "en" ? "Interface references" : "界面参考"}</span></div><div className="mt-2 grid grid-cols-3 gap-1">{[1,2,3].map((item) => <span key={item} className="aspect-square rounded-md bg-muted" />)}</div></article></div><div className="absolute bottom-17 right-4 flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg"><Plus className="size-5" /></div></div>
}

export function NoteGenMobileChat({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex min-h-0 flex-1 flex-col"><NoteGenMobileHeader title="NoteGen Agent" trailing={<MoreHorizontal className="size-4" />} /><div className="min-h-0 flex-1 space-y-4 overflow-hidden p-4"><div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-foreground px-3 py-2 text-background">{lang === "en" ? "Summarize today’s captures." : "整理一下今天的记录。"}</div><div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 leading-4"><div className="mb-2 flex items-center gap-1 font-medium"><Sparkles className="size-3" />{lang === "en" ? "Summary" : "今日摘要"}</div>{lang === "en" ? "You recorded three product ideas, one meeting memo, and two interface references." : "你记录了三个产品想法、一条会议速记和两组界面参考。"}</div></div><div className="m-3 rounded-2xl border p-2"><p className="min-h-9 px-1 text-muted-foreground">{lang === "en" ? "Message NoteGen…" : "给 NoteGen 发送消息……"}</p><div className="flex items-center"><Plus className="size-4 text-muted-foreground" /><span className="ml-auto flex size-7 items-center justify-center rounded-full bg-foreground text-background"><Send className="size-3" /></span></div></div></div>
}

export function NoteGenMobileWriting({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex min-h-0 flex-1 flex-col"><NoteGenMobileHeader title={lang === "en" ? "Writing" : "写作"} trailing={<Plus className="size-4" />} /><div className="flex items-center gap-2 border-b px-4 py-2 text-muted-foreground"><FileText className="size-3.5" /><span>{lang === "en" ? "Design principles.md" : "设计原则.md"}</span></div><article className="min-h-0 flex-1 overflow-hidden px-5 py-6"><h1 className="text-xl font-bold tracking-tight">{lang === "en" ? "Design for calm writing" : "为安静写作而设计"}</h1><p className="mt-4 text-[10px] leading-5">{lang === "en" ? "A good workspace reduces interruption and lets ideas stay visible." : "一个好的工作区，会减少打扰，让想法始终保持可见。"}</p><h2 className="mt-6 text-sm font-semibold">{lang === "en" ? "Capture first" : "先记录"}</h2><p className="mt-2 text-[10px] leading-5 text-muted-foreground">{lang === "en" ? "Structure can wait until it becomes useful." : "结构可以等到真正有用时再出现。"}</p></article></div>
}

export function NoteGenMobileCanvas({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex min-h-0 flex-1 flex-col"><NoteGenMobileHeader title={lang === "en" ? "Canvas" : "画布"} trailing={<Plus className="size-4" />} /><div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-hidden p-4">{[[lang === "en" ? "Product map" : "产品地图", "8"], [lang === "en" ? "Research" : "调研资料", "12"], [lang === "en" ? "Launch plan" : "发布计划", "6"]].map(([title, count], index) => <article key={title} className="rounded-xl border bg-card p-2"><div className="relative aspect-[4/3] rounded-lg bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:8px_8px]"><span className="absolute left-2 top-3 h-5 w-9 rounded border bg-background" /><span className="absolute bottom-2 right-2 h-6 w-10 rounded border bg-amber-50 dark:bg-amber-950" /></div><h3 className="mt-2 truncate font-medium">{title}</h3><p className="text-[7px] text-muted-foreground">{count} {lang === "en" ? "nodes" : "个节点"}</p></article>)}</div></div>
}

export function NoteGenMobileSettings({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const rows = [lang === "en" ? "General" : "常规设置", lang === "en" ? "Capture" : "记录", lang === "en" ? "Editor" : "编辑器", lang === "en" ? "Model providers" : "模型服务", lang === "en" ? "Sync" : "同步", lang === "en" ? "About NoteGen" : "关于 NoteGen"]
  return <div className="flex min-h-0 flex-1 flex-col"><NoteGenMobileHeader title={lang === "en" ? "Settings" : "设置"} /><div className="p-4"><div className="mb-4 flex items-center gap-3 rounded-xl border p-3"><span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background"><Sparkles className="size-5" /></span><div><div className="text-xs font-semibold">NoteGen</div><div className="text-[8px] text-muted-foreground">v0.22.0</div></div></div><div className="overflow-hidden rounded-xl border">{rows.map((row, index) => <div key={row} className={cn("flex h-10 items-center px-3 text-[9px]", index > 0 && "border-t")}><span>{row}</span><span className="ml-auto text-muted-foreground">›</span></div>)}</div></div></div>
}

export function NoteGenMobileReplica({ lang = "cn", screen = "capture" }: { lang?: NoteGenReplicaLanguage; screen?: NoteGenMobileScreen }) {
  return <NoteGenMobileFrame><div className="flex h-full min-h-0 flex-col"><NoteGenMobileStatusBar />{screen === "capture" ? <NoteGenMobileCapture lang={lang} /> : screen === "chat" ? <NoteGenMobileChat lang={lang} /> : screen === "writing" ? <NoteGenMobileWriting lang={lang} /> : screen === "canvas" ? <NoteGenMobileCanvas lang={lang} /> : <NoteGenMobileSettings lang={lang} />}{screen !== "settings" ? <NoteGenMobileDock screen={screen} lang={lang} /> : null}</div></NoteGenMobileFrame>
}
