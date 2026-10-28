"use client"

import { useState, type ReactNode } from "react"
import { AlertTriangle, ChevronDown, ChevronRight, FileText, Globe2, Layers, Loader2, MessageCircle, Play, ShieldAlert, Sparkles, Square, Terminal } from "lucide-react"
import { Badge } from "./model-settings/ui/badge"
import { Button } from "./model-settings/ui/button"
import { Separator } from "@/components/ui/separator"
import { NoteGenApprovalPanel, NoteGenQuestionPanel, type NoteGenApprovalProps, type NoteGenQuestionProps } from "./chat-interaction-replica"
import type { NoteGenReplicaLanguage } from "./types"
import { noteGenChatCss } from "./chat-replica-style"
import { cn } from "@/lib/utils"

export type NoteGenTraceEvent = {
  id: string
  kind: "tool" | "thought" | "message" | "approval" | "question" | "error"
  title: string
  status?: "pending" | "running" | "done" | "error" | "stopped"
  tool?: "search" | "file" | "terminal" | "skill"
  summary?: string
  input?: string
  output?: string
  duration?: string
  tokens?: number
  content?: ReactNode
  approval?: NoteGenApprovalProps
  question?: NoteGenQuestionProps
}
export type NoteGenTimelineProps = {
  lang?: NoteGenReplicaLanguage
  events?: NoteGenTraceEvent[]
  status?: "running" | "waiting" | "done" | "error" | "stopped"
  label?: string
  hasFinalResponse?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  expandedEvents?: Record<string, boolean>
  expandedGroups?: Record<string, boolean>
  onExpandedEventsChange?: (value: Record<string, boolean>) => void
  onExpandedGroupsChange?: (value: Record<string, boolean>) => void
  onResume?: () => void
  onInteraction?: (eventId: string, state: string) => void
  context?: ReactNode
  loadingRotation?: number
}

const icons = { search: Globe2, file: FileText, terminal: Terminal, skill: Sparkles }
export function NoteGenTraceSpinner({ rotation }: { rotation?: number }) {
  return <Loader2 data-chat-loading className={cn("ng-chat-spinner ng-skill-loading size-4 shrink-0", rotation === undefined && "motion-safe:animate-spin")} style={rotation === undefined ? undefined : { transform: `rotate(${rotation}deg)`, animation: "none" }} />
}

export function noteGenTraceFixture(lang: NoteGenReplicaLanguage): NoteGenTraceEvent[] {
  const en = lang === "en"
  return [
    { id: "search", kind: "tool", tool: "search", title: en ? "Search workspace" : "搜索工作区", status: "done", duration: "0.8s", input: en ? "Design principles" : "设计原则", output: en ? "Found 3 relevant notes." : "找到 3 篇相关笔记。" },
    { id: "read", kind: "tool", tool: "file", title: en ? "Read document" : "读取文档", status: "done", duration: "0.4s", input: "notes/product/design.md", output: en ? "Read the document content." : "已读取文档内容。" },
    { id: "summary", kind: "message", title: en ? "Prepare the summary" : "整理要点", status: "done", content: en ? "The notes share three principles: low interruption, progressive structure, and visible context." : "这些笔记包含三个共同原则：低打扰、渐进式结构和始终可见的上下文。" },
  ]
}

