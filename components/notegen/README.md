# NoteGen replica components

This folder contains style-only, code-native replicas for documentation and marketing pages. They do not connect to NoteGen stores, Tauri, databases, file APIs, or AI services.

## Component families

- `app-shell-replica`: platform window controls, capture toolbar, panel handle, app shell, and the unified full-width PC status bar.
- `record-replica`: tag chips, capture filters, list items, audio waveform, sidebar, and detail view.
- `tag-management-replica`: the vertical tag-tree/record-list layout with nested paths, deduplicated descendant counts, selection, resizing/collapse, context actions, and local create/rename/delete dialogs. Desktop scenes and record previews share this implementation; the old chip export remains available for compatibility.
- `file-editor-replica`: file tree, tabs, editor toolbar, bubble menu, and document page.
- `agent-replica`: message bubbles, thinking block, tool calls, execution timeline, context tray, and composer.
- `canvas-replica`: project cards, canvas tools, nodes, edges, and grid.
- `settings-replica`: reusable setting rows plus all current NoteGen settings categories and dialog presentation.
- `mobile-replica`: phone frame, status bar, dock, capture, Agent, writing, and settings screens.
- `feedback-replica`: global search, recording, sync states, image viewer, confirmation, and activity heatmap.
- `organize-notes-replica`: interactive three-step record organization dialog for the Record documentation.

Import every public component from `@/components/notegen`. Display-state props change the rendered appearance; interactive scenes simulate local state without implementing connected product behavior.

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
