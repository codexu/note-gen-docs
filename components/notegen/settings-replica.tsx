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
  const descriptions: Partial<Record<NoteGenSettingSectionId, [string, string]>> = {
    ai: ["管理模型服务、API 地址和默认模型。", "Manage model providers, API endpoints, and default models."],
    sync: ["将记录、笔记、画布与偏好同步到你选择的位置。", "Sync records, notes, canvases, and preferences to a destination you choose."],
    record: ["配置记录输入、自动处理和工具栏。", "Configure capture inputs, automatic processing, and the toolbar."],
    editor: ["配置编辑器布局、默认模型与显示方式。", "Configure editor layout, default models, and display behavior."],
    canvas: ["配置画布交互、默认样式与 AI 能力。", "Configure canvas interaction, default styling, and AI features."],
  }
  const description = descriptions[section] ?? ["管理这一部分的功能与偏好。", "Manage features and preferences for this section."]

  return (
    <NoteGenSettingsPage icon={item.icon} title={item[lang]} description={description[lang === "en" ? 1 : 0]}>
      <NoteGenSettingsSection
        title={text("默认配置", "Default configuration")}
        description={text("这些设置会应用到新创建的内容。", "These settings apply to newly created content.")}
      >
        <NoteGenSettingRow
          icon={item.icon}
          title={text("启用功能", "Enable feature")}
          description={text("可以随时返回此处修改。", "You can return here to change this at any time.")}
          action={<NoteGenSettingSwitch checked label={text("启用功能", "Enable feature")} />}
        />
        <NoteGenSettingRow
          icon={Sparkles}
          title={text("默认选项", "Default option")}
          description={text("选择 NoteGen 在此处优先使用的配置。", "Choose the configuration NoteGen should prefer here.")}
          action={<NoteGenSettingSelect label={text("默认选项", "Default option")} value={text("自动", "Automatic")} />}
        />
      </NoteGenSettingsSection>
    </NoteGenSettingsPage>
  )
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
