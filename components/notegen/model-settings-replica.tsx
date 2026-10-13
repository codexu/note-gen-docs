"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Dialog as DialogPrimitive } from "radix-ui"
import { BotMessageSquare, Copy, Eye, EyeOff, KeyRound, LoaderCircle, Network, Plus, RefreshCw, Server, Settings2, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { TutorialMarker } from "./tutorial-marker"
import { AiHubMixLink } from "./aihubmix-link"
import { AIHUBMIX_SHARE_URL } from "@/src/config/providers"
import { settingsScrollbarCss } from "./settings-scrollbar"
import type { NoteGenReplicaLanguage } from "./types"
import { modelSettingsCopy } from "./model-settings/copy"
import { ModelCard } from "./model-settings/model-card"
import { DefaultModels } from "./model-settings/default-models"
import { ModelSettingsPortal } from "./model-settings/portal"
import { ResponsiveSelect } from "./model-settings/select"
import type { DemoModel, DemoProvider, ProviderTemplate, ProviderTemplateResponse } from "./model-settings/types"
import { Button } from "./model-settings/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./model-settings/ui/avatar"
import { Badge } from "./model-settings/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./model-settings/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./model-settings/ui/collapsible"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./model-settings/ui/empty"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./model-settings/ui/field"
import { Input } from "./model-settings/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./model-settings/ui/input-group"
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "./model-settings/ui/item"
import { Separator } from "./model-settings/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./model-settings/ui/tabs"

function demoProvider(): DemoProvider {
  return {
    key: "demo-aihubmix", templateKey: "aihubmix", title: "AIHubMix", baseURL: "https://aihubmix.com/v1",
    apiKey: "sk-notegen-demo-key", proxyMode: "inherit", headers: [],
    models: [
      { id: "demo-chat", model: "gpt-5.6-terra", modelType: "chat", temperature: 0.7, topP: 1, enableStream: true },
      { id: "demo-embedding", model: "text-embedding-3-small", modelType: "embedding" },
    ],
  }
}

function ProviderAvatar({ provider, small = false }: { provider: ProviderTemplate & { custom?: boolean }; small?: boolean }) {
  const name = provider.title.trim() || "AI"
  const hue = Math.abs(Array.from(name).reduce((hash, character) => Math.imul(hash, 31) + (character.codePointAt(0) || 0), 17)) % 360
  return <Avatar size={small ? "sm" : "default"}>
    <AvatarImage src={provider.icon} alt={provider.title} />
    <AvatarFallback className={provider.custom ? "text-base font-semibold" : undefined} style={provider.custom ? { backgroundColor: `hsl(${hue} 62% 42%)`, color: "white" } : undefined}>{Array.from(name).slice(0, provider.custom ? 1 : 2).join("").toUpperCase()}</AvatarFallback>
  </Avatar>
}

function ProviderTitle({ provider, count = 0, lang, linkName = false }: { provider: ProviderTemplate; count?: number; lang: NoteGenReplicaLanguage; linkName?: boolean }) {
  const reducedMotion = useReducedMotion()
  const hasModels = count > 0
  const transition = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.8 }
  return <motion.span initial="rest" whileHover="hovered" whileFocus="hovered" className="flex min-w-0 w-full items-center justify-start gap-1.5 text-left">
    <span className="min-w-0 flex-1 truncate" title={provider.title}>{linkName && /^AIHubMix(?:\s|$)/i.test(provider.title) ? <AiHubMixLink className="relative z-10">{provider.title}</AiHubMixLink> : provider.title}</span>
    <span className="grid h-5 shrink-0 items-center overflow-hidden">
      <motion.span className="col-start-1 row-start-1 inline-flex h-full items-center justify-self-end gap-1.5" variants={{ rest: { y: "0%", opacity: 1 }, hovered: { y: hasModels ? "-100%" : "0%", opacity: hasModels ? 0 : 1 } }} transition={hasModels ? transition : { duration: 0 }}>
        {provider.sponsored ? <Badge variant="secondary">{lang === "en" ? "Sponsor" : "赞助商"}</Badge> : null}
        {provider.promotion ? <span title={provider.promotion} className="shrink-0 whitespace-nowrap bg-clip-text text-xs font-medium text-transparent" style={{ backgroundImage: "linear-gradient(90deg,hsl(var(--promotion-gradient-start)),hsl(var(--promotion-gradient-middle)),hsl(var(--promotion-gradient-end)))" }}>{provider.promotion}</span> : null}
      </motion.span>
      {hasModels ? <motion.span className="pointer-events-none col-start-1 row-start-1 flex h-full items-center justify-self-end" variants={{ rest: { y: "100%", opacity: 0 }, hovered: { y: "0%", opacity: 1 } }} transition={transition}><Badge variant="secondary" className="tabular-nums" aria-label={modelSettingsCopy(lang)("modelCount", { count })}>{count}</Badge></motion.span> : null}
    </span>
  </motion.span>
}

