# NoteGen replica components

This folder contains style-only, code-native replicas for documentation and marketing pages. They do not connect to NoteGen stores, Tauri, databases, file APIs, or AI services.

## Component families

- `app-shell-replica`: platform window controls, capture toolbar, panel handle, app shell, and the unified full-width PC status bar.
- `record-replica`: tag chips, capture filters, list items, audio waveform, sidebar, and detail view.
- `tag-management-replica`: the vertical tag-tree/record-list layout with nested paths, deduplicated descendant counts, selection, resizing/collapse, context actions, and local create/rename/delete dialogs. Desktop scenes and record previews share this implementation; the old chip export remains available for compatibility.
- `file-editor-replica`: file tree, tabs, editor toolbar, bubble menu, and document page.
- `agent-replica`: message bubbles, thinking block, tool calls, execution timeline, context tray, and composer.
- `context-usage-replica`: the PC composer context ring, capacity visibility conditions, caller-controlled tooltip and manual compaction callback. No AI requests or independent animation clock.
- `canvas-replica`: project cards, canvas tools, nodes, edges, and grid.
- `canvas-chart-replica`: controlled 1360×720 PC note-to-chart workspace, current chart creation panel, note selection tree, six-type menu, loading, editable JSON, bar/line results, appearance and export menus. `NoteGenChartWorkspace` receives `state`, `note` and `chart`; all values are fixed demo data, without AI or file calls. / 受控的笔记转图表工作台，包含创建、引用笔记、类型菜单、加载、JSON 编辑、柱图/折线、外观和导出状态。`state.editing` 保留编辑类型菜单，`editSource` 接受应用回填的对象数组 JSON，`loadingRotation` 由影片时间轴控制。新增 `note-canvas-ready/dragging/generating/embedded` 阶段，表现从左侧画布卡片拖到所见即所得笔记、生成并插入静态图片；`state.drag` 控制幽灵卡片坐标与透明度，`noteScroll` 控制笔记滚动，`canvasImage` 可提供真实导出图片及相对路径，未提供时用同数据的静态 SVG 复刻 PNG 外观。插图不自动同步原画布。`data-chart-target` 提供面板及操作定位；画廊保留固定状态。
- `settings-replica`: reusable setting rows plus all current NoteGen settings categories and dialog presentation.
- `mobile-replica`: phone frame, status bar, dock, capture, Agent, writing, and settings screens.
- `feedback-replica`: global search, recording, sync states, image viewer, confirmation, and activity heatmap.
- `organize-notes-replica`: interactive three-step record organization dialog for the Record documentation.
- `sync-release-replica`: controlled provider-switch review/confirmation/progress/recovery scenes, workspace-to-repository binding, and the current-document sync menu.
- `plugin-code-block-replica`: DOT source, an enabled Graphviz renderer's fixed SVG example, and conditional PNG/SVG/JPEG export menus.
- `record-capture-replica`: text capture, inline new-tag entry, selected tag, quick-capture tag continuity, and saved-record fixtures.
- `file-tree-release-replica`: folder/root expansion menus, expanded/collapsed trees, deletion progress and retained failures.
- `sponsored-quota-replica`: model-service and model-picker examples with caller-supplied remaining percentages.
- `editor-review-release-replica`: a long document, formatted AI edit preview, supplied typeset formula, and document-switch fixture.

Import every public component from `@/components/notegen`. Display-state props change the rendered appearance; interactive scenes simulate local state without implementing connected product behavior.

### v0.39.0 扩展状态与来源（2026-10-25）

新增扩展均复用 `ReleasePane`，自然宽 900px、默认高 740px，自带限定作用域的 CSS。主示例正文 24–26px，菜单与小型控件保留自然字号；外部时间轴控制显示、滚动与镜头。中文和英文使用同一组件的 `lang` 分支。所有示例内容和计数固定，不触发平台切换、同步、标签创建、插件安装、AI、导出或删除。

本次功能事实来自发布标签 `note-gen-v0.39.0`，并只读对照当前应用源码。应用工作区在扩展审计时已有大量 UI import、同步面板和样式等未提交变化，这些没有计入已发布功能。既有官网未提交修改均保留。具体差异、来源与视觉核对边界见 [release-update-audit.md](./release-update-audit.md)。

