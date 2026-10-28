import { NoteGenEditorTabs, type NoteGenEditorTabsProps } from "./editor-tabs-replica"
import { NoteGenEditorFormatControls, type NoteGenEditorFormatProps } from "./editor-format-controls"
import { Sparkles as SelectionSparkles } from "lucide-react"
export { NoteGenEditorTabs } from "./editor-tabs-replica"
export type { NoteGenEditorTabsProps, NoteGenEditorTab } from "./editor-tabs-replica"
import { ChevronDown, ChevronRight, File, FilePlus2, Folder, FolderPlus, Hash, MoreHorizontal, Search } from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export function NoteGenFileToolbar({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex h-10 items-center gap-0.5 border-b px-2 text-muted-foreground"><span className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-md bg-muted/50 px-2"><Search className="size-3" /><span className="truncate text-[8px]">{lang === "en" ? "Search files" : "搜索文件"}</span></span><span className="flex size-7 items-center justify-center rounded-md"><FilePlus2 className="size-3.5" /></span><span className="flex size-7 items-center justify-center rounded-md"><FolderPlus className="size-3.5" /></span><span className="flex size-7 items-center justify-center rounded-md"><MoreHorizontal className="size-3.5" /></span></div>
}

export function NoteGenFileTreeRow({ name, kind = "file", depth = 0, active, open, meta }: { name: string; kind?: "file" | "folder"; depth?: number; active?: boolean; open?: boolean; meta?: string }) {
  return <div className={cn("flex h-7 items-center gap-1 rounded-md pr-2 text-[9px] text-muted-foreground", active && "bg-accent font-medium text-foreground")} style={{ paddingLeft: 6 + depth * 12 }}>{kind === "folder" ? (open ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />) : <span className="w-3" />} {kind === "folder" ? <Folder className="size-3.5 fill-muted-foreground/15" /> : <File className="size-3.5" />}<span className="min-w-0 flex-1 truncate">{name}</span>{meta ? <span className="text-[7px] opacity-60">{meta}</span> : null}</div>
}

export function NoteGenFileSidebar({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <aside className="flex h-full min-h-0 flex-col bg-sidebar"><NoteGenFileToolbar lang={lang} /><div className="min-h-0 flex-1 space-y-0.5 overflow-hidden p-2"><NoteGenFileTreeRow name={lang === "en" ? "My notes" : "我的笔记"} kind="folder" open /><NoteGenFileTreeRow name={lang === "en" ? "Product" : "产品"} kind="folder" depth={1} open /><NoteGenFileTreeRow name={lang === "en" ? "NoteGen design principles.md" : "NoteGen 设计原则.md"} depth={2} active /><NoteGenFileTreeRow name={lang === "en" ? "Release plan.md" : "版本计划.md"} depth={2} /><NoteGenFileTreeRow name={lang === "en" ? "Research" : "资料"} kind="folder" depth={1} /><NoteGenFileTreeRow name={lang === "en" ? "Daily" : "每日记录"} kind="folder" depth={1} meta="12" /></div></aside>
}


export function NoteGenEditorToolbar(props: NoteGenEditorFormatProps = {}) {
  return <div role="toolbar" aria-label={props.lang === "en" ? "Formatting" : "格式工具栏"} className="relative flex h-10 items-center border-b px-2 text-muted-foreground"><NoteGenEditorFormatControls {...props} /></div>
}

export function NoteGenBubbleMenu(props: NoteGenEditorFormatProps = {}) {
  return <div role="toolbar" aria-label={props.lang === "en" ? "Selection toolbar" : "选区工具栏"} className="relative inline-flex items-center gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10"><span className="flex size-7 items-center justify-center text-primary"><SelectionSparkles className="size-4" /></span><NoteGenEditorFormatControls {...props} /></div>
}

export function NoteGenDocumentPage({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <article className="mx-auto w-full max-w-2xl px-8 py-8"><div className="mb-4 flex items-center gap-2 text-[8px] text-muted-foreground"><Hash className="size-3" />product · design</div><h1 className="text-2xl font-bold tracking-tight">{lang === "en" ? "Design principles for calm writing" : "安静写作的设计原则"}</h1><p className="mt-3 text-[10px] leading-5 text-muted-foreground">{lang === "en" ? "A workspace should make capture effortless and leave enough room for thought." : "一个好的工作区，应该让记录毫不费力，同时给思考留下足够的空间。"}</p><h2 className="mt-7 text-base font-semibold">{lang === "en" ? "Capture without interruption" : "不打断地记录"}</h2><p className="mt-2 text-[10px] leading-5">{lang === "en" ? "Text, voice, images and links enter the same stream. Structure is added only when it becomes useful." : "文本、语音、图片与链接进入同一条信息流。只有当结构真正有用时，再进行整理。"}</p><blockquote className="mt-5 border-l-2 pl-4 text-[10px] italic leading-5 text-muted-foreground">{lang === "en" ? "Tools should disappear while ideas remain visible." : "工具应当隐去，而想法始终清晰可见。"}</blockquote><div className="mt-4"><NoteGenBubbleMenu lang={lang} /></div></article>
}

export function NoteGenEditorWorkspace({ lang = "cn", tabsProps }: { lang?: NoteGenReplicaLanguage; tabsProps?: NoteGenEditorTabsProps }) {
  return <div className="grid h-full min-h-0 grid-cols-[30%_70%]"><NoteGenFileSidebar lang={lang} /><section className="flex min-h-0 flex-col border-l bg-background"><NoteGenEditorTabs lang={lang} {...tabsProps} /><div className="min-h-0 flex-1 overflow-hidden"><NoteGenDocumentPage lang={lang} /></div></section></div>
}
