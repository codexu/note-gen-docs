import type { LucideIcon } from "lucide-react"
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Copy, Database, Download, FilePlus, FileSymlink, FileText, Folder, FolderOpen, FolderPlus, LoaderCircle, MoreHorizontal, OctagonX, Pencil, RefreshCw, Scissors, Search, Trash2, Upload } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ReleaseIcon, ReleasePane } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenFileTreeReleaseState = "folder-menu" | "expanded" | "root-menu" | "collapsed" | "deleting" | "delete-partial" | "deleted"

export interface NoteGenFileTreeReleaseEntry {
  path: string
  name: string
  kind: "folder" | "file"
  children?: readonly NoteGenFileTreeReleaseEntry[]
}

export interface NoteGenFileTreeReleaseReplicaProps {
  state?: NoteGenFileTreeReleaseState
  entries?: readonly NoteGenFileTreeReleaseEntry[]
  /** A path from entries; the default example uses 项目复盘. */
  selectedFolder?: string
  lang?: NoteGenReplicaLanguage
  height?: number
}

interface VisibleTreeEntry {
  entry: NoteGenFileTreeReleaseEntry
  level: number
  expanded: boolean
}

interface FileTreeMenuEntry {
  id: string
  label: string
  icon: LucideIcon
  shortcut?: string
  disabled?: boolean
  submenu?: boolean
  destructive?: boolean
}

/**
 * Display-only source replica, externally controlled by a video timeline.
 * Sources: note-gen-v0.39.0 (eee8a65c), file-tree-expansion-menu.tsx,
 * folder-item/index.tsx, file-manager.tsx, file-tree-row.tsx and messages.
 * Deletion states follow 23d14ec5, use-file-deletion.ts and file-deletion.ts:
 * pending entries are hidden; a failed item is retained and selected for retry.
 * There is no dedicated retry button in the source deletion result toast.
 * Compared with HEAD 1d7f150c on 2026-10-25; the target menu order is unchanged.
 * Presentation geometry requested for this release: 24px tree text and 14px
 * context menus. The application default tree text is 14px. No screenshot
 * comparison has been performed. There are no filesystem actions or timers.
 */
