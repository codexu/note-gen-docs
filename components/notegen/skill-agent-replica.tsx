import type { CSSProperties, ReactNode } from "react"
import { NoteGenKnowledgeSources, type NoteGenKnowledgeSource } from "@/components/notegen/knowledge-replica"
import { Clock3, Copy, EllipsisVertical, FilePlus, FolderPlus, Globe, Highlighter, PanelRight, Plus, Redo2, RefreshCw, Send, ShieldQuestion, Square, ToolCase, Undo2, Volume2, Wrench, CheckCircle2, ChevronDown, ChevronRight, FileText, Loader2, MessageSquareDashed, MessageSquarePlus, MoreHorizontal, Search, ShieldAlert, Sparkles, X, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
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
}

/** Mirrors AgentQuestionPanel: a single choice responds immediately. No installation side effects. */
export function NoteGenSkillCandidateChoice({ candidates, selected, lang = "cn", onSelect }: {
  candidates: NoteGenSkillCandidate[]
  selected?: string
  lang?: NoteGenReplicaLanguage
  onSelect?: (name: string) => void
}) {
  return <section className="ng-skill-choice" aria-label={lang === "en" ? "Choose a Skill" : "选择要安装的技能"}>
    <style>{skillWorkspaceCss}</style>
    <header><span>{lang === "en" ? "Single choice" : "单选"}</span><strong>{lang === "en" ? "Which Skill would you like to install?" : "你想安装哪个技能？"}</strong></header>
    <div role="group">{candidates.map((candidate, index) => <button key={candidate.name} type="button" data-skill-choice={candidate.name} aria-pressed={selected === candidate.name} onClick={() => onSelect?.(candidate.name)}><b>{index + 1}</b><span><strong>{candidate.name}</strong><small>{candidate.description}</small></span></button>)}</div>
  </section>
}

