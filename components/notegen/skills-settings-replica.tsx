"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Download, ExternalLink, FileArchive, FolderInput, FolderOpen, RefreshCw, Settings2, Sparkles, Trash, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./model-settings/ui/tabs"
import { Badge } from "./model-settings/ui/badge"
import { Button } from "./model-settings/ui/button"
import { Skeleton } from "./model-settings/ui/skeleton"
import { Switch } from "./model-settings/ui/switch"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./model-settings/ui/item"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./model-settings/ui/empty"
import { Alert, AlertDescription, AlertTitle } from "./model-settings/ui/alert"
import { NoteGenReplicaActionMenu } from "./replica-action-menu"
import { NoteGenReplicaDialog } from "./replica-dialog"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { NoteGenSkillEnvironmentDialog } from "./skill-environment-replica"
import { NoteGenSkillInstallDialog } from "./skill-install-replica"
import { NoteGenResponseFeedbackNotice } from "./chat-artifact-replica"
import type { NoteGenResponseFeedback } from "./chat-response-types"
import { NoteGenLegacySkillsSettings } from "./skills-settings-legacy"
import { noteGenRecommendedSkillsFixture } from "./skills-settings-data"
import { skillsSettingsCss, skillsSettingsUiCss } from "./skills-settings-style"
import type { NoteGenInstalledSkill, NoteGenSkillScope, NoteGenSkillsSettingsProps, NoteGenSkillsTab, NoteGenSkillsAction } from "./skills-settings-types"

export { skillsSettingsCss } from "./skills-settings-style"
export type { NoteGenInstalledSkill, NoteGenSkillsSettingsProps } from "./skills-settings-types"

const skillId = (skill: NoteGenInstalledSkill) => skill.id ?? skill.name

/** Presentation-only settings, with explicit fixtures instead of filesystem/runtime inspection. */
export function NoteGenSkillsSettings(props: NoteGenSkillsSettingsProps) {
  if (props.layout === "legacy") return <NoteGenLegacySkillsSettings lang={props.lang} projectSkills={props.projectSkills} globalSkills={props.globalSkills} />
  return <SkillsSettingsContent {...props} />
}

