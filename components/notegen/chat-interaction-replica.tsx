"use client"

import { useId, useRef, useState, type ReactNode } from "react"
import { ToggleGroup } from "radix-ui"
import { AlertTriangle, ArrowRight, Check, CheckCircle2, ChevronDown, ChevronRight, ShieldAlert, XCircle } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Badge } from "./model-settings/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./model-settings/ui/card"
import { Field, FieldGroup } from "./model-settings/ui/field"
import type { NoteGenReplicaLanguage } from "./types"
import { noteGenChatCss } from "./chat-replica-style"
import { cn } from "@/lib/utils"

export type NoteGenApprovalState = "pending" | "approved" | "cancelled" | "expired"
export type NoteGenApprovalField = { label: string; value: string; format?: "text" | "content" | "json" }
export type NoteGenApprovalProps = {
  lang?: NoteGenReplicaLanguage
  title?: string
  summary?: string
  fields?: NoteGenApprovalField[]
  warnings?: { message: string; paths?: string[] }[]
  state?: NoteGenApprovalState
  readOnly?: boolean
  embedded?: boolean
  canApproveForSession?: boolean
  confirmLabel?: string
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onDecision?: (decision: "once" | "conversation" | "cancel") => void
  onStateChange?: (state: NoteGenApprovalState) => void
  children?: ReactNode
}

