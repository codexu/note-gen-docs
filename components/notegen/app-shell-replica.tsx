import type { ReactNode } from "react"
import {
  Bot,
  ChevronDown,
  ChevronsUpDown,
  Cloud,
  Code2,
  Copy,
  Download,
  Eye,
  FolderOpen,
  Grid3X3,
  List,
  Magnet,
  Maximize2,
  Mic,
  Minus,
  PanelLeft,
  PanelRight,
  Pin,
  ScanText,
  Settings,
  Sparkles,
  Square,
  WandSparkles,
  X,
  ZoomOut,
  ImagePlus,
  Link,
  ListTodo,
  Type,
} from "lucide-react"

import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import type { NoteGenWorkspace } from "@/components/notegen/workspace-switcher"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const captureTools = [Type, Mic, ScanText, ImagePlus, Link, ListTodo]

export function NoteGenCaptureToolbar({ lang = "cn", className }: { lang?: NoteGenReplicaLanguage; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5 rounded-md border bg-background/95 p-0.5 shadow-xs", className)}>
      {captureTools.map((Icon, index) => (
        <NoteGenReplicaIconButton
          key={index}
          icon={Icon}
          label={lang === "en" ? "Capture tool" : "记录工具"}
          active={index === 0}
          className="size-7"
        />
      ))}
    </div>
  )
}

export function NoteGenWindowControls({ platform = "mac", className }: { platform?: "mac" | "windows" | "linux"; className?: string }) {
  if (platform === "mac") {
    return (
      <div className={cn("flex items-center gap-2 px-3", className)} aria-label="macOS window controls">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
    )
  }
  return (
    <div className={cn("ml-auto flex h-full items-stretch", className)} aria-label={`${platform} window controls`}>
      <span className="flex w-10 items-center justify-center text-muted-foreground"><Minus className="size-3" /></span>
      <span className="flex w-10 items-center justify-center text-muted-foreground"><Square className="size-2.5" /></span>
      <span className="flex w-10 items-center justify-center text-muted-foreground"><X className="size-3" /></span>
    </div>
  )
}

export function NoteGenAppTitleBar({ lang = "cn", platform = "mac", className }: { lang?: NoteGenReplicaLanguage; platform?: "mac" | "windows" | "linux"; className?: string }) {
  return (
    <header className={cn("flex h-10 shrink-0 items-center border-b bg-background", className)}>
      {platform === "mac" ? <NoteGenWindowControls platform="mac" /> : null}
      <div className="flex min-w-0 flex-1 items-center justify-center">
        <NoteGenCaptureToolbar lang={lang} />
      </div>
      <div className="flex items-center gap-0.5 px-2">
        <NoteGenReplicaIconButton icon={PanelLeft} label="Left panel" className="size-7" />
        <NoteGenReplicaIconButton icon={PanelRight} label="Right panel" className="size-7" />
        <NoteGenReplicaIconButton icon={Pin} label="Pin" className="size-7" />
        <NoteGenReplicaIconButton icon={Settings} label="Settings" className="size-7" />
        <span className="relative ml-1 flex size-7 items-center justify-center rounded-md border text-muted-foreground">
          <Bot className="size-3.5" />
          <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-emerald-500 ring-1 ring-background" />
        </span>
      </div>
      {platform !== "mac" ? <NoteGenWindowControls platform={platform} /> : null}
    </header>
  )
}

export function NoteGenPanelHandle({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  return <div className={cn("group relative shrink-0 bg-border/70", orientation === "vertical" ? "w-px cursor-col-resize" : "h-px cursor-row-resize")}><span className={cn("absolute rounded-full bg-foreground/15 opacity-0 group-hover:opacity-100", orientation === "vertical" ? "inset-y-1/3 -left-0.5 w-0.5" : "inset-x-1/3 -top-0.5 h-0.5")} /></div>
}

function StatusButton({ icon: Icon, label, endIcon: EndIcon }: { icon: typeof Bot; label: string; endIcon?: typeof Bot }) {
  return (
    <Button variant="ghost" size="xs" className="h-5 min-w-0 gap-1 px-1.5 text-[8px] font-normal text-muted-foreground">
      <Icon data-icon="inline-start" />
      <span className="truncate">{label}</span>
      {EndIcon ? <EndIcon data-icon="inline-end" className="opacity-50" /> : null}
    </Button>
  )
}

export function NoteGenMainStatusBar({
  lang = "cn",
  workspace = "writing",
  className,
}: {
  lang?: NoteGenReplicaLanguage
  workspace?: NoteGenWorkspace
  className?: string
}) {
  const isEnglish = lang === "en"

  return (
    <footer className={cn("flex h-6 min-h-6 shrink-0 items-center gap-2 overflow-hidden border-t bg-background px-1 text-[8px] text-muted-foreground", className)}>
      <Button variant="ghost" size="xs" className="h-5 max-w-48 shrink-0 gap-1 px-1.5 text-[8px] font-normal text-muted-foreground">
        <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
        <FolderOpen data-icon="inline-start" />
        <span className="truncate">{isEnglish ? "Local workspace" : "本地工作区"}</span>
        <ChevronsUpDown data-icon="inline-end" className="opacity-50" />
      </Button>

      <div className="flex min-w-0 flex-1 items-center justify-between overflow-hidden">
        {workspace === "writing" ? (
          <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">
            <span className="shrink-0 px-1 text-[8px]">{isEnglish ? "862 characters" : "862 字符"}</span>
            <StatusButton icon={Eye} label={isEnglish ? "Visual" : "所见即所得"} />
            <StatusButton icon={Copy} label={isEnglish ? "Copy" : "复制"} />
            <StatusButton icon={Download} label={isEnglish ? "Export" : "导出"} />
            <StatusButton icon={List} label={isEnglish ? "Outline" : "大纲"} />
          </div>
        ) : workspace === "canvas" ? (
          <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">
            <StatusButton icon={Grid3X3} label={isEnglish ? "Grid" : "网格"} />
            <StatusButton icon={Magnet} label={isEnglish ? "Snap" : "吸附"} />
            <StatusButton icon={WandSparkles} label={isEnglish ? "Layout" : "布局"} />
            <StatusButton icon={Code2} label={isEnglish ? "Import" : "导入"} />
          </div>
        ) : <span />}

        {workspace === "writing" ? (
          <span className="flex shrink-0 items-center gap-1 px-1"><Cloud className="size-3" />{isEnglish ? "Synced" : "已同步"}</span>
        ) : workspace === "canvas" ? (
          <div className="flex shrink-0 items-center gap-2 px-1"><ZoomOut className="size-3" /><span>100%</span><Maximize2 className="size-3" /></div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-0.5 overflow-hidden">
        <StatusButton icon={Bot} label="GPT-5" endIcon={ChevronDown} />
        <StatusButton icon={Sparkles} label={isEnglish ? "Default" : "默认提示词"} endIcon={ChevronDown} />
      </div>
    </footer>
  )
}

export function NoteGenAppShell({ children, lang = "cn", platform = "mac", workspace = "writing", className }: { children: ReactNode; lang?: NoteGenReplicaLanguage; platform?: "mac" | "windows" | "linux"; workspace?: NoteGenWorkspace; className?: string }) {
  return (
    <div className={cn("flex aspect-[16/10] min-h-0 w-full flex-col overflow-hidden rounded-xl border bg-background text-[10px] shadow-xl", className)}>
      <NoteGenAppTitleBar lang={lang} platform={platform} />
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <NoteGenMainStatusBar lang={lang} workspace={workspace} />
    </div>
  )
}
