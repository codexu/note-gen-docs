import type { ReactNode } from "react"
import {
  BatteryFull, Bot, Bold, CheckSquare, ChevronDown, ChevronRight, Cloud, Code2,
  EllipsisVertical, FilePlus2, FileText, Filter, Highlighter, History, Italic, Lightbulb,
  MessageCircle, MessageSquare, MessageSquareDashed, MessageSquarePlus, Palette, Plus, Quote, Redo2,
  RefreshCw, Search, Send, Settings, ShieldQuestion, SquarePen, Strikethrough,
  Trash2, Underline, Undo2, User, WandSparkles, Wifi,
} from "lucide-react"

import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenMobileScreen = "capture" | "chat" | "writing" | "canvas" | "settings"

const MOBILE_WIDTH = 402
const MOBILE_HEIGHT = 874
const MOBILE_SCALE = 0.65672

function IconButton({ children }: { children: ReactNode }) {
  return <span className="flex size-11 shrink-0 items-center justify-center text-[#24272b]">{children}</span>
}

function Avatar() {
  return (
    <span className="relative flex size-11 items-center justify-center">
      <span className="flex size-7 items-center justify-center rounded-full border border-[#d9dadd] text-[#74777c]"><User className="size-4" /></span>
      <i className="absolute right-[7px] top-[6px] size-2 rounded-full border border-white bg-[#ff5c65]" />
    </span>
  )
}

export function NoteGenMobileFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto h-[594px] w-[294px] shrink-0", className)}>
      <i className="absolute left-0 top-[102px] h-[20px] w-[7px] rounded-l-[3px] bg-[#202124]" />
      <i className="absolute left-0 top-[140px] h-[43px] w-[7px] rounded-l-[3px] bg-[#202124]" />
      <i className="absolute left-0 top-[194px] h-[43px] w-[7px] rounded-l-[3px] bg-[#202124]" />
      <i className="absolute right-0 top-[169px] h-[66px] w-[7px] rounded-r-[3px] bg-[#202124]" />
      <div className="absolute inset-y-0 left-[5px] z-10 h-[594px] w-[284px] overflow-hidden rounded-[36px] border-[10px] border-[#090909] bg-white shadow-[0_22px_50px_rgba(0,0,0,.20)]">
        <div className="absolute left-0 top-0 origin-top-left overflow-hidden bg-white text-[#17191c]" style={{ width: MOBILE_WIDTH, height: MOBILE_HEIGHT, transform: `scale(${MOBILE_SCALE})` }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function NoteGenMobileStatusBar() {
  return (
    <div className="relative flex h-[59px] shrink-0 items-center justify-between pb-0 pl-[49px] pr-5 pt-2 text-[16px] font-semibold tracking-[-.3px]">
      <span>12:00</span>
      <span className="absolute left-1/2 top-[13px] h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-[7px]" aria-hidden>
        <span className="flex items-end gap-[2px]"><i className="size-[3px] rounded-full bg-[#c9cbd0]" /><i className="size-[3px] rounded-full bg-[#c9cbd0]" /><i className="size-[3px] rounded-full bg-[#c9cbd0]" /><i className="size-[3px] rounded-full bg-[#c9cbd0]" /></span>
        <Wifi className="size-[17px] stroke-[2.5]" /><BatteryFull className="h-[16px] w-[25px] stroke-[2.2]" />
      </span>
    </div>
  )
}

export function NoteGenMobileDock({ screen = "capture", lang = "cn" }: { screen?: NoteGenMobileScreen; lang?: NoteGenReplicaLanguage }) {
  const active = screen === "settings" ? "chat" : screen
  const items = [
    ["chat", MessageSquare, lang === "en" ? "Chat" : "对话"],
    ["writing", SquarePen, lang === "en" ? "Write" : "写作"],
    ["quick", Plus, ""],
    ["capture", Highlighter, lang === "en" ? "Records" : "记录"],
    ["canvas", Palette, lang === "en" ? "Canvas" : "画布"],
  ] as const
  const activeWidth = lang === "en" && active === "capture" ? 104 : lang === "en" && active === "canvas" ? 100 : lang === "en" && active === "writing" ? 88 : 80
  const inactiveWidth = Math.round((362 - activeWidth) / 4)
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-[90px] bg-gradient-to-t from-white via-white/95 to-transparent px-3">
      <nav className="relative grid h-14 w-full items-center gap-1 rounded-[22px] border border-black/10 bg-white/70 backdrop-blur-xl" style={{ gridTemplateColumns: items.map(([id]) => `${id === active ? activeWidth : inactiveWidth}px`).join(" ") }}>
        {items.map(([id, ItemIcon, label]) => {
          const selected = active === id
          return (
            <span key={id} className={cn("flex h-12 min-w-0 items-center justify-center rounded-2xl px-0.5 text-[#686b70]", selected && "text-[#202226]")}>
              <span className={cn("flex h-10 min-w-8 max-w-full items-center justify-center rounded-2xl px-2", selected && "gap-1.5 bg-[#f5f5f6] px-2.5 shadow-sm shadow-black/5")}>
                <ItemIcon className="size-5 shrink-0 stroke-[1.8]" />
                {selected && label ? <b className="max-w-32 truncate whitespace-nowrap text-xs font-medium leading-none">{label}</b> : null}
              </span>
            </span>
          )
        })}
      </nav>
    </div>
  )
}