| 导出与接口 | 固定状态与数据 |
| --- | --- |
| `NoteGenSyncSwitchReplica` | `state="review" | "confirm" | "progress" | "running" | "error" | "recovery" | "completed"`；`origin/target/workspaceName`、`strategy="merge" | "local" | "remote"`、`resolution="local" | "remote" | "both"`、`modules: NoteGenSyncModuleRow[]`、冲突两侧文本、固定进度和 `mutated`。模拟步骤为检查→差异→备份→同步→核验；中断状态显示重新扫描并重试，不伪造自动全部回滚。 |
| `NoteGenWorkspaceRepoReplica` | `state="unbound" | "pending" | "confirm" | "bound"`；`workspaceName/workspacePath/repo/isDefault`。默认演示非默认工作区，只说明同步该工作区笔记文件。 |
| `NoteGenDocumentSyncReplica` | `state="panel" | "menu" | "syncing" | "synced"`；`fileName/provider`。当前文档卡片、同步当前文档，以及更多菜单中的上传当前内容/获取远端版本。 |
| `NoteGenPluginCodeBlockReplica` | `state="source" | "preview" | "export-menu" | "exported"`；`language/rendererName/source/preview`、`svgAvailable`。默认代码绘制的固定 DOT/SVG 示例；`preview` 可注入外部准备好的静态结果。菜单 PNG→SVG→JPEG；SVG 仅当渲染结果为 SVG 时启用。 |
| `NoteGenRecordCaptureReplica` | `state="capture" | "tag-create" | "tag-selected" | "quick-capture" | "saved"`；`text/tagName/tags`。对应创建表单里的「保存到/新建标签」与快捷窗口，不替代既有记录的多标签管理。 |
| `NoteGenFileTreeReleaseReplica` | `state="folder-menu" | "expanded" | "root-menu" | "collapsed" | "deleting" | "delete-partial" | "deleted"`；`entries/selectedFolder`。文件夹展开/折叠与全局全部展开/全部折叠；删除失败保留并选中原条目，重试由再次执行删除表现。源码没有独立结果重试按钮。 |
| `NoteGenSponsoredQuotaReplica` | `state="available" | "exhausted"`；`limitedModel/freeModel/remainingPercent`。本期使用 `available` 的 72% 固定示例。仅本机收到的实际输入/输出 Token 计入显示百分比；免费 fallback 使用产品已有说明表达，本片不展示 0% 耗尽状态。 |
| `NoteGenDefaultModelsReplica` | 兼容原 `DefaultModels({lang})`；可选 `limitedModelName/freeModelName/remainingPercent/dailyTokenLimit`。默认文案已从每日请求次数改为共用 Token 额度；历史示例须显式传 `legacyDailyRequestLimit`。 |
| `NoteGenEditorReviewReleaseReplica` | `state="long-document" | "ai-preview" | "document-switched"`；`formula?: ReactNode` 注入静态排好的公式。长文档只展示内容与滚动，不伪造性能倍率；AI 修改预览保留标题、列表、表格和公式结构。 |

定位标记：同步使用 `data-release-sync-strategy/resolution/action/module/count`、`data-release-sync-differences/conflict/impact/progress/recovery/complete/acknowledge`；绑定使用 `data-release-repo-binding/input/confirm/action/result`；文档同步使用 `data-release-document-sync-launcher/panel/menu/action/loader`。插件使用 `data-release-code-action/source/preview/export-menu/format/export-result`；记录使用 `data-release-record-action/tag-target/tag-input/tag-menu/tag-option/saved/result`；目录使用 `data-release-file-tree-menu/action/row`、`data-release-file-delete-progress/result/failed/retry-target`；额度使用 `data-release-quota-model/percent/picker/option/fallback`。长文档与编辑预览使用其组件中的 `data-release-long-scroll/long-section/ai-preview/preview-formula`。加载图标由影片时间轴旋转。

固定场景均加入画廊 `#release-details`。人工验收顺序：自然宽 900×740 深色中文→切换英文→菜单边缘与禁用态→状态前后资料一致→24–26px 正文与原尺寸控件→镜头放大后裁切、指针落点与字幕遮挡。本次没有运行测试、Lint、类型检查、构建或官网服务器；组件完成仅代表源码实现，视觉结论以影片捕获后的逐帧核对为准。

Code-native NoteGen interface replicas for documentation and marketing pages. Import from `@/components/notegen` when composing a complete scene, or import a specific file when the component is used inside the replica implementation.

```tsx
import {
  NoteGenReplicaFrame,
  NoteGenSettingsPage,
  NoteGenSettingsSection,
  NoteGenSettingRow,
  NoteGenSettingsReplica,
  NoteGenWindowTitleBar,
} from "@/components/notegen"
```

The exports are organized by composition level:

