"use client"

import { Component, createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { AlertTriangle, BookOpen, CheckCircle2, Clock3, Copy, Download, ExternalLink, FileText, Info } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Badge } from "./model-settings/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./model-settings/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./model-settings/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./model-settings/ui/accordion"
import { Progress } from "./model-settings/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "./model-settings/ui/alert"
import { Separator } from "@/components/ui/separator"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { noteGenChatCss } from "./chat-replica-style"
import { noteGenResponseCss } from "./chat-response-style"
import type { NoteGenReplicaLanguage } from "./types"
import type { NoteGenResponseAction, NoteGenResponseActionState, NoteGenResponseBlock, NoteGenResponseFeedback, NoteGenResponseTone } from "./chat-response-types"
import { cn } from "@/lib/utils"

export type NoteGenChatResponseProps = {
  lang?: NoteGenReplicaLanguage
  responseId?: string
  title?: string
  state?: "text" | "preview" | "complete" | "error"
  /** A fixed partial-text fixture; the caller owns subsequent chunks. */
  streaming?: boolean
  blocks?: NoteGenResponseBlock[]
  /** Prepared text/Markdown fixture. This renderer does not parse Markdown or model JSON. */
  fallback?: ReactNode
  contentScale?: number
  platform?: "desktop" | "mobile"
  loadingRotation?: number
  motion?: "interactive" | "timeline"
  actionStates?: Record<string, NoteGenResponseActionState>
  onAction?: (action: NoteGenResponseAction) => void | Promise<void>
  onFeedback?: (feedback: NoteGenResponseFeedback) => void
  tabs?: Record<string, string>
  onTabChange?: (id: string, value: string) => void
  accordions?: Record<string, string[]>
  onAccordionChange?: (id: string, value: string[]) => void
}

type ResponseContext = Pick<NoteGenChatResponseProps, "onAction" | "onFeedback" | "actionStates" | "loadingRotation" | "tabs" | "onTabChange" | "accordions" | "onAccordionChange"> & {
  lang: NoteGenReplicaLanguage
  preview: boolean
  platform: "desktop" | "mobile"
  motion: "interactive" | "timeline"
}
const ResponseContext = createContext<ResponseContext>({ lang: "cn", preview: false, platform: "desktop", motion: "interactive" })
const actionIcons = { copy: Copy, "open-note": FileText, "open-source": BookOpen, "open-artifact": ExternalLink, "save-artifact": Download }

/** Local callbacks only; no clipboard, note navigation, path resolution or download. */
export function NoteGenResponseActionButton({ action, variant = "outline" }: { action: NoteGenResponseAction; variant?: "outline" | "link" }) {
  const context = useContext(ResponseContext)
  const en = context.lang === "en"
  const busyRef = useRef(false)
  const [localPending, setLocalPending] = useState(false)
  const pending = context.actionStates?.[action.id] === "pending" || localPending
  const available = !context.preview && action.available !== false
  const perform = async () => {
    if (!available || pending || busyRef.current) return
    if (context.platform === "mobile" && (action.type === "open-artifact" || action.type === "save-artifact")) {
      context.onFeedback?.({ kind: "error", title: en ? "Action failed" : "操作失败", description: en ? "Open or save generated files in the desktop app." : "请在桌面端打开或另存生成的文件。" })
      return
    }
    if (!context.onAction) return
    busyRef.current = true
    setLocalPending(true)
    try { await context.onAction(action) }
    catch { context.onFeedback?.({ kind: "error", title: en ? "Action failed" : "操作失败", description: en ? "The content is unavailable or belongs to another workspace." : "内容已不可用，或不属于当前工作区。" }) }
    finally { busyRef.current = false; setLocalPending(false) }
  }
  const Icon = action.icon ?? actionIcons[action.type]
  return <Button type="button" variant={variant} size="sm" className="max-w-full" data-response-action={action.id} disabled={!available || pending} aria-busy={pending} title={context.preview ? (en ? "Available when generation is complete" : "生成完成后可操作") : !available ? (en ? "Content unavailable" : "内容已不可用，或不属于当前工作区。") : action.label} onClick={() => void perform()}>{pending ? <NoteGenTraceSpinner rotation={context.loadingRotation} /> : <Icon data-icon="inline-start" />}<span className="truncate">{action.label}</span></Button>
}

