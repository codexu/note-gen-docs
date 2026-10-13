import { AiHubMixLink } from "../aihubmix-link"
import { AIHUBMIX_SHARE_URL } from "@/src/config/providers"
import { Gem, MessageSquare, Move3D } from "lucide-react"
import type { NoteGenReplicaLanguage } from "../types"
import { modelSettingsCopy } from "./copy"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item"

export function DefaultModels({ lang }: { lang: NoteGenReplicaLanguage }) {
  const t = modelSettingsCopy(lang)
  // Fixed examples from the app's bundled model policy, not live usage quotas.
  const models = [
    { name: "GPT6 Luna", type: t("defaultModels.chatModel.type"), desc: lang === "en" ? "Up to 200 daily requests in this example; then uses Qwen3-8B." : "示例每日 200 次，超出后使用 Qwen3-8B。", icon: MessageSquare },
    { name: "Qwen3-8B", type: t("defaultModels.chatModel.type"), desc: t("defaultModels.chatModel.desc"), icon: MessageSquare },
    { name: t("defaultModels.embeddingModel.name"), type: t("defaultModels.embeddingModel.type"), desc: t("defaultModels.embeddingModel.desc"), icon: Move3D },
  ]
  return <Card className="relative mb-6"><CardHeader><CardTitle className="flex items-center gap-2"><Gem className="size-5" />{t("defaultModels.title")}</CardTitle><CardDescription>{t("defaultModels.desc").split("AIHubMix")[0]}<AiHubMixLink />{t("defaultModels.desc").split("AIHubMix")[1]}</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><ItemGroup className="grid gap-3 @min-[1024px]/model-settings:grid-cols-2">{models.map(model => <Item key={model.name} variant="outline"><ItemMedia variant="icon"><model.icon /></ItemMedia><ItemContent><ItemTitle>{model.name}</ItemTitle><ItemDescription className="line-clamp-none">{model.desc}</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">{model.type}</Badge></ItemActions></Item>)}</ItemGroup><a href="https://cloud.siliconflow.cn/i/O2ciJeZw" target="_blank" rel="noopener noreferrer" className="w-fit"><img src="https://s2.loli.net/2025/09/10/gVhlriQ81PJabSY.png" alt="SiliconFlow" className="h-10 w-auto object-contain dark:hidden" /><img src="https://s2.loli.net/2025/09/10/KWPOA5XhIGmYTV9.png" alt="SiliconFlow" className="hidden h-10 w-auto object-contain dark:block" /></a><a href={AIHUBMIX_SHARE_URL} target="_self" rel="noopener noreferrer" className="w-fit"><img src="https://aihubmix.com/brand/light.svg" alt="AIHubMix" className="h-10 w-auto object-contain dark:hidden" /><img src="https://aihubmix.com/brand/dark.svg" alt="AIHubMix" className="hidden h-10 w-auto object-contain dark:block" /></a></CardContent></Card>
}
