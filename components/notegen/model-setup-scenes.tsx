"use client"

import { useState } from "react"
import { BotMessageSquare, Check, Search } from "lucide-react"
import { NoteGenChatExampleReplica } from "@/components/home/notegen-desktop-replica"
import { NoteGenProviderListReplica, NoteGenConnectionFormReplica, NoteGenModelCardReplica, NoteGenConnectionTestReplica } from "./model-settings-replica"
import { NoteGenKnowledgeModelPickerReplica } from "./knowledge-replica"
import { AiHubMixLink } from "./aihubmix-link"
import { TutorialLegend, TutorialMarker } from "./tutorial-marker"
import { Button } from "./model-settings/ui/button"
import { Input } from "./model-settings/ui/input"
import { NoteGenEditorAISelectionReplica } from "./editor-ai-selection-replica"
import type { DemoModel, DemoProvider } from "./model-settings/types"
import type { NoteGenReplicaLanguage } from "./types"

export { NoteGenEditorAISelectionReplica } from "./editor-ai-selection-replica"

export type NoteGenModelSetupStep = "platform" | "connection" | "chat-model" | "connection-test" | "select-chat" | "chat-reply" | "editor" | "embedding" | "rerank" | "knowledge-models"

const chatModel: DemoModel = { id: "setup-chat", model: "gpt-5.6-terra", modelType: "chat", temperature: 0.7, topP: 1, enableStream: true }
const embeddingModel: DemoModel = { id: "setup-embedding", model: "text-embedding-3-small", modelType: "embedding" }
const rerankModel: DemoModel = { id: "setup-rerank", model: "qwen3-reranker-0.6b", modelType: "rerank" }

function provider(models: DemoModel[], apiKey = "sk-notegen-demo-key"): DemoProvider {
  return { key: "setup-aihubmix", templateKey: "aihubmix", title: "AIHubMix", baseURL: "https://aihubmix.com/v1", apiKey, proxyMode: "inherit", headers: [], models }
}

export function NoteGenChatModelPickerReplica({ lang = "cn" }: { lang?: NoteGenReplicaLanguage }) {
  const [open, setOpen] = useState(true)
  const [query, setQuery] = useState("")
  const en = lang === "en"
  return <div className="ng-model-settings rounded-xl border bg-background p-4 text-foreground">
    {open ? <div className="overflow-hidden rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
      <div className="flex h-9 items-center gap-2 border-b px-3"><Search className="size-4 text-muted-foreground" /><Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" aria-label={en ? "Search models" : "搜索模型"} placeholder={en ? "Search models…" : "搜索模型……"} value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="p-1"><div className="px-2 py-1.5 text-xs text-muted-foreground"><AiHubMixLink /></div>{chatModel.model.includes(query.trim()) ? <Button variant="ghost" className="w-full justify-between border border-primary/30 font-medium" onClick={() => setOpen(false)}><TutorialMarker number={2}>{chatModel.model}</TutorialMarker><Check /></Button> : <p className="p-3 text-sm text-muted-foreground">{en ? "No models found" : "没有找到模型"}</p>}</div>
    </div> : null}
    <div className="mt-4 flex justify-end border-t pt-2"><Button variant="ghost" size="xs" className="h-7 gap-1 px-1 text-xs font-normal text-muted-foreground" aria-label={en ? "Select chat model" : "选择对话模型"} aria-expanded={open} onClick={() => setOpen(value => !value)}><TutorialMarker number={1} /><BotMessageSquare data-icon="inline-start" />{chatModel.model}</Button></div>
  </div>
}