- `NoteGenReplicaFrame`, `NoteGenReplicaPanel`, `NoteGenReplicaToolbar`, and `NoteGenReplicaIconButton` are the visual primitives.
- `NoteGenWindowTitleBar`, `NoteGenWorkspaceSwitcher`, and `NoteGenMainStatusBar` reproduce shared app chrome. PC workspace replicas expose one status bar across the full window instead of separate panel footers.
- `NoteGenAppTitleBar` is a compatibility wrapper around `NoteGenWindowTitleBar`. Both use the same seven-tool capture toolbar and platform window controls (`platform="mac" | "windows" | "linux"`). Full title bars accept panel visibility, pinning, update state, and left/center/right extension slots. Controls without a supplied callback are disabled display examples.
- `NoteGenWorkspaceSidebar` combines the workspace switcher, action slot, and content container used by the complete desktop scene.
- `NoteGenUnifiedSyncIndicator` reproduces the separate dot at the start of the status bar. Its `state` supports `local`, `not-configured`, `unavailable`, `checking`, `ready`, `syncing`, `failed`, and `synced`; the default is local storage. The footer accepts `workspaceName`, `pluginSlot`, `modelLabel`, `promptLabel`, and `recentSyncActivity` for fixed scenes. Footer controls are visual displays, not service connections.
- The desktop scene accepts `platform`, `hasUpdate`, and `statusBarProps`. Panel visibility and pinning are local demonstration state; `panelLayout` still chooses the initial layout and updates it when the prop changes. Hiding the last panel or leaving only the left sidebar is prevented; an explicitly requested `panelLayout="left"` preview remains supported.
- `NoteGenSettingsShell`, `NoteGenSettingsSidebar`, `NoteGenSettingsPage`, `NoteGenSettingsSection`, and `NoteGenSettingRow` can be combined into custom settings scenes.
- `NoteGenSettingSwitch`, `NoteGenSettingSelect`, and `NoteGenSettingSegmentedControl` reproduce individual settings controls.
- `NoteGenDesktopReplica` and `NoteGenSettingsReplica` are ready-made scenes.

Use `lang="cn"` or `lang="en"` for ready-made scenes. Lower-level components receive their visible copy as props, so documentation pages remain responsible for localized content.

`NoteGenTagManagementReplica` receives `initialTags` (full paths with optional `locked`), `initialRecords` (stable IDs plus `tagPaths`), and `initialSelectedPath`. Use `initialCollapsed` to start with the tree collapsed. Its children render function receives the matching records and selected path. Supply a changed React key to reset the local demonstration; `createRequest` opens root-tag creation when its counter increments. `NoteGenDesktopReplica` record items can provide optional `tagPaths` for custom scenes; simplified homepage scenes hide record tag badges and initially collapse the tree. Paths, memberships, ordering, and counts change only inside the preview; they never persist to NoteGen.

## Use in MDX documentation

`NoteGenDocPreview` is registered globally in `mdx-components.tsx`, so documentation pages do not need local imports. It keeps desktop replicas readable on narrow screens and provides consistent spacing for desktop, mobile, settings, activity, and sync-state scenes. Feature previews for Records, Writing, and Canvas use the list plus workspace layout without the unrelated chat panel. Settings documentation renders only the selected settings detail; the category sidebar remains available in the complete settings replica.

```mdx
<NoteGenDocPreview kind="desktop-writing" lang="en" label="Desktop writing workspace" />
<NoteGenDocPreview kind="desktop-canvas" lang="en" label="Desktop canvas workspace" />
<NoteGenDocPreview kind="mobile" screen="capture" lang="en" label="Mobile capture screen" />
<NoteGenDocPreview kind="settings" section="rag" lang="en" label="Knowledge Base settings" />
```

Use a code-native replica for product UI that already has a matching component. Keep raster images for content that cannot be represented by the replica kit, such as imported user media or platform-owned interfaces.
# Skill Agent 场景

`NoteGenSkillAgentWorkspace` 通过 `states` 和 `documents` 注入固定示例数据，按自然尺寸 1360×720 组合现有标题栏、工作区侧栏、编辑器和 Agent。`NoteGenSkillInstallApproval` 展示第三方来源、固定版本、安装范围，以及生成包的指令；不接入实际搜索或安装。中英文文案由 `lang` 控制，示例数据由调用方提供。

来源：2026-10-02 的应用 `tool-registry.ts`、`agent-approval-panel.tsx`、`chat-input.tsx`、`chat-header.tsx` 及 `skills/creator.ts`。源码对照完成，未作当前应用截图的像素核验。画廊增加安装确认固定状态；视频的状态切换、指示点、字幕和镜头仅在各期工程编排。

