import { NoteGenEditorFormatControls } from "./editor-format-controls"
import { noteGenTextColors as textColors, noteGenHighlightColors as highlightColors } from "./editor-format-data"
import { NoteGenOutlinePanel } from "./outline-replica"
import type { CSSProperties } from "react"
import { AlignCenter, AlignLeft, AlignRight, BetweenHorizontalEnd, BetweenHorizontalStart, BetweenVerticalEnd, BetweenVerticalStart, Bold, Check, CheckSquare, ChevronDown, ChevronRight, Code, FileText, Files, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter, Italic, Link, List, ListOrdered, ListTree, Palette, Quote, Search, Sparkles, Strikethrough, TableColumnsSplit, TableRowsSplit, Trash2, Type, Underline } from "lucide-react"
import { ReleaseIcon, ReleasePane, ReleaseTabBar } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenEditorReleaseState = "color-menu" | "color-result" | "outline-open" | "outline-folded" | "outline-jump" | "table-menu" | "table-result" | "heading-menu" | "heading-result"
export interface NoteGenReleaseDocumentData {
  title: string
  intro: string
  highlightText: string
  questionText: string
  sectionTitle: string
  sectionBody: string
  followingTitle: string
  followingBody: string
  outlineItems: string[]
  tableColumns: string[]
  tableRows: string[][]
  addedTableRow: string[]
}
export interface NoteGenEditorReleaseReplicaProps {
  state?: NoteGenEditorReleaseState
  lang?: NoteGenReplicaLanguage
  fileName?: string
  document?: Partial<NoteGenReleaseDocumentData>
  colorMode?: "text" | "highlight"
  colorPhase?: "none" | "text" | "both"
  height?: number
  /** Mirrors the configurable editor content font size; toolbar controls keep their natural size. */
  contentFontSize?: number
  /** Initial document offset for fixed states; animate data-release-document-target in a video. */
  documentScroll?: number
}

