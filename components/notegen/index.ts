export * from "@/components/notegen/types"
export * from "@/components/notegen/replica-primitives"
export * from "@/components/notegen/window-title-bar"
export * from "@/components/notegen/workspace-switcher"
export * from "@/components/notegen/settings-replica"
export * from "@/components/notegen/app-shell-replica"
export * from "@/components/notegen/record-replica"
export * from "@/components/notegen/tag-management-replica"
export * from "@/components/notegen/file-editor-replica"
export * from "@/components/notegen/agent-replica"
export * from "@/components/notegen/skill-agent-replica"
export * from "@/components/notegen/canvas-replica"
export * from "@/components/notegen/mobile-replica"
export * from "@/components/notegen/feedback-replica"
export * from "@/components/notegen/organize-notes-replica"
export * from "@/components/notegen/doc-preview"
export * from "@/components/home/notegen-desktop-replica"

export { NoteGenChatEmpty, type NoteGenRecentConversation } from "./chat-empty-replica"

export { NoteGenSkillsSettings, type NoteGenInstalledSkill } from "./skills-settings-replica"
export { NoteGenSkillsSettingsDialog } from "./settings-replica"

export { NoteGenMcpAccessSettings, NoteGenMcpSettingsDialog, type NoteGenMcpAccessState } from "./mcp-access-replica"

export { NoteGenMcpRecordWorkspace } from "./mcp-record-workspace"

export { NoteGenKnowledgeSettings, NoteGenKnowledgeSettingsDialog, NoteGenKnowledgeSources } from "./knowledge-replica"
export type { NoteGenKnowledgeSource } from "./knowledge-replica"

export { NoteGenMemoriesSettings, NoteGenMemoriesSettingsDialog } from "./memories-replica"
export type { NoteGenMemoryEntry, NoteGenMemoriesProps, NoteGenMemoryKind, NoteGenMemoryStatus } from "./memories-replica"
