"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { Dialog as DialogPrimitive } from "radix-ui"
import { X } from "lucide-react"
import { Button } from "./model-settings/ui/button"
import { cn } from "@/lib/utils"
import { noteGenChatCss } from "./chat-replica-style"

/** A dialog bounded to its replica window. Nonmodal so multiple fixed gallery scenes can coexist. */
export function NoteGenReplicaDialog({ open, onClose, title, description, children, footer, locked = false, mobile = false, closeLabel = "Close" }: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  locked?: boolean
  mobile?: boolean
  closeLabel?: string
}) {
  const anchor = useRef<HTMLSpanElement>(null)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const element = anchor.current
    setContainer(element?.closest<HTMLElement>('[data-notegen-replica="frame"]')
      ?? element?.closest<HTMLElement>('.ng-skill-workspace')
      ?? element?.closest<HTMLElement>('[data-notegen-replica="settings-shell"]')
      ?? element?.closest<HTMLElement>('[data-notegen-settings-boundary]') ?? null)
  }, [open])
  const content = open ? <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 p-4 supports-backdrop-filter:backdrop-blur-xs" data-replica-dialog-layer>
    <style>{noteGenChatCss}</style>
    <DialogPrimitive.Root open modal={false} onOpenChange={value => { if (!value && !locked) onClose() }}>
      <DialogPrimitive.Content onOpenAutoFocus={event => event.preventDefault()} onCloseAutoFocus={event => event.preventDefault()} onInteractOutside={event => event.preventDefault()} onEscapeKeyDown={event => { if (locked) event.preventDefault() }} className={cn("ng-chat-surface ng-skills-ui relative flex max-h-full w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 shadow-lg outline-none", mobile && "absolute inset-x-0 bottom-0 max-w-none rounded-b-none")}>
        <header className="flex flex-col gap-2 pr-8"><DialogPrimitive.Title className="text-lg font-semibold">{title}</DialogPrimitive.Title><DialogPrimitive.Description className={cn("text-sm text-muted-foreground", !description && "sr-only")}>{description ?? title}</DialogPrimitive.Description></header>
        {!locked && <Button variant="ghost" size="icon-sm" className="absolute right-2 top-2" aria-label={closeLabel} onClick={onClose}><X /></Button>}
        {children}
        {footer && <footer className="-mx-4 -mb-4 flex flex-wrap justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">{footer}</footer>}
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  </div> : null
  return <><span ref={anchor} hidden />{container && content ? createPortal(content, container) : content}</>
}