export function NoteGenEditorReleaseReplica({ state = "color-menu", lang = "cn", fileName, document, colorMode = "highlight", colorPhase, height, contentFontSize = 16, documentScroll }: NoteGenEditorReleaseReplicaProps) {
  const en = lang === "en"
  const text = (cn: string, english: string) => en ? english : cn
  const data: NoteGenReleaseDocumentData = {
    title: text("项目复盘", "Project review"), intro: text("把零散的资料整理清楚，再决定下一步。", "Organize scattered research, then decide what comes next."), highlightText: text("结论：先完成原型，再收集真实反馈。", "Conclusion: finish the prototype, then gather real feedback."), questionText: text("问题：使用反馈还不够充分。", "Issue: there is not enough user feedback yet."), sectionTitle: text("本周进展", "This week's progress"), sectionBody: text("完成原型设计与第一轮资料整理，确认关键页面和后续安排。", "Completed the prototype and first research pass; confirmed key pages and next steps."), followingTitle: text("下一步安排", "Next steps"), followingBody: text("补充使用反馈，整理问题清单，持续完善体验。", "Gather feedback, collect issues, and refine the experience."), outlineItems: text("项目复盘|本周进展|原型设计|资料整理|下一步安排|反馈收集", "Project review|This week's progress|Prototype design|Research|Next steps|Feedback").split("|"), tableColumns: text("事项|负责人|状态|计划时间", "Task|Owner|Status|Schedule").split("|"), tableRows: en ? [["Prototype", "Lin", "Complete", "Monday"], ["Research", "Chen", "In progress", "Wednesday"], ["Review", "Xu", "Planned", "Friday"]] : [["原型设计", "小林", "已完成", "周一"], ["资料整理", "小陈", "进行中", "周三"], ["方案复盘", "小许", "待开始", "周五"]], addedTableRow: en ? ["Feedback", "Lin", "Planned", "Next week"] : ["反馈收集", "小林", "待开始", "下周"], ...document,
  }
  const outline = state.startsWith("outline")
  const table = state.startsWith("table")
  const heading = state.startsWith("heading")
  const phase = colorPhase ?? (state === "color-result" ? "both" : "none")
  const folded = state === "outline-folded"
  const outlineJump = state === "outline-jump"
  const scrollOffset = documentScroll ?? (outlineJump ? contentFontSize * 23 : 0)
  const selectionMenuTop = 160 + contentFontSize * 4.42
  const colorMenuTop = selectionMenuTop + (colorMode === "highlight" ? contentFontSize * 1.7 + 14 : 0)
  const rows = state === "table-result" ? [...data.tableRows, data.addedTableRow] : data.tableRows
  return <ReleasePane state={state} lang={lang} height={height} title={fileName ?? `${data.title}.md`} className="ng-release-editor" >
    <style>{editorReleaseCss}</style>
    <div className="ng-release-editor-layout" data-with-outline={outline} style={{ "--ng-release-content-font-size": `${contentFontSize}px` } as CSSProperties}>
      {outline ? <aside className="ng-release-outline" data-release-outline="panel"><NoteGenOutlinePanel lang={lang} activeId={outlineJump ? "4" : "1"} items={data.outlineItems.map((title, index) => ({ id: String(index), title, level: index === 0 ? 1 : index === 2 || index === 3 || index === 5 ? 3 : 2 }))} /></aside> : null}
      <div className="ng-release-editor-center"><ReleaseTabBar fileName={fileName ?? `${data.title}.md`} />
        <article className="ng-release-document" data-release-document="body"><div data-release-document-target style={{ transform: scrollOffset ? `translateY(${-scrollOffset}px)` : undefined }}><div className="ng-release-file-path"><FileText />{text("工作 / 项目复盘", "Work / Project review")}</div><h1>{data.title}</h1><p className="ng-release-dim">{data.intro}</p>
          {!outline && !table && !heading ? <><div className="ng-release-color-paragraph"><p><span data-release-conclusion-text data-release-text-color data-release-selected-text={state === "color-menu" && colorMode === "text" ? true : undefined} className={state === "color-menu" && colorMode === "text" ? "ng-release-note-selection" : undefined} style={{ color: phase === "text" || phase === "both" ? textColors[3] : undefined }}>{data.highlightText}</span></p><p><span data-release-question-text data-release-selected-text={state === "color-menu" && colorMode === "highlight" ? true : undefined} className={state === "color-menu" && colorMode === "highlight" ? "ng-release-note-selection" : phase === "both" ? "ng-release-result-mark" : undefined}>{data.questionText}</span></p></div>{state === "color-menu" ? <div className="ng-release-popover ng-release-bubble" data-release-menu="selection" style={{ top: colorMenuTop }}><ReleaseIcon icon={Sparkles} label="AI" /><span className="ng-release-divider" /><NoteGenEditorFormatControls lang={lang} menu={colorMode === "text" ? "text" : "highlight"} textColor={textColors[3]} highlight={highlightColors[2]} /></div> : null}<h2>{data.sectionTitle}</h2><p>{data.sectionBody}</p><p><span>{data.followingBody}</span></p></> : null}
          {heading ? <div className="ng-release-heading-sample">{state === "heading-result" ? <h2 data-release-converted-heading>{data.followingTitle}</h2> : <p><span className="ng-release-note-selection" data-release-heading-selected>{data.followingTitle}</span></p>}<p className="ng-release-dim">{data.followingBody}</p>{state === "heading-menu" ? <div className="ng-release-popover ng-release-bubble" data-release-menu="selection" style={{ top: selectionMenuTop }}><ReleaseIcon icon={Sparkles} label="AI" /><span className="ng-release-divider" /><NoteGenEditorFormatControls lang={lang} menu="block" block="2" /></div> : null}</div> : null}
          {outline ? <><h2 className="ng-release-fold-heading" data-release-heading="toggle"><span>{data.sectionTitle}</span><span className="ng-release-fold-toggle" data-release-fold-toggle data-release-target="heading-fold" aria-label={folded ? text("展开标题", "Expand heading") : text("折叠标题", "Fold heading")} aria-expanded={!folded}>{folded ? <ChevronRight /> : <ChevronDown />}</span></h2>{!folded ? <div data-release-fold-body><p>{data.sectionBody}</p><h3>{data.outlineItems[2]}</h3><p>{text("梳理页面结构，确认主要操作路径。", "Review the page structure and confirm the main workflow.")}</p><h3>{data.outlineItems[3]}</h3><p>{data.highlightText}</p></div> : null}<h2 data-release-following-heading>{data.followingTitle}</h2><p>{data.followingBody}</p></> : null}
          {table ? <><div className="ng-release-table-area"><div className="ng-release-popover ng-release-table-toolbar" data-release-table-toolbar data-release-menu="table">{[BetweenHorizontalStart, BetweenHorizontalEnd, TableRowsSplit].map((Icon, index) => <ReleaseIcon key={index} icon={Icon} label={text(["在上方插入行", "在下方插入行", "删除行"][index], ["Add row before", "Add row after", "Delete row"][index])} target={index === 1 ? "add-row" : undefined} destructive={index === 2} />)}<span className="ng-release-divider" />{[BetweenVerticalStart, BetweenVerticalEnd, TableColumnsSplit].map((Icon, index) => <ReleaseIcon key={index} icon={Icon} label={text(["在左侧插入列", "在右侧插入列", "删除列"][index], ["Add column before", "Add column after", "Delete column"][index])} destructive={index === 2} />)}<span className="ng-release-divider" />{[AlignLeft, AlignCenter, AlignRight].map((Icon, index) => <ReleaseIcon key={index} icon={Icon} label={text(["左对齐", "居中", "右对齐"][index], ["Align left", "Align center", "Align right"][index])} active={state === "table-result" ? index === 1 : index === 0} target={index === 1 ? "table-align-center" : undefined} />)}<span className="ng-release-divider" /><ReleaseIcon icon={Trash2} label={text("删除表格", "Delete table")} destructive /></div><div className="ng-release-table-wrap"><table className="ng-release-table"><thead><tr>{data.tableColumns.map((item, index) => <th key={`${index}-${item}`}>{item}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} data-release-table-row={index} data-release-added-row={index === data.tableRows.length ? true : undefined} data-added={index === data.tableRows.length}>{row.map((item, col) => <td key={col} data-selected={index === 1 && col === 2} style={{ textAlign: state === "table-result" && col === 2 ? "center" : undefined }}>{renderTableCell(item)}</td>)}</tr>)}</tbody></table><div className="ng-release-table-scroll" data-release-table-scroll><span /></div></div></div><p className="ng-release-dim">{data.followingBody}</p></> : null}
        </div></article>
      </div>
    </div>
  </ReleasePane>
}