/** Deterministic traces, with completed tools grouped and active host interactions kept inline. */
export function NoteGenExecutionTimeline({ lang = "cn", events: supplied, status: suppliedStatus, label, hasFinalResponse = true, open, defaultOpen, onOpenChange, expandedEvents, expandedGroups, onExpandedEventsChange, onExpandedGroupsChange, onResume, onInteraction, context, loadingRotation }: NoteGenTimelineProps) {
  const en = lang === "en"
  const sourceEvents = supplied ?? noteGenTraceFixture(lang)
  const [localOpen, setLocalOpen] = useState(defaultOpen ?? !hasFinalResponse)
  const [localEvents, setLocalEvents] = useState<Record<string, boolean>>({})
  const [localGroups, setLocalGroups] = useState<Record<string, boolean>>({})
  const [resolved, setResolved] = useState<Record<string, { source: NoteGenTraceEvent; next: NoteGenTraceEvent }>>({})
  const events = sourceEvents.map(event => resolved[event.id]?.source === event ? resolved[event.id].next : event)
  const pending = events.some(event => (event.kind === "approval" || event.kind === "question") && (event.status === "pending" || event.status === "running"))
  const status = suppliedStatus ?? (pending ? "waiting" : events.some(event => event.status === "running") ? "running" : events.some(event => event.status === "error") ? "error" : "done")
  const processOpen = pending || (open ?? localOpen)
  const expanded = expandedEvents ?? localEvents
  const groups = expandedGroups ?? localGroups
  const setEvent = (id: string, value: boolean) => { const next = { ...expanded, [id]: value }; if (!expandedEvents) setLocalEvents(next); onExpandedEventsChange?.(next) }
  const setGroup = (id: string, value: boolean) => { const next = { ...groups, [id]: value }; if (!expandedGroups) setLocalGroups(next); onExpandedGroupsChange?.(next) }
  const finish = (event: NoteGenTraceEvent, state: string, question?: NoteGenQuestionProps) => {
    setResolved(current => ({ ...current, [event.id]: { source: sourceEvents.find(item => item.id === event.id) ?? event, next: { ...event, status: state === "cancelled" ? "error" : "done", approval: event.approval ? { ...event.approval, state: state === "approved" ? "approved" : "cancelled", readOnly: true } : undefined, question: question ? { ...question, state: state === "submitted" ? "submitted" : "cancelled", readOnly: true } : event.question } } }))
    onInteraction?.(event.id, state)
  }
  const labels = { running: en ? "Processing…" : "处理中…", waiting: en ? "Waiting for your response" : "等待你的回应", done: en ? "Processed" : "已处理", error: en ? "Execution failed" : "执行失败", stopped: en ? "Stopped" : "已停止" }
  const renderEvent = (event: NoteGenTraceEvent) => {
    const active = event.status === "running" || event.status === "pending"
    const host = event.kind === "approval" || event.kind === "question"
    const forceOpen = active && (host || event.kind === "thought")
    const details = Boolean(host || event.summary || event.input || event.output || event.content)
    const isOpen = forceOpen || expanded[event.id] === true
    const Icon = event.kind === "approval" ? ShieldAlert : event.kind === "question" ? MessageCircle : event.kind === "error" || event.status === "error" ? AlertTriangle : event.tool ? icons[event.tool] : Sparkles
    const interactionState = event.approval?.state ?? event.question?.state
    const badge = host ? active ? (en ? "Waiting" : "等待处理") : interactionState === "approved" ? (en ? "Confirmed" : "已确认") : interactionState === "submitted" ? (en ? "Submitted" : "已提交") : interactionState === "expired" ? (en ? "Expired" : "已失效") : interactionState === "cancelled" || event.status === "error" ? (en ? "Cancelled" : "已取消") : (en ? "Expired" : "已失效") : undefined
    return <div key={event.id} role="listitem" data-chat-trace-event={event.id} className="min-w-0 text-sm">
      {event.kind === "message" && event.content ? <div className="py-1 leading-6">{event.content}</div> : <button type="button" className="flex min-h-6 w-full items-center gap-2 py-0.5 text-left text-muted-foreground hover:text-foreground" aria-expanded={details ? isOpen : undefined} onClick={() => { if (details && !forceOpen) setEvent(event.id, !isOpen) }}>
        {active ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Icon className="size-4 shrink-0" />}<span data-chat-tool-running={active && !host && event.kind === "tool" && loadingRotation === undefined} className="min-w-0 flex-1 truncate" title={event.title}>{event.title}</span>{badge && <Badge variant="secondary">{badge}</Badge>}{event.duration && <span className="shrink-0 text-xs tabular-nums">{event.duration}</span>}{event.tokens ? <span className="text-xs">· {event.tokens} tokens</span> : null}{details && !forceOpen && (isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />)}
      </button>}
      {isOpen && event.kind !== "message" && <div className="mt-2 min-w-0 pb-2">
        {host && event.content ? event.content : event.kind === "approval" ? <NoteGenApprovalPanel {...event.approval} lang={lang} readOnly={!active || event.approval?.readOnly} embedded onStateChange={state => { event.approval?.onStateChange?.(state); finish(event, state) }} /> : event.kind === "question" && event.question ? <NoteGenQuestionPanel {...event.question} lang={lang} readOnly={!active || event.question.readOnly} embedded onSubmit={answers => { event.question?.onSubmit?.(answers); finish(event, "submitted", { ...event.question!, answers }) }} onCancel={() => { event.question?.onCancel?.(); finish(event, "cancelled", event.question) }} /> : <div className="flex min-w-0 flex-col gap-2 text-xs">{event.summary && <><strong className="font-medium text-muted-foreground">{en ? "Summary" : "结果摘要"}</strong><p className="rounded bg-muted/60 p-2 whitespace-pre-wrap break-words">{event.summary}</p></>}{event.input && <><strong className="font-medium text-muted-foreground">{en ? "Parameters" : "查询参数"}</strong><pre className="max-h-48 overflow-auto rounded bg-muted/60 p-2 whitespace-pre-wrap break-words">{event.input}</pre></>}{event.output && <><strong className="font-medium text-muted-foreground">{en ? "Tool result" : "工具结果"}</strong><pre className="max-h-48 overflow-auto rounded bg-muted/60 p-2 whitespace-pre-wrap break-words">{event.output}</pre></>}{event.content}</div>}
      </div>}
    </div>
  }
  const segments: { id: string; grouped: boolean; events: NoteGenTraceEvent[] }[] = []
  events.forEach(event => {
    const groupable = event.kind === "tool" && event.status !== "running" && event.status !== "pending"
    const last = segments.at(-1)
    if (groupable && last?.grouped) last.events.push(event)
    else segments.push({ id: event.id, grouped: groupable, events: [event] })
  })
  return <div data-notegen-replica="execution-timeline" className="ng-chat-surface flex min-w-0 flex-col gap-2 text-sm">
    <style>{noteGenChatCss}</style>
    <style>{`@keyframes ng-chat-shimmer{from{background-position:100% 50%}to{background-position:-100% 50%}}@media(prefers-reduced-motion:no-preference){@supports(background-clip:text){[data-chat-tool-running="true"]{background-image:linear-gradient(110deg,var(--color-muted-foreground) 40%,var(--color-foreground) 50%,var(--color-muted-foreground) 60%);background-size:250% 100%;background-clip:text;color:transparent;animation:ng-chat-shimmer 2.4s ease-in-out infinite}}}@media(forced-colors:active){[data-chat-tool-running="true"]{animation:none;background-image:none;color:CanvasText}}`}</style>
    <button type="button" className="flex min-h-6 w-full items-center gap-2 py-0.5 text-left text-muted-foreground hover:text-foreground" aria-expanded={processOpen} onClick={() => { if (!pending) { if (open === undefined) setLocalOpen(!processOpen); onOpenChange?.(!processOpen) } }}><span className="min-w-0 flex-1 truncate">{label ?? labels[status]}</span>{processOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}</button><Separator />
    {processOpen && <div className="flex min-w-0 flex-col gap-2">{context}<div role="list" className="flex min-w-0 flex-col gap-2">{segments.map(segment => segment.grouped && segment.events.length > 1 ? <div key={segment.id} role="listitem"><button type="button" aria-expanded={groups[segment.id] ?? false} className="flex min-h-6 w-full items-center gap-2 text-left text-muted-foreground hover:text-foreground" onClick={() => setGroup(segment.id, !groups[segment.id])}><Layers className="size-4 shrink-0" /><span className="min-w-0 flex-1 truncate">{[...new Set(segment.events.map(event => event.title))].join(" · ")}</span><span className="shrink-0 text-xs">{en ? `${segment.events.length} tools` : `${segment.events.length} 个工具`}</span>{groups[segment.id] ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}</button>{groups[segment.id] && <div role="list" className="mt-1 flex flex-col gap-1 pl-2">{segment.events.map(renderEvent)}</div>}</div> : renderEvent(segment.events[0]))}</div>{status !== "done" && <div role="status" className="flex items-center gap-2 py-1.5 text-muted-foreground">{status === "running" ? <NoteGenTraceSpinner rotation={loadingRotation} /> : status === "error" ? <AlertTriangle className="size-4" /> : status === "stopped" ? <Square className="size-4" /> : <MessageCircle className="size-4" />}{labels[status]}</div>}</div>}
    {status === "stopped" && <Button type="button" variant="outline" size="sm" className="w-fit" disabled={!onResume} onClick={onResume}><Play data-icon="inline-start" />{en ? "Continue" : "继续执行"}</Button>}
  </div>
}

export function NoteGenToolCall({ type = "search", lang = "cn", status = "done" }: { type?: "search" | "file" | "terminal"; lang?: NoteGenReplicaLanguage; status?: "running" | "done" }) {
  const event = noteGenTraceFixture(lang)[type === "file" ? 1 : 0]
  return <NoteGenExecutionTimeline lang={lang} events={[{ ...event, id: type, tool: type, status, ...(type === "terminal" ? { title: lang === "en" ? "Run tool" : "运行工具", input: "python prepare.py", output: lang === "en" ? "Prepared the document." : "已准备文档。" } : {}) }]} status={status === "running" ? "running" : "done"} defaultOpen />
}
