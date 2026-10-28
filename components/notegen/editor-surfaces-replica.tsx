"use client"

import { useState, type ReactNode } from "react"
import { ArrowLeft, ArrowRight, CircleAlert, ExternalLink, Globe2, House, Link, RotateCw, Search, Star } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./model-settings/ui/input-group"
import { Card, CardContent, CardHeader, CardTitle } from "./model-settings/ui/card"
import { Alert, AlertDescription, AlertTitle } from "./model-settings/ui/alert"
import { Empty, EmptyHeader, EmptyTitle } from "./model-settings/ui/empty"
import { Skeleton } from "./model-settings/ui/skeleton"
import { noteGenEditorSurfaceText } from "./editor-surface-copy"
import { NoteGenReplicaActionMenu } from "./replica-action-menu"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenBrowserProps = {
  lang?: NoteGenReplicaLanguage
  state?: "start" | "loading" | "content" | "error" | "unavailable"
  url?: string
  content?: ReactNode
  error?: string
  canBack?: boolean
  canForward?: boolean
  libraryLoading?: boolean
  bookmarks?: { title: string; url: string }[]
  history?: { title: string; url: string; time: string }[]
  onNavigate?: (input: string) => void
  onAction?: (action: "back" | "forward" | "reload" | "external" | "save-record", url: string) => void
}

/** Local prepared pages only: never creates a webview, iframe or network request. */
export function NoteGenBrowserPanel({ lang = "cn", state = "start", url = "", content, error, canBack = false, canForward = false, libraryLoading = false, bookmarks = [], history = [], onNavigate, onAction }: NoteGenBrowserProps) {
  const t = (key: string) => noteGenEditorSurfaceText(lang, key)
  const [address, setAddress] = useState(url)
  const [search, setSearch] = useState("")
  const [home, setHome] = useState(false)
  const [starred, setStarred] = useState(false)
  const [engine, setEngine] = useState("Bing")
  const [clearedHistory, setClearedHistory] = useState(false)
  const showHome = state === "start" || home
  const navigate = (value: string) => {
    if (!value.trim()) return
    // The host decides how to interpret searches and addresses; this is only an event.
    onNavigate?.(value.trim())
  }
  const tool = (Icon: typeof ArrowLeft, label: string, action: () => void, disabled = false) => <Button variant="ghost" size="icon-sm" aria-label={label} title={label} disabled={disabled} onClick={action}><Icon /></Button>
  const card = (title: string, children: ReactNode) => <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>{children}</CardContent></Card>
  return <div data-notegen-replica="browser-panel" data-browser-state={state} className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-background text-sm text-foreground">
    <div className="flex h-12 shrink-0 items-center gap-1 border-b px-2">
      {tool(ArrowLeft, t("navigateBack"), () => onAction?.("back", url), !canBack)}{tool(ArrowRight, t("navigateForward"), () => onAction?.("forward", url), !canForward)}{tool(RotateCw, t("browserReload"), () => onAction?.("reload", url), showHome || !url)}{tool(House, t("browserBackToStart"), () => setHome(true), !url)}
      <form className="min-w-0 flex-1 px-1" onSubmit={event => { event.preventDefault(); navigate(address) }}><InputGroup><InputGroupAddon><Globe2 /></InputGroupAddon><InputGroupInput aria-label={t("browserSearchPlaceholder")} placeholder={t("browserSearchPlaceholder")} value={address} onChange={event => setAddress(event.target.value)} onFocus={event => event.currentTarget.select()} /></InputGroup></form>
      <Button variant="ghost" size="icon-sm" aria-label={t(starred ? "browserRemoveBookmark" : "browserAddBookmark")} aria-pressed={starred} disabled={showHome || !url || libraryLoading} onClick={() => setStarred(!starred)}><Star className={starred ? "fill-current text-primary" : undefined} /></Button>{tool(Link, t("browserSaveRecord"), () => onAction?.("save-record", url), showHome || !url)}{tool(ExternalLink, t("browserOpenExternal"), () => onAction?.("external", url), showHome || !url)}
    </div>
    <div className="relative min-h-0 flex-1 overflow-auto">
      {showHome ? <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-6 px-5 pb-12 pt-12"><div className="flex flex-col items-center gap-6"><img src="/notegen-app-icon.png" alt="NoteGen" width={56} height={56} className="size-14 rounded-2xl dark:invert" /><h1 className="text-2xl font-semibold">{t("browserStartTitle")}</h1><form className="w-full" onSubmit={event => { event.preventDefault(); navigate(search) }}><InputGroup className="h-12 rounded-full shadow-sm"><InputGroupAddon><Search /></InputGroupAddon><InputGroupInput type="search" aria-label={t("browserSearchPlaceholder")} placeholder={t("browserSearchPlaceholder")} value={search} onChange={event => setSearch(event.target.value)} /><InputGroupAddon align="inline-end"><InputGroupButton disabled={!search.trim()} aria-label={t("browserSearch")} onClick={() => navigate(search)}><ArrowRight /></InputGroupButton></InputGroupAddon></InputGroup></form><NoteGenReplicaActionMenu title={t("browserSearchEngine")} side="bottom" disabled={libraryLoading} trigger={<span className="flex items-center gap-2">{t("browserSearchEngine")}: {engine}</span>} items={["Bing", "Google", "百度", "DuckDuckGo"].map(name => ({ id: name, label: name, selected: engine === name, onSelect: () => setEngine(name) }))} /></div>
        {card(t("browserBookmarks"), libraryLoading ? <Skeleton className="h-20 motion-reduce:animate-none" /> : bookmarks.length ? <div className="grid grid-cols-3 gap-2">{bookmarks.map(bookmark => <Button key={bookmark.url} variant="ghost" className="h-24 min-w-0 flex-col gap-2" onClick={() => navigate(bookmark.url)}><Globe2 /><span className="max-w-full truncate">{bookmark.title}</span></Button>)}</div> : <Empty><EmptyHeader><EmptyTitle>{t("browserNoBookmarks")}</EmptyTitle></EmptyHeader></Empty>)}
        {card(t("browserHistory"), libraryLoading ? <Skeleton className="h-20 motion-reduce:animate-none" /> : history.length && !clearedHistory ? <div className="flex flex-col gap-2"><Button variant="ghost" size="sm" className="self-end" onClick={() => setClearedHistory(true)}>{t("browserClearHistory")}</Button>{history.map(entry => <Button key={entry.url} variant="ghost" className="h-auto min-w-0 justify-between py-2" onClick={() => navigate(entry.url)}><span className="min-w-0 truncate">{entry.title}</span><span className="text-xs text-muted-foreground">{entry.time}</span></Button>)}</div> : <Empty><EmptyHeader><EmptyTitle>{t("browserNoHistory")}</EmptyTitle></EmptyHeader></Empty>)}
      </div> : state === "loading" ? <div aria-busy="true" aria-label={t("browserLibraryLoading")} className="h-full bg-background" /> : state === "unavailable" ? <div className="flex h-full items-center justify-center p-6 text-muted-foreground">{t("browserUnavailable")}</div> : content}
      {state === "error" && <Alert variant="destructive" className="absolute inset-x-4 top-4 w-auto"><CircleAlert /><AlertDescription>{error || t("browserOpenFailed")}</AlertDescription></Alert>}
    </div>
  </div>
}

