import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CheckIcon,
  CloudIcon,
  DatabaseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitBranchIcon,
  GithubIcon,
  HeartIcon,
  KeyRoundIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  ServerIcon,
  ShieldCheckIcon,
  UsersIcon,
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
import { PluginSection } from "@/components/home/plugin-section"
import { providerReferrals } from "@/data/provider-referrals"
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

const supporters = {
  cn: [
    {
      name: "PackyCode",
      description: "稳定、高效的 API 中转服务商，使用统一域名和密钥接入主流模型，提供智能容灾切换与 Codex、Claude Code 高速通道。",
      benefit: "通过 NoteGen 链接注册可获得 1 美元体验额度及首充优惠。",
      href: "https://www.packyapi.ai/register?aff=NqBq",
      icon: providerReferrals[1].icon,
    },
    {
      name: "Infistar.cc 无限星河",
      description: "提供兼容 OpenAI 标准接口的模型服务，支持 ChatGPT、Claude、Gemini、Kimi、GLM、DeepSeek 等模型，以及 OCR、Embedding、Rerank 和语音能力。",
      benefit: "通过 NoteGen 专属链接注册并完成首次调用，可领取测试额度或首充优惠。",
      href: "https://www.infistar.cc/register?aff=G55F2Z5Q&ref_source=link",
      icon: providerReferrals[2].icon,
    },
  ],
  en: [
    {
      name: "PackyCode",
      description: "A stable API gateway for leading models, with one endpoint and API key, automatic failover, and dedicated high-speed routes for Codex and Claude Code.",
      benefit: "Sign up through NoteGen to receive US$1 in trial credit and a first top-up offer.",
      href: "https://www.packyapi.ai/register?aff=NqBq",
      icon: providerReferrals[1].icon,
    },
    {
      name: "Infistar.cc Infinity Galaxy",
      description: "An OpenAI-compatible model service supporting ChatGPT, Claude, Gemini, Kimi, GLM, and DeepSeek, along with OCR, embeddings, reranking, and speech capabilities.",
      benefit: "Register through NoteGen and complete a first call to receive trial credit or a first top-up offer.",
      href: "https://www.infistar.cc/register?aff=G55F2Z5Q&ref_source=link",
      icon: providerReferrals[2].icon,
    },
  ],
} as const

const serviceSupporters = {
  cn: [
    { name: "硅基流动", href: "https://cloud.siliconflow.cn/i/O2ciJeZw", description: "模型服务支持" },
    { name: "七牛云", href: "https://www.qiniu.com/products/ai-token-api?utm_source=NoteGen", description: "服务支持" },
    { name: "302.AI", href: "https://share.302.ai/jfFrIP", description: "服务支持" },
    { name: "胜算云", href: "https://www.shengsuanyun.com/?from=CH_KAFLGC9O", description: "服务支持" },
    { name: "Gitee AI", href: "https://ai.gitee.com/", description: "服务支持" },
    { name: "Netlify", href: "https://www.netlify.com", description: "服务支持" },
    { name: "Skywork", href: "https://skywork.ai/p/bY47ky", description: "服务支持" },
  ],
  en: [
    { name: "SiliconFlow", href: "https://cloud.siliconflow.cn/i/O2ciJeZw", description: "Model service support" },
    { name: "Qiniu", href: "https://www.qiniu.com/products/ai-token-api?utm_source=NoteGen", description: "Service support" },
    { name: "302.AI", href: "https://share.302.ai/jfFrIP", description: "Service support" },
    { name: "ShengSuanYun", href: "https://www.shengsuanyun.com/?from=CH_KAFLGC9O", description: "Service support" },
    { name: "Gitee AI", href: "https://ai.gitee.com/", description: "Service support" },
    { name: "Netlify", href: "https://www.netlify.com", description: "Service support" },
    { name: "Skywork", href: "https://skywork.ai/p/bY47ky", description: "Service support" },
  ],
} as const