本期 Skill Agent 工作台已按 2026-10-02 用户提供的 macOS 浅色实机截图修正几何：三栏 24% / 51.4% / 24.6%，统一 48px 二级工具栏，完整文件操作和编辑器标签栏，当前文件上下文附件、修改前确认和 Send 输入框；用户气泡采用边框，工具记录采用紧凑 Marker 结构。支持 theme、conversationTitle、conversationCount、characterCount props；影片保持深色，未声称不同主题和窗口下像素一致。长对话使用容器原生滚动。

第二轮修订：空白对话由共享 NoteGenChatEmpty 展示网格/渐隐、快捷提示和可选最近对话；Skill 工作台支持显式 sending 或工具运行状态推导停止方块。默认不显示工具栏快捷键编号。同步状态灯具有独立自然尺寸与状态颜色，静态快照可见。

技能设置按用户实机截图与 skills-settings/skill-card/project-skills-list/global-skills-manager 源码复刻：NoteGenSkillsSettings 为带数据 props 的工作区/全局技能视图；NoteGenSkillsSettingsDialog 复用设置侧栏和外壳，提供关闭入口、数量、卡片、启用开关及删除图标，展示状态不执行安装或删除。现有设置内容的 skills 分类也引用此视图。

设置滚动条统一维护于 settings-scrollbar.ts，使用应用 globals.css 的轨道、圆角及透明度规则。侧栏使用可见覆盖滑块，官网根据滚动位置更新；视频静态快照保留当前固定视口的初始滑块比例。

`NoteGenSkillCandidateChoice` 复刻 AgentQuestionPanel 的单选卡片；候选名称、说明、来源和选中状态由调用方注入，点击仅调用 onSelect。单选后直接回复，不增设安装审批按钮；实际安装仍单独确认。

### MCP 本机访问 / Local MCP access

`NoteGenMcpAccessSettings` 与 `NoteGenMcpSettingsDialog`：访问 NoteGen Tab、停止/运行/配置弹窗/异常状态。展示数据及回调，不连接真实服务。以 2026-10-02 应用源码及用户设置截图为依据。 / Display-only local MCP settings and connection dialog; no real service calls.

`NoteGenMcpRecordWorkspace`：本期记录列表、标签、文本详情与完整桌面布局；示例数据由调用方传入。 / Data-driven text record scene in the full desktop workspace.

### 知识库复刻

`NoteGenKnowledgeSettingsDialog` 提供检索模型、索引规模、来源类型、自动检索策略、排除路径及高级参数的固定展示；`NoteGenKnowledgeSources` 提供 Agent 参考来源及原文展开状态。所有数值为调用方提供的模拟数据，无模型或数据库调用。`NoteGenSkillAgentWorkspace` 新增可选 `fileNames`、`attachCurrentDocument` 和知识来源状态字段，原有默认行为保留。

### 记忆管理（2026-10-02）

`NoteGenMemoriesSettings` / `NoteGenMemoriesSettingsDialog` 为 PC 设置页展示复刻。通过 props 提供条目、状态页签、搜索、类型/范围筛选、自动生成开关、添加/编辑/永久删除弹窗、选择菜单和结果提示。数据不接入真实数据库；`onAction` 由使用场景处理。画廊提供固定状态。依据应用 `3144e326` 的 memories 页面与组件；已完成源码对照，尚无同状态实机截图对照。

### 模型配置复刻（2026-10-13）

`NoteGenModelSettingsReplica` 现在接入 `settings-replica.tsx` 的 AI 分类，中英文 MDX、设置窗口与组件画廊共用。默认展示 AIHubMix 的固定演示密钥与两个模型。平台列表通过 `/api/model-providers` 读取 NoteGen 真实 CDN manifest，再读取 `providerTemplates` 指向的数据；图标、名称、服务地址、创建密钥链接、赞助与推广信息取自远端。中文页面仍使用桌面版列表，`providerTemplatesChina` 只对应大陆 App Store 渠道，不按页面语言选择。

公开 props：`lang`、`initialTab`、`initialProviders`、`providerTemplates`。省略 `providerTemplates` 时加载真实 CDN 列表；提供该参数时使用冻结场景数据，适合复用与视频编排。配置修改、复制、删除、模型选择和检测结果仅使用内存，不保存密钥，不调用真实 AI 接口。检测前清空必要字段可展示模拟失败；重新加载页面恢复初始状态。

