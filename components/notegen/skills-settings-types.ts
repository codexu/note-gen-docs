import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenSkillScope = "global" | "project"
export type NoteGenSkillsTab = "global" | "workspace" | "discover"
export type NoteGenSkillCommand = { name: string; available: boolean; version?: string }
export type NoteGenSkillEnvironment = {
  phase?: "loading" | "ready" | "error"
  /** Retain a previous inspection while refreshing or displaying an error. */
  loaded?: boolean
  python: NoteGenSkillCommand & { managed?: boolean }
  node: NoteGenSkillCommand
  npm: NoteGenSkillCommand
  commands: NoteGenSkillCommand[]
  error?: string
  installing?: "python" | "node"
}
export type NoteGenInstalledSkill = {
  id?: string
  name: string
  description: string
  enabled?: boolean
  scripts?: ("python" | "node" | "shell")[]
  pythonStatus?: { available: boolean; version?: string; managed?: boolean } | null
  environment?: NoteGenSkillEnvironment
}
export type NoteGenRecommendedSkill = {
  id: string
  name: string
  description: string
  author: string
  sourceUrl: string
  fileCount?: number
  hasScripts?: boolean
  scripts?: ("python" | "node" | "shell")[]
  warnings?: string[]
}
export type NoteGenSkillsAction = { type: "source"; sourceUrl: string } | { type: "directory" | "import-folder" | "import-zip"; scope: NoteGenSkillScope }
export type NoteGenSkillsSettingsProps = {
  lang?: NoteGenReplicaLanguage
  projectSkills?: NoteGenInstalledSkill[]
  globalSkills?: NoteGenInstalledSkill[]
  layout?: "tabs" | "legacy"
  tab?: NoteGenSkillsTab
  defaultTab?: NoteGenSkillsTab
  onTabChange?: (tab: NoteGenSkillsTab) => void
  showFileActions?: boolean
  platform?: "desktop" | "mobile"
  recommendations?: NoteGenRecommendedSkill[]
  discoveryState?: "ready" | "loading" | "error"
  discoveryError?: string
  discoveryCount?: number | null
  onRefresh?: () => void
  installSkillId?: string
  installState?: "inspecting" | "ready" | "error" | "installing"
  installError?: string
  installScope?: NoteGenSkillScope
  onInstall?: (skill: NoteGenRecommendedSkill, scope: NoteGenSkillScope) => void | Promise<void>
  onRetryInstall?: () => void
  environmentSkillId?: string
  environment?: NoteGenSkillEnvironment
  onEnvironmentAction?: (action: "refresh" | "python" | "node", skill: NoteGenInstalledSkill, scope: NoteGenSkillScope) => void | Promise<void>
  onDownloadRuntime?: (runtime: "Python" | "Node.js" | "LibreOffice") => void
  onSkillsChange?: (skills: { global: NoteGenInstalledSkill[]; project: NoteGenInstalledSkill[] }) => void
  onAction?: (action: NoteGenSkillsAction) => void | Promise<void>
  loadingRotation?: number
}
