"use client"

import { useEffect, useRef, useState } from "react"
import { Bold, BrainCircuit, CheckSquare, ChevronRight, Code, Highlighter, Italic, Languages, Link, List, ListOrdered, ListTodo, Maximize2, Minimize2, Quote, Sparkles, Strikethrough, Timer, Underline, Workflow, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./model-settings/ui/button"
import { Input } from "./model-settings/ui/input"
import { Separator } from "./model-settings/ui/separator"
import { TutorialMarker } from "./tutorial-marker"
import type { NoteGenReplicaLanguage } from "./types"

// Geometry, order, and control styles follow editor/markdown/bubble-menu.tsx.
// Plugin-contributed buttons are omitted for the default, plugins-disabled scene.
const formats: Array<{ key: string; icon: LucideIcon; cn: string; en: string }> = [
  { key: "bold", icon: Bold, cn: "粗体", en: "Bold" },
  { key: "italic", icon: Italic, cn: "斜体", en: "Italic" },
  { key: "strike", icon: Strikethrough, cn: "删除线", en: "Strikethrough" },
  { key: "underline", icon: Underline, cn: "下划线", en: "Underline" },
  { key: "code", icon: Code, cn: "行内代码", en: "Inline code" },
  { key: "highlight", icon: Highlighter, cn: "高亮", en: "Highlight" },
]
const blocks: Array<{ key: string; icon: LucideIcon; cn: string; en: string }> = [
  { key: "quote", icon: Quote, cn: "引用", en: "Blockquote" },
  { key: "bullet", icon: List, cn: "无序列表", en: "Bullet list" },
  { key: "ordered", icon: ListOrdered, cn: "有序列表", en: "Ordered list" },
  { key: "task", icon: CheckSquare, cn: "任务列表", en: "Task list" },
  { key: "codeBlock", icon: Code, cn: "代码块", en: "Code block" },
]
const languages = [
  ["English", "英语"], ["Japanese", "日语"], ["Korean", "韩语"], ["French", "法语"],
  ["German", "德语"], ["Spanish", "西班牙语"], ["Portuguese", "葡萄牙语"], ["Russian", "俄语"], ["Arabic", "阿拉伯语"],
]

function ToolbarSeparator() {
  return <div className="mx-1 flex h-5 items-center"><Separator orientation="vertical" className="h-full" /></div>
}

export function NoteGenEditorAISelectionReplica({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const en = lang === "en"
  const viewport = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [menuOpen, setMenuOpen] = useState(true)
  const [translateOpen, setTranslateOpen] = useState(false)
  const [customLanguage, setCustomLanguage] = useState("")
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  const [notice, setNotice] = useState("")
  const width = 680
  const height = translateOpen ? 680 : menuOpen ? 480 : 320
  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const update = () => setScale(Math.min(1, node.clientWidth / width))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const text = (cn: string, english: string) => en ? english : cn
  const toggle = (key: string) => setActiveFormats(items => items.includes(key) ? items.filter(item => item !== key) : [...items, key])
  const action = (label: string) => {
    setMenuOpen(false)
    setTranslateOpen(false)
    setNotice(text(`模拟选择：${label}`, `Simulated selection: ${label}`))
  }
  const renderFormat = ({ key, icon: Icon, cn, en: english }: typeof formats[number]) => <Button key={key} type="button" variant={activeFormats.includes(key) ? "secondary" : "ghost"} size="icon-sm" title={text(cn, english)} aria-label={text(cn, english)} aria-pressed={activeFormats.includes(key)} onClick={() => toggle(key)}><Icon /></Button>
  const writingActions = [
    { icon: Sparkles, cn: "润色", en: "Polish" },
    { icon: Minimize2, cn: "精简", en: "Concise" },
    { icon: Maximize2, cn: "扩展", en: "Expand" },
  ]
  const canvasActions = [
    { icon: Workflow, cn: "生成流程图", en: "Generate flowchart" },
    { icon: BrainCircuit, cn: "生成思维导图", en: "Generate mind map" },
    { icon: Timer, cn: "生成时间线", en: "Generate timeline" },
    { icon: ListTodo, cn: "提取任务关系", en: "Extract task relationships" },
  ]
  return <div>
    <div ref={viewport} className="relative w-full overflow-hidden rounded-xl border" style={{ height: height * scale }}>
      <div data-notegen-replica="editor-ai-selection" className="ng-model-settings absolute inset-x-0 top-0 origin-top-left bg-background text-foreground" style={{ width, height, transform: `scale(${scale})` }}>
        <article className="px-12 pt-9 text-base leading-7">
          <h3 className="text-2xl font-bold tracking-tight">{text("用 Markdown 记录笔记", "Taking notes with Markdown")}</h3>
          <p className="mt-24 relative">
            <span className="absolute -right-7 top-0 pointer-events-none"><TutorialMarker number={1} /></span>
            <span className={cn("rounded-[1px] bg-[Highlight] text-[HighlightText]", activeFormats.includes("bold") && "font-bold", activeFormats.includes("italic") && "italic", activeFormats.includes("strike") && "line-through", activeFormats.includes("underline") && "underline", activeFormats.includes("code") && "font-mono")}>
              {text("Markdown 让我们用纯文本记录笔记，并通过标题和列表组织内容。", "Markdown lets us keep notes in plain text, using headings and lists to organize ideas.")}
            </span>
          </p>
          <p className="mt-4 text-muted-foreground">{text("保存原始想法，再逐步整理为清晰的笔记。", "Capture the original idea, then refine it into a clear note.")}</p>
        </article>
        <div className="absolute left-12 top-[120px] z-20 flex w-max items-center gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10" role="toolbar" aria-label={text("选区工具栏", "Selection toolbar")}>
          <div className="relative">
            <span className="pointer-events-none absolute -left-3 -top-3 z-30"><TutorialMarker number={2} /></span>
            <Button type="button" variant={menuOpen ? "secondary" : "ghost"} size="icon-sm" className="text-primary" title="AI" aria-label="AI" aria-expanded={menuOpen} onClick={() => { setMenuOpen(value => !value); setTranslateOpen(false) }}><Sparkles /></Button>
            {menuOpen ? <div className="absolute top-full mt-1 min-w-36 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10" data-editor-menu="ai">
              {writingActions.map(({ icon: Icon, cn, en: english }, index) => <div key={cn} className="relative">{index === 0 ? <span className="pointer-events-none absolute -left-6 top-1"><TutorialMarker number={3} /></span> : null}<Button type="button" variant="ghost" size="sm" className="w-full justify-start" onClick={() => action(text(cn, english))}><Icon data-icon="inline-start" /><span>{text(cn, english)}</span></Button></div>)}
              <Separator className="my-1" />
              <p className="px-2 py-1 text-xs font-medium text-muted-foreground">{text("从选区生成画布", "Generate canvas from selection")}</p>
              {canvasActions.map(({ icon: Icon, cn, en: english }) => <Button key={cn} type="button" variant="ghost" size="sm" className="w-full justify-start" onClick={() => action(text(cn, english))}><Icon data-icon="inline-start" /><span>{text(cn, english)}</span></Button>)}
              <Separator className="my-1" />
              <div className="relative" onMouseEnter={() => setTranslateOpen(true)} onMouseLeave={() => setTranslateOpen(false)}>
                <Button type="button" variant="ghost" size="sm" className="w-full justify-start" onClick={() => setTranslateOpen(value => !value)} aria-expanded={translateOpen}><Languages data-icon="inline-start" /><span>{text("翻译", "Translate")}</span><ChevronRight data-icon="inline-end" className={cn("ml-auto transition-transform", translateOpen && "rotate-90")} /></Button>
                {translateOpen ? <div className="absolute left-full top-0 ml-1 max-h-60 min-w-40 overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10" data-editor-menu="translate">
                  {languages.map(([english, chinese]) => <Button key={english} type="button" variant="ghost" size="sm" className="w-full justify-start" onClick={() => action(`${text("翻译", "Translate")}: ${text(chinese, english)}`)}>{text(chinese, english)}</Button>)}
                  <Separator className="my-1" /><div className="flex items-center px-1 py-1"><Input aria-label={text("自定义语言", "Custom language")} placeholder={text("自定义语言...", "Custom language...")} value={customLanguage} onChange={event => setCustomLanguage(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && customLanguage.trim()) action(`${text("翻译", "Translate")}: ${customLanguage.trim()}`); if (event.key === "Escape") setTranslateOpen(false) }} /></div>
                </div> : null}
              </div>
            </div> : null}
          </div>
          <ToolbarSeparator /><div className="flex gap-0.5">{formats.map(renderFormat)}</div>
          <ToolbarSeparator /><Button type="button" variant={activeFormats.includes("link") ? "secondary" : "ghost"} size="icon-sm" title={text("链接", "Link")} aria-label={text("链接", "Link")} onClick={() => toggle("link")}><Link /></Button>
          <ToolbarSeparator /><div className="flex gap-0.5">{blocks.map(renderFormat)}</div>
        </div>
      </div>
    </div>
    {notice ? <p role="status" className="mt-3 text-sm text-muted-foreground">{notice}</p> : null}
  </div>
}