export function NoteGenFileTreeReleaseReplica({
  state = "folder-menu",
  entries,
  selectedFolder = "项目复盘",
  lang = "cn",
  height = 740,
}: NoteGenFileTreeReleaseReplicaProps) {
  const en = lang === "en"
  const text = (chinese: string, english: string) => en ? english : chinese
  const data = entries ?? defaultEntries(en)
  const showFolderMenu = state === "folder-menu"
  const showRootMenu = state === "root-menu"
  const deleting = state === "deleting"
  const deletePartial = state === "delete-partial"
  const deleted = state === "deleted"
  const deletionState = deleting || deletePartial || deleted
  const deletePaths = ["项目复盘/会议记录/本周进展.md", "项目复盘/会议记录/方案讨论.md"]
  const hiddenPaths = new Set(deleting || deleted ? deletePaths : deletePartial ? deletePaths.slice(0, 1) : [])
  const failedPath = deletePaths[1]
  const visibleEntries: VisibleTreeEntry[] = []
  const isExpanded = (path: string) => state === "root-menu"
    || (state === "expanded" || deletionState) && (path === selectedFolder || path.startsWith(`${selectedFolder}/`))
  const collectEntries = (children: readonly NoteGenFileTreeReleaseEntry[], level: number) => {
    for (const entry of children) {
      if (hiddenPaths.has(entry.path)) continue
      const expanded = entry.kind === "folder" && isExpanded(entry.path)
      visibleEntries.push({ entry, level, expanded })
      if (expanded && entry.children) collectEntries(entry.children, level + 1)
    }
  }
  collectEntries(data, 0)
  const selectedIndex = Math.max(0, visibleEntries.findIndex(({ entry }) => entry.path === selectedFolder))
  const folderMenuTop = Math.max(58, Math.min(124 + selectedIndex * 40, height - 36 - 466))

  const newItems: FileTreeMenuEntry[] = [
    { id: "new-file", label: text("新建文件", "New File"), icon: FilePlus },
    { id: "new-folder", label: text("新建文件夹", "New Folder"), icon: FolderPlus },
  ]
  const folderItems: readonly FileTreeMenuEntry[][] = [
    newItems,
    [
      { id: "expand-folder", label: text("展开", "Expand"), icon: ChevronsUpDown },
      { id: "collapse-folder", label: text("折叠", "Collapse"), icon: ChevronsDownUp, disabled: true },
    ],
    [{ id: "view-directory", label: text("查看目录", "View Directory"), icon: FolderOpen }],
    [{ id: "knowledge-base", label: text("知识库", "Knowledge Base"), icon: Database, submenu: true }],
    [
      { id: "cut", label: text("剪切", "Cut"), icon: Scissors, shortcut: "⌘X" },
      { id: "copy", label: text("复制", "Copy"), icon: Copy, shortcut: "⌘C" },
      { id: "duplicate", label: text("创建副本", "Duplicate"), icon: Copy },
      { id: "paste", label: text("粘贴", "Paste"), icon: FileSymlink, shortcut: "⌘V", disabled: true },
    ],
    [
      { id: "upload-folder", label: text("上传文件夹", "Upload Folder"), icon: Upload },
      { id: "download-folder", label: text("下载文件夹", "Download Folder"), icon: Download },
    ],
    [
      { id: "rename", label: text("重命名", "Rename"), icon: Pencil, shortcut: "↩" },
      { id: "delete", label: text("删除", "Delete"), icon: Trash2, shortcut: "⌫", destructive: true },
    ],
  ]
  const rootItems: readonly FileTreeMenuEntry[][] = [
    newItems,
    [
      { id: "expand-all", label: text("全部展开", "Expand All"), icon: ChevronsUpDown },
      { id: "collapse-all", label: text("全部折叠", "Collapse All"), icon: ChevronsDownUp },
    ],
    [{ id: "paste", label: text("粘贴", "Paste"), icon: FileSymlink, disabled: true }],
  ]

  return <ReleasePane state={state} lang={lang} height={height} title={text("文件", "Files")} className="ng-release-file-tree">
    <style>{fileTreeReleaseCss}</style>
    <div className="ng-release-file-tree-body" data-release-file-tree={state} data-deleting={deleting || undefined}>
      <div className="ng-release-file-tree-toolbar">
        <span className="ng-release-file-tree-tab"><FolderOpen />{text("文件", "Files")}</span>
        <div className="ng-release-file-tree-toolbar-actions">
          <ReleaseIcon icon={FilePlus} label={text("新建笔记", "New Note")} />
          <ReleaseIcon icon={FolderPlus} label={text("新建文件夹", "New Folder")} />
          <ReleaseIcon icon={RefreshCw} label={text("刷新", "Refresh")} />
          <ReleaseIcon icon={MoreHorizontal} label={text("更多", "More")} />
        </div>
      </div>
      {deleting ? <div className="ng-release-file-delete-progress" role="status" data-release-file-delete-progress data-release-deletion-progress data-completed="1" data-total="2">
        <LoaderCircle aria-hidden="true" data-release-loader="file-deletion" /><span>{text("正在删除…", "Deleting…")}</span><span className="ng-release-file-delete-count">1/2</span>
      </div> : null}
      <div className="ng-release-file-tree-search"><Search /><span>{text("搜索文件...", "Search files...")}</span></div>
      <div className="ng-release-file-tree-viewport">
        <div className="ng-release-file-tree-rows">
          {visibleEntries.map(({ entry, level, expanded }) => {
            const selected = deletePartial ? entry.path === failedPath : !deletionState && entry.path === selectedFolder && state !== "collapsed"
            const EntryIcon = entry.kind === "folder" ? expanded ? FolderOpen : Folder : FileText
            return <div key={entry.path} className="ng-release-file-tree-row" style={{ paddingInlineStart: 4 + level * 24 }} data-release-file-tree-row={entry.path} data-release-row={entry.path} data-file-manager-item-path={entry.path} data-file-manager-item-kind={entry.kind} data-selected={selected} data-expanded={entry.kind === "folder" ? expanded : undefined} data-release-file-delete-failed={deletePartial && entry.path === failedPath ? true : undefined} data-release-file-delete-retry-target={deletePartial && entry.path === failedPath ? true : undefined}>
              <span className="ng-release-file-tree-toggle" data-release-file-tree-toggle={entry.path} aria-hidden="true">{entry.kind === "folder" ? expanded ? <ChevronDown /> : <ChevronRight /> : null}</span>
              <EntryIcon className="ng-release-file-tree-entry-icon" aria-hidden="true" />
              <span className="ng-release-file-tree-name">{entry.name}</span>
            </div>
          })}
        </div>
        <div className="ng-release-file-tree-root-blank" data-release-file-tree-root data-file-manager-root-blank />
      </div>
      {showFolderMenu || showRootMenu ? <div className="ng-release-popover ng-release-file-tree-menu" style={{ left: showRootMenu ? 424 : 362, top: showRootMenu ? Math.max(112, height - 36 - 212) : folderMenuTop }} data-release-file-tree-menu={showRootMenu ? "root" : "folder"} data-release-menu={showRootMenu ? "file-tree-root" : "file-tree-folder"}>
        {(showRootMenu ? rootItems : folderItems).map((group, groupIndex) => <div key={groupIndex} className="ng-release-file-tree-menu-group">
          {groupIndex > 0 ? <Separator className="ng-release-file-tree-menu-divider" /> : null}
          {group.map(({ id, label, icon: Icon, disabled, shortcut, submenu, destructive }) => <div key={id} className="ng-release-file-tree-menu-row" data-release-file-tree-action={id} data-release-action={id} data-release-target={id} data-disabled={disabled || undefined} data-destructive={destructive || undefined} data-highlighted={showFolderMenu ? id === "expand-folder" : id === "collapse-all"}>
            <Icon aria-hidden="true" /><span>{label}</span>{shortcut ? <kbd>{shortcut}</kbd> : null}{submenu ? <ChevronRight className="ng-release-file-tree-submenu-arrow" aria-hidden="true" /> : null}
          </div>)}
        </div>)}
      </div> : null}
      {deletePartial || deleted ? <div className="ng-release-file-delete-toast" role="status" data-release-file-delete-result={deletePartial ? "partial" : "success"} data-release-deletion-result={deletePartial ? "partial" : "success"} data-type={deletePartial ? "error" : "default"}>
        {deletePartial ? <OctagonX aria-hidden="true" /> : null}
        <div><p>{deletePartial ? text("删除完成：成功 1 项，失败 1 项", "Deletion complete: 1 succeeded, 1 failed") : text("已删除 1 项", "Deleted 1 item")}</p>{deletePartial ? <span>{text("远程删除未完成，本地内容已保留，请重试。", "Remote deletion did not finish. Local content has been kept. Please try again.")}</span> : null}</div>
      </div> : null}
    </div>
  </ReleasePane>
}

