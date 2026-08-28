"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  FolderOpen,
  Image,
  Link,
  ListChecks,
  Mic,
  Pencil,
  Settings2,
  X,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

type OrganizeStep = "template" | "records" | "settings"

const stepOrder: OrganizeStep[] = ["template", "records", "settings"]

const records = [
  { icon: Mic, cn: "录音", en: "Audio", titleCn: "西湖边想走慢一点", titleEn: "A slower walk by the Seine", timeCn: "10:42", timeEn: "10:42" },
  { icon: Link, cn: "链接", en: "Link", titleCn: "杭州周末餐厅收藏", titleEn: "Paris weekend restaurants", timeCn: "09:18", timeEn: "09:18" },
  { icon: Image, cn: "图片", en: "Image", titleCn: "北山街路线与雨天备选", titleEn: "Route and rainy-day alternatives", timeCn: "昨天", timeEn: "Yesterday" },
]

export function NoteGenOrganizeNotesReplica({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const [step, setStep] = useState<OrganizeStep>("template")
  const [selectedRecords, setSelectedRecords] = useState([true, true, true])
  const stepIndex = stepOrder.indexOf(step)
  const isEnglish = lang === "en"
  const steps = [
    { id: "template" as const, icon: FileText, title: isEnglish ? "Organize template" : "整理模板", description: isEnglish ? "Structure and record range" : "结构与记录范围" },
    { id: "records" as const, icon: ListChecks, title: isEnglish ? "Select records" : "选择记录", description: isEnglish ? "Choose material for this run" : "筛选本次使用的素材" },
    { id: "settings" as const, icon: Settings2, title: isEnglish ? "Generation settings" : "生成设置", description: isEnglish ? "Output and source handling" : "输出与素材设置" },
  ]

  function goNext() {
    setStep(stepOrder[Math.min(stepIndex + 1, stepOrder.length - 1)])
  }

  function goPrevious() {
    setStep(stepOrder[Math.max(stepIndex - 1, 0)])
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl border bg-muted/30 p-4">
      <div className="absolute inset-0 grid grid-cols-[220px_1fr_280px] opacity-45">
        <div className="border-r bg-background/70" />
        <div className="bg-background/50" />
        <div className="border-l bg-background/70" />
      </div>
      <section
        aria-label={isEnglish ? "Organize records dialog" : "整理记录弹窗"}
        className="relative z-10 flex h-[610px] w-full max-w-[980px] flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">{isEnglish ? "Organize as" : "将记录整理成..."}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{stepIndex + 1}/3</Badge>
            <Button aria-label={isEnglish ? "Close" : "关闭"} size="icon" variant="ghost"><X /></Button>
          </div>
        </header>

        <nav aria-label={isEnglish ? "Organization steps" : "整理步骤"} className="grid shrink-0 grid-cols-3 gap-2 border-b bg-muted/20 px-5 py-4">
          {steps.map((item, index) => {
            const Icon = item.icon
            const isActive = item.id === step
            const isComplete = index < stepIndex
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex min-w-0 items-center gap-3 rounded-md border p-3 text-left transition-colors",
                  isActive && "border-primary bg-background shadow-sm",
                  !isActive && isComplete && "bg-background/80",
                  !isActive && !isComplete && "border-transparent"
                )}
                onClick={() => setStep(item.id)}
              >
                <span className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  !isActive && isComplete && "border-primary bg-primary/10 text-primary",
                  !isActive && !isComplete && "bg-background text-muted-foreground"
                )}>
                  {isComplete ? <Check className="size-4" /> : index + 1}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-medium"><Icon className="size-4 shrink-0" /><span className="truncate">{item.title}</span></span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description}</span>
                </span>
              </button>
            )
          })}
        </nav>

        <main className="min-h-0 flex-1 overflow-hidden px-6 py-5">
          {step === "template" ? <TemplateStep lang={lang} /> : null}
          {step === "records" ? <RecordsStep lang={lang} selectedRecords={selectedRecords} setSelectedRecords={setSelectedRecords} /> : null}
          {step === "settings" ? <SettingsStep lang={lang} /> : null}
        </main>

        <footer className="flex shrink-0 items-center justify-end gap-2 border-t px-6 py-4">
          {stepIndex > 0 ? <Button variant="ghost" onClick={goPrevious}><ArrowLeft data-icon="inline-start" />{isEnglish ? "Previous" : "上一步"}</Button> : null}
          {step === "template" ? <Button onClick={() => setStep("settings")}><Zap data-icon="inline-start" />{isEnglish ? "Quick organize" : "快速整理"}</Button> : null}
          {stepIndex < 2 ? <Button onClick={goNext}>{isEnglish ? "Next" : "下一步"}<ArrowRight data-icon="inline-end" /></Button> : <Button>{isEnglish ? "Start organizing" : "开始整理"}</Button>}
        </footer>
      </section>
    </div>
  )
}

