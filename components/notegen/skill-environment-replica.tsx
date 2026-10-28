"use client"

import { useRef, useState } from "react"
import { Check, Download, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { Badge } from "./model-settings/ui/badge"
import { Alert, AlertDescription } from "./model-settings/ui/alert"
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "./model-settings/ui/item"
import { NoteGenTraceSpinner } from "./chat-timeline-replica"
import { NoteGenReplicaDialog } from "./replica-dialog"
import type { NoteGenInstalledSkill, NoteGenSkillEnvironment, NoteGenSkillScope, NoteGenSkillsSettingsProps } from "./skills-settings-types"

const dependencies: Record<string, { python: string[]; node: string[] }> = {
  pdf: { python: ["pypdf", "pdfplumber", "reportlab", "Pillow", "pdf2image", "pytesseract"], node: ["pdf-lib"] },
  docx: { python: ["lxml", "defusedxml", "Pillow"], node: ["docx"] },
}

export function NoteGenSkillEnvironmentDialog({ skill, scope, environment, lang = "cn", platform = "desktop", loadingRotation, onClose, onEnvironmentAction, onDownloadRuntime }: Pick<NoteGenSkillsSettingsProps, "lang" | "platform" | "loadingRotation" | "onEnvironmentAction" | "onDownloadRuntime"> & { skill: NoteGenInstalledSkill; scope: NoteGenSkillScope; environment?: NoteGenSkillEnvironment; onClose: () => void }) {
  const en = lang === "en"
  const mobile = platform === "mobile"
  const id = skill.id ?? skill.name
  const status = environment ?? skill.environment
  const [pending, setPending] = useState<"refresh" | "python" | "node">()
  const busy = useRef(false)
  const [error, setError] = useState<string>()
  const installing = status?.installing ?? (pending === "python" || pending === "node" ? pending : undefined)
  const loading = status?.phase === "loading" || pending === "refresh"
  const act = async (action: "refresh" | "python" | "node") => {
    if (busy.current || installing || loading || !onEnvironmentAction) return
    busy.current = true
    setPending(action)
    setError(undefined)
    try { await onEnvironmentAction(action, skill, scope) }
    catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
    finally { busy.current = false; setPending(undefined) }
  }
  const hasStatus = status && (status.loaded ?? (status.phase !== "loading" && status.phase !== "error"))
  const commands = hasStatus ? [{ ...status.python, name: "Python" }, status.node, status.npm, ...status.commands] : []
  return <NoteGenReplicaDialog open onClose={onClose} locked={Boolean(installing)} title={`${en ? "Runtime environment" : "运行环境"} · ${id}`} description={en ? "Inspect the runtimes and document tools used by this Skill." : "查看此 Skill 使用的运行时和文档工具。"} closeLabel={en ? "Close" : "关闭"} footer={<><Button variant="outline" disabled={mobile || loading || Boolean(installing)} onClick={() => void act("refresh")}>{loading ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <RefreshCw />}{en ? "Refresh" : "刷新"}</Button><Button disabled={Boolean(installing)} onClick={onClose}>{en ? "Close" : "关闭"}</Button></>}>
    {(error || status?.error) && <Alert variant="destructive"><AlertDescription>{error || status?.error}</AlertDescription></Alert>}
    {mobile ? <Alert><AlertDescription>{en ? "Local scripts and document runtimes are currently available on desktop. Instruction-only Skills can be installed and used on mobile." : "本机脚本和文档运行环境目前用于桌面端。移动端可安装并使用纯指令技能。"}</AlertDescription></Alert> : <>
      {(loading || !status) && !hasStatus ? <div role="status" className="flex items-center gap-2"><NoteGenTraceSpinner rotation={loadingRotation} />{en ? "Loading" : "加载中"}</div> : hasStatus ? <ItemGroup className="gap-2" aria-busy={loading}>{commands.map(command => <Item key={command.name} variant="outline" size="sm"><ItemContent><ItemTitle>{command.name === "soffice" ? "LibreOffice" : command.name}</ItemTitle></ItemContent><ItemActions><Badge variant={command.available ? "secondary" : "outline"}>{command.available && <Check />}{command.available ? command.version || (en ? "Available" : "可用") : (en ? "Not installed" : "未安装")}</Badge></ItemActions></Item>)}</ItemGroup> : null}
      <Alert><AlertDescription>{en ? "Word conversion and layout previews require local tools such as LibreOffice and Poppler. Scanned-document OCR also requires Tesseract. Refresh after installing them." : "Word 转换与版式预览需要 LibreOffice、Poppler 等本机工具；扫描件 OCR 还需要 Tesseract。安装后刷新状态。"}</AlertDescription></Alert>
      {dependencies[id] && <div className="flex flex-col gap-3"><p className="text-sm text-muted-foreground">{en ? "These buttons download the listed packages from PyPI or npm into this Skill’s own environment. Other packages can be installed as needed during a task." : "以下按钮会从 PyPI 或 npm 下载所列依赖，安装到此 Skill 的独立环境。其他依赖可在任务中按需安装。"}</p>{(["python", "node"] as const).map(language => <div key={language} className="flex flex-col gap-2"><p className="break-words text-xs text-muted-foreground">{dependencies[id][language].join(", ")}</p><Button variant="outline" disabled={!hasStatus || loading || Boolean(installing) || !(language === "python" ? status?.python.available : status?.node.available && status.npm.available)} onClick={() => void act(language)}>{installing === language ? <NoteGenTraceSpinner rotation={loadingRotation} /> : <Download />}{language === "python" ? (en ? "Install Python packages" : "安装 Python 依赖") : (en ? "Install Node.js packages" : "安装 Node.js 依赖")}</Button></div>)}</div>}
      <div className="flex flex-wrap gap-2">{(["Python", "Node.js", "LibreOffice"] as const).map(runtime => <Button key={runtime} variant="link" size="sm" onClick={() => onDownloadRuntime?.(runtime)}>{runtime}<ExternalLink data-icon="inline-end" /></Button>)}</div>
    </>}
  </NoteGenReplicaDialog>
}
