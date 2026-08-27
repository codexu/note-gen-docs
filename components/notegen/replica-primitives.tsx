import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"
import type { NoteGenReplicaIcon } from "@/components/notegen/types"

export function NoteGenReplicaFrame({
  children,
  className,
  fill = false,
  ...props
}: ComponentProps<"div"> & { fill?: boolean }) {
  return (
    <div
      data-notegen-replica="frame"
      className={cn(
        "w-full overflow-hidden rounded-xl border bg-background text-[9px] leading-normal text-foreground shadow-xl sm:text-[10px] lg:text-xs",
        fill ? "h-full" : "aspect-[16/10]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
export function NoteGenReplicaIconButton({
  icon: Icon,
  active = false,
  label,
  className,
  ...props
}: Omit<ComponentProps<"button">, "children"> & {
  icon: NoteGenReplicaIcon
  active?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      className={cn(
        "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        active && "bg-accent text-foreground",
        className
      )}
      {...props}
    >
      <Icon className="size-4" strokeWidth={1.7} />
    </button>
  )
}

export function NoteGenReplicaPanel({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      data-notegen-replica="panel"
      className={cn("flex min-h-0 min-w-0 flex-col bg-background", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export function NoteGenReplicaToolbar({
  children,
  className,
  label,
  ...props
}: ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      role={label ? "toolbar" : undefined}
      aria-label={label}
      data-notegen-replica="toolbar"
      className={cn("flex h-9 shrink-0 items-center gap-0.5 border-b px-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function NoteGenReplicaMenuGroup({
  label,
  children,
  className,
}: {
  label?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label ? (
        <div className="px-2.5 pb-1 pt-3 text-[9px] font-normal text-muted-foreground/60">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  )
}
