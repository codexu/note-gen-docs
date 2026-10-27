import type { ReactNode } from "react"
import { FileText, MoreHorizontal, PanelRight, Plus, Redo2, Undo2, type LucideIcon } from "lucide-react"
import { NoteGenWindowControls } from "./chrome-controls"
import type { NoteGenReplicaLanguage } from "./types"

/** Display-only icon control: no application action or independent animation. */
export function ReleaseIcon({ icon: Icon, label, target, active = false, destructive = false }: {
  icon: LucideIcon
  label: string
  target?: string
  active?: boolean
  destructive?: boolean
}) {
  return <span className="ng-release-icon" data-release-target={target} data-release-table-action={target === "add-row" ? "add-row" : target === "table-align-center" ? "align-center" : undefined} data-release-screenshot-action={target === "screenshot-tool-3" ? "arrow" : target === "screenshot-tool-6" ? "mosaic" : target === "screenshot-pin" ? "pin" : undefined} data-active={active} data-destructive={destructive} role="img" aria-label={label} title={label}><Icon aria-hidden="true" /></span>
}

export function ReleasePane({ children, state, lang = "cn", title, className = "", height = 850 }: {
  children: ReactNode
  state: string
  lang?: NoteGenReplicaLanguage
  title: string
  className?: string
  height?: number
}) {
  return <section className={`ng-release-replica ${className}`} style={{ height }} data-release-state={state} data-release-language={lang} data-theme="dark" aria-label={title}>
    <style>{releaseReplicaCss}</style>
    <header className="ng-release-window-head"><NoteGenWindowControls platform="mac" /><span>{title}</span><div className="ng-release-window-spacer" /></header>
    <div className="ng-release-pane-body">{children}</div>
  </section>
}

export function ReleaseTabBar({ fileName }: { fileName: string }) {
  return <div className="ng-release-tab-bar"><ReleaseIcon icon={Undo2} label="Undo" /><ReleaseIcon icon={Redo2} label="Redo" /><span className="ng-release-active-tab"><FileText /><span>{fileName}</span></span><ReleaseIcon icon={Plus} label="New tab" /><span className="ng-release-tab-space" /><ReleaseIcon icon={PanelRight} label="Panel" /><ReleaseIcon icon={MoreHorizontal} label="More" /></div>
}

/** Scoped product tokens and natural-size geometry; video camera scale is external. */
export const releaseReplicaCss = `
.ng-release-replica{--ng-r-bg:hsl(240 10% 3.9%);--ng-r-fg:hsl(0 0% 98%);--ng-r-muted:hsl(240 3.7% 15.9%);--ng-r-dim:hsl(240 5% 64.9%);--ng-r-border:hsl(240 3.7% 15.9%);--ng-r-popover:hsl(240 10% 3.9%);--color-primary-foreground:hsl(240 5.9% 10%);--color-background:var(--ng-r-bg);--color-foreground:var(--ng-r-fg);--color-border:var(--ng-r-border);--color-muted:var(--ng-r-muted);--color-muted-foreground:var(--ng-r-dim);position:relative;width:900px;height:850px;overflow:hidden;border:1px solid var(--ng-r-border);border-radius:12px;background:var(--ng-r-bg);color:var(--ng-r-fg);font:14px/1.5 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;box-sizing:border-box;text-align:left}
.ng-release-replica *{box-sizing:border-box}.ng-release-replica svg{display:block;flex-shrink:0}.ng-release-replica button,.ng-release-replica input{font:inherit}.ng-release-window-head{height:36px;display:flex;align-items:center;border-bottom:1px solid var(--ng-r-border);color:var(--ng-r-dim);font-size:12px}.ng-release-window-head>span{position:absolute;left:100px;right:100px;text-align:center}.ng-release-window-spacer{flex:1}.ng-release-pane-body{position:relative;height:calc(100% - 36px);overflow:hidden}.ng-release-icon{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex-shrink:0;border:1px solid transparent;border-radius:5px;color:var(--ng-r-dim)}.ng-release-icon svg{width:16px;height:16px;stroke-width:2}.ng-release-icon[data-active="true"]{color:var(--ng-r-fg);background:var(--ng-r-muted)}.ng-release-icon[data-destructive="true"]{color:#ef4444}.ng-release-tab-bar{height:40px;display:flex;align-items:center;gap:4px;padding:0 8px;border-bottom:1px solid var(--ng-r-border);color:var(--ng-r-dim)}.ng-release-active-tab{align-self:stretch;display:flex;align-items:center;gap:8px;min-width:180px;max-width:360px;padding:0 14px;border-bottom:2px solid var(--ng-r-fg);color:var(--ng-r-fg);font-size:14px}.ng-release-active-tab svg{width:14px;height:14px}.ng-release-active-tab>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-release-tab-space{flex:1}.ng-release-popover{position:absolute;background:var(--ng-r-popover);color:var(--ng-r-fg);padding:4px;border-radius:8px;box-shadow:0 6px 20px #0005,0 0 0 1px hsl(0 0% 98%/.1)}.ng-release-bubble{display:flex;align-items:center;gap:4px;height:36px;width:max-content;max-width:100%;padding:4px}.ng-release-divider{width:1px;height:20px;background:var(--ng-r-border);margin:0 4px;flex-shrink:0}.ng-release-menu{width:168px}.ng-release-menu-row{height:32px;display:flex;align-items:center;gap:8px;border-radius:4px;padding:0 8px;font-size:14px}.ng-release-menu-row[data-selected="true"]{background:var(--ng-r-muted)}.ng-release-menu-check{width:14px;height:14px;color:var(--ng-r-fg)}.ng-release-menu-swatch{width:16px;height:16px;border:1px solid var(--ng-r-border);border-radius:3px;flex-shrink:0}.ng-release-menu-label{padding:6px 8px;color:var(--ng-r-dim);font-size:12px}.ng-release-document{position:relative;margin:0 auto;padding:42px 56px;max-width:900px;font-size:16px;line-height:1.7}.ng-release-document h1{margin:0 0 24px;font-size:30px;line-height:1.45;font-weight:700;letter-spacing:-.4px}.ng-release-document h2{margin:30px 0 12px;font-size:24px;line-height:1.45;font-weight:600}.ng-release-document h3{margin:24px 0 10px;font-size:20px;font-weight:600}.ng-release-document p{margin:14px 0}.ng-release-document ul{padding-left:24px;margin:12px 0}.ng-release-document li{margin:6px 0}.ng-release-document .ng-release-dim{color:var(--ng-r-dim)}.ng-release-file-path{font-size:12px;color:var(--ng-r-dim);display:flex;gap:7px;align-items:center;margin-bottom:16px}.ng-release-file-path svg{width:14px;height:14px}.ng-release-note-selection{background:Highlight;color:HighlightText}.ng-release-result-mark{background:#fef08a;color:#18181b;border-radius:2px;padding:0 2px}.ng-release-table-wrap{position:relative;margin-top:34px;overflow:hidden}.ng-release-table{border-collapse:collapse;min-width:100%;font-size:16px;line-height:1.7}.ng-release-table th,.ng-release-table td{border:1px solid var(--ng-r-border);padding:10px 14px;text-align:left;white-space:nowrap}.ng-release-table th{font-weight:600;background:var(--ng-r-muted)}.ng-release-table td[data-selected="true"]{background:hsl(0 0% 98%/.1)}.ng-release-table-scroll{margin-top:5px;height:6px;border-radius:4px;background:var(--ng-r-muted)}.ng-release-table-scroll>span{display:block;width:68%;height:100%;border-radius:4px;background:var(--ng-r-dim);opacity:.5}
`
