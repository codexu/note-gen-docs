"use client"

import { useState } from "react"
import { NoteGenAgentHeader, NoteGenAgentComposer, NoteGenAgentMessage } from "./agent-replica"
import { NoteGenAgentMessageActions, NoteGenAssistantMessage } from "./message-actions-replica"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenMessageActionsScene = "history" | "mobile-hidden" | "mobile-visible" | "summary" | "translation-menu" | "translated" | "translating" | "copied" | "read-loading" | "reading" | "recorded" | "convert" | "clipboard" | "generating"

function MessageScene({ lang, scene, height }: { lang: NoteGenReplicaLanguage; scene: NoteGenMessageActionsScene; height: number }) {
  const en = lang === "en"
  const mobile = scene.startsWith("mobile")
  const [deleted, setDeleted] = useState(false)
  const [translation, setTranslation] = useState(scene === "translated" ? (en ? "先收集反馈，再完善引导流程。" : "Gather feedback before refining the onboarding flow.") : "")
  const content = en ? "Collect feedback first, then refine onboarding." : "先收集使用反馈，再完善新手引导。"
  return <div style={{ height }}><NoteGenReplicaFrame fill><div className="flex h-full flex-col" data-notegen-chat-boundary>
    <NoteGenAgentHeader lang={lang} title={en ? "Project review" : "项目复盘"} count={1} />
    <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-auto p-4 text-sm leading-6">
      <NoteGenAgentMessage role="user">{en ? "What should we improve next?" : "下一步应该改进什么？"}</NoteGenAgentMessage>
      {!deleted && <NoteGenAssistantMessage platform={mobile ? "mobile" : "desktop"} defaultActionsVisible={scene === "mobile-visible"}>
        <p>{content}</p>
        <NoteGenAgentMessageActions lang={lang} last={!mobile && scene !== "history"} platform={mobile ? "mobile" : "desktop"} content={content} messageType={scene === "clipboard" ? "clipboard" : "chat"} generating={scene === "generating"} extra={scene === "convert" ? "convert" : scene === "clipboard" ? undefined : "record"} recorded={scene === "recorded"} summary={scene === "summary" ? content : undefined} summaryOpen={scene === "summary"} translationMenuOpen={scene === "translation-menu"} translation={translation} onTranslationChange={setTranslation} onTranslate={() => en ? "先收集反馈，再完善引导流程。" : "Gather feedback before refining the onboarding flow."} copied={scene === "copied" ? true : undefined} translating={scene === "translating"} reading={scene === "reading" ? "playing" : scene === "read-loading" ? "loading" : undefined} onAction={action => { if (action === "delete") setDeleted(true) }} />
      </NoteGenAssistantMessage>}
      {(scene === "history" || mobile) && <NoteGenAssistantMessage><p>{en ? "The next review can focus on the first writing session." : "下一轮复盘可以重点关注首次写作流程。"}</p><NoteGenAgentMessageActions lang={lang} last platform={mobile ? "mobile" : "desktop"} extra="record" /></NoteGenAssistantMessage>}
    </div>
    <NoteGenAgentComposer lang={lang} running={scene === "generating"} />
  </div></NoteGenReplicaFrame></div>
}

export function NoteGenMessageActionsScene({ lang = "cn", scene = "history", height = 520 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenMessageActionsScene; height?: number }) {
  return <MessageScene key={`${lang}-${scene}`} lang={lang} scene={scene} height={height} />
}
