"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface NoteGenDockItem {
  id: string
  label: string
  icon: LucideIcon
}

interface NoteGenMobileDockProps {
  items: NoteGenDockItem[]
  activeIndex: number
  onActiveIndexChange: (index: number, item: NoteGenDockItem) => void
}

const iconOnlyTrackWidth = 32
const activeMinTrackWidth = 80
const activeMaxTrackWidth = 112
const activeTrackChromeWidth = 50
const gridGapWidth = 4

export function NoteGenMobileDock({
  items,
  activeIndex,
  onActiveIndexChange,
}: NoteGenMobileDockProps) {
  const navRef = React.useRef<HTMLElement | null>(null)
  const labelMeasureRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const [layoutMetrics, setLayoutMetrics] = React.useState({
    contentWidth: 0,
    labelWidths: [] as number[],
  })

  React.useEffect(() => {
    const navElement = navRef.current
    if (!navElement) return

    function measureLayout() {
      const currentNavElement = navRef.current
      if (!currentNavElement) return

      const styles = window.getComputedStyle(currentNavElement)
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      const nextContentWidth = Math.max(0, currentNavElement.clientWidth - paddingX)
      const nextLabelWidths = items.map((_, index) => {
        const labelElement = labelMeasureRefs.current[index]
        return labelElement ? Math.ceil(labelElement.getBoundingClientRect().width) : 0
      })

      setLayoutMetrics((previous) => {
        const sameContentWidth = previous.contentWidth === nextContentWidth
        const sameLabelWidths =
          previous.labelWidths.length === nextLabelWidths.length &&
          previous.labelWidths.every((width, index) => width === nextLabelWidths[index])

        return sameContentWidth && sameLabelWidths
          ? previous
          : { contentWidth: nextContentWidth, labelWidths: nextLabelWidths }
      })
    }

    measureLayout()
    const resizeObserver = new ResizeObserver(measureLayout)
    resizeObserver.observe(navElement)
    window.addEventListener("resize", measureLayout)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", measureLayout)
    }
  }, [items])

  const gridTemplateColumns = React.useMemo(() => {
    const inactiveItemCount = Math.max(items.length - 1, 0)
    if (layoutMetrics.contentWidth <= 0 || inactiveItemCount === 0) {
      return items.map((_, index) => (index === activeIndex ? "2fr" : "1fr")).join(" ")
    }

    const trackSpace = Math.max(
      0,
      layoutMetrics.contentWidth - gridGapWidth * inactiveItemCount
    )
    const labelWidth = layoutMetrics.labelWidths[activeIndex] ?? 0
    const desiredActiveWidth = labelWidth + activeTrackChromeWidth
    const availableActiveWidth = trackSpace - iconOnlyTrackWidth * inactiveItemCount
    const maxActiveWidth = Math.min(
      activeMaxTrackWidth,
      Math.max(iconOnlyTrackWidth, availableActiveWidth)
    )
    const activeWidth = Math.min(
      Math.max(desiredActiveWidth, Math.min(activeMinTrackWidth, maxActiveWidth)),
      maxActiveWidth
    )
    const inactiveWidth = Math.max(
      iconOnlyTrackWidth,
      (trackSpace - activeWidth) / inactiveItemCount
    )

    return items
      .map((_, index) => `${Math.round(index === activeIndex ? activeWidth : inactiveWidth)}px`)
      .join(" ")
  }, [activeIndex, items, layoutMetrics])

  return (
    <nav
      ref={navRef}
      aria-label="移动端主导航"
      className="mobile-dock-surface relative mx-auto grid h-14 w-full max-w-md items-center gap-1 rounded-[1.35rem] transition-[grid-template-columns] duration-[220ms] ease-out"
      style={{ gridTemplateColumns }}
    >
      {items.map((item, index) => {
        const active = index === activeIndex
        const Icon = item.icon

        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            aria-label={item.label}
            className={cn(
              "group relative flex h-12 min-w-0 items-center justify-center rounded-2xl px-0.5 text-[var(--component-inactive-color)] transition-[color,transform] duration-200 active:scale-95",
              active && "text-[var(--component-active-color)]"
            )}
            onClick={() => onActiveIndexChange(index, item)}
          >
            <span
              className={cn(
                "relative flex h-10 min-w-8 max-w-full items-center justify-center rounded-2xl px-2 transition-[background-color,box-shadow] duration-200",
                active && "gap-1.5 bg-[var(--component-active-bg)] px-2.5 shadow-sm shadow-black/5"
              )}
            >
              <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                <Icon className="size-5" />
              </span>
              <strong
                className={cn(
                  "max-w-0 truncate text-xs font-medium leading-none opacity-0 transition-[max-width,opacity] duration-[220ms] ease-out",
                  active && "max-w-32 opacity-100"
                )}
              >
                {item.label}
              </strong>
            </span>
          </button>
        )
      })}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0">
        {items.map((item, index) => (
          <span
            key={item.id}
            ref={(element) => {
              labelMeasureRefs.current[index] = element
            }}
            className="absolute whitespace-nowrap text-xs font-medium leading-none"
          >
            {item.label}
          </span>
        ))}
      </span>
    </nav>
  )
}
