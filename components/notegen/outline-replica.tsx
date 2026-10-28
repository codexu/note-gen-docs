"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Heading1, Heading2, Heading3, ListTree, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { NoteGenReplicaLanguage } from "./types"
import { cn } from "@/lib/utils"

export type NoteGenOutlinePreferences = {
  placement: "editor" | "sidebar"
  position: "left" | "right"
  enabled: boolean
}

export const defaultNoteGenOutlinePreferences: NoteGenOutlinePreferences = { placement: "editor", position: "right", enabled: false }
export type NoteGenOutlineItem = { id: string; title: string; level: 1 | 2 | 3 }

export function noteGenOutlineFixture(lang: NoteGenReplicaLanguage): NoteGenOutlineItem[] {
  const titles = lang === "en"
    ? ["Weekend in Paris", "Itinerary overview", "Saturday · The Seine and Le Marais", "09:00—12:00　Seine walk", "12:15—13:30　Lunch", "15:00—17:30　Le Marais", "Before departure"]
    : ["周末杭州行程", "行程概览", "周六 · 西湖与象山", "09:00—12:00　西湖慢走", "12:15—13:30　午餐", "15:00—17:30　中国美院象山校区", "19:00　杭帮菜晚餐", "周日 · 法喜寺与天目里", "08:30—11:00　法喜寺", "13:30—16:30　天目里", "17:00　返程", "出发前确认", "雨天备选"]
  return titles.map((title, index) => ({ id: String(index), title, level: index === 0 ? 1 : (index >= 3 && index <= (lang === "en" ? 5 : 6)) || (lang !== "en" && index >= 8 && index <= 10) ? 3 : 2 }))
}

/** Local heading navigation only; no editor, store or file access. */
export function NoteGenOutlinePanel({ lang = "cn", items = [], documentAvailable = true, activeId, onSelect, className }: {
  lang?: NoteGenReplicaLanguage
  items?: NoteGenOutlineItem[]
  documentAvailable?: boolean
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}) {
  const [query, setQuery] = useState("")
  const [folded, setFolded] = useState<string[]>([])
  const en = lang === "en"
  let hiddenBelow: number | undefined
  const visible = items.filter(item => {
    if (query.trim()) return item.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
    if (hiddenBelow !== undefined && item.level > hiddenBelow) return false
    hiddenBelow = folded.includes(item.id) ? item.level : undefined
    return true
  })
  return <div data-notegen-replica="outline" className={cn("flex h-full min-h-0 flex-col overflow-hidden bg-background text-sm", className)}>
    {!documentAvailable ? <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center"><ListTree className="size-6 text-muted-foreground" /><strong className="font-medium">{en ? "Outline" : "大纲"}</strong><p className="text-muted-foreground">{en ? "Open a Markdown note in visual mode to view its outline." : "打开 Markdown 笔记并切换到可视化模式，即可查看大纲。"}</p></div> : <>
      <div className="relative m-2"><Search className="pointer-events-none absolute left-2.5 top-2 size-4 text-muted-foreground" /><Input aria-label={en ? "Search headings" : "搜索标题"} placeholder={en ? "Search headings..." : "搜索标题..."} value={query} onChange={event => setQuery(event.target.value)} className="h-8 pl-8 pr-8" />{query && <button type="button" onClick={() => setQuery("")} aria-label={en ? "Clear search" : "清空搜索"} className="absolute right-2 top-2"><X className="size-4" /></button>}</div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {visible.map(item => {
          const index = items.indexOf(item)
          const hasChildren = item.level !== 1 && Boolean(items[index + 1] && items[index + 1].level > item.level)
          const Icon = item.level === 1 ? Heading1 : item.level === 2 ? Heading2 : Heading3
          return <div key={item.id} className={cn("flex items-start rounded-md hover:bg-muted", activeId === item.id && "bg-muted text-primary")} style={{ paddingLeft: (item.level - 1) * 12 }}>
            {hasChildren ? <button type="button" aria-label={en ? `Toggle ${item.title}` : `展开或收起${item.title}`} aria-expanded={!folded.includes(item.id)} onClick={() => setFolded(current => current.includes(item.id) ? current.filter(id => id !== item.id) : [...current, item.id])} className="flex h-8 w-5 shrink-0 items-center justify-center">{folded.includes(item.id) ? <ChevronRight className="size-3" /> : <ChevronDown className="size-3" />}</button> : <span className="w-5 shrink-0" />}
            <button type="button" onClick={() => onSelect?.(item.id)} aria-current={activeId === item.id ? "location" : undefined} className="flex min-w-0 flex-1 items-start gap-1.5 py-1.5 pr-2 text-left"><Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1 break-all leading-5">{item.title}</span></button>
          </div>
        })}
        {!visible.length && <p className="p-4 text-center text-muted-foreground">{en ? "No headings found" : "没有找到标题"}</p>}
      </div>
    </>}
  </div>
}
