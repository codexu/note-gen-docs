"use client"

import { Cable, Copy, KeyRound, Network, Puzzle, X } from "lucide-react"
import { NoteGenSettingsShell, NoteGenSettingsSidebar } from "@/components/notegen/settings-replica"
import { skillsSettingsCss } from "@/components/notegen/skills-settings-replica"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"

export type NoteGenMcpAccessState = "stopped" | "running" | "config" | "error"
/** Display-only replica of local-mcp-server.tsx. The token is always supplied demo data. */
export function NoteGenMcpAccessSettings({ lang = "cn", state = "running", port = 37422, workspace, demoToken = "DEMO_TOKEN_REPLACE_WITH_YOUR_KEY", onConnect, onToggle, onClose }: {
  lang?: NoteGenReplicaLanguage
  state?: NoteGenMcpAccessState
  port?: number
  workspace?: string
  demoToken?: string
  onConnect?: () => void
  onToggle?: () => void
  onClose?: () => void
}) {
  const en = lang === "en"
  const running = state === "running" || state === "config"
  const config = JSON.stringify({ name: "notegen", transport: "streamable-http", url: `http://127.0.0.1:${port}/mcp`, headers: { Authorization: `Bearer ${demoToken}` } }, null, 2)
  return <div className="ng-mcp-access ng-settings-scroll"><style>{mcpAccessCss}</style>
    <header><h2><Puzzle size={24} />MCP</h2><p>{en ? "Connect external tools via Model Context Protocol, or let local AI access NoteGen." : "通过 Model Context Protocol 连接外部工具，或让本机 AI 访问 NoteGen。"}</p></header>
    <div className="ng-mcp-tabs"><span>{en ? "External MCP services" : "外部 MCP 服务"}</span><strong>{en ? "Access NoteGen" : "访问 NoteGen"}</strong></div>
    <section><div className="ng-mcp-section-heading"><div><h3>{en ? "Let AI access NoteGen" : "让 AI 访问 NoteGen"}</h3><p>{en ? "Allow other local AI tools to access the current workspace through MCP." : "允许其他本机 AI 工具通过 MCP 访问当前工作区。"}</p></div><button data-mcp-action="copy" onClick={onConnect}><Copy size={16} />{running ? (en ? "Copy connection config" : "复制连接配置") : (en ? "Connect" : "开启并复制配置")}</button></div>
    <div className="ng-mcp-row"><Network size={16} /><div><h4>NoteGen MCP Server <b>{state === "error" ? (en ? "Error" : "端口错误") : running ? (en ? "Running" : "运行中") : (en ? "Stopped" : "已停止")}</b></h4><p>{en ? `External AI can manage all Markdown files in the current workspace (${workspace ?? "Default workspace"}); the connection follows workspace switches.` : `外部 AI 可管理当前工作区（${workspace ?? "默认工作区"}）中的全部 Markdown 文件，切换工作区后自动跟随。`}</p></div><button className="ng-mcp-switch" role="switch" aria-label="NoteGen MCP Server" aria-checked={running} data-enabled={running} data-mcp-action="toggle" onClick={onToggle}><i /></button></div>
    <div className="ng-mcp-row"><Cable size={16} /><div><h4>{en ? "Server port" : "服务端口"}</h4><p>{en ? "Listens on this machine only. Saving takes effect immediately; existing agents need an updated address." : "仅监听本机，保存后立即生效；已有 Agent 需要更新连接地址。"}</p></div><div className="ng-mcp-port"><span>{port}</span><span>⌃⌄</span><button disabled>{en ? "Save" : "保存"}</button></div></div>
    <div className="ng-mcp-row"><KeyRound size={16} /><div><h4>{en ? "Reset access key" : "重置访问密钥"}</h4><p>{en ? "Use only if the configuration is exposed or all agents must be disconnected." : "仅在配置泄露或需要断开所有 Agent 时使用。"}</p></div><button className="ng-mcp-outline" disabled>{en ? "Reset key" : "重置密钥"}</button></div>
    {state === "error" ? <p role="alert">{en ? "Server could not start. Check the port." : "服务未能启动，请检查端口。"}</p> : null}</section>
    {state === "config" ? <div className="ng-mcp-secret-backdrop"><div className="ng-mcp-secret" role="dialog" aria-label={en ? "Connection configuration" : "连接配置已复制"}><button className="ng-mcp-secret-close" onClick={onClose}><X size={16} /></button><h3>{en ? "Connection configuration" : "连接配置已复制"}</h3><p>{en ? "Keep the access key private." : "可将同一份配置粘贴到多个 Agent，并可随时回到此处再次复制。"}</p><pre>{config}</pre><footer><button className="ng-mcp-outline" onClick={onConnect}><Copy size={14} />{en ? "Copy connection config" : "复制连接配置"}</button><button onClick={onClose}>{en ? "Done" : "完成"}</button></footer></div></div> : null}
  </div>
}

