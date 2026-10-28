"use client"

import type { ReactNode } from "react"
import { ChevronDown, FileText, MessageSquareDashed, MessageSquarePlus, ToolCase } from "lucide-react"
import type { NoteGenReplicaLanguage } from "./types"
import { cn } from "@/lib/utils"
import { Button } from "./model-settings/ui/button"
import { NoteGenAgentComposer, type NoteGenComposerProps } from "./chat-composer-replica"
import { NoteGenExecutionTimeline, type NoteGenTimelineProps } from "./chat-timeline-replica"
import { NoteGenApprovalPanel, type NoteGenApprovalProps } from "./chat-interaction-replica"
import { NoteGenAgentMessageActions, NoteGenAssistantMessage, type NoteGenMessageActionsProps } from "./message-actions-replica"
export { NoteGenAgentMessageActions, NoteGenAssistantMessage } from "./message-actions-replica"
export type { NoteGenMessageActionsProps } from "./message-actions-replica"
import { NoteGenChatResponse, type NoteGenChatResponseProps } from "./chat-response-replica"

export { NoteGenAgentComposer } from "./chat-composer-replica"
export { NoteGenExecutionTimeline, NoteGenToolCall } from "./chat-timeline-replica"

export function NoteGenAgentHeader({ lang = "cn", title, count = 0 }: { lang?: NoteGenReplicaLanguage; title?: string; count?: number }) {
  return <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 text-sm"><div className="flex min-w-0 items-center gap-1.5 font-medium"><span className="max-w-40 truncate">{title ?? (lang === "en" ? "Conversation history" : "历史对话")}</span><span className="text-xs font-normal text-muted-foreground">({count})</span><ChevronDown className="size-4 shrink-0 text-muted-foreground" /></div><div className="flex gap-1 text-muted-foreground"><Button type="button" variant="ghost" size="icon" aria-label={lang === "en" ? "Temporary conversation" : "临时对话"}><MessageSquareDashed /></Button><Button type="button" variant="ghost" size="icon" aria-label={lang === "en" ? "New conversation" : "新建对话"}><MessageSquarePlus /></Button></div></header>
}

export function NoteGenAgentMessage({ role, children, time = "10:28" }: { role: "user" | "assistant"; children: ReactNode; time?: string }) {
  return <div className={cn("group/assistant-message flex min-w-0 flex-col gap-1", role === "user" && "items-end")}><div className={cn("min-w-0 text-sm leading-6", role === "user" ? "max-w-[85%] rounded-lg border bg-muted/35 px-3 py-2" : "w-full")}>{children}</div><span className="text-xs text-muted-foreground">{time}</span></div>
}

export function NoteGenThinkingBlock({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <NoteGenExecutionTimeline lang={lang} defaultOpen expandedEvents={{ thinking: true }} events={[{ id: "thinking", kind: "thought", title: lang === "en" ? "Thinking" : "思考过程", status: "done", output: lang === "en" ? "Compare the notes, find repeated ideas, and keep the references." : "对比选中的笔记，识别重复观点，并保留原始引用。" }]} />
}

export function NoteGenAgentApproval({ lang = "cn", ...props }: NoteGenApprovalProps) {
  return <NoteGenApprovalPanel lang={lang} summary="notes/product/design.md" fields={[{ label: lang === "en" ? "File path" : "文件路径", value: "notes/product/design.md" }]} {...props} />
}

/** Retained compatibility export; model selection now lives in the shared tools panel. */
export function NoteGenAgentModelControl({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <span className="flex size-8 items-center justify-center text-muted-foreground" role="img" aria-label={lang === "en" ? "Tools" : "工具"}><ToolCase className="size-4" /></span>
}

export function NoteGenContextTray({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="flex items-center gap-1.5 p-1 text-xs text-muted-foreground"><FileText className="size-3.5" /><span>design.md</span><span>· {lang === "en" ? "Product notes" : "产品笔记"}</span></div>
}

export type NoteGenAgentPanelProps = {
  lang?: NoteGenReplicaLanguage
  className?: string
  title?: string
  count?: number
  question?: ReactNode
  answer?: ReactNode
  messageActions?: NoteGenMessageActionsProps
  response?: NoteGenChatResponseProps
  timeline?: NoteGenTimelineProps | false
  composer?: NoteGenComposerProps
}
export function NoteGenAgentPanel({ lang = "cn", className, title, count = 1, question, answer, response, timeline, composer, messageActions }: NoteGenAgentPanelProps) {
  return <aside data-notegen-chat-boundary className={cn("relative flex h-full min-h-0 min-w-0 flex-col bg-background text-sm", className)}>
    <NoteGenAgentHeader lang={lang} title={title} count={count} />
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
      <NoteGenAgentMessage role="user">{question ?? (lang === "en" ? "Turn these fragments into a short design note." : "把这些碎片整理成一篇简短的设计说明。")}</NoteGenAgentMessage>
      <NoteGenAssistantMessage platform={messageActions?.platform}>
        {timeline !== false && <NoteGenExecutionTimeline lang={lang} hasFinalResponse={response ? response.state !== "preview" && !response.streaming : undefined} {...timeline} />}
        <div className="mt-3 leading-6">{response ? <NoteGenChatResponse lang={lang} {...response} /> : answer ?? (lang === "en" ? "The notes share three principles: low interruption, progressive structure, and visible context." : "这些笔记包含三个共同原则：低打扰、渐进式结构和始终可见的上下文。")}</div>
        {(response ? response.state !== "preview" && !response.streaming : answer !== "") && <NoteGenAgentMessageActions lang={lang} extra="record" content={typeof answer === "string" ? answer : undefined} {...messageActions} />}
      </NoteGenAssistantMessage>
    </div>
    <NoteGenAgentComposer lang={lang} {...composer} />
  </aside>
}
