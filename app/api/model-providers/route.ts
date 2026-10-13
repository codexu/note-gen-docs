import { NextResponse } from "next/server"
import { providerManifestURL, type ProviderTemplate } from "@/components/notegen/model-settings/types"

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function string(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function url(value: unknown, protocols = ["https:", "http:"]) {
  const candidate = string(value)
  if (!candidate) return undefined
  try {
    return protocols.includes(new URL(candidate).protocol) ? candidate : undefined
  } catch {
    return undefined
  }
}

async function readJSON(address: string): Promise<unknown> {
  const response = await fetch(address, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(5000),
    redirect: "error",
  })
  if (!response.ok) throw new Error(`Config center returned ${response.status}`)
  return response.json()
}

export async function GET() {
  try {
    const manifest = await readJSON(providerManifestURL)
    if (!isRecord(manifest) || manifest.schemaVersion !== 1 || !isRecord(manifest.configs)) {
      throw new Error("Invalid config manifest")
    }
    // Match the desktop app. The China list is for the mainland App Store,
    // not for the Chinese language setting.
    const entry = manifest.configs.providerTemplates
    if (!isRecord(entry) || typeof entry.versionCode !== "number" || !Number.isFinite(entry.versionCode) || entry.versionCode < 0) {
      throw new Error("Missing provider template entry")
    }
    const sourceURL = url(entry.url, ["https:"])
    if (!sourceURL || new URL(sourceURL).origin !== "https://download.notegen.top") {
      throw new Error("Invalid provider CDN address")
    }
    let payload = await readJSON(sourceURL)
    if (typeof payload === "string") payload = JSON.parse(payload)
    if (!isRecord(payload) || !Array.isArray(payload.providers)) throw new Error("Invalid provider payload")
    const providers: ProviderTemplate[] = []
    for (const value of payload.providers) {
      if (!isRecord(value) || value.enabled === false) continue
      const key = string(value.key)
      const title = string(value.title)
      const baseURL = url(value.baseURL)
      if (!key || !title || !baseURL || providers.some(provider => provider.key === key)) continue
      providers.push({ key, title, baseURL, icon: url(value.icon, ["https:"]), apiKeyUrl: url(value.apiKeyUrl), sponsored: value.sponsored === true, promotion: string(value.promotion) })
    }
    if (!providers.length) throw new Error("Empty provider templates")
    return NextResponse.json({ versionCode: entry.versionCode, sourceURL, providers }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    })
  } catch (error) {
    console.warn("[model-providers] Unable to read config center", error)
    return NextResponse.json({ error: "Provider templates are temporarily unavailable" }, {
      status: 502, headers: { "Cache-Control": "no-store" },
    })
  }
}