export function NoteGenMcpSettingsDialog(props: Parameters<typeof NoteGenMcpAccessSettings>[0]) {
  const lang = props.lang ?? "cn"
  return <div className="ng-skills-dialog-backdrop"><style>{skillsSettingsCss}</style><div className="ng-skills-dialog" role="dialog" aria-label={lang === "en" ? "Settings" : "设置"}><NoteGenSettingsShell sidebar={<NoteGenSettingsSidebar lang={lang} value="mcp" hasUpdate={false} />}><NoteGenMcpAccessSettings {...props} /></NoteGenSettingsShell><button className="ng-skills-dialog-close" onClick={props.onClose} aria-label={lang === "en" ? "Close settings" : "关闭设置"}><X size={16} /></button></div></div>
}

export const mcpAccessCss = `
.ng-mcp-access{position:relative;height:100%;overflow:auto;padding:32px 64px;color:var(--color-foreground);font:14px/1.5 ui-sans-serif,system-ui,-apple-system,"PingFang SC",sans-serif;box-sizing:border-box}.ng-mcp-access header{margin-bottom:32px}.ng-mcp-access h2{display:flex;align-items:center;gap:8px;margin:0 0 6px;font-size:20px;font-weight:600}.ng-mcp-access header svg{color:var(--color-muted-foreground)}.ng-mcp-access p{color:var(--color-muted-foreground);margin:0;font-size:14px}.ng-mcp-tabs{display:inline-flex;padding:3px;gap:2px;border-radius:10px;background:var(--color-muted);margin-bottom:24px;font-weight:500}.ng-mcp-tabs>*{padding:3px 8px}.ng-mcp-tabs span{color:var(--color-muted-foreground)}.ng-mcp-tabs strong{background:var(--color-background);border-radius:8px;box-shadow:0 1px 3px #0003;font-weight:600}.ng-mcp-section-heading{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:16px}.ng-mcp-access h3{font-size:16px;font-weight:600;margin:0 0 4px}.ng-mcp-access button{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:8px;padding:5px 10px;font-family:inherit;font-size:14px;font-weight:500;line-height:1.5;background:var(--color-primary);color:var(--color-primary-foreground);white-space:nowrap;cursor:pointer}.ng-mcp-row{display:flex;align-items:center;gap:12px;border:1px solid var(--color-border);border-radius:10px;padding:12px;margin-bottom:8px}.ng-mcp-row>svg{align-self:flex-start;margin-top:3px;flex-shrink:0}.ng-mcp-row>div:first-of-type{flex:1;min-width:0}.ng-mcp-access h4{font-size:14px;font-weight:500;margin:0 0 4px;display:flex;align-items:center;gap:8px}.ng-mcp-access h4 b{background:var(--color-primary);color:var(--color-primary-foreground);padding:1px 8px;border-radius:20px;font-size:12px;font-weight:500}.ng-mcp-access .ng-mcp-switch{width:32px;height:18px;padding:2px;background:var(--color-muted);flex-shrink:0;justify-content:flex-start;border-radius:20px}.ng-mcp-switch i{width:14px;height:14px;border-radius:50%;background:var(--color-background)}.ng-mcp-access .ng-mcp-switch[data-enabled="true"]{background:var(--color-primary);justify-content:flex-end}.ng-mcp-switch[data-enabled="true"] i{background:var(--color-primary-foreground)}.ng-mcp-port{display:flex;align-items:center;gap:8px;flex:none!important;border:1px solid var(--color-border);border-radius:9px;padding-left:10px;height:32px;color:var(--color-muted-foreground)}.ng-mcp-access .ng-mcp-port button{background:transparent;color:inherit;opacity:.5}.ng-mcp-access .ng-mcp-outline{border:1px solid var(--color-border);background:var(--color-background);color:var(--color-foreground);font-size:12px}.ng-mcp-secret-backdrop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0008;z-index:5}.ng-mcp-secret{position:relative;background:var(--color-background);border:1px solid var(--color-border);border-radius:12px;padding:24px;width:600px;max-width:90%;box-shadow:0 20px 80px #0006}.ng-mcp-secret pre{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--color-muted);padding:12px;border-radius:8px;font:12px/1.7 ui-monospace,monospace;margin:16px 0}.ng-mcp-secret footer{display:flex;justify-content:flex-end;gap:8px}.ng-mcp-secret .ng-mcp-secret-close{position:absolute;right:12px;top:12px;background:transparent;color:var(--color-foreground);padding:0}
`
