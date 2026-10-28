"use client"

import { useState } from "react"
import { FileLock, FilePlus2, FileText, Globe2, MoreHorizontal, Palette, PanelRight, Pin, Plus, Puzzle, Redo2, Undo2, X, type LucideIcon } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { NoteGenReplicaActionMenu } from "./replica-action-menu"
import { cn } from "@/lib/utils"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenEditorTab = { id: string; label: string; kind?: "file" | "record" | "canvas" | "browser" | "plugin" | "blank"; readOnly?: boolean; pinned?: boolean; preview?: boolean; recordType?: string; icon?: LucideIcon }
export type NoteGenEditorTabsProps = {
  lang?: NoteGenReplicaLanguage
  tabs?: NoteGenEditorTab[]
  activeId?: string
  pluginViews?: { id: string; label: string; icon?: LucideIcon }[]
  showUndoRedo?: boolean
  canUndo?: boolean
  canRedo?: boolean
  onTabsChange?: (tabs: NoteGenEditorTab[]) => void
  onTabChange?: (id: string) => void
  onAction?: (action: "undo" | "redo" | "new" | "file" | "record" | "canvas" | "browser" | "plugin" | "split" | "restart", tab?: NoteGenEditorTab) => void
}

export function NoteGenEditorTabs({ lang = "cn", tabs, activeId, pluginViews = [], showUndoRedo = true, canUndo = false, canRedo = false, onTabsChange, onTabChange, onAction }: NoteGenEditorTabsProps) {
  const en = lang === "en"
  const [localTabs, setLocalTabs] = useState<NoteGenEditorTab[]>([{ id: "design", label: en ? "Design principles.md" : "设计原则.md", kind: "file" }, { id: "readme", label: "README.md", kind: "file", preview: true }])
  const [localActive, setLocalActive] = useState("design")
  const items = tabs ?? localTabs
  const active = items.find(item => item.id === (activeId ?? localActive)) ?? items[0]
  const choose = (id: string) => { setLocalActive(id); onTabChange?.(id) }
  const update = (next: NoteGenEditorTab[]) => { if (tabs === undefined) setLocalTabs(next); onTabsChange?.(next) }
  const close = (tab: NoteGenEditorTab) => { const next = items.filter(item => item.id !== tab.id); update(next); if (active?.id === tab.id && next[0]) choose(next[0].id) }
  return <div data-notegen-replica="editor-tabs" className="flex h-12 shrink-0 items-center border-b bg-background text-sm">
    {showUndoRedo && active && (!active.kind || active.kind === "file" || active.kind === "canvas") && <div className="flex shrink-0 gap-0.5 border-r px-1"><Button variant="ghost" size="icon-sm" disabled={!canUndo || active.readOnly} aria-label={en ? "Undo" : "撤销"} onClick={() => onAction?.("undo", active)}><Undo2 /></Button><Button variant="ghost" size="icon-sm" disabled={!canRedo || active.readOnly} aria-label={en ? "Redo" : "重做"} onClick={() => onAction?.("redo", active)}><Redo2 /></Button></div>}
    <div className="flex h-full min-w-0 flex-1 items-center overflow-x-auto">{items.map(tab => {
      const selected = tab.id === active?.id
      const Icon = tab.icon ?? (tab.kind === "browser" ? Globe2 : tab.kind === "plugin" ? Puzzle : tab.kind === "canvas" ? Palette : tab.kind === "blank" ? FilePlus2 : tab.readOnly ? FileLock : FileText)
      return <div key={tab.id} className={cn("group relative flex h-12 max-w-56 shrink-0 items-center gap-1.5 px-3", selected ? "bg-muted/40 font-medium" : "text-muted-foreground hover:text-foreground")} data-tab-id={tab.id}>
        <button type="button" className="flex min-w-0 items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-pressed={selected} title={`${tab.label}${tab.readOnly ? (en ? " (Read only)" : "（只读）") : ""}`} onClick={() => choose(tab.id)}>{tab.kind === "record" ? <span className="rounded border px-1 text-[10px]">{tab.recordType ?? (en ? "Text" : "文本")}</span> : <Icon className={cn("size-4 shrink-0", selected && "text-primary")} />}{tab.pinned && <Pin className="size-3.5 text-primary" />}<span className={cn("truncate", tab.preview && "italic")}>{tab.label}</span></button>
        {!tab.pinned && <Button variant="ghost" size="icon-xs" aria-label={en ? `Close ${tab.label}` : `关闭 ${tab.label}`} onClick={() => close(tab)}><X /></Button>}
      </div>
    })}<NoteGenReplicaActionMenu title={en ? "New tab" : "新建标签页"} side="bottom" trigger={<span className="flex size-7 items-center justify-center"><Plus className="size-4" /></span>} items={[...(["new", "file", "record", "canvas", "browser"] as const).map((id, index) => ({ id, label: (en ? ["New tab", "New note", "New record", "New canvas", "New browser", "Plugin view"] : ["新建标签页", "新建笔记", "新建记录", "新建画布", "新建浏览器", "插件视图"])[index], onSelect: () => onAction?.(id) })), ...pluginViews.map(view => ({ id: view.id, label: view.label, icon: view.icon ? <view.icon /> : <Puzzle />, onSelect: () => onAction?.("plugin", { ...view, kind: "plugin" }) }))]} /></div>
    <div className="flex shrink-0 items-center gap-0.5 px-1"><Button variant="ghost" size="icon-sm" disabled={items.length < 2} aria-label={en ? "Split right" : "向右分屏"} onClick={() => onAction?.("split", active)}><PanelRight /></Button><NoteGenReplicaActionMenu title={en ? "Tab actions" : "标签页操作"} side="bottom" trigger={<span className="flex size-7 items-center justify-center"><MoreHorizontal className="size-4" /></span>} items={[{ id: "pin", label: active?.pinned ? (en ? "Unpin tab" : "取消固定") : (en ? "Pin tab" : "固定标签页"), disabled: !active, onSelect: () => { if (active) update(items.map(tab => tab.id === active.id ? { ...tab, pinned: !tab.pinned } : tab)) } }, ...(active?.kind === "plugin" ? [{ id: "restart", label: en ? "Restart plugin view" : "重启插件视图", onSelect: () => onAction?.("restart", active) }] : []), { id: "close-others", label: en ? "Close other tabs" : "关闭其他标签页", disabled: !active || items.length < 2, onSelect: () => { if (active) update(items.filter(tab => tab.id === active.id || tab.pinned)) } }]} /></div>
  </div>
}
