"use client"

import { useState } from "react"
import { Terminal } from "lucide-react"
import { NoteGenEditorTabs, type NoteGenEditorTab } from "./editor-tabs-replica"
import { NoteGenBrowserPanel, NoteGenPluginEditorPanel, NoteGenTerminalPanel, type NoteGenBrowserProps } from "./editor-surfaces-replica"
import { NoteGenBubbleMenu } from "./file-editor-replica"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenEditorFeatureScene = "tabs" | "readonly" | "browser-start" | "browser-library-loading" | "browser-loading" | "browser-content" | "browser-error" | "browser-unavailable" | "plugin" | "plugin-loading" | "plugin-error" | "plugin-disabled" | "plugin-missing" | "terminal" | "terminal-denied" | "terminal-ended" | "block" | "text-color" | "highlight" | "format-result" | "nonconvertible"

export function noteGenEditorTabsFixture(lang: NoteGenReplicaLanguage = "cn"): NoteGenEditorTab[] {
  const en = lang === "en"
  return [{ id: "file", kind: "file", label: en ? "Project review.md" : "项目复盘.md", pinned: true }, { id: "readonly", kind: "file", label: "reference.md", readOnly: true, preview: true }, { id: "record", kind: "record", label: en ? "Review discussion" : "复盘讨论", recordType: en ? "Audio" : "录音" }, { id: "canvas", kind: "canvas", label: en ? "Project plan" : "项目计划" }, { id: "browser", kind: "browser", label: "NoteGen" }, { id: "plugin", kind: "plugin", label: en ? "Terminal" : "终端", icon: Terminal }]
}

function EditorScene({ lang, scene, height }: { lang: NoteGenReplicaLanguage; scene: NoteGenEditorFeatureScene; height: number }) {
  const en = lang === "en"
  const [tabs, setTabs] = useState(noteGenEditorTabsFixture(lang))
  const [active, setActive] = useState(scene.startsWith("browser") ? "browser" : scene.startsWith("plugin") || scene.startsWith("terminal") ? "plugin" : scene === "readonly" ? "readonly" : "file")
  const [browserState, setBrowserState] = useState<NoteGenBrowserProps["state"]>(scene === "browser-loading" ? "loading" : scene === "browser-content" ? "content" : scene === "browser-error" ? "error" : scene === "browser-unavailable" ? "unavailable" : "start")
  const [address, setAddress] = useState(scene === "browser-start" || scene === "browser-library-loading" ? "" : "https://example.com/project")
  const [format, setFormat] = useState<{ textColor?: string | null; highlight?: string | null; block?: string }>({ textColor: scene === "format-result" ? "#348358" : null, highlight: scene === "format-result" ? "#fef08a" : null })
  const SelectedBlock = (["p", "h1", "h2", "h3", "h4", "h5", "h6"] as const)[Number(format.block) || 0] ?? "p"
  const preparedPage = <article className="mx-auto max-w-2xl p-10"><h1 className="text-2xl font-semibold">{en ? "Project review" : "项目复盘"}</h1><p className="mt-4 text-base leading-7">{en ? "Collect feedback and refine the next writing session." : "收集使用反馈，完善下一次写作体验。"}</p></article>
  return <div style={{ height }}><NoteGenReplicaFrame fill><section className="flex h-full min-h-0 flex-col">
    <NoteGenEditorTabs lang={lang} tabs={tabs} activeId={active} onTabsChange={setTabs} onTabChange={setActive} canUndo pluginViews={[{ id: "terminal", label: en ? "Terminal" : "终端", icon: Terminal }]} onAction={(action, tab) => { if (action === "browser") { setTabs(items => items.some(item => item.id === "browser") ? items : [...items, { id: "browser", kind: "browser", label: "NoteGen" }]); setActive("browser") } if (action === "plugin") { setTabs(items => items.some(item => item.id === "plugin") ? items : [...items, { id: "plugin", kind: "plugin", label: en ? "Terminal" : "终端", icon: Terminal }]); setActive("plugin") } if (action === "restart" && tab) setActive(tab.id) }} />
    <div className="min-h-0 flex-1 overflow-hidden">
      {active === "browser" ? <NoteGenBrowserPanel key={address} lang={lang} state={browserState} url={address} content={preparedPage} libraryLoading={scene === "browser-library-loading"} bookmarks={[{ title: "NoteGen", url: "https://example.com/notegen" }]} history={[{ title: en ? "Project notes" : "项目笔记", url: "https://example.com/project", time: "10:28" }]} onNavigate={value => { setAddress(value); setBrowserState("content") }} /> : active === "plugin" ? (scene.startsWith("plugin") ? <NoteGenPluginEditorPanel lang={lang} state={scene === "plugin-loading" ? "loading" : scene === "plugin-error" ? "error" : scene === "plugin-disabled" ? "disabled" : scene === "plugin-missing" ? "missing" : "ready"} error={en ? "Unable to load the declared view." : "无法加载声明的视图。"} content={preparedPage} /> : <NoteGenTerminalPanel lang={lang} terminalState={scene === "terminal-denied" ? "denied" : scene === "terminal-ended" ? "ended" : "running"} />) : <article className="relative h-full overflow-auto px-12 py-10 text-base leading-7"><h1 className="mb-14 text-2xl font-semibold">{en ? "Project review" : "项目复盘"}</h1>{active !== "readonly" && <NoteGenBubbleMenu lang={lang} menu={scene === "block" ? "block" : scene === "text-color" ? "text" : scene === "highlight" ? "highlight" : undefined} convertible={scene !== "nonconvertible"} onChange={change => setFormat(previous => ({ ...previous, ...change }))} />}<SelectedBlock className="mt-5" style={{ fontSize: format.block && format.block !== "paragraph" ? `${[1, 1.875, 1.5, 1.25, 1.125, 1, 1][Number(format.block)] ?? 1}em` : undefined }}><span style={{ color: format.textColor ?? (format.highlight ? "#18181b" : undefined), backgroundColor: format.highlight === "default" ? "color-mix(in srgb,var(--color-primary) 30%,transparent)" : format.highlight ?? undefined }}>{en ? "Finish the prototype, then gather feedback." : "先完成原型，再收集真实反馈。"}</span></SelectedBlock><p className="mt-5 text-muted-foreground">{en ? "Keep the research and next steps together." : "把研究资料与下一步安排放在一起。"}</p></article>}
    </div>
  </section></NoteGenReplicaFrame></div>
}

export function NoteGenEditorFeatureScene({ lang = "cn", scene = "tabs", height = 650 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenEditorFeatureScene; height?: number }) {
  return <EditorScene key={`${lang}-${scene}`} lang={lang} scene={scene} height={height} />
}