function renderTableCell(value: string) {
  if (!value) return "\u00a0"
  const lines = value.split("\n")
  return lines.map((line, index) => <span key={index}>{line}{index < lines.length - 1 ? <br /> : null}</span>)
}

const editorReleaseCss = `
.ng-release-editor .ng-release-document{font-size:var(--ng-release-content-font-size,16px)}.ng-release-editor .ng-release-document h1{font-size:calc(var(--ng-release-content-font-size,16px)*1.875)}.ng-release-editor .ng-release-document h2{font-size:calc(var(--ng-release-content-font-size,16px)*1.5)}.ng-release-editor .ng-release-document h3{font-size:calc(var(--ng-release-content-font-size,16px)*1.25)}.ng-release-editor .ng-release-table{font-size:inherit}.ng-release-heading-sample{margin-top:104px}.ng-release-heading-menu{top:251px;left:100px;z-index:2}.ng-release-heading-menu>.ng-release-menu-row>svg{width:16px;height:16px}
.ng-release-editor-layout{height:100%;display:flex}.ng-release-editor-center{flex:1;min-width:0;overflow:hidden}.ng-release-editor .ng-release-document{height:calc(100% - 40px);overflow:hidden}.ng-release-color-paragraph{margin-top:104px;margin-bottom:34px}.ng-release-editor .ng-release-bubble{left:56px;top:210px}.ng-release-color-button{position:relative;display:flex}.ng-release-color-button i{position:absolute;bottom:2px;left:6px;right:6px;height:2px;border-radius:2px}.ng-release-color-menu{top:251px;left:340px;z-index:2}.ng-release-menu-check svg{width:14px;height:14px}.ng-release-outline{width:246px;flex-shrink:0;border-right:1px solid var(--ng-r-border)}.ng-release-outline-tabs{height:48px;display:flex;align-items:center;gap:18px;border-bottom:1px solid var(--ng-r-border);padding:0 14px;color:var(--ng-r-dim)}.ng-release-outline-tabs>svg{width:16px;height:16px}.ng-release-outline-tabs>span{display:flex;align-items:center;gap:7px;padding:5px 9px;border-radius:6px;background:var(--ng-r-muted);color:var(--ng-r-fg)}.ng-release-outline-tabs>span svg{width:16px;height:16px}.ng-release-outline-search{height:34px;margin:12px 12px 8px;border:1px solid var(--ng-r-border);border-radius:8px;color:var(--ng-r-dim);display:flex;gap:8px;align-items:center;padding:0 9px}.ng-release-outline-search svg{width:14px;height:14px}.ng-release-outline ol{list-style:none;margin:0;padding:4px 8px}.ng-release-outline li{display:flex;align-items:center;gap:8px;padding:9px 8px;border-radius:5px;font-size:14px;color:var(--ng-r-dim)}.ng-release-outline li>svg{width:16px;height:16px}.ng-release-outline li[data-active="true"]{background:var(--ng-r-muted);color:var(--ng-r-fg)}.ng-release-outline-toggle{width:12px;flex-shrink:0}.ng-release-outline-toggle svg{width:12px;height:12px}.ng-release-editor-layout[data-with-outline="true"] .ng-release-document{padding:36px}.ng-release-fold-heading{display:flex;align-items:center;gap:4px}.ng-release-fold-toggle{display:inline-flex;width:20px;height:20px;align-items:center;justify-content:center;color:var(--ng-r-dim);border-radius:3px}.ng-release-fold-toggle svg{width:14px;height:14px;stroke-width:2.5}.ng-release-fold-toggle[aria-expanded="false"]{color:var(--ng-r-fg);background:var(--ng-r-muted)}.ng-release-table-area{position:relative;padding-top:44px;margin-top:20px}.ng-release-table-toolbar{display:flex;align-items:center;gap:4px;top:0;left:0;white-space:nowrap}.ng-release-table-area .ng-release-table-wrap{margin-top:0}.ng-release-table [data-added="true"] td{background:hsl(0 0% 98%/.06)}
`
