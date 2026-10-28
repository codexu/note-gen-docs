"use client"

import { createContext, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { AtSign, BotMessageSquare, BotOff, Brain, Check, ChevronRight, Drama, Eye, File, FileText, Folder, Image, Package, Palette, Plug, PlugZap, Plus, Search, Send, ShieldCheck, ShieldQuestion, Sparkles, ToolCase, X, type LucideIcon } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Badge } from "./model-settings/ui/badge"
import { Slider } from "./model-settings/ui/slider"
import { Switch } from "./model-settings/ui/switch"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { noteGenComposerOptions, noteGenCommandOptions, type NoteGenChatContext, type NoteGenComposerOption, type NoteGenPermissionMode } from "./chat-composer-replica"
import type { NoteGenReplicaLanguage } from "./types"
import { cn } from "@/lib/utils"

export type NoteGenMobileChatSheet = "tools" | "model" | "prompt" | "mcp" | "add" | "permission" | "resource" | "skill" | "command" | null
export type NoteGenMobileMcpServer = { id: string; label: string; type: string; status: "connected" | "connecting" | "disconnected"; toolCount?: number; enabled?: boolean }
export type NoteGenMobileModel = { id: string; label: string; group: string }
export type NoteGenMobileChatProps = {
  lang?: NoteGenReplicaLanguage
  sheet?: NoteGenMobileChatSheet
  defaultSheet?: NoteGenMobileChatSheet
  onSheetChange?: (sheet: NoteGenMobileChatSheet) => void
  onInteractionChange?: (active: boolean) => void
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  contexts?: NoteGenChatContext[]
  defaultContexts?: NoteGenChatContext[]
  onContextsChange?: (contexts: NoteGenChatContext[]) => void
  options?: NoteGenChatContext[]
  contextState?: "ready" | "loading" | "disabled"
  onManageSkills?: () => void
  hasModel?: boolean
  models?: NoteGenMobileModel[]
  model?: string
  activeModel?: string
  running?: boolean
  prompts?: { id: string; label: string }[]
  prompt?: string
  reasoningSupported?: boolean
  reasoningEfforts?: string[]
  reasoning?: string
  servers?: NoteGenMobileMcpServer[]
  selectedServerIds?: string[]
  permission?: NoteGenPermissionMode
  onToolChange?: (tool: "model" | "prompt" | "reasoning" | "mcp" | "permission", value: string | string[]) => void
  onAttachmentAction?: (kind: "image" | "file" | "folder") => void
  onSend?: (text: string, contexts: NoteGenChatContext[]) => void
  onStop?: () => void
  loadingRotation?: number
  motion?: "interactive" | "timeline"
  safeAreaBottom?: number
}

