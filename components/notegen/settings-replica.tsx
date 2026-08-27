"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  AppWindow,
  ArchiveRestore,
  Book,
  BotMessageSquare,
  Brain,
  Check,
  ChevronDown,
  DatabaseBackup,
  Drama,
  FileCog,
  FolderOpen,
  Globe2,
  ImageUp,
  Keyboard,
  Languages,
  LayoutTemplate,
  Moon,
  Palette,
  PanelTopClose,
  PenTool,
  Puzzle,
  Rocket,
  ScanText,
  Search,
  Settings,
  Sparkles,
  Store,
  Sun,
  SunMoon,
  Volume2,
  X,
  ZoomIn,
} from "lucide-react"

import { NoteGenReplicaMenuGroup } from "@/components/notegen/replica-primitives"
import type { NoteGenReplicaIcon, NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenSettingSectionId =
  | "about"
  | "general"
  | "record"
  | "editor"
  | "canvas"
  | "shortcuts"
  | "ocr"
  | "audio"
  | "ai"
  | "web-search"
  | "rag"
  | "memories"
  | "prompt"
  | "mcp"
  | "skills"
  | "template"
  | "sync"
  | "backup"
  | "image-hosting"
  | "files"

type NavigationItem = {
  id: NoteGenSettingSectionId
  icon: NoteGenReplicaIcon
  cn: string
  en: string
  group: "basic" | "ai" | "data"
}
const navigationItems: NavigationItem[] = [
  { id: "about", icon: Store, cn: "关于 NoteGen", en: "About NoteGen", group: "basic" },
  { id: "general", icon: Settings, cn: "常规设置", en: "General", group: "basic" },
  { id: "record", icon: PenTool, cn: "记录", en: "Capture", group: "basic" },
  { id: "editor", icon: FileCog, cn: "编辑器", en: "Editor", group: "basic" },
  { id: "canvas", icon: Palette, cn: "画布", en: "Canvas", group: "basic" },
  { id: "shortcuts", icon: Keyboard, cn: "快捷键", en: "Shortcuts", group: "basic" },
  { id: "ocr", icon: ScanText, cn: "文字识别", en: "Text recognition", group: "basic" },
  { id: "audio", icon: Volume2, cn: "音频", en: "Audio", group: "basic" },
  { id: "ai", icon: BotMessageSquare, cn: "模型服务", en: "Model providers", group: "ai" },
  { id: "web-search", icon: Globe2, cn: "联网搜索", en: "Web search", group: "ai" },
  { id: "rag", icon: Book, cn: "知识库", en: "Knowledge base", group: "ai" },
  { id: "memories", icon: Brain, cn: "记忆", en: "Memories", group: "ai" },
  { id: "prompt", icon: Drama, cn: "提示词", en: "Prompts", group: "ai" },
  { id: "mcp", icon: Puzzle, cn: "MCP", en: "MCP", group: "ai" },
  { id: "skills", icon: Sparkles, cn: "Skills", en: "Skills", group: "ai" },
  { id: "template", icon: LayoutTemplate, cn: "整理模板", en: "Templates", group: "ai" },
  { id: "sync", icon: DatabaseBackup, cn: "同步", en: "Sync", group: "data" },
  { id: "backup", icon: ArchiveRestore, cn: "备份", en: "Backup", group: "data" },
  { id: "image-hosting", icon: ImageUp, cn: "图床", en: "Image hosting", group: "data" },
  { id: "files", icon: FolderOpen, cn: "文件管理", en: "File manager", group: "data" },
]
export const noteGenSettingsNavigation = navigationItems

const groupLabels = {
  basic: { cn: "基础", en: "BASIC" },
  ai: { cn: "AI 与扩展", en: "AI & EXTENSIONS" },
  data: { cn: "数据", en: "DATA" },
}

export function NoteGenSettingsShell({
  sidebar,
  children,
  className,
}: {
  sidebar: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      data-notegen-replica="settings-shell"
      className={cn("relative flex h-full min-h-0 w-full overflow-hidden bg-background", className)}
    >
      {sidebar}
      <main className="min-h-0 min-w-0 flex-1 overflow-hidden">{children}</main>
    </div>
  )
}

export function NoteGenSettingsSidebar({
  lang,
  value,
  onValueChange,
  query,
  onQueryChange,
}: {
  lang: NoteGenReplicaLanguage
  value: NoteGenSettingSectionId
  onValueChange?: (section: NoteGenSettingSectionId) => void
  query?: string
  onQueryChange?: (query: string) => void
}) {
  const normalizedQuery = query?.trim().toLocaleLowerCase() ?? ""
  const filtered = useMemo(
    () => navigationItems.filter((item) => {
      if (!normalizedQuery) return true
      return item.cn.toLocaleLowerCase().includes(normalizedQuery)
        || item.en.toLocaleLowerCase().includes(normalizedQuery)
    }),
    [normalizedQuery]
  )

  return (
    <aside className="flex h-full min-h-0 w-[29%] min-w-40 max-w-56 shrink-0 flex-col border-r bg-sidebar py-3">
      <div className="shrink-0 px-3">
        <label className="flex h-8 items-center gap-2 rounded-md border bg-background px-2 text-muted-foreground shadow-xs">
          <Search className="size-3.5" />
          <input
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={lang === "en" ? "Search settings" : "搜索设置"}
            aria-label={lang === "en" ? "Search settings" : "搜索设置"}
            className="min-w-0 flex-1 bg-transparent text-[10px] text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["basic", "ai", "data"] as const).map((group) => {
          const items = filtered.filter((item) => item.group === group)
          if (items.length === 0) return null

          return (
            <NoteGenReplicaMenuGroup
              key={group}
              label={groupLabels[group][lang]}
              className="first:[&>div:first-child]:pt-3"
            >
              {items.map((item) => {
                const Icon = item.icon
                const active = value === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onValueChange?.(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2.5 text-left text-[10px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{item[lang]}</span>
                  </button>
                )
              })}
            </NoteGenReplicaMenuGroup>
          )
        })}
      </nav>
    </aside>
  )
}

