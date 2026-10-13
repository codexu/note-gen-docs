export type ModelType = "chat" | "tts" | "stt" | "embedding" | "rerank"

export interface ProviderTemplate {
  key: string
  title: string
  baseURL: string
  icon?: string
  apiKeyUrl?: string
  sponsored?: boolean
  promotion?: string
}

export interface DemoModel {
  id: string
  model: string
  modelType: ModelType
  temperature?: number
  topP?: number
  enableStream?: boolean
  maxTokens?: number
  contextWindow?: number
  tokenLimitParam?: "max_completion_tokens" | "max_tokens"
  voice?: string
}

export interface DemoProvider extends ProviderTemplate {
  templateKey?: string
  custom?: boolean
  apiKey: string
  proxyMode: "inherit" | "direct" | "custom"
  proxyURL?: string
  headers: Array<{ id: string; key: string; value: string }>
  models: DemoModel[]
}

export interface ProviderTemplateResponse {
  versionCode: number
  sourceURL: string
  providers: ProviderTemplate[]
}

export const providerManifestURL = "https://download.notegen.top/config/v1/config-manifest.json"