基础控件存于 `model-settings/ui`，依据当前应用 UI 源码复制并调整导入路径，限定在此功能族内；Radix 状态选择器适配官网已安装版本。表单密度、卡片尺寸、平台头像、模型类型页签、Token 参数、温度和流式开关对齐源组件。主题映射位于 `app/global.css` 的 `.ng-model-settings` 作用域；桌面复刻根据自身自然尺寸判断布局，下拉菜单与确认浮层留在缩放容器内。

源码基线：NoteGen `0.38.2` / `9859c6eff90514415a1e996cdb74412113afeadd`；官网 HEAD `9cb1014d9b9b51f5b4a58f3194df1bad607e5164`，本次开始时包含上一轮教程与简化示例改动。应用工作区无未提交改动。读取范围包括 `src/app/core/setting/ai/{page,model-card,modelSelect,create,default-models}.tsx`、`setting-base.tsx`、直接依赖 UI 控件、`provider-templates-runtime.ts`、`config-center/client.ts`、`messages/{zh,en}.json` 与应用主题变量。

| 来源 | 原有差异 | 本次实现 | 状态 |
| --- | --- | --- | --- |
| 配置中心客户端、供应商模板运行时 | 固定平台列表、统一占位图标 | manifest → 真实供应商 JSON，同源接口处理跨域限制、过滤禁用项、校验字段、60 秒缓存及失败重试 | 本地页面已看到完整远端列表与图标 |
| `ai/page.tsx` | 简化摘要卡片、连接与模型布局缺失 | 260px 平台列、真实 UI 卡片与字段、连接与模型页签、模板信息及自定义请求头、代理校验 | 中文页面人工查看，代理下拉定位已修正 |
| `model-card.tsx`、`modelSelect.tsx` | 模型只显示名称和类型 | 可添加/删除/展开，五种能力、可搜索的示例模型列表与手动输入、完整高级参数、模拟连接状态 | 中文页面已展开模型与高级参数 |
| `create.tsx`、复制/删除行为、`default-models.tsx` | 无平台增删状态 | 内存中的平台添加/复制/删除确认及无平台默认模型展示 | 已实现，全部操作仍待完整人工验收 |
| 应用主题与基础 UI 控件 | 网站控件密度和布局影响复刻 | 独立源码基础控件、主题 token 作用域、容器宽度断点及随缩放定位的菜单 | 已在现有预览检查浅色窄屏缩放；深色未视觉验证 |

验证范围：使用已经运行的 localhost:3000 官网预览，人工查看中文教程，确认真实 CDN 列表、连接与模型页签、模型展开、高级参数和代理菜单。没有启动新服务器，没有运行测试、Lint、类型检查或构建。未取得同尺寸、同主题 NoteGen 实机截图，不能据此声称像素级一致。

人工验收入口：中英文 `docs/guides/model-setup` 与组件画廊的 AIHubMix Connection / Models / Empty 场景。继续检查深浅色、长模型名、键盘选择、窄屏缩放、复制/删除与空状态；进入模型卡片确认不同类型字段可见性，清空示例密钥后检测模拟失败。截图只记录官网代码复刻结果，未使用供应商教程截图。

2026-10-13 分享链接更新：读取 NoteGen `config/provider-templates.json` 中的 `aihubmix.apiKeyUrl`，统一使用 `https://aihubmix.com/?aff=6rfO`。中英文教程正文、组件画廊名称、默认模型说明、平台列表名称及详情标题均带分享链接；平台名称链接与选择按钮为并列元素，避免嵌套交互。API 地址仍保持供应商接口原值，资料教程保留独立链接。

分享链接跳转修正：文档正文原由 Fumadocs 外链组件默认添加 `target="_blank"`，本地 Chrome 实际点击未出现新标签页。对分享链接使用原生 `AiHubMixLink` 并显式设置 `target="_self"`，其他文档链接继续由 `createRelativeLink` 处理；复刻中的同一分享入口同步使用当前页跳转。已实际点击中文教程正文，确认到达 `https://aihubmix.com/?aff=6rfO`，随后返回教程。没有运行测试、Lint、类型检查或构建。

### 模型教程逐步场景（2026-10-13）

`NoteGenModelSetupScene` 通过 `step` 提供十个固定状态：`platform`、`connection`、`chat-model`、`connection-test`、`select-chat`、`chat-reply`、`editor`、`embedding`、`rerank`、`knowledge-models`。中英文 MDX 使用 `<NoteGenDocPreview kind="model-setup" step="…" />`，每个操作小节都有独立展示；画廊同步列出全部状态。模型配置场景继续从真实 CDN 读取供应商列表。