export function NoteGenSettingsPage({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon?: NoteGenReplicaIcon
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="shrink-0 px-8 pb-5 pt-7">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
            {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
            {title}
          </h2>
          {description ? <p className="max-w-3xl text-[10px] leading-relaxed text-muted-foreground">{description}</p> : null}
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-8 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">{children}</div>
      </div>
    </div>
  )
}

export function NoteGenSettingsSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="flex min-w-0 flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold">{title}</h3>
        {description ? <p className="text-[9px] text-muted-foreground">{description}</p> : null}
      </header>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  )
}

export function NoteGenSettingRow({
  icon: Icon,
  title,
  description,
  action,
  disabled = false,
}: {
  icon: NoteGenReplicaIcon
  title: string
  description?: string
  action?: ReactNode
  disabled?: boolean
}) {
  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-lg border bg-card px-3 py-2.5 shadow-xs",
        disabled && "opacity-50"
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/45 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium">{title}</div>
        {description ? <div className="mt-0.5 line-clamp-2 text-[9px] leading-4 text-muted-foreground">{description}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function NoteGenSettingSwitch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative h-5 w-9 cursor-pointer rounded-full border transition-colors disabled:cursor-default",
        checked ? "border-primary bg-primary" : "border-input bg-input"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-3.5 rounded-full bg-background shadow-sm transition-transform",
          checked ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

export function NoteGenSettingSelect({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn("flex h-8 min-w-32 items-center justify-between gap-3 rounded-md border bg-background px-3 text-[10px] shadow-xs", className)}
    >
      <span className="truncate">{value}</span>
      <ChevronDown className="size-3.5 text-muted-foreground" />
    </button>
  )
}

export function NoteGenSettingSegmentedControl({
  value,
  options,
  onValueChange,
  label,
}: {
  value: string
  options: Array<{ value: string; label: string; icon?: NoteGenReplicaIcon }>
  onValueChange?: (value: string) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-md border bg-background p-0.5 shadow-xs">
      {options.map((option) => {
        const Icon = option.icon
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onValueChange?.(option.value)}
            className={cn(
              "flex h-7 cursor-pointer items-center gap-1 rounded px-2 text-[9px] text-muted-foreground transition-colors",
              active && "bg-accent font-medium text-accent-foreground shadow-xs"
            )}
          >
            {Icon ? <Icon className="size-3" /> : null}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function GeneralSettingsReplica({ lang }: { lang: NoteGenReplicaLanguage }) {
  const [theme, setTheme] = useState("system")
  const [autostart, setAutostart] = useState(true)
  const [startHidden, setStartHidden] = useState(false)
  const text = (cnText: string, enText: string) => lang === "en" ? enText : cnText

  return (
    <NoteGenSettingsPage
      icon={Settings}
      title={text("常规设置", "General")}
      description={text("配置应用的基本设置，包括界面主题、语言等选项。", "Configure app behavior, appearance, language, and display preferences.")}
    >
      <NoteGenSettingsSection
        title={text("应用行为", "App behavior")}
        description={text("设置 NoteGen 的启动方式和关闭窗口时的行为", "Choose how NoteGen starts and what happens when its window closes.")}
      >
        <NoteGenSettingRow
          icon={AppWindow}
          title={text("关闭窗口时", "When closing the window")}
          description={text("选择点击窗口关闭按钮后执行的操作", "Choose the action performed by the window close button.")}
          action={<NoteGenSettingSelect label={text("关闭窗口时", "Close behavior")} value={text("最小化到托盘", "Minimize to tray")} />}
        />
        <NoteGenSettingRow
          icon={Rocket}
          title={text("开机启动", "Launch at startup")}
          description={text("登录系统后自动启动 NoteGen", "Start NoteGen automatically after signing in.")}
          action={<NoteGenSettingSwitch label={text("开机启动", "Launch at startup")} checked={autostart} onCheckedChange={setAutostart} />}
        />
        <NoteGenSettingRow
          icon={PanelTopClose}
          title={text("自启后隐藏主窗口", "Hide window after launch")}
          description={text("仅通过开机启动时隐藏窗口，并在系统托盘中保持运行", "Keep NoteGen running in the tray when launched at startup.")}
          disabled={!autostart}
          action={<NoteGenSettingSwitch label={text("自启后隐藏主窗口", "Hide window after launch")} checked={startHidden} disabled={!autostart} onCheckedChange={setStartHidden} />}
        />
      </NoteGenSettingsSection>

      <NoteGenSettingsSection
        title={text("外观与语言", "Appearance and language")}
        description={text("调整应用主题、显示语言和全局字体", "Adjust the theme, display language, and app font.")}
      >
        <NoteGenSettingRow
          icon={Palette}
          title={text("主题", "Theme")}
          description={text("选择应用的外观主题", "Choose the app appearance.")}
          action={
            <NoteGenSettingSegmentedControl
              label={text("主题", "Theme")}
              value={theme}
              onValueChange={setTheme}
              options={[
                { value: "light", label: text("亮色", "Light"), icon: Sun },
                { value: "dark", label: text("暗色", "Dark"), icon: Moon },
                { value: "system", label: text("跟随系统", "System"), icon: SunMoon },
              ]}
            />
          }
        />
        <NoteGenSettingRow
          icon={Languages}
          title={text("语言", "Language")}
          description={text("选择应用的显示语言", "Choose the app display language.")}
          action={<NoteGenSettingSelect label={text("语言", "Language")} value={lang === "en" ? "English" : "中文"} />}
        />
        <NoteGenSettingRow
          icon={ZoomIn}
          title={text("界面缩放", "Interface scale")}
          description={text("调整应用界面的整体缩放比例", "Adjust the overall scale of the app interface.")}
          action={
            <div className="flex w-36 flex-col gap-1.5">
              <div className="flex justify-between text-[8px] text-muted-foreground"><span>75%</span><span className="font-medium text-foreground">100%</span><span>150%</span></div>
              <div className="relative h-1 rounded-full bg-input"><span className="absolute left-0 top-0 h-1 w-1/3 rounded-full bg-primary" /><span className="absolute left-1/3 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background shadow-sm" /></div>
            </div>
          }
        />
      </NoteGenSettingsSection>
    </NoteGenSettingsPage>
  )
}

function GenericSettingsReplica({
  lang,
  section,
}: {
  lang: NoteGenReplicaLanguage
  section: NoteGenSettingSectionId
}) {
  const item = navigationItems.find((candidate) => candidate.id === section) ?? navigationItems[0]
  const text = (cnText: string, enText: string) => lang === "en" ? enText : cnText
  const blueprints: Record<Exclude<NoteGenSettingSectionId, "general">, { description: [string, string]; group: [string, string]; rows: Array<[string, string, string, string, "switch" | "select", string, string]> }> = {
    about: { description: ["查看版本、更新渠道与开源信息。", "View version, update channel, and open-source information."], group: ["应用信息", "Application"], rows: [["当前版本", "Current version", "你正在使用 NoteGen 0.22.0", "You are using NoteGen 0.22.0", "select", "检查更新", "Check for updates"], ["更新渠道", "Update channel", "选择接收稳定版或预览版更新", "Choose stable or preview releases", "select", "稳定版", "Stable"]] },
    record: { description: ["配置快速记录的输入方式、列表密度和整理行为。", "Configure capture inputs, list density, and organization behavior."], group: ["记录体验", "Capture experience"], rows: [["标题栏记录工具", "Title bar capture tools", "显示文字、录音、OCR、图片与链接入口", "Show text, audio, OCR, image, and link actions", "switch", "", ""], ["默认列表样式", "Default list style", "选择记录列表的内容密度", "Choose the density of the capture list", "select", "紧凑", "Compact"], ["自动生成描述", "Generate descriptions", "使用 AI 为新记录生成简短描述", "Use AI to describe new captures", "switch", "", ""]] },
    editor: { description: ["配置写作界面、Markdown 行为与自动保存。", "Configure writing UI, Markdown behavior, and autosave."], group: ["编辑体验", "Editing experience"], rows: [["默认编辑模式", "Default editing mode", "打开文件时使用的编辑器模式", "Editor mode used when opening files", "select", "所见即所得", "WYSIWYG"], ["自动保存", "Autosave", "停止输入后自动保存当前文档", "Save the document after typing stops", "switch", "", ""], ["显示大纲", "Show outline", "在编辑器右侧显示标题大纲", "Show heading outline beside the editor", "switch", "", ""]] },
    canvas: { description: ["配置画布网格、节点样式和默认交互。", "Configure canvas grid, node style, and default interaction."], group: ["画布体验", "Canvas experience"], rows: [["显示网格", "Show grid", "在画布背景显示对齐参考点", "Show alignment points on the canvas", "switch", "", ""], ["默认连接线", "Default edge", "新连接使用的线条样式", "Line style for new connections", "select", "曲线", "Curved"], ["自动整理节点", "Auto-layout nodes", "创建内容后自动调整节点位置", "Arrange nodes after creating content", "switch", "", ""]] },
    shortcuts: { description: ["查看和自定义键盘快捷键。", "View and customize keyboard shortcuts."], group: ["全局快捷键", "Global shortcuts"], rows: [["打开快速记录", "Open quick capture", "在任意位置唤起记录窗口", "Open capture from anywhere", "select", "⌘ ⇧ N", "⌘ ⇧ N"], ["全局搜索", "Global search", "搜索记录、笔记与画布", "Search captures, notes, and canvases", "select", "⌘ K", "⌘ K"], ["显示主窗口", "Show main window", "快速显示或隐藏 NoteGen", "Show or hide NoteGen", "select", "⌘ ⇧ Space", "⌘ ⇧ Space"]] },
    ocr: { description: ["配置截图文字识别语言和处理方式。", "Configure OCR languages and processing."], group: ["文字识别", "Text recognition"], rows: [["识别语言", "Recognition languages", "选择图片中可能出现的语言", "Choose languages that may appear in images", "select", "中文 + English", "Chinese + English"], ["自动识别", "Recognize automatically", "添加图片后立即提取文字", "Extract text immediately after adding an image", "switch", "", ""]] },
    audio: { description: ["配置录音设备、转写模型和音频保留策略。", "Configure recording device, transcription, and retention."], group: ["录音与转写", "Recording and transcription"], rows: [["输入设备", "Input device", "录音时使用的麦克风", "Microphone used for recording", "select", "MacBook 麦克风", "MacBook Microphone"], ["自动转写", "Automatic transcription", "结束录音后生成文字稿", "Create a transcript when recording ends", "switch", "", ""], ["转写语言", "Transcription language", "用于语音识别的主要语言", "Primary speech recognition language", "select", "自动检测", "Auto detect"]] },
    ai: { description: ["管理模型服务、API 地址与默认模型。", "Manage model providers, API endpoints, and default models."], group: ["默认模型服务", "Default model provider"], rows: [["模型服务", "Provider", "用于对话、整理与写作的服务商", "Provider used for chat, organization, and writing", "select", "OpenAI", "OpenAI"], ["默认模型", "Default model", "新对话默认使用的模型", "Model used for new chats", "select", "GPT-5", "GPT-5"], ["流式输出", "Streaming output", "生成内容时逐步显示结果", "Show results while they are generated", "switch", "", ""]] },
    "web-search": { description: ["选择 Agent 联网检索时使用的搜索服务。", "Choose the service Agent uses for web search."], group: ["搜索服务", "Search provider"], rows: [["启用联网搜索", "Enable web search", "允许 Agent 获取最新公开信息", "Allow Agent to retrieve current public information", "switch", "", ""], ["搜索服务", "Search provider", "用于检索网页结果的服务", "Service used to retrieve web results", "select", "Tavily", "Tavily"]] },
    rag: { description: ["管理本地知识库索引、嵌入模型和检索范围。", "Manage local indexing, embeddings, and retrieval scope."], group: ["知识库索引", "Knowledge base index"], rows: [["启用知识库", "Enable knowledge base", "为笔记建立可检索的本地索引", "Build a searchable local index for notes", "switch", "", ""], ["嵌入模型", "Embedding model", "生成文档向量使用的模型", "Model used to create document vectors", "select", "text-embedding-3-small", "text-embedding-3-small"], ["索引状态", "Index status", "当前已有 286 个文档片段", "286 document chunks are indexed", "select", "重新索引", "Reindex"]] },
    memories: { description: ["控制 Agent 可保存和使用的长期偏好。", "Control long-term preferences Agent can store and use."], group: ["长期记忆", "Long-term memory"], rows: [["启用记忆", "Enable memories", "让 Agent 记住稳定的写作偏好", "Let Agent remember stable writing preferences", "switch", "", ""], ["记忆条目", "Memory entries", "查看与管理已保存的偏好", "Review and manage saved preferences", "select", "12 条", "12 items"]] },
    prompt: { description: ["管理对话、整理和写作所使用的系统提示词。", "Manage system prompts for chat, organization, and writing."], group: ["提示词库", "Prompt library"], rows: [["默认对话提示词", "Default chat prompt", "新对话使用的系统指令", "System instructions for new chats", "select", "NoteGen Agent", "NoteGen Agent"], ["整理提示词", "Organization prompt", "将记录整理成笔记时使用", "Used when turning captures into notes", "select", "结构化笔记", "Structured notes"]] },
    mcp: { description: ["连接外部 MCP 服务并管理可用工具。", "Connect external MCP servers and manage tools."], group: ["MCP 服务", "MCP servers"], rows: [["文件系统", "Filesystem", "读取允许目录中的文件", "Read files in allowed directories", "switch", "", ""], ["浏览器工具", "Browser tools", "为 Agent 提供网页读取能力", "Provide web reading tools to Agent", "switch", "", ""], ["添加服务", "Add server", "通过命令或远程地址连接", "Connect with a command or remote URL", "select", "添加 MCP", "Add MCP"]] },
    skills: { description: ["安装和管理 Agent 可调用的技能。", "Install and manage skills available to Agent."], group: ["已安装技能", "Installed skills"], rows: [["技术写作", "Technical writing", "生成结构清晰的技术文档", "Create structured technical documents", "switch", "", ""], ["网页研究", "Web research", "搜索并整理公开资料", "Search and synthesize public sources", "switch", "", ""], ["技能目录", "Skill directory", "发现更多可安装技能", "Discover more installable skills", "select", "浏览", "Browse"]] },
    template: { description: ["创建记录整理为笔记时使用的结构模板。", "Create structures used to organize captures into notes."], group: ["整理模板", "Organization templates"], rows: [["默认模板", "Default template", "整理记录时优先使用的模板", "Preferred template when organizing captures", "select", "自动选择", "Automatic"], ["会议纪要", "Meeting notes", "议题、结论与行动项", "Topics, decisions, and action items", "switch", "", ""], ["每日回顾", "Daily review", "今日记录与明日计划", "Today’s captures and tomorrow’s plan", "switch", "", ""]] },
    sync: { description: ["将记录、笔记、画布和偏好同步到远程仓库。", "Sync captures, notes, canvases, and preferences to a remote repository."], group: ["远程同步", "Remote sync"], rows: [["同步服务", "Sync service", "选择代码托管或 WebDAV 服务", "Choose Git hosting or WebDAV", "select", "GitHub", "GitHub"], ["自动同步", "Automatic sync", "内容变化后自动推送与拉取", "Push and pull after content changes", "switch", "", ""], ["同步状态", "Sync status", "上次同步于 2 分钟前", "Last synced 2 minutes ago", "select", "立即同步", "Sync now"]] },
    backup: { description: ["创建本地备份并配置保留周期。", "Create local backups and configure retention."], group: ["本地备份", "Local backup"], rows: [["自动备份", "Automatic backup", "每天创建一份本地数据备份", "Create one local backup every day", "switch", "", ""], ["保留时间", "Retention", "自动删除过期备份", "Remove expired backups automatically", "select", "30 天", "30 days"], ["备份位置", "Backup location", "保存压缩备份文件的目录", "Directory for compressed backup files", "select", "~/NoteGen Backups", "~/NoteGen Backups"]] },
    "image-hosting": { description: ["配置笔记图片上传和链接生成方式。", "Configure image uploads and generated links."], group: ["图片上传", "Image uploads"], rows: [["图床服务", "Image host", "粘贴图片时使用的上传服务", "Upload service used when pasting images", "select", "本地文件", "Local files"], ["自动上传", "Upload automatically", "插入图片时自动转换为远程链接", "Convert inserted images to remote links", "switch", "", ""], ["文件命名", "File naming", "上传图片的默认命名规则", "Default naming rule for uploaded images", "select", "日期 + 哈希", "Date + hash"]] },
    files: { description: ["配置笔记目录、附件位置和文件监控。", "Configure notes directory, attachments, and file watching."], group: ["文件与目录", "Files and folders"], rows: [["笔记目录", "Notes directory", "Markdown 文件保存的位置", "Location of Markdown files", "select", "~/Documents/NoteGen", "~/Documents/NoteGen"], ["监听文件变化", "Watch file changes", "自动刷新由其他应用修改的内容", "Refresh content changed by other apps", "switch", "", ""], ["附件目录", "Attachments folder", "图片与音频文件的保存位置", "Location for image and audio files", "select", "attachments", "attachments"]] },
  }
  const blueprint = blueprints[section as Exclude<NoteGenSettingSectionId, "general">] ?? blueprints.about

  return (
    <NoteGenSettingsPage icon={item.icon} title={item[lang]} description={blueprint.description[lang === "en" ? 1 : 0]}>
      <NoteGenSettingsSection
        title={blueprint.group[lang === "en" ? 1 : 0]}
        description={text("这些项目复刻 NoteGen 中对应设置的视觉结构。", "These rows reproduce the visual structure of the corresponding NoteGen settings.")}
      >
        {blueprint.rows.map(([cnTitle, enTitle, cnDescription, enDescription, control, cnValue, enValue], index) => (
          <NoteGenSettingRow key={cnTitle} icon={index === 0 ? item.icon : Sparkles} title={text(cnTitle, enTitle)} description={text(cnDescription, enDescription)} action={control === "switch" ? <NoteGenSettingSwitch checked={index !== 2} label={text(cnTitle, enTitle)} /> : <NoteGenSettingSelect label={text(cnTitle, enTitle)} value={text(cnValue, enValue)} />} />
        ))}
      </NoteGenSettingsSection>
    </NoteGenSettingsPage>
  )
}

export function NoteGenSettingsDialogReplica({ lang = "cn", initialSection = "general", className }: { lang?: NoteGenReplicaLanguage; initialSection?: NoteGenSettingSectionId; className?: string }) {
  return <div className={cn("relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl border bg-muted/30 p-4 before:absolute before:inset-0 before:bg-background/45 before:backdrop-blur-[2px]", className)}><div className="relative z-10 h-[min(680px,calc(100%-16px))] min-h-[480px] w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-2xl"><NoteGenSettingsReplica lang={lang} initialSection={initialSection} /></div></div>
}

export function NoteGenSettingsReplica({
  lang = "cn",
  initialSection = "general",
  onClose,
  className,
}: {
  lang?: NoteGenReplicaLanguage
  initialSection?: NoteGenSettingSectionId
  onClose?: () => void
  className?: string
}) {
  const [section, setSection] = useState<NoteGenSettingSectionId>(initialSection)
  const [query, setQuery] = useState("")

  return (
    <div className={cn("relative h-full min-h-0 overflow-hidden", className)}>
      <NoteGenSettingsShell
        sidebar={
          <NoteGenSettingsSidebar
            lang={lang}
            value={section}
            onValueChange={setSection}
            query={query}
            onQueryChange={setQuery}
          />
        }
      >
        {section === "general"
          ? <GeneralSettingsReplica lang={lang} />
          : <GenericSettingsReplica lang={lang} section={section} />}
      </NoteGenSettingsShell>
      {onClose ? (
        <button
          type="button"
          aria-label={lang === "en" ? "Close settings" : "关闭设置"}
          onClick={onClose}
          className="absolute right-3 top-3 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}