const legends: Record<NoteGenModelSetupStep, { cn: string[]; en: string[] }> = {
  platform: { cn: ["点击已标出的平台行选择平台；点击平台名称可访问分享链接。"], en: ["Select the marked platform row; the provider name opens the referral link."] },
  connection: { cn: ["API 地址填到 /v1。", "填入平台创建的 API Key。", "选择网络代理方式。"], en: ["End the Base URL at /v1.", "Enter the provider's API key.", "Choose the proxy mode."] },
  "chat-model": { cn: ["填写模型 ID。", "选择“对话”类型。", "检测当前模型的连接。", "需要更多模型时点击“添加模型”。"], en: ["Enter the model ID.", "Choose Chat.", "Test the model connection.", "Use Add model for additional models."] },
  "connection-test": { cn: ["点击“检测连接”。", "查看连接测试结果；这里展示模拟成功。"], en: ["Click Test connection.", "Read the result; this is a simulated success."] },
  "select-chat": { cn: ["点击底部状态栏的模型名称打开选择器。", "选择已配置的对话模型。"], en: ["Open the selector from the bottom status bar.", "Select your configured chat model."] },
  "chat-reply": { cn: ["发送一条简单消息。", "收到回复后确认配置成功。"], en: ["Send a short message.", "Confirm the setup by reading the reply."] },
  editor: { cn: ["在编辑器中选中一段文字。", "点击浮动工具栏中的 AI。", "选择润色、精简或扩展等操作。"], en: ["Select text in the editor.", "Open AI in the floating toolbar.", "Choose Polish, Concise, or Expand."] },
  embedding: { cn: ["填写嵌入模型 ID。", "模型类型选择“嵌入”。", "检测嵌入模型连接。", "需要新模型时点击“添加模型”。"], en: ["Enter the embedding model ID.", "Choose Embedding.", "Test the embedding model.", "Use Add model to add another model."] },
  rerank: { cn: ["填写重排模型 ID。", "模型类型选择“重排序”。", "检测重排模型连接。", "需要新模型时点击“添加模型”。"], en: ["Enter the reranking model ID.", "Choose Rerank.", "Test the reranking model.", "Use Add model to add another model."] },
  "knowledge-models": { cn: ["在知识库中选择已添加的嵌入模型。", "需要重排时，选择已添加的重排模型。"], en: ["Select the embedding model in Knowledge Base.", "Select the optional reranker."] },
}

export function NoteGenModelSetupScene({ lang = "cn", step }: { lang?: NoteGenReplicaLanguage; step: NoteGenModelSetupStep }) {
  let content
  if (step === "select-chat") content = <NoteGenChatModelPickerReplica lang={lang} />
  else if (step === "chat-reply") content = <NoteGenChatExampleReplica lang={lang} question={<TutorialMarker number={1}>{lang === "en" ? "Describe Markdown in one sentence." : "请用一句话介绍 Markdown。"}</TutorialMarker>} answer={<TutorialMarker number={2}>{lang === "en" ? "Markdown is a lightweight markup language that formats text using simple symbols." : "Markdown 是一种使用简单符号为文本添加格式的轻量级标记语言。"}</TutorialMarker>} />
  else if (step === "editor") content = <NoteGenEditorAISelectionReplica lang={lang} />
  else if (step === "knowledge-models") content = <NoteGenKnowledgeModelPickerReplica lang={lang} embeddingLabel={embeddingModel.model} rerankLabel={rerankModel.model} />
  else {
    const model = step === "embedding" ? embeddingModel : step === "rerank" ? rerankModel : chatModel
    const common = { lang, tutorialMarks: true, initialProviders: [provider(step === "platform" || step === "connection" ? [] : [model], step === "platform" ? "" : "sk-notegen-demo-key")] }
    if (step === "platform") content = <NoteGenProviderListReplica {...common} />
    else if (step === "connection") content = <NoteGenConnectionFormReplica {...common} />
    else if (step === "connection-test") content = <NoteGenConnectionTestReplica {...common} initialCheckState="ok" initialNotice={lang === "en" ? "Simulated result: AI connection test passed" : "模拟结果：AI 连接测试通过"} />
    else content = <NoteGenModelCardReplica {...common} initialExpandedModels={[model.id]} />
  }
  return <div className={`mx-auto w-full ${step === "platform" || step === "select-chat" || step === "chat-reply" ? "max-w-[440px]" : "max-w-[720px]"}`} data-model-setup-scene={step}>{content}<TutorialLegend items={legends[step][lang]} /></div>
}
