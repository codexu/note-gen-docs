"use client"

import { NoteGenPluginSettings } from "./plugin-settings-replica"
import { NoteGenReplicaFrame } from "./replica-primitives"
import type { NoteGenPluginFixture, NoteGenPluginSettingsProps } from "./plugin-settings-types"
import type { NoteGenReplicaLanguage } from "./types"

export type NoteGenPluginSettingsScene = "installed" | "empty" | "loading" | "initialization-error" | "market" | "market-loading" | "market-error" | "stale" | "incompatible" | "permissions" | "install-review" | "enabling" | "failure" | "revoked" | "updates" | "developer" | "mobile"

export function noteGenPluginFixture(lang: NoteGenReplicaLanguage = "cn"): NoteGenPluginFixture {
  const en = lang === "en"
  return { id: "example.daily-notes", name: en ? "Daily notes" : "每日笔记", description: en ? "Create a dated note in a workspace folder." : "在工作区目录中创建日期笔记。", author: "Example author", version: "1.0.0", latestVersion: "1.1.0", previousVersion: "0.9.0", source: "marketplace", verified: true, enablement: "workspace", runtime: "active", permissions: [{ id: "notes.create", description: en ? "Create notes in the selected folder." : "在选定目录中创建笔记。", scope: "workspace-paths", paths: "daily", granted: true }, { id: "network.fetch", description: en ? "Optional remote content." : "可选的远程内容。", scope: "network-origins", paths: "https://example.com", optional: true, granted: false }], settings: [{ key: "prefix", title: en ? "Filename prefix" : "文件名前缀", description: en ? "Prepended to new note names." : "添加在新笔记文件名前。", type: "string", value: "Daily", scope: "workspace" }, { key: "open", title: en ? "Open after creation" : "创建后打开", type: "boolean", value: true, scope: "workspace" }, { key: "count", title: en ? "Recent notes" : "最近笔记数量", type: "number", value: 5, scope: "device" }], displays: [{ id: "status", title: en ? "Show in status bar" : "在状态栏显示", visible: true }] }
}

export function NoteGenPluginSettingsScene({ lang = "cn", scene = "installed", height = 680 }: { lang?: NoteGenReplicaLanguage; scene?: NoteGenPluginSettingsScene; height?: number }) {
  const en = lang === "en"
  const plugin = noteGenPluginFixture(lang)
  if (["permissions", "enabling"].includes(scene)) { plugin.needsReview = true; plugin.enablement = "disabled" }
  if (scene === "failure") { plugin.runtime = "failed"; plugin.failure = { code: "VIEW_LOAD_FAILED", message: en ? "The view could not be loaded." : "无法加载插件视图。", count: 2 } }
  if (scene === "revoked") plugin.revoked = en ? "Publisher withdrew this release." : "发布者撤回了此版本。"
  if (scene === "incompatible") { plugin.compatible = false; plugin.minAppVersion = "0.40.0" }
  if (scene === "developer") { plugin.source = "development"; plugin.developmentPath = "/workspace/plugins/daily-notes" }
  const market = ["market", "market-loading", "market-error", "stale", "incompatible", "install-review"].includes(scene)
  const props: NoteGenPluginSettingsProps = {
    lang,
    plugins: scene === "empty" || market ? [] : [plugin], catalog: scene === "market-loading" || scene === "market-error" ? [] : [plugin],
    defaultTab: market ? "market" : scene === "updates" ? "updates" : scene === "developer" ? "developer" : "installed",
    status: scene === "loading" ? "loading" : scene === "initialization-error" ? "error" : "ready",
    error: en ? "The plugin catalog could not be initialized." : "无法初始化插件目录。",
    marketState: scene === "market-loading" ? "loading" : scene === "market-error" ? "error" : scene === "stale" ? "stale" : "ready",
    marketError: en ? "The catalog is temporarily unavailable." : "暂时无法获取插件目录。",
    defaultExpanded: ["installed", "failure", "revoked"].includes(scene) ? [plugin.id] : [],
    reviewPluginId: ["permissions", "enabling", "install-review"].includes(scene) ? plugin.id : undefined,
    reviewMode: scene === "install-review" ? "install" : "permissions",
    busyPluginId: scene === "enabling" ? plugin.id : undefined,
    developerMode: scene === "developer", platform: scene === "mobile" ? "mobile" : "desktop",
    logs: [{ id: "log-1", time: "10:28:00", plugin: plugin.id, level: "error", message: en ? "Unable to load a declared view." : "无法加载声明的视图。" }],
  }
  return <div style={{ height }}><NoteGenReplicaFrame fill><NoteGenPluginSettings key={`${lang}-${scene}`} {...props} /></NoteGenReplicaFrame></div>
}
