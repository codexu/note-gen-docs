"use client"

import type { ReactNode } from "react"
import { Files, Highlighter, ListTree, Palette } from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenWorkspace = "writing" | "records" | "canvas"

export function NoteGenWorkspaceSidebar({ lang, value, onValueChange, actions, children, compact = false, showOutline = false, outlineActive = false, onOutlineSelect, className }: {
  lang: NoteGenReplicaLanguage
  value: NoteGenWorkspace
  onValueChange?: (workspace: NoteGenWorkspace) => void
  actions?: ReactNode
  children: ReactNode
  compact?: boolean
  showOutline?: boolean
  outlineActive?: boolean
  onOutlineSelect?: () => void
  className?: string
}) {
  return (
    <section data-notegen-replica="workspace-sidebar" className={cn("flex min-h-0 min-w-0 flex-col border-r", className)}>
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-2">
        <div className="min-w-0 flex-1 overflow-x-auto"><NoteGenWorkspaceSwitcher lang={lang} value={value} onValueChange={onValueChange} showOutline={showOutline} outlineActive={outlineActive} onOutlineSelect={onOutlineSelect} className={cn("w-fit shrink-0 flex-nowrap", compact && "[&>button]:gap-1 [&>button]:px-1.5")} /></div>
        {!(showOutline && outlineActive) && actions}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </section>
  )
}

const workspaceTabs = [
  { id: "writing", cn: "笔记", en: "Notes", icon: Files },
  { id: "records", cn: "记录", en: "Records", icon: Highlighter },
  { id: "canvas", cn: "画布", en: "Canvas", icon: Palette },
] satisfies Array<{
  id: NoteGenWorkspace
  cn: string
  en: string
  icon: typeof Files
}>

export function NoteGenWorkspaceSwitcher({
  lang,
  value,
  onValueChange,
  showOutline = false,
  outlineActive = false,
  onOutlineSelect,
  className,
}: {
  lang: NoteGenReplicaLanguage
  value: NoteGenWorkspace
  onValueChange?: (workspace: NoteGenWorkspace) => void
  showOutline?: boolean
  outlineActive?: boolean
  onOutlineSelect?: () => void
  className?: string
}) {
  return (
    <div
      aria-label={lang === "en" ? "Switch workspace" : "切换工作区"}
      className={cn("flex flex-wrap items-center gap-0.5 rounded-xl border bg-background p-0.5", className)}
    >
      {[...workspaceTabs, ...(showOutline ? [{ id: "outline" as const, cn: "大纲", en: "Outline", icon: ListTree }] : [])].map(({ id, cn: cnLabel, en, icon: Icon }) => {
        const active = id === "outline" ? outlineActive : !(showOutline && outlineActive) && value === id
        const label = lang === "en" ? en : cnLabel

        return (
          <button
            key={id}
            type="button"
            onClick={() => id === "outline" ? onOutlineSelect?.() : onValueChange?.(id)}
            aria-pressed={active}
            aria-label={label}
            className={cn(
              "relative flex h-7 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150 ease-out",
              active
                ? "gap-1.5 bg-muted px-3 text-primary"
                : "px-1.5 text-muted-foreground opacity-70 hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {active ? <span className="whitespace-nowrap text-sm">{label}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
