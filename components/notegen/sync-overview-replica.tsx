"use client"

import { useState } from "react"
import { ArrowDownToLine, ArrowUpFromLine, CloudCheck, Ellipsis, FileText, HardDrive, RefreshCw, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NoteGenReplicaLanguage } from "./types"
import type { NoteGenSyncIndicatorState } from "./app-shell-replica"

export type NoteGenDocumentSyncFixture = {
  path: string
  provider: string
  phase?: "idle" | "checking" | "syncing" | "conflict" | "update-available" | "error"
}

/** Anchored inside the replica; all actions are supplied display callbacks. */
export function NoteGenSyncOverview({ lang, state, currentDocument, recentActivity, onConfigure, onClose, onDocumentAction }: {
  lang: NoteGenReplicaLanguage
  state: NoteGenSyncIndicatorState
  currentDocument?: NoteGenDocumentSyncFixture
  recentActivity?: string
  onConfigure?: () => void
  onClose?: () => void
  onDocumentAction?: (action: "sync" | "upload" | "download") => void
}) {
  const en = lang === "en"
  const local = state === "local"
  const busy = state === "not-configured" || state === "unavailable" || state === "checking" || state === "syncing" || currentDocument?.phase === "checking" || currentDocument?.phase === "syncing"
  const labels = { local: ["仅本地存储", "Local storage only"], "not-configured": ["未配置同步", "Sync not configured"], unavailable: ["同步服务不可用", "Sync service unavailable"], checking: ["正在检查同步连接", "Checking sync connection"], ready: ["同步已就绪", "Sync ready"], syncing: ["正在同步", "Syncing"], failed: ["同步失败", "Sync failed"], synced: ["已同步", "Synced"] }
  const act = (action: "sync" | "upload" | "download") => { onDocumentAction?.(action); onClose?.() }
  return <section aria-label={en ? "Sync overview" : "同步概览"} data-notegen-replica="sync-overview" className="absolute bottom-full left-2 mb-2 flex max-h-[min(480px,65cqh)] w-[352px] max-w-[calc(100%-16px)] flex-col gap-4 overflow-y-auto overscroll-contain rounded-xl border bg-popover p-4 text-sm text-popover-foreground shadow-lg">
    <header className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">{local ? <HardDrive className="size-5" /> : <CloudCheck className="size-5" />}</span><div className="min-w-0 flex-1"><strong className="block font-medium" role="status">{labels[state][en ? 1 : 0]}</strong>{currentDocument && !local ? <p className="mt-1 text-xs text-muted-foreground">{currentDocument.provider} · {en ? "Auto sync enabled" : "自动同步已开启"}</p> : null}</div><button type="button" onClick={onConfigure} aria-label={en ? "Sync settings" : "同步设置"} className="rounded p-1 hover:bg-muted"><Settings2 className="size-4" /></button></header>
    {local ? <p className="text-muted-foreground">{en ? "Data is stored on this device. Configure sync to keep it across devices." : "数据仅保存在当前设备，配置同步后可在多个设备间同步。"}</p> : null}
    {state === "failed" || state === "unavailable" ? <p role="status" className="rounded-md border border-destructive/30 p-3 text-destructive">{en ? "Sync failed. Check your connection and sync configuration." : "同步失败，请检查连接与同步配置。"}</p> : null}
    {currentDocument && !local ? <NoteGenDocumentSyncCard lang={lang} document={currentDocument} disabled={busy} onAction={act} /> : null}
    <p className="text-xs text-muted-foreground">{recentActivity ?? (en ? "No sync activity" : "暂无同步记录")}</p>
    {local || state === "not-configured" ? <Button variant="outline" size="sm" onClick={onConfigure}>{en ? "Configure sync" : "配置同步"}</Button> : null}
  </section>
}


export function NoteGenDocumentSyncCard({ lang = "cn", document, disabled = false, menuOpen: controlledMenu, onMenuOpenChange, onAction, className }: {
  lang?: NoteGenReplicaLanguage
  document: NoteGenDocumentSyncFixture
  disabled?: boolean
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  onAction?: (action: "sync" | "upload" | "download") => void
  className?: string
}) {
  const en = lang === "en"
  const [localMenu, setLocalMenu] = useState(false)
  const menuOpen = controlledMenu ?? localMenu
  const setMenuOpen = (open: boolean) => { if (controlledMenu === undefined) setLocalMenu(open); onMenuOpenChange?.(open) }
  const busy = disabled || document.phase === "checking" || document.phase === "syncing"
  const act = (action: "sync" | "upload" | "download") => { setMenuOpen(false); onAction?.(action) }
  return <div data-release-document-sync-panel role="region" aria-label={en ? "Current document" : "当前文档"} className={cn("flex min-w-0 flex-col gap-3 rounded-lg bg-muted/50 p-3 text-sm", className)}>
      <header className="flex min-w-0 items-center gap-3"><FileText className="size-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><p className="text-xs text-muted-foreground">{en ? "Current document" : "当前文档"}</p><p className="truncate font-medium" title={document.path}>{document.path.split("/").pop()}</p></div></header>
      {document.phase && document.phase !== "idle" ? <span className="text-xs text-muted-foreground">{({ checking: en ? "Checking" : "检查中", syncing: en ? "Syncing" : "同步中", conflict: en ? "Conflict" : "存在冲突", "update-available": en ? "Remote update available" : "远端有更新", error: en ? "Sync failed" : "同步失败" })[document.phase]}</span> : null}
      <footer className="relative flex gap-2"><Button data-release-document-sync-action="sync" size="sm" className="min-w-0 flex-1" disabled={busy} onClick={() => act("sync")}><RefreshCw data-release-document-sync-loader={document.phase === "syncing" || undefined} data-icon="inline-start" />{document.phase === "conflict" ? (en ? "Resolve conflict" : "处理冲突") : (en ? "Sync current document" : "同步当前文档")}</Button><Button data-release-document-sync-action="more" size="sm" variant="outline" disabled={busy} aria-label={en ? "More document actions" : "更多文档操作"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Ellipsis /></Button>
      {menuOpen ? <div data-release-document-sync-menu className="absolute bottom-full right-0 mb-1 flex w-56 max-w-full flex-col rounded-lg border bg-popover p-1 shadow-md" aria-label={en ? "Document sync actions" : "文档同步操作"}><Button data-release-document-sync-action="upload" variant="ghost" size="sm" className="justify-start" disabled={busy} onClick={() => act("upload")}><ArrowUpFromLine data-icon="inline-start" />{en ? "Upload current content" : "上传当前内容"}</Button><Button data-release-document-sync-action="download" variant="ghost" size="sm" className="justify-start" disabled={busy} onClick={() => act("download")}><ArrowDownToLine data-icon="inline-start" />{en ? "Get remote version" : "获取远端版本"}</Button></div> : null}
      </footer>
    </div>
}
