import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenPluginPermission = { id: string; description: string; optional?: boolean; granted?: boolean; scope?: "workspace-paths" | "network-origins" | "none"; paths?: string }
export type NoteGenPluginSetting = { key: string; title: string; description?: string; scope?: "device" | "workspace"; type: "boolean" | "string" | "number" | "select"; value: string | number | boolean; options?: string[] }
export type NoteGenPluginFixture = {
  id: string
  name: string
  description: string
  author: string
  version: string
  source?: "marketplace" | "development"
  verified?: boolean
  enablement?: "disabled" | "workspace" | "all-workspaces"
  runtime?: "inactive" | "activating" | "active" | "failed" | "stopping" | "quarantined"
  needsReview?: boolean
  revoked?: string
  failure?: { code: string; message: string; count: number }
  permissions?: NoteGenPluginPermission[]
  settings?: NoteGenPluginSetting[]
  displays?: { id: string; title: string; visible: boolean }[]
  latestVersion?: string
  previousVersion?: string
  compatible?: boolean
  minAppVersion?: string
  developmentPath?: string
  publisher?: string
  license?: string
  digest?: string
}
export type NoteGenPluginAction = { type: "install" | "update" | "rollback" | "uninstall" | "uninstall-data" | "enable" | "disable" | "clear-failure" | "reload"; plugin: NoteGenPluginFixture } | { type: "refresh" | "refresh-market" | "import" | "clear-logs"; path?: string }
export type NoteGenPluginSettingsProps = {
  lang?: NoteGenReplicaLanguage
  plugins?: NoteGenPluginFixture[]
  catalog?: NoteGenPluginFixture[]
  tab?: "installed" | "market" | "updates" | "developer"
  defaultTab?: "installed" | "market" | "updates" | "developer"
  developerMode?: boolean
  platform?: "desktop" | "mobile"
  status?: "ready" | "loading" | "error"
  error?: string
  marketState?: "ready" | "loading" | "error" | "stale"
  marketError?: string
  defaultExpanded?: string[]
  reviewPluginId?: string
  reviewMode?: "permissions" | "install"
  busyPluginId?: string
  logs?: { id: string; time: string; plugin: string; level: "info" | "warning" | "error"; message: string }[]
  loadingRotation?: number
  onTabChange?: (tab: "installed" | "market" | "updates" | "developer") => void
  onAction?: (action: NoteGenPluginAction) => void | Promise<void>
  onPluginsChange?: (plugins: NoteGenPluginFixture[]) => void
}
