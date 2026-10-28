"use client"

import { useRef, useState } from "react"
import { AlertCircle, CheckCircle2, Download } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { noteGenChatCss } from "./chat-replica-style"
import type { NoteGenArtifactState, NoteGenResponseFeedback } from "./chat-response-types"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenArtifactLinkProps = {
  path: string
  label?: string
  lang?: NoteGenReplicaLanguage
  state?: NoteGenArtifactState
  partial?: boolean
  platform?: "desktop" | "mobile"
  available?: boolean
  recognized?: boolean
  loadingRotation?: number
  onAction?: (action: "open" | "save", path: string) => void | Promise<void>
  onFeedback?: (feedback: NoteGenResponseFeedback) => void
}

/** Inline Markdown-style generated-file link. Never resolves or opens a real path. */
export function NoteGenArtifactLink({ path, label, lang = "cn", state, partial = false, platform = "desktop", available = true, recognized = true, loadingRotation, onAction, onFeedback }: NoteGenArtifactLinkProps) {
  const en = lang === "en"
  const [localPending, setLocalPending] = useState<NoteGenArtifactState>("idle")
  const busyRef = useRef(false)
  const current = state ?? localPending
  const name = path.split(/[\\/]/).pop() || path
  const mobile = platform === "mobile"
  const busy = current !== "idle"
  const desktopHint = en ? "Open or save generated files in the desktop app." : "请在桌面端打开或另存生成的文件。"
  const unavailableHint = en ? "The file was moved or deleted." : "文件已被移动或删除。"
  const title = mobile ? desktopHint : !available ? unavailableHint : partial ? (en ? "This file was generated during an incomplete run. Its contents are unverified." : "这是执行未完成时生成的文件，内容尚未验证。") : (en ? `Open ${name}` : `打开 ${name}`)
  const act = async (action: "open" | "save") => {
    if (mobile || !available || busy || busyRef.current) return
    // Callers own the simulated result; no synthetic success when no callback exists.
    if (!onAction) return
    busyRef.current = true
    if (state === undefined) setLocalPending(action === "open" ? "opening" : "saving")
    try { await onAction(action, path) }
    catch { onFeedback?.({ kind: "error", title: action === "open" ? (en ? "Unable to open file" : "无法打开文件") : (en ? "Unable to save file" : "另存文件失败"), description: en ? "Action failed. Confirm the file still exists, then try again." : "操作失败，请确认文件仍存在后重试。" }) }
    finally { busyRef.current = false; if (state === undefined) setLocalPending("idle") }
  }
  if (!recognized) return <>{label || name}</>
  return <span data-notegen-replica="artifact-link" data-artifact-state={current} className="ng-chat-surface inline-flex max-w-full items-baseline gap-1 align-baseline">
    <style>{noteGenChatCss}</style>
    <a href="#notegen-generated-file" className="min-w-0 break-words text-primary underline underline-offset-4" aria-label={en ? `Open ${name}` : `打开 ${name}`} aria-disabled={mobile || busy || !available} aria-busy={current === "opening"} title={title} onClick={event => { event.preventDefault(); event.stopPropagation(); void act("open") }}>{label || name}</a>
    <Button type="button" variant="ghost" size="icon-xs" disabled={mobile || busy || !available} aria-label={en ? `Save as ${name}` : `另存为 ${name}`} title={mobile ? desktopHint : !available ? unavailableHint : (en ? `Save as ${name}` : `另存为 ${name}`)} onClick={event => { event.preventDefault(); event.stopPropagation(); void act("save") }}>{current === "saving" ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Download />}</Button>
  </span>
}

/** Caller-controlled host toast fixture; place inside the replica window. */
export function NoteGenResponseFeedbackNotice({ feedback }: { feedback: NoteGenResponseFeedback }) {
  return <div data-notegen-replica="response-feedback" role={feedback.kind === "error" ? "alert" : "status"} className="flex max-w-sm items-start gap-2 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">{feedback.kind === "error" ? <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}<div className="min-w-0"><p className="font-medium">{feedback.title}</p>{feedback.description && <p className="mt-1 break-words text-xs text-muted-foreground">{feedback.description}</p>}</div></div>
}