export interface NoteGenModelSettingsReplicaProps {
  lang?: NoteGenReplicaLanguage
  initialTab?: "connection" | "models"
  initialProviders?: DemoProvider[]
  initialExpandedModels?: string[]
  initialNotice?: string
  initialCheckState?: "idle" | "ok" | "error"
  view?: "full" | "platform" | "connection" | "models" | "test"
  tutorialMarks?: boolean
  /** Frozen CDN snapshot for reusable scenes. Omit to load the live list. */
  providerTemplates?: ProviderTemplate[]
}

export function NoteGenModelSettingsReplica({ lang = "cn", initialTab = "connection", initialProviders, initialExpandedModels = [], initialNotice = "", initialCheckState = "idle", view = "full", tutorialMarks = false, providerTemplates }: NoteGenModelSettingsReplicaProps) {
  const t = modelSettingsCopy(lang)
  const id = useId()
  const sequence = useRef(0)
  const nextId = () => `${id}-${++sequence.current}`
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [providers, setProviders] = useState<DemoProvider[]>(() => initialProviders ?? [demoProvider()])
  const [selected, setSelected] = useState(() => initialProviders?.[0]?.key ?? "demo-aihubmix")
  const [templates, setTemplates] = useState<ProviderTemplate[]>(providerTemplates ?? [])
  const [loading, setLoading] = useState(!providerTemplates)
  const [failed, setFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  const [tab, setTab] = useState(initialTab)
  const [keyVisible, setKeyVisible] = useState(false)
  const [expanded, setExpanded] = useState<string[]>(initialExpandedModels)
  const [notice, setNotice] = useState(initialNotice)
  const [deletion, setDeletion] = useState<{ providerId: string; modelId?: string } | null>(null)

  useEffect(() => {
    if (providerTemplates) { setTemplates(providerTemplates); setLoading(false); return }
    const controller = new AbortController()
    let active = true
    setLoading(true)
    setFailed(false)
    fetch("/api/model-providers", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Provider list unavailable")
      const payload: ProviderTemplateResponse = await response.json()
      if (!Array.isArray(payload.providers)) throw new Error("Invalid provider list")
      if (active) setTemplates(payload.providers)
    }).catch(() => { if (active) setFailed(true) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false; controller.abort() }
  }, [providerTemplates, retry])

  const current = providers.find(provider => provider.key === selected)
  const template = current?.custom ? undefined : templates.find(item => item.key === current?.templateKey || item.baseURL === current?.baseURL)
  const displayProvider = (provider: DemoProvider): DemoProvider => {
    const match = provider.custom ? undefined : templates.find(item => item.key === provider.templateKey || item.baseURL === provider.baseURL)
    return { ...provider, icon: match?.icon ?? provider.icon, sponsored: match?.sponsored ?? provider.sponsored, promotion: match?.promotion ?? provider.promotion }
  }
  const count = (provider: DemoProvider) => provider.models.filter(model => model.model.trim()).length
  const sortedProviders = [...providers].sort((left, right) => count(right) - count(left))
  const available = templates.filter(item => !providers.some(provider => !provider.custom && (provider.templateKey === item.key || provider.baseURL === item.baseURL)))
  const update = (patch: Partial<DemoProvider>) => {
    if (current) setProviders(items => items.map(provider => provider.key === current.key ? { ...provider, ...patch } : provider))
  }
  const updateModel = <K extends keyof DemoModel,>(modelId: string, field: K, value: DemoModel[K]) => {
    if (current) update({ models: current.models.map(model => model.id === modelId ? { ...model, [field]: value } : model) })
  }
  const choose = (key: string) => { setSelected(key); setTab("connection"); setKeyVisible(false); setNotice("") }
  const addTemplate = (item: ProviderTemplate) => {
    const key = nextId()
    setProviders(items => [...items, { ...item, key, templateKey: item.key, apiKey: "", proxyMode: "inherit", headers: [], models: [] }])
    choose(key)
  }
  const addCustom = () => {
    const key = nextId()
    setProviders(items => [{ key, title: t("custom"), baseURL: "", custom: true, apiKey: "", proxyMode: "inherit", headers: [], models: [] }, ...items])
    choose(key)
  }
  const addModel = () => {
    if (!current) return
    const modelId = nextId()
    update({ models: [...current.models, { id: modelId, model: "", modelType: "chat", temperature: 0.7, topP: 1, enableStream: true }] })
    setExpanded(items => [...items, modelId])
  }
  const copyProvider = () => {
    if (!current) return
    const key = nextId()
    setProviders(items => [...items, { ...current, key, title: `${current.title} (Copy)`, models: current.models.map(model => ({ ...model, id: nextId() })), headers: current.headers.map(header => ({ ...header, id: nextId() })) }])
    choose(key)
  }
  const deleteConfirmed = () => {
    if (!deletion) return
    if (deletion.modelId) {
      setProviders(items => items.map(provider => provider.key === deletion.providerId ? { ...provider, models: provider.models.filter(model => model.id !== deletion.modelId) } : provider))
      setExpanded(items => items.filter(item => item !== deletion.modelId))
    } else {
      setProviders(items => items.filter(provider => provider.key !== deletion.providerId))
      choose(providers.find(provider => provider.key !== deletion.providerId)?.key ?? "")
    }
    setDeletion(null)
  }
  const proxyInvalid = current?.proxyMode === "custom" && !/^(https?|socks5h?):\/\/[^\s]+$/i.test(current.proxyURL || "")
  const providerOption = (provider: ProviderTemplate, configured = false) => <Item key={provider.key} asChild variant="outline" size="sm" className="group/provider relative flex-nowrap text-left data-[state=on]:border-primary data-[state=on]:bg-primary/5" data-state={configured && selected === provider.key ? "on" : "off"}>
    <motion.div initial="rest" whileHover="hovered" whileFocus="hovered">
      <button type="button" className="absolute inset-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50" aria-label={`${lang === "en" ? "Select" : "选择"} ${provider.title}`} onClick={() => configured ? choose(provider.key) : addTemplate(provider)} />
      <ItemMedia className="pointer-events-none shrink-0">{tutorialMarks && configured && selected === provider.key ? <TutorialMarker number={1} /> : null}<ProviderAvatar provider={provider} small /></ItemMedia>
      <ItemContent className="min-w-0"><ItemTitle className="min-w-0 w-full"><ProviderTitle provider={provider} count={configured ? count(provider as DemoProvider) : 0} lang={lang} linkName /></ItemTitle></ItemContent>
    </motion.div>
  </Item>

  const providerList = (<Card size="sm" className="@min-[1024px]/model-settings:sticky @min-[1024px]/model-settings:top-2"><CardHeader><CardTitle>{t("providerListTitle")}</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">
            <div className={view === "platform" ? "hidden" : "@min-[1024px]/model-settings:hidden"}><ResponsiveSelect title={t("selectConfig")} value={selected} onValueChange={value => { if (value.startsWith("template:")) { const item = templates.find(candidate => candidate.key === value.slice(9)); if (item) addTemplate(item) } else choose(value) }} options={[...sortedProviders.map(provider => ({ value: provider.key, label: <ProviderTitle provider={displayProvider(provider)} count={count(provider)} lang={lang} /> })), ...available.map(provider => ({ value: `template:${provider.key}`, label: <ProviderTitle provider={provider} lang={lang} /> }))]} /></div>
            <div className={cn("ng-settings-scroll max-h-[420px] flex-col gap-3 overflow-y-auto pr-1", view === "platform" ? "flex" : "hidden max-h-[52vh] @min-[1024px]/model-settings:flex")}><ItemGroup className="gap-2">{sortedProviders.map(provider => providerOption(displayProvider(provider), true))}</ItemGroup>
              {loading ? <div role="status" className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground"><LoaderCircle className="size-4 animate-spin" />{t("loadingProviderTemplates")}</div> : null}
              {failed ? <div role="alert" className="flex flex-col gap-2 px-2 text-xs text-destructive"><span>{lang === "en" ? "Unable to load platform templates." : "获取平台模板失败。"}</span><Button variant="outline" size="sm" onClick={() => setRetry(value => value + 1)}><RefreshCw />{lang === "en" ? "Retry" : "重试"}</Button></div> : null}
              <ItemGroup className="gap-3">{available.map(provider => providerOption(provider))}</ItemGroup>
            </div>
            <Separator /><Button className="w-full" onClick={addCustom}><Plus data-icon="inline-start" />{t("create")}</Button>
          </CardContent></Card>)
  const connectionForm = current ? (<Card><CardHeader><CardTitle>{t("connectionTitle")}</CardTitle><CardDescription>{t("connectionDesc")}</CardDescription></CardHeader><CardContent><FieldGroup>
                <Field><FieldLabel htmlFor={`${id}-url`}>{tutorialMarks ? <TutorialMarker number={1}>{t("apiEndpoint")}</TutorialMarker> : t("apiEndpoint")}</FieldLabel><Input id={`${id}-url`} value={current.baseURL} placeholder="https://api.example.com/v1" onChange={event => update({ baseURL: event.target.value })} /><FieldDescription>{t("modelBaseUrlDesc")}</FieldDescription></Field>
                <Field><FieldLabel htmlFor={`${id}-key`}>{tutorialMarks ? <TutorialMarker number={2}>API Key</TutorialMarker> : "API Key"}</FieldLabel><InputGroup><InputGroupAddon><KeyRound /></InputGroupAddon><InputGroupInput id={`${id}-key`} autoComplete="off" value={current.apiKey} type={keyVisible ? "text" : "password"} placeholder={t("apiKeyPlaceholder")} onChange={event => update({ apiKey: event.target.value })} /><InputGroupAddon align="inline-end"><InputGroupButton size="icon-xs" aria-label={t(keyVisible ? "hideApiKey" : "showApiKey")} onClick={() => setKeyVisible(value => !value)}>{keyVisible ? <EyeOff /> : <Eye />}</InputGroupButton></InputGroupAddon></InputGroup>{template?.apiKeyUrl ? <FieldDescription><a href={template.key === "aihubmix" ? AIHUBMIX_SHARE_URL : template.apiKeyUrl} target={template.key === "aihubmix" ? "_self" : "_blank"} rel="noopener noreferrer">{t("apiKeyUrl")}</a></FieldDescription> : null}</Field>
                <Field data-invalid={proxyInvalid || undefined}><FieldLabel>{tutorialMarks ? <TutorialMarker number={3}>{t("proxyModeTitle")}</TutorialMarker> : t("proxyModeTitle")}</FieldLabel><ResponsiveSelect title={t("proxyModeTitle")} value={current.proxyMode} onValueChange={value => update({ proxyMode: value as DemoProvider["proxyMode"] })} options={[{ value: "inherit", label: t("proxyModeInherit") }, { value: "direct", label: t("proxyModeDirect") }, { value: "custom", label: t("proxyModeCustom") }]} />{current.proxyMode === "custom" ? <Input aria-label={t("proxyModeTitle")} value={current.proxyURL || ""} placeholder={t("proxyURLPlaceholder")} aria-invalid={proxyInvalid} aria-describedby={proxyInvalid ? `${id}-proxy-error` : undefined} onChange={event => update({ proxyURL: event.target.value })} /> : null}{proxyInvalid ? <FieldError id={`${id}-proxy-error`}>{t("proxyURLInvalid")}</FieldError> : null}<FieldDescription>{t("proxyModeDesc")}</FieldDescription></Field>
                {!template && !loading ? <Collapsible><Card size="sm"><CardHeader><CardTitle>{t("customHeaders")}</CardTitle><CardDescription>{t("customHeadersDesc")}</CardDescription><CardAction><CollapsibleTrigger asChild><Button variant="ghost" size="sm">{t("manageHeaders")}</Button></CollapsibleTrigger></CardAction></CardHeader><CollapsibleContent><CardContent><FieldGroup>{current.headers.map(header => <Field orientation="horizontal" key={header.id}><Input aria-label={t("headerKey")} placeholder={t("headerKey")} value={header.key} onChange={event => update({ headers: current.headers.map(item => item.id === header.id ? { ...item, key: event.target.value } : item) })} /><Input aria-label={t("headerValue")} placeholder={t("headerValue")} value={header.value} onChange={event => update({ headers: current.headers.map(item => item.id === header.id ? { ...item, value: event.target.value } : item) })} /><Button variant="outline" size="icon-sm" aria-label={t("removeHeader")} onClick={() => update({ headers: current.headers.filter(item => item.id !== header.id) })}><X /></Button></Field>)}<Button variant="outline" onClick={() => update({ headers: [...current.headers, { id: nextId(), key: "", value: "" }] })}><Plus data-icon="inline-start" />{t("addHeader")}</Button></FieldGroup></CardContent></CollapsibleContent></Card></Collapsible> : null}
              </FieldGroup></CardContent></Card>) : null
  const modelCards = current ? (<div className="flex flex-col gap-3">{current.models.map(model => <ModelCard key={model.id} modelConfig={model} tutorialMarks={tutorialMarks} checkMarkerNumber={view === "test" ? 1 : 3} initialCheckState={initialProviders?.some(provider => provider.models.some(item => item.id === model.id)) ? initialCheckState : "idle"} aiConfig={current} lang={lang} open={expanded.includes(model.id)} onOpenChange={open => setExpanded(items => open ? [...new Set([...items, model.id])] : items.filter(item => item !== model.id))} onUpdate={updateModel} onDelete={modelId => setDeletion({ providerId: current.key, modelId })} onNotice={setNotice} />)}</div>) : null
  const modelList = current ? (<Card><CardHeader><CardTitle>{t("models")}</CardTitle><CardDescription>{t("modelsDesc")}</CardDescription><CardAction><Button size="sm" onClick={addModel}>{tutorialMarks ? <TutorialMarker number={4} /> : <Plus data-icon="inline-start" />}{t("addModel")}</Button></CardAction></CardHeader><CardContent>{current.models.length ? modelCards : <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><BotMessageSquare /></EmptyMedia><EmptyTitle>{t("noModelsTitle")}</EmptyTitle><EmptyDescription>{t("noModelsDesc")}</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm" onClick={addModel}>{tutorialMarks ? <TutorialMarker number={4} /> : <Plus data-icon="inline-start" />}{t("addModel")}</Button></EmptyContent></Empty>}</CardContent></Card>) : null
  const deleteDialog = (<DialogPrimitive.Root open={Boolean(deletion)} onOpenChange={open => { if (!open) setDeletion(null) }}><DialogPrimitive.Portal container={root}><DialogPrimitive.Overlay className="absolute inset-0 z-50 bg-black/50" /><DialogPrimitive.Content className="absolute top-1/2 left-1/2 z-50 flex w-[360px] max-w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl bg-background p-6 shadow-xl outline-none"><DialogPrimitive.Title className="text-base font-semibold">{lang === "en" ? "Confirm deletion" : "确认删除"}</DialogPrimitive.Title><DialogPrimitive.Description className="text-sm text-muted-foreground">{deletion?.modelId ? (lang === "en" ? "Delete this model?" : "确定要删除这个模型吗？") : t("deleteCustomModelConfirm")}</DialogPrimitive.Description><div className="flex justify-end gap-2"><DialogPrimitive.Close asChild><Button variant="outline">{lang === "en" ? "Cancel" : "取消"}</Button></DialogPrimitive.Close><Button variant="destructive" onClick={deleteConfirmed}>{lang === "en" ? "Delete" : "删除"}</Button></div></DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>)

  if (view !== "full") return <ModelSettingsPortal.Provider value={root}>
    <div ref={setRoot} data-notegen-replica={`model-${view}`} data-tutorial={tutorialMarks || undefined} className="ng-model-settings relative rounded-xl bg-background p-1 text-foreground">
      <style>{settingsScrollbarCss}</style>
      {view === "platform" ? providerList : view === "connection" ? connectionForm : view === "test" ? modelCards : modelList}
      {notice ? <div role="status" className="mt-3 flex items-center gap-2 rounded-lg border border-primary/40 bg-muted px-4 py-3 text-sm"><TutorialMarker number={2} />{notice}</div> : null}
      {deleteDialog}
    </div>
  </ModelSettingsPortal.Provider>

  return <ModelSettingsPortal.Provider value={root}>
    <div ref={setRoot} data-notegen-replica="model-settings" className="ng-model-settings @container/model-settings relative flex h-full min-h-0 flex-col bg-background text-foreground">
      <style>{settingsScrollbarCss}</style>
      <header className="shrink-0 px-8 pt-8 pb-6 pr-10"><div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5"><h2 className="flex w-full items-center gap-2 text-xl font-semibold tracking-tight"><BotMessageSquare className="size-6 text-muted-foreground" />{t("title")}</h2><p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{t("desc")}</p></div></header>
      <div className="ng-settings-scroll min-h-0 flex-1 overflow-y-auto px-8 pt-2 pb-8 pr-10"><div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {providers.length === 0 ? <DefaultModels lang={lang} /> : null}
        <div className="grid items-start gap-4 @min-[1024px]/model-settings:grid-cols-[260px_minmax(0,1fr)]">
          {providerList}
          {current ? <div className="flex min-w-0 flex-col gap-4">
            <Card><CardHeader><div className="flex min-w-0 items-center gap-3"><ProviderAvatar provider={displayProvider(current)} /><div className="min-w-0 flex-1"><CardTitle className="flex flex-wrap items-center gap-2">{current.custom || (!loading && !template) ? <Input aria-label={t("modelTitle")} className="h-8 w-52 max-w-full font-semibold" value={current.title} onChange={event => update({ title: event.target.value })} /> : <span className="truncate">{/^AIHubMix(?:\s|$)/i.test(current.title) ? <AiHubMixLink>{current.title}</AiHubMixLink> : current.title}</span>}<Badge variant={current.baseURL && count(current) > 0 ? "secondary" : "outline"}>{current.baseURL && count(current) > 0 ? t("providerReady") : t("providerIncomplete")}</Badge></CardTitle><CardDescription className="truncate">{current.baseURL || t("endpointMissing")}</CardDescription></div></div><CardAction className="flex gap-2"><Button variant="outline" size="sm" onClick={copyProvider}><Copy data-icon="inline-start" />{t("copyConfig")}</Button><Button variant="outline" size="icon-sm" aria-label={t("deleteCustomModel")} onClick={() => setDeletion({ providerId: current.key })}><Trash2 /></Button></CardAction></CardHeader><CardContent><div className="flex flex-wrap gap-2"><Badge variant="outline"><Server />{t("modelCount", { count: count(current) })}</Badge><Badge variant="outline"><Network />{t(current.proxyMode === "direct" ? "proxyModeDirect" : current.proxyMode === "custom" ? "proxyModeCustom" : "proxyModeInherit")}</Badge><Badge variant="outline">{template || current.templateKey ? t("templateProvider") : t("customProvider")}</Badge></div></CardContent></Card>
            <Tabs orientation="horizontal" value={tab} onValueChange={value => setTab(value as typeof tab)}>
              <TabsList className="grid h-9 w-full grid-cols-2"><TabsTrigger className="!justify-center" value="connection"><Settings2 data-icon="inline-start" />{t("connectionTab")}</TabsTrigger><TabsTrigger className="!justify-center" value="models"><BotMessageSquare data-icon="inline-start" />{t("modelsTab")}</TabsTrigger></TabsList>
              <TabsContent value="connection">{connectionForm}</TabsContent>
              <TabsContent value="models">{modelList}</TabsContent>
            </Tabs>
          </div> : <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><Server /></EmptyMedia><EmptyTitle>{t("selectProviderTitle")}</EmptyTitle><EmptyDescription>{t("selectProviderDesc")}</EmptyDescription></EmptyHeader></Empty>}
        </div>
      </div></div>
      {notice ? <div role="status" className="absolute right-4 bottom-4 z-40 flex max-w-[calc(100%-32px)] items-center gap-3 rounded-lg bg-popover px-4 py-3 text-sm shadow-md ring-1 ring-foreground/10">{notice}<Button variant="ghost" size="icon-xs" aria-label={lang === "en" ? "Close" : "关闭"} onClick={() => setNotice("")}><X /></Button></div> : null}
      {deleteDialog}
    </div>
  </ModelSettingsPortal.Provider>
}

export function NoteGenProviderListReplica(props: Omit<NoteGenModelSettingsReplicaProps, "view">) {
  return <NoteGenModelSettingsReplica {...props} view="platform" />
}

export function NoteGenConnectionFormReplica(props: Omit<NoteGenModelSettingsReplicaProps, "view">) {
  return <NoteGenModelSettingsReplica {...props} view="connection" />
}

export function NoteGenModelCardReplica(props: Omit<NoteGenModelSettingsReplicaProps, "view">) {
  return <NoteGenModelSettingsReplica {...props} view="models" />
}

export function NoteGenConnectionTestReplica(props: Omit<NoteGenModelSettingsReplicaProps, "view">) {
  return <NoteGenModelSettingsReplica {...props} view="test" />
}
