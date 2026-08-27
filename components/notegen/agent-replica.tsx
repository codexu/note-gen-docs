import type { ReactNode } from "react"
import {
  Bot,
  Brain,
  Check,
  ChevronDown,
  Circle,
  Clock3,
  Copy,
  FileText,
  Globe2,
  History,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
  Wrench,
} from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export function NoteGenAgentHeader({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <header className="flex h-10 items-center gap-2 border-b px-3"><Bot className="size-4" /><span className="font-medium">{lang === "en" ? "NoteGen Agent" : "NoteGen 助手"}</span><span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[7px] text-emerald-600">GPT-5</span><div className="ml-auto flex gap-2 text-muted-foreground"><Search className="size-3.5" /><History className="size-3.5" /><Plus className="size-3.5" /></div></header>
}

export function NoteGenAgentMessage({ role, children, time = "10:28" }: { role: "user" | "assistant"; children: ReactNode; time?: string }) {
  const Icon = role === "assistant" ? Sparkles : User
  return <div className={cn("flex gap-2.5", role === "user" && "flex-row-reverse")}><span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border", role === "assistant" ? "bg-foreground text-background" : "bg-muted")}><Icon className="size-3" /></span><div className={cn("max-w-[82%]", role === "user" && "text-right")}><div className={cn("rounded-xl px-3 py-2 text-left text-[9px] leading-4", role === "assistant" ? "rounded-tl-sm bg-muted/60" : "rounded-tr-sm bg-foreground text-background")}>{children}</div><span className="mt-1 block text-[7px] text-muted-foreground">{time}</span></div></div>
}

export function NoteGenThinkingBlock({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="rounded-lg border bg-muted/20 p-2.5"><div className="flex items-center gap-2 text-[8px] font-medium"><Brain className="size-3.5" />{lang === "en" ? "Thinking" : "思考过程"}<ChevronDown className="ml-auto size-3 text-muted-foreground" /></div><p className="mt-2 border-l pl-2 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "I’ll compare the selected notes, identify repeated ideas, and preserve the original references." : "我会对比选中的笔记，识别重复观点，并保留原始引用。"}</p></div>
}

export function NoteGenToolCall({ type = "search", lang = "cn", status = "done" }: { type?: "search" | "file" | "terminal"; lang?: NoteGenReplicaLanguage; status?: "running" | "done" }) {
  const icons = { search: Globe2, file: FileText, terminal: Terminal }
  const Icon = icons[type]
  const labels = { search: lang === "en" ? "Search workspace" : "搜索工作区", file: lang === "en" ? "Read document" : "读取文档", terminal: lang === "en" ? "Run tool" : "运行工具" }
  return <div className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-2"><span className="flex size-6 items-center justify-center rounded bg-muted"><Icon className="size-3" /></span><div className="min-w-0 flex-1"><div className="text-[8px] font-medium">{labels[type]}</div><div className="truncate text-[7px] text-muted-foreground">{type === "file" ? "notes/product/design.md" : "NoteGen design principles"}</div></div>{status === "done" ? <Check className="size-3 text-emerald-500" /> : <Clock3 className="size-3 animate-pulse text-muted-foreground" />}</div>
}

export function NoteGenExecutionTimeline({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="rounded-lg border p-2.5"><div className="mb-2 flex items-center gap-2 text-[8px] font-medium"><Wrench className="size-3.5" />{lang === "en" ? "3 actions completed" : "已完成 3 个操作"}</div><div className="space-y-1.5"><NoteGenToolCall lang={lang} /><NoteGenToolCall lang={lang} type="file" /><NoteGenToolCall lang={lang} type="terminal" /></div></div>
}

export function NoteGenAgentApproval({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="rounded-lg border border-amber-500/35 bg-amber-500/5 p-3"><div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 text-amber-600" /><div><h4 className="text-[9px] font-medium">{lang === "en" ? "Permission required" : "需要你的确认"}</h4><p className="mt-1 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "Allow Agent to update notes/product/design.md?" : "允许 Agent 更新 notes/product/design.md？"}</p></div></div><div className="mt-3 flex justify-end gap-2"><span className="rounded-md border bg-background px-2.5 py-1 text-[8px]">{lang === "en" ? "Deny" : "拒绝"}</span><span className="rounded-md bg-foreground px-2.5 py-1 text-[8px] text-background">{lang === "en" ? "Allow" : "允许"}</span></div></div>
}

export function NoteGenAgentMessageActions({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="inline-flex items-center gap-1 rounded-md border bg-background p-1 text-muted-foreground shadow-xs"><span className="flex size-6 items-center justify-center"><Copy className="size-3" /></span><span className="flex size-6 items-center justify-center"><Check className="size-3" /></span><span className="px-1 text-[7px]">{lang === "en" ? "Insert into note" : "插入笔记"}</span></div>
}

export function NoteGenAgentModelControl({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex items-center gap-1.5"><span className="flex items-center gap-1 rounded-md border px-2 py-1 text-[7px]"><Bot className="size-3" />GPT-5<ChevronDown className="size-2.5" /></span><span className="flex items-center gap-1 rounded-md border px-2 py-1 text-[7px]"><ShieldCheck className="size-3" />{lang === "en" ? "Ask first" : "操作前询问"}<ChevronDown className="size-2.5" /></span></div>
}

export function NoteGenContextTray({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex items-center gap-1.5 overflow-hidden border-t px-3 py-2"><span className="flex items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 text-[7px]"><FileText className="size-3" />design.md <span className="text-muted-foreground">4.2k</span></span><span className="flex items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 text-[7px]"><Circle className="size-2 fill-violet-500 text-violet-500" />{lang === "en" ? "Product notes" : "产品笔记"}</span><span className="ml-auto text-[7px] text-muted-foreground">12k / 128k</span></div>
}

export function NoteGenAgentComposer({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="m-2 rounded-xl border bg-background p-2 shadow-sm"><p className="min-h-10 px-1 text-[9px] text-muted-foreground">{lang === "en" ? "Ask about your notes, or describe what to create…" : "询问笔记内容，或描述你想创建的内容……"}</p><div className="flex items-center gap-2 text-muted-foreground"><Paperclip className="size-3.5" /><NoteGenAgentModelControl lang={lang} /><span className="ml-auto flex size-7 items-center justify-center rounded-lg bg-foreground text-background"><Send className="size-3" /></span></div></div>
}

export function NoteGenAgentPanel({ lang = "cn", className }: { lang?: NoteGenReplicaLanguage; className?: string }) {
  return <aside className={cn("flex h-full min-h-0 flex-col bg-background", className)}><NoteGenAgentHeader lang={lang} /><div className="min-h-0 flex-1 space-y-4 overflow-hidden p-3"><NoteGenAgentMessage role="user">{lang === "en" ? "Turn these fragments into a short design note." : "把这些碎片整理成一篇简短的设计说明。"}</NoteGenAgentMessage><NoteGenAgentMessage role="assistant"><div className="space-y-2"><NoteGenThinkingBlock lang={lang} /><NoteGenExecutionTimeline lang={lang} /><p>{lang === "en" ? "I found three recurring principles: low interruption, progressive structure, and visible context." : "我找到三个反复出现的原则：低打扰、渐进式结构和始终可见的上下文。"}</p></div></NoteGenAgentMessage></div><NoteGenContextTray lang={lang} /><NoteGenAgentComposer lang={lang} /></aside>
}
