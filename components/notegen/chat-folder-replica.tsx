import { NoteGenAgentComposer } from "./chat-composer-replica"
import { NoteGenExecutionTimeline } from "./chat-timeline-replica"
import { CheckCircle2, ChevronDown, FileText, Folder, FolderOpen, MessageSquareDashed, MessageSquarePlus, MoreHorizontal, Plus, Search, Send, ShieldQuestion, ToolCase, X } from "lucide-react"
import { ReleaseIcon, ReleasePane } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"
import { NoteGenChatEmpty } from "./chat-empty-replica"

export interface NoteGenChatFolderReplicaProps {
  state?: "folder-select" | "folder-context" | "folder-answer"
  lang?: NoteGenReplicaLanguage
  height?: number
  folderName?: string
  entryCount?: number
  question?: string
  answer?: string[]
}

/** Fixed local display of resource selection and folder attachments; no file/AI calls. */
export function NoteGenChatFolderReplica({ state = "folder-select", lang = "cn", height, folderName, entryCount = 3, question, answer }: NoteGenChatFolderReplicaProps) {
  const en = lang === "en"
  const text = (cn: string, english: string) => en ? english : cn
  const folder = folderName ?? text("项目复盘", "Project review")
  const message = question ?? text("根据这个文件夹的资料，总结本周进展和下一步安排。", "Summarize this week's progress and next steps from the files in this folder.")
  const reply = answer ?? [text("本周完成原型设计和第一轮资料整理。", "The prototype and first research pass are complete."), text("下一步：补充真实使用反馈，再完善关键页面。", "Next: gather real feedback, then refine the key pages.")]
  return <ReleasePane state={state} lang={lang} height={height} title={text("AI 对话", "AI chat")} className="ng-release-folder">
    <style>{folderCss}</style>
    <header className="ng-release-folder-head"><span>{text("历史对话", "Conversation history")} ({state === "folder-answer" ? 1 : 0})<ChevronDown /></span><ReleaseIcon icon={MessageSquareDashed} label={text("临时对话", "Temporary conversation")} /><ReleaseIcon icon={MessageSquarePlus} label={text("新建对话", "New conversation")} /><ReleaseIcon icon={MoreHorizontal} label={text("更多", "More")} /></header>
    {state === "folder-answer" ? <div className="ng-release-folder-conversation" data-release-folder-conversation><div className="ng-release-folder-user"><span><FolderOpen />{folder}</span><p>{message}</p></div><div className="ng-release-folder-reply" data-release-folder-answer><NoteGenExecutionTimeline lang={lang} events={[{ id: "folder-read", kind: "tool", tool: "file", title: text("读取文件夹资料", "Read folder materials"), status: "done", output: `${entryCount} ${text("项", "entries")}` }]} />{reply.map((line, index) => <p key={index}>{line}</p>)}</div></div> : <div className="ng-release-folder-empty"><NoteGenChatEmpty lang={lang} recentConversations={[]} /></div>}
    <div className="ng-release-folder-composer-current" data-release-folder-composer><NoteGenAgentComposer lang={lang} value={state === "folder-select" ? "@" : state === "folder-answer" ? "" : message} menu={state === "folder-select" ? "resource" : undefined} options={[{ id: "folder:review", kind: "folder", label: folder, description: `${text("工作", "Work")}/${folder}` }, { id: "file:review", kind: "file", label: text("项目复盘.md", "Project review.md") }, { id: "file:feedback", kind: "file", label: text("使用反馈.md", "User feedback.md") }]} defaultContexts={state === "folder-context" ? [{ id: "folder:review", kind: "folder", label: folder, description: `${entryCount} ${text("项", "entries")}` }] : []} inputTarget="folder-input" sendTarget="folder-send" /></div>
  </ReleasePane>
}