function ResponseBadge({ text, tone = "secondary", icon: Icon }: { text: string; tone?: NoteGenResponseTone; icon?: typeof Info }) {
  const variant = tone === "success" || tone === "warning" || tone === "info" ? "outline" : tone
  return <Badge variant={variant} data-response-tone={tone} className="max-w-full" title={text}>{Icon && <Icon />}<span className="truncate">{text}</span></Badge>
}

function ResponseTabsBlock({ block }: { block: Extract<NoteGenResponseBlock, { type: "tabs" }> }) {
  const context = useContext(ResponseContext)
  const [local, setLocal] = useState(block.items[Math.max(0, Math.min(block.items.length - 1, block.defaultIndex ?? 0))]?.id ?? "")
  if (!block.items.length) return null
  const selected = context.tabs?.[block.id] ?? local
  return <Tabs value={selected} onValueChange={value => { if (context.tabs?.[block.id] === undefined) setLocal(value); context.onTabChange?.(block.id, value) }}><div className="max-w-full overflow-x-auto"><TabsList>{block.items.map(({ id, title, icon: Icon }) => <TabsTrigger key={id} value={id}>{Icon && <Icon data-icon="inline-start" />}{title}</TabsTrigger>)}</TabsList></div>{block.items.map(item => <TabsContent key={item.id} value={item.id}><ResponseBlocks blocks={item.content} /></TabsContent>)}</Tabs>
}

function ResponseAccordionBlock({ block }: { block: Extract<NoteGenResponseBlock, { type: "accordion" }> }) {
  const context = useContext(ResponseContext)
  const [local, setLocal] = useState(block.defaultOpen ?? [])
  return <Accordion type="multiple" value={context.accordions?.[block.id] ?? local} onValueChange={value => { if (context.accordions?.[block.id] === undefined) setLocal(value); context.onAccordionChange?.(block.id, value) }}>{block.items.map(({ id, title, content, icon: Icon }) => <AccordionItem key={id} value={id}><AccordionTrigger><span className="flex min-w-0 items-center gap-2">{Icon && <Icon className="size-4" />}{title}</span></AccordionTrigger><AccordionContent animate={context.motion !== "timeline"}><ResponseBlocks blocks={content} /></AccordionContent></AccordionItem>)}</Accordion>
}

