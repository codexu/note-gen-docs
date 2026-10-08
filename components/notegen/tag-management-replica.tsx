"use client"

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, FolderPlus, Pencil, Tag, Trash2 } from "lucide-react"
import { ContextMenu } from "radix-ui"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"
import { cn } from "@/lib/utils"

export type NoteGenReplicaTag = { path: string; locked?: boolean }
export type NoteGenReplicaTagMembership = { id: number; tagPaths: string[] }
type TagNode = { path: string; label: string; tag?: NoteGenReplicaTag; children: TagNode[] }
type TagAction = { kind: "create"; parent: string } | { kind: "rename" | "delete"; path: string }
const matches = (path: string, parent: string) => path === parent || path.startsWith(parent + "/")
const parentOf = (path: string) => path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ""
const leafOf = (path: string) => path.slice(path.lastIndexOf("/") + 1)

function tagTree(tags: NoteGenReplicaTag[]) {
  const roots: TagNode[] = []
  const nodes = new Map<string, TagNode>()
  tags.forEach(tag => {
    let siblings = roots
    tag.path.split("/").forEach((label, index, parts) => {
      const path = parts.slice(0, index + 1).join("/")
      let node = nodes.get(path)
      if (!node) { node = { path, label, children: [] }; nodes.set(path, node); siblings.push(node) }
      if (index === parts.length - 1) node.tag = tag
      siblings = node.children
    })
  })
  const order = new Map(tags.map((tag, index) => [tag.path, index]))
  function sort(nodes: TagNode[]) {
    nodes.sort((a, b) => (order.get(a.path) ?? 0) - (order.get(b.path) ?? 0))
    nodes.forEach(node => sort(node.children))
  }
  sort(roots)
  return roots
}

export function createNoteGenTagFixture(lang: NoteGenReplicaLanguage, ids: number[], groupLabel?: string) {
  const en = lang === "en"
  const root = en ? "Travel" : "旅行"
  const groupPath = root + "/" + (groupLabel ?? (en ? "Paris trip" : "杭州旅行"))
  const children = en ? ["Routes", "Restaurants", "References"] : ["路线", "餐厅", "参考资料"]
  return {
    groupPath,
    tags: [
      { path: en ? "Inbox" : "收件箱", locked: true }, { path: root }, { path: groupPath },
      ...children.map(label => ({ path: groupPath + "/" + label })),
      { path: en ? "Product ideas" : "产品想法" }, { path: en ? "Daily notes" : "日常记录" },
    ],
    memberships: ids.map((id, index) => ({ id, tagPaths: index === 0
      ? [groupPath + "/" + children[0], groupPath + "/" + children[2]]
      : [groupPath + "/" + children[index % children.length]] })),
  }
}