function defaultEntries(en: boolean): readonly NoteGenFileTreeReleaseEntry[] {
  return [
    { path: "项目复盘", name: en ? "Project review" : "项目复盘", kind: "folder", children: [
      { path: "项目复盘/会议记录", name: en ? "Meetings" : "会议记录", kind: "folder", children: [
        { path: "项目复盘/会议记录/本周进展.md", name: en ? "Weekly progress.md" : "本周进展.md", kind: "file" },
        { path: "项目复盘/会议记录/方案讨论.md", name: en ? "Design discussion.md" : "方案讨论.md", kind: "file" },
      ] },
      { path: "项目复盘/资料整理", name: en ? "Research" : "资料整理", kind: "folder", children: [
        { path: "项目复盘/资料整理/用户反馈.md", name: en ? "User feedback.md" : "用户反馈.md", kind: "file" },
      ] },
      { path: "项目复盘/下一步安排.md", name: en ? "Next steps.md" : "下一步安排.md", kind: "file" },
    ] },
    { path: "阅读笔记", name: en ? "Reading notes" : "阅读笔记", kind: "folder", children: [
      { path: "阅读笔记/知识管理.md", name: en ? "Knowledge management.md" : "知识管理.md", kind: "file" },
    ] },
    { path: "收集箱", name: en ? "Inbox" : "收集箱", kind: "folder", children: [
      { path: "收集箱/灵感.md", name: en ? "Ideas.md" : "灵感.md", kind: "file" },
    ] },
    { path: "README.md", name: "README.md", kind: "file" },
  ]
}

