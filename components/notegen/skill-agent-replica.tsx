"use client"

import { NoteGenEditorTabs, type NoteGenEditorTabsProps } from "./editor-tabs-replica"
import type { CSSProperties, ReactNode } from "react"
import { skillWorkspaceCss } from "./skill-workspace-style"
import { NoteGenKnowledgeSources, type NoteGenKnowledgeSource } from "@/components/notegen/knowledge-replica"
import { EllipsisVertical, FilePlus, FolderPlus, PanelRight, Plus, Redo2, RefreshCw, Undo2, FileText, MoreHorizontal, Search, Sparkles } from "lucide-react"

import { NoteGenAgentComposer, type NoteGenComposerProps } from "./chat-composer-replica"
import { NoteGenExecutionTimeline, type NoteGenTraceEvent } from "./chat-timeline-replica"
import { NoteGenApprovalPanel, NoteGenQuestionPanel, type NoteGenApprovalProps, type NoteGenQuestionProps } from "./chat-interaction-replica"
import { NoteGenAgentHeader, NoteGenAgentMessageActions, NoteGenAssistantMessage, type NoteGenMessageActionsProps } from "./agent-replica"
import { NoteGenChatResponse, type NoteGenChatResponseProps } from "./chat-response-replica"
import { NoteGenSkillsSettingsDialog } from "@/components/notegen/settings-replica"
import type { NoteGenInstalledSkill } from "@/components/notegen/skills-settings-replica"
import { NoteGenChatEmpty, type NoteGenRecentConversation } from "@/components/notegen/chat-empty-replica"
import { NoteGenReplicaIconButton } from "@/components/notegen/replica-primitives"
import { NoteGenAppShell } from "@/components/notegen/app-shell-replica"
import { NoteGenWorkspaceSidebar } from "@/components/notegen/workspace-switcher"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"

export type NoteGenSkillApproval = {
  kind: "remote" | "package"
  name: string
  source?: string
  revision?: string
  scope: string
  instructions?: string
}

export type NoteGenSkillCandidate = { name: string; description: string; source: string }

export type NoteGenSkillAgentState = {
  id: string
  message?: string
  reply?: string[]
  tools?: { title: string; detail?: string; status: "running" | "done" }[]
  candidates?: NoteGenSkillCandidate[]
  selection?: { candidates: NoteGenSkillCandidate[]; selected?: string }
  composer?: string
  approval?: NoteGenSkillApproval
  confirmation?: ReactNode
  sending?: boolean
  loadedSkill?: string
  knowledgeSources?: NoteGenKnowledgeSource[]
  knowledgeExpanded?: boolean
  result?: ReactNode
  messageActions?: NoteGenMessageActionsProps
  response?: NoteGenChatResponseProps
  trace?: NoteGenTraceEvent[]
  question?: NoteGenQuestionProps
  composerProps?: NoteGenComposerProps
  loadingRotation?: number
}

/** Legacy Skill choice entry point; selected values are displayed as recorded answers. */
export function NoteGenSkillCandidateChoice({ candidates, selected, lang = "cn", onSelect }: {
  candidates: NoteGenSkillCandidate[]
  selected?: string
  lang?: NoteGenReplicaLanguage
  onSelect?: (name: string) => void
}) {
  return <div className="ng-skill-choice-current"><NoteGenQuestionPanel lang={lang} questions={[{ id: "skill", question: lang === "en" ? "Which Skill would you like to install?" : "你想安装哪个技能？", options: candidates.map(candidate => ({ label: candidate.name, description: candidate.description })) }]} answers={selected ? { skill: [selected] } : undefined} state={selected ? "submitted" : undefined} onSubmit={answers => { if (answers.skill?.[0]) onSelect?.(answers.skill[0]) }} /></div>
}

export function NoteGenSkillInstallApproval({ value, lang = "cn", onConfirm, onCancel, ...props }: {
  value: NoteGenSkillApproval
  lang?: NoteGenReplicaLanguage
  onConfirm?: () => void
  onCancel?: () => void
} & Omit<NoteGenApprovalProps, "lang" | "onDecision">) {
  return <NoteGenApprovalPanel {...noteGenSkillApprovalProps(value, lang)} onDecision={decision => { if (decision === "cancel") onCancel?.(); else onConfirm?.() }} {...props} />
}

