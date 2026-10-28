"use client"

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react"
import { AtSign, Bot, Brain, Check, ListTree, WandSparkles, Languages, Search, FilePlus2, Package, ChevronRight, Clipboard, Eye, File, FileText, Folder, Image, LockKeyhole, Palette, Plug, Plus, Send, ShieldCheck, ShieldQuestion, Sparkles, Square, ToolCase, X, type LucideIcon } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Textarea } from "./model-settings/ui/textarea"
import { Slider } from "./model-settings/ui/slider"
import { Switch } from "./model-settings/ui/switch"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./model-settings/ui/field"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "./model-settings/ui/item"
import { Badge } from "./model-settings/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { NoteGenChatPopover } from "./chat-overlay"
import type { NoteGenReplicaLanguage } from "./types"
import { noteGenChatCss } from "./chat-replica-style"
import { cn } from "@/lib/utils"

export type NoteGenChatContext = { id: string; kind: "file" | "folder" | "record" | "canvas" | "skill" | "image"; label: string; description?: string; locked?: boolean }
export type NoteGenComposerMenu = "add" | "resource" | "skill" | "command" | "tools" | "permission" | null
export type NoteGenPermissionMode = "read-only" | "ask" | "auto-edit"
export type NoteGenComposerProps = {
  lang?: NoteGenReplicaLanguage
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  contexts?: NoteGenChatContext[]
  defaultContexts?: NoteGenChatContext[]
  onContextsChange?: (contexts: NoteGenChatContext[]) => void
  options?: NoteGenChatContext[]
  contextState?: "ready" | "loading" | "disabled"
  onManageSkills?: () => void
  loadingRotation?: number
  menu?: NoteGenComposerMenu
  onMenuChange?: (menu: NoteGenComposerMenu) => void
  toolPage?: "model" | "prompt" | "mcp" | null
  onToolPageChange?: (page: "model" | "prompt" | "mcp" | null) => void
  modelLabel?: string
  modelOptions?: string[]
  promptOptions?: string[]
  mcpOptions?: { id: string; label: string; enabled?: boolean }[]
  hasModel?: boolean
  reasoningSupported?: boolean
  reasoningEfforts?: string[]
  clipboardEnabled?: boolean
  permission?: NoteGenPermissionMode
  onPermissionChange?: (mode: NoteGenPermissionMode) => void
  running?: boolean
  waiting?: "approval" | "question"
  onSend?: (value: string, contexts: NoteGenChatContext[]) => void
  onStop?: () => void
  onAttachmentAction?: (kind: "image" | "file" | "folder") => void
  onToolChange?: (tool: "model" | "prompt" | "reasoning" | "mcp" | "clipboard", value: string | string[] | boolean) => void
  contextUsage?: ReactNode
  className?: string
  inputTarget?: string
  sendTarget?: string
  menuPosition?: Pick<CSSProperties, "left" | "right" | "top" | "bottom" | "maxHeight">
  toolPosition?: Pick<CSSProperties, "left" | "right" | "top" | "bottom" | "maxHeight">
}

const contextIcons = { file: FileText, folder: Folder, record: FileText, canvas: Palette, skill: Package, image: Image }
const permissionIcons = { "read-only": Eye, ask: ShieldQuestion, "auto-edit": ShieldCheck }
export function noteGenComposerOptions(lang: NoteGenReplicaLanguage): NoteGenChatContext[] {
  const en = lang === "en"
  return [
    { id: "folder:project", kind: "folder", label: en ? "Project notes" : "项目资料", description: en ? "Work / Project notes" : "工作 / 项目资料" },
    { id: "file:review", kind: "file", label: en ? "Project review.md" : "项目复盘.md", description: en ? "Work / Project review.md" : "工作 / 项目复盘.md" },
    { id: "file:feedback", kind: "file", label: en ? "Feedback.md" : "使用反馈.md" },
    { id: "record:idea", kind: "record", label: en ? "Prototype feedback" : "原型反馈记录" },
    { id: "canvas:plan", kind: "canvas", label: en ? "Project roadmap" : "项目路线图" },
    { id: "skill:meeting", kind: "skill", label: "meeting-notes", description: en ? "Summarize decisions and action items." : "整理讨论要点、决定与待办事项。" },
    { id: "skill:writing", kind: "skill", label: "technical-writing", description: en ? "Write clear technical documents." : "编写清晰的技术文档。" },
  ]
}

