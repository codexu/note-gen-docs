"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChartScatter, ChevronDown, CircleCheck, CircleX, ListOrdered, LoaderCircle, MessageSquare, Mic, Trash2, Volume2, ChevronsUpDown, RefreshCw, Check, Search } from "lucide-react"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "./ui/field"
import { Input } from "./ui/input"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./ui/input-group"
import { Slider } from "./ui/slider"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { TutorialMarker } from "../tutorial-marker"
import { modelSettingsCopy } from "./copy"
import { ResponsiveSelect } from "./select"
import type { DemoModel, DemoProvider, ModelType } from "./types"
import type { NoteGenReplicaLanguage } from "../types"

const modelTypeOptions = [
  { value: "chat", icon: MessageSquare },
  { value: "tts", icon: Volume2 },
  { value: "stt", icon: Mic },
  { value: "embedding", icon: ChartScatter },
  { value: "rerank", icon: ListOrdered },
] as const

function ModelSelect({ model, setModel, aiConfig, lang }: { model: string; setModel: (value: string) => void; aiConfig: DemoProvider; lang: NoteGenReplicaLanguage }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const t = modelSettingsCopy(lang)
  // Example model IDs only: never use a visitor's key to request /models.
  const [choices, setChoices] = useState(() => [...new Set(aiConfig.models.map(item => item.model).filter(Boolean))])
  const filtered = choices.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  const select = (value: string) => { setModel(value); setOpen(false) }
  if (!choices.length) return <InputGroup>
    <InputGroupInput aria-label={t("model")} value={model} placeholder={t("modelNamePlaceholder")} onChange={event => setModel(event.target.value)} />
    <InputGroupAddon align="inline-end"><InputGroupButton size="icon-xs" aria-label={t("refreshModelList")} onClick={() => setChoices([...new Set(aiConfig.models.map(item => item.model).filter(Boolean))])}><RefreshCw /></InputGroupButton></InputGroupAddon>
  </InputGroup>
  return <div className="ng-model-combobox relative"><Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild><Button variant="outline" role="combobox" aria-expanded={open} className="mt-2 w-full justify-between">{model || t("selectModel")}<ChevronsUpDown /></Button></PopoverTrigger>
    <PopoverContent portalled={false} align="start" className="w-[300px] gap-0 p-0">
      <div className="flex items-center gap-2 border-b px-3"><Search className="size-4 text-muted-foreground" /><Input aria-label={t("searchModels")} className="border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder={t("searchModels")} value={query} onChange={event => setQuery(event.target.value)} /><Button variant="ghost" size="icon-xs" aria-label={t("refreshModelList")} onClick={() => setQuery("")}><RefreshCw /></Button></div>
      <div className="ng-settings-scroll max-h-48 overflow-auto p-1" role="listbox">
        {filtered.map(value => <Button key={value} variant="ghost" role="option" aria-selected={model === value} className="w-full justify-between" onClick={() => select(value)}>{value}{model === value ? <Check /> : null}</Button>)}
        {query.trim() && !choices.includes(query.trim()) ? <Button variant="ghost" className="w-full justify-start" onClick={() => select(query.trim())}>Use &quot;{query.trim()}&quot;</Button> : null}
        {!filtered.length && !query.trim() ? <p className="p-3 text-sm text-muted-foreground">{t("noModelResults")}</p> : null}
      </div>
    </PopoverContent>
  </Popover></div>
}

