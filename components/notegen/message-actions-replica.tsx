"use client"

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react"
import { Check, CheckCircle, Clock3, Copy, FileText, Globe2, Highlighter, SquarePen, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { NoteGenReplicaActionMenu } from "./replica-action-menu"
import { NoteGenReplicaDialog } from "./replica-dialog"
import { NoteGenChatPopover } from "./chat-overlay"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { cn } from "@/lib/utils"
import type { NoteGenReplicaLanguage } from "./types"

const MessageVisibility = createContext(false)

export type NoteGenMessageActionsProps = {
  lang?: NoteGenReplicaLanguage
  last?: boolean
  visible?: boolean
  role?: "assistant" | "system" | "user"
  platform?: "desktop" | "mobile"
  messageType?: "chat" | "clipboard" | "other"
  content?: string
  time?: string
  dateTime?: string
  timeFormat?: "relative" | "time"
  relativeTime?: string
  summary?: string
  summaryOpen?: boolean
  copied?: boolean
  translation?: string
  translating?: boolean
  reading?: "idle" | "loading" | "playing"
  loadingRotation?: number
  extra?: "record" | "convert"
  recorded?: boolean
  children?: ReactNode
  translationMenuOpen?: boolean
  generating?: boolean
  onAction?: (action: "copy" | "translate" | "read" | "delete") => void
  onExtraAction?: (action: "record" | "convert") => void
  onTranslate?: (language: string) => string | Promise<string>
  onTranslationChange?: (text: string) => void
  onError?: (error: unknown) => void
}

/** Source visibility uses the parent assistant-message group; no clipboard, AI or audio access. */
export function NoteGenAgentMessageActions({ lang = "cn", last = true, visible, role = "assistant", platform = "desktop", messageType = "chat", content = "demo", time = "10:28", dateTime = "2026-10-27T10:28:00+08:00", timeFormat = "relative", relativeTime, summary, summaryOpen = false, copied, translation, translating = false, reading, loadingRotation, extra, recorded = false, children, translationMenuOpen = false, generating = false, onAction, onExtraAction, onTranslate, onTranslationChange, onError }: NoteGenMessageActionsProps) {
  const en = lang === "en"
  const mobile = platform === "mobile"
  const mobileVisible = useContext(MessageVisibility)
  const alwaysVisible = visible ?? (role === "user" || last)
  const [localCopied, setLocalCopied] = useState(false)
  const [localTranslation, setLocalTranslation] = useState("")
  const [localTranslating, setLocalTranslating] = useState(false)
  const [localReading, setLocalReading] = useState(false)
  const [localRecorded, setLocalRecorded] = useState(false)
  const [showSummary, setShowSummary] = useState(summaryOpen)
  const [result, setResult] = useState("")
  const summaryAnchor = useRef<HTMLSpanElement>(null)
  const summaryOwner = useId()
  useEffect(() => {
    if (!showSummary) return
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setShowSummary(false) }
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || summaryAnchor.current?.contains(event.target)) return
      if (event.target.closest('[data-chat-owner]')?.getAttribute('data-chat-owner') === summaryOwner) return
      setShowSummary(false)
    }
    document.addEventListener("keydown", close)
    document.addEventListener("pointerdown", outside)
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside) }
  }, [showSummary, summaryOwner])
  const translated = translation ?? localTranslation
  const copying = copied ?? localCopied
  const busyTranslation = translating || localTranslating
  const playback = reading ?? (localReading ? "playing" : "idle")
  const report = (action: "copy" | "translate" | "read" | "delete") => { setResult(action); onAction?.(action) }
  const translate = async (language: string) => {
    if (busyTranslation) return
    report("translate")
    if (!onTranslate) return
    setLocalTranslating(true)
    try { const text = await onTranslate(language); setLocalTranslation(text); onTranslationChange?.(text) }
    catch (error) { onError?.(error) }
    finally { setLocalTranslating(false) }
  }
  if (generating) return null
  return <>
    <div data-notegen-replica="message-actions" inert={mobile && !alwaysVisible && !mobileVisible ? true : undefined} className={cn("mt-2 flex min-h-6 flex-wrap items-center justify-between gap-1 transition-opacity motion-reduce:transition-none", !alwaysVisible && "pointer-events-none opacity-0 group-data-[actions-visible=true]/assistant-message:pointer-events-auto group-data-[actions-visible=true]/assistant-message:opacity-100", !alwaysVisible && !mobile && "group-hover/assistant-message:pointer-events-auto group-hover/assistant-message:opacity-100 group-focus-within/assistant-message:pointer-events-auto group-focus-within/assistant-message:opacity-100")}>
      <div className="flex min-w-0 items-center gap-1">
        {timeFormat === "time" ? <time dateTime={dateTime} title={dateTime} className="text-xs tabular-nums text-muted-foreground">{time}</time> : <div className="-translate-x-3"><Button variant="ghost" size="sm" disabled><Clock3 className="hidden size-4 md:inline" />{relativeTime ?? (en ? "a minute ago" : "1 分钟前")}</Button></div>}
        {summary && <span ref={summaryAnchor} data-chat-owner={summaryOwner} className="relative inline-flex"><Button variant="ghost" size="sm" onClick={() => setShowSummary(!showSummary)} aria-expanded={showSummary} className="gap-1 px-2 text-xs font-normal text-muted-foreground"><FileText />{en ? "Summary" : "摘要"}</Button>{showSummary && !mobile && <NoteGenChatPopover anchor={summaryAnchor} owner={summaryOwner} label={en ? "Summary" : "摘要"} width={320}><p className="whitespace-pre-wrap px-4 pb-4 text-xs">{summary}</p></NoteGenChatPopover>}</span>}
      </div>
      <div className="ml-auto flex items-center gap-0.5 text-muted-foreground [&_svg]:size-3.5">
        {children}
        {extra && <Button variant="ghost" size="icon-xs" disabled={extra === "record" && (recorded || localRecorded)} title={extra === "convert" ? (en ? "Convert to note" : "转换为笔记") : recorded || localRecorded ? (en ? "Recorded" : "已记录") : (en ? "Record" : "记录")} aria-label={extra === "convert" ? (en ? "Convert to note" : "转换为笔记") : (en ? "Record" : "记录")} onClick={() => { onExtraAction?.(extra); if (extra === "record") setLocalRecorded(true) }}>{extra === "convert" ? <SquarePen /> : recorded || localRecorded ? <CheckCircle /> : <Highlighter />}</Button>}
        {messageType === "chat" && Boolean(content) && <>
          <Button variant="ghost" size="icon-xs" aria-label={copying ? (en ? "Copied" : "已复制") : (en ? "Copy" : "复制")} title={en ? "Copy" : "复制"} disabled={copying} onClick={() => { report("copy"); setLocalCopied(true) }}>{copying ? <Check /> : <Copy />}</Button>
          <NoteGenReplicaActionMenu title={en ? "Translate" : "翻译"} mobile={mobile} disabled={busyTranslation} defaultOpen={translationMenuOpen} trigger={<span className="flex size-6 items-center justify-center rounded-md hover:bg-muted">{busyTranslation ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Globe2 />}</span>} items={translated ? [{ id: "original", label: en ? "Show original" : "显示原文", onSelect: () => { setLocalTranslation(""); onTranslationChange?.(""); report("translate") } }] : ["English", "中文", "日本語", "한국어", "Français", "Deutsch", "Español", "Русский"].map(language => ({ id: language, label: language, onSelect: () => void translate(language) }))} />
        </>}
        {messageType === "chat" && <Button variant="ghost" size="icon-xs" aria-label={playback === "loading" ? (en ? "Loading" : "加载中") : playback === "playing" ? (en ? "Stop" : "停止") : (en ? "Read aloud" : "朗读")} title={playback === "playing" ? (en ? "Stop" : "停止") : (en ? "Read aloud" : "朗读")} disabled={playback === "loading"} onClick={() => { if (!content && playback !== "playing") return; setLocalReading(!localReading); report("read") }}>{playback === "loading" ? <NoteGenTraceSpinner rotation={loadingRotation} /> : playback === "playing" ? <VolumeX /> : <Volume2 />}</Button>}
        <Button variant="ghost" size="icon-xs" aria-label={en ? "Delete" : "删除"} title={en ? "Delete" : "删除"} onClick={() => report("delete")}><X /></Button>
      </div>
      <span className="sr-only" aria-live="polite">{result}</span>
    </div>
    {translated && <div className="mt-2 whitespace-pre-wrap border-t border-border pt-2">{translated}</div>}
    {summary && mobile && <NoteGenReplicaDialog open={showSummary} onClose={() => setShowSummary(false)} title={en ? "Summary" : "摘要"} mobile><p data-chat-owner={summaryOwner} className="whitespace-pre-wrap text-xs">{summary}</p></NoteGenReplicaDialog>}
  </>
}

export function NoteGenAssistantMessage({ children, platform = "desktop", actionsVisible, defaultActionsVisible = false, onActionsVisibleChange, className }: { children: ReactNode; platform?: "desktop" | "mobile"; actionsVisible?: boolean; defaultActionsVisible?: boolean; onActionsVisibleChange?: (value: boolean) => void; className?: string }) {
  const [local, setLocal] = useState(defaultActionsVisible)
  const shown = actionsVisible ?? local
  return <MessageVisibility.Provider value={shown}><div className={cn("group/assistant-message relative min-w-0", className)} data-actions-visible={platform === "mobile" && shown} onClick={event => {
    if (platform !== "mobile" || !(event.target instanceof Element) || event.target.closest('button,a,input,textarea,select,[role="button"]') || window.getSelection()?.isCollapsed === false) return
    if (actionsVisible === undefined) setLocal(!shown)
    onActionsVisibleChange?.(!shown)
  }}>{children}</div></MessageVisibility.Provider>
}
