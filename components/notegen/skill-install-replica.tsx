"use client"

import { useId, useRef, useState } from "react"
import { ToggleGroup } from "radix-ui"
import { AlertTriangle, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./model-settings/ui/alert"
import { Button } from "./model-settings/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./model-settings/ui/field"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { NoteGenReplicaDialog } from "./replica-dialog"
import type { NoteGenRecommendedSkill, NoteGenSkillScope, NoteGenSkillsSettingsProps } from "./skills-settings-types"

export function NoteGenSkillInstallDialog({ skill, lang = "cn", installState = "ready", installError, installScope = "global", loadingRotation, installedIn, onClose, onInstall, onRetryInstall, onFailure }: Pick<NoteGenSkillsSettingsProps, "lang" | "installState" | "installError" | "installScope" | "loadingRotation" | "onRetryInstall"> & { skill: NoteGenRecommendedSkill; installedIn: NoteGenSkillScope[]; onClose: () => void; onInstall: (scope: NoteGenSkillScope) => void | Promise<void>; onFailure?: (error: unknown) => void }) {
  const en = lang === "en"
  const labelId = useId()
  const [scope, setScope] = useState(installScope)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)
  const installing = installState === "installing" || pending
  const installed = installedIn.includes(scope)
  const perform = async () => {
    if (busy.current || installed || installing || installState !== "ready") return
    busy.current = true
    setPending(true)
    try { await onInstall(scope); onClose() }
    catch (error) { onFailure?.(error) }
    finally { busy.current = false; setPending(false) }
  }
  return <NoteGenReplicaDialog open onClose={onClose} locked={installing} closeLabel={en ? "Close" : "关闭"} title={en ? `Install ${skill.name}` : `安装 ${skill.name}`} description={en ? "Choose where to install this skill. Global skills are available in all workspaces." : "选择安装位置。全局技能可供所有工作区使用。"} footer={<><Button variant="outline" disabled={installing} onClick={onClose}>{en ? "Cancel" : "取消"}</Button><Button disabled={installState === "inspecting" || installState === "error" || installing || installed} onClick={() => void perform()}>{installing ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Download />}{installing ? (en ? "Installing…" : "正在安装…") : installed ? (en ? "Installed" : "已安装") : (en ? "Install" : "安装")}</Button></>}>
    {installState === "error" ? <Alert variant="destructive"><AlertTitle>{en ? "Unable to fetch skill information" : "无法获取技能信息"}</AlertTitle><AlertDescription className="flex flex-col items-start gap-2"><p>{installError}</p><Button variant="outline" size="sm" onClick={onRetryInstall}>{en ? "Refresh" : "刷新"}</Button></AlertDescription></Alert> : installState === "inspecting" ? <div className="flex items-center gap-2" role="status"><NoteGenTraceSpinner rotation={loadingRotation} />{en ? "Fetching skill information…" : "正在获取技能信息…"}</div> : <div className="flex flex-col gap-3"><p className="text-sm text-muted-foreground">{en ? `Contains ${skill.fileCount ?? 0} files` : `包含 ${skill.fileCount ?? 0} 个文件`}</p>{(skill.hasScripts || skill.warnings?.length) ? <Alert variant="warning" data-skills-warning><AlertTriangle /><AlertTitle>{en ? "Installation notes" : "安装提示"}</AlertTitle><AlertDescription>{skill.hasScripts && <p>{en ? "Contains scripts that may require a local runtime." : "包含脚本，运行时可能需要本机环境。"}</p>}{skill.warnings?.length ? <ul className="flex list-inside list-disc flex-col gap-1">{skill.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul> : null}</AlertDescription></Alert> : null}</div>}
    <FieldGroup><Field data-disabled={installing}><FieldLabel id={labelId}>{en ? "Install location" : "安装位置"}</FieldLabel><ToggleGroup.Root type="single" value={scope} disabled={installing} aria-labelledby={labelId} className="flex w-full flex-wrap gap-1 rounded-lg border p-1" onValueChange={value => { if (value === "global" || value === "project") setScope(value) }}><ToggleGroup.Item value="global" className="flex-1 rounded-md px-3 py-1.5 data-[state=on]:bg-muted">{en ? "Global Skills" : "全局技能"}</ToggleGroup.Item><ToggleGroup.Item value="project" className="flex-1 rounded-md px-3 py-1.5 data-[state=on]:bg-muted">{en ? "Workspace Skills" : "工作区技能"}</ToggleGroup.Item></ToggleGroup.Root><FieldDescription>{scope === "global" ? (en ? "Installed in NoteGen's global Skills folder and available in every workspace." : "安装到 NoteGen 的全局 Skills 目录，可供所有工作区使用。") : (en ? "Installed in the current workspace's skills folder and available only in this workspace." : "安装到当前工作区的 skills 目录，仅供当前工作区使用。")}</FieldDescription></Field></FieldGroup>
  </NoteGenReplicaDialog>
}
