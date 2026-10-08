"use client"

import type { CSSProperties, ReactNode } from "react"
import { Bot, ChevronDown, ChevronsUpDown, Code2, Copy, Download, Eye, FolderOpen, Grid3X3, List, Magnet, Maximize2, Settings2, Sparkles, WandSparkles, ZoomOut } from "lucide-react"

import type { NoteGenReplicaPlatform } from "@/components/notegen/chrome-controls"
import { NoteGenReplicaFrame } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { NoteGenWindowTitleBar, type NoteGenTitleBarProps } from "@/components/notegen/window-title-bar"
import type { NoteGenWorkspace } from "@/components/notegen/workspace-switcher"
import { cn } from "@/lib/utils"

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
    <span role="status" tabIndex={0} aria-label={description} title={description} data-sync-state={state} style={{ ...syncColors, display: "inline-flex", width: 24, height: 24, flexShrink: 0, alignItems: "center", justifyContent: "center" }} className="flex size-6 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <span aria-hidden="true" style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: state === "local" || state === "not-configured" ? "color-mix(in srgb, var(--color-muted-foreground, #a1a1aa) 50%, transparent)" : state === "unavailable" || state === "failed" ? "var(--color-destructive, #ef4444)" : state === "checking" || state === "syncing" ? "var(--notegen-sync-busy)" : "var(--notegen-sync-ready)" }} className={cn("size-2 rounded-full", state === "local" || state === "not-configured" ? "bg-muted-foreground/50" : state === "unavailable" || state === "failed" ? "bg-destructive" : state === "checking" || state === "syncing" ? "bg-[var(--notegen-sync-busy)]" : "bg-[var(--notegen-sync-ready)]")} />
    </span>
  )
}

function StatusItem({ icon: Icon, label, endIcon: EndIcon }: { icon: typeof Bot; label: string; endIcon?: typeof Bot }) {
  return (
    <span title={label} className="inline-flex h-5 min-w-0 shrink-0 items-center gap-1 px-1.5">
      <Icon className="size-3 shrink-0" />
      <span className="truncate">{label}</span>
      {EndIcon ? <EndIcon className="size-3 shrink-0 opacity-50" /> : null}
    </span>
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
  promptLabel?: string
  className?: string
}

export function NoteGenMainStatusBar({
  lang = "cn", workspace = "writing", workspaceName, syncState = "local",
  recentSyncActivity, pluginSlot, characterCount = 862, modelLabel = "GPT-5", promptLabel, className,
}: NoteGenMainStatusBarProps) {
  const en = lang === "en"
  return (
    <footer data-notegen-replica="status-bar" className={cn("flex h-6 min-h-6 shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden border-t bg-background px-1 text-xs text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      <NoteGenUnifiedSyncIndicator lang={lang} state={syncState} recentActivity={recentSyncActivity} />
      <StatusItem icon={FolderOpen} label={workspaceName ?? (en ? "Local workspace" : "本地工作区")} endIcon={ChevronsUpDown} />
      {workspace === "writing" ? <div className="flex shrink-0 items-center gap-0.5">
        <StatusItem icon={Eye} label={en ? "Visual" : "所见即所得"} />
        <StatusItem icon={Copy} label={en ? "Copy" : "复制"} />
        <StatusItem icon={Download} label={en ? "Export" : "导出"} />
        <StatusItem icon={List} label={en ? "Outline" : "大纲"} />
      </div> : workspace === "canvas" ? <div className="flex shrink-0 items-center gap-0.5">
        <StatusItem icon={Grid3X3} label={en ? "Grid" : "网格"} />
        <StatusItem icon={Magnet} label={en ? "Snap" : "吸附"} />
        <StatusItem icon={WandSparkles} label={en ? "Layout" : "布局"} />
        <StatusItem icon={Code2} label={en ? "Import" : "导入"} />
        <StatusItem icon={ZoomOut} label="100%" />
        <StatusItem icon={Maximize2} label={en ? "Fit canvas" : "适应画布"} />
      </div> : null}
      <span className="min-w-2 flex-1" aria-hidden="true" />
      {pluginSlot ? <div data-notegen-replica="status-plugins" className="flex shrink-0 items-center gap-1">{pluginSlot}</div> : null}
      <span className="min-w-2 flex-1" aria-hidden="true" />
      {workspace === "writing" ? <span className="px-1">T {characterCount} {en ? "characters" : "字符"}</span> : null}
      <StatusItem icon={Settings2} label={en ? "Configure sync" : "配置同步"} />
      <StatusItem icon={Bot} label={modelLabel} endIcon={ChevronDown} />
      <StatusItem icon={Sparkles} label={promptLabel ?? (en ? "Default" : "默认提示词")} endIcon={ChevronDown} />
    </footer>
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
