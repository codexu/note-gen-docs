"use client"

import type { NoteGenReplicaLanguage } from "./types"

export interface NoteGenContextUsageProps {
  lang?: NoteGenReplicaLanguage
  usedTokens: number
  contextWindow: number
  usedPercent?: number
  capacitySource?: "user" | "learned" | "estimated"
  hasConversationHistory?: boolean
  temporary?: boolean
  loading?: boolean
  compacting?: boolean
  tooltipOpen?: boolean
  /** A deterministic angle for a seekable video; no independent animation clock. */
  rotation?: number
  onCompact?: () => void
}

function formatTokenCount(value: number) {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(1))}M`
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`
  return String(value)
}

/** The current PC composer's context ring and its tooltip, with caller-owned state. */
export function NoteGenContextUsageIndicator({
  lang = "cn", usedTokens, contextWindow, usedPercent,
  capacitySource = "user", hasConversationHistory = true,
  temporary = false, loading = false, compacting = false,
  tooltipOpen = false, rotation = 0, onCompact,
}: NoteGenContextUsageProps) {
  if (!hasConversationHistory || capacitySource === "estimated" || contextWindow <= 0) return null
  const percent = Math.max(0, Math.min(100, usedPercent ?? Math.round(usedTokens / contextWindow * 100)))
  const en = lang === "en"
  const circumference = 2 * Math.PI * 9
  return <span className="ng-context-usage" data-notegen-replica="context-usage" data-tooltip-open={tooltipOpen}>
    <style>{contextUsageCss}</style>
    <button type="button" data-context-action="compact" aria-label={en ? `Context usage: ${percent}%` : `上下文使用率：${percent}%`} disabled={temporary || loading || compacting} onClick={onCompact}>
      <svg aria-hidden="true" viewBox="0 0 24 24" style={{ transform: `rotate(${-90 + rotation}deg)` }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)} />
      </svg>
    </button>
    <span className="ng-context-tooltip" role="tooltip">
      <span>{en ? `Estimated context usage: ${percent}%` : `预计上下文使用率：${percent}%`}</span>
      <span>{formatTokenCount(usedTokens)} / {formatTokenCount(contextWindow)} {en ? "tokens" : "Token"}</span>
      <i aria-hidden="true" />
    </span>
  </span>
}

export const contextUsageCss = `
.ng-context-usage{position:relative;display:inline-flex;flex-shrink:0;width:32px;height:32px;color:var(--color-muted-foreground,#71717a)}.ng-context-usage>button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;margin:0;padding:0;border:1px solid transparent;border-radius:8px;background:transparent;color:inherit;cursor:pointer}.ng-context-usage>button:hover{background:var(--color-muted,#f4f4f5);color:var(--color-foreground,#09090b)}.ng-context-usage>button:disabled{pointer-events:none;opacity:.5}.ng-context-usage>button>svg{width:16px;height:16px;flex-shrink:0}.ng-context-tooltip{position:absolute;z-index:50;bottom:100%;left:50%;display:none;flex-direction:column;gap:0;width:max-content;max-width:320px;transform:translateX(-50%);border-radius:6px;background:var(--color-foreground,#09090b);padding:6px 12px;color:var(--color-background,#fff);font:12px/16px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;white-space:nowrap}.ng-context-usage[data-tooltip-open=true]>.ng-context-tooltip,.ng-context-usage:hover>.ng-context-tooltip,.ng-context-usage:focus-within>.ng-context-tooltip{display:flex}.ng-context-tooltip>i{position:absolute;top:100%;left:50%;width:10px;height:10px;transform:translate(-50%,-7px) rotate(45deg);border-radius:2px;background:inherit}
`
