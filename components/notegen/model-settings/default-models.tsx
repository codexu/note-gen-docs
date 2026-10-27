import { AiHubMixLink } from "../aihubmix-link"
import { AIHUBMIX_SHARE_URL } from "@/src/config/providers"
import { Gem, MessageSquare, Move3D } from "lucide-react"
import type { NoteGenReplicaLanguage } from "../types"
import { modelSettingsCopy } from "./copy"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item"

export interface NoteGenDefaultModelsExampleProps {
  lang: NoteGenReplicaLanguage
  limitedModelName?: string
  freeModelName?: string
  remainingPercent?: number
  dailyTokenLimit?: number
  /** Explicit historical examples only; current examples use token allowances. */
  legacyDailyRequestLimit?: number
}

export function DefaultModels({ lang, limitedModelName = "GPT6 Luna", freeModelName = "Qwen3-8B", remainingPercent, dailyTokenLimit, legacyDailyRequestLimit }: NoteGenDefaultModelsExampleProps) {
  const t = modelSettingsCopy(lang)
  // Fixed examples from the app's bundled model policy, not live usage quotas.
  const percent = remainingPercent === undefined ? undefined : Math.max(0, Math.min(100, Math.floor(remainingPercent)))
  const limitedName = percent === undefined ? limitedModelName : `${percent === 0 ? freeModelName : limitedModelName}（${lang === "en" ? `${percent}% remaining` : `剩余 ${percent}%`}）`
  const tokenDescription = lang === "en"
    ? `Sponsored paid models share ${dailyTokenLimit === undefined ? "a daily token allowance" : `${dailyTokenLimit} tokens per day`}; then use ${freeModelName}.`
    : `付费赞助模型${dailyTokenLimit === undefined ? "按 Token 共用每日额度" : `每天共用 ${dailyTokenLimit} Token` }；用完后使用 ${freeModelName}。`
  const models = [
    { name: limitedName, type: t("defaultModels.chatModel.type"), desc: legacyDailyRequestLimit === undefined ? tokenDescription : lang === "en" ? `Historical example: ${legacyDailyRequestLimit} daily requests; then uses ${freeModelName}.` : `历史示例每日 ${legacyDailyRequestLimit} 次，超出后使用 ${freeModelName}。`, icon: MessageSquare },
    { name: freeModelName, type: t("defaultModels.chatModel.type"), desc: t("defaultModels.chatModel.desc"), icon: MessageSquare },
    { name: t("defaultModels.embeddingModel.name"), type: t("defaultModels.embeddingModel.type"), desc: t("defaultModels.embeddingModel.desc"), icon: Move3D },
  ]
  return <Card className="relative mb-6"><CardHeader><CardTitle className="flex items-center gap-2"><Gem className="size-5" />{t("defaultModels.title")}</CardTitle><CardDescription>{t("defaultModels.desc").split("AIHubMix")[0]}<AiHubMixLink />{t("defaultModels.desc").split("AIHubMix")[1]}</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><ItemGroup className="grid gap-3 @min-[1024px]/model-settings:grid-cols-2">{models.map(model => <Item key={model.name} variant="outline"><ItemMedia variant="icon"><model.icon /></ItemMedia><ItemContent><ItemTitle>{model.name}</ItemTitle><ItemDescription className="line-clamp-none">{model.desc}</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">{model.type}</Badge></ItemActions></Item>)}</ItemGroup><a href="https://cloud.siliconflow.cn/i/O2ciJeZw" target="_blank" rel="noopener noreferrer" className="w-fit"><img src="https://s2.loli.net/2025/09/10/gVhlriQ81PJabSY.png" alt="SiliconFlow" className="h-10 w-auto object-contain dark:hidden" /><img src="https://s2.loli.net/2025/09/10/KWPOA5XhIGmYTV9.png" alt="SiliconFlow" className="hidden h-10 w-auto object-contain dark:block" /></a><a href={AIHUBMIX_SHARE_URL} target="_self" rel="noopener noreferrer" className="w-fit"><img src="https://aihubmix.com/brand/light.svg" alt="AIHubMix" className="h-10 w-auto object-contain dark:hidden" /><img src="https://aihubmix.com/brand/dark.svg" alt="AIHubMix" className="hidden h-10 w-auto object-contain dark:block" /></a></CardContent></Card>
}
