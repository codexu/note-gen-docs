import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
  InboxIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { NoteGenDemo } from "@/components/home/note-gen-demo"
import { cn } from "@/lib/utils"

const workflowsCn = [
  {
    icon: InboxIcon,
    step: "01",
    title: "随手记录",
    description: "文字、语音、截图、图片、链接、文件和待办，先放进同一个记录箱。",
  },
  {
    icon: SearchIcon,
    step: "02",
    title: "选择素材",
    description: "按时间、标签和内容筛选，找到这一次真正需要整理的记录。",
  },
  {
    icon: SparklesIcon,
    step: "03",
    title: "AI 整理",
    description: "选择模板，将零散素材生成结构清晰、可继续编辑的 Markdown。",
  },
  {
    icon: FileTextIcon,
    step: "04",
    title: "继续创作",
    description: "编辑、检索、对话，或者把内容放到画布里继续思考。",
  },
]

const capabilitiesCn = [
  {
    icon: BrainCircuitIcon,
    title: "Agent 使用你的知识",
    description: "自动检索本地笔记、理解图片与当前文档，在授权后完成多步骤任务。",
    items: ["Agentic RAG 自动检索", "联网搜索与图片理解", "长期记忆、Skills 与 MCP"],
  },
  {
    icon: NetworkIcon,
    title: "画布连接你的思路",
    description: "自由摆放材料、梳理关系、绘制流程，并让 AI 根据数据生成图表。",
    items: ["无限画布与多种节点", "AI 图表与 Mermaid", "桌面端与移动端支持"],
  },
  {
    icon: ShieldCheckIcon,
    title: "普通文件长期保存",
    description: "最终留下标准 Markdown 与本地附件，不把你的知识锁在专有格式里。",
    items: ["本地优先，无需登录", "完整文件管理与源码模式", "模型与同步服务由你选择"],
  },
]

const casesCn = [
  ["会议碎片", "会议纪要", "语音与临时笔记"],
  ["每日记录", "周报与总结", "按时间和标签整理"],
  ["链接与 PDF", "调研文章", "检索并引用已有材料"],
  ["零散灵感", "画布与关系图", "把抽象想法可视化"],
]

const workflowsEn = [
  {
    icon: InboxIcon,
    step: "01",
    title: "Capture freely",
    description: "Keep text, voice, screenshots, images, links, files, and tasks in one inbox.",
  },
  {
    icon: SearchIcon,
    step: "02",
    title: "Choose context",
    description: "Filter by time, tags, and content to find what matters for the task at hand.",
  },
  {
    icon: SparklesIcon,
    step: "03",
    title: "Organize with AI",
    description: "Turn scattered material into structured, editable Markdown.",
  },
  {
    icon: FileTextIcon,
    step: "04",
    title: "Keep creating",
    description: "Edit, search, chat, or move the result onto a canvas to think further.",
  },
]

const capabilitiesEn = [
  {
    icon: BrainCircuitIcon,
    title: "An agent that uses your knowledge",
    description: "Search local notes, understand images and the active document, then complete multi-step work with permission.",
    items: ["Agentic RAG retrieval", "Web search and image understanding", "Memory, Skills, and MCP"],
  },
  {
    icon: NetworkIcon,
    title: "A canvas for connected thinking",
    description: "Arrange material freely, map relationships, draw flows, and generate diagrams from data with AI.",
    items: ["Infinite canvas and multiple node types", "AI diagrams and Mermaid", "Desktop and mobile support"],
  },
  {
    icon: ShieldCheckIcon,
    title: "Plain files for the long term",
    description: "Keep standard Markdown and local attachments without locking your knowledge into a proprietary format.",
    items: ["Local first, no login required", "File management and source mode", "Choose your own models and sync"],
  },
]

const casesEn = [
  ["Meeting fragments", "Meeting notes", "Voice and quick notes"],
  ["Daily records", "Weekly reviews", "Organized by time and tags"],
  ["Links and PDFs", "Research articles", "Retrieve and cite existing material"],
  ["Loose ideas", "Canvas and maps", "Make abstract thoughts visible"],
]