export function NoteGenTagManagementReplica({
  lang = "cn", initialTags, initialRecords, initialSelectedPath, initialCollapsed = false, createRequest = 0, children, className,
}: {
  lang?: NoteGenReplicaLanguage
  initialTags: NoteGenReplicaTag[]
  initialRecords: NoteGenReplicaTagMembership[]
  initialSelectedPath: string
  initialCollapsed?: boolean
  createRequest?: number
  children: (records: NoteGenReplicaTagMembership[], selectedPath: string) => ReactNode
  className?: string
}) {
  const en = lang === "en"
  const text = (cn: string, english: string) => en ? english : cn
  const [tags, setTags] = useState(initialTags)
  const [records, setRecords] = useState(initialRecords)
  const [selected, setSelected] = useState(initialSelectedPath)
  const [expanded, setExpanded] = useState(() => new Set(initialTags.flatMap(tag => tag.path.split("/").slice(0, -1).map((_, index) => tag.path.split("/").slice(0, index + 1).join("/")))))
  const [ratio, setRatio] = useState(initialCollapsed ? 5 : 35)
  const [action, setAction] = useState<TagAction | null>(null)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const container = useRef<HTMLDivElement>(null)
  const request = useRef(createRequest)
  const inputId = useId()
  const treeId = useId()
  const tree = useMemo(() => tagTree(tags), [tags])
  const visible = records.filter(record => record.tagPaths.some(path => matches(path, selected)))
  const collapsed = ratio <= 6
  useEffect(() => {
    if (request.current === createRequest) return
    request.current = createRequest
    setName(""); setError(""); setAction({ kind: "create", parent: "" })
  }, [createRequest])

  function begin(next: TagAction) {
    setName(next.kind === "rename" ? leafOf(next.path) : "")
    setError(""); setAction(next)
  }
  function select(path: string) {
    setSelected(path)
    setExpanded(current => new Set([...current, ...path.split("/").slice(0, -1).map((_, index) => path.split("/").slice(0, index + 1).join("/"))]))
  }
  function move(path: string, direction: -1 | 1) {
    const siblings = tags.filter(tag => parentOf(tag.path) === parentOf(path))
    const index = siblings.findIndex(tag => tag.path === path)
    const other = siblings[index + direction]
    if (!other) return
    const next = [...tags]
    const a = next.findIndex(tag => tag.path === path)
    const b = next.findIndex(tag => tag.path === other.path)
    ;[next[a], next[b]] = [next[b], next[a]]
    setTags(next)
  }
  function save() {
    if (!action) return
    if (action.kind === "delete") {
      const fallback = tags.find(tag => tag.path !== action.path)?.path
      if (!fallback) return
      setTags(tags.filter(tag => tag.path !== action.path))
      setRecords(records.map(record => {
        const paths = record.tagPaths.filter(path => path !== action.path)
        return { ...record, tagPaths: paths.length ? paths : [fallback] }
      }))
      if (selected === action.path) select(fallback)
    } else {
      const parent = action.kind === "create" ? action.parent : parentOf(action.path)
      const normalized = name.trim().replace(/^#/, "").split("/").map(part => part.trim()).join("/")
      if (!normalized || normalized.split("/").some(part => !part)) { setError(text("请输入有效的标签名称", "Enter a valid tag name")); return }
      const path = parent ? parent + "/" + normalized : normalized
      const previous = action.kind === "rename" ? action.path : null
      const rewrite = (value: string) => previous && matches(value, previous) ? path + value.slice(previous.length) : value
      const nextTags = previous ? tags.map(tag => ({ ...tag, path: rewrite(tag.path) })) : [...tags, { path }]
      if (new Set(nextTags.map(tag => tag.path)).size !== nextTags.length) { setError(text("此标签路径已存在", "This tag path already exists")); return }
      setTags(nextTags)
      if (previous) {
        setRecords(records.map(record => ({ ...record, tagPaths: record.tagPaths.map(rewrite) })))
        setExpanded(current => new Set([...current].map(rewrite)))
        select(rewrite(selected))
      } else { select(path); setRatio(35) }
    }
    setAction(null)
  }

  const menuClass = "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4"
  function renderNode(node: TagNode): ReactNode {
    const open = expanded.has(node.path)
    const count = new Set(records.filter(record => record.tagPaths.some(path => matches(path, node.path))).map(record => record.id)).size
    const siblings = tags.filter(tag => parentOf(tag.path) === parentOf(node.path))
    const siblingIndex = siblings.findIndex(tag => tag.path === node.path)
    return <li key={node.path}>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <div className={cn("flex min-w-0 items-center gap-0.5 rounded-md pe-1 hover:bg-accent", selected === node.path && "bg-accent")}>
            {node.children.length ? <Button variant="ghost" size="icon" className="size-6" aria-controls={treeId + node.path} aria-expanded={open} aria-label={text(open ? "收起 " : "展开 ", open ? "Collapse " : "Expand ") + node.label} onClick={() => setExpanded(current => { const next = new Set(current); if (open) next.delete(node.path); else next.add(node.path); return next })}>{open ? <ChevronDown /> : <ChevronRight />}</Button> : <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true"><Tag className="size-4" /></span>}
            <Button variant="ghost" className="h-8 min-w-0 flex-1 justify-start px-1.5" aria-pressed={selected === node.path} title={node.path} onClick={() => {
              if (!node.tag) setTags(current => current.some(tag => tag.path === node.path) ? current : [...current, { path: node.path }])
              select(node.path)
            }}>
              <span className="min-w-0 flex-1 truncate text-start">{node.label}</span><span className="shrink-0 text-xs tabular-nums text-muted-foreground">{count}</span>
            </Button>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Portal><ContextMenu.Content className="min-w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <ContextMenu.Group>
            <ContextMenu.Item className={menuClass} onSelect={() => begin({ kind: "create", parent: node.path })}><FolderPlus />{text("新建子标签", "New child tag")}</ContextMenu.Item>
            <ContextMenu.Item className={menuClass} disabled={!node.tag || node.tag.locked} onSelect={() => begin({ kind: "rename", path: node.path })}><Pencil />{text("重命名", "Rename")}</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Separator className="my-1 h-px bg-border" />
          <ContextMenu.Group>
            <ContextMenu.Item className={menuClass} disabled={!node.tag || siblingIndex <= 0} onSelect={() => move(node.path, -1)}><ArrowUp />{text("上移", "Move up")}</ContextMenu.Item>
            <ContextMenu.Item className={menuClass} disabled={!node.tag || siblingIndex === siblings.length - 1} onSelect={() => move(node.path, 1)}><ArrowDown />{text("下移", "Move down")}</ContextMenu.Item>
            <ContextMenu.Item className={cn(menuClass, "text-destructive")} disabled={!node.tag || node.tag.locked || node.children.length > 0 || tags.length <= 1} onSelect={() => begin({ kind: "delete", path: node.path })}><Trash2 />{text("删除", "Delete")}</ContextMenu.Item>
          </ContextMenu.Group>
        </ContextMenu.Content></ContextMenu.Portal>
      </ContextMenu.Root>
      {node.children.length > 0 && open ? <ul id={treeId + node.path} className="ms-3 flex min-w-0 flex-col border-s ps-3">{node.children.map(renderNode)}</ul> : null}
    </li>
  }
  const actionParent = action?.kind === "create" ? action.parent : action ? parentOf(action.path) : ""
  const title = action?.kind === "rename" ? text("重命名", "Rename") : action?.kind === "delete" ? text("删除标签", "Delete tag") : actionParent ? text("新建子标签", "New child tag") : text("新建标签", "New tag")
  return (
    <div ref={container} data-notegen-replica="tag-management" className={cn("flex h-full min-h-0 min-w-0 flex-col", className)}>
      <div className="shrink-0 overflow-hidden" style={{ height: collapsed ? 32 : `${ratio}%` }}>
        {collapsed ? <Button variant="ghost" className="h-7 min-h-7 w-full justify-start px-2 text-xs" aria-expanded={false} onClick={() => setRatio(35)}><Tag data-icon="inline-start" /><span className="min-w-0 flex-1 truncate text-start">{selected}</span><ChevronDown data-icon="inline-end" /></Button> : <nav aria-label={text("标签管理", "Tag management")} className="h-full overflow-y-auto overscroll-contain px-3 py-2"><ul className="flex min-w-0 flex-col">{tree.map(renderNode)}</ul></nav>}
      </div>
      <div role="separator" tabIndex={0} aria-label={text("调整标签与记录区域；双击收起标签", "Resize tag and record areas; double-click to collapse tags")} aria-orientation="horizontal" aria-valuemin={5} aria-valuemax={70} aria-valuenow={ratio} className="h-2 shrink-0 touch-none cursor-row-resize bg-border/40 outline-none hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring"
        onDoubleClick={() => setRatio(5)}
        onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); if (collapsed) setRatio(35) }}
        onPointerMove={event => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) return; const bounds = container.current?.getBoundingClientRect(); if (bounds?.height) setRatio(Math.max(5, Math.min(70, (event.clientY - bounds.top) / bounds.height * 100))) }}
        onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }}
        onKeyDown={event => { if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) { event.preventDefault(); setRatio(current => event.key === "Enter" ? current <= 6 ? 35 : 5 : Math.max(5, Math.min(70, current + (event.key === "ArrowUp" ? -5 : 5)))) } }} />
      <div className="min-h-0 flex-1 overflow-y-auto">{visible.length ? children(visible, selected) : <p className="p-6 text-center text-sm text-muted-foreground">{text("暂无记录", "No records")}</p>}</div>
      <Dialog open={Boolean(action)} onOpenChange={open => { if (!open) setAction(null) }}>
        <DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{action?.kind === "delete" ? text(`删除标签“${action.path}”？记录不会删除。`, `Delete “${action.path}”? Records will be kept.`) : actionParent ? text(`在“${actionParent}”下创建或编辑子标签。`, `Create or edit a child tag under “${actionParent}”.`) : text("创建顶层标签，也可以使用 / 创建多级路径。", "Create a root tag, or use / to create a nested path.")}</DialogDescription></DialogHeader>
          <form onSubmit={event => { event.preventDefault(); save() }} className="flex flex-col gap-5">
            {action?.kind !== "delete" ? <fieldset className="flex flex-col gap-2"><label htmlFor={inputId} className="text-sm font-medium">{text("标签名称", "Tag name")}</label><Input id={inputId} autoFocus value={name} aria-invalid={Boolean(error)} onChange={event => { setName(event.target.value); setError("") }} />{actionParent && name.trim() ? <p className="break-all text-sm text-muted-foreground">{actionParent + "/" + name.trim()}</p> : null}</fieldset> : null}
            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            <DialogFooter><Button type="button" variant="outline" onClick={() => setAction(null)}>{text("取消", "Cancel")}</Button><Button type="submit" variant={action?.kind === "delete" ? "destructive" : "default"} disabled={action?.kind !== "delete" && !name.trim()}>{action?.kind === "delete" ? text("删除", "Delete") : text("保存", "Save")}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
