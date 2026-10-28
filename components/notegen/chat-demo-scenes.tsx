"use client"

import { NoteGenAgentPanel } from "./agent-replica"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenComposerMenu } from "./chat-composer-replica"
import type { NoteGenTraceEvent, NoteGenTimelineProps } from "./chat-timeline-replica"
import type { NoteGenQuestion } from "./chat-interaction-replica"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenChatScene = "add" | "commands" | "resources" | "skills" | "tools" | "model" | "mcp" | "permission" | "running" | "approval" | "questions" | "history" | "stopped" | "error"

export function noteGenQuestionFixture(lang: NoteGenReplicaLanguage): NoteGenQuestion[] {
  const en = lang === "en"
  return [
    { id: "format", question: en ? "What format should the project review use?" : "项目复盘采用哪种形式？", options: [{ label: en ? "Short summary" : "简短摘要", description: en ? "Decisions and next steps." : "只保留结论与下一步。" }, { label: en ? "Detailed report" : "详细报告", description: en ? "Include background and supporting evidence." : "包含背景、过程与依据。" }] },
    { id: "sections", question: en ? "Which sections should be included?" : "需要包含哪些部分？", multiSelect: true, options: [{ label: en ? "Progress" : "本周进展" }, { label: en ? "Risks" : "风险问题" }, { label: en ? "Next steps" : "下一步安排" }] },
  ]
}

export function noteGenChatTraceFixture(scene: NoteGenChatScene, lang: NoteGenReplicaLanguage): NoteGenTraceEvent[] {
  const en = lang === "en"
  const tools: NoteGenTraceEvent[] = [{ id: "search", kind: "tool", tool: "search", title: en ? "Search project notes" : "搜索项目笔记", status: "done", duration: "0.8s", input: "project review", output: en ? "Found 3 relevant notes." : "找到 3 篇相关笔记。" }, { id: "read", kind: "tool", tool: "file", title: en ? "Read feedback" : "读取使用反馈", status: "done", duration: "0.4s", input: "notes/feedback.md", output: en ? "The prototype needs a simpler onboarding flow." : "原型需要更简洁的引导流程。" }]
  if (scene === "approval" || scene === "history") return [...tools, { id: "approval", kind: "approval", title: en ? "Update project review" : "更新项目复盘", status: scene === "approval" ? "pending" : "done", approval: { title: en ? "Update note" : "更新笔记", summary: "notes/project-review.md", fields: [{ label: en ? "File path" : "文件路径", value: "notes/project-review.md" }, { label: en ? "File content" : "文件内容", value: en ? "# Project review\n\nGather feedback and refine the onboarding flow." : "# 项目复盘\n\n补充真实反馈，完善新手引导。", format: "content" }], canApproveForSession: true, state: scene === "history" ? "approved" : undefined } }]
  if (scene === "questions") return [...tools, { id: "questions", kind: "question", title: en ? "Clarify the review format" : "确认复盘形式", status: "pending", question: { questions: noteGenQuestionFixture(lang) } }]
  if (scene === "error") return [...tools, { id: "error", kind: "error", title: en ? "Unable to read the source" : "无法读取资料", status: "error", summary: en ? "The requested note is unavailable." : "指定笔记暂时不可用。", input: "notes/missing.md" }]
  return [...tools, { id: "write", kind: "tool", tool: "file", title: en ? "Organize the project review" : "整理项目复盘", status: scene === "stopped" ? "stopped" : scene === "running" ? "running" : "done", input: "notes/project-review.md", output: scene === "running" ? undefined : (en ? "Review prepared." : "已整理复盘要点。") }]
}

/** Fixed gallery/doc fixture. No automatic scene cycling or real requests. */
export function NoteGenChatFeatureScene({ lang = "cn", scene = "approval", height = 650 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenChatScene; height?: number }) {
  const en = lang === "en"
  const menus: Partial<Record<NoteGenChatScene, NoteGenComposerMenu>> = { add: "add", commands: "command", resources: "resource", skills: "skill", tools: "tools", model: "tools", mcp: "tools", permission: "permission" }
  const menu = menus[scene]
  const timeline: NoteGenTimelineProps | false = menu ? false : { events: noteGenChatTraceFixture(scene, lang), defaultOpen: true, expandedGroups: { search: true }, expandedEvents: scene === "history" ? { approval: true } : scene === "error" ? { error: true } : undefined, status: scene === "running" ? "running" : scene === "stopped" ? "stopped" : scene === "error" ? "error" : undefined, hasFinalResponse: scene === "history" }
  return <div style={{ height }}><NoteGenReplicaFrame fill><NoteGenAgentPanel key={`${lang}-${scene}`} lang={lang} title={en ? "Project review" : "项目复盘"} count={1} question={en ? "Summarize the project notes and save a review." : "结合项目资料整理复盘，并保存为笔记。"} answer={menu || scene === "history" ? (en ? "I have the project notes ready." : "项目资料已准备好。") : ""} timeline={timeline} composer={{ menu, toolPage: scene === "model" ? "model" : scene === "mcp" ? "mcp" : undefined, running: scene === "running", waiting: scene === "approval" ? "approval" : scene === "questions" ? "question" : undefined, defaultContexts: [{ id: "file:review", kind: "file", label: en ? "Project review.md" : "项目复盘.md" }], defaultValue: menu ? (en ? "Prepare the review" : "整理项目复盘") : "" }} /></NoteGenReplicaFrame></div>
}
