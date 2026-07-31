export function CanvasThumbnail({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 size-full text-border" viewBox="0 0 100 75" preserveAspectRatio="none">
          <path d="M 18 22 C 32 22, 35 52, 50 52 S 68 25, 82 25" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="absolute left-[7%] top-[16%] h-[25%] w-[27%] rounded border bg-background shadow-sm" />
        <span className="absolute bottom-[14%] left-[37%] h-[25%] w-[27%] rounded border bg-background shadow-sm" />
        <span className="absolute right-[6%] top-[20%] h-[25%] w-[27%] rounded border bg-background shadow-sm" />
      </div>
    )
  }

  if (variant === 1) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 size-full text-muted-foreground/55" viewBox="0 0 100 75" preserveAspectRatio="none">
          <path d="M 12 58 C 25 17, 39 65, 53 32 S 76 18, 88 47" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
        <span className="absolute bottom-[15%] left-[8%] size-3 rounded-full border-2 border-background bg-foreground shadow-sm" />
        <span className="absolute left-[35%] top-[48%] size-2.5 rounded-full border-2 border-background bg-muted-foreground shadow-sm" />
        <span className="absolute left-[57%] top-[32%] size-2.5 rounded-full border-2 border-background bg-muted-foreground shadow-sm" />
        <span className="absolute right-[8%] top-[53%] size-3 rounded-full border-2 border-background bg-foreground shadow-sm" />
      </div>
    )
  }

  if (variant === 2) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 size-full text-border" viewBox="0 0 100 75" preserveAspectRatio="none">
          <path d="M 50 37 L 20 18 M 50 37 L 80 17 M 50 37 L 22 59 M 50 37 L 79 58" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="absolute left-[39%] top-[36%] size-8 rounded-full border bg-background shadow-sm" />
        <span className="absolute left-[7%] top-[10%] h-[19%] w-[27%] rounded border bg-background" />
        <span className="absolute right-[7%] top-[9%] h-[19%] w-[27%] rounded border bg-background" />
        <span className="absolute bottom-[9%] left-[9%] h-[19%] w-[25%] rounded border bg-background" />
        <span className="absolute bottom-[10%] right-[8%] h-[19%] w-[25%] rounded border bg-background" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg className="absolute inset-0 size-full text-border" viewBox="0 0 100 75" preserveAspectRatio="none">
        <path d="M 50 25 L 50 36 M 50 36 L 25 52 M 50 36 L 75 52" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="absolute left-[35%] top-[10%] h-[23%] w-[30%] rounded border bg-background shadow-sm" />
      <span className="absolute bottom-[12%] left-[10%] h-[25%] w-[31%] rounded border bg-muted/70 shadow-sm" />
      <span className="absolute bottom-[12%] right-[10%] h-[25%] w-[31%] rounded border bg-background shadow-sm" />
      <span className="absolute left-1/2 top-[42%] size-2 -translate-x-1/2 rounded-full bg-muted-foreground" />
    </div>
  )
}
