"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  CalendarDays,
  Cloud,
  Code2,
  FilePlus,
  FolderPlus,
  Languages,
  Moon,
  Palette,
  PanelLeft,
  PanelRight,
  Search,
  Settings,
  Sparkles,
  Sun,
  SunMoon,
} from "lucide-react"

import {
  NoteGenDesktopReplica,
  NoteGenAgentPanel,
  NoteGenChatEmpty,
  NoteGenSkillsSettingsDialog,
  NoteGenMcpSettingsDialog,
  NoteGenMemoriesSettingsDialog,
  NoteGenKnowledgeSettingsDialog,
  NoteGenKnowledgeSources,
  NoteGenMcpRecordWorkspace,
  NoteGenSkillInstallApproval,
  NoteGenSkillCandidateChoice,
  NoteGenActivityHeatmap,
  NoteGenAppShell,
  NoteGenMainStatusBar,
  NoteGenUnifiedSyncIndicator,
  NoteGenCanvasWorkspace,
  NoteGenConfirmationDialog,
  NoteGenDialogBackdrop,
  NoteGenEditorWorkspace,
  NoteGenGlobalSearch,
  NoteGenImageViewer,
  NoteGenMobileReplica,
  NoteGenRecordingOverlay,
  NoteGenRecordWorkspace,
  NoteGenReplicaFrame,
  NoteGenReplicaIconButton,
  NoteGenReplicaMenuGroup,
  NoteGenReplicaPanel,
  NoteGenReplicaToolbar,
  NoteGenSettingRow,
  NoteGenSettingSegmentedControl,
  NoteGenSettingSelect,
  NoteGenSettingsPage,
  NoteGenSettingsDialogReplica,
  NoteGenSettingsSection,
  NoteGenSettingSwitch,
  NoteGenSyncStatus,
  NoteGenUpdatePrompt,
  NoteGenWindowTitleBar,
  NoteGenWorkspaceSwitcher,
  type NoteGenReplicaLanguage,
  type NoteGenSyncIndicatorState,
  type NoteGenWorkspace,
} from "@/components/notegen"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const titleBarModes = [
  ["record-tools", "记录工具", "Capture tools"],
  ["writing-tools", "写作工具", "Writing tools"],
  ["agent-tools", "Agent 工具", "Agent tools"],
  ["canvas-tools", "画布工具", "Canvas tools"],
] as const

const syncIndicatorStates: NoteGenSyncIndicatorState[] = ["local", "not-configured", "unavailable", "checking", "ready", "syncing", "failed", "synced"]