function ResponseBlock({ block }: { block: NoteGenResponseBlock }) {
  const context = useContext(ResponseContext)
  const en = context.lang === "en"
  switch (block.type) {
    case "text": return <p className="ng-response-text whitespace-pre-wrap break-words">{block.text}</p>
    case "content": return <div className="ng-response-text min-w-0" inert={context.preview ? true : undefined}>{block.content}</div>
    case "heading": {
      const Heading = block.level === 2 ? "h2" : block.level === 4 ? "h4" : "h3"
      const Icon = block.icon
      return <div className="flex min-w-0 items-center gap-2">{Icon && <Icon className="size-4 shrink-0" />}<Heading data-response-heading={block.level ?? 3} className="min-w-0 font-semibold">{block.text}</Heading></div>
    }
    case "list": {
      const List = block.ordered ? "ol" : "ul"
      return <List className={cn("ng-response-text flex min-w-0 flex-col gap-1 pl-6", block.ordered ? "list-decimal" : "list-disc")}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>
    }
    case "table": {
      if (block.rows.some(row => row.length !== block.columns.length)) throw new Error("Invalid response table")
      return <div className="max-w-full overflow-x-auto"><table className="ng-response-table w-full border-collapse text-left"><thead><tr>{block.columns.map((column, index) => <th key={index} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>
    }
    case "stack": return <div className={cn("flex min-w-0 flex-col", block.gap === "sm" ? "gap-2" : block.gap === "lg" ? "gap-6" : "gap-3")}><ResponseBlocks blocks={block.children} /></div>
    case "card": {
      const Icon = block.icon
      const title = block.title ? <div className="flex min-w-0 items-center gap-2">{Icon && <Icon className="size-4 shrink-0" />}<h3 data-response-heading="3" className="break-words font-semibold">{block.title}</h3></div> : null
      if (block.variant !== "outlined") return <section className="flex min-w-0 flex-col gap-3">{(block.title || block.description) && <header className="flex min-w-0 flex-col gap-1">{title}{block.description && <p className="ng-response-text text-muted-foreground">{block.description}</p>}</header>}<div className="flex min-w-0 flex-col gap-3"><ResponseBlocks blocks={block.children} /></div></section>
      return <Card size="sm" className="min-w-0">{(block.title || block.description) && <CardHeader>{title && <CardTitle>{title}</CardTitle>}{block.description && <CardDescription><p className="ng-response-text">{block.description}</p></CardDescription>}</CardHeader>}{block.children.length > 0 && <CardContent className="flex min-w-0 flex-col gap-3"><ResponseBlocks blocks={block.children} /></CardContent>}</Card>
    }
    case "stat": {
      const Icon = block.icon
      return <Card size="sm" className="min-w-0"><CardHeader><CardDescription className="flex items-center gap-2">{Icon && <Icon className="size-4" />}{block.label}</CardDescription></CardHeader><CardContent><p className="break-words text-2xl font-semibold">{block.value}</p>{block.description && <p className="mt-1 break-words text-sm text-muted-foreground">{block.description}</p>}</CardContent></Card>
    }
    case "badge": return <ResponseBadge text={block.text} tone={block.tone} icon={block.icon} />
    case "alert": return <Alert variant={block.tone ?? "default"} data-response-tone={block.tone ?? "default"}>{block.tone === "warning" || block.tone === "destructive" ? <AlertTriangle /> : <Info />}<AlertTitle>{block.title}</AlertTitle><AlertDescription className="flex min-w-0 flex-col gap-2">{block.description && <p className="whitespace-pre-wrap break-words">{block.description}</p>}{block.children && <ResponseBlocks blocks={block.children} />}</AlertDescription></Alert>
    case "key-value": return <section className="flex min-w-0 flex-col gap-2">{block.title && <h3 data-response-heading="3" className="font-semibold">{block.title}</h3>}<dl className="flex min-w-0 flex-col gap-2">{block.items.map(({ label, value, icon: Icon }, index) => <div key={index} className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start gap-3"><dt className="flex items-center gap-2 text-muted-foreground">{Icon && <Icon className="size-4" />}<span className="min-w-0 break-words">{label}</span></dt><dd className="whitespace-pre-wrap break-words">{value}</dd></div>)}</dl></section>
    case "steps": return <ol className="flex min-w-0 flex-col gap-4">{block.items.map(({ title, description, status, icon: Icon }, index) => <li key={index} className="flex min-w-0 items-start gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs">{Icon ? <Icon className="size-4" /> : status === "done" ? <CheckCircle2 className="size-4" /> : index + 1}</span><div className="flex min-w-0 flex-1 flex-col gap-1"><div className="flex flex-wrap items-center gap-2"><p className="break-words font-medium">{title}</p>{status && <ResponseBadge tone={status === "done" ? "success" : "secondary"} text={status === "done" ? (en ? "Done" : "已完成") : status === "current" ? (en ? "In progress" : "进行中") : (en ? "Pending" : "待进行")} />}</div>{description && <p className="ng-response-text">{description}</p>}</div></li>)}</ol>
    case "timeline": return <ol className="flex min-w-0 flex-col gap-4">{block.items.map(({ title, time, description, icon: Icon }, index) => <li key={index} className="flex min-w-0 items-start gap-3"><span className="mt-1 shrink-0">{Icon ? <Icon className="size-4" /> : <Clock3 className="size-4" />}</span><div className="flex min-w-0 flex-1 flex-col gap-1">{time && <p className="text-sm text-muted-foreground">{time}</p>}<p className="break-words font-medium">{title}</p>{description && <p className="ng-response-text">{description}</p>}</div></li>)}</ol>
    case "tabs": return <ResponseTabsBlock block={block} />
    case "accordion": return <ResponseAccordionBlock block={block} />
    case "progress": return <section className="flex min-w-0 flex-col gap-2"><div className="flex items-center justify-between gap-3"><p className="break-words">{block.label}</p><span className="text-sm tabular-nums text-muted-foreground">{block.value}%</span></div><Progress animate={context.motion !== "timeline"} value={Math.max(0, Math.min(100, block.value))} aria-label={block.label} />{block.description && <p className="text-sm text-muted-foreground">{block.description}</p>}</section>
    case "quote": return <blockquote className="flex min-w-0 flex-col gap-2 border-l-2 pl-4"><p className="whitespace-pre-wrap break-words">{block.text}</p>{block.attribution && <footer className="break-words text-sm text-muted-foreground">{block.attribution}</footer>}{block.source && <NoteGenResponseActionButton variant="link" action={{ id: `${block.id}-source`, type: "open-source", sourceKey: block.source.key, label: block.source.label, available: block.source.available }} />}</blockquote>
    case "sources": return <section className="flex min-w-0 flex-col gap-1">{block.title && <h3 className="break-words font-medium">{block.title}</h3>}<ul className="flex min-w-0 flex-col gap-1">{block.items.map(item => <li key={item.key}><NoteGenResponseActionButton variant="link" action={{ id: `${block.id}-${item.key}`, type: "open-source", sourceKey: item.key, label: item.label, available: item.available }} /></li>)}</ul></section>
    case "note-link": return <NoteGenResponseActionButton variant="link" action={{ id: block.id, type: "open-note", path: block.path, label: block.label || block.path.split(/[\\/]/).pop() || block.path, available: block.available }} />
    case "artifact": return <div className="flex flex-wrap items-center gap-2"><NoteGenResponseActionButton action={{ id: `${block.id}-open`, type: "open-artifact", path: block.path, label: block.label || block.path.split(/[\\/]/).pop() || block.path, available: block.available }} /><NoteGenResponseActionButton action={{ id: `${block.id}-save`, type: "save-artifact", path: block.path, label: en ? "Save file as" : "另存文件", available: block.available }} /></div>
    case "actions": return <div className="flex flex-wrap items-center gap-2">{block.actions.map(action => <NoteGenResponseActionButton key={action.id} action={action} />)}</div>
    case "code": return <div className="min-w-0">{block.title && <p className="mb-2 text-sm text-muted-foreground">{block.title}</p>}<div className="overflow-hidden rounded-lg border"><div className="flex items-center justify-between gap-2 bg-muted px-3 py-1 text-xs text-muted-foreground"><span>{block.language}</span><NoteGenResponseActionButton variant="link" action={{ id: `${block.id}-copy`, type: "copy", label: en ? "Copy" : "复制", text: block.code }} /></div><pre className="max-w-full overflow-x-auto p-3 text-sm"><code>{block.code}</code></pre></div></div>
    case "math": return <figure className="min-w-0">{block.label && <figcaption className="mb-2 text-sm text-muted-foreground">{block.label}</figcaption>}{block.failed ? <Alert variant="destructive"><AlertDescription>{en ? "Unable to parse formula. Original LaTeX shown." : "公式无法解析，已显示原始 LaTeX。"}<code className="whitespace-pre-wrap break-words">{block.latex}</code></AlertDescription></Alert> : block.rendered ? <div className="overflow-x-auto py-1">{block.rendered}</div> : <code className="whitespace-pre-wrap break-words">{block.latex}</code>}</figure>
    case "image": return <figure className="flex min-w-0 flex-col gap-2">{block.failed ? <Alert><AlertDescription>{en ? "Unable to display image." : "图片无法显示。"} {block.alt}</AlertDescription></Alert> : block.preview ? <div role="img" aria-label={block.alt} className="max-w-full overflow-hidden rounded-lg">{block.preview}</div> : <p className="text-sm text-muted-foreground">{block.alt}</p>}{block.caption && <figcaption className="text-sm text-muted-foreground">{block.caption}</figcaption>}</figure>
    case "separator": return <Separator />
    default: throw new Error("Unsupported response block")
  }
}

function ResponseBlocks({ blocks }: { blocks: NoteGenResponseBlock[] }) {
  return <>{blocks.map(block => <ResponseBlock key={block.id} block={block} />)}</>
}

function hasInvalidTable(blocks: NoteGenResponseBlock[]): boolean {
  return blocks.some(block => {
    if (block.type === "table") return block.rows.some(row => row.length !== block.columns.length)
    if (block.type === "card" || block.type === "stack") return hasInvalidTable(block.children)
    if (block.type === "alert") return hasInvalidTable(block.children ?? [])
    if (block.type === "tabs" || block.type === "accordion") return block.items.some(item => hasInvalidTable(item.content))
    return false
  })
}

class ResponseBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

/** One visible final-response format; previews never invoke action callbacks. */
export function NoteGenChatResponse({ lang = "cn", responseId = "response", title, state = "complete", streaming = false, blocks = [], fallback, contentScale = 100, platform = "desktop", loadingRotation, motion = "interactive", actionStates, onAction, onFeedback, tabs, onTabChange, accordions, onAccordionChange }: NoteGenChatResponseProps) {
  const en = lang === "en"
  const preview = state === "preview"
  const invalid = hasInvalidTable(blocks)
  if (state === "text" && (fallback === undefined || fallback === null || fallback === "")) return null
  if (state !== "error" && !preview && !blocks.length && (fallback === undefined || fallback === null || fallback === "")) return null
  const fallbackContent = fallback === undefined || fallback === null || fallback === "" ? <Alert><AlertDescription>{en ? "Unable to render the response." : "无法显示组件内容。"}</AlertDescription></Alert> : <div className="ng-response-text whitespace-pre-wrap break-words">{fallback}</div>
  const context: ResponseContext = { lang, preview, platform, motion, loadingRotation, actionStates, onAction, onFeedback, tabs, onTabChange, accordions, onAccordionChange }
  const scale = Math.max(50, Math.min(200, contentScale))
  return <section data-notegen-replica="chat-response" data-response-state={state} aria-label={title ?? (en ? "Assistant response" : "助手回复")} aria-busy={preview || streaming} className="ng-chat-surface ng-chat-response flex min-w-0 w-full select-text flex-col gap-3" style={{ fontSize: `${16 * scale / 100}px`, "--ng-response-base": `${16 * scale / 100}px` } as CSSProperties}>
    <style>{noteGenChatCss + noteGenResponseCss}</style>
    {state === "text" || state === "error" || (invalid && !preview) || (!blocks.length && !preview) ? fallbackContent : <>
      {preview && <div role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><NoteGenTraceSpinner rotation={loadingRotation} />{en ? "Generating components…" : "正在生成组件…"}</div>}
      {!invalid && <ResponseBoundary key={`${responseId}-${state}`} fallback={preview ? null : fallbackContent}><ResponseContext.Provider value={context}><ResponseBlocks blocks={blocks} /></ResponseContext.Provider></ResponseBoundary>}
    </>}
  </section>
}