/** Display-only states. Callbacks never install, search, or invoke the application. */
export function NoteGenSkillInstallApproval({ value, lang = "cn", onConfirm, onCancel }: {
  value: NoteGenSkillApproval
  lang?: NoteGenReplicaLanguage
  onConfirm?: () => void
  onCancel?: () => void
}) {
  const en = lang === "en"
  const fields = [
    [en ? "Name" : "名称", value.name],
    ...(value.source ? [[en ? "Source" : "来源", value.source]] : []),
    ...(value.revision ? [[en ? "Revision" : "固定版本", value.revision]] : []),
    [en ? "Scope" : "安装范围", value.scope],
  ]
  return <section className="ng-skill-approval">
    <style>{skillWorkspaceCss}</style>
    <div className="ng-skill-approval-head"><ShieldAlert size={16} /><div><strong>{value.kind === "remote" ? (en ? "Confirm third-party Skill installation" : "确认安装第三方 Skill") : (en ? "Confirm operation" : "即将执行操作")}</strong><p>{en ? "Review the package before installing." : "请检查来源、固定版本和风险信息，然后决定是否安装。"}</p></div><ChevronDown size={16} /></div>
    <div className="ng-skill-approval-actions"><Button variant="ghost" size="sm" onClick={onCancel}><XCircle size={14} />{en ? "Cancel" : "取消"}</Button><Button size="sm" data-skill-action="confirm" onClick={onConfirm}><CheckCircle2 size={14} />{value.kind === "remote" ? (en ? "Confirm installation" : "确认安装") : (en ? "Confirm" : "确认")}</Button></div>
    <dl className="ng-skill-fields">{fields.map(([name, text]) => <div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl>
    {value.instructions ? <pre>{value.instructions}</pre> : null}
  </section>
}

export function NoteGenSkillAgentWorkspace({ states, documents, fileName, lang = "cn", modelLabel = "已配置模型", theme = "dark", conversationTitle, conversationCount = 0, characterCount = 0, recentConversations, skillChecks = [], iconAnimation = "interactive", fileNames, attachCurrentDocument = true, className }: {
  fileNames?: string[]
  attachCurrentDocument?: boolean
  iconAnimation?: "interactive" | "timeline"
  states: NoteGenSkillAgentState[]
  documents: { id: string; content: ReactNode }[]
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
          <div className="ng-skill-tabs"><div className="ng-skill-history"><Undo2 size={16} /><Redo2 size={16} /></div><div className="ng-skill-active-tab"><FileText size={14} /><span>{fileName}</span></div><Plus size={16} /><div className="ng-skill-tab-actions"><PanelRight size={16} /><MoreHorizontal size={16} /></div></div>
          <div className="ng-skill-documents">{documents.map((doc, index) => <article key={doc.id} data-skill-document={doc.id} style={{ opacity: index === 0 ? 1 : 0 }}>{doc.content}</article>)}</div>
        </section>
        <aside className="ng-skill-agent">
          <header><span><b>{conversationTitle ?? (en ? "Conversation history" : "历史对话")}</b><small>({conversationCount})</small><ChevronDown size={14} /></span><div><MessageSquareDashed size={16} /><MessageSquarePlus size={16} /></div></header>
          <div className="ng-skill-agent-states">{states.map((state, index) => <div key={state.id} data-skill-state={state.id} className="ng-skill-agent-state" style={{ opacity: index === 0 ? 1 : 0 }}>
            <div className="ng-skill-messages" data-empty={!state.message}><div className="ng-skill-message-body">
              {state.message ? <div className="ng-skill-user">{state.message}</div> : <div className="ng-skill-empty"><NoteGenChatEmpty lang={lang} recentConversations={recentConversations} /></div>}
              {state.message && (state.tools?.length || state.result || state.reply) ? <div className="ng-skill-process">{state.tools?.some(tool => tool.status === "running") ? <Loader2 size={14} className="ng-skill-loading" /> : <CheckCircle2 size={14} className="ng-skill-completed" />}<span>{state.tools?.some(tool => tool.status === "running") ? (en ? "Processing…" : "处理中...") : (en ? "Processed" : "已处理")}</span><ChevronDown size={14} /></div> : null}
              {state.knowledgeSources?.length ? <NoteGenKnowledgeSources sources={state.knowledgeSources} expanded={state.knowledgeExpanded} lang={lang} /> : null}
              {state.loadedSkill ? <div className="ng-skill-loaded"><Sparkles size={14} /><span>{en ? "Used 1 skill" : "已使用 1 个技能"}</span><ChevronRight size={14} /></div> : null}
              {state.tools?.length ? <div className="ng-skill-trace">{state.tools.map((tool, i) => <div key={i} className="ng-skill-tool">{tool.status === "done" ? <Wrench size={14} /> : <Loader2 size={14} className="ng-skill-loading" />}<div><span>{tool.title}</span>{tool.detail ? <small>{tool.detail}</small> : null}</div><ChevronRight size={14} /></div>)}</div> : null}
              {state.reply?.map((line, i) => <p key={i} className="ng-skill-reply">{line}</p>)}
              {state.candidates ? <div className="ng-skill-candidates">{state.candidates.map(candidate => <section key={candidate.name}><strong>{candidate.name}</strong><p>{candidate.description}</p><small>{candidate.source}</small></section>)}</div> : null}
              {state.result ? <div className="ng-skill-result">{state.result}</div> : null}
              {state.result || state.reply ? <div className="ng-skill-message-actions"><span><Clock3 size={14} />{en ? "Just now" : "几秒前"}</span><div>{[Highlighter, Copy, Globe, Volume2, X].map((Icon, i) => <Icon key={i} size={14} />)}</div></div> : null}
            </div></div>
            <footer>{state.confirmation}{state.selection ? <NoteGenSkillCandidateChoice {...state.selection} lang={lang} /> : null}{state.approval ? <NoteGenSkillInstallApproval value={state.approval} lang={lang} /> : null}<div className="ng-skill-composer">{attachCurrentDocument ? <div className="ng-skill-context"><FileText size={14} /><span>{fileName}</span><X size={12} /></div> : null}<div data-skill-input={state.id} className={`ng-skill-composer-text ${state.composer ? "" : "ng-skill-placeholder"}`}>{state.composer ?? (en ? "Ask a question or organize notes into an article…" : "你可以提问或将记录整理为文章...")}</div><div className="ng-skill-composer-tools"><Plus size={16} /><ToolCase size={16} /><span className="ng-skill-permission"><ShieldQuestion size={14} />{en ? "Confirm before editing" : "修改前确认"}</span><Button size="icon" data-skill-action={`send-${state.id}`} data-empty={!state.composer && !(state.sending ?? state.tools?.some(tool => tool.status === "running"))} data-sending={state.sending ?? state.tools?.some(tool => tool.status === "running") ?? false} aria-label={(state.sending ?? state.tools?.some(tool => tool.status === "running")) ? (en ? "Stop" : "停止") : (en ? "Send" : "发送")}>{(state.sending ?? state.tools?.some(tool => tool.status === "running")) ? <Square size={16} fill="currentColor" /> : <Send size={16} />}</Button></div></div></footer>
          </div>)}</div>
        </aside>
      </div>
    </NoteGenAppShell>
    {skillChecks.map(check => <div key={check.id}>{(["about", "skills"] as const).map(section => <div key={section} className="ng-skill-settings-layer" data-skill-settings={`${check.id}-${section}`} style={{ opacity: 0 }}><NoteGenSkillsSettingsDialog lang={lang} skills={check.skills} activeSection={section} /></div>)}</div>)}
  </div>
}

// Source token mapping and natural-size display geometry, scoped to this replica.
export const skillWorkspaceCss = `
.ng-skill-choice{border:1px solid hsl(var(--ng-skill-border));border-radius:10px;padding:12px;background:hsl(var(--ng-skill-background));margin-bottom:4px}.ng-skill-choice header{display:flex;flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:12px}.ng-skill-choice header>span{background:hsl(var(--ng-skill-muted));border-radius:5px;padding:2px 7px;font-size:12px}.ng-skill-choice header>strong{font-size:14px;font-weight:600}.ng-skill-choice [role="group"]{display:flex;flex-direction:column;gap:8px}.ng-skill-choice button{visibility:inherit;opacity:1;display:flex;align-items:flex-start;gap:12px;width:100%;padding:12px;text-align:left;border:1px solid hsl(var(--ng-skill-border));border-radius:6px;background:transparent;color:inherit;font:inherit}.ng-skill-choice button[aria-pressed="true"]{background:hsl(var(--ng-skill-muted));border-color:hsl(var(--ng-skill-foreground)/.65)}.ng-skill-choice button>b{border:1px solid hsl(var(--ng-skill-border));border-radius:5px;padding:0 6px;font-size:12px;font-weight:500}.ng-skill-choice button>span{display:flex;flex-direction:column;gap:4px;min-width:0}.ng-skill-choice button strong{font-weight:500;font-size:14px}.ng-skill-choice button small{font-size:13px;color:hsl(var(--ng-skill-muted-foreground));line-height:1.5}.ng-skill-candidates{display:flex;flex-direction:column;gap:12px;margin:12px 0}.ng-skill-candidates section{border-bottom:1px solid hsl(var(--ng-skill-border));padding-bottom:10px}.ng-skill-candidates strong{font-weight:600}.ng-skill-candidates p{margin:4px 0;font-size:14px;line-height:1.6}.ng-skill-candidates small{display:block;font-size:11px;color:hsl(var(--ng-skill-muted-foreground));overflow-wrap:anywhere}
@keyframes ng-skill-spin{to{transform:rotate(360deg)}}
.ng-skill-loading{transform-box:fill-box;transform-origin:center;animation:ng-skill-spin .9s linear infinite}
.ng-skill-workspace[data-icon-animation="timeline"] .ng-skill-loading{animation:none}

.ng-skill-approval-actions button{background:transparent;color:hsl(var(--ng-skill-foreground))}.ng-skill-approval-actions button[data-skill-action="confirm"],.ng-skill-composer-tools>button{background:hsl(var(--ng-skill-primary));color:hsl(var(--ng-skill-primary-foreground));border-radius:5px}
.ng-skill-workspace{width:1360px;height:720px;color:hsl(var(--ng-skill-foreground));--ng-skill-background:240 10% 3.9%;--ng-skill-foreground:0 0% 98%;--ng-skill-muted:240 3.7% 15.9%;--ng-skill-muted-foreground:240 5% 64.9%;--ng-skill-border:240 3.7% 15.9%;--ng-skill-primary:0 0% 98%;--ng-skill-primary-foreground:240 5.9% 10%;--color-background:hsl(var(--ng-skill-background));--color-foreground:hsl(var(--ng-skill-foreground));--color-border:hsl(var(--ng-skill-border));--color-primary:hsl(var(--ng-skill-primary));--color-primary-foreground:hsl(var(--ng-skill-primary-foreground));--color-muted:hsl(var(--ng-skill-muted));--color-muted-foreground:hsl(var(--ng-skill-muted-foreground));font:14px/1.5 ui-sans-serif,system-ui,-apple-system,"PingFang SC",sans-serif}
@layer base{.ng-skill-workspace,.ng-skill-workspace *,.ng-skill-workspace *::before,.ng-skill-workspace *::after{border-color:hsl(var(--ng-skill-border))}}
.ng-skill-workspace *{box-sizing:border-box}.ng-skill-workspace .ng-skill-shell{height:100%;aspect-ratio:auto;background:hsl(var(--ng-skill-background));border-color:hsl(var(--ng-skill-border));border-radius:10px;font-size:14px}.ng-skill-layout{height:100%;display:grid;grid-template-columns:24% 51.4% 24.6%}.ng-skill-layout>section{min-height:0}.ng-skill-workspace svg{flex-shrink:0}.ng-skill-files{padding:8px 0;font-size:14px}.ng-skill-files>div{display:flex;align-items:center;gap:8px;border:1px solid hsl(var(--ng-skill-border));padding:8px;color:hsl(var(--ng-skill-muted-foreground));border-radius:10px;margin:0 8px 8px}.ng-skill-files p{display:flex;align-items:center;gap:8px;padding:4px 24px;margin:2px 0;height:28px}.ng-skill-file-active{position:relative;background:hsl(var(--ng-skill-muted));border-radius:6px;font-weight:500}.ng-skill-file-active:before{content:"";position:absolute;left:0;top:5px;bottom:5px;width:2px;background:hsl(var(--ng-skill-foreground))}.ng-skill-editor{border-right:1px solid hsl(var(--ng-skill-border));display:flex;flex-direction:column}.ng-skill-tabs{height:48px;flex-shrink:0;display:flex;align-items:center;gap:12px;padding:0 12px 0 0;border-bottom:1px solid hsl(var(--ng-skill-border));font-size:14px}.ng-skill-documents{position:relative;flex:1;overflow:hidden}.ng-skill-documents article{position:absolute;inset:0;padding:60px 56px;overflow:hidden;font-size:16px;line-height:1.8}.ng-skill-documents h1{font-size:29px;font-weight:700;margin:0 0 24px}.ng-skill-documents h2{font-size:20px;font-weight:600;margin:22px 0 10px}.ng-skill-documents p{margin:12px 0}.ng-skill-documents table,.ng-skill-result table{border-collapse:collapse;width:100%;margin-top:12px;font-size:14px}.ng-skill-documents td,.ng-skill-documents th,.ng-skill-result td,.ng-skill-result th{padding:9px 8px;border:1px solid hsl(var(--ng-skill-border));text-align:left;font-weight:400}.ng-skill-documents th,.ng-skill-result th{font-weight:600;background:hsl(var(--ng-skill-muted))}.ng-skill-agent{display:flex;min-height:0;flex-direction:column}.ng-skill-agent>header{height:48px;border-bottom:1px solid hsl(var(--ng-skill-border));padding:0 16px;display:flex;align-items:center;justify-content:space-between}.ng-skill-agent>header>span,.ng-skill-agent>header>div{display:flex;align-items:center;gap:12px}.ng-skill-agent-states{position:relative;flex:1;min-height:0}.ng-skill-agent-state{position:absolute;inset:0;display:flex;flex-direction:column;pointer-events:none} .ng-skill-messages{position:relative;min-height:0;flex:1;padding:8px 16px 18px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:hsl(var(--ng-skill-muted-foreground)/.25) transparent}.ng-skill-user{margin-left:auto;max-width:85%;width:fit-content;border:1px solid hsl(var(--ng-skill-border));border-radius:8px;background:transparent;padding:8px 12px;font-size:14px;line-height:1.7;margin-bottom:24px}.ng-skill-trace{display:flex;flex-direction:column;gap:4px;margin-bottom:18px}.ng-skill-tool{display:flex;gap:9px;align-items:flex-start;padding:6px 0;font-size:14px;color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-tool>svg{margin-top:4px;color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-tool>div{flex:1;min-width:0}.ng-skill-tool small{display:block;color:hsl(var(--ng-skill-muted-foreground));font-size:12px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-skill-reply{font-size:14px;line-height:1.8;margin:10px 0}.ng-skill-loaded{display:flex;align-items:center;gap:7px;font-size:14px;color:hsl(var(--ng-skill-muted-foreground));margin:8px 0}.ng-skill-result{font-size:14px;line-height:1.8}.ng-skill-result h3{font-weight:600;font-size:16px;margin:12px 0 6px}.ng-skill-result p{margin:6px 0}.ng-skill-agent-state footer{padding:4px;display:flex;flex-direction:column;gap:4px;flex-shrink:0}.ng-skill-composer{border:1px solid hsl(var(--ng-skill-border));border-radius:12px;padding:4px}.ng-skill-composer-text{padding:8px;min-height:36px;line-height:1.6;font-size:14px;white-space:pre-wrap}.ng-skill-placeholder{color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-composer-tools{display:flex;align-items:center;gap:20px;padding:4px;color:hsl(var(--ng-skill-muted-foreground));font-size:12px}.ng-skill-composer-tools>span{display:flex;align-items:center;gap:4px}.ng-skill-composer-tools>button{margin-left:auto;width:32px;height:28px}.ng-skill-empty{display:flex;align-items:center;flex-direction:column;justify-content:center;gap:14px;height:100%;color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-approval{padding:8px;border:1px solid hsl(var(--ng-skill-border));border-radius:6px;background:hsl(var(--ng-skill-background))}.ng-skill-approval-head{display:flex;align-items:flex-start;gap:8px}.ng-skill-approval-head>svg{margin-top:3px}.ng-skill-approval-head>div{flex:1;min-width:0}.ng-skill-approval-head strong{font-weight:500;font-size:14px}.ng-skill-approval-head p{font-size:12px;color:hsl(var(--ng-skill-muted-foreground));margin:2px 0 0}.ng-skill-approval-actions{display:flex;justify-content:flex-end;gap:4px;margin:8px 0}.ng-skill-approval-actions button{display:inline-flex;visibility:inherit;opacity:1;flex-shrink:0;align-items:center;justify-content:center;gap:6px;height:28px;padding:0 8px;font-size:12px}.ng-skill-fields{border-top:1px solid hsl(var(--ng-skill-border));padding-top:8px;margin:8px 0 0;font-size:12px}.ng-skill-fields>div{display:grid;grid-template-columns:88px 1fr;gap:8px;margin:6px 0}.ng-skill-fields dt{color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-fields dd{margin:0;overflow-wrap:anywhere}.ng-skill-approval-actions button>svg{visibility:inherit;opacity:1;display:block}.ng-skill-approval pre{font:12px/1.6 ui-monospace,monospace;white-space:pre-wrap;margin:8px 0 0;padding:8px;background:hsl(var(--ng-skill-muted));max-height:100px;overflow:hidden}
.ng-skill-workspace[data-theme="light"]{--ng-skill-background:0 0% 100%;--ng-skill-foreground:240 10% 3.9%;--ng-skill-muted:240 4.8% 95.9%;--ng-skill-muted-foreground:240 3.8% 46.1%;--ng-skill-border:240 5.9% 90%;--ng-skill-primary:240 5.9% 10%;--ng-skill-primary-foreground:0 0% 98%}
.ng-skill-workspace [data-notegen-replica="title-bar"]{height:36px;min-height:36px;flex-shrink:0}.ng-skill-workspace [data-notegen-replica="title-bar"][data-platform="mac"]{padding-left:70px}.ng-skill-workspace [data-notegen-replica="window-controls"]{position:absolute;left:0;top:0;height:36px}.ng-skill-workspace [data-notegen-replica="title-bar"] [role="toolbar"] button{position:relative;width:32px;height:32px}.ng-skill-workspace [data-notegen-replica="workspace-sidebar"]>div:first-child{height:48px;min-height:48px}.ng-skill-file-actions{display:flex;align-items:center;gap:4px}.ng-skill-file-actions button{width:32px;height:32px}.ng-skill-workspace [data-notegen-replica="workspace-sidebar"] button span{font-size:14px}.ng-skill-history{height:48px;padding:0 12px;display:flex;align-items:center;gap:16px;color:hsl(var(--ng-skill-muted-foreground))}.ng-skill-active-tab{align-self:stretch;display:flex;align-items:center;gap:6px;padding:0 12px;border-bottom:2px solid hsl(var(--ng-skill-foreground));background:hsl(var(--ng-skill-muted)/.4);min-width:180px;max-width:224px;font-weight:500}.ng-skill-active-tab span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-skill-tab-actions{margin-left:auto;display:flex;gap:16px}.ng-skill-agent>header{flex-shrink:0}.ng-skill-agent>header b{max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.ng-skill-agent>header small{color:hsl(var(--ng-skill-muted-foreground));font-size:12px}.ng-skill-agent>header>div{gap:16px}.ng-skill-process{display:flex;align-items:center;gap:8px;color:hsl(var(--ng-skill-muted-foreground));font-size:14px;margin:6px 0}.ng-skill-process>svg:last-child,.ng-skill-loaded>svg:last-child{margin-left:auto}.ng-skill-context{display:flex;align-items:center;gap:6px;width:fit-content;max-width:85%;border-radius:12px;background:hsl(var(--ng-skill-muted)/.6);font-size:12px;padding:6px 10px;margin:4px 4px 0}.ng-skill-context span{white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis}.ng-skill-composer-tools .ng-skill-permission{margin-left:auto;font-size:12px;gap:6px}.ng-skill-permission svg{color:#a16207}.ng-skill-composer-tools>button{margin-left:0}.ng-skill-composer-tools>button[data-empty="true"]{background:hsl(var(--ng-skill-muted-foreground)/.5);color:hsl(var(--ng-skill-background))}.ng-skill-message-actions{display:flex;justify-content:space-between;align-items:center;margin:22px 0 0;color:hsl(var(--ng-skill-muted-foreground));font-size:12px}.ng-skill-message-actions>span{display:flex;align-items:center;gap:4px}.ng-skill-message-actions>div{display:flex;gap:18px}.ng-skill-shell>[data-notegen-replica="status-bar"]{font-size:12px}
.ng-skill-message-body{position:relative;min-height:100%}.ng-skill-empty{position:absolute;inset:0}.ng-skill-messages::-webkit-scrollbar{width:6px}.ng-skill-messages::-webkit-scrollbar-thumb{border-radius:8px;background:hsl(var(--ng-skill-muted-foreground)/.25)}
.ng-skill-messages[data-empty="true"]{padding:0;overflow:hidden}.ng-skill-empty{color:hsl(var(--ng-skill-foreground));gap:0}.ng-skill-composer-tools>button{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;opacity:1;visibility:inherit;min-width:32px;min-height:28px}.ng-skill-composer-tools>button>svg{display:block;visibility:inherit;opacity:1;width:16px;height:16px;stroke:currentColor;flex-shrink:0}.ng-skill-composer-tools>button[data-sending="true"]{background:#7f1d1d;color:#fafafa}.ng-skill-composer-tools>button[data-empty="true"]{background:hsl(var(--ng-skill-primary)/.5);color:hsl(var(--ng-skill-primary-foreground))}
.ng-skill-workspace{position:relative}.ng-skill-settings-layer{position:absolute;inset:0;pointer-events:none;z-index:10}
`
