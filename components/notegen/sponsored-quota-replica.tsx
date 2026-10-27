import { BotMessageSquare, Check, ChevronDown, Gem, MessageSquare, Search } from "lucide-react"
import { ReleasePane } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export interface NoteGenSponsoredQuotaReplicaProps {
  state?: "available" | "exhausted"
  lang?: NoteGenReplicaLanguage
  height?: number
  limitedModel?: string
  freeModel?: string
  /** Fixed demonstration data, never read from a user's account. */
  remainingPercent?: number
}

export function NoteGenSponsoredQuotaReplica({ state = "available", lang = "cn", height = 740, limitedModel = "GPT6 Luna", freeModel = "Qwen3-8B", remainingPercent = 72 }: NoteGenSponsoredQuotaReplicaProps) {
  const en = lang === "en"
  const text = (cn: string, english: string) => en ? english : cn
  const percent = state === "exhausted" ? 0 : Math.max(0, Math.min(100, Math.floor(remainingPercent)))
  const model = state === "exhausted" ? freeModel : limitedModel
  return <ReleasePane title={text("模型服务", "Model services")} state={`quota-${state}`} lang={lang} height={height} className="ng-release-quota"><style>{quotaCss}</style><article className="ng-release-quota-settings"><h2><Gem />NoteGen</h2><p>{text("NoteGen 为用户提供免费的 AI 模型服务，无需配置即可使用基础功能。", "NoteGen provides free AI models for basic features without configuration.")}</p><div className="ng-release-quota-model" data-release-quota-model><MessageSquare /><div><strong>{model}<span data-release-quota-percent>（{text(`剩余 ${percent}%`, `${percent}% remaining`)}）</span></strong><p>{text("付费赞助模型共用 Token 额度，用完后自动使用免费模型。", "Sponsored paid models share a token allowance, then fall back to the free model.")}</p></div><small>{text("对话模型", "Chat model")}</small></div><div className="ng-release-quota-model"><MessageSquare /><div><strong>{freeModel}</strong><p>{text("适用于日常对话、文本生成等场景", "For everyday chat and text generation")}</p></div><small>{text("对话模型", "Chat model")}</small></div><div className="ng-release-quota-picker" data-release-quota-picker><header><Search /><span>{text("搜索 AI 模型", "Search AI models")}</span></header><small>NoteGen</small><div data-release-quota-option="limited" data-selected="true"><BotMessageSquare /><span>{model}<b>（{text(`剩余 ${percent}%`, `${percent}% remaining`)}）</b></span><Check /></div><div data-release-quota-option="free"><BotMessageSquare /><span>{freeModel}</span></div></div>{state === "exhausted" ? <div className="ng-release-quota-fallback" data-release-quota-fallback><Check /><span>{text(`额度用完后自动使用 ${freeModel}。`, `Automatically uses ${freeModel} when the allowance is exhausted.`)}</span></div> : null}</article></ReleasePane>
}

const quotaCss = `
.ng-release-quota-settings{padding:28px 36px}.ng-release-quota-settings h2{display:flex;align-items:center;gap:10px;font-size:28px;margin:0 0 12px;font-weight:600}.ng-release-quota-settings h2 svg{width:24px;height:24px}.ng-release-quota-settings>p{font-size:24px;line-height:1.7;color:var(--ng-r-dim);margin:0 0 24px}.ng-release-quota-model{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--ng-r-border);border-radius:9px;padding:16px;margin-top:12px}.ng-release-quota-model>svg{width:20px;height:20px;margin-top:4px;color:var(--ng-r-dim)}.ng-release-quota-model>div{flex:1;min-width:0}.ng-release-quota-model strong{font-size:24px;font-weight:600}.ng-release-quota-model strong>span{font-size:14px;color:var(--ng-r-dim);font-weight:400;margin-left:5px}.ng-release-quota-model p{font-size:14px;line-height:1.7;color:var(--ng-r-dim);margin:6px 0 0}.ng-release-quota-model>small{font-size:11px;padding:2px 6px;border-radius:5px;background:var(--ng-r-muted);white-space:nowrap}.ng-release-quota-picker{margin:24px auto 0;width:500px;border:1px solid var(--ng-r-border);border-radius:9px;overflow:hidden;background:var(--ng-r-popover);box-shadow:0 10px 30px #0004}.ng-release-quota-picker>header{height:36px;display:flex;align-items:center;gap:8px;padding:0 12px;border-bottom:1px solid var(--ng-r-border);font-size:14px;color:var(--ng-r-dim)}.ng-release-quota-picker>header svg{width:16px;height:16px}.ng-release-quota-picker>small{display:block;padding:8px 12px 4px;font-size:12px;color:var(--ng-r-dim)}.ng-release-quota-picker>div{display:flex;align-items:center;gap:8px;padding:11px 12px;margin:3px 5px;border-radius:5px;font-size:14px}.ng-release-quota-picker>div[data-selected="true"]{background:var(--ng-r-muted)}.ng-release-quota-picker>div>svg{width:16px;height:16px}.ng-release-quota-picker>div>svg:last-child{margin-left:auto}.ng-release-quota-picker b{font-size:12px;font-weight:400;color:var(--ng-r-dim)}.ng-release-quota-fallback{display:flex;gap:8px;align-items:center;margin-top:20px;font-size:24px;line-height:1.6}.ng-release-quota-fallback>svg{width:20px;height:20px;flex-shrink:0}
`