/** Host-authored display data only. Approval never changes the workspace. */
export function NoteGenApprovalPanel({ lang = "cn", title, summary, fields = [], warnings = [], state, readOnly = false, embedded = true, canApproveForSession = false, confirmLabel, expanded, onExpandedChange, onDecision, onStateChange, children }: NoteGenApprovalProps) {
  const en = lang === "en"
  const decided = useRef(false)
  const [localState, setLocalState] = useState<NoteGenApprovalState>("pending")
  const [localExpanded, setLocalExpanded] = useState(false)
  const current = state ?? localState
  const open = expanded ?? localExpanded
  const locked = readOnly || current !== "pending"
  const decide = (decision: "once" | "conversation" | "cancel") => {
    if (locked || decided.current) return
    decided.current = true
    const next = decision === "cancel" ? "cancelled" : "approved"
    if (state === undefined) setLocalState(next)
    onDecision?.(decision)
    onStateChange?.(next)
  }
  const toggle = () => { if (expanded === undefined) setLocalExpanded(!open); onExpandedChange?.(!open) }
  return <Card size="sm" data-notegen-replica="approval" data-approval-state={current} className="ng-chat-surface w-full min-w-0 ring-inset">
    <style>{noteGenChatCss}</style>
    <CardHeader className="flex min-w-0 flex-wrap items-center gap-2">
      <div className="min-w-0 flex-1 basis-40"><CardTitle className="flex items-center gap-2">{!embedded && <ShieldAlert className="size-4 shrink-0" />}<span className="min-w-0 break-words">{title ?? (en ? "Operation pending" : "即将执行操作")}</span></CardTitle><CardDescription className="line-clamp-2 break-all" title={summary}>{summary}</CardDescription></div>
      <div className="flex flex-wrap items-center gap-1">
        {(fields.length > 0 || children) && <Button type="button" variant="ghost" size="sm" aria-expanded={open} onClick={toggle}>{en ? "Parameters" : "参数"}{open ? <ChevronDown data-icon="inline-end" /> : <ChevronRight data-icon="inline-end" />}</Button>}
        {!locked ? <><Button type="button" variant="ghost" size="sm" data-chat-approval-action="cancel" onClick={() => decide("cancel")}><XCircle data-icon="inline-start" />{en ? "Cancel" : "取消"}</Button>{canApproveForSession && <Button type="button" variant="secondary" size="sm" data-chat-approval-action="conversation" onClick={() => decide("conversation")}>{en ? "Allow for this conversation" : "本次会话允许"}</Button>}<Button type="button" size="sm" data-chat-approval-action="confirm" onClick={() => decide("once")}><CheckCircle2 data-icon="inline-start" />{confirmLabel ?? (en ? "Confirm" : "确认")}</Button></> : null}
      </div>
    </CardHeader>
    {warnings.length > 0 && <CardContent><div role="note" className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"><AlertTriangle className="size-4 shrink-0" /><div className="flex min-w-0 flex-col gap-2">{warnings.map((warning, i) => <div key={i}><p>{warning.message}</p>{warning.paths?.length ? <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all">{warning.paths.join("\n")}</pre> : null}</div>)}</div></div></CardContent>}
    {open && <CardContent><FieldGroup className="gap-3">{fields.map((field, i) => <Field key={i} orientation="responsive" className="min-w-0 items-start"><div className="min-w-0 shrink-0 text-sm font-medium">{field.label}</div><div className="min-w-0 flex-1 text-sm">{field.format && field.format !== "text" ? <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words">{field.value}</pre> : <p className="whitespace-pre-wrap break-words">{field.value}</p>}</div></Field>)}{children}</FieldGroup></CardContent>}
  </Card>
}

export type NoteGenQuestion = { id: string; question: string; multiSelect?: boolean; options: { label: string; description?: string }[] }
export type NoteGenQuestionState = "pending" | "submitted" | "cancelled" | "expired"
export type NoteGenQuestionAnswers = Record<string, string[]>
export type NoteGenQuestionProps = {
  lang?: NoteGenReplicaLanguage
  questions: NoteGenQuestion[]
  answers?: NoteGenQuestionAnswers
  defaultAnswers?: NoteGenQuestionAnswers
  questionIndex?: number
  state?: NoteGenQuestionState
  readOnly?: boolean
  disabled?: boolean
  embedded?: boolean
  onAnswersChange?: (answers: NoteGenQuestionAnswers) => void
  onQuestionIndexChange?: (index: number) => void
  onSubmit?: (answers: NoteGenQuestionAnswers) => void
  onCancel?: () => void
  onStateChange?: (state: NoteGenQuestionState) => void
}

/** Single choices advance immediately; multiple choices require an explicit completion. */
export function NoteGenQuestionPanel({ lang = "cn", questions, answers, defaultAnswers = {}, questionIndex, state, readOnly = false, disabled = false, embedded = true, onAnswersChange, onQuestionIndexChange, onSubmit, onCancel, onStateChange }: NoteGenQuestionProps) {
  const en = lang === "en"
  const id = useId()
  const [localAnswers, setLocalAnswers] = useState<NoteGenQuestionAnswers>(defaultAnswers)
  const [index, setIndex] = useState(0)
  const [localState, setLocalState] = useState<NoteGenQuestionState>("pending")
  const settled = useRef(false)
  const current = state ?? localState
  const values = answers ?? localAnswers
  const activeIndex = questionIndex ?? index
  const history = readOnly || current !== "pending"
  const locked = disabled || history
  const finish = (next: NoteGenQuestionState, nextAnswers = values) => {
    if (locked || settled.current) return
    settled.current = true
    if (state === undefined) setLocalState(next)
    onStateChange?.(next)
    if (next === "submitted") onSubmit?.(nextAnswers)
    else onCancel?.()
  }
  const advance = (next: NoteGenQuestionAnswers) => {
    if (locked || !(next[questions[activeIndex]?.id] ?? []).length) return
    if (activeIndex + 1 < questions.length) { if (questionIndex === undefined) setIndex(activeIndex + 1); onQuestionIndexChange?.(activeIndex + 1) }
    else finish("submitted", next)
  }
  const select = (question: NoteGenQuestion, selected: string[]) => {
    if (locked || settled.current || !selected.length || selected.some(label => !question.options.some(option => option.label === label))) return
    const next = { ...values, [question.id]: selected }
    if (answers === undefined) setLocalAnswers(next)
    onAnswersChange?.(next)
    if (!question.multiSelect) advance(next)
  }
  return <FieldGroup className="ng-chat-surface" data-notegen-replica="questions" data-question-state={current} onKeyDown={event => {
    if (event.key === "Escape" && !history) { event.preventDefault(); event.stopPropagation(); finish("cancelled") }
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && questions[activeIndex]?.multiSelect) { event.preventDefault(); advance(values) }
  }}>
    <style>{noteGenChatCss}</style>
    {(history ? questions : questions.slice(activeIndex, activeIndex + 1)).map(question => {
      const selected = values[question.id] ?? []
      const optionNodes = question.options.map((option, i) => {
        const content = <><Badge variant="outline" aria-hidden="true">{i + 1}</Badge><span className="flex min-w-0 flex-1 flex-col gap-1 break-words"><span>{option.label}</span>{option.description && <span className="font-normal text-muted-foreground">{option.description}</span>}</span>{selected.includes(option.label) && (history || question.multiSelect) && <Check className="size-4" />}</>
        return history ? <div key={option.label} data-selected={selected.includes(option.label)} className="flex min-w-0 items-start gap-3 py-1">{content}</div> : <ToggleGroup.Item key={option.label} value={option.label} data-skill-choice={option.label} className="flex min-h-11 w-full items-start justify-start gap-3 whitespace-normal rounded-lg border px-3 py-3 text-left text-sm font-medium hover:bg-muted data-[state=on]:bg-muted focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50">{content}</ToggleGroup.Item>
      })
      const labelId = `${id}-${question.id}`
      return <Card key={question.id} size="sm" className={cn("w-full min-w-0 ring-inset", !embedded && "mb-2")}><CardHeader><div className="flex flex-wrap gap-2">{questions.length > 1 && <Badge variant="outline">{questions.indexOf(question) + 1}/{questions.length}</Badge>}<Badge variant="secondary">{question.multiSelect ? (en ? "Multiple choice" : "多选") : (en ? "Single choice" : "单选")}</Badge>{history && <Badge variant="outline">{selected.length ? (en ? "Submitted" : "已提交") : current === "cancelled" ? (en ? "Cancelled" : "已取消") : current === "expired" ? (en ? "Expired" : "已失效") : (en ? "Unanswered" : "未作答")}</Badge>}</div><CardTitle id={labelId} className="break-words" aria-live="polite">{question.question}</CardTitle></CardHeader><CardContent className="max-h-[45dvh] overflow-y-auto"><FieldGroup>
        {history ? <FieldGroup aria-labelledby={labelId}>{optionNodes}</FieldGroup> : question.multiSelect ? <ToggleGroup.Root type="multiple" orientation="vertical" value={selected} onValueChange={next => { if (next.length) select(question, next); else { const value = { ...values, [question.id]: [] }; if (answers === undefined) setLocalAnswers(value); onAnswersChange?.(value) } }} disabled={locked} aria-labelledby={labelId} className="flex w-full flex-col gap-2">{optionNodes}</ToggleGroup.Root> : <ToggleGroup.Root type="single" orientation="vertical" value={selected[0] ?? ""} onValueChange={next => { if (next) select(question, [next]) }} disabled={locked} aria-labelledby={labelId} className="flex w-full flex-col gap-2">{optionNodes}</ToggleGroup.Root>}
        {!history && <div className="flex flex-wrap justify-end gap-2"><Button type="button" variant="ghost" size="sm" disabled={locked} onClick={() => finish("cancelled")}>{en ? "Cancel" : "取消"}</Button>{question.multiSelect && <Button type="button" size="sm" disabled={locked || !selected.length} onClick={() => advance(values)}><ArrowRight data-icon="inline-start" />{en ? "Complete selection" : "完成选择"}</Button>}</div>}
      </FieldGroup></CardContent></Card>
    })}
    {!questions.length && <p className="text-sm text-muted-foreground">{en ? "No questions" : "暂无问题"}</p>}
  </FieldGroup>
}
