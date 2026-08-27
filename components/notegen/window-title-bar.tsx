"use client"

import {
  CalendarDays,
  CheckSquare,
  Cloud,
  CopySlash,
  EllipsisVertical,
  FilePlus,
  FolderPlus,
  ImagePlus,
  Languages,
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
  SquarePen,
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

      <div className="flex shrink-0 items-center gap-0.5 px-2">
        {titleTools.map((Icon, index) => (
          <NoteGenReplicaIconButton key={index} icon={Icon} label={toolLabel} />
        ))}
      </div>

      {mode === "full" ? (
        <>
          <div className="mx-auto flex h-6 w-[34%] min-w-44 max-w-md items-center justify-center gap-2 rounded-sm border text-[10px] text-muted-foreground">
            <Search className="size-3.5" strokeWidth={1.7} />
            <span className="truncate">
              {lang === "en" ? "Search notes, records, and canvases" : "搜索笔记、记录和画布"}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 px-2">
            <NoteGenReplicaIconButton icon={PanelLeft} label={lang === "en" ? "Left sidebar" : "左侧栏"} />
            <NoteGenReplicaIconButton icon={SquarePen} label={lang === "en" ? "New note" : "新建笔记"} />
            <NoteGenReplicaIconButton icon={PanelRight} label={lang === "en" ? "Right sidebar" : "右侧栏"} />
            <NoteGenReplicaIconButton icon={CalendarDays} label={lang === "en" ? "Calendar" : "日历"} />
            <NoteGenReplicaIconButton icon={Cloud} label={lang === "en" ? "Sync" : "同步"} />
            <NoteGenReplicaIconButton icon={Pin} label={lang === "en" ? "Pin window" : "窗口置顶"} />
            <NoteGenReplicaIconButton
              icon={view === "settings" ? SquarePen : Settings}
              active={view === "settings"}
              label={view === "settings"
                ? (lang === "en" ? "Back to workspace" : "返回工作区")
                : (lang === "en" ? "Settings" : "设置")}
              onClick={() => onViewChange?.(view === "settings" ? "workspace" : "settings")}
            />
          </div>
        </>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
    </header>
  )
}
