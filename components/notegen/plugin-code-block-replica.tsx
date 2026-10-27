import type { ReactNode } from "react"
import { Check, CheckCircle2, ChevronDown, Code, Copy, Download, Eye, FileText } from "lucide-react"
import { ReleasePane, ReleaseTabBar } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export interface NoteGenPluginCodeBlockReplicaProps {
  state?: "source" | "preview" | "export-menu" | "exported"
  lang?: NoteGenReplicaLanguage
  height?: number
  fileName?: string
  language?: string
  rendererName?: string
  source?: string
  preview?: ReactNode
  /** SVG export is available only when the renderer actually returns SVG. */
  svgAvailable?: boolean
}

/** Simulated installed-renderer state; does not run or install any plugin. */
export function NoteGenPluginCodeBlockReplica({ state = "preview", lang = "cn", height = 740, fileName, language = "dot", rendererName = "Graphviz", source, preview, svgAvailable = true }: NoteGenPluginCodeBlockReplicaProps) {
  const en = lang === "en"
  const text = (cn: string, english: string) => en ? english : cn
  const title = fileName ?? text("项目复盘.md", "Project review.md")
  const code = source ?? (en ? 'digraph Review {\n  rankdir=LR;\n  node [shape=box];\n  "Research" -> "Review" -> "Next steps";\n}' : 'digraph Review {\n  rankdir=LR;\n  node [shape=box];\n  "收集资料" -> "整理复盘" -> "下一步";\n}')
  const showSource = state === "source"
  return <ReleasePane title={title} state={`plugin-code-${state}`} lang={lang} height={height} className="ng-release-code-block"><style>{codeBlockCss}</style><ReleaseTabBar fileName={title} /><article className="ng-release-code-document"><div className="ng-release-file-path"><FileText />{text("工作 / 项目复盘", "Work / Project review")}</div><h1>{text("项目复盘", "Project review")}</h1><p>{text("把复盘流程写成代码块，再用已启用的插件预览。", "Write the review flow as a code block and preview it with an enabled plugin.")}</p><section className="ng-release-code-frame" data-release-code-block><header><span className="ng-release-code-language">{language.toUpperCase()}<ChevronDown /></span><Copy /></header><div className="ng-release-code-renderer"><span>{rendererName}</span><span className="ng-release-code-button" data-release-code-action={showSource ? "preview" : "source"}>{showSource ? <Eye /> : <Code />}{showSource ? text("预览", "Preview") : text("编辑源码", "Edit source")}</span>{!showSource ? <span className="ng-release-code-button" data-release-code-action="export"><Download />{text("导出图片", "Export image")}<ChevronDown /></span> : null}</div>{showSource ? <pre className="ng-release-code-source" data-release-code-source>{code}</pre> : <div className="ng-release-code-preview" data-release-code-preview>{preview ?? <GraphvizPreview lang={lang} />}</div>}{state === "export-menu" ? <div className="ng-release-popover ng-release-code-export-menu" data-release-code-export-menu>{(["PNG", "SVG", "JPEG"] as const).map(format => <div key={format} data-release-code-format={format.toLowerCase()} data-disabled={format === "SVG" && !svgAvailable}>{format}</div>)}</div> : null}</section>{state === "exported" ? <div className="ng-release-code-export-result" data-release-code-export-result><CheckCircle2 />{text("图片已导出", "Image exported")}</div> : <p className="ng-release-code-footnote">{text("Markdown 源码保留在笔记中。", "The Markdown source stays in the note.")}</p>}</article></ReleasePane>
}

function GraphvizPreview({ lang }: { lang: NoteGenReplicaLanguage }) {
  const labels = lang === "en" ? ["Research", "Review", "Next steps"] : ["收集资料", "整理复盘", "下一步"]
  return <svg viewBox="0 0 700 210" role="img" aria-label={lang === "en" ? "Simulated Graphviz SVG output for the fixed DOT example" : "固定 DOT 示例的模拟 Graphviz SVG 输出"}><rect width="700" height="210" fill="white" />{labels.map((label, index) => <g key={label}><rect x={30 + index * 240} y="72" width="160" height="66" fill="none" stroke="#111" strokeWidth="1.3" /><text x={110 + index * 240} y="112" textAnchor="middle" fill="#111" fontSize="24" fontFamily="sans-serif">{label}</text>{index < 2 ? <path d={`M${190 + index * 240} 105h75m-8-5 8 5-8 5`} fill="none" stroke="#111" strokeWidth="1.3" /> : null}</g>)}</svg>
}

const codeBlockCss = `
.ng-release-code-document{position:relative;padding:30px 42px;font-size:26px;line-height:1.7}.ng-release-code-document h1{font-size:36px;margin:8px 0 12px;font-weight:700}.ng-release-code-document>p{font-size:24px;color:var(--ng-r-dim);margin:14px 0 22px}.ng-release-code-frame{position:relative;border:1px solid var(--ng-r-border);border-radius:9px;overflow:visible;background:var(--ng-r-bg)}.ng-release-code-frame>header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid var(--ng-r-border);font-size:11px;color:var(--ng-r-dim)}.ng-release-code-frame>header>svg{width:14px;height:14px}.ng-release-code-language{display:flex;align-items:center;gap:6px}.ng-release-code-language svg{width:12px;height:12px}.ng-release-code-renderer{display:flex;align-items:center;gap:8px;padding:8px 12px;font-size:12px;color:var(--ng-r-dim)}.ng-release-code-renderer>span:first-child{flex:1;min-width:0}.ng-release-code-button{display:inline-flex;align-items:center;gap:5px;height:26px;border:1px solid var(--ng-r-border);border-radius:5px;padding:0 8px;font-size:12px;color:var(--ng-r-fg);white-space:nowrap}.ng-release-code-button svg{width:14px;height:14px}.ng-release-code-source{font:20px/1.75 ui-monospace,SFMono-Regular,Consolas,monospace;margin:0;padding:12px 20px 22px;white-space:pre;overflow:hidden;color:var(--ng-r-fg)}.ng-release-code-preview{padding:12px;min-height:220px;display:flex;align-items:center;justify-content:center}.ng-release-code-preview>svg{display:block;width:100%;height:auto;max-height:250px}.ng-release-code-export-menu{right:12px;top:76px;width:136px;padding:4px;z-index:3}.ng-release-code-export-menu>div{height:32px;display:flex;align-items:center;padding:0 8px;font-size:14px;border-radius:4px}.ng-release-code-export-menu>div[data-disabled="true"]{opacity:.4}.ng-release-code-export-menu>div:first-child{background:var(--ng-r-muted)}.ng-release-code-footnote{font-size:16px!important;margin-top:20px!important}.ng-release-code-export-result{display:flex;align-items:center;gap:10px;margin-top:20px;font-size:24px}.ng-release-code-export-result svg{width:24px;height:24px}
`