type MobileContext = {
  lang: NoteGenReplicaLanguage
  sheet: NoteGenMobileChatSheet
  setSheet: (value: NoteGenMobileChatSheet) => void
  text: string
  setText: (value: string, detect?: boolean) => void
  items: NoteGenChatContext[]
  setItems: (items: NoteGenChatContext[]) => void
  options: NoteGenChatContext[]
  contextState: "ready" | "loading" | "disabled"
  hasModel: boolean
  running: boolean
  model: string
  setModel: (value: string) => void
  activeModel?: string
  models: NoteGenMobileModel[]
  prompt: string
  setPrompt: (value: string) => void
  prompts: { id: string; label: string }[]
  reasoningSupported: boolean
  reasoningEfforts: string[]
  reasoning: string
  setReasoning: (value: string) => void
  servers: NoteGenMobileMcpServer[]
  selectedServers: string[]
  setSelectedServers: (value: string[]) => void
  permission: NoteGenPermissionMode
  setPermission: (value: NoteGenPermissionMode) => void
  onAttachmentAction?: NoteGenMobileChatProps["onAttachmentAction"]
  onManageSkills?: () => void
  onSend?: NoteGenMobileChatProps["onSend"]
  onStop?: () => void
  loadingRotation?: number
  motion: "interactive" | "timeline"
  viewportHeight: number
  focusDrawers: boolean
  picker: { current: { move: (direction: number) => void; select: () => void } | null }
  openMenu: (kind: "resource" | "skill") => void
}
const Context = createContext<MobileContext | null>(null)
function useMobileChat() { const context = useContext(Context); if (!context) throw new Error("NoteGenMobileChatProvider is required"); return context }
const labels = {
  cn: { tools: "工具", add: "添加", conversation: "对话设置", extensions: "扩展工具", model: "模型", modelHelp: "选择回答所用的模型", prompt: "提示词", promptHelp: "设置角色与回答方式", reasoning: "推理等级", reasoningHelp: "调整当前模型的思考强度", mcp: "MCP 服务", mcpHelp: "连接外部服务与工具", selectModel: "选择 AI 模型", noModel: "搜索 AI 模型", selectPrompt: "选择 Prompt", mcpTitle: "MCP 服务器", noServers: "未找到匹配的服务器", toolsCount: "个工具", connecting: "连接中", disconnected: "未连接", attachmentGroup: "本地附件", contextGroup: "工作区与技能", image: "图片", imageHelp: "从相册或本地添加图片", file: "文件", fileHelp: "添加本地文档与其他文件", folder: "文件夹", folderHelp: "添加文件夹及其中的文件", resource: "引用笔记与记录", resourceHelp: "搜索工作区中的笔记、记录和画布", skill: "使用技能", skillHelp: "为这次消息选择一个 Skill", resourceTitle: "关联上下文", skillTitle: "Skills", commandTitle: "快捷指令", loading: "正在加载...", empty: "没有匹配结果", allAdded: "已添加所有可用项", noSkills: "暂无可用技能", skillsOff: "Skills 已关闭，可在技能设置中启用。", skillsEmpty: "安装或启用技能后，即可在这里选择使用。", manage: "管理技能", permission: "Agent 权限模式", ask: "修改前确认", read: "只读", auto: "自动修改", readHelp: "仅查看和分析内容，不允许修改。", askHelp: "读取无需确认，修改内容前请求批准。", autoHelp: "自动修改本地内容；删除、脚本、技能安装等操作仍需批准。", close: "关闭", send: "发送", stop: "停止", input: "对话输入", placeholder: "你可以提问或将记录整理为文章...", next: "下轮生效", folders: "文件夹", files: "文件", records: "记录", canvases: "画布", global: "全局" },
  en: { tools: "Tools", add: "Add", conversation: "Conversation settings", extensions: "Extensions", model: "Model", modelHelp: "Choose the model for responses", prompt: "Prompt", promptHelp: "Set the role and response style", reasoning: "Reasoning Effort", reasoningHelp: "Adjust how much the model reasons", mcp: "MCP servers", mcpHelp: "Connect external services and tools", selectModel: "Select AI model", noModel: "Search AI models", selectPrompt: "Select prompt", mcpTitle: "MCP Servers", noServers: "No matching servers found", toolsCount: "tools", connecting: "Connecting", disconnected: "Disconnected", attachmentGroup: "Local attachments", contextGroup: "Workspace & skills", image: "Image", imageHelp: "Add images from your device", file: "File", fileHelp: "Attach local documents and other files", folder: "Folder", folderHelp: "Attach a folder and its files", resource: "Reference notes & records", resourceHelp: "Find notes, records, and canvases in your workspace", skill: "Use a skill", skillHelp: "Choose a Skill for this message", resourceTitle: "Link context", skillTitle: "Skills", commandTitle: "Quick commands", loading: "Loading...", empty: "No matching results", allAdded: "All available items have been added", noSkills: "No skills available", skillsOff: "Skills are turned off. Enable them in skill settings.", skillsEmpty: "Install or enable skills to choose them here.", manage: "Manage skills", permission: "Agent permission mode", ask: "Ask before edits", read: "Read only", auto: "Auto edit", readHelp: "View and analyze content without making changes.", askHelp: "Read without confirmation; ask for approval before changing content.", autoHelp: "Edit local content automatically; deletions, scripts, skill installation, and other sensitive actions still require approval.", close: "Close", send: "Send", stop: "Stop", input: "Chat input", placeholder: "Ask a question or organize records into an article...", next: "Next turn", folders: "Folders", files: "Files", records: "Records", canvases: "Canvases", global: "Global" },
} as const
const reasoningLabels: Record<string, [string, string]> = { default: ["默认", "Default"], none: ["关闭", "Disabled"], minimal: ["最低", "Minimal"], low: ["低", "Low"], medium: ["中", "Medium"], high: ["高", "High"], xhigh: ["极高", "Extra high"], max: ["最高", "Maximum"] }
const contextIcons: Record<NoteGenChatContext["kind"], LucideIcon> = { file: FileText, folder: Folder, record: FileText, canvas: Palette, skill: Package, image: Image }
const permissionIcons = { "read-only": Eye, ask: ShieldQuestion, "auto-edit": ShieldCheck }
const mobileChatCss = `
[data-notegen-mobile-screen] .ng-mobile-permission-ask{color:hsl(32 95% 25%)}
:is(.dark,[data-theme="dark"]) [data-notegen-mobile-screen] .ng-mobile-permission-ask{color:hsl(48 96% 65%)}
[data-notegen-mobile-screen][data-notegen-mobile-theme="light"] .ng-mobile-permission-ask{color:hsl(32 95% 25%)}
[data-mobile-motion="timeline"] [data-slot="slider-thumb"],[data-mobile-motion="timeline"] [data-slot="switch-thumb"]{transition:none!important}
`

