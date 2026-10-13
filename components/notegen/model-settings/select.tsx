"use client"

import { useContext, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ModelSettingsPortal } from "./portal"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function ResponsiveSelect({ title, value, options, onValueChange }: {
  title: string
  value: string
  options: Array<{ value: string; label: ReactNode }>
  onValueChange: (value: string) => void
}) {
  const root = useContext(ModelSettingsPortal)
  const wrapper = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ above: false, height: 256 })
  const position = () => {
    if (!root || !wrapper.current) return
    const bounds = root.getBoundingClientRect()
    const trigger = wrapper.current.getBoundingClientRect()
    const scale = bounds.width / root.offsetWidth || 1
    const below = (bounds.bottom - trigger.bottom) / scale - 8
    const above = (trigger.top - bounds.top) / scale - 8
    const useAbove = below < 150 && above > below
    setLayout({ above: useAbove, height: Math.max(64, Math.min(256, useAbove ? above : below)) })
  }
  return <div ref={wrapper} className="ng-model-select relative" data-side={layout.above ? "top" : "bottom"} style={{ "--ng-menu-height": `${layout.height}px` } as CSSProperties}>
    <Select value={value} onValueChange={onValueChange} onOpenChange={open => { if (open) position() }}>
      <SelectTrigger aria-label={title} className="w-full"><SelectValue placeholder={title} /></SelectTrigger>
      <SelectContent className="w-full"><SelectGroup>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectGroup></SelectContent>
    </Select>
  </div>
}
