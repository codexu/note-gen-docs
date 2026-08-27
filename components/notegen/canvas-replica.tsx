import {
  BoxSelect,
  Circle,
  FileText,
  Hand,
  Image,
  LayoutGrid,
  Link2,
  Minus,
  MoreHorizontal,
  MousePointer2,
  Plus,
  Search,
  Sparkles,
  Square,
  StickyNote,
  Type,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export function NoteGenCanvasProjectCard({ title, meta, active }: { title: string; meta: string; active?: boolean }) {
  return <article className={cn("rounded-lg border p-2", active ? "border-foreground/25 bg-background shadow-sm" : "border-transparent")}><div className="relative aspect-[16/9] overflow-hidden rounded-md border bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:8px_8px]"><span className="absolute left-3 top-3 h-6 w-12 rounded border bg-background" /><span className="absolute bottom-3 right-3 h-7 w-14 rounded border bg-amber-50 dark:bg-amber-950" /></div><div className="mt-2 flex items-center gap-2"><div className="min-w-0 flex-1"><h4 className="truncate text-[9px] font-medium">{title}</h4><p className="text-[7px] text-muted-foreground">{meta}</p></div><MoreHorizontal className="size-3 text-muted-foreground" /></div></article>
}

export function NoteGenCanvasSidebar({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <aside className="flex h-full min-h-0 flex-col bg-sidebar"><div className="flex h-10 items-center gap-2 border-b px-2"><span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-muted/60 px-2 py-1.5 text-[8px] text-muted-foreground"><Search className="size-3" />{lang === "en" ? "Search canvases" : "搜索画布"}</span><Plus className="size-3.5" /></div><div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-hidden p-2"><NoteGenCanvasProjectCard active title={lang === "en" ? "Product map" : "产品地图"} meta={lang === "en" ? "8 nodes · today" : "8 个节点 · 今天"} /><NoteGenCanvasProjectCard title={lang === "en" ? "Research" : "调研资料"} meta={lang === "en" ? "12 nodes" : "12 个节点"} /><NoteGenCanvasProjectCard title={lang === "en" ? "Launch" : "发布计划"} meta={lang === "en" ? "6 nodes" : "6 个节点"} /></div></aside>
}

export function NoteGenCanvasToolbar() {
  const tools = [MousePointer2, Hand, StickyNote, Type, FileText, Image, Link2, Square, Circle]
  return <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border bg-background/95 p-1 shadow-md">{tools.map((Icon, index) => <span key={index} className={cn("flex size-7 items-center justify-center rounded-md text-muted-foreground", index === 0 && "bg-accent text-foreground")}><Icon className="size-3.5" /></span>)}</div>
}

export function NoteGenCanvasNode({ title, text, tone = "default", className }: { title: string; text?: string; tone?: "default" | "note" | "ai"; className?: string }) {
  return <article className={cn("absolute w-36 rounded-lg border bg-background p-3 shadow-sm", tone === "note" && "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50", tone === "ai" && "border-violet-300 bg-violet-50 dark:border-violet-900 dark:bg-violet-950", className)}><div className="flex items-center gap-1.5 text-[9px] font-medium">{tone === "ai" ? <Sparkles className="size-3 text-violet-500" /> : <FileText className="size-3 text-muted-foreground" />}{title}</div>{text ? <p className="mt-2 text-[7px] leading-3 text-muted-foreground">{text}</p> : null}<span className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rounded-full border bg-background" /></article>
}

export function NoteGenCanvasFooter({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-lg border bg-background/95 p-1 shadow-sm"><span className="flex size-6 items-center justify-center"><ZoomOut className="size-3" /></span><span className="min-w-10 text-center text-[8px]">100%</span><span className="flex size-6 items-center justify-center"><ZoomIn className="size-3" /></span><span className="mx-1 h-4 w-px bg-border" /><span className="flex size-6 items-center justify-center"><BoxSelect className="size-3" /></span><span className="flex size-6 items-center justify-center"><LayoutGrid className="size-3" /></span><span className="ml-2 text-[7px] text-muted-foreground">{lang === "en" ? "8 nodes" : "8 个节点"}</span></div>
}

export function NoteGenCanvasChartPanel({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const values = [28, 45, 34, 62, 48, 76, 58]
  return <div className="w-48 rounded-xl border bg-background p-3 shadow-lg"><div className="flex items-center justify-between"><div><h4 className="text-[9px] font-medium">{lang === "en" ? "Weekly captures" : "每周记录"}</h4><p className="text-[7px] text-muted-foreground">{lang === "en" ? "+18% from last week" : "较上周 +18%"}</p></div><MoreHorizontal className="size-3 text-muted-foreground" /></div><div className="mt-3 flex h-20 items-end gap-2">{values.map((value, index) => <span key={index} className="flex-1 rounded-t bg-foreground/75" style={{ height: `${value}%` }} />)}</div></div>
}

export function NoteGenCanvasSurface({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <section className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:18px_18px]"><NoteGenCanvasToolbar /><svg className="absolute inset-0 h-full w-full text-border" aria-hidden="true"><path d="M180 175 C260 175 260 250 350 250" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M350 250 C430 250 430 145 520 145" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg><NoteGenCanvasNode title={lang === "en" ? "Capture first" : "先记录"} text={lang === "en" ? "Keep the entry cost close to zero." : "让输入成本尽可能接近零。"} className="left-[8%] top-[30%]" /><NoteGenCanvasNode title={lang === "en" ? "Progressive structure" : "渐进式结构"} text={lang === "en" ? "Organize only when structure becomes useful." : "只在结构变得有用时整理。"} tone="note" className="left-[40%] top-[48%]" /><NoteGenCanvasNode title={lang === "en" ? "AI synthesis" : "AI 整理"} text={lang === "en" ? "Turn fragments into durable notes." : "把碎片转化成持久的笔记。"} tone="ai" className="right-[8%] top-[24%]" /><NoteGenCanvasFooter lang={lang} /></section>
}

export function NoteGenCanvasWorkspace({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="grid h-full min-h-0 grid-cols-[30%_70%]"><NoteGenCanvasSidebar lang={lang} /><div className="border-l"><NoteGenCanvasSurface lang={lang} /></div></div>
}
