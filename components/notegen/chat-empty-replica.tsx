import { FileEdit, FileText, Lightbulb, MessageCircle } from "lucide-react"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"

export type NoteGenRecentConversation = { title: string; time: string }

/** Local display fixture; does not access real conversation history. */
export function NoteGenChatEmpty({ lang = "cn", recentConversations = [] }: {
  lang?: NoteGenReplicaLanguage
  recentConversations?: NoteGenRecentConversation[]
}) {
  const en = lang === "en"
  const prompts = [
    { icon: FileEdit, text: en ? "Help me write a note" : "帮我写一篇笔记" },
    { icon: FileText, text: en ? "Summarize this content" : "帮我总结这段内容" },
    { icon: Lightbulb, text: en ? "Brainstorm some ideas" : "帮我头脑风暴一些想法" },
  ]
  return <div className="ng-chat-empty">
    <style>{chatEmptyCss}</style>
    <div className="ng-chat-empty-grid" aria-hidden="true" />
    <div className="ng-chat-empty-fade" aria-hidden="true" />
    <div className="ng-chat-empty-content">
      <header><div><MessageCircle size={20} /><h2>{en ? "Start a conversation with AI" : "开始与 AI 对话"}</h2></div><p>{en ? "Use Chat or Agent to interact with AI" : "使用 Chat 或 Agent 模式与 AI 互动"}</p></header>
      <section><p>{en ? "Quick start" : "快速开始"}</p>{prompts.map(({ icon: Icon, text }) => <div className="ng-chat-empty-prompt" key={text}><Icon size={16} /><span>{text}</span></div>)}</section>
      {recentConversations.length ? <section><p>{en ? "Recent conversations" : "最近对话"}</p>{recentConversations.slice(0, 3).map(item => <div className="ng-chat-empty-recent" key={item.title}><span>{item.title}</span><time>{item.time}</time></div>)}</section> : null}
    </div>
  </div>
}

const chatEmptyCss = `
.ng-chat-empty{position:relative;display:flex;width:100%;height:100%;align-items:center;justify-content:center;overflow:hidden;color:var(--color-foreground,#18181b);font:14px/1.5 ui-sans-serif,system-ui,-apple-system,"PingFang SC",sans-serif;background:var(--color-background,#fff)}
.ng-chat-empty-grid{position:absolute;inset:0;pointer-events:none;opacity:.03;background-image:linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px);background-size:40px 40px;background-position:center center}
[data-theme="dark"] .ng-chat-empty-grid{opacity:.05}
.ng-chat-empty-fade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to right,var(--color-background,#fff) 0%,transparent 15%,transparent 85%,var(--color-background,#fff) 100%),linear-gradient(to bottom,var(--color-background,#fff) 0%,transparent 15%,transparent 85%,var(--color-background,#fff) 100%)}
.ng-chat-empty-content{position:relative;max-width:340px;width:100%;padding:0 8px;display:flex;flex-direction:column;gap:24px}.ng-chat-empty-content header{text-align:center}.ng-chat-empty-content header>div{display:flex;align-items:center;justify-content:center;gap:8px}.ng-chat-empty-content h2{font-size:20px;font-weight:600;letter-spacing:-.5px;margin:0}.ng-chat-empty-content header>p{font-size:14px;color:var(--color-muted-foreground,#71717a);margin:12px 0 0}.ng-chat-empty-content section>p{font-size:12px;color:var(--color-muted-foreground,#71717a);padding:0 4px;margin:0 0 8px}.ng-chat-empty-prompt{height:44px;display:flex;align-items:center;gap:8px;padding:0 16px;border:1px solid var(--color-border,#e4e4e7);border-radius:8px;background:var(--color-primary-foreground,#fafafa);margin-top:8px;font-size:14px;font-weight:500}.ng-chat-empty-prompt svg{flex-shrink:0;color:var(--color-muted-foreground,#71717a)}.ng-chat-empty-prompt span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-chat-empty-recent{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:20px;padding:0 4px;margin-top:8px;font-size:12px;font-weight:500}.ng-chat-empty-recent>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-chat-empty-recent time{flex-shrink:0;font-weight:400;color:var(--color-muted-foreground,#71717a)}
`