const fileTreeReleaseCss = `
.ng-release-file-tree .ng-release-file-tree-body{position:relative;height:100%;background:var(--ng-r-bg);color:var(--ng-r-fg)}
.ng-release-file-tree .ng-release-file-tree-toolbar{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--ng-r-border)}
.ng-release-file-tree .ng-release-file-tree-tab{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:500}.ng-release-file-tree .ng-release-file-tree-tab svg{width:16px;height:16px}
.ng-release-file-tree .ng-release-file-tree-toolbar-actions{display:flex;align-items:center;gap:4px}
.ng-release-file-tree .ng-release-file-delete-progress{height:36px;display:flex;align-items:center;gap:8px;padding:0 12px;border-bottom:1px solid var(--ng-r-border);font-size:12px;line-height:20px;color:var(--ng-r-dim)}.ng-release-file-tree .ng-release-file-delete-progress svg{width:14px;height:14px}.ng-release-file-tree .ng-release-file-delete-count{margin-left:auto;font-variant-numeric:tabular-nums}.ng-release-file-tree .ng-release-file-tree-body[data-deleting="true"] .ng-release-file-tree-viewport{height:calc(100% - 140px)}
.ng-release-file-tree .ng-release-file-tree-search{height:36px;display:flex;align-items:center;gap:8px;margin:12px 16px 8px;padding:0 10px;border:1px solid var(--ng-r-border);border-radius:6px;color:var(--ng-r-dim);font-size:14px}.ng-release-file-tree .ng-release-file-tree-search svg{width:14px;height:14px}
.ng-release-file-tree .ng-release-file-tree-viewport{height:calc(100% - 104px);display:flex;flex-direction:column;overflow:hidden;padding:0 12px 12px}.ng-release-file-tree .ng-release-file-tree-rows{flex-shrink:0}.ng-release-file-tree .ng-release-file-tree-root-blank{min-height:28px;flex:1}
.ng-release-file-tree .ng-release-file-tree-row{height:40px;display:flex;align-items:center;gap:8px;width:100%;min-width:0;padding-right:12px;border-radius:5px;color:var(--ng-r-fg);font-size:24px;line-height:1.4;white-space:nowrap}
.ng-release-file-tree .ng-release-file-tree-row[data-selected="true"]{background:hsl(0 0% 98%/.09)}.ng-release-file-tree .ng-release-file-tree-toggle{display:flex;align-items:center;justify-content:center;width:18px;height:18px;flex-shrink:0;color:var(--ng-r-dim)}.ng-release-file-tree .ng-release-file-tree-toggle svg{width:14px;height:14px}.ng-release-file-tree .ng-release-file-tree-entry-icon{width:20px;height:20px;color:var(--ng-r-dim);stroke-width:1.75}.ng-release-file-tree .ng-release-file-tree-name{min-width:0;overflow:hidden;text-overflow:ellipsis}
.ng-release-file-tree .ng-release-file-tree-menu{width:224px;padding:4px;border-radius:6px;isolation:isolate}.ng-release-file-tree .ng-release-file-tree-menu-group{display:flex;flex-direction:column}.ng-release-file-tree .ng-release-file-tree-menu-row{display:flex;align-items:center;gap:8px;height:28px;padding:0 8px;border-radius:3px;color:var(--ng-r-fg);font-size:14px;line-height:20px;white-space:nowrap}.ng-release-file-tree .ng-release-file-tree-menu-row>svg{width:16px;height:16px;color:var(--ng-r-dim)}.ng-release-file-tree .ng-release-file-tree-menu-row[data-highlighted="true"]{background:var(--ng-r-muted)}.ng-release-file-tree .ng-release-file-tree-menu-row[data-disabled="true"]{opacity:.5}.ng-release-file-tree .ng-release-file-tree-menu-row[data-destructive="true"]{color:#ef4444}.ng-release-file-tree .ng-release-file-tree-menu-row[data-destructive="true"]>svg{color:inherit}.ng-release-file-tree .ng-release-file-tree-menu-row kbd{margin-left:auto;padding:0 4px;min-width:22px;text-align:center;border:1px solid var(--ng-r-border);border-radius:3px;background:var(--ng-r-muted);color:var(--ng-r-dim);font:11px/18px ui-sans-serif,system-ui,sans-serif}.ng-release-file-tree .ng-release-file-tree-menu-row>.ng-release-file-tree-submenu-arrow{margin-left:auto;width:14px;height:14px}.ng-release-file-tree .ng-release-file-tree-menu-divider[data-slot="separator"]{height:1px;min-height:1px;width:calc(100% + 8px);margin:4px -4px;background:var(--ng-r-border);border:0}
.ng-release-file-tree .ng-release-file-delete-toast{position:absolute;right:20px;bottom:20px;display:flex;align-items:flex-start;gap:10px;width:356px;padding:16px;border:1px solid var(--ng-r-border);border-radius:8px;background:var(--ng-r-popover);color:var(--ng-r-fg);box-shadow:0 4px 12px #0004;font-size:13px;line-height:1.5}.ng-release-file-tree .ng-release-file-delete-toast>svg{width:16px;height:16px;margin-top:2px}.ng-release-file-tree .ng-release-file-delete-toast>div{min-width:0}.ng-release-file-tree .ng-release-file-delete-toast p{margin:0;font-weight:500}.ng-release-file-tree .ng-release-file-delete-toast span{display:block;margin-top:4px;color:var(--ng-r-dim);font-size:12px;line-height:1.5}
`
