"use client"

import type { CSSProperties, ReactNode } from "react"
import {
  ChartNoAxesCombined, Check, ChevronDown, ChevronsUpDown,
  Copy, Download, Eraser, FileCode2, FileInput, FilePlus2, FileText,
  Folder, Grid3X3, Hand, Highlighter, ImageDown, ImagePlus, Layers3,
  Loader2, Lock, Magnet, Maximize2, MoreHorizontal, MousePointer2,
  Paintbrush, Palette, Pencil, Search, Shapes, Trash2, WandSparkles, X,
  ZoomIn, ZoomOut,
} from "lucide-react"

import { NoteGenAppShell } from "@/components/notegen/app-shell-replica"
import { NoteGenFileTreeRow } from "@/components/notegen/file-editor-replica"
import { NoteGenWorkspaceSidebar } from "@/components/notegen/workspace-switcher"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type NoteGenChartDemoPhase =
  | "note" | "canvas" | "create" | "notes-open" | "notes-selected"
  | "type-menu" | "generating" | "bar" | "edit" | "line" | "appearance" | "export"
  | "note-canvas-ready" | "note-canvas-dragging" | "note-canvas-generating" | "note-canvas-embedded"

export type NoteGenChartDemoState = {
  phase: NoteGenChartDemoPhase
  requestedType?: "auto" | "bar" | "line"
  editSource?: string
  title?: string
  selected?: boolean
  editing?: boolean
  notesSelected?: boolean
  noteTreeOpen?: boolean
  paletteMenuOpen?: boolean
  loadingRotation?: number
  drag?: { x: number; y: number; overEditor?: boolean; opacity?: number }
  noteScroll?: number
}

export type NoteGenChartDemoRow = { month: string; value: number }
export type NoteGenChartDemoNote = { title: string; path: string; rows: NoteGenChartDemoRow[]; description?: string }
export type NoteGenChartDemoImage = { src: string; relativePath: string; width?: number; height?: number }
export type NoteGenChartDemoChart = {
  title: string
  type: "bar" | "line"
  rows: NoteGenChartDemoRow[]
  palette?: "system" | "cool" | "warm" | "mono"
}
export type NoteGenChartWorkspaceProps = {
  lang?: NoteGenReplicaLanguage
  state: NoteGenChartDemoState
  note: NoteGenChartDemoNote
  chart: NoteGenChartDemoChart
  canvasImage?: NoteGenChartDemoImage
  theme?: "light" | "dark"
  className?: string
  onStateChange?: (state: NoteGenChartDemoState) => void
}

const paletteColors = { system: "hsl(220 70% 50%)", cool: "#2563eb", warm: "#ea580c", mono: "currentColor" }
const chartTypes = [
  ["auto", "自动识别", "Auto detect"], ["area", "面积图", "Area"],
  ["bar", "柱状图", "Bar"], ["line", "折线图", "Line"],
  ["pie", "饼图", "Pie"], ["radar", "雷达图", "Radar"], ["radial", "径向图", "Radial"],
] as const

/** Stable, data-driven SVG counterpart of the application's non-animated Recharts node. */
function ChartPlot({ chart, lang, thumbnail = false }: { chart: NoteGenChartDemoChart; lang: NoteGenReplicaLanguage; thumbnail?: boolean }) {
  const width = 480
  const height = 270
  const left = 48
  const top = 10
  const right = 12
  const bottom = 46
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom
  const maximum = Math.max(1000, Math.ceil(Math.max(...chart.rows.map(row => row.value), 0) / 1000) * 1000)
  const step = plotWidth / Math.max(1, chart.rows.length)
  const points = chart.rows.map((row, index) => ({
    x: left + step * (index + 0.5), y: top + plotHeight * (1 - row.value / maximum),
  }))
  const linePath = points.map((point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const previous = points[index - 1]
    const middle = (previous.x + point.x) / 2
    return `C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`
  }).join(" ")
  const color = paletteColors[chart.palette || "system"]
  return <svg data-chart-target={thumbnail ? undefined : "chart-plot"} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={chart.title} className="ng-chart-plot" style={{ color }}>
    <title>{chart.title}</title>
    {[0, 1, 2, 3, 4].map(index => {
      const y = top + plotHeight * (1 - index / 4)
      return <g key={index}>
        <line x1={left} y1={y} x2={width - right} y2={y} className="ng-chart-gridline" />
        {!thumbnail && <text x={left - 9} y={y + 4} textAnchor="end" className="ng-chart-axis">{maximum * index / 4}</text>}
      </g>
    })}
    {chart.type === "bar" ? chart.rows.map((row, index) => <rect key={row.month} x={points[index].x - step * 0.36} y={points[index].y} width={step * 0.72} height={Math.max(0, top + plotHeight - points[index].y)} rx={4} fill={color} />) : <path d={linePath} fill="none" stroke={color} strokeWidth={2} />}
    {!thumbnail && chart.rows.map((row, index) => <text key={row.month} x={points[index].x} y={top + plotHeight + 22} textAnchor="middle" className="ng-chart-axis">{row.month}</text>)}
    {!thumbnail && <g transform={`translate(${width / 2 - 32} ${height - 6})`}><rect width={8} height={8} y={-7} rx={2} fill={color} /><text x={14} className="ng-chart-axis">{lang === "en" ? "Expense" : "支出（元）"}</text></g>}
  </svg>
}

function ChoiceBox({ checked }: { checked?: boolean }) {
  return <span className={cn("ng-chart-checkbox", checked && "is-checked")}>{checked ? <Check size={12} strokeWidth={3} /> : null}</span>
}

