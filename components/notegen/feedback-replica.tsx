import type { ReactNode } from "react"
import { AlertTriangle, ArrowRight, Check, Cloud, Download, File, Image, Mic, NotebookPen, Palette, Pause, RefreshCw, Search, SearchX, Sparkles, Square, Upload, X } from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export function NoteGenDialogBackdrop({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative flex min-h-64 items-center justify-center overflow-hidden rounded-xl border bg-muted/40 p-5 before:absolute before:inset-0 before:bg-background/55 before:backdrop-blur-[2px]", className)}>{children}</div>
}

export function NoteGenGlobalSearch({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const filters = [lang === "en" ? "All" : "全部", lang === "en" ? "Records" : "记录", lang === "en" ? "Articles" : "文章", lang === "en" ? "Canvases" : "画布"]
  return <div className="relative z-10 flex h-56 w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"><div className="flex items-center gap-3 border-b px-4 py-3"><div className="flex min-w-0 flex-1 items-center gap-2"><Search className="size-4 text-muted-foreground" /><span className="text-[10px] font-medium text-muted-foreground">{lang === "en" ? "Search notes, records and canvases…" : "搜索笔记、记录和画布……"}</span></div><span className="text-[8px] font-semibold">{lang === "en" ? "0 results" : "0 个结果"}</span><span className="h-5 w-px bg-border" /><div className="flex rounded-md border p-0.5">{filters.map((filter, index) => <span key={filter} className={cn("rounded px-2 py-1 text-[7px]", index === 0 ? "bg-accent font-medium" : "text-muted-foreground")}>{filter}</span>)}</div></div><div className="flex flex-1 flex-col items-center justify-center"><SearchX className="size-8 text-muted-foreground" /><p className="mt-2 text-[10px] font-medium">{lang === "en" ? "Search notes, records and canvases" : "搜索笔记、记录和画布"}</p><p className="mt-1 text-[8px] text-muted-foreground">{lang === "en" ? "Try a different keyword" : "尝试输入不同的关键词"}</p></div></div>
}

export function NoteGenRecordingOverlay({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="relative z-10 w-full max-w-sm rounded-xl border bg-background p-5 shadow-2xl"><div><h3 className="text-sm font-semibold">{lang === "en" ? "Voice recording" : "语音录制"}</h3><p className="mt-1 text-[8px] text-muted-foreground">{lang === "en" ? "Record audio and transcribe it into text." : "录制音频并将其识别为文字。"}</p></div><div className="flex flex-col items-center gap-4 py-5"><div className="font-mono text-4xl font-bold">00:18</div><div className="flex items-center gap-2 text-[9px] text-muted-foreground"><span className="size-2.5 animate-pulse rounded-full bg-destructive" />{lang === "en" ? "Recording" : "正在录音"}</div><div className="flex gap-3"><span className="flex size-12 items-center justify-center rounded-full border"><Pause className="size-5" /></span><span className="flex size-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground"><Square className="size-5" /></span></div><span className="text-[9px] text-muted-foreground">{lang === "en" ? "Cancel" : "取消"}</span></div></div>
}

export function NoteGenSyncStatus({ lang = "cn", state = "success" }: { lang?: NoteGenReplicaLanguage; state?: "syncing" | "success" | "conflict" }) {
  const Icon = state === "syncing" ? Upload : state === "conflict" ? AlertTriangle : Check
  const label = state === "syncing" ? (lang === "en" ? "Syncing changes…" : "正在同步更改……") : state === "conflict" ? (lang === "en" ? "1 sync conflict needs review" : "有 1 个同步冲突待处理") : (lang === "en" ? "Everything is up to date" : "所有内容均为最新")
  const tone = state === "syncing" ? "text-blue-500" : state === "conflict" ? "text-amber-500" : "text-emerald-500"
  return <div className="relative z-10 flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 shadow-sm"><Icon className={cn("size-3.5", tone)} /><span className="text-[9px] font-medium">{label}</span>{state === "syncing" ? <span className="size-1.5 animate-pulse rounded-full bg-primary" /> : null}</div>
}

export function NoteGenImageViewer({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="relative z-10 flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-xl bg-zinc-950 text-zinc-100 shadow-2xl"><div className="absolute inset-x-0 top-0 flex h-10 items-center bg-gradient-to-b from-black/70 px-3"><Image className="size-3.5" /><span className="ml-2 text-[9px]">notegen-interface.png</span><X className="ml-auto size-4" /></div><div className="flex h-28 w-44 items-center justify-center rounded-lg border border-white/15 bg-zinc-900"><Sparkles className="size-8 text-white/40" /></div><span className="absolute bottom-3 rounded-full bg-black/60 px-3 py-1 text-[8px]">1 / 3 · 100%</span></div>
}

export function NoteGenConfirmationDialog({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="relative z-10 w-full max-w-xs rounded-xl border bg-background p-4 shadow-2xl"><div className="flex items-start gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600"><AlertTriangle className="size-4" /></span><div><h3 className="text-[11px] font-semibold">{lang === "en" ? "Unsaved changes" : "存在未保存的更改"}</h3><p className="mt-1 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "Save the current note before closing the window?" : "关闭窗口前，是否保存当前笔记？"}</p></div></div><div className="mt-4 flex justify-end gap-2"><span className="rounded-md border px-3 py-1.5 text-[8px]">{lang === "en" ? "Discard" : "不保存"}</span><span className="rounded-md bg-foreground px-3 py-1.5 text-[8px] text-background">{lang === "en" ? "Save" : "保存"}</span></div></div>
}

export function NoteGenActivityHeatmap({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const levels = [0,1,0,2,3,0,1, 1,2,3,2,0,1,0, 0,1,2,4,3,2,1, 1,0,2,3,4,2,0, 0,1,0,2,3,1,0]
  return <div className="rounded-xl border bg-background p-4"><div className="flex items-center justify-between"><div><h3 className="text-[10px] font-semibold">{lang === "en" ? "Writing activity" : "写作活动"}</h3><p className="mt-0.5 text-[8px] text-muted-foreground">{lang === "en" ? "42 active days this year" : "今年已活跃 42 天"}</p></div><Sparkles className="size-4 text-muted-foreground" /></div><div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">{levels.map((level, index) => <span key={index} className={cn("aspect-square rounded-[2px]", level === 0 ? "bg-muted" : level === 1 ? "bg-emerald-200 dark:bg-emerald-950" : level === 2 ? "bg-emerald-400 dark:bg-emerald-800" : level === 3 ? "bg-emerald-600" : "bg-emerald-800")} />)}</div></div>
}

export function NoteGenUpdatePrompt({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="w-full max-w-sm rounded-xl border bg-background p-4 shadow-xl"><div className="flex items-start gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background"><Download className="size-4" /></span><div><h3 className="text-[10px] font-semibold">{lang === "en" ? "NoteGen 0.36.0 is available" : "NoteGen 0.36.0 已发布"}</h3><p className="mt-1 text-[8px] leading-4 text-muted-foreground">{lang === "en" ? "Improved Agent tools, canvas editing, and mobile writing." : "改进 Agent 工具、画布编辑与移动端写作体验。"}</p></div></div><div className="mt-4 flex justify-end gap-2"><span className="rounded-md border px-3 py-1.5 text-[8px]">{lang === "en" ? "Later" : "稍后"}</span><span className="rounded-md bg-foreground px-3 py-1.5 text-[8px] text-background">{lang === "en" ? "Update now" : "立即更新"}</span></div></div>
}

export function NoteGenOnboardingCard({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="w-full max-w-sm rounded-2xl border bg-background p-5 shadow-xl"><span className="flex size-11 items-center justify-center rounded-2xl bg-foreground text-background"><Sparkles className="size-5" /></span><h3 className="mt-4 text-base font-semibold">{lang === "en" ? "Capture now, organize later" : "现在记录，稍后整理"}</h3><p className="mt-2 text-[9px] leading-4 text-muted-foreground">{lang === "en" ? "NoteGen keeps text, voice, images, and links in one calm stream, then helps turn them into lasting notes." : "NoteGen 把文字、语音、图片和链接收进一条安静的信息流，再帮你把它们整理成持久的笔记。"}</p><div className="mt-5 flex items-center justify-between"><span className="text-[8px] text-muted-foreground">1 / 3</span><span className="flex items-center gap-1 rounded-md bg-foreground px-3 py-1.5 text-[8px] text-background">{lang === "en" ? "Continue" : "继续"}<ArrowRight className="size-3" /></span></div></div>
}

export function NoteGenErrorToast({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-red-500/30 bg-background p-3 shadow-xl"><span className="flex size-8 items-center justify-center rounded-full bg-red-500/10 text-red-600"><AlertTriangle className="size-4" /></span><div className="min-w-0 flex-1"><div className="text-[9px] font-medium">{lang === "en" ? "Sync failed" : "同步失败"}</div><p className="truncate text-[7px] text-muted-foreground">{lang === "en" ? "Could not reach the remote repository." : "无法连接到远程仓库。"}</p></div><span className="flex items-center gap-1 text-[8px]"><RefreshCw className="size-3" />{lang === "en" ? "Retry" : "重试"}</span></div>
}
