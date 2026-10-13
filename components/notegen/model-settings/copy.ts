import messages from "./messages.json"
import type { NoteGenReplicaLanguage } from "../types"

export function modelSettingsCopy(lang: NoteGenReplicaLanguage) {
  return (key: string, values?: Record<string, string | number>): string => {
    let value: unknown = messages[lang]
    for (const part of key.split(".")) {
      value = value && typeof value === "object" ? (value as Record<string, unknown>)[part] : undefined
    }
    return typeof value === "string" ? value.replace(/\{(\w+)\}/g, (_, name: string) => String(values?.[name] ?? `{${name}}`)) : key
  }
}
