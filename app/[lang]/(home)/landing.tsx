import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CheckIcon,
  CloudIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  GitBranchIcon,
  GithubIcon,
  HeartIcon,
  KeyRoundIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  ServerIcon,
  ShieldCheckIcon,
  WifiOffIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { NoteGenDemo } from "@/components/home/note-gen-demo"
import { cn } from "@/lib/utils"

import HomeFooter from "./footer"

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
    items: ["本地优先，无需登录", "完整文件管理与源码模式", "Git、对象存储或自己的网盘"],
  },
]

const casesCn = [
  ["会议碎片", "会议纪要", "语音与临时笔记"],
  ["每日记录", "周报与总结", "按时间和标签整理"],
  ["链接与 PDF", "调研文章", "检索并引用已有材料"],
  ["零散灵感", "画布与关系图", "把抽象想法可视化"],
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
    items: ["Local first, no login required", "File management and source mode", "Git, object storage, or your cloud drive"],
  },
]

const casesEn = [
  ["Meeting fragments", "Meeting notes", "Voice and quick notes"],
  ["Daily records", "Weekly reviews", "Organized by time and tags"],
  ["Links and PDFs", "Research articles", "Retrieve and cite existing material"],
  ["Loose ideas", "Canvas and maps", "Make abstract thoughts visible"],
]

const syncOptions = [
  { name: "GitHub", icon: GithubIcon },
  { name: "Gitee", icon: GitBranchIcon },
  { name: "GitLab", icon: GitBranchIcon },
  { name: "Gitea", icon: GitBranchIcon },
  { name: "S3", icon: DatabaseIcon },
  { name: "WebDAV", icon: ServerIcon },
  { name: "cloudDrive", icon: CloudIcon },
]

export default function HomeLanding({ lang }: { lang: "cn" | "en" }) {
  const isEnglish = lang === "en"
  const text = (cnText: string, enText: string) => isEnglish ? enText : cnText
  const capabilities = isEnglish ? capabilitiesEn : capabilitiesCn
  const cases = isEnglish ? casesEn : casesCn
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section id="top" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">
            <span className="size-1.5 rounded-full bg-foreground" />
            {text("开源 · 跨平台 · AI 知识工作台", "Open source · Cross-platform · AI knowledge workspace")}
          </Badge>
          <div className="flex flex-col gap-5">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              {text("先记录，再整理。", "Capture first, organize later.")}
            </h1>
            <p className="mx-auto max-w-3xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
              {text(
                "随手留下文字、语音和资料，再用 AI 整理、连接并创作成笔记、文章、图表与画布。",
                "Capture text, voice, and source material, then use AI to organize, connect, and turn it into notes, articles, diagrams, and canvases."
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`/${lang}/download`}
              className={cn(buttonVariants({ size: "lg" }), "min-w-36")}
            >
              {text("下载 NoteGen", "Download free")}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <a
              href={`/${lang}/donate`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-36")}
            >
              <HeartIcon data-icon="inline-start" className="text-pink-500" />
              {text("支持开源项目", "Support the project")}
            </a>
          </div>
          <p className="text-sm font-medium text-foreground">
            {text(
              "无订阅、无需登录，所有核心功能免费使用。",
              "No subscription or account. All core features are free."
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

      <section id="features" className="scroll-mt-14 border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
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
        </div>
      </section>

      <section id="privacy" className="border-y bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex max-w-4xl flex-col gap-6">
            <Badge variant="secondary">{text("数据所有权", "Data ownership")}</Badge>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {text("你的笔记，始终在你手里。", "Your notes stay in your hands.")}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-primary-foreground/70">
              {text(
                "NoteGen 默认只在本机读写标准 Markdown 与附件。需要跨设备时，再由你决定连接 Git、对象存储、私有服务或自己的网盘。",
                "NoteGen reads and writes standard Markdown and attachments on your device by default. When you need multiple devices, you choose whether to connect Git, object storage, a private server, or your own cloud drive."
              )}
            </p>
          </div>

          <Card className="mt-12 grid gap-0 overflow-hidden py-0 shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
            <CardHeader className="flex flex-col justify-between gap-10 border-b p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
              <div className="flex flex-col gap-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ShieldCheckIcon className="size-6" />
                </div>
                <div className="flex flex-col gap-3">
                  <CardDescription>NoteGen Workspace</CardDescription>
                  <CardTitle className="text-2xl">
                    {text("默认保存在本地", "Stored locally by default")}
                  </CardTitle>
                  <CardDescription className="max-w-md text-base leading-7">
                    {text(
                      "没有网络也能继续记录、浏览和写作。笔记始终是标准文件，不依赖 NoteGen 才能打开。",
                      "Keep capturing, browsing, and writing without a network connection. Your notes stay as standard files readable without NoteGen."
                    )}
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { icon: FileTextIcon, label: text("标准 Markdown", "Standard Markdown") },
                  { icon: WifiOffIcon, label: text("离线可用", "Works offline") },
                  { icon: KeyRoundIcon, label: text("无需登录", "No account") },
                ].map((item) => (
                  <Badge key={item.label} variant="outline" className="gap-2 px-3 py-1.5">
                    <item.icon />
                    {item.label}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-2">
                  <CardDescription>{text("需要时开启", "Connect when needed")}</CardDescription>
                  <CardTitle className="text-2xl">
                    {text("同步到你选择的位置", "Sync to a location you choose")}
                  </CardTitle>
                </div>
                <a
                  href={`/${lang}/docs/settings/sync`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit")}
                >
                  {text("同步说明", "Sync guide")}
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {syncOptions.map((option) => (
                  <Card
                    key={option.name}
                    className={cn(
                      "min-h-28 gap-0 py-0 shadow-none",
                      option.name === "cloudDrive" && "col-span-2"
                    )}
                  >
                    <CardHeader className="flex h-full flex-col justify-between gap-6 p-4 sm:p-5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <option.icon className="size-4" />
                      </div>
                      <CardTitle className="text-sm leading-5">
                        {option.name === "cloudDrive"
                          ? text("网盘同步（OneDrive、iCloud Drive）", "Cloud-drive sync (OneDrive, iCloud Drive)")
                          : option.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
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
                "灵感不会一直等你。",
                "Ideas do not wait."
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

      <HomeFooter lang={lang} />
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
