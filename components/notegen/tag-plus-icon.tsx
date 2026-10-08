import { createLucideIcon } from "lucide-react"

// TagPlus is available in the app's newer Lucide version, but not in this site's.
export const NoteGenTagPlusIcon = createLucideIcon("NoteGenTagPlus", [
  ["path", { d: "M16 13h6", key: "plus-horizontal" }],
  ["path", { d: "m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79", key: "tag-outline" }],
  ["path", { d: "M19 10v6", key: "plus-vertical" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "tag-hole" }],
])