export default function HomeLanding({ lang }: { lang: "cn" | "en" }) {
  const isEnglish = lang === "en"
  const text = (cnText: string, enText: string) => isEnglish ? enText : cnText
  const workflows = isEnglish ? workflowsEn : workflowsCn
  const capabilities = isEnglish ? capabilitiesEn : capabilitiesCn
  const cases = isEnglish ? casesEn : casesCn
  const privacyItems = isEnglish
    ? [
        ["Stored locally by default", "Capture, browse, and keep writing even without a network connection."],
        ["Standard Markdown files", "Open them without NoteGen and keep them readable for the long term."],
        ["You choose the services", "You decide which models, image hosting, and sync locations to use."],
        ["Completely free and open source", "No subscription, account, or feature paywall. Third-party services may charge separately."],
      ]
    : [
        ["默认保存在本地", "没有网络，也可以记录、浏览和继续写作。"],
        ["标准 Markdown 文件", "不依赖 NoteGen 才能打开，适合真正长期保存。"],
        ["服务由你选择", "模型、图床和同步位置，都由你决定。"],
        ["完全免费且开源", "无需订阅、无需登录、没有功能付费墙；第三方服务可能单独收费。"],
      ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section id="top" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">
            <span className="size-1.5 rounded-full bg-foreground" />
            {text("完全免费 · 开源 · 本地优先", "Completely free · Open source · Local first")}
          </Badge>
          <div className="flex flex-col gap-5">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              {text("先记录，再整理。", "Capture first, organize later.")}
            </h1>
            <p className="mx-auto max-w-3xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
              {text(
                "随手留下文字、语音和资料，再让 AI 整理成可编辑的笔记、文章、图表与画布。",
                "Capture text, voice, and source material, then let AI turn it into editable notes, articles, diagrams, and canvases."
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`/${lang}/download`}
              className={cn(buttonVariants({ size: "lg" }), "min-w-36")}
            >
              {text("免费下载", "Download free")}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <a
              href="#workflow"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-36")}
            >
              {text("看看如何工作", "See how it works")}
            </a>
          </div>
          <p className="text-sm font-medium text-foreground">
            {text(
              "NoteGen 无订阅、无需登录，所有核心功能免费使用。",
              "No subscription or account. All core NoteGen features are free."
            )}
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MonitorSmartphoneIcon />
            Windows · macOS · Linux · Android · iOS
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-7xl">
          <NoteGenDemo lang={lang} />
        </div>
      </section>

      <section id="workflow" className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            badge={text("核心工作流", "Core workflow")}
            title={text("从一个念头，到一篇作品。", "From a thought to a finished piece.")}
            description={text("不是把功能堆在一起，而是让每一步自然接上下一步。", "Each step flows naturally into the next.")}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflows.map((item) => (
              <Card key={item.step} className="min-h-64">
                <CardHeader>
                  <CardAction>
                    <Badge variant="outline">{item.step}</Badge>
                  </CardAction>
                  <item.icon className="size-5 text-muted-foreground" />
                  <CardTitle className="pt-6 text-xl">{item.title}</CardTitle>
                  <CardDescription className="leading-6">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          badge={text("需要时足够强大", "Powerful when needed")}
          title={text("AI、画布和 Markdown，服务于同一条工作流。", "AI, canvas, and Markdown in one workflow.")}
          description={text("日常记录保持简单，复杂能力只在你需要时出现。", "Daily capture stays simple; advanced tools appear when you need them.")}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability.title}>
              <CardHeader>
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <capability.icon className="size-5" />
                </div>
                <CardTitle className="text-xl">{capability.title}</CardTitle>
                <CardDescription className="leading-6">{capability.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {capability.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-muted-foreground" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="privacy" className="border-y bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              {text("数据所有权", "Data ownership")}
            </Badge>
            <h2 className="max-w-xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {text("你的笔记，始终在你手里。", "Your notes stay in your hands.")}
            </h2>
            <p className="max-w-xl text-lg leading-8 text-primary-foreground/70">
              {text(
                "笔记、记录、对话和设置默认保存在本机。在线模型、同步、图床与 MCP 只连接你主动选择的服务。",
                "Notes, records, chats, and settings stay on your device by default. Online models, sync, image hosting, and MCP connect only to services you choose."
              )}
            </p>
          </div>
          <Card className="bg-primary-foreground text-foreground">
            <CardHeader>
              <CardTitle>{text("清晰的数据边界", "Clear data boundaries")}</CardTitle>
              <CardDescription>
                {text("不靠一句“隐私优先”，而是让每一项都可以验证。", "Every privacy claim is concrete and verifiable.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {privacyItems.map(([title, description], index) => (
                <div key={title} className="flex gap-4">
                  <Badge variant="outline">{String(index + 1).padStart(2, "0")}</Badge>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          badge={text("使用场景", "Use cases")}
          title={text("让零散素材，走向清晰结果。", "Turn scattered material into clear results.")}
          description={text("先保存真实发生的内容，再决定它最终应该成为什么。", "Capture what happened first, then decide what it should become.")}
        />
        <Card className="mt-12">
          <CardContent className="flex flex-col">
            {cases.map(([from, to, note], index) => (
              <div key={from}>
                {index > 0 && <Separator />}
                <div className="grid gap-3 py-5 sm:grid-cols-[1fr_auto_1fr_1fr] sm:items-center">
                  <span className="text-muted-foreground">{from}</span>
                  <ArrowRightIcon className="hidden size-4 text-muted-foreground sm:block" />
                  <strong>{to}</strong>
                  <span className="text-sm text-muted-foreground">{note}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center">
          <div className="flex max-w-2xl flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              {text("现在开始", "Get started")}
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {text("先把下一条想法留下。", "Capture your next thought.")}
            </h2>
            <p className="text-muted-foreground">
              {text(
                "完全免费、开源，无订阅、无需注册。支持桌面端与移动端。",
                "Completely free and open source, with no subscription or account required. Available on desktop and mobile."
              )}
            </p>
          </div>
          <a
            href={`/${lang}/download`}
            className={cn(buttonVariants({ size: "lg" }), "min-w-40")}
          >
            <DownloadIcon data-icon="inline-start" />
            {text("下载 NoteGen", "Download NoteGen")}
          </a>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">N</span>
            NOTEGEN.
          </div>
          <p>Capture first, organize later.</p>
          <div className="flex gap-4">
            <a href="https://github.com/codexu/note-gen" className="hover:text-foreground">GitHub</a>
            <a href={`/${lang}/docs`} className="hover:text-foreground">
              {text("文档", "Docs")}
            </a>
            <a href={`/${lang}/donate`} className="hover:text-foreground">
              {text("支持项目", "Support")}
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description: string
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <Badge variant="secondary" className="w-fit">{badge}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      <p className="text-lg leading-8 text-muted-foreground">{description}</p>
    </div>
  )
}