const folderCss = `
.ng-release-folder{--color-primary:var(--ng-r-fg);--color-primary-foreground:var(--ng-r-bg);--color-popover:var(--ng-r-bg);--color-popover-foreground:var(--ng-r-fg)}

.ng-release-folder-composer-current{position:absolute;left:24px;right:24px;bottom:24px;--color-primary:var(--ng-r-fg);--color-primary-foreground:var(--ng-r-bg)}

.ng-release-folder-head{height:48px;padding:0 16px;display:flex;align-items:center;gap:5px;border-bottom:1px solid var(--ng-r-border);font-size:14px;color:var(--ng-r-dim)}.ng-release-folder-head>span{display:flex;align-items:center;gap:6px;flex:1}.ng-release-folder-head>span svg{width:14px;height:14px}.ng-release-folder-empty{position:absolute;inset:48px 0 200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;overflow:hidden}.ng-release-folder-empty h2{position:relative;margin:0;font-size:26px;font-weight:500}.ng-release-folder-empty>p{position:relative;color:var(--ng-r-dim);margin:0;font-size:16px}.ng-release-folder-grid{position:absolute;inset:0;background-image:linear-gradient(var(--ng-r-border) 1px,transparent 1px),linear-gradient(90deg,var(--ng-r-border) 1px,transparent 1px);background-size:32px 32px;opacity:.2;mask-image:radial-gradient(ellipse at center,#000,transparent 68%)}.ng-release-folder-composer{position:absolute;left:24px;right:24px;bottom:24px;min-height:170px;padding:12px;border:1px solid var(--ng-r-border);border-radius:12px;background:var(--ng-r-bg)}.ng-release-folder-input{min-height:70px;margin:4px 4px 8px;font-size:26px;line-height:1.65;white-space:pre-wrap}.ng-release-mention{color:var(--ng-r-fg)}.ng-release-folder-composer footer{display:flex;gap:4px;align-items:center;min-height:32px}.ng-release-folder-composer-space{flex:1}.ng-release-folder-permission{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ng-r-dim);margin-right:8px}.ng-release-folder-permission svg{width:14px;height:14px}.ng-release-folder-send{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--ng-r-fg);color:var(--ng-r-bg)}.ng-release-folder-send svg{width:16px;height:16px}.ng-release-folder-attachment{display:inline-flex;max-width:224px;align-items:center;gap:6px;margin:0 4px 8px;padding:4px 6px 4px 8px;border:1px solid var(--ng-r-border);border-radius:8px;background:hsl(240 3.7% 15.9%/.5);font-size:12px}.ng-release-folder-attachment svg{width:14px;height:14px;color:var(--ng-r-dim)}.ng-release-folder-attachment>svg:last-child{width:12px;height:12px}.ng-release-folder-attachment strong{font-weight:500}.ng-release-folder-attachment>span{color:var(--ng-r-dim)}.ng-release-folder-menu{left:40px;bottom:210px;width:420px;padding:6px}.ng-release-folder-menu-search{display:flex;gap:7px;align-items:center;padding:8px 8px 12px;border-bottom:1px solid var(--ng-r-border);font-size:12px;color:var(--ng-r-dim)}.ng-release-folder-menu-search svg{width:14px;height:14px}.ng-release-folder-option{min-height:40px;display:flex;align-items:center;gap:12px;padding:8px;border-radius:8px;font-size:12px}.ng-release-folder-option[data-selected="true"]{background:var(--ng-r-muted)}.ng-release-folder-option>svg{width:16px;height:16px;color:var(--ng-r-dim)}.ng-release-folder-option>span{display:flex;flex-direction:column;gap:2px}.ng-release-folder-option strong{font-weight:500}.ng-release-folder-option small{font-size:12px;color:var(--ng-r-dim)}.ng-release-folder-conversation{padding:30px 40px}.ng-release-folder-user{margin-left:120px;border-radius:12px;background:var(--ng-r-muted);padding:18px 22px;font-size:26px;line-height:1.7}.ng-release-folder-user>span{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:var(--ng-r-dim);padding:3px 7px;border-radius:5px;background:var(--ng-r-bg)}.ng-release-folder-user>span svg{width:14px;height:14px}.ng-release-folder-user p{margin:10px 0 0}.ng-release-folder-reply{font-size:26px;line-height:1.7;margin-top:25px}.ng-release-folder-reply>div{display:flex;gap:6px;align-items:center;font-size:12px;color:var(--ng-r-dim)}.ng-release-folder-reply>div svg{width:14px;height:14px}.ng-release-folder-reply>p{margin:12px 0}
.ng-release-folder-reply>[data-notegen-replica="execution-timeline"]{flex-direction:column;align-items:stretch;gap:8px;font-size:14px}
`
