"use client"

import { NoteGenSkillsSettings } from "./skills-settings-replica"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenSkillEnvironment, NoteGenSkillsSettingsProps } from "./skills-settings-types"
import type { NoteGenReplicaLanguage } from "./types"
import { noteGenRecommendedSkillsFixture } from "./skills-settings-data"

export type NoteGenSkillsSettingsScene = "global" | "workspace" | "empty" | "discover" | "discover-loading" | "discover-error" | "discover-empty" | "install" | "inspect-loading" | "inspect-error" | "installing" | "environment" | "environment-loading" | "environment-missing" | "environment-installing" | "environment-error" | "mobile"

export function noteGenSkillEnvironmentFixture(missing = false): NoteGenSkillEnvironment {
  return { phase: "ready", python: { name: "Python", available: true, version: "3.12.7", managed: true }, node: { name: "Node.js", available: !missing, version: "22.10.0" }, npm: { name: "npm", available: !missing, version: "10.9.0" }, commands: [{ name: "soffice", available: !missing, version: "24.8.2" }, { name: "pdftoppm", available: !missing, version: "24.08.0" }, { name: "tesseract", available: !missing, version: "5.4.1" }] }
}

export function NoteGenSkillsSettingsScene({ lang = "cn", scene = "global", height = 650 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenSkillsSettingsScene; height?: number }) {
  const en = lang === "en"
  const isEnvironment = scene.startsWith("environment") || scene === "mobile"
  const isInstall = ["install", "inspect-loading", "inspect-error", "installing"].includes(scene)
  const environment = noteGenSkillEnvironmentFixture(scene === "environment-missing")
  if (scene === "environment-loading") environment.phase = "loading"
  if (scene === "environment-installing") environment.installing = "python"
  if (scene === "environment-error") { environment.phase = "error"; environment.error = en ? "Unable to inspect the runtime." : "无法检查运行环境。" }
  const props: NoteGenSkillsSettingsProps = {
    lang,
    defaultTab: scene === "workspace" ? "workspace" : scene.startsWith("discover") || isInstall ? "discover" : "global",
    globalSkills: scene === "empty" ? [] : [{ id: "meeting-notes", name: "meeting-notes", description: en ? "Summarize decisions and action items." : "整理会议决定与待办事项。" }, { id: "pdf", name: "pdf", description: en ? "Read and create PDF documents." : "读取和创建 PDF 文档。", scripts: ["python", "node"], pythonStatus: { available: scene !== "environment-missing", version: "3.12.7", managed: true }, environment }],
    projectSkills: [{ id: "review", name: "project-review", description: en ? "Review this project’s progress." : "整理当前项目进展。", enabled: false }],
    recommendations: scene === "discover-loading" || scene === "discover-error" || scene === "discover-empty" ? [] : noteGenRecommendedSkillsFixture(lang),
    discoveryState: scene === "discover-loading" ? "loading" : scene === "discover-error" ? "error" : "ready",
    discoveryError: en ? "The recommendations are temporarily unavailable." : "推荐列表暂时无法获取。",
    installSkillId: isInstall ? "docx" : undefined,
    installState: scene === "inspect-loading" ? "inspecting" : scene === "inspect-error" ? "error" : scene === "installing" ? "installing" : "ready",
    installError: en ? "The downloaded skill does not match the recommendation. Refresh recommendations and try again." : "下载的技能与推荐条目不一致，请刷新推荐后重试。",
    environmentSkillId: isEnvironment ? "pdf" : undefined,
    environment: scene === "environment-loading" ? { ...environment, python: { name: "Python", available: false }, commands: [] } : environment,
    platform: scene === "mobile" ? "mobile" : "desktop",
    showFileActions: scene !== "mobile",
  }
  return <div style={{ height }}><NoteGenReplicaFrame fill><NoteGenSkillsSettings key={`${lang}-${scene}`} {...props} /></NoteGenReplicaFrame></div>
}
