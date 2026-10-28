"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { Bot, ChevronDown, ChevronUp, ChevronsUpDown, Code2, Copy, Download, Eye, FolderOpen, Grid3X3, List, Magnet, Maximize2, History, Sparkles, WandSparkles, ZoomOut } from "lucide-react"

import type { NoteGenReplicaPlatform } from "@/components/notegen/chrome-controls"
import { NoteGenReplicaFrame } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { NoteGenWindowTitleBar, type NoteGenTitleBarProps } from "@/components/notegen/window-title-bar"
import type { NoteGenWorkspace } from "@/components/notegen/workspace-switcher"
import { cn } from "@/lib/utils"
import { NoteGenSyncOverview, type NoteGenDocumentSyncFixture } from "./sync-overview-replica"

// Preserve the original public imports while sharing one implementation.
export { NoteGenCaptureToolbar, NoteGenWindowControls } from "@/components/notegen/chrome-controls"
export type { NoteGenCaptureTool, NoteGenReplicaPlatform } from "@/components/notegen/chrome-controls"

export function NoteGenAppTitleBar({ lang = "cn", ...props }: Omit<NoteGenTitleBarProps, "lang"> & { lang?: NoteGenReplicaLanguage }) {
  return <NoteGenWindowTitleBar lang={lang} {...props} />
}

