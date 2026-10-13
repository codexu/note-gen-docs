import type { ReactNode } from "react"

export function TutorialMarker({ number, children }: { number: number; children?: ReactNode }) {
  return <span className="inline-flex items-center gap-2" data-tutorial-marker={number}><span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-background">{number}</span>{children}</span>
}

export function TutorialLegend({ items }: { items: string[] }) {
  return <ol className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground" aria-label="操作标识说明">{items.map((item, index) => <li key={item} className="flex items-start gap-2"><TutorialMarker number={index + 1} /><span>{item}</span></li>)}</ol>
}