/** Fixture state and callbacks only; no AI, clipboard, filesystem, or network access. */
export function NoteGenMobileChatProvider({ children, lang = "cn", sheet: controlledSheet, defaultSheet = null, onSheetChange, onInteractionChange, value, defaultValue = "", onValueChange, contexts, defaultContexts = [], onContextsChange, options, contextState = "ready", onManageSkills, hasModel = true, models = [{ id: "model-a", label: "GPT-4.1", group: "OpenAI" }, { id: "model-b", label: "GPT-4.1 mini", group: "OpenAI" }], model: controlledModel, activeModel, running = false, prompts = [{ id: "default", label: lang === "en" ? "Default" : "默认" }, { id: "writer", label: lang === "en" ? "Writing assistant" : "写作助手" }], prompt: controlledPrompt, reasoningSupported = true, reasoningEfforts = ["none", "minimal", "low", "medium", "high", "xhigh", "max"], reasoning: controlledReasoning, servers = [{ id: "notes", label: "NoteGen", type: "stdio", status: "connected", toolCount: 4 }, { id: "search", label: "Search", type: "sse", status: "disconnected" }], selectedServerIds, permission: controlledPermission, onToolChange, onAttachmentAction, onSend, onStop, loadingRotation, motion = "interactive", safeAreaBottom = 0 }: NoteGenMobileChatProps & { children: ReactNode }) {
  const [localSheet, setLocalSheet] = useState<NoteGenMobileChatSheet>(defaultSheet)
  const [localText, setLocalText] = useState(defaultValue)
  const [localItems, setLocalItems] = useState(defaultContexts)
  const [localModel, setLocalModel] = useState(models[0]?.id ?? "")
  const [localPrompt, setLocalPrompt] = useState(prompts[0]?.id ?? "")
  const [localReasoning, setLocalReasoning] = useState("default")
  const [localServers, setLocalServers] = useState<string[]>([])
  const [localPermission, setLocalPermission] = useState<NoteGenPermissionMode>("ask")
  const anchor = useRef<HTMLSpanElement>(null)
  const picker = useRef<{ move: (direction: number) => void; select: () => void } | null>(null)
  const interaction = useRef(false)
  const previousSheet = useRef<NoteGenMobileChatSheet>(defaultSheet)
  const [root, setRoot] = useState<HTMLElement | null>(null)
  const [viewportHeight, setViewportHeight] = useState(874)
  const sheet = controlledSheet !== undefined ? controlledSheet : localSheet
  const text = value ?? localText
  const items = contexts ?? localItems
  useLayoutEffect(() => {
    const screen = anchor.current?.closest<HTMLElement>('[data-notegen-mobile-screen]') ?? null
    setRoot(screen)
    if (!screen) return
    const update = () => setViewportHeight(screen.clientHeight || 874)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(screen)
    return () => observer.disconnect()
  }, [])
  const setSheet = (next: NoteGenMobileChatSheet) => { if (next || sheet) interaction.current = true; if (controlledSheet === undefined) setLocalSheet(next); onSheetChange?.(next); onInteractionChange?.(next !== null) }
  const setText = (next: string, detect = false) => { if (value === undefined) setLocalText(next); onValueChange?.(next); if (detect) { const token = /(?:^|\s)([@/])([^\s]*)$/.exec(next); setSheet(token ? token[1] === "@" ? "resource" : sheet === "skill" ? "skill" : "command" : null) } }
  const setItems = (next: NoteGenChatContext[]) => { if (contexts === undefined) setLocalItems(next); onContextsChange?.(next) }
  const openMenu = (kind: "resource" | "skill") => { const token = kind === "resource" ? "@" : "/"; setText(`${text}${text && !/\s$/.test(text) ? " " : ""}${token}`); setSheet(kind) }
  const data: MobileContext = { lang, sheet, setSheet, text, setText, items, setItems, options: options ?? noteGenComposerOptions(lang), contextState, hasModel, running, model: controlledModel ?? localModel, setModel: next => { if (controlledModel === undefined) setLocalModel(next); onToolChange?.("model", next) }, activeModel, models, prompt: controlledPrompt ?? localPrompt, setPrompt: next => { if (controlledPrompt === undefined) setLocalPrompt(next); onToolChange?.("prompt", next) }, prompts, reasoningSupported, reasoningEfforts, reasoning: controlledReasoning ?? localReasoning, setReasoning: next => { if (controlledReasoning === undefined) setLocalReasoning(next); onToolChange?.("reasoning", next) }, servers, selectedServers: selectedServerIds ?? localServers, setSelectedServers: next => { if (selectedServerIds === undefined) setLocalServers(next); onToolChange?.("mcp", next) }, permission: controlledPermission ?? localPermission, setPermission: next => { if (controlledPermission === undefined) setLocalPermission(next); onToolChange?.("permission", next) }, onAttachmentAction, onManageSkills, onSend, onStop, loadingRotation, motion, viewportHeight, focusDrawers: interaction.current, picker, openMenu }
  useLayoutEffect(() => {
    if (sheet === "tools" && interaction.current) root?.querySelector<HTMLElement>('[data-mobile-drawer-layer="main"] [role="dialog"]')?.focus()
    if ((sheet === "resource" || sheet === "skill" || sheet === "command") && interaction.current) root?.querySelector<HTMLTextAreaElement>('[data-notegen-mobile-composer] textarea')?.focus()
    if (sheet === null && interaction.current && previousSheet.current) {
      const previous = previousSheet.current
      const target = previous === "tools" ? '[data-mobile-trigger="tools"]' : previous === "add" ? '[data-mobile-trigger="add"]' : previous === "permission" ? '[data-mobile-trigger="permission"]' : '[data-notegen-mobile-composer] textarea'
      root?.querySelector<HTMLElement>(target)?.focus()
    }
    previousSheet.current = sheet
  }, [sheet, root])
  useEffect(() => {
    if (!sheet || !root) return
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !(event.target instanceof Node) || !root.contains(event.target)) return
      event.preventDefault()
      setSheet(sheet === "model" || sheet === "prompt" || sheet === "mcp" ? "tools" : null)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [sheet, root, controlledSheet, onSheetChange, onInteractionChange])
  const drawers = <NoteGenMobileChatDrawers safeAreaBottom={safeAreaBottom} />
  return <Context.Provider value={data}><style>{mobileChatCss}</style>{children}<span ref={anchor} hidden />{root ? createPortal(drawers, root) : drawers}</Context.Provider>
}