export type NoteGenComposerOption = NoteGenChatContext | { id: string; kind: "command"; label: string; description: string; prompt: string; icon?: LucideIcon }
export function noteGenCommandOptions(lang: NoteGenReplicaLanguage): NoteGenComposerOption[] {
  const en = lang === "en"
  const rows = en ? [
    ["summarize", "Summarize", "Extract key points and conclusions", "Summarize the following content and extract key points: "],
    ["organize", "Organize into a note", "Create structured Markdown", "Organize the following into a structured Markdown note: "],
    ["rewrite", "Polish", "Keep the meaning and improve the writing", "Polish the following content while preserving its meaning: "],
    ["translate", "Translate", "Translate into a specified language", "Translate the following content into: "],
    ["searchNotes", "Search notes", "Find relevant knowledge", "Search my notes and answer: "],
    ["createNote", "Create note", "Create a structured Markdown note", "Create a Markdown note based on these requirements: "],
  ] : [
    ["summarize", "总结", "提炼重点和结论", "请总结以下内容，提炼重点和结论："],
    ["organize", "整理成笔记", "整理为结构清晰的 Markdown", "请将以下内容整理成结构清晰的 Markdown 笔记："],
    ["rewrite", "润色", "保持原意并改善表达", "请润色以下内容，保持原意并改善表达："],
    ["translate", "翻译", "翻译为指定语言", "请将以下内容翻译为："],
    ["searchNotes", "搜索笔记", "在知识库中查找相关内容", "请在我的笔记知识库中搜索并回答："],
    ["createNote", "创建笔记", "新建一篇结构清晰的 Markdown 笔记", "请根据以下要求创建一篇新的 Markdown 笔记："],
  ]
  const icons: Record<string, LucideIcon> = { summarize: ListTree, organize: WandSparkles, rewrite: WandSparkles, translate: Languages, searchNotes: Search, createNote: FilePlus2 }
  return rows.map(([id, label, description, prompt]): NoteGenComposerOption => ({ id: `command:${id}`, kind: "command", label, description, prompt, icon: icons[id] }))
}

function ToolRow({ icon: Icon, title, description, value, onClick, disabled, active, chevron = true, shortcut, anchorRef }: { icon: LucideIcon; title: string; description: string; value?: ReactNode; onClick: () => void; disabled?: boolean; active?: boolean; chevron?: boolean; shortcut?: string; anchorRef?: RefObject<HTMLButtonElement | null> }) {
  return <Button ref={anchorRef} type="button" variant="ghost" className="h-auto min-h-14 w-full min-w-0 justify-start gap-3 px-2 py-2.5" onClick={onClick} disabled={disabled} aria-pressed={active}><Icon data-icon="inline-start" /><span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left"><span className="truncate">{title}</span><span className="truncate text-xs font-normal text-muted-foreground">{description}</span></span>{value && <span className="max-w-24 truncate text-xs font-normal text-muted-foreground">{value}</span>}{shortcut && <kbd className="rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">{shortcut}</kbd>}{chevron && <ChevronRight data-icon="inline-end" />}</Button>
}

