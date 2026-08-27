"use client"

import { Files, Highlighter, Palette } from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenWorkspace = "writing" | "records" | "canvas"

const workspaceTabs = [
  { id: "writing", cn: "写作", en: "Writing", icon: Files },
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
  className,
}: {
  lang: NoteGenReplicaLanguage
  value: NoteGenWorkspace
  onValueChange?: (workspace: NoteGenWorkspace) => void
  className?: string
}) {
  return (
    <div
      aria-label={lang === "en" ? "Switch workspace" : "切换工作区"}
      className={cn("flex flex-wrap items-center gap-0.5 rounded-xl border bg-background p-0.5", className)}
    >
      {workspaceTabs.map(({ id, cn: cnLabel, en, icon: Icon }) => {
        const active = value === id
        const label = lang === "en" ? en : cnLabel

        return (
          <button
            key={id}
            type="button"
            onClick={() => onValueChange?.(id)}
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
            {active ? <span className="whitespace-nowrap text-[10px]">{label}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
