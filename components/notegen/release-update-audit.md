# v0.39.0 发布视频共享组件差异记录

核对日期：2026-10-25（Asia/Shanghai）。发布功能基线：`note-gen-v0.39.0`；首轮记录的应用 HEAD 为 `1d7f150c50e29de827312c8c438b2790ff321dba`，官网修改前为 `dd6bdc9644ff276154351417177dc09855a45ae6`。扩展审计时应用出现大量原有未提交改动，含 UI import 和样式调整；保持只读，不把其归入发布亮点。官网此前编辑、截图、文件夹引用复刻改动继续保留。

| 来源 | 原复刻缺项 | 目标状态及维护文件 | 实施与验收边界 |
| --- | --- | --- | --- |
| `40a4f5c5`、`55658c3c`；`setting/sync/components/platform-switch-progress.tsx`、`stores/sync-platform-switch.ts` | 只有小型同步成功/失败提示，无平台切换流程 | `sync-release-replica.tsx`：两端差异计数、三种处理策略、冲突两侧文本与选择、确认影响、固定进度、中断后重新扫描、核验完成 | 纯静态实现完成。中断重试保留备份与暂停信息；没有虚构一键自动回滚。尚待影片捕获对照。 |
| `cb64526b`；`setting/sync/components/workspace-repo-mapping.tsx` | 设置复刻仅普通仓库字段，无工作区映射与确认 | 同文件 `NoteGenWorkspaceRepoReplica`：未绑定、待确认、确认框、绑定结果 | 非默认工作区默认只展示对应笔记文件范围，避免暗示全部应用数据随之同步。 |
| `6cc5e5dd`；`main/document-sync-panel.tsx`、`editor/markdown/sync/sync-tools.tsx` | 底栏未展示当前文档同步面板 | 同文件 `NoteGenDocumentSyncReplica`：底部入口、当前文档、同步/更多、上传当前内容/获取远端版本、固定处理中/就绪 | 菜单顺序源对照；此局部状态不连接文档控制器。 |
| `ecf3ed3b`；`components/plugins/plugin-code-block-preview.tsx`、`lib/plugins/code-block-export.ts` | 无插件代码块预览，画布导出 UI 不能替代 | `plugin-code-block-replica.tsx`：DOT 源码、已启用 Graphviz 的固定 SVG 示例、编辑源码/预览、PNG/SVG/JPEG 菜单、结果 | 模拟已启用插件，未安装/调用渲染器。默认预览为代码绘制示例，非实际插件运行证据。SVG 导出按 `svgAvailable` 条件展示可用性。 |
| `7d8eaef7`；`mark/record-save-target.tsx`、`quick-record/page.tsx`、`lib/shortcut/quick-record-text.ts` | 现有标签管理处理已存在记录，无创建记录时的新标签入口 | `record-capture-replica.tsx`：保存到、新建标签输入、添加后勾选、快捷窗口相同标签、保存结果 | 使用相同「项目复盘」资料。无 Tauri/数据库/跨窗口消息。 |
| `4ee4363c`；`file-tree-expansion-menu.tsx`、`folder-item/index.tsx`、`file-manager.tsx` | 简化文件行无上下文展开层 | `file-tree-release-replica.tsx`：文件夹展开/折叠、根目录全部展开/全部折叠、展开结果 | 菜单顺序和禁用态取自源码，正文文件树按本期可读性设置为 24px，控件 14px；应用默认树字号与本期演示不同。 |
| `23d14ec5`；`use-file-deletion.ts`、`stores/file-deletion.ts` | 无删除中的过滤、部分失败保留或重试结果 | 同文件：正在删除 1/2、成功一项失败一项、失败条目仍选中、再次删除后成功 | 不虚构独立“重试”按钮；不触发删除。 |
| `129dddc4`；`notegen-model-label.tsx`、`use-notegen-limited-usage.ts`、公开模型策略 | DefaultModels 仍用每日200次示例；无百分比状态 | `sponsored-quota-replica.tsx` 固定 72%；`model-settings/default-models.tsx` 默认改 Token，可选 props 保留历史示例能力 | 本期不播具体额度数字、不把示例当用户余额。`Limited` 的显示名可受 hook 的 activeModelName 覆盖，不能仅看标签组件默认分支推断耗尽名称；本片避免 0% 状态歧义。 |
| `d808733b`、`433aa54f`、`bdd99b76`；长文档与 `agent-diff-preview-extension` | 原局部编辑器不表达长文档或格式化 AI 修改预览 | `editor-review-release-replica.tsx`：长文档、结构化修改预览、公式注入、切换到使用反馈 | 由主影片作者维护，公共导出与画廊接入。无性能实测倍率、无真实 AI 请求。 |

以上文件在官网统一维护。影片工程只持有演示数据、静态导出快照与时间轴。没有相同系统、主题和尺寸的应用运行截图，本记录属于源码对照；不将其称为像素级一致。后续影片捕获可验证静态布局、放大、字幕遮挡与指针，但仍与实机截图验收分开记录。
