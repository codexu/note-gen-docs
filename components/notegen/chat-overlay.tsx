"use client"

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react"
import { createPortal } from "react-dom"

/** Position in natural replica coordinates, including when its ancestor is scaled. */
export function NoteGenChatPopover({ anchor, owner, width = 320, side = "top", children, label, staticPosition, matchAnchorWidth = false, maxHeight = 448 }: {
  anchor: RefObject<HTMLElement | null>
  owner: string
  width?: number
  side?: "top" | "right" | "bottom"
  children: ReactNode
  label: string
  matchAnchorWidth?: boolean
  maxHeight?: number
  /** Relative to the composer; supplies deterministic static-export geometry. */
  staticPosition?: Pick<CSSProperties, "left" | "right" | "top" | "bottom" | "maxHeight">
}) {
  const panel = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<{ root: HTMLElement; left: number; top: number; width: number; height: number }>()
  useLayoutEffect(() => {
    const trigger = anchor.current
    if (!trigger) return
    const root = trigger.closest<HTMLElement>('[data-notegen-replica="frame"]')
      ?? trigger.closest<HTMLElement>('.ng-release-pane-body')
      ?? trigger.closest<HTMLElement>('[data-notegen-chat-boundary]')
      ?? trigger.closest<HTMLElement>('[data-notegen-replica="settings-shell"]')
      ?? trigger.closest<HTMLElement>('[data-notegen-settings-boundary]')
    if (!root) return
    const position = () => {
      const bounds = root.getBoundingClientRect()
      const target = trigger.getBoundingClientRect()
      const scaleX = bounds.width / root.offsetWidth || 1
      const scaleY = bounds.height / root.offsetHeight || 1
      const availableWidth = Math.max(1, root.clientWidth - 16)
      const menuWidth = Math.min(matchAnchorWidth ? target.width / scaleX - 8 : width, availableWidth)
      const x = (target.left - bounds.left) / scaleX - root.clientLeft + root.scrollLeft
      const y = (target.top - bounds.top) / scaleY - root.clientTop + root.scrollTop
      const naturalHeight = panel.current?.scrollHeight ?? 400
      const menuHeight = Math.min(naturalHeight, Math.max(1, root.clientHeight - 16), maxHeight)
      let left = matchAnchorWidth ? x + 4 : x
      let top = y - menuHeight - (matchAnchorWidth ? 6 : 8)
      if (side === "bottom") {
        top = (target.bottom - bounds.top) / scaleY - root.clientTop + root.scrollTop + 8
        if (top + menuHeight > root.clientHeight - 8) top = y - menuHeight - 8
      }
      if (side === "right") {
        const right = (target.right - bounds.left) / scaleX + 8
        left = right + menuWidth < root.clientWidth ? right : x - menuWidth - 8
        top = y
      }
      setLayout({ root, left: Math.max(8, Math.min(left, root.clientWidth - menuWidth - 8)), top: Math.max(8, Math.min(top, root.clientHeight - menuHeight - 8)), width: menuWidth, height: menuHeight })
    }
    position()
    const observer = new ResizeObserver(position)
    observer.observe(root)
    if (panel.current) observer.observe(panel.current)
    window.addEventListener("resize", position)
    root.addEventListener("scroll", position, true)
    return () => { observer.disconnect(); window.removeEventListener("resize", position); root.removeEventListener("scroll", position, true) }
  }, [anchor, width, side, matchAnchorWidth, maxHeight, Boolean(layout?.root)])
  const content = <div ref={panel} data-chat-owner={owner} data-notegen-replica="chat-popover" aria-label={label} className="ng-chat-popover" style={{ position: "absolute", zIndex: 40, ...(staticPosition ?? (layout ? { left: layout.left, top: layout.top } : { left: side === "right" ? 332 : 4, ...(side === "bottom" ? { top: "100%" } : { bottom: "100%" }) })), width: layout && !staticPosition ? layout.width : matchAnchorWidth ? "calc(100% - 8px)" : width, maxWidth: "calc(100% - 8px)", maxHeight: staticPosition?.maxHeight ?? layout?.height ?? maxHeight, overflowY: "auto", overflowX: "hidden", border: "1px solid var(--color-border)", borderRadius: 10, background: "var(--color-popover, var(--color-background))", color: "var(--color-popover-foreground, var(--color-foreground))", padding: 6, fontSize: 14, lineHeight: 1.5, boxShadow: "0 8px 30px #0002" }}>{children}</div>
  return layout && !staticPosition ? createPortal(content, layout.root) : content
}
