"use client"

import { CheckSquare, CopySlash, FilePlus, ImagePlus, Link, Mic, Minus, ScanText, Square, X } from "lucide-react"

import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenReplicaPlatform = "mac" | "windows" | "linux"
export type NoteGenCaptureTool = "text" | "recording" | "scan" | "image" | "link" | "file" | "todo"

const captureTools = [
  { id: "text", icon: CopySlash, cn: "文本记录", en: "Text capture" },
  { id: "recording", icon: Mic, cn: "录音", en: "Audio recording" },
  { id: "scan", icon: ScanText, cn: "扫描", en: "Scan" },
  { id: "image", icon: ImagePlus, cn: "图片记录", en: "Image capture" },
  { id: "link", icon: Link, cn: "链接记录", en: "Link capture" },
  { id: "file", icon: FilePlus, cn: "文件记录", en: "File capture" },
  { id: "todo", icon: CheckSquare, cn: "待办记录", en: "Todo capture" },
] satisfies Array<{ id: NoteGenCaptureTool; icon: typeof CopySlash; cn: string; en: string }>

export function NoteGenCaptureToolbar({ lang = "cn", onToolClick, showShortcutHints = false, className }: {
  lang?: NoteGenReplicaLanguage
  onToolClick?: (tool: NoteGenCaptureTool) => void
  showShortcutHints?: boolean
  className?: string
}) {
  return (
    <div role="toolbar" aria-label={lang === "en" ? "Capture tools" : "记录工具"} className={cn("flex shrink-0 items-center gap-0.5 px-2", className)}>
      {captureTools.map(({ id, icon, cn: cnLabel, en }, index) => (
        <span key={id} style={{ position: "relative", display: "flex" }}><NoteGenReplicaIconButton icon={icon} label={lang === "en" ? en : cnLabel} title={lang === "en" ? en : cnLabel} disabled={!onToolClick} onClick={() => onToolClick?.(id)} className="disabled:cursor-default disabled:opacity-100" />{showShortcutHints ? <span aria-hidden="true" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "var(--color-foreground)", color: "var(--color-background)", fontSize: 10, lineHeight: "14px", textAlign: "center" }}>{index + 1}</span> : null}</span>
      ))}
    </div>
  )
}

export function NoteGenWindowControls({ platform = "mac", className }: { platform?: NoteGenReplicaPlatform; className?: string }) {
  return platform === "mac" ? (
    <div data-notegen-replica="window-controls" className={cn("flex shrink-0 items-center gap-2 px-3", className)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }} aria-hidden="true">
      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
    </div>
  ) : (
    <div className={cn("flex h-full shrink-0 items-stretch", className)} aria-hidden="true">
      {[Minus, Square, X].map((Icon, index) => (
        <span key={index} className="flex w-12 items-center justify-center text-muted-foreground">
          <Icon className={index === 1 ? "size-3.5" : "size-4"} />
        </span>
      ))}
    </div>
  )
}