export default function HomeLanding({ lang }: { lang: "cn" | "en" }) {
  const isEnglish = lang === "en"
  const text = (cnText: string, enText: string) => isEnglish ? enText : cnText
  const capabilities = isEnglish ? capabilitiesEn : capabilitiesCn
  const cases = isEnglish ? casesEn : casesCn
  const projectSupporters = supporters[lang]
  const projectServiceSupporters = serviceSupporters[lang]
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
                "笔记和附件默认保存在本机。需要跨设备时，可以连接 Git、对象存储或自己的网盘，也可以自托管 NoteGen Server，让同步服务和数据都由你掌控。",
                "Notes and attachments stay on your device by default. Sync through Git, object storage, or your own cloud drive, or self-host NoteGen Server to keep both the sync service and your data under your control."
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
              <Separator />
              <div className="flex flex-col items-start gap-3">
                <h3 className="flex items-center gap-2 font-semibold">
                  <ServerIcon className="size-4" />
                  {text("部署自己的同步服务", "Run your own sync server")}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {text(
                    "自托管 NoteGen Server，在自己的服务器上同步笔记、开展团队协作，数据库与附件由你管理。",
                    "Self-host NoteGen Server to sync notes and collaborate on your own server, with the database and attachments managed by you."
                  )}
                </p>
                <a href={`/${lang}/docs/self-hosted`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                  {text("了解自托管方案", "Explore self-hosting")}
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <PluginSection lang={lang} />

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

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            badge={text("支持与贡献", "Supporters and contributors")}
            title={text("每一次支持，都让 NoteGen 能继续维护。", "Every contribution helps keep NoteGen maintained.")}
            description={text(
              "感谢为项目提供服务支持的合作伙伴，也感谢参与代码、文档、翻译、测试和问题反馈的每一位贡献者。",
              "Thanks to the partners supporting the project with services, and to everyone contributing code, docs, translations, testing, and feedback."
            )}
          />

          <div className="mt-12 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{text("AI 平台合作伙伴", "AI platform partners")}</Badge>
              <p className="text-sm text-muted-foreground">
                {text("为 NoteGen 用户提供模型服务与专属权益。", "Model services and member benefits for NoteGen users.")}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {projectSupporters.map((supporter) => (
                <Card key={supporter.name} className="h-full">
                  <CardHeader className="gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <img
                          src={supporter.icon}
                          alt=""
                          className="size-9 rounded-xl border bg-background object-contain p-1"
                        />
                        {supporter.name}
                      </CardTitle>
                      <Badge variant="outline">{text("合作支持", "Partner")}</Badge>
                    </div>
                    <CardDescription className="leading-6">{supporter.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-6 text-muted-foreground">{supporter.benefit}</p>
                    <a
                      href={supporter.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit")}
                    >
                      {text("通过专属链接了解", "Explore through NoteGen")}
                      <ExternalLinkIcon data-icon="inline-end" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-8">
            <CardHeader className="gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{text("模型与服务支持", "Model and service support")}</Badge>
                <CardTitle className="text-xl">{text("项目资源支持", "Project resource support")}</CardTitle>
              </div>
              <CardDescription className="leading-6">
                {text(
                  "感谢为 NoteGen 提供模型服务、基础设施和其他项目资源支持的伙伴。",
                  "Thanks to the partners providing NoteGen with model services, infrastructure, and other project resources."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {projectServiceSupporters.map((supporter) => (
                <a
                  key={supporter.name}
                  href={supporter.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-medium">{supporter.name}</span>
                  <span className="text-muted-foreground">{supporter.description}</span>
                  <ExternalLinkIcon className="size-3 text-muted-foreground" aria-hidden="true" />
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-8 overflow-hidden">
            <CardHeader className="gap-3">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-5 text-muted-foreground" />
                <CardTitle className="text-xl">{text("开源贡献者", "Open source contributors")}</CardTitle>
              </div>
              <CardDescription className="leading-6">
                {text(
                  "感谢每一位提交问题、分享想法、改进翻译、补充文档和贡献代码的人。",
                  "Thanks to everyone who reports issues, shares ideas, improves translations, writes documentation, and contributes code."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <a
                href="https://github.com/codexu/note-gen/graphs/contributors"
                target="_blank"
                rel="noreferrer"
                className="w-fit max-w-full rounded-lg outline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={text("在 GitHub 查看 NoteGen 贡献者", "View NoteGen contributors on GitHub")}
              >
                <img
                  src="https://contrib.rocks/image?repo=codexu/note-gen"
                  alt={text("NoteGen 开源贡献者", "NoteGen open source contributors")}
                  className="max-w-full"
                />
              </a>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/codexu/note-gen" target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                  <GithubIcon data-icon="inline-start" />
                  {text("查看 GitHub 项目", "View on GitHub")}
                </a>
                <a href={`/${lang}/docs/contributing`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                  {text("贡献指南", "Contribution guide")}
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
                <a href={`/${lang}/donate`} className={buttonVariants({ size: "sm" })}>
                  <HeartIcon data-icon="inline-start" />
                  {text("支持 NoteGen", "Support NoteGen")}
                </a>
              </div>
            </CardContent>
          </Card>
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