共享模型配置新增兼容的可选初始状态 props：`initialExpandedModels`、`initialNotice`、`initialCheckState`。连接测试场景展示模拟成功，修改模型或连接字段后清除成功状态。新增模型不继承固定场景的成功结果。桌面复刻新增 `chatExample`，状态栏新增 `modelControl` 插槽，用于复用现有布局展示底部模型选择与简单回复；原有默认场景不变。知识库新增 `rerankLabel`，同时展示教程配置的嵌入和重排模型。

来源仍为 NoteGen `0.38.2` / `9859c6eff90514415a1e996cdb74412113afeadd`，本次额外对照 `chat/model-select.tsx`、`chat/chat-footer.tsx`、`main-status-bar.tsx` 与 `setting/rag/model-setting.tsx`。官网当前 checkout 保留之前的未提交改动。

已在现有 localhost:3000 中文教程中人工确认十个预览均渲染，模型卡片默认展开、连接成功提示可见，并查看添加对话模型的布局；记录截图 `model-setup-step.jpg`。中英文和画廊同步的调用已作静态阅读。未运行测试、Lint、类型检查或构建，英文视觉效果及全部交互尚未完整验收，无同条件实机像素对照。

### 专门组件与操作标识（2026-10-13）

逐步教程已改为局部专门组件，取代每一步重复的完整设置页和桌面。`NoteGenProviderListReplica` 只展示 CDN 平台列表；`NoteGenConnectionFormReplica` 只展示连接表单；`NoteGenModelCardReplica` 展示当前步骤相关的一个模型；`NoteGenConnectionTestReplica` 只展示检测卡片与结果。它们复用完整模型设置页的实际面板 JSX 和状态逻辑，默认完整设置页的布局不变。

`NoteGenChatModelPickerReplica` 展示模型选择菜单与底部触发按钮；`NoteGenChatExampleReplica` 复用现有对话面板展示简单问答；`NoteGenEditorAISelectionReplica` 展示选中文字、浮动工具栏和 AI 操作，依据 `editor/markdown/bubble-menu.tsx` 的控件样式；`NoteGenKnowledgeModelPickerReplica` 仅展示现有知识库的检索模型分组。复刻全部使用代码，不使用供应商截图。

`TutorialMarker` 与 `TutorialLegend` 提供一一对应的数字标识与操作说明；连接字段标出 1 API 地址、2 API Key、3 网络代理，模型卡片标出名称、类型、检测与添加入口，其他局部组件分别标出对应操作。标识只在教程模式出现，完整设置页默认不显示。文档局部组件使用自身自然尺寸及响应式布局，取消整窗缩小后再裁剪的展示方式。

本地中文教程已人工检查十个场景对应的组件类型和编号，查看连接表单的可读性并保存 `model-setup-focused-markers.jpg`。英文页同步组件调用与编号文案，未完整做英文视觉验收。未运行测试、Lint、类型检查或构建，未提交或发布。

### 编辑器 AI 选区菜单重做（2026-10-13）

`editor-ai-selection-replica.tsx` 独立维护真实选区工具栏的局部展示，保留 `model-setup-scenes` 原有导出路径。依据 NoteGen `9859c6eff90514415a1e996cdb74412113afeadd` 的 `editor/markdown/bubble-menu.tsx` 和 `messages/{zh,en}.json` 重排。原简化版包含文字 AI 按钮、缺少格式控件、错误地独立显示翻译且菜单位于正文下方；本次改为 icon-sm AI 图标按钮、六个文本格式按钮、链接、五个块级按钮与真实分隔符。AI 菜单包含润色/精简/扩展、四种选区生成画布操作，以及悬停/点击展开的九种翻译语言和自定义语言输入。

工具栏在选区上方 8px 附近定位，AI 菜单从其按钮下方展开，翻译菜单在右侧。控件保留原图标与尺寸，编号作为外侧说明标记；选区使用系统 Highlight 颜色。自然尺寸 680px，由组件内部缩放以保留窄屏的同一工具栏顺序；翻译菜单展开时增加展示高度，避免底部裁切。格式按钮与菜单均为本地演示，不连接 AI 或编辑真实文件。

同时把模型复刻的默认边框颜色规则移入 CSS base 层，避免它覆盖工具按钮的 `border-transparent`。已在现有中文教程预览确认工具栏按钮为透明边框、菜单结构、翻译语言列表与编号，保存 `editor-selection-rebuilt.jpg`。未运行测试、Lint、类型检查或构建；未做同条件实机截图对照。

