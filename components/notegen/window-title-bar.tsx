"use client"

import type { ReactNode } from "react"
import { Cog, EllipsisVertical, FilePlus, FolderPlus, MessageSquareDashed, MessageSquarePlus, Palette, PanelLeft, PanelRight, Pin, PinOff, Redo2, Search, Settings, SquarePen, Undo2 } from "lucide-react"

import { NoteGenCaptureToolbar, NoteGenWindowControls, type NoteGenCaptureTool, type NoteGenReplicaPlatform } from "@/components/notegen/chrome-controls"
import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage, NoteGenReplicaView } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenTitleBarMode = "full" | "record-tools" | "writing-tools" | "agent-tools" | "canvas-tools"
export type NoteGenReplicaPanelVisibility = { left: boolean; center: boolean; right: boolean }
export type NoteGenTitleBarProps = {
  lang: NoteGenReplicaLanguage
  mode?: NoteGenTitleBarMode
  platform?: NoteGenReplicaPlatform
  view?: NoteGenReplicaView
  onViewChange?: (view: NoteGenReplicaView) => void
  panels?: NoteGenReplicaPanelVisibility
  onPanelToggle?: (panel: keyof NoteGenReplicaPanelVisibility) => void
  pinned?: boolean
  onPinnedChange?: (pinned: boolean) => void
  showShortcutHints?: boolean
  hasUpdate?: boolean
  onCaptureToolClick?: (tool: NoteGenCaptureTool) => void
  leftSlot?: ReactNode
  centerSlot?: ReactNode
  rightSlot?: ReactNode
  className?: string
}

export function NoteGenWindowTitleBar({
  lang, mode = "full", platform = "mac", view = "workspace", onViewChange,
  panels = { left: true, center: true, right: true }, onPanelToggle,
  pinned = false, onPinnedChange, showShortcutHints = false, hasUpdate = false, onCaptureToolClick,
  leftSlot, centerSlot, rightSlot, className,
}: NoteGenTitleBarProps) {
  const en = lang === "en"
  const compactTools = mode === "writing-tools"
    ? [{ icon: Undo2, cn: "撤销", en: "Undo" }, { icon: Redo2, cn: "重做", en: "Redo" }, { icon: FilePlus, cn: "新建文件", en: "New file" }, { icon: FolderPlus, cn: "新建文件夹", en: "New folder" }]
    : mode === "agent-tools"
      ? [{ icon: Search, cn: "搜索对话", en: "Search conversations" }, { icon: MessageSquareDashed, cn: "临时对话", en: "Temporary conversation" }, { icon: MessageSquarePlus, cn: "新建对话", en: "New conversation" }]
      : [{ icon: Undo2, cn: "撤销", en: "Undo" }, { icon: Redo2, cn: "重做", en: "Redo" }, { icon: Palette, cn: "画布外观", en: "Canvas appearance" }, { icon: EllipsisVertical, cn: "更多操作", en: "More actions" }]
  const visibleCount = Number(panels.left) + Number(panels.center) + Number(panels.right)

  return (
    <header data-notegen-replica="title-bar" data-platform={platform} className={cn("relative flex h-9 shrink-0 flex-nowrap items-center border-b bg-background", mode === "full" && platform === "mac" && "pl-[70px]", className)}>
      {mode === "full" && platform === "mac" ? <NoteGenWindowControls className="absolute left-0 top-0 h-full" /> : null}
      {mode === "full" || mode === "record-tools" ? <NoteGenCaptureToolbar showShortcutHints={showShortcutHints} lang={lang} onToolClick={onCaptureToolClick} /> : (
        <div className="flex shrink-0 items-center gap-0.5 px-2">
          {compactTools.map(({ icon, cn: cnLabel, en: enLabel }) => <NoteGenReplicaIconButton key={cnLabel} icon={icon} label={en ? enLabel : cnLabel} disabled className="disabled:cursor-default disabled:opacity-100" />)}
        </div>
      )}
      {mode === "full" ? <>
        {leftSlot ? <div className="flex max-w-[min(20vw,240px)] shrink-0 items-center gap-1 overflow-hidden">{leftSlot}</div> : null}
        <div className="flex min-w-0 flex-1 items-center justify-center self-stretch px-2">{centerSlot}</div>
        <div className="flex shrink-0 items-center gap-0.5 px-2">
          {rightSlot}
          {([
            { id: "left", icon: PanelLeft, cn: "左侧栏", en: "left sidebar" },
            { id: "center", icon: SquarePen, cn: "中间面板", en: "center panel" },
            { id: "right", icon: PanelRight, cn: "右侧栏", en: "right sidebar" },
          ] as const).map(({ id, icon, cn: cnLabel, en: enLabel }) => {
            const blocked = panels[id] && (visibleCount === 1 || (visibleCount === 2 && panels.left && id !== "left"))
            const label = en ? `${panels[id] ? "Hide" : "Show"} ${enLabel}` : `${panels[id] ? "隐藏" : "显示"}${cnLabel}`
            return <NoteGenReplicaIconButton key={id} icon={icon} label={label} title={label} aria-pressed={panels[id]} disabled={!onPanelToggle || blocked} onClick={() => onPanelToggle?.(id)} className={cn("disabled:cursor-default", !onPanelToggle ? "disabled:opacity-100" : "disabled:opacity-50", !panels[id] && "[&>svg]:opacity-30")} />
          })}
          <NoteGenReplicaIconButton icon={pinned ? Pin : PinOff} label={en ? (pinned ? "Unpin window" : "Pin window") : (pinned ? "取消置顶" : "窗口置顶")} active={pinned} disabled={!onPinnedChange} onClick={() => onPinnedChange?.(!pinned)} className="disabled:cursor-default disabled:opacity-100" />
          <span className="relative">
            <NoteGenReplicaIconButton icon={view === "settings" ? Cog : Settings} active={view === "settings"} label={en ? (view === "settings" ? "Back to workspace" : "Settings") : (view === "settings" ? "返回工作区" : "设置")} disabled={!onViewChange} onClick={() => onViewChange?.(view === "settings" ? "workspace" : "settings")} className="disabled:cursor-default disabled:opacity-100" />
            {hasUpdate && view !== "settings" ? <span className="pointer-events-none absolute right-1 top-1 size-2 rounded-full bg-destructive" /> : null}
          </span>
        </div>
        {platform !== "mac" ? <NoteGenWindowControls platform={platform} /> : null}
      </> : <div className="flex-1" aria-hidden="true" />}
    </header>
  )
}
