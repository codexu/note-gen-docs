"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  AppWindow,
  AlertTriangle,
  ArchiveRestore,
  Bookmark,
  Book,
  BotMessageSquare,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  Database,
  DatabaseBackup,
  Drama,
  Download,
  ExternalLink,
  FileCog,
  Folder,
  FolderOpen,
  FolderX,
  Globe2,
  ImageUp,
  Keyboard,
  Languages,
  LayoutTemplate,
  Moon,
  Network,
  Palette,
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
  Type,
  Upload,
  Volume2,
  WandSparkles,
  X,
  ZoomIn,
} from "lucide-react"

import { noteGenSettingsPages, type NoteGenSettingRowData, type NoteGenSettingSectionData, type NoteGenSettingSectionId } from "@/components/notegen/settings-data"
import type { NoteGenReplicaIcon, NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type { NoteGenSettingSectionId } from "@/components/notegen/settings-data"

type NavigationItem = {
  id: NoteGenSettingSectionId
  icon: NoteGenReplicaIcon
  cn: string
  en: string
  group: "basic" | "aiExtensions" | "data"
}
const navigationItems: NavigationItem[] = [
  { id: "about", icon: Store, cn: "关于", en: "About", group: "basic" },
  { id: "general", icon: Settings, cn: "常规设置", en: "General Settings", group: "basic" },
  { id: "record", icon: PenTool, cn: "记录设置", en: "Record Settings", group: "basic" },
  { id: "editor", icon: FileCog, cn: "编辑器设置", en: "Editor Settings", group: "basic" },
  { id: "canvas", icon: Palette, cn: "画布设置", en: "Canvas Settings", group: "basic" },
  { id: "shortcuts", icon: Keyboard, cn: "快捷键", en: "Shortcuts", group: "basic" },
  { id: "imageMethod", icon: ScanText, cn: "图像识别", en: "Image Recognition", group: "basic" },
  { id: "audio", icon: Volume2, cn: "语音设置", en: "Audio Settings", group: "basic" },
  { id: "ai", icon: BotMessageSquare, cn: "模型服务", en: "Model Services", group: "aiExtensions" },
  { id: "webSearch", icon: Globe2, cn: "网络搜索", en: "Web Search", group: "aiExtensions" },
  { id: "rag", icon: Book, cn: "知识库", en: "Knowledge Base", group: "aiExtensions" },
  { id: "memories", icon: Brain, cn: "记忆管理", en: "Memory Management", group: "aiExtensions" },
  { id: "prompt", icon: Drama, cn: "提示词", en: "Prompt", group: "aiExtensions" },
  { id: "mcp", icon: Puzzle, cn: "MCP", en: "MCP", group: "aiExtensions" },
  { id: "skills", icon: Sparkles, cn: "技能", en: "Skills", group: "aiExtensions" },
  { id: "template", icon: LayoutTemplate, cn: "整理模板", en: "Template", group: "aiExtensions" },
  { id: "sync", icon: DatabaseBackup, cn: "同步配置", en: "Sync", group: "data" },
  { id: "backup", icon: ArchiveRestore, cn: "备份与恢复", en: "Backup & Restore", group: "data" },
  { id: "imageHosting", icon: ImageUp, cn: "图片存储", en: "Image Storage", group: "data" },
  { id: "file", icon: FolderOpen, cn: "文件管理", en: "File Settings", group: "data" },
]
export const noteGenSettingsNavigation = navigationItems

const groupLabels = {
  basic: { cn: "基础设置", en: "Basic" },
  aiExtensions: { cn: "AI 与扩展", en: "AI & Extensions" },
  data: { cn: "数据与存储", en: "Data & Storage" },
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
  hasUpdate = true,
}: {
  lang: NoteGenReplicaLanguage
  value: NoteGenSettingSectionId
  onValueChange?: (section: NoteGenSettingSectionId) => void
  query?: string
  onQueryChange?: (query: string) => void
  hasUpdate?: boolean
}) {
  const normalizedQuery = query?.trim().toLocaleLowerCase() ?? ""
  const filtered = useMemo(
    () => navigationItems.filter((item) => {
      if (!normalizedQuery) return true
      const page = noteGenSettingsPages[item.id]
      const searchTerms = JSON.stringify(page).toLocaleLowerCase()
      return item.cn.toLocaleLowerCase().includes(normalizedQuery)
        || item.en.toLocaleLowerCase().includes(normalizedQuery)
        || searchTerms.includes(normalizedQuery)
    }),
    [normalizedQuery]
  )

  return (
    <aside className="flex h-full min-h-0 w-56 shrink-0 flex-col border-r bg-sidebar py-4">
      <div className="shrink-0 px-3">
        <label className="flex h-8 items-center gap-2 rounded-lg border border-input bg-background px-2 text-muted-foreground">
          <Search className="size-4" />
          <input
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={lang === "en" ? "Search settings..." : "搜索设置..."}
            aria-label={lang === "en" ? "Search settings..." : "搜索设置..."}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-32 flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground">
          <Search className="size-5 opacity-50" />
          <span>{lang === "en" ? "No matching settings found" : "没有找到相关设置"}</span>
        </div>
      ) : <nav className="min-h-0 flex-1 overflow-y-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["basic", "aiExtensions", "data"] as const).map((group) => {
          const items = filtered.filter((item) => item.group === group)
          if (items.length === 0) return null

          return (
            <div key={group} className="flex flex-col gap-0.5">
              <div className="px-2.5 pb-1 pt-5 text-[11px] font-normal text-muted-foreground/60 first:pt-3">{groupLabels[group][lang]}</div>
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
                      "flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-2.5 text-left text-sm font-medium whitespace-nowrap text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      active && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} />
                    <span className="truncate">{item[lang]}</span>
                    {item.id === "about" && hasUpdate ? <span className="ml-auto size-2 shrink-0 rounded-full bg-destructive" aria-hidden="true" /> : null}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>}
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
      <header className="shrink-0 px-8 pb-6 pr-10 pt-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            {Icon ? <Icon className="size-6 text-muted-foreground" /> : null}
            {title}
          </h2>
          {description ? <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-8 pr-10 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="flex flex-col gap-3">{children}</div>
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
        "flex w-full flex-wrap items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-sm",
        disabled && "opacity-50"
      )}
    >
      <span className="flex shrink-0 self-start pt-0.5 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium leading-snug">{title}</div>
        {description ? <div className="mt-1 line-clamp-2 text-sm leading-normal font-normal text-muted-foreground">{description}</div> : null}
      </div>
      {action ? <div className="ml-auto shrink-0">{action}</div> : null}
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
        "relative h-[18.4px] w-8 cursor-pointer rounded-full border border-transparent transition-colors disabled:cursor-default disabled:opacity-50",
        checked ? "bg-primary" : "bg-input"
      )}
    >
      <span
        className={cn(
          "absolute top-[0.7px] size-4 rounded-full bg-background transition-transform",
          checked ? "translate-x-[14px]" : "translate-x-0"
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
      className={cn("flex h-8 min-w-36 items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pl-2.5 pr-2 text-sm", className)}
    >
      <span className="truncate">{value}</span>
      <ChevronDown className="size-4 text-muted-foreground" />
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
    <div role="group" aria-label={label} className="flex rounded-lg border bg-background p-[3px]">
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
              "flex h-7 cursor-pointer items-center gap-1 rounded-md px-2 text-sm text-muted-foreground transition-colors",
              active && "bg-accent font-medium text-accent-foreground"
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
  const [autostart, setAutostart] = useState(false)
  const text = (cnText: string, enText: string) => lang === "en" ? enText : cnText

  return (
    <NoteGenSettingsPage
      icon={Settings}
      title={text("常规设置", "General")}
      description={text("在这里，你可以配置应用的基本设置，包括界面主题、语言等选项。", "Configure basic application settings, including theme and language.")}
    >
      <NoteGenSettingsSection
        title={text("应用行为", "App behavior")}
        description={text("设置 NoteGen 的启动方式和关闭窗口时的行为", "Choose how NoteGen starts and what happens when its window closes.")}
      >
        <NoteGenSettingRow
          icon={AppWindow}
          title={text("关闭窗口时", "When closing the window")}
          description={text("选择点击窗口关闭按钮后执行的操作", "Choose the action performed by the window close button.")}
          action={<NoteGenSettingSelect className="w-[200px]" label={text("关闭窗口时", "Close behavior")} value={text("最小化到托盘", "Minimize to tray")} />}
        />
        <NoteGenSettingRow
          icon={Rocket}
          title={text("开机启动", "Launch at startup")}
          description={text("登录系统后自动启动 NoteGen", "Start NoteGen automatically after signing in.")}
          action={<NoteGenSettingSwitch label={text("开机启动", "Launch at startup")} checked={autostart} onCheckedChange={setAutostart} />}
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
          action={<NoteGenSettingSelect className="w-[180px]" label={text("语言", "Language")} value={lang === "en" ? "English" : "中文"} />}
        />
        <NoteGenSettingRow
          icon={Type}
          title={text("应用字体", "App font")}
          description={text("桌面端可选择系统字体；移动端使用系统允许的通用字体族", "Choose a system font on desktop; mobile uses supported generic font families.")}
          action={<NoteGenSettingSelect className="w-[220px]" label={text("应用字体", "App font")} value={text("跟随系统", "System default")} />}
        />
        <NoteGenSettingRow
          icon={Palette}
          title={text("自定义主题颜色", "Custom theme colors")}
          description={text("自定义应用的主题颜色，包括背景色、前景色、边框色等", "Customize background, foreground, border, and other theme colors.")}
          action={<NoteGenSettingButton>{text("编辑颜色", "Edit colors")}</NoteGenSettingButton>}
        />
      </NoteGenSettingsSection>

      <NoteGenSettingsSection
        title={text("阅读与缩放", "Reading and scale")}
        description={text("分别调整界面、正文和列表的显示尺寸", "Adjust interface, content, and list sizes independently.")}
      >
        <NoteGenSettingRow
          icon={ZoomIn}
          title={text("界面缩放", "Interface scale")}
          description={text("调整应用界面的整体缩放比例", "Adjust the overall scale of the app interface.")}
          action={<NoteGenScaleControl />}
        />
        <NoteGenSettingRow
          icon={Type}
          title={text("正文缩放", "Content scale")}
          description={text("调整编辑器和对话中 Markdown 内容的文字大小", "Adjust Markdown text in the editor and chat.")}
          action={<NoteGenScaleControl />}
        />
        <NoteGenSettingRow
          icon={Folder}
          title={text("文件管理器文字大小", "File manager text size")}
          description={text("调整文件管理器中文件和文件夹列表的文字大小", "Adjust text size in file and folder lists.")}
          action={<NoteGenSettingSelect className="w-[160px]" label={text("文件管理器文字大小", "File manager text size")} value="14px" />}
        />
        <NoteGenSettingRow
          icon={Bookmark}
          title={text("记录文字大小", "Capture text size")}
          description={text("调整记录列表中记录项的文字大小", "Adjust text size in the capture list.")}
          action={<NoteGenSettingSelect className="w-[160px]" label={text("记录文字大小", "Capture text size")} value="14px" />}
        />
      </NoteGenSettingsSection>

      <NoteGenSettingsSection
        title={text("高级设置", "Advanced settings")}
        description={text("配置网络代理、数据管理和配置文件等高级选项。部分操作可能影响现有数据，请谨慎修改。", "Configure proxy, data management, and configuration files. Some changes may affect existing data.")}
      >
        <NoteGenSettingRow
          icon={Network}
          title={text("网络代理", "Network proxy")}
          description={text("代理，用于解决网络问题，配置后建议重启应用。", "Configure a proxy for network issues; restart the app after changing it.")}
          action={<span className="flex h-8 w-[280px] items-center rounded-lg border border-input px-2.5 text-sm text-muted-foreground">{text("请输入代理地址", "Enter proxy address")}</span>}
        />
        <NoteGenSettingRow
          icon={FileCog}
          title={text("配置文件管理", "Configuration files")}
          description={text("配置文件导入与导出，导入配置文件将覆盖当前配置，并且重启后生效。", "Import or export configuration files. Imported settings take effect after restart.")}
          action={<div className="flex gap-2"><NoteGenSettingButton icon={Upload}>{text("导入", "Import")}</NoteGenSettingButton><NoteGenSettingButton icon={Download}>{text("导出", "Export")}</NoteGenSettingButton></div>}
        />
      </NoteGenSettingsSection>

      <NoteGenSettingsSection
        title={text("危险操作", "Danger zone")}
        description={text("以下操作会永久删除本地内容，执行前请确认已完成备份。", "The following actions permanently delete local content. Make sure you have a backup.")}
      >
        <NoteGenSettingRow
          icon={Database}
          title={text("清理数据", "Clear data")}
          description={text("清理数据信息，包括系统配置信息、数据库（包含记录）。", "Delete settings and the local database, including captures.")}
          action={<NoteGenSettingButton destructive>{text("清理", "Clear")}</NoteGenSettingButton>}
        />
        <NoteGenSettingRow
          icon={FolderX}
          title={text("清理文件", "Clear files")}
          description={text("清理文件，包括图片、文章。", "Delete local images and articles.")}
          action={<NoteGenSettingButton destructive>{text("清理", "Clear")}</NoteGenSettingButton>}
        />
      </NoteGenSettingsSection>
    </NoteGenSettingsPage>
  )
}

function NoteGenScaleControl() {
  return (
    <div className="flex w-[180px] flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>75%</span><span className="font-medium text-foreground">100%</span><span>150%</span></div>
      <div className="relative h-1 rounded-full bg-input"><span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary" /><span className="absolute left-1/3 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background shadow-sm" /></div>
    </div>
  )
}

function NoteGenSettingButton({ children, icon: Icon, destructive = false }: { children: ReactNode; icon?: NoteGenReplicaIcon; destructive?: boolean }) {
  return <span className={cn("inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium", destructive ? "border-destructive bg-destructive text-destructive-foreground" : "border-input bg-background")}>{Icon ? <Icon className="size-3.5" /> : null}{children}</span>
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
    about: { description: ["查看版本、更新渠道与开源信息。", "View version, update channel, and open-source information."], group: ["应用信息", "Application"], rows: [["当前版本", "Current version", "你正在使用 NoteGen 0.36.0", "You are using NoteGen 0.36.0", "select", "检查更新", "Check for updates"], ["更新渠道", "Update channel", "选择接收稳定版或预览版更新", "Choose stable or preview releases", "select", "稳定版", "Stable"]] },
    record: { description: ["配置快速记录的输入方式、列表密度和整理行为。", "Configure capture inputs, list density, and organization behavior."], group: ["记录体验", "Capture experience"], rows: [["标题栏记录工具", "Title bar capture tools", "显示文字、录音、OCR、图片与链接入口", "Show text, audio, OCR, image, and link actions", "switch", "", ""], ["默认列表样式", "Default list style", "选择记录列表的内容密度", "Choose the density of the capture list", "select", "紧凑", "Compact"], ["自动生成描述", "Generate descriptions", "使用 AI 为新记录生成简短描述", "Use AI to describe new captures", "switch", "", ""]] },
    editor: { description: ["配置写作界面、Markdown 行为与自动保存。", "Configure writing UI, Markdown behavior, and autosave."], group: ["编辑体验", "Editing experience"], rows: [["默认编辑模式", "Default editing mode", "打开文件时使用的编辑器模式", "Editor mode used when opening files", "select", "所见即所得", "WYSIWYG"], ["自动保存", "Autosave", "停止输入后自动保存当前文档", "Save the document after typing stops", "switch", "", ""], ["显示大纲", "Show outline", "在编辑器右侧显示标题大纲", "Show heading outline beside the editor", "switch", "", ""]] },
    canvas: { description: ["配置画布网格、节点样式和默认交互。", "Configure canvas grid, node style, and default interaction."], group: ["画布体验", "Canvas experience"], rows: [["显示网格", "Show grid", "在画布背景显示对齐参考点", "Show alignment points on the canvas", "switch", "", ""], ["默认连接线", "Default edge", "新连接使用的线条样式", "Line style for new connections", "select", "曲线", "Curved"], ["自动整理节点", "Auto-layout nodes", "创建内容后自动调整节点位置", "Arrange nodes after creating content", "switch", "", ""]] },
    shortcuts: { description: ["查看和自定义键盘快捷键。", "View and customize keyboard shortcuts."], group: ["全局快捷键", "Global shortcuts"], rows: [["打开快速记录", "Open quick capture", "在任意位置唤起记录窗口", "Open capture from anywhere", "select", "⌘ ⇧ N", "⌘ ⇧ N"], ["全局搜索", "Global search", "搜索记录、笔记与画布", "Search captures, notes, and canvases", "select", "⌘ K", "⌘ K"], ["显示主窗口", "Show main window", "快速显示或隐藏 NoteGen", "Show or hide NoteGen", "select", "⌘ ⇧ Space", "⌘ ⇧ Space"]] },
    imageMethod: { description: ["配置截图文字识别语言和处理方式。", "Configure OCR languages and processing."], group: ["文字识别", "Text recognition"], rows: [["识别语言", "Recognition languages", "选择图片中可能出现的语言", "Choose languages that may appear in images", "select", "中文 + English", "Chinese + English"], ["自动识别", "Recognize automatically", "添加图片后立即提取文字", "Extract text immediately after adding an image", "switch", "", ""]] },
    audio: { description: ["配置录音设备、转写模型和音频保留策略。", "Configure recording device, transcription, and retention."], group: ["录音与转写", "Recording and transcription"], rows: [["输入设备", "Input device", "录音时使用的麦克风", "Microphone used for recording", "select", "MacBook 麦克风", "MacBook Microphone"], ["自动转写", "Automatic transcription", "结束录音后生成文字稿", "Create a transcript when recording ends", "switch", "", ""], ["转写语言", "Transcription language", "用于语音识别的主要语言", "Primary speech recognition language", "select", "自动检测", "Auto detect"]] },
    ai: { description: ["管理模型服务、API 地址与默认模型。", "Manage model providers, API endpoints, and default models."], group: ["默认模型服务", "Default model provider"], rows: [["模型服务", "Provider", "用于对话、整理与写作的服务商", "Provider used for chat, organization, and writing", "select", "OpenAI", "OpenAI"], ["默认模型", "Default model", "新对话默认使用的模型", "Model used for new chats", "select", "GPT-5", "GPT-5"], ["流式输出", "Streaming output", "生成内容时逐步显示结果", "Show results while they are generated", "switch", "", ""]] },
    webSearch: { description: ["选择 Agent 联网检索时使用的搜索服务。", "Choose the service Agent uses for web search."], group: ["搜索服务", "Search provider"], rows: [["启用联网搜索", "Enable web search", "允许 Agent 获取最新公开信息", "Allow Agent to retrieve current public information", "switch", "", ""], ["搜索服务", "Search provider", "用于检索网页结果的服务", "Service used to retrieve web results", "select", "Tavily", "Tavily"]] },
    rag: { description: ["管理本地知识库索引、嵌入模型和检索范围。", "Manage local indexing, embeddings, and retrieval scope."], group: ["知识库索引", "Knowledge base index"], rows: [["启用知识库", "Enable knowledge base", "为笔记建立可检索的本地索引", "Build a searchable local index for notes", "switch", "", ""], ["嵌入模型", "Embedding model", "生成文档向量使用的模型", "Model used to create document vectors", "select", "text-embedding-3-small", "text-embedding-3-small"], ["索引状态", "Index status", "当前已有 286 个文档片段", "286 document chunks are indexed", "select", "重新索引", "Reindex"]] },
    memories: { description: ["控制 Agent 可保存和使用的长期偏好。", "Control long-term preferences Agent can store and use."], group: ["长期记忆", "Long-term memory"], rows: [["启用记忆", "Enable memories", "让 Agent 记住稳定的写作偏好", "Let Agent remember stable writing preferences", "switch", "", ""], ["记忆条目", "Memory entries", "查看与管理已保存的偏好", "Review and manage saved preferences", "select", "12 条", "12 items"]] },
    prompt: { description: ["管理对话、整理和写作所使用的系统提示词。", "Manage system prompts for chat, organization, and writing."], group: ["提示词库", "Prompt library"], rows: [["默认对话提示词", "Default chat prompt", "新对话使用的系统指令", "System instructions for new chats", "select", "NoteGen Agent", "NoteGen Agent"], ["整理提示词", "Organization prompt", "将记录整理成笔记时使用", "Used when turning captures into notes", "select", "结构化笔记", "Structured notes"]] },
    mcp: { description: ["连接外部 MCP 服务并管理可用工具。", "Connect external MCP servers and manage tools."], group: ["MCP 服务", "MCP servers"], rows: [["文件系统", "Filesystem", "读取允许目录中的文件", "Read files in allowed directories", "switch", "", ""], ["浏览器工具", "Browser tools", "为 Agent 提供网页读取能力", "Provide web reading tools to Agent", "switch", "", ""], ["添加服务", "Add server", "通过命令或远程地址连接", "Connect with a command or remote URL", "select", "添加 MCP", "Add MCP"]] },
    skills: { description: ["安装和管理 Agent 可调用的技能。", "Install and manage skills available to Agent."], group: ["已安装技能", "Installed skills"], rows: [["技术写作", "Technical writing", "生成结构清晰的技术文档", "Create structured technical documents", "switch", "", ""], ["网页研究", "Web research", "搜索并整理公开资料", "Search and synthesize public sources", "switch", "", ""], ["技能目录", "Skill directory", "发现更多可安装技能", "Discover more installable skills", "select", "浏览", "Browse"]] },
    template: { description: ["创建记录整理为笔记时使用的结构模板。", "Create structures used to organize captures into notes."], group: ["整理模板", "Organization templates"], rows: [["默认模板", "Default template", "整理记录时优先使用的模板", "Preferred template when organizing captures", "select", "自动选择", "Automatic"], ["会议纪要", "Meeting notes", "议题、结论与行动项", "Topics, decisions, and action items", "switch", "", ""], ["每日回顾", "Daily review", "今日记录与明日计划", "Today’s captures and tomorrow’s plan", "switch", "", ""]] },
    sync: { description: ["将记录、笔记、画布和偏好同步到远程仓库。", "Sync captures, notes, canvases, and preferences to a remote repository."], group: ["远程同步", "Remote sync"], rows: [["同步服务", "Sync service", "选择代码托管或 WebDAV 服务", "Choose Git hosting or WebDAV", "select", "GitHub", "GitHub"], ["自动同步", "Automatic sync", "内容变化后自动推送与拉取", "Push and pull after content changes", "switch", "", ""], ["同步状态", "Sync status", "上次同步于 2 分钟前", "Last synced 2 minutes ago", "select", "立即同步", "Sync now"]] },
    backup: { description: ["创建本地备份并配置保留周期。", "Create local backups and configure retention."], group: ["本地备份", "Local backup"], rows: [["自动备份", "Automatic backup", "每天创建一份本地数据备份", "Create one local backup every day", "switch", "", ""], ["保留时间", "Retention", "自动删除过期备份", "Remove expired backups automatically", "select", "30 天", "30 days"], ["备份位置", "Backup location", "保存压缩备份文件的目录", "Directory for compressed backup files", "select", "~/NoteGen Backups", "~/NoteGen Backups"]] },
    imageHosting: { description: ["配置笔记图片上传和链接生成方式。", "Configure image uploads and generated links."], group: ["图片上传", "Image uploads"], rows: [["图床服务", "Image host", "粘贴图片时使用的上传服务", "Upload service used when pasting images", "select", "本地文件", "Local files"], ["自动上传", "Upload automatically", "插入图片时自动转换为远程链接", "Convert inserted images to remote links", "switch", "", ""], ["文件命名", "File naming", "上传图片的默认命名规则", "Default naming rule for uploaded images", "select", "日期 + 哈希", "Date + hash"]] },
    file: { description: ["配置笔记目录、附件位置和文件监控。", "Configure notes directory, attachments, and file watching."], group: ["文件与目录", "Files and folders"], rows: [["笔记目录", "Notes directory", "Markdown 文件保存的位置", "Location of Markdown files", "select", "~/Documents/NoteGen", "~/Documents/NoteGen"], ["监听文件变化", "Watch file changes", "自动刷新由其他应用修改的内容", "Refresh content changed by other apps", "switch", "", ""], ["附件目录", "Attachments folder", "图片与音频文件的保存位置", "Location for image and audio files", "select", "attachments", "attachments"]] },
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

function NoteGenSettingControlReplica({ row, lang }: { row: NoteGenSettingRowData; lang: NoteGenReplicaLanguage }) {
  const value = lang === "en" ? row.enValue : row.cnValue
  const label = lang === "en" ? row.en : row.cn

  if (row.control === "switch") return <NoteGenSettingSwitch checked={row.checked !== false} label={label} />
  if (row.control === "select") return <NoteGenSettingSelect label={label} value={value || (lang === "en" ? "Automatic" : "自动")} />
  if (row.control === "slider") return <div className="flex w-44 items-center gap-3"><div className="relative h-1.5 flex-1 rounded-full bg-input"><span className="absolute inset-y-0 left-0 w-[58%] rounded-full bg-primary" /><span className="absolute left-[58%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background" /></div><span className="w-10 text-right text-sm text-muted-foreground">{value}</span></div>
  if (row.control === "shortcut") return <span className="min-w-28 rounded-lg border border-input bg-muted/20 px-3 py-1.5 text-center font-mono text-xs">{value}</span>
  if (row.control === "input") return <span className="flex h-8 min-w-52 items-center rounded-lg border border-input bg-transparent px-2.5 text-sm text-muted-foreground">{value}</span>
  if (row.control === "textarea") return <span className="block min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm leading-relaxed text-muted-foreground">{value}</span>
  if (row.control === "button") return <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-sm font-medium">{value || label}<ExternalLink className="size-3.5 text-muted-foreground" /></span>
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"><CheckCircle2 className="size-3.5" />{value}</span>
}

function NoteGenSettingsDataSection({ section, lang, icon: Icon }: { section: NoteGenSettingSectionData; lang: NoteGenReplicaLanguage; icon: NoteGenReplicaIcon }) {
  const title = lang === "en" ? section.en : section.cn
  const description = lang === "en" ? section.enDescription : section.cnDescription

  if (section.presentation === "notice") {
    return <section className="rounded-lg border border-warning/40 bg-warning/10 p-4"><div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 size-5 text-warning-foreground" /><div><h3 className="text-base font-semibold text-warning-foreground">{title}</h3>{description ? <p className="mt-1 text-sm text-warning-foreground/80">{description}</p> : null}<p className="mt-2 text-sm text-warning-foreground/80">{lang === "en" ? section.rows[0]?.enValue : section.rows[0]?.cnValue}</p></div></div></section>
  }

  return <NoteGenSettingsSection title={title} description={description}>
    {section.presentation === "tabs" ? <div className="flex h-9 w-fit items-center gap-1 rounded-lg bg-muted p-[3px] text-sm"><span className="rounded-md bg-background px-3 py-1 font-medium shadow-xs">{title}</span><span className="px-3 py-1 text-muted-foreground">{lang === "en" ? "Options" : "选项"}</span></div> : null}
    <div className={cn(section.presentation === "cards" ? "grid gap-3 sm:grid-cols-2" : "flex flex-col gap-3")}>
      {section.rows.map((row, index) => {
        const rowTitle = lang === "en" ? row.en : row.cn
        const rowDescription = lang === "en" ? row.enDescription : row.cnDescription
        if (section.presentation === "cards") {
          return <article key={`${row.cn}-${index}`} className="flex min-h-28 flex-col rounded-xl border bg-card p-4"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground"><Icon className="size-4" /></span><div className="min-w-0 flex-1"><h4 className="text-sm font-semibold">{rowTitle}</h4>{rowDescription ? <p className="mt-1 line-clamp-2 text-sm leading-normal text-muted-foreground">{rowDescription}</p> : null}</div></div><div className="mt-auto flex justify-end pt-3"><NoteGenSettingControlReplica row={row} lang={lang} /></div></article>
        }
        return <div key={`${row.cn}-${index}`} className="flex flex-col gap-2"><NoteGenSettingRow icon={index === 0 ? Icon : WandSparkles} title={rowTitle} description={rowDescription} action={row.control === "textarea" ? undefined : <NoteGenSettingControlReplica row={row} lang={lang} />} />{row.control === "textarea" ? <NoteGenSettingControlReplica row={row} lang={lang} /> : null}</div>
      })}
    </div>
  </NoteGenSettingsSection>
}

function NoteGenSettingsContentReplica({ lang, section }: { lang: NoteGenReplicaLanguage; section: NoteGenSettingSectionId }) {
  if (section === "general") return <GeneralSettingsReplica lang={lang} />

  const page = noteGenSettingsPages[section]
  const navigation = navigationItems.find((item) => item.id === section) ?? navigationItems[0]
  const PageIcon = navigation.icon
  if (section === "ai" || section === "sync" || section === "imageHosting") {
    const providerSection = page.sections[0]
    const selectedProvider = providerSection.rows[0]
    return <NoteGenSettingsPage icon={navigation.icon} title={page[lang]} description={lang === "en" ? page.enDescription : page.cnDescription}>
      <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <section className="rounded-xl border bg-card p-4 lg:sticky lg:top-2">
          <h3 className="text-base font-semibold">{lang === "en" ? providerSection.en : providerSection.cn}</h3>
          <div className="mt-4 flex max-h-[52vh] flex-col gap-1 overflow-hidden">
            {providerSection.rows.map((row, index) => <div key={row.cn} className={cn("flex min-h-10 items-center gap-2.5 rounded-lg border border-transparent px-3 py-2 text-sm", index === 0 && "border-primary bg-primary/5")}><span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted"><PageIcon className="size-3.5" /></span><span className="min-w-0 flex-1 truncate font-medium">{lang === "en" ? row.en : row.cn}</span>{index === 0 ? <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">{lang === "en" ? "Current" : "当前"}</span> : null}</div>)}
          </div>
        </section>
        <div className="flex min-w-0 flex-col gap-4">
          <section className="rounded-xl border bg-card p-5"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/30"><PageIcon className="size-5" /></span><div className="min-w-0 flex-1"><h3 className="text-base font-semibold">{lang === "en" ? selectedProvider.en : selectedProvider.cn}</h3><p className="mt-1 text-sm text-muted-foreground">{lang === "en" ? selectedProvider.enDescription || page.enDescription : selectedProvider.cnDescription || page.cnDescription}</p></div><NoteGenSettingControlReplica row={selectedProvider} lang={lang} /></div></section>
          {page.sections.slice(1).map((settingSection) => <NoteGenSettingsDataSection key={settingSection.cn} section={settingSection} lang={lang} icon={navigation.icon} />)}
        </div>
      </div>
    </NoteGenSettingsPage>
  }
  return <NoteGenSettingsPage icon={navigation.icon} title={page[lang]} description={lang === "en" ? page.enDescription : page.cnDescription}>
    {page.sections.map((settingSection) => <NoteGenSettingsDataSection key={settingSection.cn} section={settingSection} lang={lang} icon={navigation.icon} />)}
  </NoteGenSettingsPage>
}

export function NoteGenSettingsDetailReplica({
  lang = "cn",
  section = "general",
  className,
}: {
  lang?: NoteGenReplicaLanguage
  section?: NoteGenSettingSectionId
  className?: string
}) {
  return (
    <div
      data-notegen-replica="settings-detail"
      data-active-section={section}
      className={cn("h-full min-h-0 overflow-hidden rounded-xl border bg-background", className)}
    >
      <NoteGenSettingsContentReplica lang={lang} section={section} />
    </div>
  )
}

export function NoteGenSettingsDialogReplica({ lang = "cn", initialSection = "general", className }: { lang?: NoteGenReplicaLanguage; initialSection?: NoteGenSettingSectionId; className?: string }) {
  return <div className={cn("relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl border bg-muted/30 p-4 before:absolute before:inset-0 before:bg-background/45 before:backdrop-blur-[2px]", className)}><div className="relative z-10 h-[min(840px,calc(100%-16px))] min-h-[480px] w-[calc(100%-16px)] max-w-[1280px] overflow-hidden rounded-xl border bg-background shadow-2xl"><NoteGenSettingsReplica lang={lang} initialSection={initialSection} /><span aria-label={lang === "en" ? "Close settings" : "关闭设置"} className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"><X className="size-4" /></span></div></div>
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
    <div data-active-section={section} className={cn("relative h-full min-h-0 overflow-hidden", className)}>
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
        <NoteGenSettingsContentReplica lang={lang} section={section} />
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