function TemplateStep({ lang }: { lang: NoteGenReplicaLanguage }) {
  const isEnglish = lang === "en"
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto pr-1">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm font-medium" htmlFor="organize-template-replica">{isEnglish ? "Select template" : "选择模板"}</label>
          <Button size="sm" variant="outline"><Pencil data-icon="inline-start" />{isEnglish ? "Manage template" : "管理模板"}</Button>
        </div>
        <Select defaultValue="travel">
          <SelectTrigger id="organize-template-replica" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent><SelectGroup>
            <SelectItem value="none">{isEnglish ? "No template" : "不使用模板"}</SelectItem>
            <SelectItem value="travel">{isEnglish ? "Travel plan" : "旅行计划"}</SelectItem>
            <SelectItem value="weekly">{isEnglish ? "Weekly review" : "每周回顾"}</SelectItem>
          </SelectGroup></SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="organize-range-replica">{isEnglish ? "Record range" : "记录选择范围"}</label>
        <Select defaultValue="week">
          <SelectTrigger id="organize-range-replica" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent><SelectGroup>
            <SelectItem value="all">{isEnglish ? "All records" : "全部记录"}</SelectItem>
            <SelectItem value="week">{isEnglish ? "Last 7 days" : "最近 7 天"}</SelectItem>
            <SelectItem value="month">{isEnglish ? "Last 30 days" : "最近 30 天"}</SelectItem>
          </SelectGroup></SelectContent>
        </Select>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="organize-content-replica">{isEnglish ? "Template content" : "模板内容"}</label>
        <Textarea
          id="organize-content-replica"
          className="min-h-40 flex-1 resize-none"
          defaultValue={isEnglish ? "Organize the selected records into a two-day itinerary. Group places by distance, retain source links, and add booking reminders and rainy-day alternatives." : "将选中的记录整理为两日行程。按地点距离组织路线，保留来源链接，并补充预约提醒和雨天备选方案。"}
        />
      </div>
    </div>
  )
}

function RecordsStep({ lang, selectedRecords, setSelectedRecords }: { lang: NoteGenReplicaLanguage; selectedRecords: boolean[]; setSelectedRecords: (value: boolean[]) => void }) {
  const isEnglish = lang === "en"
  const selectedCount = selectedRecords.filter(Boolean).length
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{isEnglish ? "Audio 1" : "录音 1"}</Badge>
          <Badge variant="outline">{isEnglish ? "Link 1" : "链接 1"}</Badge>
          <Badge variant="outline">{isEnglish ? "Image 1" : "图片 1"}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="travel">
            <SelectTrigger size="sm" className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent><SelectGroup>
              <SelectItem value="all">{isEnglish ? "All tags" : "全部标签"}</SelectItem>
              <SelectItem value="travel">{isEnglish ? "Paris trip" : "杭州旅行"}</SelectItem>
            </SelectGroup></SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={() => setSelectedRecords(records.map(() => true))}>{isEnglish ? "Select all" : "全选"}</Button>
          <Button size="sm" variant="outline" onClick={() => setSelectedRecords(records.map(() => false))}>{isEnglish ? "Clear" : "清空"}</Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{isEnglish ? `${selectedCount}/${records.length} selected. Uncheck records AI should not use.` : `已选 ${selectedCount}/${records.length} 条。取消勾选不希望 AI 使用的记录。`}</p>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-1">
        {records.map((record, index) => {
          const Icon = record.icon
          return (
            <div key={record.titleCn} className={cn("flex items-start gap-3 rounded-lg border bg-background p-3", !selectedRecords[index] && "opacity-60")}>
              <ReplicaCheckbox checked={selectedRecords[index]} onCheckedChange={(checked) => { const next = [...selectedRecords]; next[index] = checked; setSelectedRecords(next) }} />
              <span className="flex min-w-0 flex-1 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted"><Icon className="size-4 text-muted-foreground" /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-muted-foreground">{isEnglish ? record.en : record.cn}</span><span className="text-xs text-muted-foreground">{isEnglish ? record.timeEn : record.timeCn}</span></span>
                  <span className="mt-1 block truncate text-sm font-medium">{isEnglish ? record.titleEn : record.titleCn}</span>
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SettingsStep({ lang }: { lang: NoteGenReplicaLanguage }) {
  const isEnglish = lang === "en"
  return (
    <div className="grid h-full grid-cols-2 gap-4 overflow-y-auto p-1 pr-2">
      <div className="col-span-2 flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="organize-folder-replica">{isEnglish ? "Save location" : "保存位置"}</label>
        <Button id="organize-folder-replica" className="w-full justify-start" variant="outline"><FolderOpen data-icon="inline-start" />{isEnglish ? "Travel / 2026" : "旅行 / 2026"}</Button>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="organize-title-replica">{isEnglish ? "Article title" : "文章标题"}</label>
        <Input id="organize-title-replica" defaultValue={isEnglish ? "Paris weekend itinerary" : "杭州周末行程"} />
      </div>
      <SettingSwitch label={isEnglish ? "Include images" : "包含图片"} defaultChecked />
      <SettingSwitch label={isEnglish ? "Keep reference links" : "保留引用链接"} defaultChecked />
      <SettingSwitch label={isEnglish ? "Remove thinking content" : "移除记录中的思考"} defaultChecked />
      <div />
      <div className="col-span-2 flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="organize-requirement-replica">{isEnglish ? "Additional requirements" : "补充要求"}</label>
        <Textarea id="organize-requirement-replica" className="min-h-24 resize-none" placeholder={isEnglish ? "Add any specific requirements for this organization" : "可补充这次整理的特别要求"} />
      </div>
    </div>
  )
}

function SettingSwitch({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false)
  return <div className="flex items-center justify-between gap-3 rounded-md border bg-background p-3 text-sm font-medium"><span>{label}</span><ReplicaSwitch checked={checked} onCheckedChange={setChecked} /></div>
}

function ReplicaCheckbox({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      {checked ? <Check className="size-3.5" /> : null}
    </button>
  )
}

function ReplicaSwitch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn("flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent p-px shadow-xs transition-colors", checked ? "bg-primary" : "bg-input")}
      onClick={() => onCheckedChange(!checked)}
    >
      <span className={cn("size-4 rounded-full bg-background transition-transform", checked && "translate-x-[calc(100%-2px)]")} />
    </button>
  )
}
