"use client"

import {
  CheckSquare,
  CopySlash,
  EllipsisVertical,
  FilePlus,
  FolderPlus,
  ImagePlus,
  Link,
  MessageSquareDashed,
  MessageSquarePlus,
  Mic,
  Palette,
  PanelLeft,
  PanelRight,
  Pin,
  Redo2,
  ScanText,
  Search,
  Settings,
  Undo2,
} from "lucide-react"

import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage, NoteGenReplicaView } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenTitleBarMode =
  | "full"
  | "record-tools"
  | "writing-tools"
  | "agent-tools"
  | "canvas-tools"

const recordTools = [CopySlash, Mic, ScanText, ImagePlus, Link, FilePlus, CheckSquare]

export function NoteGenWindowTitleBar({
  lang,
  mode = "full",
  view = "workspace",
  onViewChange,
  className,
}: {
  lang: NoteGenReplicaLanguage
  mode?: NoteGenTitleBarMode
  view?: NoteGenReplicaView
  onViewChange?: (view: NoteGenReplicaView) => void
  className?: string
}) {
  const compactTools = mode === "writing-tools"
    ? [Undo2, Redo2, FilePlus, FolderPlus]
    : mode === "agent-tools"
      ? [Search, MessageSquareDashed, MessageSquarePlus]
      : mode === "canvas-tools"
        ? [Undo2, Redo2, Palette, EllipsisVertical]
        : recordTools
  const titleTools = mode === "full" ? recordTools : compactTools
  const toolLabel = lang === "en" ? "NoteGen tool" : "NoteGen 工具"

  return (
    <header
      data-notegen-replica="title-bar"
      className={cn(
        "relative flex h-9 items-center border-b bg-background",
        mode === "full" ? "pl-[72px]" : "pl-2",
        className
      )}
    >
      {mode === "full" ? (
        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
      ) : null}

      {mode !== "full" ? <div className="flex shrink-0 items-center gap-0.5 px-2">
        {titleTools.map((Icon, index) => (
          <NoteGenReplicaIconButton key={index} icon={Icon} label={toolLabel} />
        ))}
      </div> : null}

      {mode === "full" ? (
        <>
          <div className="flex-1" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-md border bg-background p-0.5 shadow-xs">
            {recordTools.map((Icon, index) => <NoteGenReplicaIconButton key={index} icon={Icon} active={index === 0} label={toolLabel} className="size-7" />)}
          </div>
          <div className="flex shrink-0 items-center gap-0.5 px-2">
            <NoteGenReplicaIconButton icon={PanelLeft} label={lang === "en" ? "Left sidebar" : "左侧栏"} />
            <NoteGenReplicaIconButton icon={PanelRight} label={lang === "en" ? "Right sidebar" : "右侧栏"} />
            <NoteGenReplicaIconButton icon={Pin} label={lang === "en" ? "Pin window" : "窗口置顶"} />
            <NoteGenReplicaIconButton
              icon={Settings}
              active={view === "settings"}
              label={view === "settings"
                ? (lang === "en" ? "Settings open" : "设置已打开")
                : (lang === "en" ? "Settings" : "设置")}
              onClick={() => onViewChange?.(view === "settings" ? "workspace" : "settings")}
            />
            <span className="relative ml-1 flex size-7 items-center justify-center rounded-md border text-[8px] text-muted-foreground">AI<span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-emerald-500 ring-1 ring-background" /></span>
          </div>
        </>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
    </header>
  )
}