/** Static image appearance follows canvas/static-export: a white chart card in an 800×500 transparent canvas. */
function createChartSnapshotUri(chart: NoteGenChartDemoChart, lang: NoteGenReplicaLanguage) {
  const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;")
  const maximum = Math.max(1, ...chart.rows.map(row => row.value))
  const plotWidth = 454
  const plotHeight = 240
  const point = (value: number, index: number) => ({ x: 48 + plotWidth * (index + 0.5) / chart.rows.length, y: 42 + plotHeight * (1 - value / maximum) })
  const color = { system: "#e76e50", cool: "#2563eb", warm: "#ea580c", mono: "#18181b" }[chart.palette || "system"]
  const grid = [0, .25, .5, .75, 1].map(ratio => `<line x1="48" y1="${42 + plotHeight * ratio}" x2="502" y2="${42 + plotHeight * ratio}" stroke="#d4d4d8" stroke-opacity=".55"/><text x="42" y="${46 + plotHeight * ratio}" text-anchor="end" font-family="sans-serif" font-size="10" fill="#71717a">${Number((maximum * (1 - ratio)).toFixed(2))}</text>`).join("")
  const labels = chart.rows.map((row, index) => `<text x="${point(row.value, index).x}" y="304" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#71717a">${escape(row.month.slice(0, 12))}</text>`).join("")
  const marks = chart.type === "line"
    ? `<polyline points="${chart.rows.map((row, index) => { const p = point(row.value, index); return `${p.x},${p.y}` }).join(" ")}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`
    : chart.rows.map((row, index) => { const p = point(row.value, index); return `<rect x="${p.x - 14}" y="${p.y}" width="26" height="${282 - p.y}" rx="3" fill="${color}"/>` }).join("")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><g transform="translate(64 64)"><rect width="520" height="340" rx="12" fill="#ffffff" stroke="#d4d4d8"/><text x="260" y="24" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="#18181b">${escape(chart.title)}</text>${grid}<line x1="48" y1="282" x2="502" y2="282" stroke="#a1a1aa"/>${marks}${labels}<g transform="translate(228 327)"><rect width="8" height="8" rx="2" fill="${color}"/><text x="12" y="8" font-family="sans-serif" font-size="10" fill="#52525b">${lang === "en" ? "Expense" : "支出（元）"}</text></g></g></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function ChartNoteDocument({ note, chart, lang, embedded = false, showDropTarget = false, image }: {
  note: NoteGenChartDemoNote; chart: NoteGenChartDemoChart; lang: NoteGenReplicaLanguage
  embedded?: boolean; showDropTarget?: boolean; image?: NoteGenChartDemoImage
}) {
  const en = lang === "en"
  return <article className="ng-chart-document"><h1>{note.title.replace(/\.md$/, "")}</h1><p>{note.description ?? (en ? "Living expenses for the first half of the year, in yuan." : "记录上半年的生活支出，单位：元。")}</p><table data-chart-target="note-table"><thead><tr><th>{en ? "Month" : "月份"}</th><th>{en ? "Expense (CNY)" : "支出（元）"}</th></tr></thead><tbody>{note.rows.map(row => <tr key={row.month}><td>{row.month}</td><td>{row.value}</td></tr>)}</tbody></table>{showDropTarget && <p data-chart-target="note-drop-target" className="ng-chart-note-drop-target">&nbsp;</p>}{embedded && <div data-node="image" data-resize-container className="ng-chart-inserted-image"><div className="ng-chart-image-wrapper"><img data-chart-target="canvas-inserted-image" src={image?.src || createChartSnapshotUri(chart, lang)} alt={chart.title} data-relative-src={image?.relativePath || undefined} style={image?.width ? { width: image.width } : undefined} /></div></div>}</article>
}

function DemoMenuItem({ children, icon, active, target, onClick }: { children: ReactNode; icon?: ReactNode; active?: boolean; target?: string; onClick?: () => void }) {
  return <Button variant="ghost" className="ng-chart-menu-item" data-chart-target={target} role="menuitem" onClick={onClick}>{icon}<span>{children}</span>{active ? <Check size={14} className="ml-auto" /> : null}</Button>
}

/** PC display replica. All data and state changes are supplied by the caller; no app services run. */
export function NoteGenChartWorkspace({ lang = "cn", state, note, chart, canvasImage, theme = "dark", className, onStateChange }: NoteGenChartWorkspaceProps) {
  const en = lang === "en"
  const text = (cnText: string, enText: string) => en ? enText : cnText
  const phase = state.phase
  const isCanvasNote = phase.startsWith("note-canvas-")
  const isNote = phase === "note" || isCanvasNote
  const canvasDragging = phase === "note-canvas-dragging"
  const canvasDropPending = phase === "note-canvas-generating"
  const editing = phase === "edit" || Boolean(state.editing)
  const panelOpen = ["create", "notes-open", "notes-selected", "type-menu", "edit"].includes(phase)
  const treeOpen = phase === "notes-open" || Boolean(state.noteTreeOpen)
  const notesSelected = state.notesSelected ?? (["notes-selected", "type-menu"].includes(phase) && !editing)
  const hasChart = ["generating", "bar", "edit", "line", "appearance", "export"].includes(phase) || editing || isCanvasNote
  const selected = state.selected ?? phase === "appearance"
  const requestedType = state.requestedType || (editing ? chart.type : "auto")
  const typeLabel = chartTypes.find(type => type[0] === requestedType)?.[en ? 2 : 1]
  const source = state.editSource ?? (editing ? JSON.stringify(chart.rows.map(row => ({ [text("月份", "Month")]: row.month, [text("支出（元）", "Expense")]: row.value })), null, 2) : "")
  const fileName = note.title.endsWith(".md") ? note.title : `${note.title}.md`
  const folderName = note.path.split("/").slice(0, -1).join("/") || text("生活记录", "Personal")
  const emit = (patch: Partial<NoteGenChartDemoState>) => onStateChange?.({ ...state, ...patch })
  const themeValues = theme === "dark" ? {
    background: "hsl(240 10% 3.9%)", foreground: "hsl(0 0% 98%)", muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(240 5% 64.9%)", border: "hsl(240 3.7% 15.9%)", primaryForeground: "hsl(240 5.9% 10%)", sidebar: "hsl(240 5.9% 10%)",
  } : { background: "white", foreground: "hsl(240 10% 3.9%)", muted: "hsl(240 4.8% 95.9%)", mutedForeground: "hsl(240 3.8% 46.1%)", border: "hsl(240 5.9% 90%)", primaryForeground: "white", sidebar: "hsl(0 0% 98%)" }
  const tokens: CSSProperties = {
    colorScheme: theme,
    "--background": themeValues.background, "--foreground": themeValues.foreground,
    "--card": themeValues.background, "--card-foreground": themeValues.foreground,
    "--popover": themeValues.background, "--popover-foreground": themeValues.foreground,
    "--muted": themeValues.muted, "--muted-foreground": themeValues.mutedForeground,
    "--border": themeValues.border, "--input": themeValues.border,
    "--accent": themeValues.muted, "--accent-foreground": themeValues.foreground,
    "--primary": themeValues.foreground, "--primary-foreground": themeValues.primaryForeground,
    "--secondary": themeValues.muted, "--secondary-foreground": themeValues.foreground,
    "--sidebar": themeValues.sidebar, "--ring": themeValues.mutedForeground,
    "--color-background": themeValues.background, "--color-foreground": themeValues.foreground,
    "--color-card": themeValues.background, "--color-card-foreground": themeValues.foreground,
    "--color-popover": themeValues.background, "--color-popover-foreground": themeValues.foreground,
    "--color-muted": themeValues.muted, "--color-muted-foreground": themeValues.mutedForeground,
    "--color-border": themeValues.border, "--color-input": themeValues.border,
    "--color-accent": themeValues.muted, "--color-accent-foreground": themeValues.foreground,
    "--color-primary": themeValues.foreground, "--color-primary-foreground": themeValues.primaryForeground,
    "--color-secondary": themeValues.muted, "--color-secondary-foreground": themeValues.foreground,
    "--color-sidebar": themeValues.sidebar, "--color-ring": themeValues.mutedForeground,
  } as CSSProperties
  const canvasControls = <div className="ng-chart-footer-controls">
    {[[Grid3X3, text("网格", "Grid")], [Magnet, text("吸附", "Snap")], [WandSparkles, text("布局", "Layout")], [FileInput, text("导入", "Import")]].map(([Icon, label]) => {
      const ControlIcon = Icon as typeof Grid3X3
      return <Button key={String(label)} variant="ghost" className="ng-chart-footer-button"><ControlIcon size={12} />{String(label)}</Button>
    })}
    <Button variant="ghost" className="ng-chart-footer-button" data-chart-target="export-trigger" onClick={() => emit({ phase: "export" })}><Download size={12} />{text("导出", "Export")}</Button>
    <Button variant="ghost" className="ng-chart-footer-button"><ZoomOut size={12} /></Button><span>100%</span><span className="ng-chart-zoom-track"><i /></span><Button variant="ghost" className="ng-chart-footer-button"><ZoomIn size={12} /></Button>
    <Button variant="ghost" className="ng-chart-footer-button"><Maximize2 size={12} />{text("适应画布", "Fit canvas")}</Button>
  </div>

  return <div data-chart-target="workspace" data-chart-phase={phase} data-theme={theme} className={cn("ng-chart-workspace replica", theme === "dark" && "dark", className)} style={tokens}>
    <style>{chartWorkspaceCss}</style>
    <NoteGenAppShell lang={lang} workspace={isNote ? "writing" : "canvas"} className="ng-chart-shell" titleBarProps={{ panels: { left: true, center: true, right: false } }} statusBarProps={{ workspaceName: text("默认工作区", "Default workspace"), modelLabel: text("已配置模型", "Configured model"), characterCount: 184, canvasControls }}>
      <div className="ng-chart-layout">
        <NoteGenWorkspaceSidebar lang={lang} value={isNote && !isCanvasNote ? "writing" : "canvas"} onValueChange={value => emit({ phase: value === "canvas" ? "canvas" : "note" })} actions={<div className="flex items-center"><Button variant="ghost" size="icon" aria-label={text("新建", "New")}><FilePlus2 size={16} /></Button><Button variant="ghost" size="icon" aria-label={text("更多", "More")}><MoreHorizontal size={16} /></Button></div>}>
          {isNote && !isCanvasNote ? <div className="ng-chart-files"><div className="ng-chart-search"><Search size={14} />{text("搜索笔记", "Search notes")}</div><NoteGenFileTreeRow name={folderName} kind="folder" open /><NoteGenFileTreeRow name={fileName} depth={1} active /></div> : <div className="ng-chart-projects"><article data-chart-target="canvas-card" className="ng-chart-project"><div className="ng-chart-thumbnail">{isCanvasNote ? <img src={canvasImage?.src || createChartSnapshotUri(chart, lang)} alt="" /> : hasChart && phase !== "generating" ? <ChartPlot chart={chart} lang={lang} thumbnail /> : <span className="ng-chart-thumbnail-empty" />}</div><div><span>{chart.title}</span><MoreHorizontal size={14} /></div></article></div>}
        </NoteGenWorkspaceSidebar>
        <main className="ng-chart-main">
          <div className="ng-chart-tabs"><Button variant="ghost" className={cn("ng-chart-tab", isNote && "is-active")} data-chart-target="note-tab" onClick={() => emit({ phase: hasChart ? "note-canvas-ready" : "note" })}><FileText size={15} /><span>{fileName}</span><X size={13} /></Button>{(!isNote || isCanvasNote) && <Button variant="ghost" className={cn("ng-chart-tab", !isNote && "is-active")} data-chart-target="canvas-tab" onClick={() => emit({ phase: chart.type })}><Palette size={15} /><span>{chart.title}</span><X size={13} /></Button>}</div>
          {isNote ? <div className="ng-chart-note-viewport" data-chart-target="note-viewport" data-chart-note-scroll={state.noteScroll ?? 0} ref={element => { if (element && state.noteScroll !== undefined) element.scrollTop = state.noteScroll }}><ChartNoteDocument note={note} chart={chart} lang={lang} embedded={phase === "note-canvas-embedded"} showDropTarget={isCanvasNote && phase !== "note-canvas-embedded"} image={canvasImage} />{(canvasDropPending || canvasDragging && state.drag?.overEditor) && <div data-chart-target="canvas-drop-overlay" className={cn("ng-chart-canvas-drop-overlay", canvasDropPending && "is-generating")}><div data-chart-target="canvas-drop-hint">{canvasDropPending && <Loader2 size={16} style={{ transform: `rotate(${state.loadingRotation || 0}deg)` }} />}<span>{canvasDropPending ? text("正在生成画布图片…", "Generating canvas image…") : text("松开以插入画布图片", "Drop to insert canvas image")}</span></div></div>}</div> : <section className="ng-chart-surface" data-chart-target="canvas-surface">
            <div className="ng-chart-rail" role="toolbar" aria-label={text("画布工具", "Canvas tools")}>
              {[[MousePointer2, "选择", "Select"], [Hand, "抓手", "Hand"], [Pencil, "画笔", "Pen"], [Highlighter, "荧光笔", "Highlighter"], [Eraser, "橡皮擦", "Eraser"], [Shapes, "形状", "Shapes"], [ChartNoAxesCombined, "图表", "Chart"], [ImagePlus, "图片", "Image"]].map(([Icon, cnLabel, enLabel], index) => {
                const ToolIcon = Icon as typeof MousePointer2
                return <div key={index}>{index === 2 || index === 5 ? <div className="ng-chart-rail-separator" /> : null}<Button variant={index === 0 && !panelOpen || index === 6 && panelOpen ? "secondary" : "ghost"} size="icon" data-chart-target={index === 6 ? "chart-tool" : undefined} aria-label={String(en ? enLabel : cnLabel)} onClick={index === 6 ? () => emit({ phase: panelOpen ? "canvas" : "create", editing: false }) : undefined}><ToolIcon size={16} /></Button></div>
              })}
            </div>
            {hasChart && <div data-chart-target="chart-node" className={cn("ng-chart-node", selected && !panelOpen && "is-selected")} onDoubleClick={() => emit({ phase: "edit", editing: true, requestedType: chart.type })}>
              <span className="ng-chart-handle top" /><span className="ng-chart-handle bottom" /><span className="ng-chart-handle left" /><span className="ng-chart-handle right" />
              {selected && !panelOpen && ["top-left", "top-right", "bottom-left", "bottom-right"].map(corner => <span key={corner} className={`ng-chart-resize ${corner}`} />)}
              <h3>{chart.title}</h3>{phase === "generating" ? <div className="ng-chart-loading"><Loader2 size={24} style={{ transform: `rotate(${state.loadingRotation || 0}deg)` }} /><span>{text("正在生成图表…", "Generating chart…")}</span></div> : <ChartPlot chart={chart} lang={lang} />}
            </div>}
            {panelOpen && <section data-chart-target="editor-panel" className="ng-chart-editor">
              <header><div><h2>{editing ? text("编辑数据图表", "Edit data chart") : text("创建数据图表", "Create data chart")}</h2><p>{text("输入数据后直接插入画布，节点会在后台完成解析。", "Insert data into the canvas. The node is parsed in the background.")}</p></div><Button variant="ghost" size="icon" aria-label={text("关闭", "Close")} onClick={() => emit({ phase: hasChart ? chart.type : "canvas", editing: false })}><X size={16} /></Button></header>
              <div className="ng-chart-form">
                <div className="ng-chart-form-top"><label>{text("图表标题", "Chart title")}<Input data-chart-target="title-input" value={state.title ?? (editing ? chart.title : "")} placeholder={text("留空则自动生成", "Leave empty to generate")} readOnly={!onStateChange} onChange={event => emit({ title: event.target.value })} /></label><label>{text("图表类型", "Chart type")}<Button variant="outline" data-chart-target="type-select" className="ng-chart-select" onClick={() => emit({ phase: "type-menu", editing })}><span>{typeLabel}</span><ChevronsUpDown size={14} /></Button></label></div>
                {phase === "type-menu" && <div data-chart-target="type-menu" className="ng-chart-menu ng-chart-type-menu" role="menu">{chartTypes.map(([value, cnLabel, enLabel]) => <DemoMenuItem key={value} active={requestedType === value} target={`type-${value}`} onClick={value === "bar" || value === "line" || value === "auto" ? () => emit({ phase: editing ? "edit" : "notes-selected", requestedType: value, editing }) : undefined}>{en ? enLabel : cnLabel}</DemoMenuItem>)}</div>}
                <label className="ng-chart-note-field">{text("引用笔记", "Reference notes")}<Button variant="outline" className="ng-chart-select" data-chart-target="note-picker" onClick={() => emit({ phase: treeOpen ? "notes-selected" : "notes-open", editing, noteTreeOpen: !treeOpen })}><span>{notesSelected ? text("已选择 1 篇笔记", "1 note selected") : text("选择笔记", "Select notes")}</span><ChevronsUpDown size={14} /></Button>{notesSelected && <Badge variant="secondary" className="ng-chart-note-badge">{fileName}</Badge>}</label>
                {treeOpen && <div data-chart-target="note-tree" className="ng-chart-menu ng-chart-note-tree"><h3>{text("图表数据来源", "Chart data sources")}</h3><p>{text("选择一篇或多篇笔记作为图表数据来源。", "Select one or more notes as chart data sources.")}</p><Input aria-label={text("搜索笔记", "Search notes")} placeholder={text("搜索笔记", "Search notes")} readOnly /><div className="ng-chart-tree-items"><div className="ng-chart-folder"><ChoiceBox checked={notesSelected} /><ChevronDown size={14} /><Folder size={16} /><span>{folderName}</span></div><Button variant="ghost" className="ng-chart-tree-note" data-chart-target="note-checkbox" role="checkbox" aria-checked={notesSelected} onClick={() => emit({ phase: "notes-selected", noteTreeOpen: false, notesSelected: true })}><ChoiceBox checked={notesSelected} /><FileText size={16} /><span>{fileName}</span></Button></div></div>}
                <label className="ng-chart-data-field">{text("数据", "Data")}<small>{text("支持自然语言描述，以及 CSV、TSV、Markdown 表格和 JSON 格式。", "Supports natural language, CSV, TSV, Markdown tables, and JSON.")}</small><Textarea data-chart-target="source-input" spellCheck={false} value={source} readOnly={!onStateChange} onChange={event => emit({ editSource: event.target.value })} placeholder={text("月份,桌面端,移动端\n一月,186,80\n二月,305,200", "Month,Desktop,Mobile\nJanuary,186,80\nFebruary,305,200")} /></label>
              </div>
              <footer><Button variant="outline" onClick={() => emit({ phase: hasChart ? chart.type : "canvas", editing: false })}>{text("取消", "Cancel")}</Button><Button data-chart-target="submit" disabled={!source.trim() && !notesSelected} onClick={() => emit({ phase: "generating", editing: false })}>{editing ? text("重新生成", "Regenerate") : text("插入画布", "Insert into canvas")}</Button></footer>
            </section>}
            {phase === "appearance" && <section data-chart-target="appearance-panel" className="ng-chart-appearance"><header><h2>{text("选中工具", "Selection tools")}</h2><Button variant="ghost" size="icon" onClick={() => emit({ phase: chart.type })}><X size={16} /></Button></header><div className="ng-chart-selection-actions">{[[Lock, "锁定", "Lock"], [Layers3, "保存为组件", "Save component"], [Paintbrush, "复制样式", "Copy style"], [Copy, "粘贴样式", "Paste style"], [Trash2, "删除", "Delete"]].map(([Icon, cnLabel, enLabel], index) => { const ActionIcon = Icon as typeof Lock; return <Button key={index} variant="ghost"><ActionIcon size={16} />{String(en ? enLabel : cnLabel)}</Button> })}</div><div className="ng-chart-appearance-fields"><h3>{text("图表外观", "Chart appearance")}</h3><label>{text("容器样式", "Container style")}<Button variant="outline" className="ng-chart-select"><span>{text("卡片", "Card")}</span><ChevronsUpDown size={13} /></Button></label><label>{text("配色方案", "Palette")}<Button variant="outline" className="ng-chart-select" data-chart-target="palette-select" onClick={() => emit({ paletteMenuOpen: !state.paletteMenuOpen })}><span>{({ system: text("系统", "System"), cool: text("冷色", "Cool"), warm: text("暖色", "Warm"), mono: text("单色", "Monochrome") })[chart.palette || "system"]}</span><ChevronsUpDown size={13} /></Button></label>{state.paletteMenuOpen && <div className="ng-chart-menu ng-chart-palette-menu" role="menu">{[["system", "系统", "System"], ["cool", "冷色", "Cool"], ["warm", "暖色", "Warm"], ["mono", "单色", "Monochrome"]].map(([value, cnLabel, enLabel]) => <DemoMenuItem key={value} target={`palette-${value}`} active={(chart.palette || "system") === value}>{en ? enLabel : cnLabel}</DemoMenuItem>)}</div>}{[["标题", "title"], ["图例", "legend"], ["网格", "grid"], ["分类轴", "category axis"], ["数值轴", "value axis"]].map(([cnLabel, enLabel]) => <label key={enLabel}>{en ? `Show ${enLabel}` : `显示${cnLabel}`}<span className="ng-chart-switch" role="switch" aria-checked="true"><i /></span></label>)}</div></section>}
          </section>}
        </main>
      </div>
    </NoteGenAppShell>
    {canvasDragging && <div data-chart-target="canvas-drag-ghost" className="ng-chart-drag-ghost" style={{ left: state.drag?.x ?? 24, top: state.drag?.y ?? 120, opacity: state.drag?.opacity ?? .55 }} aria-hidden="true"><article className="ng-chart-project"><div className="ng-chart-thumbnail"><img src={canvasImage?.src || createChartSnapshotUri(chart, lang)} alt="" /></div><div><span>{chart.title}</span><MoreHorizontal size={14} /></div></article></div>}
    {phase === "export" && <div data-chart-target="export-menu" className="ng-chart-menu ng-chart-export-menu" role="menu"><DemoMenuItem icon={<ImagePlus size={16} />}>{text("导出为插图记录", "Export as illustration record")}</DemoMenuItem><div className="ng-chart-menu-label">{text("保存到电脑", "Save to computer")}</div><DemoMenuItem icon={<ImageDown size={16} />} target="export-png2x">{text("PNG · 2× 高清", "PNG · 2× high resolution")}</DemoMenuItem><DemoMenuItem icon={<ImageDown size={16} />} target="export-png4x">{text("PNG · 4× 超清", "PNG · 4× ultra resolution")}</DemoMenuItem><DemoMenuItem icon={<FileCode2 size={16} />} target="export-svg">{text("SVG · 矢量图", "SVG · vector")}</DemoMenuItem><div className="ng-chart-menu-label">{text("可编辑文件", "Editable files")}</div><DemoMenuItem icon={<FileCode2 size={16} />} target="export-canvas">{text("NoteGen Canvas JSON", "NoteGen Canvas JSON")}</DemoMenuItem><DemoMenuItem icon={<FileCode2 size={16} />}>{text("Mermaid 流程图", "Mermaid flowchart")}</DemoMenuItem></div>}
  </div>
}

const chartWorkspaceCss = `
.ng-chart-workspace{position:relative;width:1360px;height:720px;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",sans-serif;color:var(--color-foreground);font-size:14px;line-height:1.5;background:var(--color-background)}
.ng-chart-workspace{--ng-chart-scrollbar-thumb:color-mix(in srgb,var(--color-muted-foreground) 26%,transparent);--ng-chart-scrollbar-thumb-hover:color-mix(in srgb,var(--color-muted-foreground) 48%,transparent);--ng-chart-scrollbar-thumb-active:color-mix(in srgb,var(--color-foreground) 62%,transparent);--ng-chart-scrollbar-track-hover:color-mix(in srgb,var(--color-muted) 28%,transparent)}
.ng-chart-workspace :not(table){scrollbar-width:thin;scrollbar-color:var(--ng-chart-scrollbar-thumb) transparent}.ng-chart-workspace :not(table)::-webkit-scrollbar{width:6px;height:6px}.ng-chart-workspace :not(table)::-webkit-scrollbar-track{background:transparent}.ng-chart-workspace :not(table)::-webkit-scrollbar-track:hover{background:var(--ng-chart-scrollbar-track-hover)}.ng-chart-workspace :not(table)::-webkit-scrollbar-thumb{border:0;border-radius:9999px;background:var(--ng-chart-scrollbar-thumb)}.ng-chart-workspace :not(table)::-webkit-scrollbar-thumb:hover{background:var(--ng-chart-scrollbar-thumb-hover)}.ng-chart-workspace :not(table)::-webkit-scrollbar-thumb:active{background:var(--ng-chart-scrollbar-thumb-active)}.ng-chart-workspace :not(table)::-webkit-scrollbar-corner{background:transparent}
.ng-chart-workspace *,.ng-chart-workspace *:before,.ng-chart-workspace *:after{box-sizing:border-box;border-color:var(--color-border)}.ng-chart-workspace svg{flex-shrink:0}.ng-chart-workspace button{font-family:inherit}.ng-chart-shell{height:100%;border-radius:10px}.ng-chart-shell>[data-notegen-replica="title-bar"]{height:36px}.ng-chart-layout{display:grid;grid-template-columns:300px minmax(0,1fr);height:100%}.ng-chart-main{display:flex;min-width:0;flex-direction:column;overflow:hidden}.ng-chart-tabs{height:48px;display:flex;align-items:stretch;flex-shrink:0;border-bottom:1px solid var(--color-border)}.ng-chart-tab{height:48px;border-radius:0;gap:6px;max-width:224px;padding:0 12px;font-size:14px;color:var(--color-muted-foreground)}.ng-chart-tab span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-chart-tab.is-active{color:var(--color-foreground);background:var(--color-muted);border-bottom:2px solid var(--color-foreground)}.ng-chart-tab svg:last-child{margin-left:10px}
.ng-chart-files{padding:8px}.ng-chart-files>div:not(.ng-chart-search){height:32px;font-size:14px}.ng-chart-search{height:32px;display:flex;align-items:center;gap:8px;padding:0 8px;background:var(--color-muted);color:var(--color-muted-foreground);font-size:13px;border-radius:6px;margin-bottom:12px}.ng-chart-projects{padding:8px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ng-chart-project{min-width:0;border:1px solid var(--color-foreground);border-radius:8px;overflow:hidden;box-shadow:0 0 0 1px color-mix(in srgb,var(--color-foreground) 20%,transparent)}.ng-chart-project>div:last-child{display:flex;align-items:center;gap:5px;padding:8px}.ng-chart-project>div:last-child span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:14px}.ng-chart-project>div:last-child svg{margin-left:auto}.ng-chart-thumbnail{height:100px;border-bottom:1px solid var(--color-border);background:radial-gradient(circle,var(--color-border) 1px,transparent 1px);background-size:8px 8px;padding:9px}.ng-chart-thumbnail .ng-chart-plot{width:100%;height:100%}.ng-chart-document{padding:36px 56px;max-width:840px;width:100%;margin:0 auto}.ng-chart-document h1{font-size:30px;font-weight:600;letter-spacing:-.5px;margin:0 0 20px}.ng-chart-document p{font-size:16px;margin:0 0 26px;color:var(--color-muted-foreground)}.ng-chart-document table{width:100%;border-collapse:collapse;font-size:16px}.ng-chart-document th,.ng-chart-document td{height:45px;text-align:left;border:1px solid var(--color-border);padding:10px 16px}.ng-chart-document th{background:var(--color-muted);font-weight:600}
.ng-chart-surface{position:relative;flex:1;min-height:0;overflow:hidden;background:radial-gradient(circle,var(--color-border) 1px,transparent 1px);background-size:20px 20px}.ng-chart-rail{position:absolute;left:12px;top:12px;z-index:10;width:48px;display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--color-border);border-radius:12px;padding:4px;background:var(--color-background);box-shadow:0 1px 3px #0002}.ng-chart-rail>div{width:100%}.ng-chart-rail button{width:38px;height:36px}.ng-chart-rail-separator{height:1px;background:var(--color-border);margin-bottom:5px}
.ng-chart-node{position:absolute;left:320px;top:132px;width:520px;height:340px;background:var(--color-card);border:1px solid var(--color-border);border-radius:12px;padding:16px;box-shadow:0 1px 3px #0002;display:flex;flex-direction:column;gap:8px}.ng-chart-node.is-selected{outline:2px solid color-mix(in srgb,var(--color-ring) 50%,transparent);box-shadow:0 4px 6px #0002}.ng-chart-node h3{font-size:14px;font-weight:500;line-height:20px;text-align:center;margin:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ng-chart-plot{width:100%;min-height:0;flex:1}.ng-chart-axis{fill:var(--color-muted-foreground);font-size:12px;font-family:inherit}.ng-chart-gridline{stroke:var(--color-border);stroke-width:1}.ng-chart-handle{position:absolute;width:6px;height:6px;border:1px solid var(--color-foreground);background:var(--color-background);border-radius:50%}.ng-chart-handle.top{left:50%;top:-4px}.ng-chart-handle.bottom{left:50%;bottom:-4px}.ng-chart-handle.left{left:-4px;top:50%}.ng-chart-handle.right{right:-4px;top:50%}.ng-chart-resize{position:absolute;width:6px;height:6px;background:var(--color-ring);border:1px solid var(--color-background)}.ng-chart-resize.top-left{left:-4px;top:-4px}.ng-chart-resize.top-right{right:-4px;top:-4px}.ng-chart-resize.bottom-left{left:-4px;bottom:-4px}.ng-chart-resize.bottom-right{right:-4px;bottom:-4px}.ng-chart-loading{flex:1;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;color:var(--color-muted-foreground);font-size:14px}
.ng-chart-editor{position:absolute;z-index:20;top:12px;bottom:12px;left:68px;width:480px;display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--color-border);border-radius:12px;background:var(--color-background);box-shadow:0 10px 15px #0003}.ng-chart-editor>header,.ng-chart-appearance>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--color-border);flex-shrink:0;min-height:64px}.ng-chart-editor h2,.ng-chart-appearance h2{font-size:14px;font-weight:500;margin:0}.ng-chart-editor header p{font-size:12px;color:var(--color-muted-foreground);margin:2px 0 0;line-height:16px}.ng-chart-editor header button{width:28px;height:28px}.ng-chart-form{position:relative;display:flex;min-height:0;flex:1;flex-direction:column;gap:20px;padding:16px}.ng-chart-form label{display:flex;min-width:0;flex-direction:column;gap:8px;font-size:14px;font-weight:500}.ng-chart-form-top{display:grid;grid-template-columns:minmax(0,1fr) 160px;gap:16px}.ng-chart-form input{height:36px;font-size:14px;padding:4px 12px}.ng-chart-select{display:flex;justify-content:space-between;width:100%;height:36px;gap:8px;font-size:14px;font-weight:400;padding:4px 12px}.ng-chart-select>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-chart-select svg{color:var(--color-muted-foreground)}.ng-chart-note-badge{max-width:100%;width:fit-content;font-size:12px;line-height:20px;padding:0 8px}.ng-chart-data-field{min-height:0;flex:1}.ng-chart-data-field small{font-size:12px;font-weight:400;color:var(--color-muted-foreground);line-height:16px}.ng-chart-data-field textarea{min-height:0;flex:1;resize:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:17px;padding:8px 12px;field-sizing:fixed;white-space:pre}.ng-chart-editor>footer{display:flex;justify-content:flex-end;gap:8px;flex-shrink:0;padding:12px;border-top:1px solid var(--color-border)}.ng-chart-editor>footer button{height:36px;font-size:14px;padding:4px 16px}
.ng-chart-menu{position:absolute;z-index:40;background:var(--color-popover);color:var(--color-popover-foreground);border:1px solid var(--color-border);border-radius:6px;padding:4px;box-shadow:0 10px 18px #0004;font-size:14px}.ng-chart-menu-item{display:flex;justify-content:flex-start;width:100%;height:32px;padding:6px 8px;font-size:14px;font-weight:400;border-radius:4px;gap:8px;text-align:left}.ng-chart-menu-item span{min-width:0}.ng-chart-type-menu{top:80px;right:16px;width:160px}.ng-chart-type-menu .ng-chart-menu-item{height:30px;padding-left:24px}.ng-chart-type-menu .ng-chart-menu-item>svg:last-child{position:absolute;left:7px}.ng-chart-note-tree{left:16px;top:173px;width:420px;padding:0;min-height:330px;overflow:hidden}.ng-chart-note-tree h3{font-size:14px;font-weight:500;margin:12px 12px 4px}.ng-chart-note-tree p{font-size:12px;color:var(--color-muted-foreground);margin:0 12px 12px}.ng-chart-note-tree>input{width:calc(100% - 24px);margin:0 12px 12px}.ng-chart-tree-items{border-top:1px solid var(--color-border);padding:8px}.ng-chart-folder{display:flex;align-items:center;gap:5px;height:36px;font-size:14px}.ng-chart-tree-note{display:flex;gap:8px;justify-content:flex-start;padding:6px 8px 6px 24px;width:100%;height:36px;font-size:14px;font-weight:400}.ng-chart-tree-note span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ng-chart-checkbox{display:inline-flex;flex-shrink:0;width:16px;height:16px;border:1px solid var(--color-input);border-radius:4px;background:transparent}.ng-chart-checkbox.is-checked{background:var(--color-primary);color:var(--color-primary-foreground);align-items:center;justify-content:center}
.ng-chart-appearance{position:absolute;z-index:20;top:12px;left:68px;width:288px;border:1px solid var(--color-border);border-radius:12px;background:var(--color-background);box-shadow:0 10px 15px #0003;overflow:visible}.ng-chart-appearance>header{min-height:48px;align-items:center;padding:8px 16px}.ng-chart-appearance header button{height:28px;width:28px}.ng-chart-selection-actions{display:grid;grid-template-columns:1fr 1fr;padding:8px;gap:6px}.ng-chart-selection-actions button{height:32px;justify-content:flex-start;font-size:14px;padding:4px 8px}.ng-chart-appearance-fields{position:relative;display:flex;flex-direction:column;gap:12px;padding:12px;border-top:1px solid var(--color-border)}.ng-chart-appearance-fields h3{font-size:12px;color:var(--color-muted-foreground);font-weight:500;margin:0}.ng-chart-appearance-fields>label{height:32px;display:flex;justify-content:space-between;align-items:center;font-size:14px;gap:8px}.ng-chart-appearance-fields .ng-chart-select{width:128px;height:32px}.ng-chart-switch{width:28px;height:16px;background:var(--color-primary);border-radius:20px;padding:2px;display:flex;justify-content:flex-end}.ng-chart-switch i{display:block;width:12px;height:12px;background:var(--color-background);border-radius:50%}.ng-chart-palette-menu{right:12px;top:110px;width:128px}
.ng-chart-footer-controls{display:flex;align-items:center;gap:2px;flex-shrink:0;font-size:12px;color:var(--color-muted-foreground)}.ng-chart-footer-button{height:20px;padding:0 5px;font-size:12px;font-weight:400;gap:4px;border-radius:3px}.ng-chart-footer-button svg{width:12px;height:12px}.ng-chart-zoom-track{display:block;width:60px;height:4px;border-radius:8px;background:var(--color-muted);margin:0 4px;position:relative}.ng-chart-zoom-track i{position:absolute;left:28px;top:-3px;width:10px;height:10px;border-radius:50%;background:var(--color-foreground)}.ng-chart-export-menu{left:410px;bottom:29px;width:240px}.ng-chart-menu-label{padding:8px;font-size:12px;font-weight:500;color:var(--color-muted-foreground);border-top:1px solid var(--color-border);margin-top:4px}
.ng-chart-note-viewport{position:relative;min-height:0;flex:1;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}.ng-chart-note-drop-target{min-height:28px;margin:16px 0!important}.ng-chart-workspace[data-chart-phase^="note-canvas-"] .ng-chart-project{border-color:var(--color-border);box-shadow:none}.ng-chart-thumbnail>img{display:block;width:100%;height:100%;object-fit:contain}.ng-chart-drag-ghost{position:absolute;width:138px;z-index:80;pointer-events:none;filter:drop-shadow(0 4px 6px #0003)}.ng-chart-drag-ghost .ng-chart-project{background:var(--color-background);border-color:var(--color-border);box-shadow:none}.ng-chart-canvas-drop-overlay{position:absolute;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;pointer-events:none;border:2px solid color-mix(in srgb,var(--color-primary) 60%,transparent);background:color-mix(in srgb,var(--color-primary) 5%,transparent)}.ng-chart-canvas-drop-overlay.is-generating{border-color:transparent;background:transparent}.ng-chart-canvas-drop-overlay>div{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--color-border);border-radius:6px;background:color-mix(in srgb,var(--color-background) 95%,transparent);box-shadow:0 4px 6px #0002;font-size:14px;line-height:20px;backdrop-filter:blur(8px)}.ng-chart-inserted-image{display:inline-flex;max-width:100%;vertical-align:middle;margin:1em 0;line-height:0}.ng-chart-image-wrapper{max-width:100%;line-height:0}.ng-chart-image-wrapper>img{display:block;width:800px;max-width:100%;height:auto;margin:0;border-radius:8px}
`
