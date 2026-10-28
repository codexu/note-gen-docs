"use client"

import { useState } from "react"
import { NoteGenAgentPanel } from "./agent-replica"
import { NoteGenArtifactLink, NoteGenResponseFeedbackNotice } from "./chat-artifact-replica"
import type { NoteGenChatResponseProps } from "./chat-response-replica"
import type { NoteGenResponseAction, NoteGenResponseBlock, NoteGenResponseFeedback } from "./chat-response-types"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenChatResponseScene = "complete" | "preview" | "text" | "text-streaming" | "fallback" | "media" | "artifacts" | "opening" | "saving" | "partial" | "missing" | "mobile" | "action-error"

export function noteGenResponseFixture(lang: NoteGenReplicaLanguage = "cn"): NoteGenResponseBlock[] {
  const en = lang === "en"
  return [
    { id: "review", type: "card", title: en ? "Project review" : "项目复盘", description: en ? "Decisions grounded in three project notes." : "基于三篇项目笔记整理的结论。", children: [
      { id: "ready", type: "badge", tone: "success", text: en ? "Ready for review" : "待审阅" },
      { id: "summary", type: "text", text: en ? "Keep the first session short, and make the next step visible." : "缩短首次使用流程，并让下一步操作始终可见。" },
    ] },
    { id: "details", type: "tabs", items: [
      { id: "overview", title: en ? "Overview" : "概览", content: [
        { id: "comparison", type: "table", columns: en ? ["Area", "Decision"] : ["范围", "结论"], rows: en ? [["Onboarding", "Reduce setup steps"], ["Editor", "Keep context visible"]] : [["新手引导", "减少配置步骤"], ["编辑体验", "保留上下文"]] },
        { id: "next", type: "card", variant: "outlined", title: en ? "Next steps" : "下一步", children: [
          { id: "steps", type: "steps", items: [{ title: en ? "Collect feedback" : "收集反馈", status: "done" }, { title: en ? "Refine onboarding" : "完善引导", status: "current" }, { title: en ? "Review the prototype" : "评审原型", status: "pending" }] },
        ] },
        { id: "progress", type: "progress", label: en ? "Review progress" : "整理进度", value: 67 },
      ] },
      { id: "evidence", title: en ? "Evidence" : "依据", content: [
        { id: "count", type: "stat", label: en ? "Related notes" : "相关笔记", value: "3", description: en ? "Project, feedback, and prototype" : "项目、反馈和原型" },
        { id: "facts", type: "key-value", items: [{ label: en ? "Scope" : "范围", value: en ? "Desktop onboarding" : "桌面端新手引导" }, { label: en ? "Updated" : "更新时间", value: "2026-10-27 10:28" }] },
        { id: "quote", type: "quote", text: en ? "I want to write my first note sooner." : "希望可以更快开始写第一篇笔记。", attribution: en ? "Prototype feedback" : "原型反馈", source: { key: "feedback", label: en ? "Open feedback" : "打开反馈" } },
        { id: "sources", type: "sources", title: en ? "Sources" : "来源", items: [{ key: "project", label: "project.md" }, { key: "feedback", label: "feedback.md" }] },
        { id: "history", type: "timeline", items: [{ title: en ? "Feedback collected" : "已收集反馈", time: "10:26" }, { title: en ? "Review prepared" : "已整理复盘", time: "10:28" }] },
      ] },
    ] },
    { id: "more", type: "accordion", items: [{ id: "boundaries", title: en ? "Review scope" : "复盘范围", content: [
      { id: "scope", type: "list", items: en ? ["First session setup", "Writing with context"] : ["首次使用配置", "结合上下文写作"] },
      { id: "caution", type: "alert", tone: "warning", title: en ? "Needs confirmation" : "待确认", description: en ? "Validate the revised flow with the next prototype." : "在下一轮原型中确认调整后的流程。" },
    ] }] },
    { id: "note", type: "note-link", path: "notes/project-review.md", label: en ? "Open review note" : "打开复盘笔记" },
    { id: "file", type: "artifact", path: "artifacts/project-review.md" },
    { id: "actions", type: "actions", actions: [{ id: "copy-summary", type: "copy", label: en ? "Copy summary" : "复制摘要", text: en ? "Reduce setup steps and keep context visible." : "减少配置步骤，保留上下文。" }] },
  ]
}