function SkillsSettingsContent({ lang = "cn", globalSkills = [], projectSkills = [], tab, defaultTab = "global", onTabChange, showFileActions = true, platform = "desktop", recommendations = noteGenRecommendedSkillsFixture(lang), discoveryState = "ready", discoveryError, discoveryCount, onRefresh, installSkillId, installState, installError, installScope, onInstall, onRetryInstall, environmentSkillId, environment, onEnvironmentAction, onDownloadRuntime, onSkillsChange, onAction, loadingRotation }: NoteGenSkillsSettingsProps) {
  const en = lang === "en"
  const [localTab, setLocalTab] = useState(defaultTab)
  const [edits, setEdits] = useState<Record<string, boolean>>({})
  const [deleted, setDeleted] = useState<string[]>([])
  const [added, setAdded] = useState<{ scope: NoteGenSkillScope; skill: NoteGenInstalledSkill }[]>([])
  const [installId, setInstallId] = useState(installSkillId)
  const [environmentKey, setEnvironmentKey] = useState(environmentSkillId)
  const [deleting, setDeleting] = useState<{ skill: NoteGenInstalledSkill; scope: NoteGenSkillScope }>()
  const [importing, setImporting] = useState<NoteGenSkillScope>()
  const [feedback, setFeedback] = useState<NoteGenResponseFeedback>()
  const key = (scope: NoteGenSkillScope, skill: NoteGenInstalledSkill) => `${scope}:${skillId(skill)}`
  const group = (scope: NoteGenSkillScope): NoteGenInstalledSkill[] => {
    const all = [...(scope === "global" ? globalSkills : projectSkills), ...added.filter(item => item.scope === scope).map(item => item.skill)]
    return all.filter((skill, index) => !deleted.includes(key(scope, skill)) && all.findIndex(item => skillId(item) === skillId(skill)) === index).map(skill => ({ ...skill, enabled: edits[key(scope, skill)] ?? skill.enabled }))
  }
  const groups: { global: NoteGenInstalledSkill[]; project: NoteGenInstalledSkill[] } = { global: group("global"), project: group("project") }
  const changed = (next: typeof groups) => onSkillsChange?.(next)
  const selected = recommendations.find(skill => skill.id === installId)
  const environmentTarget = (["global", "project"] as const).flatMap(scope => groups[scope].map(skill => ({ skill, scope }))).find(item => key(item.scope, item.skill) === environmentKey || skillId(item.skill) === environmentKey)
  const selectedTab = tab ?? localTab
  const fail = (title: string, reason: unknown) => setFeedback({ kind: "error", title, description: reason instanceof Error ? reason.message : String(reason) })
  const performAction = async (action: NoteGenSkillsAction) => {
    if (!onAction) return
    if (action.type === "import-folder" || action.type === "import-zip") setImporting(action.scope)
    try { await onAction(action) }
    catch (reason) { fail(action.type === "source" ? (en ? "View source" : "查看来源") : action.type === "directory" ? (en ? "Failed to open Skills folder" : "打开 Skills 目录失败") : (en ? "Import failed" : "导入失败"), reason) }
    finally { setImporting(undefined) }
  }
  const renderInstalled = (scope: NoteGenSkillScope) => <section className="flex min-w-0 flex-col gap-3" data-skills-scope={scope}>
    <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex min-w-0 flex-1 flex-col gap-1"><h3 className="text-base font-semibold">{scope === "global" ? (en ? "Installed Global Skills" : "已安装的全局技能") : (en ? "Workspace Skills" : "工作区技能")} ({groups[scope].length})</h3><p className="text-sm text-muted-foreground">{scope === "global" ? (en ? "Installed in NoteGen's global Skills folder and available in every workspace." : "安装到 NoteGen 的全局 Skills 目录，可供所有工作区使用。") : (en ? "Installed in the current workspace's skills folder and available only in this workspace." : "安装到当前工作区的 skills 目录，仅供当前工作区使用。")}</p></div><div className="flex flex-wrap justify-end gap-2">
      {showFileActions && <Button variant="outline" size="sm" onClick={() => void performAction({ type: "directory", scope })}><FolderOpen />{en ? "Open Folder" : "打开目录"}</Button>}
      <NoteGenReplicaActionMenu title={en ? "Install Skill" : "安装技能"} disabled={importing === scope} mobile={platform === "mobile"} trigger={<span className="flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-sm"><>{importing === scope ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Upload className="size-4" />}</>{importing === scope ? (en ? "Importing..." : "导入中...") : (en ? "Install Skill" : "安装技能")}<ChevronDown className="size-4" /></span>} items={[...(showFileActions ? [{ id: "directory", label: en ? "Install from Folder" : "从文件夹安装", icon: <FolderInput />, onSelect: () => void performAction({ type: "import-folder", scope }) }] : []), { id: "zip", label: en ? "Install from ZIP" : "从 ZIP 安装", icon: <FileArchive />, onSelect: () => void performAction({ type: "import-zip", scope }) }]} />
    </div></div>
    {groups[scope].length ? <ItemGroup className="gap-2">{groups[scope].map(skill => <Item key={skillId(skill)} variant="outline" className="ng-installed-skill" data-installed-skill={skillId(skill)}>
      <div className="ng-installed-skill-summary flex min-w-0 flex-1 gap-2.5"><ItemMedia variant="icon" className="text-muted-foreground"><Sparkles /></ItemMedia><ItemContent className="w-0"><ItemTitle className="min-w-0 w-full">{skill.name}</ItemTitle>{skill.description && <ItemDescription>{skill.description}</ItemDescription>}{skill.scripts?.includes("python") && platform !== "mobile" && <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>{en ? "Python runtime" : "Python 运行环境"}:</span>{!skill.pythonStatus ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Badge variant={skill.pythonStatus.available ? "secondary" : "destructive"}>{skill.pythonStatus.available ? `Python ${skill.pythonStatus.version ?? ""} · ${skill.pythonStatus.managed ? (en ? "isolated" : "隔离环境") : (en ? "system" : "系统环境")}` : (en ? "unavailable" : "不可用")}</Badge>}</div>}</ItemContent></div>
      <ItemActions className="ng-installed-skill-controls">{Boolean(skill.scripts?.length) && <Button variant="ghost" size="icon-sm" title={en ? "Runtime environment" : "运行环境"} aria-label={`${en ? "Runtime environment" : "运行环境"}: ${skill.name}`} onClick={() => setEnvironmentKey(key(scope, skill))}><Settings2 /></Button>}<Switch checked={skill.enabled !== false} aria-label={`${en ? "Enable Skills" : "启用技能功能"}: ${skill.name}`} onCheckedChange={value => { setEdits({ ...edits, [key(scope, skill)]: value }); changed({ ...groups, [scope]: groups[scope].map(item => skillId(item) === skillId(skill) ? { ...item, enabled: value } : item) }) }} /><Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" aria-label={`${en ? "Delete Skill" : "删除技能"}: ${skill.name}`} onClick={() => setDeleting({ skill, scope })}><Trash /></Button></ItemActions>
    </Item>)}</ItemGroup> : <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><Sparkles /></EmptyMedia><EmptyTitle>{scope === "global" ? (en ? "No global Skills yet" : "还没有全局技能") : (en ? "No Skills in workspace" : "工作区中没有技能")}</EmptyTitle><EmptyDescription>{scope === "global" ? (en ? "Create or import Skills to use across all projects" : "创建或导入技能以在所有项目中使用") : (en ? "Create SKILL.md files in the skills folder to add Skills" : "在 skills 文件夹中创建 SKILL.md 文件来添加技能")}</EmptyDescription></EmptyHeader></Empty>}
  </section>
  return <div data-notegen-settings-boundary data-skills-platform={platform} className={cn("ng-skills-ui ng-settings-scroll relative h-full min-w-0 overflow-auto bg-background py-8 text-foreground", platform === "mobile" ? "px-4" : "px-6 md:px-16")}>
    <style>{skillsSettingsCss + skillsSettingsUiCss}</style>
    <header className="mb-9 flex flex-col gap-1.5"><h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="size-6 text-muted-foreground" />{en ? "Skills" : "技能"}</h2><p className="text-sm text-muted-foreground">{en ? "Skills are reusable AI capability packages that allow AI assistants to automatically apply specific behavioral patterns based on tasks." : "技能是可重用的 AI 能力包，让 AI 助手能够根据任务自动应用特定的行为模式。"}</p></header>
    <Tabs className="min-w-0 gap-5" value={selectedTab} onValueChange={value => { const next = value as NoteGenSkillsTab; if (tab === undefined) setLocalTab(next); onTabChange?.(next) }}><TabsList className="grid w-full grid-cols-3 sm:w-fit"><TabsTrigger value="global">{en ? "Global" : "全局"}<Badge variant="secondary">{groups.global.length}</Badge></TabsTrigger><TabsTrigger value="workspace">{en ? "Local" : "本地"}<Badge variant="secondary">{groups.project.length}</Badge></TabsTrigger><TabsTrigger value="discover">{en ? "Discover" : "发现"}{(discoveryCount !== undefined ? discoveryCount !== null : discoveryState === "ready") && <Badge variant="secondary">{discoveryCount ?? recommendations.length}</Badge>}</TabsTrigger></TabsList>
      <TabsContent value="global">{renderInstalled("global")}</TabsContent><TabsContent value="workspace">{renderInstalled("project")}</TabsContent>
      <TabsContent value="discover"><section className="flex flex-col gap-3"><div className="flex items-start justify-between gap-4"><div><h3 className="text-base font-semibold">{en ? "NoteGen picks" : "NoteGen 精选"}</h3><p className="mt-1 text-sm text-muted-foreground">{en ? "Discover skills for notes and writing, then choose one to install." : "发现适合笔记与写作的技能，选择后即可安装。"}</p></div><Button variant="ghost" size="icon-sm" disabled={discoveryState === "loading"} aria-label={en ? "Refresh recommendations" : "刷新推荐"} onClick={onRefresh}>{discoveryState === "loading" ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <RefreshCw />}</Button></div>
        {discoveryState === "error" && <Alert variant="destructive"><AlertTitle>{en ? "Failed to load recommended skills" : "推荐技能加载失败"}</AlertTitle><AlertDescription>{discoveryError}</AlertDescription></Alert>}
        {discoveryState === "loading" && !recommendations.length ? <div className="flex flex-col gap-2" aria-busy="true" aria-label={en ? "NoteGen picks" : "NoteGen 精选"}>{[0, 1, 2].map(id => <Skeleton key={id} className="h-24 w-full motion-reduce:animate-none" />)}</div> : recommendations.length ? <ItemGroup className="gap-2" aria-busy={discoveryState === "loading"}>{recommendations.map(skill => {
          const installed = [...groups.global, ...groups.project].some(item => skillId(item) === skill.id)
          return <Item key={skill.id} variant="outline"><ItemMedia variant="icon"><Sparkles /></ItemMedia><ItemContent className="min-w-0 basis-48"><ItemTitle>{skill.name}</ItemTitle><ItemDescription>{skill.description}</ItemDescription><ItemDescription>{en ? `By ${skill.author}` : `作者：${skill.author}`}</ItemDescription></ItemContent><ItemActions className="ml-auto"><Button variant="ghost" size="icon-sm" aria-label={en ? "View source" : "查看来源"} onClick={() => void performAction({ type: "source", sourceUrl: skill.sourceUrl })}><ExternalLink /></Button><Button variant="outline" size="sm" disabled={installed} onClick={() => setInstallId(skill.id)}>{installed ? <Check /> : <Download />}{installed ? (en ? "Installed" : "已安装") : (en ? "Install" : "安装")}</Button></ItemActions></Item>
        })}</ItemGroup> : discoveryState !== "error" && <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><Sparkles /></EmptyMedia><EmptyTitle>{en ? "No recommended skills yet" : "暂无推荐技能"}</EmptyTitle></EmptyHeader></Empty>}
      </section></TabsContent>
    </Tabs>
    {deleting && <NoteGenReplicaDialog open onClose={() => setDeleting(undefined)} title={en ? "Delete Skill" : "删除 Skill"} description={en ? "Are you sure you want to delete this Skill? This action cannot be undone." : "确定要删除这个 Skill 吗？此操作无法撤销。"} footer={<><Button variant="outline" onClick={() => setDeleting(undefined)}>{en ? "Cancel" : "取消"}</Button><Button variant="destructive" onClick={() => { setDeleted([...deleted, key(deleting.scope, deleting.skill)]); changed({ ...groups, [deleting.scope]: groups[deleting.scope].filter(item => skillId(item) !== skillId(deleting.skill)) }); setDeleting(undefined) }}>{en ? "Delete" : "删除"}</Button></>}><span className="sr-only">{deleting.skill.name}</span></NoteGenReplicaDialog>}
    {selected && <NoteGenSkillInstallDialog key={selected.id} skill={selected} lang={lang} installState={installState} installError={installError} installScope={installScope} loadingRotation={loadingRotation} installedIn={(["global", "project"] as const).filter(scope => groups[scope].some(skill => skillId(skill) === selected.id))} onClose={() => setInstallId(undefined)} onRetryInstall={onRetryInstall} onFailure={reason => fail(en ? "Failed to install skill" : "安装技能失败", reason)} onInstall={async scope => { await onInstall?.(selected, scope); const skill: NoteGenInstalledSkill = { id: selected.id, name: selected.name, description: selected.description, enabled: true, scripts: selected.scripts ?? [] }; setAdded([...added, { scope, skill }]); setDeleted(deleted.filter(value => value !== key(scope, skill))); changed({ ...groups, [scope]: [...groups[scope], skill] }); setFeedback({ kind: "success", title: en ? `Installed ${selected.name}` : `已安装 ${selected.name}` }) }} />}
    {environmentTarget && Boolean(environmentTarget.skill.scripts?.length) && <NoteGenSkillEnvironmentDialog key={key(environmentTarget.scope, environmentTarget.skill)} skill={environmentTarget.skill} scope={environmentTarget.scope} lang={lang} environment={environment} platform={platform} loadingRotation={loadingRotation} onEnvironmentAction={onEnvironmentAction} onDownloadRuntime={onDownloadRuntime} onClose={() => setEnvironmentKey(undefined)} />}
    {feedback && <div className="sticky bottom-4 z-[60] ml-auto mt-4 w-fit"><NoteGenResponseFeedbackNotice feedback={feedback} /><Button variant="ghost" size="sm" onClick={() => setFeedback(undefined)}>{en ? "Dismiss" : "关闭"}</Button></div>}
  </div>
}