export function noteGenSkillApprovalProps(value: NoteGenSkillApproval, lang: NoteGenReplicaLanguage): NoteGenApprovalProps {
  const en = lang === "en"
  return { lang, title: value.kind === "remote" ? (en ? "Confirm third-party Skill installation" : "确认安装第三方 Skill") : undefined, summary: value.source ?? value.name, confirmLabel: value.kind === "remote" ? (en ? "Confirm installation" : "确认安装") : undefined, fields: [
    { label: en ? "Name" : "Skill 名称", value: value.name },
    ...(value.source ? [{ label: en ? "Source" : "来源", value: value.source }] : []),
    ...(value.revision ? [{ label: en ? "Revision" : "固定版本", value: value.revision }] : []),
    { label: en ? "Scope" : "安装位置", value: value.scope },
    ...(value.instructions ? [{ label: en ? "Instructions" : "指引", value: value.instructions, format: "content" as const }] : []),
  ] }
}

export function NoteGenSkillAgentWorkspace({ states, documents, fileName, editorTabsProps, lang = "cn", modelLabel = "已配置模型", theme = "dark", conversationTitle, conversationCount = 0, characterCount = 0, recentConversations, skillChecks = [], iconAnimation = "interactive", fileNames, attachCurrentDocument = true, activeStateId, className }: {
  activeStateId?: string
  fileNames?: string[]
  attachCurrentDocument?: boolean
  iconAnimation?: "interactive" | "timeline"
  states: NoteGenSkillAgentState[]
  documents: { id: string; content: ReactNode }[]
  editorTabsProps?: NoteGenEditorTabsProps
  fileName: string
  lang?: NoteGenReplicaLanguage
  modelLabel?: string
  conversationTitle?: string
  conversationCount?: number
  skillChecks?: { id: string; skills: NoteGenInstalledSkill[] }[]
  recentConversations?: NoteGenRecentConversation[]
  characterCount?: number
  theme?: "light" | "dark"
  className?: string
}) {
  const en = lang === "en"
  return <div data-theme={theme} data-icon-animation={iconAnimation} className={`ng-skill-workspace replica ${className ?? ""}`} style={{ "--color-background": theme === "dark" ? "hsl(240 10% 3.9%)" : "white", "--color-foreground": theme === "dark" ? "hsl(0 0% 98%)" : "hsl(240 10% 3.9%)", "--color-border": theme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 5.9% 90%)", "--color-muted": theme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)", "--color-muted-foreground": "hsl(240 5% 64.9%)", "--color-primary": theme === "dark" ? "hsl(0 0% 98%)" : "hsl(240 5.9% 10%)", "--color-primary-foreground": theme === "dark" ? "hsl(240 5.9% 10%)" : "hsl(0 0% 98%)" } as CSSProperties}>
    <style>{skillWorkspaceCss}</style>
    <NoteGenAppShell lang={lang} className="ng-skill-shell" titleBarProps={{ showShortcutHints: false }} statusBarProps={{ modelLabel, workspaceName: en ? "Default workspace" : "默认工作区", characterCount }}>
      <div className="ng-skill-layout">
        <NoteGenWorkspaceSidebar lang={lang} value="writing" actions={<div className="ng-skill-file-actions">{[{ icon: FilePlus, label: en ? "New note" : "新建笔记" }, { icon: FolderPlus, label: en ? "New folder" : "新建文件夹" }, { icon: RefreshCw, label: en ? "Refresh" : "刷新" }, { icon: EllipsisVertical, label: en ? "More" : "更多" }].map(({ icon, label }) => <NoteGenReplicaIconButton key={label} icon={icon} label={label} />)}</div>}>
          <div className="ng-skill-files"><div><Search size={14} />{en ? "Search notes, records and canvases…" : "搜索笔记、记录和画布..."}</div>{(fileNames ?? [fileName]).map(name => <p key={name} data-file-name={name} className={name === fileName ? "ng-skill-file-active" : undefined}><FileText size={16} />{name}</p>)}</div>
        </NoteGenWorkspaceSidebar>
        <section className="ng-skill-editor">
          <NoteGenEditorTabs lang={lang} tabs={[{ id: "document", kind: "file", label: fileName }]} activeId="document" {...editorTabsProps} />
          <div className="ng-skill-documents">{documents.map((doc, index) => <article key={doc.id} data-skill-document={doc.id} style={{ opacity: index === 0 ? 1 : 0 }}>{doc.content}</article>)}</div>
        </section>
        <aside className="ng-skill-agent">
          <NoteGenAgentHeader lang={lang} title={conversationTitle} count={conversationCount} />
          <div className="ng-skill-agent-states">{states.map((state, index) => <div key={state.id} data-skill-state={state.id} className="ng-skill-agent-state" style={{ opacity: (activeStateId ? state.id === activeStateId : index === 0) ? 1 : 0, pointerEvents: (activeStateId ? state.id === activeStateId : index === 0) ? "auto" : "none" }}>
            <div className="ng-skill-messages" data-empty={!state.message}><div className="ng-skill-message-body">
              {state.message ? <div className="ng-skill-user">{state.message}</div> : <div className="ng-skill-empty"><NoteGenChatEmpty lang={lang} recentConversations={recentConversations} /></div>}
              {(state.trace?.length || state.tools?.length || state.confirmation || state.approval || state.selection || state.question) ? <NoteGenExecutionTimeline lang={lang} loadingRotation={iconAnimation === "timeline" ? state.loadingRotation ?? 0 : undefined} hasFinalResponse={state.response ? state.response.state !== "preview" && !state.response.streaming : Boolean(state.reply || state.result)} context={<>{state.knowledgeSources?.length ? <NoteGenKnowledgeSources sources={state.knowledgeSources} expanded={state.knowledgeExpanded} lang={lang} /> : null}{state.loadedSkill ? <div className="ng-skill-loaded"><Sparkles size={14} /><span>{en ? "Used 1 skill" : "已使用 1 个技能"}</span></div> : null}</>} events={state.trace ?? [
                ...(state.tools ?? []).map((tool, i): NoteGenTraceEvent => ({ id: `tool-${i}`, kind: "tool", title: tool.title, status: tool.status, input: tool.detail, tool: "file" })),
                ...(state.confirmation || state.approval ? [{ id: "approval", kind: "approval" as const, title: en ? "Confirm operation" : "确认操作", status: "pending" as const, content: state.confirmation, approval: state.approval ? noteGenSkillApprovalProps(state.approval, lang) : undefined }] : []),
                ...(state.selection ? [{ id: "selection", kind: "question" as const, title: en ? "Choose a Skill" : "选择技能", status: state.selection.selected ? "done" as const : "pending" as const, question: { questions: [{ id: "skill", question: en ? "Which Skill would you like to install?" : "你想安装哪个技能？", options: state.selection.candidates.map(candidate => ({ label: candidate.name, description: candidate.description })) }], answers: state.selection.selected ? { skill: [state.selection.selected] } : undefined, state: state.selection.selected ? "submitted" as const : undefined } }] : []),
                ...(state.question ? [{ id: "question", kind: "question" as const, title: en ? "Question" : "补充信息", status: "pending" as const, question: state.question }] : []),
              ]} /> : null}
              <NoteGenAssistantMessage platform={state.messageActions?.platform}>
              {!state.response && state.reply?.map((line, i) => <p key={i} className="ng-skill-reply">{line}</p>)}
              {state.candidates ? <div className="ng-skill-candidates">{state.candidates.map(candidate => <section key={candidate.name}><strong>{candidate.name}</strong><p>{candidate.description}</p><small>{candidate.source}</small></section>)}</div> : null}
              {state.response ? <NoteGenChatResponse lang={lang} {...state.response} motion={iconAnimation === "timeline" ? "timeline" : state.response.motion} loadingRotation={iconAnimation === "timeline" ? state.loadingRotation ?? 0 : state.response.loadingRotation} /> : state.result ? <div className="ng-skill-result">{state.result}</div> : null}
              {(state.response ? state.response.state !== "preview" && !state.response.streaming : state.result || state.reply) ? <NoteGenAgentMessageActions lang={lang} extra="record" {...state.messageActions} /> : null}
              </NoteGenAssistantMessage>
            </div></div>
            <footer><NoteGenAgentComposer lang={lang} value={state.composer ?? ""} running={state.sending ?? state.tools?.some(tool => tool.status === "running") ?? false} defaultContexts={attachCurrentDocument ? [{ id: `file:${fileName}`, kind: "file", label: fileName }] : []} inputTarget={state.id} sendTarget={`send-${state.id}`} {...state.composerProps} /></footer>
          </div>)}</div>
        </aside>
      </div>
    </NoteGenAppShell>
    {skillChecks.map(check => <div key={check.id}>{(["about", "skills"] as const).map(section => <div key={section} className="ng-skill-settings-layer" data-skill-settings={`${check.id}-${section}`} style={{ opacity: 0 }}><NoteGenSkillsSettingsDialog lang={lang} skills={check.skills} activeSection={section} /></div>)}</div>)}
  </div>
}

export { skillWorkspaceCss } from "./skill-workspace-style"
