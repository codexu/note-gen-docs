import type { ReactNode } from "react"
import {
  Bot,
  Check,
  Circle,
  Mic,
  Minus,
  PanelLeft,
  PanelRight,
  Pin,
  ScanText,
  Settings,
  Square,
  X,
  ImagePlus,
  Link,
  ListTodo,
  Type,
} from "lucide-react"

import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
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

export function NoteGenMainStatusBar({ lang = "cn", className }: { lang?: NoteGenReplicaLanguage; className?: string }) {
  return (
    <footer className={cn("flex h-6 shrink-0 items-center justify-between border-t bg-muted/25 px-2 text-[8px] text-muted-foreground", className)}>
      <div className="flex items-center gap-3"><span className="flex items-center gap-1"><Circle className="size-1.5 fill-emerald-500 text-emerald-500" />{lang === "en" ? "Ready" : "就绪"}</span><span>Markdown</span></div>
      <div className="flex items-center gap-3"><span className="flex items-center gap-1"><Check className="size-2.5" />{lang === "en" ? "Saved" : "已保存"}</span><span>UTF-8</span><span>Ln 18, Col 6</span></div>
    </footer>
  )
}

export function NoteGenAppShell({ children, lang = "cn", platform = "mac", className }: { children: ReactNode; lang?: NoteGenReplicaLanguage; platform?: "mac" | "windows" | "linux"; className?: string }) {
  return (
    <div className={cn("flex aspect-[16/10] min-h-0 w-full flex-col overflow-hidden rounded-xl border bg-background text-[10px] shadow-xl", className)}>
      <NoteGenAppTitleBar lang={lang} platform={platform} />
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <NoteGenMainStatusBar lang={lang} />
    </div>
  )
}
