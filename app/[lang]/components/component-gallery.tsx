"use client"

import { useState, type ReactNode } from "react"
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
  NoteGenReplicaFrame,
  NoteGenReplicaIconButton,
  NoteGenReplicaMenuGroup,
  NoteGenReplicaPanel,
  NoteGenReplicaToolbar,
  NoteGenSettingRow,
  NoteGenSettingSegmentedControl,
  NoteGenSettingSelect,
  NoteGenSettingsPage,
  NoteGenSettingsReplica,
  NoteGenSettingsSection,
  NoteGenSettingSwitch,
  NoteGenWindowTitleBar,
  NoteGenWorkspaceSwitcher,
  type NoteGenReplicaLanguage,
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

export function NoteGenComponentGallery({ lang }: { lang: NoteGenReplicaLanguage }) {
  const [workspace, setWorkspace] = useState<NoteGenWorkspace>("records")
  const [enabled, setEnabled] = useState(true)
  const [theme, setTheme] = useState("system")
  const text = (cn: string, en: string) => lang === "en" ? en : cn

  const navigation = [
    ["desktop", text("完整应用", "Desktop app")],
    ["chrome", text("窗口与工具栏", "Chrome and toolbars")],
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
            "点击右上角齿轮可以进入设置页，再点击返回按钮回到工作区。左侧写作、记录和画布也可以切换。",
            "Use the settings button in the top-right to open preferences and return to the workspace. Writing, records, and canvas are interactive too."
          )}
        >
          <div className="mx-auto w-full max-w-6xl">
            <NoteGenDesktopReplica lang={lang} autoCycle={false} />
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
            <ComponentCard title="NoteGenWindowTitleBar" description={text("完整窗口标题栏", "Full window title bar")}>
              <div className="overflow-hidden rounded-lg border bg-background">
                <NoteGenWindowTitleBar lang={lang} />
                <div className="flex h-24 items-center justify-center text-xs text-muted-foreground">
                  {text("内容区域", "Content area")}
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="NoteGenWorkspaceSwitcher" description={text("可交互的工作区入口", "Interactive workspace navigation")}>
              <div className="flex min-h-32 items-center justify-center rounded-lg border bg-background">
                <NoteGenWorkspaceSwitcher lang={lang} value={workspace} onValueChange={setWorkspace} />
              </div>
            </ComponentCard>

            {titleBarModes.map(([mode, cnLabel, enLabel]) => (
              <ComponentCard key={mode} title={`NoteGenWindowTitleBar · ${mode}`} description={lang === "en" ? enLabel : cnLabel}>
                <div className="overflow-hidden rounded-lg border bg-background">
                  <NoteGenWindowTitleBar lang={lang} mode={mode} />
                  <div className="h-12" />
                </div>
              </ComponentCard>
            ))}

            <ComponentCard title="NoteGenReplicaToolbar" description={text("任意组合的工具按钮", "Freely composable tool buttons")}>
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

            <ComponentCard title="Frame · Panel · MenuGroup" description={text("用于自定义文档场景的结构原语", "Structural primitives for custom documentation scenes")}>
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
          id="settings-primitives"
          eyebrow="03 · Settings primitives"
          title={text("从一个控件到完整设置分组", "From one control to a complete settings section")}
          description={text(
            "设置页的页面标题、分组、设置项和操作控件都可以单独导入，用真实组件还原任意设置文档。",
            "Page headers, sections, setting rows, and controls are all independently importable for accurate settings documentation."
          )}
        >
          <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
            <ComponentCard title={text("独立控件", "Individual controls")} description="Switch · Select · SegmentedControl">
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

            <ComponentCard title="SettingsPage · SettingsSection · SettingRow" description={text("可嵌入文档的完整设置片段", "A complete settings fragment for documentation")}>
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
          eyebrow="04 · NoteGenSettingsReplica"
          title={text("完整设置页", "Complete settings page")}
          description={text(
            "搜索左侧设置项，切换导航，并操作常规设置中的主题与开关。这个完整场景也可以直接放进文档页面。",
            "Search the sidebar, switch sections, and interact with theme and behavior controls. This complete scene can also be embedded directly in documentation."
          )}
        >
          <div className="h-[720px] overflow-hidden rounded-2xl border bg-background shadow-xl">
            <NoteGenSettingsReplica lang={lang} />
          </div>
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
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-mono text-sm">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
