import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Filter,
  Image,
  Link,
  ListFilter,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
} from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export function NoteGenTagChip({ label, count, active, color = "bg-blue-500" }: { label: string; count?: number; active?: boolean; color?: string }) {
  return <span className={cn("inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-[9px] text-muted-foreground", active && "bg-accent font-medium text-foreground")}><span className={cn("size-1.5 rounded-full", color)} />{label}{count !== undefined ? <span className="text-[8px] opacity-60">{count}</span> : null}</span>
}

export function NoteGenRecordHeader({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return (
    <div className="flex h-10 items-center gap-1 border-b px-2">
      <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-md bg-muted/50 px-2 text-muted-foreground"><Search className="size-3" /><span className="truncate">{lang === "en" ? "Search captures" : "搜索记录"}</span><span className="ml-auto rounded border px-1 text-[7px]">⌘ K</span></div>
      <span className="flex size-7 items-center justify-center rounded-md text-muted-foreground"><Filter className="size-3.5" /></span>
      <span className="flex size-7 items-center justify-center rounded-md text-muted-foreground"><SlidersHorizontal className="size-3.5" /></span>
    </div>
  )
}

export function NoteGenRecordItem({ type = "text", title, excerpt, time = "10:24", active, tags = [] }: { type?: "text" | "audio" | "image" | "link" | "todo"; title: string; excerpt?: string; time?: string; active?: boolean; tags?: string[] }) {
  const icons = { text: FileText, audio: Mic, image: Image, link: Link, todo: CheckCircle2 }
  const Icon = icons[type]
  return (
    <article className={cn("group flex gap-2.5 rounded-lg border border-transparent p-2.5", active ? "border-border bg-accent/70" : "hover:bg-accent/40")}>
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground"><Icon className="size-3.5" /></span>
      <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h4 className="truncate text-[10px] font-medium">{title}</h4><time className="ml-auto shrink-0 text-[8px] text-muted-foreground">{time}</time></div>{excerpt ? <p className="mt-1 line-clamp-2 text-[8px] leading-3.5 text-muted-foreground">{excerpt}</p> : null}<div className="mt-1.5 flex gap-1">{tags.map((tag) => <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[7px] text-muted-foreground">#{tag}</span>)}</div></div>
      <MoreHorizontal className="size-3 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
    </article>
  )
}

export function NoteGenAudioWaveform({ duration = "01:42" }: { duration?: string }) {
  const bars = [5, 9, 14, 7, 18, 11, 6, 15, 20, 8, 12, 17, 6, 10, 14, 8, 19, 12, 7, 15, 10, 5, 11, 8]
  return <div className="flex h-12 items-center gap-1 rounded-lg border bg-muted/20 px-3"><span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background"><Mic className="size-3" /></span><div className="flex flex-1 items-center justify-center gap-[2px]">{bars.map((height, index) => <span key={index} className={cn("w-0.5 rounded-full", index < 8 ? "bg-foreground" : "bg-muted-foreground/30")} style={{ height }} />)}</div><span className="text-[8px] text-muted-foreground">{duration}</span></div>
}

export function NoteGenRecordImageGrid({ count = 3 }: { count?: number }) {
  return <div className="grid grid-cols-3 gap-1.5">{Array.from({ length: count }).map((_, index) => <div key={index} className="relative aspect-square overflow-hidden rounded-md border bg-gradient-to-br from-muted to-muted/40"><Image className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/45" />{index === count - 1 && count > 3 ? <span className="absolute inset-0 flex items-center justify-center bg-foreground/55 text-[9px] text-background">+{count - 3}</span> : null}</div>)}</div>
}

export function NoteGenTodoCard({ title, done, meta }: { title: string; done?: boolean; meta?: string }) {
  return <div className="flex items-start gap-2 rounded-lg border bg-card p-2.5"><span className={cn("mt-0.5 size-3.5 rounded border", done && "flex items-center justify-center border-foreground bg-foreground text-background")}>{done ? <CheckCircle2 className="size-2.5" /> : null}</span><div className="min-w-0 flex-1"><p className={cn("text-[9px]", done && "text-muted-foreground line-through")}>{title}</p>{meta ? <p className="mt-1 text-[7px] text-muted-foreground">{meta}</p> : null}</div></div>
}

export function NoteGenRecordEmptyState({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex h-full min-h-48 flex-col items-center justify-center text-center"><span className="flex size-12 items-center justify-center rounded-2xl border bg-muted/30"><FileText className="size-5 text-muted-foreground" /></span><h3 className="mt-3 text-[10px] font-medium">{lang === "en" ? "No captures yet" : "还没有记录"}</h3><p className="mt-1 max-w-48 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "Text, voice, images, and links will appear here." : "文字、语音、图片和链接会出现在这里。"}</p></div>
}

export function NoteGenRecordDetail({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-background">
      <header className="flex h-10 items-center gap-2 border-b px-3"><span className="flex items-center gap-1 text-[9px] text-muted-foreground"><Tag className="size-3" />{lang === "en" ? "Inbox / Idea" : "收件箱 / 灵感"}</span><div className="ml-auto flex items-center gap-2 text-muted-foreground"><Sparkles className="size-3.5" /><MoreHorizontal className="size-3.5" /></div></header>
      <div className="min-h-0 flex-1 overflow-hidden p-5"><div className="mx-auto max-w-xl"><h2 className="text-lg font-semibold tracking-tight">{lang === "en" ? "A lightweight way to keep useful fragments" : "一种保留有用碎片的轻量方式"}</h2><p className="mt-2 text-[9px] text-muted-foreground">2026-08-27 · 10:24</p><p className="mt-5 text-[10px] leading-5 text-foreground/80">{lang === "en" ? "Capture first. Structure later. Let ideas arrive without interrupting the work already in progress." : "先记录，再整理。让想法自然抵达，不必打断手头正在进行的工作。零散内容会在需要时重新成为完整笔记。"}</p><div className="mt-5"><NoteGenAudioWaveform /></div></div></div>
    </section>
  )
}

export function NoteGenRecordSidebar({ lang = "cn", className }: { lang?: NoteGenReplicaLanguage; className?: string }) {
  return (
    <aside className={cn("flex h-full min-h-0 flex-col bg-sidebar", className)}><NoteGenRecordHeader lang={lang} /><div className="flex items-center gap-1 overflow-hidden border-b px-2 py-2"><NoteGenTagChip label={lang === "en" ? "All" : "全部"} count={24} active /><NoteGenTagChip label={lang === "en" ? "Ideas" : "灵感"} count={8} color="bg-violet-500" /><span className="ml-auto flex size-6 items-center justify-center"><Plus className="size-3" /></span></div><div className="flex items-center justify-between px-3 py-2 text-[8px] text-muted-foreground"><span>{lang === "en" ? "TODAY" : "今天"}</span><span className="flex items-center gap-1"><ListFilter className="size-3" />{lang === "en" ? "Newest" : "最新"}<ChevronDown className="size-2.5" /></span></div><div className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-1.5"><NoteGenRecordItem type="text" active title={lang === "en" ? "A lightweight way to keep useful fragments" : "一种保留有用碎片的轻量方式"} excerpt={lang === "en" ? "Capture first, structure later…" : "先记录，再整理，让想法自然抵达……"} tags={[lang === "en" ? "idea" : "灵感"]} /><NoteGenRecordItem type="audio" title={lang === "en" ? "Product meeting notes" : "产品会议速记"} excerpt={lang === "en" ? "Audio · 01:42" : "录音 · 01:42"} time="09:48" /><NoteGenRecordItem type="image" title={lang === "en" ? "Interface references" : "界面参考"} excerpt={lang === "en" ? "3 images" : "3 张图片"} time="Yesterday" /></div></aside>
  )
}

export function NoteGenRecordWorkspace({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="grid h-full min-h-0 grid-cols-[38%_62%]"><NoteGenRecordSidebar lang={lang} className="border-r" /><NoteGenRecordDetail lang={lang} /></div>
}
