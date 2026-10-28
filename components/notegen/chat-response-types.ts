import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export type NoteGenResponseAction = { id: string; label: string; icon?: LucideIcon; available?: boolean } & (
  | { type: "copy"; text: string }
  | { type: "open-note"; path: string }
  | { type: "open-source"; sourceKey: string }
  | { type: "open-artifact" | "save-artifact"; path: string }
)
export type NoteGenResponseActionState = "idle" | "pending"
export type NoteGenResponseFeedback = { kind: "success" | "error"; title: string; description?: string }
export type NoteGenArtifactState = "idle" | "opening" | "saving"
export type NoteGenResponseTone = "default" | "secondary" | "outline" | "success" | "warning" | "info" | "destructive"
export type NoteGenResponsePanel = { id: string; title: string; content: NoteGenResponseBlock[]; icon?: LucideIcon }

/** Typed presentation data. This is not the application's generated JSON spec. */
export type NoteGenResponseBlock = { id: string } & (
  | { type: "text"; text: string }
  | { type: "content"; content: ReactNode }
  | { type: "heading"; text: string; level?: 2 | 3 | 4; icon?: LucideIcon }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; columns: string[]; rows: string[][] }
  | { type: "stack"; gap?: "sm" | "md" | "lg"; children: NoteGenResponseBlock[] }
  | { type: "card"; title?: string; description?: string; variant?: "plain" | "outlined"; icon?: LucideIcon; children: NoteGenResponseBlock[] }
  | { type: "stat"; label: string; value: string; description?: string; icon?: LucideIcon }
  | { type: "badge"; text: string; tone?: NoteGenResponseTone; icon?: LucideIcon }
  | { type: "alert"; title: string; description?: string; tone?: "default" | "warning" | "destructive"; children?: NoteGenResponseBlock[] }
  | { type: "key-value"; title?: string; items: { label: string; value: string; icon?: LucideIcon }[] }
  | { type: "steps"; items: { title: string; description?: string; status?: "pending" | "current" | "done"; icon?: LucideIcon }[] }
  | { type: "timeline"; items: { title: string; time?: string; description?: string; icon?: LucideIcon }[] }
  | { type: "tabs"; items: NoteGenResponsePanel[]; defaultIndex?: number }
  | { type: "accordion"; items: NoteGenResponsePanel[]; defaultOpen?: string[] }
  | { type: "progress"; label: string; value: number; description?: string }
  | { type: "quote"; text: string; attribution?: string; source?: { key: string; label: string; available?: boolean } }
  | { type: "sources"; title?: string; items: { key: string; label: string; available?: boolean }[] }
  | { type: "note-link"; path: string; label?: string; available?: boolean }
  | { type: "artifact"; path: string; label?: string; available?: boolean }
  | { type: "actions"; actions: NoteGenResponseAction[] }
  | { type: "code"; code: string; language: string; title?: string }
  | { type: "math"; latex: string; rendered?: ReactNode; label?: string; failed?: boolean }
  | { type: "image"; alt: string; caption?: string; preview?: ReactNode; failed?: boolean }
  | { type: "separator" }
)