function ResponseSceneContent({ lang, scene, height }: { lang: NoteGenReplicaLanguage; scene: NoteGenChatResponseScene; height: number }) {
  const en = lang === "en"
  const [feedback, setFeedback] = useState<NoteGenResponseFeedback | undefined>(scene === "action-error" ? { kind: "error", title: en ? "Unable to save file" : "另存文件失败", description: en ? "The file was moved or deleted." : "文件已被移动或删除。" } : undefined)
  const action = (value: NoteGenResponseAction) => {
    if (scene === "action-error") throw new Error("Fixture action failure")
    setFeedback({ kind: "success", title: en ? `Demo: ${value.label}` : `演示：${value.label}`, description: value.type === "copy" ? value.text : value.type === "open-source" ? value.sourceKey : value.path })
  }
  const artifactScene = ["artifacts", "opening", "saving", "partial", "missing", "mobile", "action-error"].includes(scene)
  const response: NoteGenChatResponseProps = {
    responseId: scene,
    state: scene === "preview" ? "preview" : scene === "fallback" ? "error" : scene === "text" || scene === "text-streaming" ? "text" : "complete",
    streaming: scene === "text-streaming",
    blocks: noteGenResponseFixture(lang),
    fallback: scene === "text-streaming" ? (en ? "The notes suggest reducing setup steps and keeping" : "笔记中的共同建议是：减少首次配置步骤，并在写作时") : (en ? "The review is ready. Reduce setup steps and keep writing context visible." : "复盘已整理：减少首次配置步骤，并在写作时保留上下文。"),
    platform: scene === "mobile" ? "mobile" : "desktop",
    onAction: action,
    onFeedback: setFeedback,
    actionStates: scene === "saving" ? { "file-save": "pending" } : scene === "opening" ? { "file-open": "pending" } : undefined,
  }
  if (artifactScene) response.blocks = [
    { id: "intro", type: "text", text: en ? "The generated review is ready." : "已生成复盘文件。" },
    { id: "inline", type: "content", content: <p>{en ? "Download: " : "下载："}<NoteGenArtifactLink lang={lang} path="artifacts/project-review.md" state={scene === "saving" ? "saving" : scene === "opening" ? "opening" : "idle"} partial={scene === "partial"} recognized={scene !== "missing"} platform={response.platform} onAction={(kind, path) => action({ id: "inline-file", type: kind === "open" ? "open-artifact" : "save-artifact", label: "project-review.md", path })} onFeedback={setFeedback} /></p> },
    { id: "file", type: "artifact", path: "artifacts/project-review.md", available: scene !== "missing" },
  ]
  if (scene === "media") response.blocks = [
    { id: "heading", type: "heading", level: 2, text: en ? "Implementation notes" : "实现说明" },
    { id: "code", type: "code", language: "typescript", code: 'const progress = completed / total', title: en ? "Progress calculation" : "进度计算" },
    { id: "math", type: "math", latex: "p = \\frac{2}{3}", rendered: <span className="font-serif italic">p = <sup>2</sup>⁄<sub>3</sub></span> },
    { id: "math-error", type: "math", latex: "\\frac{2}{", failed: true },
    { id: "image", type: "image", alt: en ? "Review progress" : "整理进度", preview: <svg viewBox="0 0 400 100" className="w-full bg-muted" aria-hidden="true"><rect x="32" y="32" width="336" height="36" rx="6" fill="currentColor" opacity="0.1" /><rect x="32" y="32" width="224" height="36" rx="6" fill="currentColor" opacity="0.6" /></svg> },
    { id: "image-error", type: "image", alt: "prototype.png", failed: true },
  ]
  return <div style={{ height }}><NoteGenReplicaFrame fill>
    <div className="relative flex h-full min-h-0 min-w-0">
      <NoteGenAgentPanel lang={lang} className="flex-1" title={en ? "Project review" : "项目复盘"} question={en ? "Summarize the project notes and prepare a review file." : "整理项目笔记，并生成一份复盘文件。"} timeline={false} response={response} composer={{ running: scene === "preview" || scene === "text-streaming", defaultValue: "" }} />
      {feedback && <div className="absolute right-4 bottom-28 z-30 max-w-[calc(100%-2rem)]"><NoteGenResponseFeedbackNotice feedback={feedback} /><button type="button" className="mt-1 text-xs text-muted-foreground underline" onClick={() => setFeedback(undefined)}>{en ? "Dismiss" : "关闭"}</button></div>}
    </div>
  </NoteGenReplicaFrame></div>
}

/** Fixed bilingual fixture, with local callbacks and no requests, timers or filesystem access. */
export function NoteGenChatResponseScene({ lang = "cn", scene = "complete", height = 650 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenChatResponseScene; height?: number }) {
  return <ResponseSceneContent key={`${lang}-${scene}`} lang={lang} scene={scene} height={height} />
}