export type NoteGenPluginViewProps = { lang?: NoteGenReplicaLanguage; state?: "ready" | "loading" | "error" | "disabled" | "missing"; content?: ReactNode; error?: string; embedded?: boolean; onRetry?: () => void }
export function NoteGenPluginEditorPanel({ lang = "cn", state = "ready", content, error, embedded = false, onRetry }: NoteGenPluginViewProps) {
  const t = (key: string) => noteGenEditorSurfaceText(lang, `plugin.${key}`)
  return <div data-notegen-replica="plugin-editor-panel" data-plugin-view-state={state} aria-busy={state === "loading"} className="h-full min-h-0 min-w-0 overflow-auto bg-background text-sm text-foreground">
    {state === "disabled" || state === "missing" ? <Alert><AlertDescription>{t(state === "disabled" ? "notEnabled" : "missingResource")}</AlertDescription></Alert> : state === "error" && embedded ? <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert> : state === "error" ? <div className="p-4"><Alert variant="destructive"><AlertTitle>{lang === "en" ? "Unable to load plugin view" : "插件视图加载失败"}</AlertTitle><AlertDescription className="flex flex-col gap-2">{error}<Button variant="outline" size="sm" className="self-start" onClick={onRetry}>{lang === "en" ? "Retry" : "重试"}</Button></AlertDescription></Alert></div> : state === "loading" ? <div role="status" className="p-3 text-muted-foreground">{t("loading")}</div> : <div data-plugin-embedded={embedded || undefined} className="h-full">{content}</div>}
  </div>
}

/** Terminal plugin viewport with fixed output: no PTY, command input or running process. */
export function NoteGenTerminalPanel({ lang = "cn", output = "~/notes % pwd\n/workspace/notes\n~/notes % ", state = "ready", terminalState = "running", error, onRetry }: Omit<NoteGenPluginViewProps, "content"> & { output?: string; terminalState?: "running" | "ended" | "denied" | "error" }) {
  const message = terminalState === "ended" ? (lang === "en" ? "Terminal ended" : "终端已结束") : terminalState === "denied" ? (lang === "en" ? "Terminal permission is unavailable" : "没有获得终端权限") : terminalState === "error" ? error : undefined
  return <NoteGenPluginEditorPanel lang={lang} embedded state={state} error={error} onRetry={onRetry} content={<pre className="h-full overflow-auto whitespace-pre-wrap break-words py-2.5 pl-3 pr-0 text-[13px] leading-[1.25]" style={{ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Noto Sans Mono CJK SC",monospace' }}>{terminalState === "denied" ? "" : output}{message ? `\n${message}` : ""}</pre>} />
}