/** Shared desktop composer. Every attachment and tool choice is a fixed local fixture. */
export function NoteGenAgentComposer({ lang = "cn", value, defaultValue = "", onValueChange, contexts, defaultContexts = [], onContextsChange, options, contextState = "ready", onManageSkills, loadingRotation, menu: controlledMenu, onMenuChange, toolPage: controlledToolPage, onToolPageChange, modelLabel, modelOptions = ["GPT-5", "Claude Sonnet 4.5", "DeepSeek V3.1"], promptOptions, mcpOptions = [{ id: "files", label: "Filesystem", enabled: true }, { id: "search", label: "Search" }], hasModel = true, reasoningSupported = true, reasoningEfforts = ["none", "minimal", "low", "medium", "high", "xhigh", "max"], clipboardEnabled, permission, onPermissionChange, running = false, waiting, onSend, onStop, onAttachmentAction, onToolChange, contextUsage, className, inputTarget, sendTarget, menuPosition, toolPosition }: NoteGenComposerProps) {
  const en = lang === "en"
  const owner = useId()
  const root = useRef<HTMLDivElement>(null)
  const addAnchor = useRef<HTMLButtonElement>(null)
  const toolsAnchor = useRef<HTMLButtonElement>(null)
  const permissionAnchor = useRef<HTMLButtonElement>(null)
  const modelAnchor = useRef<HTMLButtonElement>(null)
  const promptAnchor = useRef<HTMLButtonElement>(null)
  const mcpAnchor = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const token = useRef<{ start: number; end: number } | null>(null)
  const menuList = useRef<HTMLDivElement>(null)
  const selectedOption = useRef<HTMLButtonElement>(null)
  const [localValue, setLocalValue] = useState(defaultValue)
  const [localContexts, setLocalContexts] = useState(defaultContexts)
  const [localMenu, setLocalMenu] = useState<NoteGenComposerMenu>(null)
  const [localToolPage, setLocalToolPage] = useState<"model" | "prompt" | "mcp" | null>(null)
  const [query, setQuery] = useState("")
  const [selection, setSelection] = useState(0)
  const [localModel, setLocalModel] = useState(modelOptions[0] ?? "GPT-5")
  const [prompt, setPrompt] = useState(en ? "Default prompt" : "默认提示词")
  const [reasoning, setReasoning] = useState("default")
  const [selectedMcp, setSelectedMcp] = useState(mcpOptions.filter(option => option.enabled).map(option => option.id))
  const [localClipboard, setClipboard] = useState(true)
  const clipboard = clipboardEnabled ?? localClipboard
  const [localPermission, setLocalPermission] = useState<NoteGenPermissionMode>("ask")
  const currentMenu = controlledMenu === undefined ? localMenu : controlledMenu
  const toolPage = controlledToolPage === undefined ? localToolPage : controlledToolPage
  const text = value ?? localValue
  const selected = contexts ?? localContexts
  const hasInput = Boolean(text.trim() || selected.some(context => context.kind === "image" || context.id.startsWith("attachment:")))
  const showStop = running && !hasInput
  const mode = permission ?? localPermission
  const PermissionIcon = permissionIcons[mode]
  const setText = (next: string) => { if (value === undefined) setLocalValue(next); onValueChange?.(next) }
  const setContexts = (next: NoteGenChatContext[]) => { if (contexts === undefined) setLocalContexts(next); onContextsChange?.(next) }
  const setPage = (next: "model" | "prompt" | "mcp" | null) => { if (controlledToolPage === undefined) setLocalToolPage(next); onToolPageChange?.(next) }
  const setMenu = (next: NoteGenComposerMenu) => { if (controlledMenu === undefined) setLocalMenu(next); onMenuChange?.(next); setPage(null); setQuery(""); setSelection(0); if (next === null) token.current = null }
  const effortOptions = ["default", ...reasoningEfforts]
  const effortLabels: Record<string, string> = en ? { default: "Default", none: "None", minimal: "Minimal", low: "Low", medium: "Medium", high: "High", xhigh: "Extra high", max: "Maximum" } : { default: "默认", none: "无", minimal: "最低", low: "低", medium: "中", high: "高", xhigh: "极高", max: "最高" }
  const effortLabel = (value: string) => effortLabels[value] ?? value
  const modes = { "read-only": [en ? "Read only" : "只读", en ? "Analyze content without editing." : "仅查看和分析内容，不允许修改。"], ask: [en ? "Confirm before editing" : "修改前确认", en ? "Read freely; ask before edits." : "读取无需确认，修改内容前请求批准。"], "auto-edit": [en ? "Auto edit" : "自动修改", en ? "Edit local content; sensitive actions still require approval." : "自动修改本地内容；删除、脚本、技能安装等操作仍需批准。"] }
  const fixtures = options ?? noteGenComposerOptions(lang)
  const candidates: NoteGenComposerOption[] = currentMenu === "command" ? [...noteGenCommandOptions(lang), ...fixtures.filter(option => option.kind === "skill" && contextState !== "disabled")] : fixtures.filter(option => currentMenu === "skill" ? option.kind === "skill" && contextState !== "disabled" : option.kind !== "skill")
  const available = candidates.filter(option => !selected.some(context => context.id === option.id)).filter(option => `${option.label} ${option.description ?? ""}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()))

  const openContext = (next: "resource" | "skill") => {
    const cursor = input.current?.selectionEnd ?? text.length
    const prefix = cursor > 0 && !/\s/.test(text[cursor - 1]) ? " " : ""
    const marker = next === "resource" ? "@" : "/"
    const start = cursor + prefix.length
    setText(`${text.slice(0, cursor)}${prefix}${marker}${text.slice(cursor)}`)
    setMenu(next)
    token.current = { start, end: start + 1 }
    requestAnimationFrame(() => { input.current?.focus(); input.current?.setSelectionRange(start + 1, start + 1) })
  }
  const choose = (option: NoteGenComposerOption) => {
    if (option.kind === "command") {
      const range = token.current
      setText(range ? `${text.slice(0, range.start)}${option.prompt}${text.slice(range.end)}` : option.prompt)
      setMenu(null)
      input.current?.focus()
      return
    }
    if (!selected.some(context => context.id === option.id)) setContexts([...selected, option])
    const range = token.current
    if (range && ["@", "/"].includes(text[range.start])) setText(`${text.slice(0, range.start)}${text.slice(range.end)}`)
    else if (/^[\s]*[@/]\S*$/.test(text)) setText("")
    setMenu(null)
    input.current?.focus()
  }
  const attach = (kind: "image" | "file" | "folder") => { const fixture = { id: `attachment:${kind}`, kind, label: kind === "image" ? "reference.png" : kind === "file" ? "brief.pdf" : (en ? "Research" : "参考资料") }; if (!selected.some(context => context.id === fixture.id)) setContexts([...selected, fixture]); onAttachmentAction?.(kind); setMenu(null) }
  const send = () => { if (!hasModel || !hasInput) return; onSend?.(text, selected); setText(""); setContexts(selected.filter(context => context.locked)); setMenu(null) }
  useEffect(() => {
    if (!currentMenu) return
    const outside = (event: PointerEvent) => { const target = event.target; if (!(target instanceof Element) || root.current?.contains(target) || target.closest(`[data-chat-owner="${CSS.escape(owner)}"]`)) return; setMenu(null) }
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenu(null); input.current?.focus() } }
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape)
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape) }
  }, [currentMenu, controlledMenu, onMenuChange, owner])
  useEffect(() => {
    const item = selectedOption.current
    const panel = item?.closest<HTMLElement>("[data-chat-owner]")
    if (!item || !panel) return
    const itemRect = item.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    const scale = panelRect.height / panel.offsetHeight || 1
    if (itemRect.bottom > panelRect.bottom) panel.scrollTop += (itemRect.bottom - panelRect.bottom) / scale
    if (itemRect.top < panelRect.top) panel.scrollTop -= (panelRect.top - itemRect.top) / scale
  }, [selection, currentMenu, query])
  const groupLabel = (label: string) => <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{label}</p>
  return <div ref={root} data-notegen-chat-boundary data-notegen-replica="composer" className={cn("ng-chat-surface relative w-full p-1 text-sm", className)}>
    <style>{noteGenChatCss}</style>
    <div className="flex w-full flex-col gap-1 rounded-xl border bg-background p-1">
      {selected.length > 0 && <div className="flex gap-1 overflow-x-auto p-1" aria-label={en ? "Message context" : "消息上下文"}>{selected.map(context => { const Icon = contextIcons[context.kind]; return <Badge key={context.id} variant="secondary" className="h-7 max-w-40 shrink-0 gap-1 rounded-lg pl-2 pr-0.5 font-normal"><button type="button" onClick={() => setContexts(selected.map(item => item.id === context.id ? { ...item, locked: !item.locked } : item))} aria-label={en ? `Toggle lock: ${context.label}` : `切换引用锁定：${context.label}`} aria-pressed={context.locked} className="shrink-0">{context.locked ? <LockKeyhole className="size-3.5" /> : <Icon className="size-3.5" />}</button><span className="truncate" title={context.label}>{context.label}</span><Button type="button" variant="ghost" size="icon-xs" aria-label={en ? `Remove ${context.label}` : `移除${context.label}`} onClick={() => setContexts(selected.filter(item => item.id !== context.id))}><X /></Button></Badge> })}</div>}
      <Textarea ref={input} data-skill-input={inputTarget} value={text} readOnly={value !== undefined && !onValueChange} disabled={!hasModel} rows={1} aria-label={en ? "Message" : "消息"} placeholder={waiting === "approval" ? (en ? "Add requirements or change the request…" : "补充要求或调整本次操作…") : running ? (en ? "Add a follow-up instruction…" : "补充后续要求…") : (en ? "Ask a question or organize records into an article…" : "你可以提问或将记录整理为文章...")} className="min-h-9 max-h-60 resize-none border-none p-2 shadow-none focus-visible:ring-0" onChange={event => {
        const next = event.target.value
        const cursor = event.target.selectionStart
        setText(next)
        const before = next.slice(0, cursor)
        const trigger = before.match(/(?:^|\s)([@/])([^\s]*)$/)
        if (trigger) { setMenu(trigger[1] === "@" ? "resource" : currentMenu === "skill" ? "skill" : "command"); setQuery(trigger[2]); token.current = { start: before.lastIndexOf(trigger[1]), end: cursor } }
        else if (currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command") setMenu(null)
      }} onKeyDown={event => {
        if (event.nativeEvent.isComposing) return
        if (event.key === "Backspace" && event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey && selected.length) { event.preventDefault(); if (!event.repeat) setContexts(selected.slice(0, -1)); return }
        if ((currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command") && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) { event.preventDefault(); if (event.key === "Enter") { if (available[selection]) choose(available[selection]) } else setSelection(index => available.length ? (index + (event.key === "ArrowDown" ? 1 : -1) + available.length) % available.length : 0); return }
        if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send() }
      }} />
      <div className="flex w-full items-center justify-between"><div className="flex min-w-0 flex-1 items-center gap-1"><Button type="button" ref={addAnchor} variant="ghost" size="icon" disabled={!hasModel} aria-label={en ? "Add" : "添加"} aria-expanded={currentMenu === "add"} onClick={() => setMenu(currentMenu === "add" ? null : "add")}><Plus /></Button><Button type="button" ref={toolsAnchor} variant="ghost" size="icon" aria-label={en ? "Tools" : "工具"} aria-expanded={currentMenu === "tools"} onClick={() => setMenu(currentMenu === "tools" ? null : "tools")}><ToolCase /></Button></div><div className="flex shrink-0 items-center gap-2 pr-1">{contextUsage}<Button type="button" ref={permissionAnchor} variant="ghost" size="sm" className="h-8" disabled={running} aria-label={en ? "Agent permission mode" : "Agent 权限模式"} aria-expanded={currentMenu === "permission"} onClick={() => setMenu(currentMenu === "permission" ? null : "permission")}><PermissionIcon data-icon="inline-start" /><span>{modes[mode][0]}</span></Button><Button type="button" size="sm" variant={showStop ? "destructive" : "default"} data-skill-action={sendTarget} data-empty={!hasInput} data-sending={showStop} aria-label={showStop ? (en ? "Stop" : "停止") : running ? (en ? "Add follow-up instruction" : "追加后续要求") : (en ? "Send" : "发送")} disabled={!showStop && (!hasModel || !hasInput)} onClick={showStop ? onStop : send}>{showStop ? <Square fill="currentColor" /> : <Send />}</Button></div></div>
    </div>
    {currentMenu && <NoteGenChatPopover staticPosition={menuPosition} maxHeight={currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command" ? 352 : 448} anchor={currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command" ? root : currentMenu === "tools" ? toolsAnchor : currentMenu === "permission" ? permissionAnchor : addAnchor} matchAnchorWidth={currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command"} owner={owner} width={currentMenu === "add" ? 288 : currentMenu === "permission" ? 480 : 320} label={en ? "Composer menu" : "输入菜单"}>
      <div ref={menuList} onKeyDown={event => { if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return; const buttons = [...(menuList.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]; const index = buttons.indexOf(document.activeElement as HTMLButtonElement); if (!buttons.length) return; event.preventDefault(); buttons[(index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length]?.focus() }}>
      {currentMenu === "add" ? <>{groupLabel(en ? "Local attachments" : "本地附件")}{([{ kind: "image", icon: Image, title: en ? "Image" : "图片", description: en ? "Add an image from photos or local files" : "从相册或本地添加图片" }, { kind: "file", icon: File, title: en ? "File" : "文件", description: en ? "Add local documents and other files" : "添加本地文档与其他文件" }, { kind: "folder", icon: Folder, title: en ? "Folder" : "文件夹", description: en ? "Add a folder and its files" : "添加文件夹及其中的文件" }] as const).map(action => <ToolRow key={action.kind} chevron={false} {...action} onClick={() => attach(action.kind)} />)}<Separator className="my-1.5" />{groupLabel(en ? "Workspace and skills" : "工作区与技能")}<ToolRow icon={AtSign} title={en ? "Reference notes and records" : "引用笔记与记录"} description={en ? "Search notes, records, and canvases" : "搜索工作区中的笔记、记录和画布"} shortcut="@" chevron={false} onClick={() => { openContext("resource") }} /><ToolRow icon={Sparkles} title={en ? "Use a skill" : "使用技能"} description={en ? "Choose a Skill for this message" : "为这次消息选择一个 Skill"} shortcut="/" chevron={false} onClick={() => { openContext("skill") }} /></> : null}
      {currentMenu === "resource" || currentMenu === "skill" || currentMenu === "command" ? <div role="listbox" aria-label={currentMenu === "skill" ? (en ? "Skills" : "技能") : currentMenu === "command" ? (en ? "Quick commands" : "快捷指令") : (en ? "Reference notes, records, and canvases" : "引用笔记、记录和画布")} className="flex flex-col gap-0.5">{contextState === "loading" ? <div role="status" className="flex items-center justify-center gap-2 px-2 py-6 text-xs text-muted-foreground"><NoteGenTraceSpinner rotation={loadingRotation} />{en ? "Loading…" : "正在加载..."}</div> : available.map((option, index) => { const Icon = option.kind === "command" ? option.icon ?? Sparkles : contextIcons[option.kind]; const kindLabels = { file: en ? "Notes" : "笔记", folder: en ? "Folders" : "文件夹", record: en ? "Records" : "记录", canvas: en ? "Canvases" : "画布", skill: "Skills", command: en ? "Quick commands" : "快捷指令", image: en ? "Images" : "图片" }; return <div key={option.id}>{index === 0 || available[index - 1].kind !== option.kind ? <p className="px-2 py-1 text-[11px] font-medium text-muted-foreground">{kindLabels[option.kind]}</p> : null}<Button ref={selection === index ? selectedOption : undefined} type="button" role="option" aria-selected={selection === index} variant="ghost" size="sm" className={cn("h-auto min-h-10 w-full justify-start gap-3 rounded-lg px-2 py-2 text-left", selection === index && "bg-muted")} onMouseEnter={() => setSelection(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(option)}><Icon data-icon="inline-start" /><span className="flex min-w-0 flex-1 flex-col items-start gap-0.5"><span className="w-full truncate text-xs font-medium">{option.label}</span>{option.description && <span className="line-clamp-2 w-full whitespace-normal text-xs font-normal text-muted-foreground">{option.description}</span>}</span></Button></div> })}{contextState !== "loading" && !available.length && <div className="flex flex-col items-center gap-3 px-2 py-6 text-center text-xs text-muted-foreground"><p>{!query && candidates.length ? (en ? "All available items added" : "已添加所有可用项") : currentMenu === "skill" && !candidates.length ? (en ? "No available skills" : "暂无可用技能") : (en ? "No matching results" : "没有匹配结果")}</p>{currentMenu === "skill" && !candidates.length ? <><p>{contextState === "disabled" ? (en ? "Skills are disabled. Enable them in settings." : "Skills 已关闭，可在技能设置中启用。") : (en ? "Install or enable a Skill to select it here." : "安装或启用技能后，即可在这里选择使用。")}</p><Button type="button" variant="outline" size="sm" disabled={!onManageSkills} onClick={() => { setMenu(null); onManageSkills?.() }}>{en ? "Manage skills" : "管理技能"}</Button></> : null}</div>}</div> : null}
      {currentMenu === "tools" ? <>{groupLabel(en ? "Conversation settings" : "对话设置")}<div><ToolRow anchorRef={modelAnchor} icon={Bot} title={en ? "Model" : "模型"} description={en ? "Choose the model used for replies" : "选择回答所用的模型"} value={modelLabel ?? localModel} onClick={() => setPage(toolPage === "model" ? null : "model")} /><ToolRow anchorRef={promptAnchor} icon={Sparkles} title={en ? "Prompt" : "提示词"} description={en ? "Set the role and response style" : "设置角色与回答方式"} value={prompt} onClick={() => setPage(toolPage === "prompt" ? null : "prompt")} />{hasModel && reasoningSupported && reasoningEfforts.length > 0 ? <FieldGroup className="min-w-0 px-2 py-2.5"><Field className="min-w-0"><div className="flex min-w-0 items-center justify-between gap-3"><Brain className="size-4 shrink-0" /><div className="flex min-w-0 flex-1 flex-col gap-0.5"><FieldLabel id={`${owner}-reasoning-label`}>{en ? "Reasoning effort" : "思考强度"}</FieldLabel><FieldDescription id={`${owner}-reasoning-description`} className="truncate text-xs">{en ? "Adjust the current model's reasoning effort" : "调整当前模型的思考强度"}</FieldDescription></div><output className="shrink-0 text-xs text-muted-foreground" aria-live="polite">{effortLabel(reasoning)}</output></div><div className="min-w-0 pl-7 pr-2"><Slider min={0} max={effortOptions.length - 1} step={1} value={[Math.max(0, effortOptions.indexOf(reasoning))]} aria-labelledby={`${owner}-reasoning-label`} aria-describedby={`${owner}-reasoning-description`} aria-valuetext={effortLabel(reasoning)} onValueChange={([index]) => { const effort = effortOptions[index] ?? "default"; setReasoning(effort); onToolChange?.("reasoning", effort) }} /></div></Field></FieldGroup> : null}<Separator className="my-1.5" />{groupLabel(en ? "Extension tools" : "扩展工具")}<ToolRow anchorRef={mcpAnchor} icon={Plug} title={en ? "MCP services" : "MCP 服务"} description={en ? "Connect external services and tools" : "连接外部服务与工具"} value={selectedMcp.length ? <Badge variant="secondary">{selectedMcp.length}</Badge> : undefined} onClick={() => setPage(toolPage === "mcp" ? null : "mcp")} /><Item size="xs" className="min-h-14 flex-nowrap gap-3 px-2 py-2.5"><ItemMedia variant="icon"><Clipboard /></ItemMedia><ItemContent className="min-w-0 gap-0.5"><ItemTitle><label htmlFor={`${owner}-clipboard`}>{en ? "Clipboard monitoring" : "剪贴板监听"}</label></ItemTitle><ItemDescription id={`${owner}-clipboard-description`}>{en ? "Automatically get clipboard content" : "自动获取剪贴板中的内容"}</ItemDescription></ItemContent><ItemActions className="shrink-0"><Switch id={`${owner}-clipboard`} checked={clipboard} aria-describedby={`${owner}-clipboard-description`} onCheckedChange={next => { if (clipboardEnabled === undefined) setClipboard(next); onToolChange?.("clipboard", next) }} /></ItemActions></Item></div></> : null}
      {currentMenu === "permission" ? (["read-only", "ask", "auto-edit"] as const).map(option => <ToolRow key={option} chevron={false} icon={permissionIcons[option]} title={modes[option][0]} description={modes[option][1]} value={mode === option ? <Check className="size-4" /> : undefined} onClick={() => { if (permission === undefined) setLocalPermission(option); onPermissionChange?.(option); setMenu(null) }} />) : null}
      </div>
    </NoteGenChatPopover>}
    {currentMenu === "tools" && toolPage && <NoteGenChatPopover staticPosition={toolPosition} anchor={toolPage === "model" ? modelAnchor : toolPage === "prompt" ? promptAnchor : mcpAnchor} owner={owner} side="right" width={320} label={en ? "Tool options" : "工具选项"}>{groupLabel(({ model: en ? "Models" : "模型", prompt: en ? "Prompts" : "提示词", mcp: en ? "Select MCP services" : "选择 MCP 服务" })[toolPage])}{(toolPage === "model" ? modelOptions.map(label => ({ id: label, label })) : toolPage === "prompt" ? (promptOptions ?? [en ? "Default prompt" : "默认提示词", en ? "Writing assistant" : "写作助手"]).map(label => ({ id: label, label })) : mcpOptions).map(option => { const checked = toolPage === "mcp" ? selectedMcp.includes(option.id) : toolPage === "model" ? (modelLabel ?? localModel) === option.id : toolPage === "prompt" ? prompt === option.id : false; return <Button key={option.id} type="button" variant="ghost" className="w-full justify-between" aria-pressed={checked} onClick={() => { if (toolPage === "model") setLocalModel(option.id); else if (toolPage === "prompt") setPrompt(option.id); else setSelectedMcp(current => current.includes(option.id) ? current.filter(id => id !== option.id) : [...current, option.id]); onToolChange?.(toolPage, toolPage === "mcp" ? (checked ? selectedMcp.filter(id => id !== option.id) : [...selectedMcp, option.id]) : option.id); if (toolPage !== "mcp") setPage(null) }}>{option.label}{checked && <Check />}</Button> })}</NoteGenChatPopover>}
  </div>
}