function MobileDrawer({ title, children, onClose, nested = false, inactive = false, safeAreaBottom = 0 }: { title: string; children: ReactNode; onClose: () => void; nested?: boolean; inactive?: boolean; safeAreaBottom?: number }) {
  const id = useId()
  const c = useMobileChat()
  const t = labels[c.lang]
  const panel = useRef<HTMLElement>(null)
  useLayoutEffect(() => { if (c.focusDrawers) panel.current?.focus() }, [c.focusDrawers])
  return <div data-mobile-drawer-layer={nested ? "nested" : "main"} aria-hidden={inactive || undefined} inert={inactive || undefined} className={cn("absolute inset-0 z-[80]", nested && "z-[81]")}>
    <button type="button" aria-label={t.close} className="absolute inset-0 w-full bg-black/10 backdrop-blur-[2px]" onClick={onClose} />
    <section ref={panel} data-mobile-motion={c.motion} role="dialog" aria-modal="true" aria-labelledby={id} tabIndex={-1} onKeyDown={event => { if (event.key !== "Tab") return; const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),[role="slider"]:not([data-disabled]),[tabindex="0"]')); if (!controls.length) { event.preventDefault(); return } const first = controls[0], last = controls[controls.length - 1]; if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() } }} className={cn("absolute inset-x-0 bottom-0 flex max-h-[80%] flex-col overflow-hidden rounded-t-xl border-t bg-popover text-sm text-popover-foreground shadow-xl outline-none", nested && "max-h-[70%]")}>
      <div className="mx-auto mt-4 h-1 w-[100px] shrink-0 rounded-full bg-muted" />
      <header className="sticky top-0 z-10 shrink-0 bg-popover/95 p-4 text-center backdrop-blur"><h2 id={id} className="text-base font-medium">{title}</h2></header>
      <div className="min-h-0 overflow-y-auto overscroll-contain" style={{ paddingBottom: `max(1.5rem, ${safeAreaBottom}px)` }}>{children}</div>
    </section>
  </div>
}

function ToolRow({ icon: Icon, title, description, value, onClick }: { icon: LucideIcon; title: string; description: string; value?: ReactNode; onClick: () => void }) {
  return <Button type="button" variant="ghost" className="h-auto min-h-14 w-full min-w-0 justify-start gap-3 px-2 py-2.5" onClick={onClick}><Icon data-icon="inline-start" /><span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left"><span className="truncate">{title}</span><span className="truncate text-xs font-normal text-muted-foreground" title={description}>{description}</span></span>{value && <span className="min-w-0 max-w-24 shrink truncate text-xs font-normal text-muted-foreground">{value}</span>}<ChevronRight data-icon="inline-end" /></Button>
}

function NoteGenMobileChatDrawers({ safeAreaBottom }: { safeAreaBottom: number }) {
  const c = useMobileChat(); const t = labels[c.lang]
  const nested = c.sheet === "model" || c.sheet === "prompt" || c.sheet === "mcp"
  const efforts = ["default", ...c.reasoningEfforts.filter(value => value !== "default")]
  const reasonIndex = Math.max(0, efforts.indexOf(c.reasoning))
  const selectedModel = c.hasModel ? c.models.find(item => item.id === c.model) : undefined
  const selectedPrompt = c.prompts.find(item => item.id === c.prompt)
  const modelsByGroup = [...new Set(c.models.map(model => model.group))]
  const choice = (label: string, selected: boolean, action: () => void) => <button type="button" className={cn("flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm", selected ? "bg-accent" : "hover:bg-muted/50")} onClick={action}><span className="min-w-0 flex-1 truncate font-medium">{label}</span><span className={cn("flex size-5 shrink-0 items-center justify-center rounded border", selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30")}>{selected && <Check className="size-3.5" />}</span></button>
  const local = (kind: "image" | "file" | "folder") => { c.onAttachmentAction?.(kind); const sample = { id: `${kind}:fixture`, kind, label: kind === "image" ? "image.png" : kind === "file" ? "notes.pdf" : (c.lang === "en" ? "Project notes" : "项目资料") } as NoteGenChatContext; if (!c.items.some(item => item.id === sample.id)) c.setItems([...c.items, sample]); c.setSheet(null) }
  return <>
    {(c.sheet === "tools" || nested) && <MobileDrawer title={t.tools} inactive={nested} onClose={() => c.setSheet(null)} safeAreaBottom={safeAreaBottom}><div className="flex min-w-0 flex-col gap-1 overflow-x-hidden px-3"><p className="px-2 py-2 text-xs font-medium text-muted-foreground">{t.conversation}</p><ToolRow icon={selectedModel ? BotMessageSquare : BotOff} title={t.model} description={c.running && c.activeModel && c.activeModel !== c.model ? (c.lang === "en" ? `Switched to ${selectedModel?.label ?? t.noModel}; applies next turn` : `已切换到 ${selectedModel?.label ?? t.noModel}，下轮生效`) : t.modelHelp} value={c.running && c.activeModel && c.activeModel !== c.model ? `${c.models.find(item => item.id === c.activeModel)?.label ?? c.activeModel} → ${selectedModel?.label ?? t.noModel}` : selectedModel?.label ?? t.noModel} onClick={() => c.setSheet("model")} /><ToolRow icon={Drama} title={t.prompt} description={t.promptHelp} value={selectedPrompt?.label ?? "-"} onClick={() => c.setSheet("prompt")} />
      {c.hasModel && selectedModel && c.reasoningSupported && c.reasoningEfforts.length > 0 && <div className="flex min-w-0 flex-col gap-2 px-2 py-2.5"><div className="flex items-center gap-3"><Brain className="size-4 shrink-0" /><div className="flex min-w-0 flex-1 flex-col gap-0.5"><span className="text-sm font-medium">{t.reasoning}</span><span className="truncate text-xs text-muted-foreground">{t.reasoningHelp}</span></div><output className="text-xs text-muted-foreground">{reasoningLabels[efforts[reasonIndex]]?.[c.lang === "en" ? 1 : 0] ?? efforts[reasonIndex]}</output></div><div className="pl-7 pr-2"><Slider className={c.motion === "timeline" ? "[&_[data-slot=slider-thumb]]:transition-none" : undefined} aria-label={t.reasoning} aria-valuetext={reasoningLabels[efforts[reasonIndex]]?.[c.lang === "en" ? 1 : 0] ?? efforts[reasonIndex]} value={[reasonIndex]} min={0} max={efforts.length - 1} step={1} onValueChange={([index]) => c.setReasoning(efforts[index])} /></div></div>}
      <div className="my-2 h-px bg-border" /><p className="px-2 py-2 text-xs font-medium text-muted-foreground">{t.extensions}</p><ToolRow icon={Plug} title={t.mcp} description={t.mcpHelp} value={c.selectedServers.length ? <Badge variant="secondary">{c.selectedServers.length}</Badge> : undefined} onClick={() => c.setSheet("mcp")} /></div></MobileDrawer>}
    {nested && <MobileDrawer nested title={c.sheet === "model" ? t.selectModel : c.sheet === "prompt" ? t.selectPrompt : t.mcpTitle} onClose={() => c.setSheet("tools")} safeAreaBottom={safeAreaBottom}><div className="flex flex-col gap-4 px-4">{c.sheet === "model" ? modelsByGroup.map(group => <div key={group} className="flex flex-col gap-1"><p className="px-2 text-xs font-medium text-muted-foreground">{group}</p>{c.models.filter(item => item.group === group).map(item => <div key={item.id}>{choice(item.label, item.id === c.model, () => { c.setModel(item.id); c.setSheet("tools") })}</div>)}</div>) : c.sheet === "prompt" ? c.prompts.map(item => <div key={item.id}>{choice(item.label, item.id === c.prompt, () => { c.setPrompt(item.id); c.setSheet("tools") })}</div>) : c.servers.filter(server => server.enabled !== false).length ? c.servers.filter(server => server.enabled !== false).map(server => { const selected = c.selectedServers.includes(server.id); const toggle = () => c.setSelectedServers(selected ? c.selectedServers.filter(id => id !== server.id) : [...c.selectedServers, server.id]); return <div key={server.id} className={cn("flex items-center gap-3 rounded-lg px-3 py-3", selected && "bg-accent")}><button type="button" className="flex min-w-0 flex-1 flex-col gap-1.5 text-left" onClick={toggle}><span className="flex items-center gap-2 text-sm font-medium"><span className="truncate">{server.label}</span><Badge variant="outline" className="h-4 px-1 py-0 text-[10px]">{server.type}</Badge></span><span className={cn("flex items-center gap-1 text-xs", server.status === "connected" ? "text-green-600 dark:text-green-400" : server.status === "connecting" ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground")}>{server.status === "connected" ? <PlugZap className="size-3" /> : <Plug className={cn("size-3", server.status === "connecting" && c.motion !== "timeline" && "animate-pulse motion-reduce:animate-none")} />}{server.status === "connected" ? `${server.toolCount ?? 0} ${t.toolsCount}` : server.status === "connecting" ? t.connecting : t.disconnected}</span></button><Switch aria-label={`${t.mcpTitle}: ${server.label}`} checked={selected} onCheckedChange={toggle} /></div> }) : <p className="px-2 py-6 text-center text-sm text-muted-foreground">{t.noServers}</p>}</div></MobileDrawer>}
    {c.sheet === "add" && <MobileDrawer title={t.add} onClose={() => c.setSheet(null)} safeAreaBottom={safeAreaBottom}><div className="flex flex-col gap-1 px-3">{([{ title: t.attachmentGroup, rows: [{ id: "image", icon: Image, label: t.image, help: t.imageHelp }, { id: "file", icon: File, label: t.file, help: t.fileHelp }, { id: "folder", icon: Folder, label: t.folder, help: t.folderHelp }] }, { title: t.contextGroup, rows: [{ id: "resource", icon: AtSign, label: t.resource, help: t.resourceHelp }, { id: "skill", icon: Sparkles, label: t.skill, help: t.skillHelp }] }] as const).map((group, index) => <div key={group.title} role="group" aria-label={group.title}>{index > 0 && <div className="my-2 h-px bg-border" />}<p className="px-3 py-2 text-xs font-medium text-muted-foreground">{group.title}</p>{group.rows.map(({ id, icon: Icon, label, help }) => <Button key={id} variant="ghost" className="h-auto min-h-14 w-full justify-start gap-3 px-3 py-2.5" onClick={() => id === "resource" || id === "skill" ? c.openMenu(id) : local(id)}><Icon data-icon="inline-start" /><span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left"><span className="truncate">{label}</span><span className="truncate text-xs font-normal text-muted-foreground">{help}</span></span>{(id === "resource" || id === "skill") && <kbd className="rounded bg-muted px-1.5 text-xs">{id === "resource" ? "@" : "/"}</kbd>}</Button>)}</div>)}</div></MobileDrawer>}
    {c.sheet === "permission" && <MobileDrawer title={t.permission} onClose={() => c.setSheet(null)} safeAreaBottom={safeAreaBottom}><div className="flex flex-col gap-1 px-2">{([{ id: "read-only", label: t.read, help: t.readHelp }, { id: "ask", label: t.ask, help: t.askHelp }, { id: "auto-edit", label: t.auto, help: t.autoHelp }] as const).map(({ id, label, help }) => { const Icon = permissionIcons[id]; return <Button key={id} variant="ghost" className="h-auto min-h-12 w-full justify-start gap-3 px-3 py-3" onClick={() => { c.setPermission(id); c.setSheet(null) }}><Icon className={cn(id === "ask" && "ng-mobile-permission-ask", id === "auto-edit" && "text-destructive", id === "read-only" && "text-muted-foreground")} /><span className="flex min-w-0 flex-1 flex-col gap-1 text-left"><span>{label}</span><span className="whitespace-normal text-xs font-normal text-muted-foreground">{help}</span></span>{id === c.permission && <Check />}</Button> })}</div></MobileDrawer>}
  </>
}

export function NoteGenMobileComposerLeading() {
  const c = useMobileChat(); const t = labels[c.lang]
  return <div className="flex items-center gap-1"><Button data-mobile-trigger="add" type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground" disabled={!c.hasModel} aria-label={t.add} title={t.add} onClick={() => c.setSheet("add")}><Plus /></Button><Button data-mobile-trigger="tools" type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label={t.tools} title={t.tools} onClick={() => c.setSheet("tools")}><ToolCase /></Button></div>
}
export function NoteGenMobilePermissionButton() {
  const c = useMobileChat(); const Icon = permissionIcons[c.permission]
  return <Button data-mobile-trigger="permission" type="button" variant="ghost" size="icon" disabled={c.running} className="size-8 text-muted-foreground" aria-label={labels[c.lang].permission} onClick={() => c.setSheet("permission")}><Icon className={cn(c.permission === "ask" && "ng-mobile-permission-ask", c.permission === "auto-edit" && "text-destructive")} /></Button>
}
export function NoteGenMobileTextInput({ readOnly = false, className, onFocus }: { readOnly?: boolean; className?: string; onFocus?: () => void }) {
  const c = useMobileChat(); const t = labels[c.lang]
  return <textarea data-slot="input-group-control" aria-label={t.input} placeholder={t.placeholder} value={c.text} readOnly={readOnly} onFocus={onFocus} onChange={event => c.setText(event.target.value, true)} onKeyDown={event => { if (event.nativeEvent.isComposing || !c.picker.current) return; if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); c.picker.current.move(event.key === "ArrowDown" ? 1 : -1) } else if (event.key === "Enter") { event.preventDefault(); c.picker.current.select() } }} className={cn("min-h-10 max-h-24 w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground", className)} />
}
export function NoteGenMobileSendButton({ disabled, className }: { disabled?: boolean; className?: string }) {
  const c = useMobileChat(); const t = labels[c.lang]; const canStop = c.running && !c.text.trim()
  return <Button type="button" variant="secondary" size="icon" className={cn("size-8 rounded-full", className)} aria-label={canStop ? t.stop : t.send} disabled={disabled ?? (!canStop && (!c.hasModel || !c.text.trim()))} onClick={() => { if (canStop) c.onStop?.(); else { c.onSend?.(c.text, c.items); c.setText(""); c.setItems(c.items.filter(item => item.locked)); c.setSheet(null) } }}>{canStop ? <span className="size-3 rounded-sm bg-current" /> : <Send />}</Button>
}
export function NoteGenMobileContextStrip() {
  const c = useMobileChat()
  if (!c.items.length) return null
  return <div className="flex w-full flex-wrap gap-1 px-1 pt-1">{c.items.map(item => { const Icon = contextIcons[item.kind]; return <Badge key={item.id} variant="secondary" className="h-7 max-w-40 gap-1 rounded-lg pl-2 pr-0.5 font-normal"><Icon /><span className="truncate">{item.label}</span>{!item.locked && <Button type="button" variant="ghost" size="icon-xs" aria-label={`${c.lang === "en" ? "Remove" : "移除"} ${item.label}`} onClick={() => c.setItems(c.items.filter(value => value.id !== item.id))}><X /></Button>}</Badge> })}</div>
}
export function NoteGenMobileComposerMenu() {
  const c = useMobileChat(); const t = labels[c.lang]
  const mode = c.sheet === "resource" || c.sheet === "skill" || c.sheet === "command" ? c.sheet : null
  const query = /(?:^|\s)[@/]([^\s]*)$/.exec(c.text)?.[1]?.toLowerCase() ?? ""
  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => setSelectedIndex(0), [mode, query])
  const full = useMemo<NoteGenComposerOption[]>(() => mode === "resource" ? c.options.filter(item => item.kind !== "skill" && item.kind !== "image") : mode === "skill" ? (c.contextState === "disabled" ? [] : c.options.filter(item => item.kind === "skill")) : mode === "command" ? [...noteGenCommandOptions(c.lang), ...(c.contextState === "disabled" ? [] : c.options.filter(item => item.kind === "skill"))] : [], [mode, c.options, c.contextState, c.lang])
  const available = full.filter(item => !c.items.some(selected => selected.id === item.id))
  const filtered = available.filter(item => `${item.label} ${item.description ?? ""}`.toLowerCase().includes(query))
  const groups = mode === "resource" ? (["folder", "file", "record", "canvas"] as const) : mode === "command" ? (["command", "skill"] as const) : (["skill"] as const)
  const groupName = (kind: string) => kind === "folder" ? t.folders : kind === "file" ? t.files : kind === "record" ? t.records : kind === "canvas" ? t.canvases : kind === "command" ? t.commandTitle : t.skillTitle
  const select = (item: NoteGenComposerOption) => { const stripped = c.text.replace(/(^|\s)[@/][^\s]*$/, "$1"); if (item.kind === "command") c.setText(`${stripped}${item.prompt}`); else { c.setText(stripped); if (!c.items.some(value => value.id === item.id)) c.setItems([...c.items, item]) } c.setSheet(null) }
  useEffect(() => {
    if (!mode || !filtered.length) { c.picker.current = null; return }
    c.picker.current = { move: direction => setSelectedIndex(index => (index + direction + filtered.length) % filtered.length), select: () => select(filtered[Math.min(selectedIndex, filtered.length - 1)]) }
    return () => { c.picker.current = null }
  })
  if (!mode) return null
  return <div data-notegen-replica="mobile-composer-menu" role="listbox" tabIndex={0} aria-label={mode === "resource" ? t.resourceTitle : mode === "skill" ? t.skillTitle : t.commandTitle} onKeyDown={event => { if (!filtered.length) return; if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setSelectedIndex(index => (index + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) % filtered.length) } else if (event.key === "Enter") { event.preventDefault(); select(filtered[Math.min(selectedIndex, filtered.length - 1)]) } }} className="absolute inset-x-1 bottom-[calc(100%+0.375rem)] z-30 overflow-y-auto rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg" style={{ maxHeight: `min(22rem, ${c.viewportHeight * 0.46}px)` }}>
    {c.contextState === "loading" && !filtered.length ? <div role="status" className="flex items-center justify-center gap-2 px-2 py-6 text-xs text-muted-foreground"><NoteGenTraceSpinner rotation={c.motion === "timeline" ? c.loadingRotation ?? 0 : c.loadingRotation} />{t.loading}</div> : !filtered.length ? <div className="flex flex-col items-center gap-3 px-3 py-6 text-center text-sm"><Search className="size-5 text-muted-foreground" /><span>{!available.length && full.length ? t.allAdded : mode === "skill" && !full.length ? t.noSkills : t.empty}</span>{mode === "skill" && !full.length && <><p className="text-xs text-muted-foreground">{c.contextState === "disabled" ? t.skillsOff : t.skillsEmpty}</p><Button variant="outline" size="sm" onClick={() => { c.setSheet(null); c.onManageSkills?.() }}>{t.manage}</Button></>}</div> : groups.map(group => { const members = filtered.filter(item => item.kind === group); if (!members.length) return null; return <div key={group}><p className="px-2 py-1 text-[11px] font-medium text-muted-foreground">{groupName(group)}</p>{members.map(item => { const Icon = item.kind === "command" ? item.icon ?? Sparkles : contextIcons[item.kind]; const index = filtered.indexOf(item); return <Button key={item.id} type="button" variant="ghost" role="option" aria-selected={index === selectedIndex} className={cn("h-auto min-h-10 w-full justify-start gap-3 px-2 py-2", index === selectedIndex && "bg-muted")} onMouseEnter={() => setSelectedIndex(index)} onMouseDown={event => event.preventDefault()} onClick={() => select(item)}><Icon /><span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left"><span className="truncate text-xs font-medium">{item.label}</span>{item.description && <span className="line-clamp-2 whitespace-normal text-xs font-normal text-muted-foreground">{item.description}</span>}</span>{item.kind === "skill" && <span className="text-[11px] text-muted-foreground">{item.scope === "project" ? (c.lang === "en" ? "Workspace" : "工作区") : t.global}</span>}</Button> })}</div> })}
  </div>
}
