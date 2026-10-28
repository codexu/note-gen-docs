"use client"

import { Check } from "lucide-react"
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"
import { NoteGenChatPopover } from "./chat-overlay"
import { NoteGenReplicaDialog } from "./replica-dialog"
import { Button } from "./model-settings/ui/button"

export function NoteGenReplicaActionMenu({ title, trigger, items, mobile = false, defaultOpen = false, disabled = false, open: controlledOpen, onOpenChange, side = "top", menuId }: {
  title: string
  trigger: ReactNode
  items: { id: string; label: string; icon?: ReactNode; selected?: boolean; disabled?: boolean; onSelect: () => void }[]
  mobile?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "bottom"
  menuId?: string
}) {
  const [localOpen, setLocalOpen] = useState(defaultOpen)
  const open = controlledOpen ?? localOpen
  const setOpen = (value: boolean) => { if (controlledOpen === undefined) setLocalOpen(value); onOpenChange?.(value) }
  const anchor = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const focusEdge = useRef<"first" | "last" | null>(null)
  const attachMenu = useCallback((element: HTMLDivElement | null) => {
    menuRef.current = element
    if (!element || !focusEdge.current) return
    const buttons = element.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')
    buttons[focusEdge.current === "first" ? 0 : buttons.length - 1]?.focus()
  }, [])
  const owner = useId()
  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || anchor.current?.contains(event.target)) return
      if (event.target.closest('[data-chat-owner]')?.getAttribute('data-chat-owner') === owner) return
      setOpen(false)
    }
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); anchor.current?.querySelector("button")?.focus() } }
    document.addEventListener("pointerdown", outside)
    document.addEventListener("keydown", escape)
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape) }
  }, [open, owner])
  const menu = <div ref={attachMenu} data-editor-menu={menuId} role="menu" data-chat-owner={owner} aria-label={title} onKeyDown={event => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    focusEdge.current = null
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length
    buttons[next]?.focus()
  }}>{items.map(item => <Button key={item.id} data-editor-menu-option={item.id} role={item.selected === undefined ? "menuitem" : "menuitemradio"} aria-checked={item.selected} variant="ghost" disabled={item.disabled} className="w-full justify-start" onClick={() => { item.onSelect(); setOpen(false); anchor.current?.querySelector("button")?.focus() }}>{item.icon}{item.label}{item.selected && <Check className="ml-auto size-4" />}</Button>)}</div>
  return <span ref={anchor} className="relative inline-flex" data-chat-owner={owner}>
    <button type="button" className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring" disabled={disabled} aria-label={title} title={title} aria-haspopup="menu" aria-expanded={open} onClick={() => { focusEdge.current = null; setOpen(!open) }} onKeyDown={event => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); focusEdge.current = event.key === "ArrowDown" ? "first" : "last"; if (open) attachMenu(menuRef.current); else setOpen(true) } }}>{trigger}</button>
    {open && (mobile ? <NoteGenReplicaDialog open mobile title={title} onClose={() => setOpen(false)}>{menu}</NoteGenReplicaDialog> : <NoteGenChatPopover anchor={anchor} owner={owner} label={title} side={side} width={224}>{menu}</NoteGenChatPopover>)}
  </span>
}