export function ModelCard({ modelConfig, aiConfig, lang, open, onOpenChange, onUpdate, onDelete, onNotice, initialCheckState = "idle", tutorialMarks = false, checkMarkerNumber = 3 }: {
  modelConfig: DemoModel
  aiConfig: DemoProvider
  lang: NoteGenReplicaLanguage
  open: boolean
  onOpenChange: (value: boolean) => void
  onUpdate: <K extends keyof DemoModel>(id: string, key: K, value: DemoModel[K]) => void
  onDelete: (id: string) => void
  onNotice: (message: string) => void
  initialCheckState?: "idle" | "ok" | "error"
  tutorialMarks?: boolean
  checkMarkerNumber?: number
}) {
  const t = modelSettingsCopy(lang)
  const tc = (_key: string) => lang === "en" ? "Delete" : "删除"
  const fieldId = useId()
  const mobile = false
  const [checkState, setCheckState] = useState<"idle" | "checking" | "ok" | "error">(initialCheckState)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const signature = JSON.stringify([modelConfig, aiConfig.baseURL, aiConfig.apiKey])
  const previousSignature = useRef(signature)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => {
    if (previousSignature.current === signature) return
    previousSignature.current = signature
    if (timer.current) clearTimeout(timer.current)
    setCheckState("idle")
  }, [signature])
  const handleCheck = () => {
    setCheckState("checking")
    timer.current = setTimeout(() => {
      let validURL = false
      try { validURL = ["http:", "https:"].includes(new URL(aiConfig.baseURL).protocol) } catch { /* show demo failure */ }
      const valid = validURL && Boolean(aiConfig.apiKey.trim()) && Boolean(modelConfig.model.trim())
      setCheckState(valid ? "ok" : "error")
      onNotice(`${lang === "en" ? "Simulated result: " : "模拟结果："}${valid ? t("connectionSuccess") : t("connectionFailed")}`)
    }, 600)
  }
  const renderCheckIcon = () => checkState === "checking" ? <LoaderCircle className="animate-spin" /> : checkState === "ok" ? <CircleCheck className="text-primary" /> : checkState === "error" ? <CircleX className="text-destructive" /> : null
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <Card size="sm">
        {mobile ? (
          <CardHeader
            className="cursor-pointer gap-3"
            onClick={() => onOpenChange(!open)}
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <CardTitle className="min-w-0 flex-1 break-words text-base font-semibold">
                {modelConfig.model || t('newModel')}
              </CardTitle>
              <div onClick={(event) => event.stopPropagation()}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="group shrink-0"
                    aria-label={t('models')}
                  >
                    <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div
              className="flex items-center justify-between gap-3 border-t border-border/60 pt-3"
              onClick={(event) => event.stopPropagation()}
            >
              <Badge variant="secondary">
                {t(`modelType.${modelConfig.modelType}`)}
              </Badge>
              <ButtonGroup>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCheck}
                  disabled={!modelConfig.model || checkState === 'checking'}
                >
                  {renderCheckIcon()}
                  {tutorialMarks ? <TutorialMarker number={checkMarkerNumber}>{t('checkConnection')}</TutorialMarker> : t('checkConnection')}
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label={tc('delete')}
                  onClick={() => onDelete(modelConfig.id)}
                >
                  <Trash2 />
                </Button>
              </ButtonGroup>
            </div>
          </CardHeader>
        ) : (
          <CardHeader
            className="cursor-pointer items-center"
            onClick={() => onOpenChange(!open)}
          >
            <CardTitle className="flex min-w-0 items-center gap-2">
              <span className="truncate">{modelConfig.model || t('newModel')}</span>
              <Badge variant="secondary">
                {t(`modelType.${modelConfig.modelType}`)}
              </Badge>
            </CardTitle>
            <CardAction
              className="row-span-1 flex items-center gap-2 self-center"
              onClick={(event) => event.stopPropagation()}
            >
              <ButtonGroup>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCheck}
                  disabled={!modelConfig.model || checkState === 'checking'}
                >
                  {renderCheckIcon()}
                  {tutorialMarks ? <TutorialMarker number={checkMarkerNumber}>{t('checkConnection')}</TutorialMarker> : t('checkConnection')}
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label={tc('delete')}
                  onClick={() => onDelete(modelConfig.id)}
                >
                  <Trash2 />
                </Button>
              </ButtonGroup>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="group"
                  aria-label={t('models')}
                >
                  <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
            </CardAction>
          </CardHeader>
        )}

        <CollapsibleContent>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>{tutorialMarks ? <TutorialMarker number={1}>{t('model')}</TutorialMarker> : t('model')}</FieldLabel>
                <ModelSelect
                  model={modelConfig.model}
                  setModel={(model) => onUpdate(modelConfig.id, 'model', model)}
                  aiConfig={aiConfig}
                  lang={lang}
                />
              </Field>

              <Field>
                <FieldLabel>{tutorialMarks ? <TutorialMarker number={2}>{t('modelType.title')}</TutorialMarker> : t('modelType.title')}</FieldLabel>
                {mobile ? (
                  <ResponsiveSelect
                    title={t('modelType.title')}
                    value={modelConfig.modelType}
                    onValueChange={value => onUpdate(modelConfig.id, 'modelType', value as ModelType)}
                    options={modelTypeOptions.map(({ value }) => ({
                      value,
                      label: t(`modelType.${value}`),
                    }))}
                  />
                ) : (
                  <Tabs
                    className="w-full"
                    orientation="horizontal"
                    value={modelConfig.modelType}
                    onValueChange={(value) => onUpdate(modelConfig.id, 'modelType', value as ModelType)}
                  >
                    <TabsList className="grid h-8 w-full grid-cols-5">
                      {modelTypeOptions.map(({ value, icon: Icon }) => (
                        <TabsTrigger
                          key={value}
                          value={value}
                          title={t(`modelType.${value}`)}
                          className="min-w-0 !w-auto !justify-center px-1"
                        >
                          <Icon data-icon="inline-start" />
                          <span className="truncate">{t(`modelType.${value}`)}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                )}
              </Field>

              {modelConfig.modelType === 'chat' && (
                <Collapsible className="flex flex-col gap-3">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group w-full justify-between bg-transparent px-0 hover:bg-transparent data-[state=open]:bg-transparent"
                    >
                      <span>{t('advancedParameters')}</span>
                      <ChevronDown
                        data-icon="inline-end"
                        className="transition-transform group-data-[state=open]:rotate-180"
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <FieldGroup>
                          <Field>
                            <FieldLabel>{t('maxTokens')}</FieldLabel>
                            <Input
                              type="number"
                              min={1}
                              step={1}
                              value={modelConfig.maxTokens ?? ''}
                              placeholder={t('maxTokensPlaceholder')}
                              onChange={(event) => {
                                const value = event.target.value
                                onUpdate(modelConfig.id, 'maxTokens', value === '' ? undefined : Number(value))
                              }}
                            />
                            <FieldDescription>{t('maxTokensDesc')}</FieldDescription>
                          </Field>

                          <Field>
                            <FieldLabel>{t('contextWindow')}</FieldLabel>
                            <Input
                              type="number"
                              min={1024}
                              step={1024}
                              value={modelConfig.contextWindow ?? ''}
                              placeholder={t('contextWindowPlaceholder')}
                              onChange={(event) => {
                                const value = event.target.value
                                onUpdate(modelConfig.id, 'contextWindow', value === '' ? undefined : Number(value))
                              }}
                            />
                            <FieldDescription>{t('contextWindowDesc')}</FieldDescription>
                          </Field>

                          <Field>
                            <FieldLabel>{t('tokenLimitParam')}</FieldLabel>
                            <RadioGroup
                              value={modelConfig.tokenLimitParam || 'max_completion_tokens'}
                              onValueChange={(value) => onUpdate(
                                modelConfig.id,
                                'tokenLimitParam',
                                value as DemoModel['tokenLimitParam']
                              )}
                            >
                              <Field orientation="horizontal" className={mobile ? 'mobile-setting-token-option' : undefined}>
                                <RadioGroupItem
                                  value="max_completion_tokens"
                                  id={`max-completion-tokens-${fieldId}`}
                                />
                                <FieldLabel htmlFor={`max-completion-tokens-${fieldId}`}>
                                  max_completion_tokens
                                </FieldLabel>
                              </Field>
                              <Field orientation="horizontal" className={mobile ? 'mobile-setting-token-option' : undefined}>
                                <RadioGroupItem
                                  value="max_tokens"
                                  id={`max-tokens-${fieldId}`}
                                />
                                <FieldLabel htmlFor={`max-tokens-${fieldId}`}>
                                  max_tokens
                                </FieldLabel>
                              </Field>
                            </RadioGroup>
                            <FieldDescription>{t('tokenLimitParamDesc')}</FieldDescription>
                          </Field>

                          <Field>
                            <FieldLabel>Temperature</FieldLabel>
                            <div className="flex items-center gap-3">
                              <Slider
                                className="flex-1"
                                value={[modelConfig.temperature ?? 0.7]}
                                max={2}
                                step={0.01}
                                onValueChange={(value) => onUpdate(modelConfig.id, 'temperature', value[0])}
                              />
                              <Badge variant="outline">
                                {(modelConfig.temperature ?? 0.7).toFixed(2)}
                              </Badge>
                            </div>
                          </Field>

                          <Field>
                            <FieldLabel>Top P</FieldLabel>
                            <div className="flex items-center gap-3">
                              <Slider
                                className="flex-1"
                                value={[modelConfig.topP ?? 1.0]}
                                max={1}
                                min={0}
                                step={0.01}
                                onValueChange={(value) => onUpdate(modelConfig.id, 'topP', value[0])}
                              />
                              <Badge variant="outline">
                                {(modelConfig.topP ?? 1.0).toFixed(2)}
                              </Badge>
                            </div>
                          </Field>

                          <Field orientation="horizontal" className={mobile ? 'mobile-setting-inline-switch-field' : undefined}>
                            <FieldContent>
                              <FieldTitle>{t('enableStream')}</FieldTitle>
                              <FieldDescription>{t('enableStreamDesc')}</FieldDescription>
                            </FieldContent>
                            <Switch
                              checked={modelConfig.enableStream !== false}
                              onCheckedChange={(checked) => onUpdate(modelConfig.id, 'enableStream', checked)}
                            />
                          </Field>
                    </FieldGroup>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {modelConfig.modelType === 'tts' && (
                <Field>
                  <FieldLabel>{t('voice')}</FieldLabel>
                  <Input
                    value={modelConfig.voice || ''}
                    onChange={(event) => onUpdate(modelConfig.id, 'voice', event.target.value)}
                    placeholder={t('voicePlaceholder')}
                  />
                </Field>
              )}
            </FieldGroup>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
