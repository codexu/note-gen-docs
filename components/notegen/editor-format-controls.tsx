"use client"

import { useState } from "react"
import { Bold, CheckSquare, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter, Italic, Link, List, ListOrdered, Quote, Strikethrough, Type, Underline } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Separator } from "./model-settings/ui/separator"
import { NoteGenReplicaActionMenu } from "./replica-action-menu"
import type { NoteGenReplicaLanguage } from "./types"

import { noteGenTextColors, noteGenHighlightColors } from "./editor-format-data"
export { noteGenTextColors, noteGenHighlightColors } from "./editor-format-data"
const headings = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6]
export type NoteGenEditorFormatProps = {
  lang?: NoteGenReplicaLanguage
  block?: "paragraph" | "1" | "2" | "3" | "4" | "5" | "6"
  textColor?: string | null
  highlight?: string | null
  active?: string[]
  menu?: "block" | "text" | "highlight" | null
  convertible?: boolean
  disabled?: boolean
  onMenuChange?: (menu: "block" | "text" | "highlight" | null) => void
  onChange?: (change: { block?: string; textColor?: string | null; highlight?: string | null; active?: string[] }) => void
}

/** Common block/color controls for the basic editor, AI selection, and release scenes. */
export function NoteGenEditorFormatControls({ lang = "cn", block, textColor, highlight, active, menu, convertible = true, disabled = false, onMenuChange, onChange }: NoteGenEditorFormatProps) {
  const en = lang === "en"
  const [localBlock, setBlock] = useState("paragraph")
  const [localText, setText] = useState<string | null>(null)
  const [localHighlight, setHighlight] = useState<string | null>(null)
  const [localActive, setActive] = useState<string[]>([])
  const [localMenu, setMenu] = useState<"block" | "text" | "highlight" | null>(null)
  const selectedBlock = block ?? localBlock
  const selectedText = textColor !== undefined ? textColor : localText
  const selectedHighlight = highlight !== undefined ? highlight : localHighlight
  const selectedActive = active ?? localActive
  const selectedMenu = menu !== undefined ? menu : localMenu
  const openMenu = (value: typeof localMenu) => { if (menu === undefined) setMenu(value); onMenuChange?.(value) }
  const format = (key: string) => { const next = selectedActive.includes(key) ? selectedActive.filter(item => item !== key) : [...selectedActive, key]; setActive(next); onChange?.({ active: next }) }
  const BlockIcon = selectedBlock === "paragraph" ? Type : headings[Number(selectedBlock) - 1] ?? Type
  const iconTrigger = (Icon: typeof Type, color?: string | null, target?: string) => <span data-editor-format-trigger={target} data-release-target={target} className="relative flex size-7 items-center justify-center rounded-lg hover:bg-muted"><Icon className="size-4" />{color !== undefined && <span aria-hidden className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full" style={{ backgroundColor: color === "default" ? "color-mix(in srgb,var(--color-primary) 30%,transparent)" : color || "currentColor" }} />}</span>
  const colorMenu = (isHighlight: boolean) => {
    const key = isHighlight ? "highlight" : "text"
    const current = isHighlight ? selectedHighlight : selectedText
    const choose = (value: string | null) => { if (isHighlight) { setHighlight(value); onChange?.({ highlight: value }) } else { setText(value); onChange?.({ textColor: value }) } }
    return <NoteGenReplicaActionMenu menuId={key} title={isHighlight ? (en ? "Highlight color" : "高亮颜色") : (en ? "Text color" : "字体颜色")} side="bottom" disabled={disabled} open={selectedMenu === key} onOpenChange={open => openMenu(open ? key : null)} trigger={iconTrigger(isHighlight ? Highlighter : Type, current, isHighlight ? "highlight-color" : "text-color")} items={[{ id: "clear", label: en ? "Clear color" : "清除颜色", selected: current === null, onSelect: () => choose(null) }, ...(isHighlight ? [{ id: "default", label: en ? "Highlight" : "高亮", icon: <Highlighter />, selected: current === "default", onSelect: () => choose("default") }] : []), ...(isHighlight ? noteGenHighlightColors : noteGenTextColors).map((color, index) => ({ id: color, label: (en ? ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"] : ["红色", "橙色", "黄色", "绿色", "蓝色", "紫色"])[index], icon: <span aria-hidden className="size-4 rounded-sm border" style={{ backgroundColor: color }} />, selected: current === color, onSelect: () => choose(color) }))]} />
  }
  const inline = [{ key: "bold", icon: Bold, cn: "粗体", en: "Bold" }, { key: "italic", icon: Italic, cn: "斜体", en: "Italic" }, { key: "strike", icon: Strikethrough, cn: "删除线", en: "Strikethrough" }, { key: "underline", icon: Underline, cn: "下划线", en: "Underline" }, { key: "code", icon: Code, cn: "行内代码", en: "Inline code" }]
  const tail = [{ key: "link", icon: Link, cn: "链接", en: "Link" }, { key: "quote", icon: Quote, cn: "引用", en: "Blockquote" }, { key: "bullet", icon: List, cn: "无序列表", en: "Bullet list" }, { key: "ordered", icon: ListOrdered, cn: "有序列表", en: "Ordered list" }, { key: "task", icon: CheckSquare, cn: "任务列表", en: "Task list" }, { key: "codeBlock", icon: Code, cn: "代码块", en: "Code block" }]
  const button = ({ key, icon: Icon, cn, en: english }: typeof inline[number]) => <Button key={key} disabled={disabled} variant={selectedActive.includes(key) ? "secondary" : "ghost"} size="icon-sm" title={en ? english : cn} aria-label={en ? english : cn} aria-pressed={selectedActive.includes(key)} onClick={() => format(key)}><Icon /></Button>
  return <div className="flex items-center gap-0.5" data-editor-format-controls>
    {convertible && <NoteGenReplicaActionMenu title={en ? "Turn into" : "转换为"} menuId="block" side="bottom" disabled={disabled} open={selectedMenu === "block"} onOpenChange={open => openMenu(open ? "block" : null)} trigger={iconTrigger(BlockIcon, undefined, "block-type")} items={[{ id: "paragraph", label: en ? "Text" : "正文", icon: <Type />, selected: selectedBlock === "paragraph", onSelect: () => { setBlock("paragraph"); onChange?.({ block: "paragraph" }) } }, ...headings.map((Icon, index) => ({ id: String(index + 1), label: en ? `Heading ${index + 1}` : `${["一", "二", "三", "四", "五", "六"][index]}级标题`, icon: <Icon />, selected: selectedBlock === String(index + 1), onSelect: () => { setBlock(String(index + 1)); onChange?.({ block: String(index + 1) }) } }))]} />}
    {inline.map(button)}{colorMenu(false)}{colorMenu(true)}<Separator orientation="vertical" className="mx-1 h-5" />{button(tail[0])}<Separator orientation="vertical" className="mx-1 h-5" />{tail.slice(1).map(button)}
  </div>
}