### 编辑器选区固定状态（2026-10-17）

`NoteGenEditorAISelectionReplica` 新增可选 `state="closed" | "open" | "detail"`：分别固定 AI 菜单关闭、AI 菜单展开、翻译子菜单展开，供视频时间轴和固定预览使用。不传 `state` 保留原有官网本地交互。`showTutorialMarkers={false}` 隐藏教程编号；`canvasHeight` 固定自然画布高度，防止切换时尺寸跳动。自然宽度为 680px；同时展示翻译子菜单时建议高度 780px。影片缩放在外层处理。`data-editor-target="ai"`、`data-editor-target="translate"` 可用于定位动画指针；菜单位于复刻容器内部。无 AI 服务或伪造成功状态。

### PC context usage audit for the context/memory video (2026-10-24)

Source baseline: NoteGen `ab0f5bf93fb4bc0b7aba007c9d13a80cf9486809`, Tauri version `0.38.3` (`package.json` remains `0.1.0`). Website baseline: `42f55abf15d8d2145ed32868799a1a968734de49`. No earlier completed source baseline was available for this context indicator. The application checkout was clean. Existing website changes to this README, `index.ts`, and `editor-ai-selection-replica.tsx` were preserved.

The audit covers PC chat headers/composer, context usage/manual compression entry, and the active, ready, non-sensitive global preference memory fixture used by this episode. Sources: `src/app/core/main/chat/{chat-header,chat-input,chat-tools-popover,context-usage-indicator,chat-content}.tsx`, `src/components/memories/{memory-list,memory-item,memory-stats}.tsx`, `src/app/core/setting/memories/page.tsx`, and Chinese/English messages. Current source has the compression summary divider, but this episode only demonstrates the real entry and its usage tooltip, without inventing a successful compression output.

| Difference | Shared implementation | Acceptance/status |
| --- | --- | --- |
| Desktop composer had six obsolete tool icons and omitted the context ring | `components/home/notegen-desktop-replica.tsx` now uses attachment + tools, then optional context ring + permission + send | Source comparison completed; no application screenshot comparison |
| No shared context ring or deterministic open tooltip | `context-usage-replica.tsx` uses the source 9-unit ring radius, 32px button, 16px SVG, original cn/en tooltip and K/M formatting | `user`/`learned` capacity + history show it; estimated capacity or no history hide it; temporary/loading/compacting disable; screenshot geometry unverified |
| Chat demo title/input could not describe this episode | Optional `title`, `input`, `conversationCount` added to the existing `chatExample`; optional `contextUsage` added to desktop and local chat previews | Old calls retain their defaults; static callsites read |
| Active memory fixture | Existing `NoteGenMemoriesSettingsDialog` already includes policy, counts, active/preference/global badges, content and more menu | This episode uses ready, non-sensitive, never-recalled fixtures and no menu. Sensitive/indexing/recall-reason/menu-promoted states were outside this episode audit |

`NoteGenContextUsageIndicator` is exported from `@/components/notegen`. A fixed video frame may pass `{ usedTokens: 104960, contextWindow: 128000, usedPercent: 82, capacitySource: "user", tooltipOpen: true }`; percentages/token values are simulated fixture data. `rotation` is an explicit deterministic angle for in-progress frames, and `onCompact` is a caller-owned display callback. The real action forces conversation-history preparation; the replica does not call it. `NoteGenDesktopReplica` accepts the same object through `contextUsage`; its existing `chatExample` now accepts a title and input. `NoteGenChatExampleReplica` also accepts `contextUsage` and `height` (default 360).

Manual comparison remains: PC/mac, Chinese, dark theme, natural 1360×720; compare header/control order, ring and tooltip geometry, active preference row and modal at that same size; check cn/en strings and scaling in the gallery. Observation date is 2026-10-24. No same-condition product screenshot was available, so this is source alignment, not pixel verification. No tests, lint, typecheck, app build or development server were run. The installed website Next package has no `node_modules/next/dist/docs` directory; these edits use React display props/CSS and introduce no Next API.
### 编辑、截图与文件夹引用固定状态（2026-10-25）

本次源码对照基线：应用 `1d7f150c50e29de827312c8c438b2790ff321dba`（实际版本 v0.39.0）、官网修改前 `dd6bdc9644ff276154351417177dc09855a45ae6`，两仓库读取时均无未提交改动。本期是源码对照，未获得相同尺寸和主题的运行中截图，视觉几何尚未做实机对照。没有运行测试、Lint、类型检查、构建或官网服务器。