export function NoteGenComponentGallery({ lang }: { lang: NoteGenReplicaLanguage }) {
  const [workspace, setWorkspace] = useState<NoteGenWorkspace>("records")
  const [enabled, setEnabled] = useState(true)
  const [theme, setTheme] = useState("system")
  const text = (cn: string, en: string) => lang === "en" ? en : cn

  const navigation = [
    ["desktop", text("完整应用", "Desktop app")],
    ["chrome", text("窗口与工具栏", "Chrome and toolbars")],
    ["workspaces", text("核心工作区", "Core workspaces")],
    ["mobile", text("移动端", "Mobile")],
    ["overlays", text("弹窗与状态", "Overlays and states")],
    ["settings-primitives", text("设置组件", "Settings primitives")],
    ["settings", text("完整设置页", "Settings page")],
  ]

  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-4xl flex-col gap-5">
            <Badge variant="outline" className="w-fit">
              <Sparkles data-icon="inline-start" />
              NoteGen Replica Kit
            </Badge>
            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                {text("用组件，而不是截图，展示 NoteGen。", "Show NoteGen with components, not screenshots.")}
              </h1>
              <p className="max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {text(
                  "这套代码原生组件复刻 NoteGen 的窗口框架、菜单、工具栏、工作区和设置页面。每个层级都能独立使用，也能任意组合成文档插图和官网场景。",
                  "These code-native components reproduce NoteGen window chrome, menus, toolbars, workspaces, and settings. Use each layer independently or compose complete documentation and marketing scenes."
                )}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label={text("页面目录", "Page sections")}>
            {navigation.map(([href, label]) => (
              <Button key={href} variant="outline" size="sm" asChild>
                <a href={`#${href}`}>{label}</a>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <GallerySection
          id="desktop"
          eyebrow="01 · NoteGenDesktopReplica"
          title={text("完整桌面应用", "Complete desktop app")}
          description={text(
            "点击齿轮打开或关闭设置，切换左侧写作、记录和画布。标题栏支持面板显隐和置顶状态演示；底部左侧指示器展示同步状态。",
            "Open or close settings, switch between writing, records, and canvas, and try panel visibility and pinning in the title bar. The bottom-left indicator shows sync status."
          )}
        >
          <div className="mx-auto w-full max-w-6xl">
            <DesktopScaledPreview baseWidth={1152}>
              <NoteGenDesktopReplica lang={lang} autoCycle={false} />
            </DesktopScaledPreview>
          </div>
        </GallerySection>

        <GallerySection
          id="chrome"
          eyebrow="02 · App chrome"
          title={text("窗口、菜单与工具栏", "Window chrome, menus, and toolbars")}
          description={text(
            "应用外壳被拆成更小的结构组件，可以只展示标题栏、工具条或某一个工作区入口。",
            "The app shell is split into smaller structural components, so a scene can show only a title bar, toolbar, or workspace switcher."
          )}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <ComponentCard desktopWidth={560} title="NoteGenWindowTitleBar" description={text("完整窗口标题栏", "Full window title bar")}>
              <div className="overflow-hidden rounded-lg border bg-background">
                <NoteGenWindowTitleBar lang={lang} />
                <div className="flex h-24 items-center justify-center text-xs text-muted-foreground">
                  {text("内容区域", "Content area")}
                </div>
              </div>
            </ComponentCard>

            <ComponentCard desktopWidth={560} title="NoteGenWorkspaceSwitcher" description={text("可交互的工作区入口", "Interactive workspace navigation")}>
              <div className="flex min-h-32 items-center justify-center rounded-lg border bg-background">
                <NoteGenWorkspaceSwitcher lang={lang} value={workspace} onValueChange={setWorkspace} />
              </div>
            </ComponentCard>

            {(["windows", "linux"] as const).map((platform) => (
              <ComponentCard key={platform} desktopWidth={760} title={`NoteGenWindowTitleBar · ${platform}`} description={text("系统窗口控制在右侧", "Window controls on the right")}>
                <div className="overflow-hidden rounded-lg border bg-background">
                  <NoteGenWindowTitleBar lang={lang} platform={platform} />
                  <div className="h-12" />
                </div>
              </ComponentCard>
            ))}

            <ComponentCard desktopWidth={900} title="NoteGenMainStatusBar" description={text("统一同步、工作区、编辑器、插件槽位和模型入口", "Unified sync, workspace, editor, plugin slot, and model display")}>
              <div className="overflow-hidden rounded-lg border bg-background">
                <div className="h-16" />
                <NoteGenMainStatusBar lang={lang} syncState="synced" recentSyncActivity={text("最近同步成功：Markdown 文件 · 2026/10/1 09:40", "Last successful sync: Markdown files · 2026/10/1 09:40")} pluginSlot={<span className="px-1.5">{text("示例插件", "Example plugin")}</span>} />
              </div>
            </ComponentCard>

            <ComponentCard title="NoteGenUnifiedSyncIndicator" description={text("固定状态样例；悬停查看说明，键盘可聚焦并读取状态", "Fixed state examples; hover for descriptions or focus to read each status")}>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
                {syncIndicatorStates.map((state) => (
                  <div key={state} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <NoteGenUnifiedSyncIndicator lang={lang} state={state} />
                    <span>{state}</span>
                  </div>
                ))}
              </div>
            </ComponentCard>

            {titleBarModes.map(([mode, cnLabel, enLabel]) => (
              <ComponentCard desktopWidth={560} key={mode} title={`NoteGenWindowTitleBar · ${mode}`} description={lang === "en" ? enLabel : cnLabel}>
                <div className="overflow-hidden rounded-lg border bg-background">
                  <NoteGenWindowTitleBar lang={lang} mode={mode} />
                  <div className="h-12" />
                </div>
              </ComponentCard>
            ))}

            <ComponentCard desktopWidth={560} title="NoteGenReplicaToolbar" description={text("任意组合的工具按钮", "Freely composable tool buttons")}>
              <div className="overflow-hidden rounded-lg border bg-background">
                <NoteGenReplicaToolbar label={text("示例工具栏", "Example toolbar")}>
                  <NoteGenReplicaIconButton icon={FilePlus} label={text("新建文件", "New file")} />
                  <NoteGenReplicaIconButton icon={FolderPlus} label={text("新建文件夹", "New folder")} />
                  <NoteGenReplicaIconButton icon={Search} label={text("搜索", "Search")} active />
                  <Separator orientation="vertical" className="mx-1 h-4" />
                  <NoteGenReplicaIconButton icon={PanelLeft} label={text("左侧栏", "Left sidebar")} />
                  <NoteGenReplicaIconButton icon={PanelRight} label={text("右侧栏", "Right sidebar")} />
                  <NoteGenReplicaIconButton icon={Cloud} label={text("同步", "Sync")} />
                </NoteGenReplicaToolbar>
                <div className="h-16" />
              </div>
            </ComponentCard>

            <ComponentCard desktopWidth={560} title="Frame · Panel · MenuGroup" description={text("用于自定义文档场景的结构原语", "Structural primitives for custom documentation scenes")}>
              <NoteGenReplicaFrame fill className="h-28 shadow-none">
                <div className="grid h-full grid-cols-[38%_1fr]">
                  <NoteGenReplicaPanel className="border-r bg-sidebar p-2">
                    <NoteGenReplicaMenuGroup label={text("示例菜单", "EXAMPLE MENU")}>
                      <div className="flex h-7 items-center gap-2 rounded-md bg-sidebar-accent px-2 text-[10px] font-medium">
                        <CalendarDays className="size-3.5" />
                        {text("今日记录", "Today")}
                      </div>
                    </NoteGenReplicaMenuGroup>
                  </NoteGenReplicaPanel>
                  <NoteGenReplicaPanel className="items-center justify-center text-muted-foreground">
                    {text("自定义内容", "Custom content")}
                  </NoteGenReplicaPanel>
                </div>
              </NoteGenReplicaFrame>
            </ComponentCard>
          </div>
        </GallerySection>

        <GallerySection
          id="workspaces"
          eyebrow="03 · Workspace replicas"
          title={text("记录、写作、Agent 与画布", "Capture, writing, Agent, and canvas")}
          description={text("每个工作区都由更小的列表、工具栏、内容区和状态组件组合而成。", "Each workspace is composed from smaller lists, toolbars, content areas, and state components.")}
        >
          <div className="grid gap-6">
            <ComponentCard desktopWidth={1152} title="NoteGenRecordWorkspace · NoteGenTagManagementReplica" description={text("上方层级标签树，下方所选标签与子级的记录；可拖动分隔条、右键管理标签", "Hierarchical tags above matching records; drag the divider or right-click a tag to manage it")}><div className="h-[520px] overflow-hidden rounded-lg border"><NoteGenRecordWorkspace lang={lang} /></div></ComponentCard>
            <ComponentCard desktopWidth={1152} title="NoteGenEditorWorkspace" description={text("文件树、标签页与 Markdown 编辑器", "File tree, tabs, and Markdown editor")}><div className="h-[520px] overflow-hidden rounded-lg border"><NoteGenEditorWorkspace lang={lang} /></div></ComponentCard>
            <div className="grid gap-6 xl:grid-cols-2">
              <ComponentCard desktopWidth={552} title="NoteGenAgentPanel" description={text("消息、思考过程、工具调用与上下文", "Messages, reasoning, tool calls, and context")}><div className="h-[560px] overflow-hidden rounded-lg border"><NoteGenAgentPanel lang={lang} /></div></ComponentCard>
              <ComponentCard desktopWidth={440} title="NoteGenChatEmpty" description={text("空白对话：淡网格、快速开始与可选最近对话", "Empty conversation with a subtle grid, quick prompts and optional recent conversations")}><div style={{ height: 560 }}><NoteGenChatEmpty lang={lang} recentConversations={[{ title: lang === "en" ? "Help me write a note" : "帮我写一篇笔记", time: lang === "en" ? "1 hour ago" : "1 小时前" }]} /></div></ComponentCard>
              <ComponentCard desktopWidth={1360} title="NoteGenKnowledgeSettingsDialog" description={text("知识库检索模型、索引状态和来源设置（固定模拟数据）", "Retrieval models, index status and source controls with fixed demo data")}><div className="ng-skill-workspace" style={{ position: "relative", width: 1360, height: 720 }}><NoteGenKnowledgeSettingsDialog lang={lang} /></div></ComponentCard>
              <ComponentCard desktopWidth={552} title="NoteGenKnowledgeSources" description={text("文章与记录参考来源、原文展开与入口", "Referenced articles and records with original content")}><div className="ng-skill-workspace" style={{ width: "100%", height: "auto", padding: 16 }}><NoteGenKnowledgeSources lang={lang} expanded sources={[{ type: "article", title: text("发布会议.md", "Release meeting.md"), content: text("原定 10 月 12 日发布。", "Originally scheduled for October 12."), expanded: true }, { type: "record", title: text("发布调整", "Release adjustment"), content: text("调整至 10 月 15 日。", "Moved to October 15.") }]} /></div></ComponentCard>
              <ComponentCard desktopWidth={1360} title="NoteGenSkillsSettingsDialog" description={text("设置-技能：工作区与全局技能、安装入口和启用状态", "Settings–Skills: workspace/global lists, installation entries and enable state")}><div className="ng-skill-workspace" style={{ position: "relative", width: 1360, height: 720 }}><NoteGenSkillsSettingsDialog lang={lang} skills={[{ name: "meeting-notes", description: lang === "en" ? "Summarize meeting notes, decisions and action items." : "将会议记录整理成讨论要点、决定与待办事项。", enabled: true }]} /></div></ComponentCard>
              <ComponentCard desktopWidth={1360} title="NoteGenMcpRecordWorkspace" description={text("MCP 记录结果：固定示例数据，完整 PC 工作台", "MCP record result: fixed demo data, full desktop workspace")}><NoteGenMcpRecordWorkspace lang={lang} title={text("项目调研结论", "Project findings")} content={text("先完成模板，再检查文案，最后确定上线日期。", "Finish the template, review the copy, then confirm the launch date.")} tag={text("项目调研", "Research")} time="2026-10-02 14:00" /></ComponentCard>
              <ComponentCard desktopWidth={1360} title="NoteGenMemoriesSettingsDialog" description={text("记忆管理：自动生成、状态筛选、记忆表单和操作菜单（固定模拟数据）", "Memory management: generation, status filters, forms and actions with fixed demo data")}><div className="ng-skill-workspace" style={{ position: "relative", width: 1360, height: 720 }}><NoteGenMemoriesSettingsDialog lang={lang} memories={[{ id: "writing", content: lang === "en" ? "Give the conclusion first, then list the steps." : "回答先给结论，再列出操作步骤。", kind: "preference", scope: "global", status: "active", always: true }]} /></div></ComponentCard>
              <ComponentCard desktopWidth={1360} title="NoteGenMcpSettingsDialog" description={text("MCP：访问 NoteGen、本机服务和连接配置（展示状态）", "MCP: local access and connection config (display only)")}><div className="ng-skill-workspace" style={{ position: "relative", width: 1360, height: 720 }}><NoteGenMcpSettingsDialog lang={lang} state="running" /></div></ComponentCard>
              <ComponentCard desktopWidth={552} title="NoteGenSkillCandidateChoice" description={text("Agent 单选提问：多个技能候选与选中状态", "Agent single-choice panel with multiple Skill candidates")}><div className="ng-skill-workspace" style={{ width: "100%", height: "auto" }}><NoteGenSkillCandidateChoice lang={lang} selected="meeting-notes" candidates={[{ name: "meeting-notes", description: text("整理会议要点、决定和待办事项。", "Organize meeting topics, decisions and action items."), source: "Azure-Samples / agent-skills-dotnet-demo" }, { name: "summarize-meeting", description: text("将会议转录整理为结构化摘要。", "Produce a structured summary from a transcript."), source: "tomzx / agents" }, { name: "doc-coauthoring", description: text("协作编写文档与决策记录。", "Collaborate on documents and decision records."), source: "anthropics / skills" }]} /></div></ComponentCard>
              <ComponentCard desktopWidth={552} title="NoteGenSkillInstallApproval" description={text("第三方 Skill 安装来源、固定版本、范围与确认；展示状态不执行安装", "Source, revision, scope, and confirmation; display only")}><div className="ng-skill-workspace" style={{ width: "100%", height: "auto" }}><NoteGenSkillInstallApproval lang={lang} value={{ kind: "remote", name: "example-skill", source: "https://example.com/skill.zip", revision: "example-revision", scope: "global" }} /></div></ComponentCard>
              <ComponentCard desktopWidth={552} title="NoteGenCanvasWorkspace" description={text("画布项目、节点、连线和画布工具", "Canvas projects, nodes, edges, and canvas tools")}><div className="h-[560px] overflow-hidden rounded-lg border"><NoteGenCanvasWorkspace lang={lang} /></div></ComponentCard>
            </div>
            <ComponentCard desktopWidth={1152} title="NoteGenAppShell" description={text("当前桌面外壳：平台窗口控制、记录工具与全局统一状态栏", "Current desktop shell with platform controls, capture tools, and one unified status bar")}><NoteGenAppShell lang={lang}><div className="grid h-full grid-cols-[28%_42%_30%]"><div className="border-r"><NoteGenRecordWorkspace lang={lang} /></div><div className="border-r"><NoteGenEditorWorkspace lang={lang} /></div><NoteGenAgentPanel lang={lang} /></div></NoteGenAppShell></ComponentCard>
          </div>
        </GallerySection>

        <GallerySection
          id="mobile"
          eyebrow="04 · Mobile replicas"
          title={text("移动端核心页面", "Core mobile screens")}
          description={text("移动端使用独立的手机框架、状态栏、页面标题和底部导航，可按 screen 属性直接切换展示。", "Mobile uses a dedicated device frame, status bar, headers, and dock. Select a screen through a single prop.")}
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {(["capture", "chat", "writing", "canvas", "me", "settings", "settings-general"] as const).map((screen) => <ComponentCard key={screen} title={`Mobile · ${screen}`} description={text("代码实时渲染", "Rendered live from code")}><NoteGenMobileReplica lang={lang} screen={screen} /></ComponentCard>)}
          </div>
        </GallerySection>

        <GallerySection
          id="overlays"
          eyebrow="05 · Dialogs and states"
          title={text("全局弹窗、录音与同步状态", "Global dialogs, recording, and sync states")}
          description={text("用于文档说明搜索、录音、同步、冲突、图片预览和关闭确认等瞬时界面。", "Transient UI for documenting search, recording, sync, conflicts, image viewing, and close confirmation.")}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ComponentCard desktopWidth={552} title="NoteGenGlobalSearch" description={text("全局搜索面板", "Global search palette")}><NoteGenDialogBackdrop><NoteGenGlobalSearch lang={lang} /></NoteGenDialogBackdrop></ComponentCard>
            <ComponentCard desktopWidth={552} title="NoteGenRecordingOverlay" description={text("录音对话框", "Recording dialog")}><NoteGenDialogBackdrop><NoteGenRecordingOverlay lang={lang} /></NoteGenDialogBackdrop></ComponentCard>
            <ComponentCard desktopWidth={552} title="NoteGenSyncStatus" description={text("同步完成与冲突状态", "Sync and conflict states")}><div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border bg-muted/25 p-4"><NoteGenSyncStatus lang={lang} /><NoteGenSyncStatus lang={lang} state="conflict" /></div></ComponentCard>
            <ComponentCard desktopWidth={552} title="ImageViewer · Confirmation" description={text("图片预览与关闭确认", "Image viewer and close confirmation")}><NoteGenDialogBackdrop className="min-h-72"><NoteGenImageViewer lang={lang} /><div className="absolute bottom-4 right-4 z-20 w-64"><NoteGenConfirmationDialog lang={lang} /></div></NoteGenDialogBackdrop></ComponentCard>
            <ComponentCard desktopWidth={552} title="Update · Activity" description={text("更新提示与写作活动", "Update prompt and writing activity")}><div className="grid min-h-72 grid-cols-2 gap-3 rounded-xl border bg-muted/25 p-4"><NoteGenUpdatePrompt lang={lang} /><NoteGenActivityHeatmap lang={lang} /></div></ComponentCard>
          </div>
        </GallerySection>

        <GallerySection
          id="settings-primitives"
          eyebrow="06 · Settings primitives"
          title={text("从一个控件到完整设置分组", "From one control to a complete settings section")}
          description={text(
            "设置页的页面标题、分组、设置项和操作控件都可以单独导入，用真实组件还原任意设置文档。",
            "Page headers, sections, setting rows, and controls are all independently importable for accurate settings documentation."
          )}
        >
          <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
            <ComponentCard desktopWidth={448} title={text("独立控件", "Individual controls")} description="Switch · Select · SegmentedControl">
              <div className="flex min-h-56 flex-col items-start justify-center gap-6 rounded-lg border bg-background p-6">
                <div className="flex w-full items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">NoteGenSettingSwitch</span>
                  <NoteGenSettingSwitch checked={enabled} onCheckedChange={setEnabled} label={text("启用", "Enabled")} />
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">NoteGenSettingSelect</span>
                  <NoteGenSettingSelect label={text("语言", "Language")} value={lang === "en" ? "English" : "中文"} />
                </div>
                <Separator />
                <div className="flex w-full flex-col gap-3">
                  <span className="text-sm text-muted-foreground">NoteGenSettingSegmentedControl</span>
                  <NoteGenSettingSegmentedControl
                    label={text("主题", "Theme")}
                    value={theme}
                    onValueChange={setTheme}
                    options={[
                      { value: "light", label: text("亮色", "Light"), icon: Sun },
                      { value: "dark", label: text("暗色", "Dark"), icon: Moon },
                      { value: "system", label: text("系统", "System"), icon: SunMoon },
                    ]}
                  />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard desktopWidth={680} title="SettingsPage · SettingsSection · SettingRow" description={text("可嵌入文档的完整设置片段", "A complete settings fragment for documentation")}>
              <div className="h-[420px] overflow-hidden rounded-lg border bg-background text-[11px]">
                <NoteGenSettingsPage
                  icon={Settings}
                  title={text("常规设置", "General")}
                  description={text("配置应用的基本设置，包括界面主题、语言等选项。", "Configure app behavior, appearance, language, and display preferences.")}
                >
                  <NoteGenSettingsSection title={text("外观与语言", "Appearance and language")} description={text("调整主题、语言和全局字体", "Adjust theme, language, and app font")}>
                    <NoteGenSettingRow
                      icon={Palette}
                      title={text("主题", "Theme")}
                      description={text("选择应用的外观主题", "Choose the app appearance")}
                      action={<NoteGenSettingSegmentedControl label={text("主题", "Theme")} value={theme} onValueChange={setTheme} options={[{ value: "light", label: text("亮色", "Light"), icon: Sun }, { value: "dark", label: text("暗色", "Dark"), icon: Moon }, { value: "system", label: text("系统", "System"), icon: SunMoon }]} />}
                    />
                    <NoteGenSettingRow
                      icon={Languages}
                      title={text("语言", "Language")}
                      description={text("选择应用的显示语言", "Choose the display language")}
                      action={<NoteGenSettingSelect label={text("语言", "Language")} value={lang === "en" ? "English" : "中文"} />}
                    />
                    <NoteGenSettingRow
                      icon={Code2}
                      title={text("开发者模式", "Developer mode")}
                      description={text("显示开发工具和诊断信息", "Show developer tools and diagnostics")}
                      action={<NoteGenSettingSwitch checked={enabled} onCheckedChange={setEnabled} label={text("开发者模式", "Developer mode")} />}
                    />
                  </NoteGenSettingsSection>
                </NoteGenSettingsPage>
              </div>
            </ComponentCard>
          </div>
        </GallerySection>

        <GallerySection
          id="settings"
          eyebrow="07 · NoteGenSettingsReplica"
          title={text("完整设置页", "Complete settings page")}
          description={text(
            "搜索左侧设置项，切换导航，并操作常规设置中的主题与开关。这个完整场景也可以直接放进文档页面。",
            "Search the sidebar, switch sections, and interact with theme and behavior controls. This complete scene can also be embedded directly in documentation."
          )}
        >
          <DesktopScaledPreview baseWidth={1600}>
            <NoteGenSettingsDialogReplica lang={lang} className="h-[900px]" />
          </DesktopScaledPreview>
        </GallerySection>
      </div>

      <footer className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-medium text-foreground">@/components/notegen</p>
          <p>{text("所有示例均由组件实时渲染，没有使用 NoteGen 截图。", "Every example is rendered live from components with no NoteGen screenshots.")}</p>
        </div>
      </footer>
    </main>
  )
}

function GallerySection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-8 flex max-w-3xl flex-col gap-3">
        <p className="font-mono text-xs text-muted-foreground">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="text-pretty leading-7 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function ComponentCard({
  title,
  description,
  children,
  desktopWidth,
}: {
  title: string
  description: string
  children: ReactNode
  desktopWidth?: number
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-mono text-sm">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {desktopWidth ? <DesktopScaledPreview baseWidth={desktopWidth}>{children}</DesktopScaledPreview> : children}
      </CardContent>
    </Card>
  )
}

function DesktopScaledPreview({
  baseWidth,
  children,
}: {
  baseWidth: number
  children: ReactNode
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ scale: 1, height: 0, left: 0 })

  useEffect(() => {
    const viewport = viewportRef.current
    const canvas = canvasRef.current
    if (!viewport || !canvas) return

    const updateLayout = () => {
      const scale = Math.min(1, viewport.clientWidth / baseWidth)
      const scaledWidth = baseWidth * scale
      setLayout({
        scale,
        height: canvas.offsetHeight * scale,
        left: Math.max(0, (viewport.clientWidth - scaledWidth) / 2),
      })
    }

    updateLayout()
    const observer = new ResizeObserver(updateLayout)
    observer.observe(viewport)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [baseWidth])

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden"
      style={layout.height ? { height: layout.height } : undefined}
      data-notegen-desktop-preview
    >
      <div
        ref={canvasRef}
        className="absolute top-0 origin-top-left"
        style={{ width: baseWidth, left: layout.left, transform: `scale(${layout.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