function StandardHeader({ children }: { children: ReactNode }) {
  return <header className="flex h-14 shrink-0 items-center border-b border-[#e7e7e8] px-2">{children}</header>
}

function RecordCard({ type, time, body, large, purple }: { type: string; time: string; body: string; large?: boolean; purple?: boolean }) {
  return (
    <article className={cn("relative rounded-xl border border-[#dedfe2] bg-white px-3 py-3", large ? "h-[103px]" : "min-h-[94px]")}>
      <div className="flex items-center">
        <span className={cn("rounded-md border px-2 py-[2px] text-[10px]", purple ? "border-[#efc8ef] bg-[#fae4fb] text-[#a43ca6]" : "border-[#cce99c] bg-[#eeffd4] text-[#69962b]")}>{type}</span>
        <time className="ml-auto mr-8 text-[12px] text-[#85888e]">{time}</time>
        <EllipsisVertical className="absolute right-3 top-5 size-[18px]" />
      </div>
      <p className={cn("mt-2 text-[14px] leading-5", large && "flex h-14 items-center justify-center text-[#7b7e84]")}>{body}</p>
    </article>
  )
}

export function NoteGenMobileCapture({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const rows = lang === "en" ? [
    ["Text", "22:25", "I’m starting to fix a few small issues now. No lint, build, test, or actual testing. You only need to change code..."],
    ["Text", "22:25", "1 I’m starting to fix a few small issues now. No lint, build, test, or actual testing. You only need to change code..."],
    ["Text", "12:51", "[SYNC-E2E-RECORD-PC] 2026-08-03 dual-ended recording sync test"],
  ] : [
    ["文本", "22:25", "用户附件 现在开始修复一些小问题，不用 lint、build、测试、实际测试。你只需要改代码，在..."],
    ["文本", "22:25", "1 用户附件 现在开始修复一些小问题，不用 lint、build、测试、实际测试。你只需要改代码，在..."],
    ["文本", "12:51", "[SYNC-E2E-RECORD-PC] 2026-08-03 双端记录同步测试"],
  ]
  return (
    <div className="relative min-h-0 flex-1">
      <StandardHeader><Avatar /><span className="flex items-center gap-1 pl-1 text-[15px] font-medium">{lang === "en" ? "Release prep" : "发布准备"}<ChevronDown className="size-4 text-[#85888d]" /></span><span className="ml-auto flex"><IconButton><Filter className="size-[18px]" /></IconButton><IconButton><CheckSquare className="size-[18px]" /></IconButton><IconButton><Trash2 className="size-[18px]" /></IconButton></span></StandardHeader>
      <div className="h-[729px] overflow-hidden px-3 pb-24 pt-2">
        <p className="mb-2 text-xs font-medium text-[#777a80]">2026-08-03</p>
        <div className="space-y-2">{rows.map(([type, time, body], index) => <RecordCard key={index} type={type} time={time} body={body} />)}</div>
        <p className="mb-2 mt-4 text-xs font-medium text-[#777a80]">2026-07-29</p>
        <RecordCard type={lang === "en" ? "Excerpt" : "摘图"} time="18:44" body={lang === "en" ? "Product feedback board" : "产品反馈看板"} large purple />
        <div className="mt-2"><RecordCard type={lang === "en" ? "Excerpt" : "摘图"} time="18:44" body={lang === "en" ? "Product feedback board" : "产品反馈看板"} large purple /></div>
      </div>
    </div>
  )
}

export function NoteGenMobileChat({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const prompts = lang === "en" ? ["Help me write a note", "Summarize this content", "Brainstorm some ideas"] : ["帮我写一篇笔记", "帮我总结这段内容", "帮我头脑风暴一些想法"]
  return (
    <div className="relative min-h-0 flex-1 bg-[linear-gradient(#f4f4f5_1px,transparent_1px),linear-gradient(90deg,#f4f4f5_1px,transparent_1px)] [background-size:40px_40px]">
      <StandardHeader><Avatar /><span className="ml-auto flex"><IconButton><Search className="size-[18px]" /></IconButton><IconButton><History className="size-4" /></IconButton><IconButton><MessageSquareDashed className="size-[18px]" /></IconButton><IconButton><MessageSquarePlus className="size-[18px]" /></IconButton></span></StandardHeader>
      <section className="mx-auto mt-[139px] w-[326px]">
        <h1 className="flex items-center justify-center gap-2 text-xl font-semibold tracking-tight"><MessageCircle className="size-5" />{lang === "en" ? "Start a conversation with AI" : "开始与 AI 对话"}</h1>
        <p className="mt-3 text-center text-sm text-[#87898e]">{lang === "en" ? "Use Chat or Agent mode to interact with AI" : "使用 Chat 或 Agent 模式与 AI 互动"}</p>
        <p className="mb-2 mt-7 px-1 text-xs text-[#8b8d92]">{lang === "en" ? "Quick start" : "快速开始"}</p>
        <div className="space-y-2">{prompts.map((prompt, index) => <div key={prompt} className="flex h-11 items-center rounded-lg border border-[#dedfe2] bg-white px-4 text-sm">{index === 0 ? <SquarePen className="mr-2 size-4 text-[#777a80]" /> : index === 1 ? <FileText className="mr-2 size-4 text-[#777a80]" /> : <Lightbulb className="mr-2 size-4 text-[#777a80]" />}<b className="font-medium">{prompt}</b><ChevronRight className="ml-auto size-4 text-[#777a80]" /></div>)}</div>
      </section>
      <div className="absolute inset-x-3 bottom-[101px] flex h-[102px] flex-col gap-1 rounded-[22px] border border-black/10 bg-white/70 p-1.5 backdrop-blur-xl">
        <p className="flex min-h-10 items-start p-2 text-sm text-[#97999e]">{lang === "en" ? "Ask a question or organize notes into an article..." : "你可以提问或将记录整理为文章..."}</p>
        <div className="flex h-11 items-center"><span className="flex size-10 items-center justify-center"><Plus className="size-5 text-[#7a7d82]" /></span><span className="flex size-10 items-center justify-center"><Bot className="size-5" /></span><ShieldQuestion className="ml-auto mr-6 size-[18px] text-[#74777d]" /><span className="flex size-10 items-center justify-center rounded-full bg-[#fafafa]"><Send className="size-[17px] text-[#8f9297]" /></span></div>
      </div>
    </div>
  )
}

function WritingToolbar() {
  const tools = [Undo2, Redo2, WandSparkles, Bold, Highlighter, Italic, Underline, Strikethrough, Code2, Quote]
  return <div className="flex h-[46px] shrink-0 items-center justify-between border-y border-[#e7e7e8] px-3">{tools.map((Tool, index) => <span key={index} className="flex size-9 items-center justify-center text-[#777a80]"><Tool className="size-[17px]" /></span>)}</div>
}

function FeedbackBoard({ lang }: { lang: NoteGenReplicaLanguage }) {
  return <div className="mt-8 h-[205px] bg-[#fbfbfb] p-2"><b className="text-xs">{lang === "en" ? "User feedback" : "用户反馈"}</b><div className="mt-1 grid grid-cols-3 gap-1">{Array.from({ length: 9 }, (_, i) => <div key={i} className="h-[52px] border border-[#ececef] bg-white p-1"><div className="flex items-center gap-1"><i className={cn("size-2 rounded-full", i % 3 === 0 ? "bg-[#8cb6df]" : i % 3 === 1 ? "bg-[#ba9bd5]" : "bg-[#91c8a1]")} /><i className="h-1.5 w-8 rounded bg-[#d9dce2]" /></div><div className="mt-1.5 h-1 w-full rounded bg-[#eff0f2]" /><div className="mt-1 h-1 w-3/4 rounded bg-[#eff0f2]" /><div className="mt-1.5 flex gap-1"><i className="size-1.5 rounded-full bg-[#a9bfd7]" /><i className="size-1.5 rounded-full bg-[#e5b8c2]" /><i className="size-1.5 rounded-full bg-[#b7d7bd]" /></div></div>)}</div></div>
}

export function NoteGenMobileWriting({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return (
    <div className="relative min-h-0 flex-1">
      <WritingToolbar />
      <article className="h-[635px] overflow-hidden px-4 pt-[79px] text-[16px] leading-[27px]">
        <h1 className="text-[32px] font-bold leading-tight">{lang === "en" ? "User feedback summary" : "用户反馈整理"}</h1>
        <h2 className="mb-4 mt-9 text-2xl font-bold">{lang === "en" ? "Research overview" : "调研概览"}</h2>
        <p>{lang === "en" ? "This round collected 12 interview records, 28 community feedback items and 9 app store suggestions." : "本轮共整理 12 份访谈记录、28 条社区反馈和 9 条应用内建议。"}</p>
        <FeedbackBoard lang={lang} />
        <div className="mt-8 grid grid-cols-[1.2fr_.8fr_1fr] border border-[#d9dadd] text-[15px]"><b className="border-r border-[#d9dadd] p-3">{lang === "en" ? "Need" : "需求"}</b><b className="border-r border-[#d9dadd] p-3">{lang === "en" ? "Mentions" : "提及人数"}</b><b className="p-3">{lang === "en" ? "Typical feedback" : "典型反馈"}</b><span className="border-r border-t border-[#d9dadd] p-3">{lang === "en" ? "Capture faster" : "更快捕捉碎片"}</span><span className="border-r border-t border-[#d9dadd] p-3">10</span><span className="border-t border-[#d9dadd] p-3">{lang === "en" ? "Keep the flow" : "灵感出现时不想"}</span></div>
      </article>
      <div className="absolute inset-x-0 bottom-[90px] flex h-[28px] items-center px-4 text-xs text-[#878a90]"><span>{lang === "en" ? "T 353 characters" : "Ｔ 353 字符"}</span><span className="ml-auto">{lang === "en" ? "◉ WYSIWYG　 ◷ History" : "◉ 所见即所得　 ◷ 历史"}</span></div>
    </div>
  )
}

const canvasPaths = [
  "M28 55 C62 15,90 95,35 87 C82 45,110 108,68 31 M55 14 C90 26,93 65,115 80",
  "M25 43 C70 72,112 17,65 91 M36 24 L103 80 M96 15 L42 96 M27 70 C59 25,83 89,120 50",
  "M38 20 C18 62,62 52,30 89 M47 30 L73 92 M58 14 C88 56,110 44,118 84 M40 72 C77 28,84 99,132 59",
  "M40 20 C20 80,63 77,88 79 M111 17 C104 51,103 58,80 67 M57 82 C90 93,116 80,130 76",
  "M48 20 L35 50 L70 46 L54 75 L108 94 M72 19 L85 65 M47 67 L98 31",
]

function CanvasCard({ index, lang }: { index: number; lang: NoteGenReplicaLanguage }) {
  return <article className="relative h-[171px] overflow-hidden rounded-xl border border-[#dedfe2] bg-white"><div className="h-[137px] border-b border-[#dedfe2] bg-[#fdfdfd]"><CanvasArtwork index={index} /></div><b className="block truncate px-2.5 py-2 text-xs font-medium">{index === 5 ? (lang === "en" ? "Timeline" : "时间线") : (lang === "en" ? "Blank canvas" : "空白画布")}</b><span className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-lg bg-[#f4f4f5]"><EllipsisVertical className="size-4" /></span></article>
}

function CanvasArtwork({ index }: { index: number }) {
  if (index === 5) return <div className="flex h-full items-center justify-center gap-2"><i className="h-px w-3 bg-[#d9dadd]" /><span className="h-5 w-10 rounded-full border border-[#dedfe2] bg-white" /><i className="h-px w-3 bg-[#d9dadd]" /><span className="h-5 w-10 rounded-full border border-[#dedfe2] bg-white" /><i className="h-px w-3 bg-[#d9dadd]" /></div>
  if (index === 6) return <div className="relative h-full"><span className="absolute left-5 top-[58px] h-5 w-12 border border-[#dedfe2] bg-white" /><span className="absolute left-[82px] top-7 h-5 w-12 border border-[#dedfe2] bg-white" /><span className="absolute left-[82px] top-[58px] h-5 w-12 border border-[#dedfe2] bg-white" /><span className="absolute left-[82px] top-[89px] h-5 w-12 border border-[#dedfe2] bg-white" /><i className="absolute left-[66px] top-[39px] h-[61px] w-px bg-[#dedfe2]" /><i className="absolute left-[66px] top-[67px] h-px w-4 bg-[#dedfe2]" /></div>
  if (index === 7) return <div className="grid h-full grid-cols-3 gap-2 p-4"><div className="border border-[#e4e5e7] bg-[#fafafa] p-2"><i className="block h-2 w-8 bg-[#dfe1e4]" /></div><div className="border border-[#e4e5e7] bg-[#fafafa] p-2"><i className="block h-2 w-8 bg-[#dfe1e4]" /></div><div className="border border-[#e4e5e7] bg-[#fafafa] p-2"><i className="block h-2 w-8 bg-[#dfe1e4]" /></div></div>
  return <svg viewBox="0 0 160 110" className="h-full w-full"><path d={canvasPaths[index % canvasPaths.length]} fill="none" stroke={index === 1 ? "#d8a05d" : index < 3 ? "#f1d877" : "#7c7f84"} strokeWidth="2.2" strokeLinecap="round" /><path d={canvasPaths[(index + 2) % canvasPaths.length]} fill="none" stroke="#d5a846" strokeWidth="1" opacity=".65" /></svg>
}

export function NoteGenMobileCanvas({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  return <div className="relative min-h-0 flex-1"><StandardHeader><Avatar /><span className="ml-auto flex"><IconButton><FilePlus2 className="size-[20px]" /></IconButton><IconButton><EllipsisVertical className="size-[20px]" /></IconButton></span></StandardHeader><div className="grid h-[728px] grid-cols-2 content-start gap-3 overflow-hidden p-3 pb-24">{Array.from({ length: 8 }, (_, index) => <CanvasCard key={index} index={index} lang={lang} />)}</div></div>
}

function StatCard({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="h-[109px] rounded-[22px] border border-[#e7e7e8] bg-white p-4"><p className="text-xs text-[#8b8e93]">{title}</p><b className="mt-2 block text-2xl font-semibold">0</b><p className="mt-1 text-xs text-[#8b8e93]">{subtitle}</p></div>
}

export function NoteGenMobileSettings({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const activeCells = new Set([18, 26, 34, 35, 50, 58, 66, 67, 74, 75, 76, 82, 83, 89, 90, 91, 98])
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden px-3 pt-9">
      <section className="h-[90px] rounded-[22px] border border-[#e7e5dd] bg-white p-4"><div className="flex items-start gap-3"><span className="flex size-14 items-center justify-center rounded-full border border-[#f1dfa7] bg-[#fff7d5] text-[#c87812]"><Cloud className="size-5" /></span><div><h2 className="text-base font-semibold">{lang === "en" ? "Sync platform" : "同步平台"}</h2><div className="mt-2 flex gap-2"><span className="rounded-full border border-[#ece5d3] px-2.5 py-0.5 text-xs">{lang === "en" ? "Local" : "本地存储"}</span><span className="rounded-full border border-[#f4d891] bg-[#fff3c9] px-2.5 py-0.5 text-xs font-medium text-[#c47a17]">{lang === "en" ? "Not configured" : "未配置"}</span></div></div></div></section>
      <section className="mt-4 h-[274px] rounded-[22px] border border-[#e7e7e8] bg-white p-4">
        <div className="flex items-center"><div><h2 className="text-base font-semibold">{lang === "en" ? "Activity" : "活跃度"}</h2><p className="mt-1 text-xs text-[#8b8e93]">{lang === "en" ? "Last 16 weeks" : "最近 16 周"}</p></div><RefreshCw className="ml-auto mr-1 size-4" /></div>
        <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">{Array.from({ length: 112 }, (_, index) => { const level = activeCells.has(index) ? (index % 4) + 1 : 0; return <i key={index} className={cn("size-[18px] rounded-[4px] border border-black/5", level === 0 ? "bg-[#f2f3f4]" : level === 1 ? "bg-[#cff7e8]" : level === 2 ? "bg-[#88ebc6]" : level === 3 ? "bg-[#31c991]" : "bg-[#078357]")} /> })}</div>
        <p className="mt-3 text-xs leading-5 text-[#8b8e93]">{lang === "en" ? "Tap a day to view its activity timeline." : "点击热力图中的日期，查看当天的活动时间轴。"}</p>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3"><StatCard title={lang === "en" ? "This week" : "本周活跃"} subtitle={lang === "en" ? "Weekly activity" : "本周累计活动次数"} /><StatCard title={lang === "en" ? "Streak" : "连续活跃"} subtitle={lang === "en" ? "Consecutive days" : "连续活跃天数"} /></section>
      <section className="mt-5 px-2"><h2 className="text-base font-semibold">{lang === "en" ? "Settings" : "设置"}</h2><p className="mt-1 text-xs leading-5 text-[#8b8e93]">{lang === "en" ? "Manage feature settings here." : "直接在这里进入各项功能设置。"}</p><div className="mt-3 flex h-[33px] items-center rounded-[10px] border border-[#dedfe2] px-3 text-sm text-[#96999e]"><Search className="mr-2 size-4" />{lang === "en" ? "Search settings..." : "搜索设置..."}</div><p className="mt-5 text-xs text-[#8b8e93]">{lang === "en" ? "Basic settings" : "基础设置"}</p><div className="mt-1 flex h-11 items-center text-sm"><Settings className="mr-3 size-4" />{lang === "en" ? "General settings" : "常规设置"}<ChevronRight className="ml-auto size-4 text-[#8b8e93]" /></div></section>
    </div>
  )
}

export function NoteGenMobileReplica({ lang = "cn", screen = "capture" }: { lang?: NoteGenReplicaLanguage; screen?: NoteGenMobileScreen }) {
  return (
    <NoteGenMobileFrame>
      <div className="relative flex h-full min-h-0 flex-col bg-white">
        <NoteGenMobileStatusBar />
        {screen === "capture" ? <NoteGenMobileCapture lang={lang} /> : screen === "chat" ? <NoteGenMobileChat lang={lang} /> : screen === "writing" ? <NoteGenMobileWriting lang={lang} /> : screen === "canvas" ? <NoteGenMobileCanvas lang={lang} /> : <NoteGenMobileSettings lang={lang} />}
        <NoteGenMobileDock screen={screen} lang={lang} />
      </div>
    </NoteGenMobileFrame>
  )
}