新增以下公共组件，旧组件与 props 不变。自然画布 900×850，均可传 `height={740}`；视频相机缩放由外部处理，组件没有计时器或动画。`outline-jump` 固定选中目录第 5 项「下一步安排」，保留完整文档内容并通过 `documentScroll` 设置正文初始偏移（默认 `contentFontSize * 23` 像素）。`data-release-document-target` 是可由时间轴控制 y 位移的正文内层；传 `documentScroll={0}` 后，可根据 `data-release-following-heading` 实际位置计算终点。示例仅是「项目复盘」模拟资料，未进行真实截图、文件读取、AI 请求或保存动作。公共样式统一在 `release-replica-primitives.tsx`，采用应用深色语义 token，复用窗口控制与原 Lucide 图标；片中浅绿提示不应用于产品按钮。

- `NoteGenEditorReleaseReplica`：`state="color-menu" | "color-result" | "heading-menu" | "heading-result" | "outline-open" | "outline-folded" | "outline-jump" | "table-menu" | "table-result"`，可传 `lang`、`fileName`、`document`、`colorMode="text" | "highlight"`、`colorPhase="none" | "text" | "both"`。颜色演示中的 `document.highlightText` 是结论行，`document.questionText` 是问题行；`text` 阶段仅结论使用实际绿色 `#348358`，`both` 阶段同时给问题使用黄色高亮 `#fef08a` 与深色文字。文字颜色菜单选中结论，高亮菜单选中问题，支持先后展示再同时保留。`document` 是部分 `NoteGenReleaseDocumentData`，用于标题、正文、目录与表格数据。`contentFontSize` 默认 16；视频传 26，表示演示编辑器的可配置正文字号，控件仍保持自然尺寸。颜色值来自 `src/lib/text-colors.ts`；菜单顺序来自 `editor/markdown/bubble-menu.tsx` 和 `color-menu.tsx`；标题折叠箭头位于标题文字末尾，来自 `heading-folding.ts` 与 `style.css`；大纲来自 `left-sidebar.tsx`、`outline.tsx`；表格浮层顺序来自 `table-context-toolbar.tsx`。
- `NoteGenScreenshotReplica`：`state="annotate" | "pin"`，可传 `lang`、`selectionLabel`、`annotation` 与固定屏幕 `children`。截图浮层、标注颜色、选择框与贴图工具顺序来自 `src/app/screenshot/page.tsx`、`src/app/screenshot-pin/page.tsx`。贴图状态展示鼠标悬停后的工具条，输入画面为代码绘制的模拟屏幕。
- `NoteGenChatFolderReplica`：`state="folder-select" | "folder-context" | "folder-answer"`，可传 `lang`、`folderName`、`entryCount`、`question` 与 `answer: string[]`。`@` 资源菜单的文件夹分组和输入区附件来自 `chat-composer-menu.tsx`、`chat-file-attachments.tsx`，条目数为明确提供的固定模拟数据。

固定场景位于组件画廊 `#release-details`，中英文均由同一组件的 `lang` 分支提供。人工核对时，在自然宽 900px、深色、中文条件下依次查看菜单展开/结果、正文/标题转换、大纲/折叠、表格新增行/对齐、截图/贴图、文件夹选择/输入上下文/回答；再切换英文查看换行、菜单边缘与裁切。在视频预览检查原尺寸、1.12–1.2 倍特写与过渡。

时间轴定位标记：根 `data-release-state`；菜单 `data-release-menu="selection|color|heading|table|folders"`；动作 `data-release-target="text-color|highlight-color|block-type|heading-fold|add-row|table-align-center|screenshot-pin|select-folder|folder-send"`；内容 `data-release-selected-text`、`data-release-text-color`、`data-release-heading-selected`、`data-release-converted-heading`、`data-release-fold-body`、`data-release-following-heading`、`data-release-outline-item`、`data-release-table-row`；截图 `data-release-annotation`、`data-release-screenshot-selection`、`data-release-screenshot-toolbar`、`data-release-pinned-window`；聊天 `data-release-folder-attachment`、`data-release-folder-input`、`data-release-folder-answer`。聊天空白区域复用 `NoteGenChatEmpty`（`chat-empty.tsx` 与中英文翻译核对），展示真实标题、说明与三条快速开始，不使用自造产品标语；本期不展示最近对话。切换状态时可使用分别导出的静态快照或外部控制显示，不在视频里复制维护组件实现。