export function NoteGenPanelHandle({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  return <div aria-hidden="true" className={cn("shrink-0 bg-border/70", orientation === "vertical" ? "w-px" : "h-px")} />
}

export type NoteGenSyncIndicatorState = "local" | "not-configured" | "unavailable" | "checking" | "ready" | "syncing" | "failed" | "synced"

const syncLabels: Record<NoteGenSyncIndicatorState, { cn: string; en: string }> = {
  local: { cn: "仅本地存储", en: "Local storage only" },
  "not-configured": { cn: "未配置同步", en: "Sync not configured" },
  unavailable: { cn: "同步服务不可用", en: "Sync service unavailable" },
  checking: { cn: "正在检查同步连接", en: "Checking sync connection" },
  ready: { cn: "同步已就绪", en: "Sync ready" },
  syncing: { cn: "正在同步", en: "Syncing" },
  failed: { cn: "同步失败", en: "Sync failed" },
  synced: { cn: "已同步", en: "Synced" },
}

export function NoteGenUnifiedSyncIndicator({ lang = "cn", state = "local", recentActivity }: {
  lang?: NoteGenReplicaLanguage
  state?: NoteGenSyncIndicatorState
  recentActivity?: string
}) {
  const label = syncLabels[state][lang === "en" ? "en" : "cn"]
  const description = `${lang === "en" ? "Sync status" : "同步状态"}：${label}。${recentActivity ?? (lang === "en" ? "No sync activity" : "暂无同步记录")}`
  const syncColors = {
    "--notegen-sync-ready": "var(--color-emerald-500, #10b981)",
    "--notegen-sync-busy": "hsl(38 92% 50%)",
  } as CSSProperties
  return (
    <span role="status" aria-label={description} title={description} data-sync-state={state} style={syncColors} className="inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-sm px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <span aria-hidden="true" style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: state === "local" || state === "not-configured" ? "color-mix(in srgb, var(--color-muted-foreground, #a1a1aa) 50%, transparent)" : state === "unavailable" || state === "failed" ? "var(--color-destructive, #ef4444)" : state === "checking" || state === "syncing" ? "var(--notegen-sync-busy)" : "var(--notegen-sync-ready)" }} className={cn("size-2 rounded-full", state === "local" || state === "not-configured" ? "bg-muted-foreground/50" : state === "unavailable" || state === "failed" ? "bg-destructive" : state === "checking" || state === "syncing" ? "bg-[var(--notegen-sync-busy)]" : "bg-[var(--notegen-sync-ready)]")} />
      <span>{label}</span><ChevronUp className="size-3" aria-hidden="true" />
    </span>
  )
}

function StatusItem({ icon: Icon, label, endIcon: EndIcon, onClick, active }: { icon: typeof Bot; label: string; endIcon?: typeof Bot; onClick?: () => void; active?: boolean }) {
  const Tag = onClick ? "button" : "span"
  return (
    <Tag title={label} onClick={onClick} aria-pressed={onClick ? active : undefined} className="inline-flex h-6 min-w-0 shrink-0 items-center gap-1 px-1.5">
      <Icon className="size-3 shrink-0" />
      <span className="truncate">{label}</span>
      {EndIcon ? <EndIcon className="size-3 shrink-0 opacity-50" /> : null}
    </Tag>
  )
}

export type NoteGenMainStatusBarProps = {
  lang?: NoteGenReplicaLanguage
  workspace?: NoteGenWorkspace
  workspaceName?: string
  syncState?: NoteGenSyncIndicatorState
  recentSyncActivity?: string
  pluginSlot?: ReactNode
  characterCount?: number
  modelLabel?: string
  modelControl?: ReactNode
  canvasControls?: ReactNode
  promptLabel?: string
  currentDocument?: NoteGenDocumentSyncFixture
  syncPopoverOpen?: boolean
  onSyncPopoverOpenChange?: (open: boolean) => void
  onConfigureSync?: () => void
  onDocumentSyncAction?: (action: "sync" | "upload" | "download") => void
  showSyncHistory?: boolean
  showOutlineToggle?: boolean
  outlineOpen?: boolean
  onToggleOutline?: () => void
  className?: string
}

export function NoteGenMainStatusBar({
  lang = "cn", workspace = "writing", workspaceName, syncState = "local",
  recentSyncActivity, pluginSlot, characterCount = 862, modelLabel = "GPT-5", modelControl, canvasControls, promptLabel, currentDocument, syncPopoverOpen, onSyncPopoverOpenChange, onConfigureSync, onDocumentSyncAction,
  showSyncHistory = false, showOutlineToggle = true, outlineOpen = false, onToggleOutline, className,
}: NoteGenMainStatusBarProps) {
  const en = lang === "en"
  const [localSyncOpen, setLocalSyncOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const syncOpen = syncPopoverOpen ?? localSyncOpen
  const setSyncOpen = (open: boolean) => { if (syncPopoverOpen === undefined) setLocalSyncOpen(open); onSyncPopoverOpenChange?.(open) }
  useEffect(() => {
    if (!syncOpen) return
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) setSyncOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setSyncOpen(false) }
    document.addEventListener("pointerdown", outside)
    document.addEventListener("keydown", escape)
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape) }
  }, [syncOpen, syncPopoverOpen, onSyncPopoverOpenChange])
  return (
    <div ref={root} className="relative shrink-0" data-notegen-replica="status-bar-container">
    {syncOpen ? <NoteGenSyncOverview lang={lang} state={syncState} currentDocument={currentDocument} recentActivity={recentSyncActivity} onClose={() => setSyncOpen(false)} onConfigure={() => { setSyncOpen(false); onConfigureSync?.() }} onDocumentAction={onDocumentSyncAction} /> : null}
    <footer data-notegen-replica="status-bar" className={cn("flex h-7 min-h-7 shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden border-t bg-background px-2 text-xs text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      <button type="button" aria-expanded={syncOpen} aria-label={en ? "Sync overview" : "同步概览"} onClick={() => setSyncOpen(!syncOpen)} className="shrink-0 rounded hover:bg-muted"><NoteGenUnifiedSyncIndicator lang={lang} state={syncState} recentActivity={recentSyncActivity} /></button>
      <StatusItem icon={FolderOpen} label={workspaceName ?? (en ? "Local workspace" : "本地工作区")} endIcon={ChevronsUpDown} />
      <span className="min-w-2 flex-1" aria-hidden="true" />
      {workspace === "writing" ? <div className="flex shrink-0 items-center gap-0.5">
        <StatusItem icon={Eye} label={en ? "Visual" : "所见即所得"} />
        <StatusItem icon={Copy} label={en ? "Copy" : "复制"} />
        <StatusItem icon={Download} label={en ? "Export" : "导出"} />
        {showOutlineToggle ? <StatusItem icon={List} label={en ? "Outline" : "大纲"} active={outlineOpen} onClick={onToggleOutline} /> : null}
      </div> : workspace === "canvas" ? canvasControls ?? <div className="flex shrink-0 items-center gap-0.5">
        <StatusItem icon={Grid3X3} label={en ? "Grid" : "网格"} />
        <StatusItem icon={Magnet} label={en ? "Snap" : "吸附"} />
        <StatusItem icon={WandSparkles} label={en ? "Layout" : "布局"} />
        <StatusItem icon={Code2} label={en ? "Import" : "导入"} />
        <StatusItem icon={ZoomOut} label="100%" />
        <StatusItem icon={Maximize2} label={en ? "Fit canvas" : "适应画布"} />
      </div> : null}
      {pluginSlot ? <div data-notegen-replica="status-plugins" className="flex shrink-0 items-center gap-1">{pluginSlot}</div> : null}
      {workspace === "writing" ? <span className="px-1">T {characterCount} {en ? "characters" : "字符"}</span> : null}
      {workspace === "writing" && showSyncHistory ? <StatusItem icon={History} label={en ? "History" : "历史版本"} /> : null}
      <span className="min-w-2 flex-1" aria-hidden="true" />
      {modelControl ?? <StatusItem icon={Bot} label={modelLabel} endIcon={ChevronDown} />}
      <StatusItem icon={Sparkles} label={promptLabel ?? (en ? "Default" : "默认提示词")} endIcon={ChevronDown} />
    </footer>
    </div>
  )
}

export function NoteGenAppShell({ children, lang = "cn", platform = "mac", workspace = "writing", className, titleBarProps, statusBarProps }: {
  children: ReactNode
  lang?: NoteGenReplicaLanguage
  platform?: NoteGenReplicaPlatform
  workspace?: NoteGenWorkspace
  className?: string
  titleBarProps?: Omit<NoteGenTitleBarProps, "lang" | "platform">
  statusBarProps?: Omit<NoteGenMainStatusBarProps, "lang" | "workspace">
}) {
  return (
    <NoteGenReplicaFrame fill className={cn("flex min-h-0 flex-col", className)}>
      <NoteGenAppTitleBar lang={lang} platform={platform} {...titleBarProps} />
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <NoteGenMainStatusBar lang={lang} workspace={workspace} {...statusBarProps} />
    </NoteGenReplicaFrame>
  )
}
