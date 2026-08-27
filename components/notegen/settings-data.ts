export type NoteGenSettingSectionId =
  | "about"
  | "general"
  | "record"
  | "editor"
  | "canvas"
  | "shortcuts"
  | "imageMethod"
  | "audio"
  | "ai"
  | "webSearch"
  | "rag"
  | "memories"
  | "prompt"
  | "mcp"
  | "skills"
  | "template"
  | "sync"
  | "backup"
  | "imageHosting"
  | "file"

export type NoteGenSettingControl = "switch" | "select" | "slider" | "shortcut" | "button" | "input" | "textarea" | "status"

export type NoteGenSettingRowData = {
  cn: string
  en: string
  cnDescription?: string
  enDescription?: string
  control?: NoteGenSettingControl
  cnValue?: string
  enValue?: string
  checked?: boolean
}

export type NoteGenSettingSectionData = {
  cn: string
  en: string
  cnDescription?: string
  enDescription?: string
  presentation?: "rows" | "cards" | "tabs" | "notice"
  rows: NoteGenSettingRowData[]
}

export type NoteGenSettingPageData = {
  cn: string
  en: string
  cnDescription: string
  enDescription: string
  sections: NoteGenSettingSectionData[]
}

const row = (
  cn: string,
  en: string,
  control: NoteGenSettingControl = "switch",
  cnValue = "",
  enValue = "",
  cnDescription = "",
  enDescription = "",
  checked = true
): NoteGenSettingRowData => ({ cn, en, control, cnValue, enValue, cnDescription, enDescription, checked })

export const noteGenSettingsPages: Record<NoteGenSettingSectionId, NoteGenSettingPageData> = {
  about: {
    cn: "关于",
    en: "About",
    cnDescription: "查看 NoteGen 的版本、更新与开源信息。",
    enDescription: "View NoteGen version, updates, and open-source information.",
    sections: [
      { cn: "NoteGen", en: "NoteGen", presentation: "cards", rows: [row("NoteGen", "NoteGen", "status", "v0.36.0", "v0.36.0", "AI 驱动的跨平台 Markdown 笔记应用", "An AI-powered cross-platform Markdown note-taking app")] },
      { cn: "软件更新", en: "Software update", cnDescription: "检查新版本并选择更新渠道", enDescription: "Check for new versions and choose an update channel", rows: [row("当前版本", "Current version", "status", "已是最新版本", "Up to date"), row("更新渠道", "Update channel", "select", "稳定版", "Stable")] },
      { cn: "项目链接", en: "Project links", presentation: "cards", rows: [row("GitHub", "GitHub", "button", "查看源码", "View source", "访问 NoteGen 开源仓库", "Visit the NoteGen repository"), row("官方网站", "Official website", "button", "打开网站", "Open website", "查看文档与下载信息", "Read docs and download NoteGen")] },
    ],
  },
  general: {
    cn: "常规设置",
    en: "General Settings",
    cnDescription: "在这里，你可以配置应用的基本设置，包括界面主题、语言等选项。",
    enDescription: "Configure basic application settings, including theme and language.",
    sections: [
      { cn: "应用行为", en: "App behavior", cnDescription: "设置 NoteGen 的启动方式和关闭窗口时的行为", enDescription: "Choose how NoteGen starts and what happens when its window closes", rows: [row("关闭窗口时", "When closing the window", "select", "最小化到托盘", "Minimize to tray", "选择点击窗口关闭按钮后执行的操作", "Choose the action performed by the window close button"), row("开机启动", "Launch at startup", "switch", "", "", "登录系统后自动启动 NoteGen", "Start NoteGen automatically after signing in"), row("自启后隐藏主窗口", "Hide window after launch", "switch", "", "", "仅通过开机启动时隐藏窗口，并在系统托盘中保持运行", "Keep NoteGen in the tray when launched at startup", false)] },
      { cn: "外观与语言", en: "Appearance and language", cnDescription: "调整应用主题、显示语言和全局字体", enDescription: "Adjust app theme, display language, and font", rows: [row("主题", "Theme", "select", "跟随系统", "System", "选择应用的外观主题", "Choose the app appearance"), row("语言", "Language", "select", "中文", "English", "选择应用的显示语言", "Choose the display language"), row("应用字体", "App font", "select", "系统默认", "System default", "选择应用界面使用的字体", "Choose the font used by the app")] },
      { cn: "阅读与缩放", en: "Reading and scale", cnDescription: "分别调整界面、正文和列表的显示尺寸", enDescription: "Adjust interface, content, and list sizes independently", rows: [row("界面缩放", "Interface scale", "slider", "100%", "100%"), row("正文缩放", "Content scale", "slider", "100%", "100%"), row("文件管理器文字大小", "File manager text size", "select", "中", "Medium"), row("记录文字大小", "Capture text size", "select", "中", "Medium")] },
      { cn: "工具设置", en: "Tool settings", cnDescription: "配置各种工具栏按钮的显示和排序", enDescription: "Configure toolbar button visibility and order", rows: [row("对话工具栏", "Chat toolbar", "button", "配置", "Configure"), row("记录工具栏", "Capture toolbar", "button", "配置", "Configure")] },
      { cn: "高级设置", en: "Advanced settings", rows: [row("自定义主题颜色", "Custom theme colors", "button", "编辑", "Edit"), row("自定义 CSS", "Custom CSS", "button", "打开编辑器", "Open editor"), row("网络代理", "Network proxy", "select", "继承系统", "Inherit system"), row("开发者诊断", "Developer diagnostics", "switch", "", "", "显示诊断信息和开发工具", "Show diagnostics and developer tools", false)] },
    ],
  },
  record: {
    cn: "记录设置",
    en: "Record Settings",
    cnDescription: "在这里，你可以配置记录相关的设置，包括记录描述和工具栏配置。",
    enDescription: "Configure capture descriptions, display, saving, and toolbar options.",
    sections: [
      { cn: "模型设置", en: "Model settings", rows: [row("记录描述", "Capture description", "select", "默认模型", "Default model", "用于处理 OCR 识别后的记录，生成记录描述", "Generate descriptions for OCR captures")] },
      { cn: "浏览方式", en: "Browsing", cnDescription: "设置记录列表的默认视图和排序方式", enDescription: "Set the default capture view and sorting", rows: [row("默认视图", "Default view", "select", "默认", "Default", "选择记录列表的默认展示密度", "Choose the default list density"), row("默认排序", "Default sort", "select", "最近更新", "Recently updated", "选择记录在列表中的默认排列顺序", "Choose the default capture order")] },
      { cn: "记录保存", en: "Capture saving", cnDescription: "设置新记录的默认保存位置和保存后的行为", enDescription: "Set where new captures are saved and what happens afterward", rows: [row("默认保存位置", "Default destination", "select", "收件箱", "Inbox"), row("保存后的行为", "After saving", "select", "保持当前页面", "Stay on current page")] },
      { cn: "网页剪藏", en: "Web clipper", rows: [row("浏览器扩展连接", "Browser extension connection", "status", "已就绪", "Ready"), row("默认保存分类", "Default clip destination", "select", "收件箱", "Inbox")] },
      { cn: "工具栏设置", en: "Toolbar settings", rows: [row("记录工具栏", "Capture toolbar", "button", "文字 · 录音 · 扫描 · 图片 · 链接 · 文件 · 待办", "Text · Audio · Scan · Image · Link · File · Todo")] },
    ],
  },
  editor: {
    cn: "编辑器设置",
    en: "Editor Settings",
    cnDescription: "在这里，你可以对编辑器进行自定义配置，打造更适合你的写作方式。",
    enDescription: "Customize the editor to create a writing experience that suits you.",
    sections: [
      { cn: "默认模型", en: "Default models", rows: [row("快速补全模型", "Inline completion model", "select", "自动选择", "Automatic"), row("提交模型", "Commit model", "select", "默认对话模型", "Default chat model")] },
      { cn: "写作布局", en: "Writing layout", cnDescription: "调整桌面编辑器的内容宽度和阅读密度", enDescription: "Adjust editor content width and reading density", rows: [row("内容宽度", "Content width", "slider", "768px", "768px"), row("行高", "Line height", "slider", "1.75", "1.75")] },
      { cn: "编辑器显示", en: "Editor display", cnDescription: "设置大纲和编辑器工具的默认显示方式", enDescription: "Configure outline and editor tools", rows: [row("显示大纲", "Show outline", "switch"), row("写作统计", "Writing statistics", "switch"), row("默认编辑模式", "Default editing mode", "select", "所见即所得", "WYSIWYG"), row("源码行号", "Source line numbers", "switch", "", "", "在 Markdown 源码模式左侧显示行号", "Show line numbers in source mode", false), row("源码自动换行", "Source wrapping", "switch"), row("底部格式工具栏", "Bottom format toolbar", "switch")] },
    ],
  },
  canvas: {
    cn: "画布设置",
    en: "Canvas Settings",
    cnDescription: "统一配置画布的显示、交互方式和管理器偏好，修改后立即生效。",
    enDescription: "Configure canvas display, interaction, and manager preferences.",
    sections: [
      { cn: "画布显示", en: "Canvas display", cnDescription: "调整所有画布的网格、小地图和缩放方式。", enDescription: "Adjust grid, minimap, and zoom behavior.", rows: [row("显示网格", "Show grid", "switch"), row("吸附网格", "Snap to grid", "switch"), row("显示小地图", "Show minimap", "switch"), row("网格样式", "Grid style", "select", "点阵", "Dots"), row("网格间距", "Grid gap", "slider", "20px", "20px"), row("默认缩放比例", "Default zoom", "slider", "100%", "100%")] },
      { cn: "交互方式", en: "Interaction", rows: [row("鼠标滚轮行为", "Mouse wheel", "select", "平移画布", "Pan canvas"), row("插入节点后", "After inserting a node", "select", "切回选择工具", "Switch to select tool")] },
      { cn: "画布管理", en: "Canvas manager", rows: [row("默认视图", "Default view", "select", "缩略图", "Grid"), row("默认排序", "Default sort", "select", "最近修改", "Recently modified")] },
    ],
  },
  shortcuts: {
    cn: "快捷键",
    en: "Shortcuts",
    cnDescription: "在这里，你可以配置快捷键，帮助你更高效地使用 NoteGen。",
    enDescription: "Configure shortcuts to use NoteGen more efficiently.",
    sections: [
      { cn: "全局快捷键", en: "Global shortcuts", cnDescription: "这些快捷键由系统注册，NoteGen 不在前台时也可能触发。", enDescription: "These shortcuts may work while NoteGen is in the background.", rows: [row("显示 / 隐藏主窗口", "Show / hide main window", "shortcut", "⌘ ⇧ Space", "⌘ ⇧ Space"), row("打开快速记录", "Open quick capture", "shortcut", "⌘ ⇧ N", "⌘ ⇧ N"), row("开始 / 停止录音", "Start / stop recording", "shortcut", "⌘ ⇧ R", "⌘ ⇧ R")] },
      { cn: "编辑器快捷键", en: "Editor shortcuts", rows: [row("撤销", "Undo", "shortcut", "⌘ Z", "⌘ Z"), row("重做", "Redo", "shortcut", "⌘ ⇧ Z", "⌘ ⇧ Z"), row("查找 / 替换", "Find / replace", "shortcut", "⌘ F", "⌘ F"), row("Slash 菜单", "Slash menu", "shortcut", "/", "/"), row("AI 动作菜单", "AI actions", "shortcut", "⌘ J", "⌘ J")] },
    ],
  },
  imageMethod: {
    cn: "图像识别",
    en: "Image Recognition",
    cnDescription: "默认使用系统 OCR 识别图片；配置 VLM 后会优先使用 VLM，失败时自动回退 OCR。",
    enDescription: "Use system OCR by default and optionally enhance recognition with a VLM.",
    sections: [
      { cn: "图像识别", en: "Image recognition", rows: [row("启用图像识别", "Enable image recognition", "switch", "", "", "截图和插图记录时自动识别图片", "Recognize images in screenshot and illustration captures")] },
      { cn: "系统 OCR", en: "System OCR", presentation: "cards", rows: [row("系统 OCR", "System OCR", "status", "可用", "Available", "使用当前系统提供的 OCR 能力", "Use OCR provided by the operating system")] },
      { cn: "VLM 增强（可选）", en: "VLM enhancement (optional)", rows: [row("视觉模型", "Vision model", "select", "未配置", "Not configured", "失败时自动回退系统 OCR", "Falls back to system OCR on failure")] },
    ],
  },
  audio: {
    cn: "语音设置",
    en: "Audio Settings",
    cnDescription: "配置文本转语音（朗读）和语音转文本（录音识别）功能。",
    enDescription: "Configure text-to-speech and speech-to-text features.",
    sections: [
      { cn: "运行方式", en: "Runtime mode", rows: [row("语音能力", "Audio capability", "select", "自动", "Automatic")] },
      { cn: "文本转语音（TTS）", en: "Text to speech (TTS)", cnDescription: "配置朗读功能，为聊天内容提供语音播放。", enDescription: "Configure read-aloud for chat content.", rows: [row("朗读模型", "Speech model", "select", "系统语音", "System voice"), row("语速", "Speech rate", "slider", "1.0×", "1.0×")] },
      { cn: "语音转文本（STT）", en: "Speech to text (STT)", cnDescription: "配置录音识别功能，将语音转换为文字记录。", enDescription: "Convert voice recordings to text captures.", rows: [row("识别模型", "Transcription model", "select", "系统识别", "System recognition")] },
    ],
  },
  ai: {
    cn: "模型平台",
    en: "Model Platforms",
    cnDescription: "集中管理 AI 模型平台、连接凭据和不同能力的模型，可用于对话、整理、知识库和语音等功能。",
    enDescription: "Manage AI platforms, credentials, and models for chat, organization, knowledge, and audio.",
    sections: [
      { cn: "模型平台", en: "Model platforms", presentation: "cards", rows: [row("ChatGPT", "ChatGPT", "status", "已配置 · 4 个模型", "Configured · 4 models"), row("Gemini", "Gemini", "status", "未配置", "Not configured"), row("Ollama", "Ollama", "status", "本地 · 未连接", "Local · Disconnected"), row("LM Studio", "LM Studio", "status", "本地 · 未连接", "Local · Disconnected"), row("自定义平台", "Custom platform", "button", "添加平台", "Add platform")] },
      { cn: "连接配置", en: "Connection", presentation: "tabs", rows: [row("API Key", "API Key", "input", "sk-••••••••••••", "sk-••••••••••••"), row("API 地址", "Base URL", "input", "https://api.openai.com/v1", "https://api.openai.com/v1"), row("代理方式", "Proxy mode", "select", "继承全局设置", "Inherit global settings")] },
      { cn: "模型", en: "Models", presentation: "cards", rows: [row("GPT-5", "GPT-5", "status", "对话 · 流式", "Chat · Streaming"), row("text-embedding-3-small", "text-embedding-3-small", "status", "嵌入", "Embedding")] },
    ],
  },
  webSearch: {
    cn: "网络搜索",
    en: "Web Search",
    cnDescription: "配置 NoteGen 的三层联网搜索方案，AI 会自行判断何时需要搜索。",
    enDescription: "Configure NoteGen's three-layer web search strategy.",
    sections: [
      { cn: "模型原生搜索", en: "Native model search", presentation: "cards", rows: [row("启用模型原生搜索", "Enable native search", "switch", "", "", "优先使用模型服务自带的联网能力", "Prefer search built into the model provider")] },
      { cn: "第三方 API 搜索", en: "Third-party API search", presentation: "cards", rows: [row("Tavily", "Tavily", "status", "已启用", "Enabled"), row("Brave Search", "Brave Search", "status", "未配置", "Not configured"), row("Exa", "Exa", "status", "未配置", "Not configured"), row("智谱搜索", "Zhipu Search", "status", "未配置", "Not configured")] },
      { cn: "免 Key 搜索", en: "Keyless search", presentation: "cards", rows: [row("基础网页搜索", "Basic web search", "switch", "", "", "在其他搜索方式不可用时回退使用", "Fallback when other search methods are unavailable")] },
    ],
  },
  rag: {
    cn: "知识库",
    en: "Knowledge Base",
    cnDescription: "知识库通过向量、BM25 和模糊匹配进行混合检索，并可使用重排模型优化结果顺序。",
    enDescription: "Use hybrid vector, BM25, and fuzzy retrieval with optional reranking.",
    sections: [
      { cn: "模型设置", en: "Model settings", rows: [row("嵌入模型", "Embedding model", "select", "text-embedding-3-small", "text-embedding-3-small"), row("重排模型", "Rerank model", "select", "未配置", "Not configured")] },
      { cn: "知识库设置", en: "Knowledge base settings", rows: [row("启用知识库", "Enable knowledge base", "switch"), row("索引内容", "Indexed content", "select", "文章、记录、画布", "Articles, captures, canvases"), row("Agent 检索策略", "Agent retrieval strategy", "select", "标准", "Balanced"), row("检索预设", "Retrieval preset", "select", "均衡", "Balanced"), row("索引状态", "Index status", "status", "286 个片段 · 已就绪", "286 chunks · Ready")] },
    ],
  },
  memories: {
    cn: "记忆管理",
    en: "Memory Management",
    cnDescription: "AI 长期记忆功能，让 AI 记住你的写作偏好、经验知识和笔记习惯。",
    enDescription: "Long-term memory for writing preferences, knowledge, and note-taking habits.",
    sections: [
      { cn: "添加新记忆", en: "Add new memory", presentation: "tabs", rows: [row("记忆内容", "Memory content", "textarea", "例如：我偏好简洁、直接的写作风格", "For example: I prefer concise, direct writing") , row("保存记忆", "Save memory", "button", "添加", "Add")] },
      { cn: "已有记忆", en: "Saved memories", presentation: "cards", rows: [row("写作风格", "Writing style", "status", "偏好简洁、直接的中文表达", "Prefers concise and direct Chinese writing"), row("项目背景", "Project context", "status", "NoteGen 是开源 Markdown 笔记应用", "NoteGen is an open-source Markdown note app")] },
    ],
  },
  prompt: {
    cn: "提示词",
    en: "Prompt",
    cnDescription: "添加和管理提示词，帮助 AI 更好地理解你的需求。",
    enDescription: "Add and manage prompts to help AI understand your needs.",
    sections: [
      { cn: "Agent 自定义指引", en: "Agent custom instructions", cnDescription: "在系统核心规则之外追加你的偏好，不会替换安全与工具约束。", enDescription: "Append preferences without replacing safety and tool constraints.", rows: [row("自定义指引", "Custom instructions", "textarea", "回答时使用简洁、自然的中文。", "Use concise, natural language."), row("保存", "Save", "button", "保存更改", "Save changes")] },
      { cn: "提示词库", en: "Prompt library", presentation: "cards", rows: [row("整理成笔记", "Organize into notes", "status", "将记录整理成结构清晰的 Markdown", "Organize captures into structured Markdown"), row("润色", "Rewrite", "status", "保持原意并改善表达", "Improve expression while preserving meaning"), row("总结", "Summarize", "status", "提炼重点和结论", "Extract key points and conclusions")] },
    ],
  },
  mcp: {
    cn: "MCP",
    en: "MCP",
    cnDescription: "通过 Model Context Protocol 连接外部工具，或让本机 AI 访问 NoteGen。",
    enDescription: "Connect external tools through MCP or let local AI access NoteGen.",
    sections: [
      { cn: "外部服务", en: "External servers", presentation: "tabs", rows: [row("运行环境", "Runtime environment", "status", "Node.js · 已就绪", "Node.js · Ready"), row("Filesystem", "Filesystem", "status", "已连接 · 3 个工具", "Connected · 3 tools"), row("添加 MCP 服务", "Add MCP server", "button", "添加服务", "Add server")] },
      { cn: "本机访问", en: "Local access", presentation: "cards", rows: [row("NoteGen MCP 服务", "NoteGen MCP server", "switch", "", "", "允许本机 AI 工具访问 NoteGen 数据", "Allow local AI tools to access NoteGen data"), row("连接地址", "Connection URL", "input", "http://127.0.0.1:3456/mcp", "http://127.0.0.1:3456/mcp")] },
    ],
  },
  skills: {
    cn: "技能",
    en: "Skills",
    cnDescription: "技能是可重用的 AI 能力包，让 AI 助手能够根据任务自动应用特定的行为模式。",
    enDescription: "Reusable AI capability packages that apply specialized behavior to tasks.",
    sections: [
      { cn: "全局技能", en: "Global skills", presentation: "cards", rows: [row("技术写作", "Technical writing", "status", "已启用", "Enabled"), row("网页研究", "Web research", "status", "已启用", "Enabled"), row("安装技能", "Install skill", "button", "从文件安装", "Install from file")] },
      { cn: "项目技能", en: "Project skills", presentation: "cards", rows: [row("当前工作区", "Current workspace", "status", "没有项目技能", "No project skills")] },
    ],
  },
  template: {
    cn: "整理模板",
    en: "Template",
    cnDescription: "创建和管理自定义整理模板，帮助 AI 按照你的需求整理记录内容。",
    enDescription: "Create organization templates for turning captures into notes.",
    sections: [
      { cn: "模板列表", en: "Templates", presentation: "cards", rows: [row("结构化笔记", "Structured notes", "status", "默认模板", "Default template"), row("会议纪要", "Meeting notes", "status", "议题、结论与行动项", "Topics, decisions, and action items"), row("创建模板", "Create template", "button", "新建", "New")] },
      { cn: "模板内容", en: "Template content", rows: [row("模板提示词", "Template prompt", "textarea", "请将记录整理为标题、摘要、要点和行动项。", "Organize captures into title, summary, key points, and actions.")] },
    ],
  },
  sync: {
    cn: "同步配置",
    en: "Sync",
    cnDescription: "配置同步仓库，同步记录、Markdown 文件和可移植系统配置。",
    enDescription: "Configure repositories for captures, Markdown files, and portable settings.",
    sections: [
      { cn: "同步方式", en: "Sync method", presentation: "cards", rows: [row("GitHub", "GitHub", "status", "使用中", "In use"), row("GitLab", "GitLab", "status", "可配置", "Available"), row("Gitee", "Gitee", "status", "可配置", "Available"), row("Gitea", "Gitea", "status", "可配置", "Available"), row("WebDAV", "WebDAV", "status", "可配置", "Available"), row("S3 同步", "S3 sync", "status", "可配置", "Available"), row("网盘同步", "Cloud folder", "status", "OneDrive · iCloud Drive", "OneDrive · iCloud Drive"), row("自托管", "Self-hosted", "status", "可配置", "Available")] },
      { cn: "连接", en: "Connection", presentation: "tabs", rows: [row("仓库", "Repository", "input", "codexu/notegen-data", "codexu/notegen-data"), row("分支", "Branch", "input", "main", "main"), row("同步状态", "Sync status", "status", "已连接 · 2 分钟前同步", "Connected · Synced 2 minutes ago")] },
      { cn: "同步选项", en: "Sync options", rows: [row("自动同步", "Automatic sync", "switch"), row("个人附件", "Personal attachments", "switch"), row("偏好设置", "Preferences", "switch"), row("同步排除配置", "Sync exclusions", "button", "查看", "Review")] },
    ],
  },
  backup: {
    cn: "备份与恢复",
    en: "Backup & Restore",
    cnDescription: "创建和恢复 NoteGen 数据快照。",
    enDescription: "Create and restore NoteGen data snapshots.",
    sections: [
      { cn: "这是备份，不是多端同步", en: "This is backup, not multi-device sync", presentation: "notice", rows: [row("备份说明", "Backup note", "status", "生成独立的 .ngbackup 快照，不会改变现有同步配置。", "Creates independent .ngbackup snapshots without changing sync settings.")] },
      { cn: "备份目录", en: "Backup directory", rows: [row("保存位置", "Location", "input", "~/Documents/NoteGen Backups", "~/Documents/NoteGen Backups"), row("选择文件夹", "Choose folder", "button", "选择", "Choose")] },
      { cn: "自动备份", en: "Automatic backup", rows: [row("启用自动备份", "Enable automatic backup", "switch"), row("备份频率", "Backup frequency", "select", "每天", "Daily"), row("保留快照", "Keep snapshots", "select", "最近 30 份", "Latest 30")] },
      { cn: "立即备份", en: "Back up now", rows: [row("创建数据快照", "Create data snapshot", "button", "立即备份", "Back up now")] },
      { cn: "备份历史", en: "Backup history", presentation: "cards", rows: [row("2026-08-27 10:24", "2026-08-27 10:24", "status", "24.8 MB · 已验证", "24.8 MB · Verified"), row("2026-08-26 18:10", "2026-08-26 18:10", "status", "24.5 MB · 已验证", "24.5 MB · Verified")] },
    ],
  },
  imageHosting: {
    cn: "图片存储",
    en: "Image Storage",
    cnDescription: "选择将图片保存在本地工作区，或上传到已配置的图床服务。",
    enDescription: "Save images locally or upload them to a configured image hosting service.",
    sections: [
      { cn: "图片存储方式", en: "Image storage method", presentation: "cards", rows: [row("本地工作区", "Local workspace", "status", "使用中", "In use"), row("GitHub 图床", "GitHub", "status", "可配置", "Available"), row("S.EE 图床", "S.EE", "status", "可配置", "Available"), row("PicGo 图床", "PicGo", "status", "可配置", "Available"), row("对象存储", "Object storage", "status", "S3 · R2 · OSS · COS", "S3 · R2 · OSS · COS"), row("Lsky Pro", "Lsky Pro", "status", "可配置", "Available"), row("WebDAV", "WebDAV", "status", "可配置", "Available"), row("自定义 HTTP", "Custom HTTP", "status", "可配置", "Available"), row("Cloudinary", "Cloudinary", "status", "可配置", "Available"), row("ImageKit", "ImageKit", "status", "可配置", "Available"), row("七牛云 Kodo", "Qiniu Kodo", "status", "可配置", "Available"), row("又拍云 USS", "Upyun USS", "status", "可配置", "Available")] },
      { cn: "本地存储", en: "Local storage", rows: [row("资源目录", "Assets directory", "input", "assets", "assets"), row("使用相对路径", "Use relative paths", "switch")] },
    ],
  },
  file: {
    cn: "文件管理",
    en: "File Settings",
    cnDescription: "管理工作区设置和其他文件相关选项。",
    enDescription: "Manage workspace and file-related options.",
    sections: [
      { cn: "当前工作区", en: "Current workspace", rows: [row("工作区目录", "Workspace directory", "input", "~/Documents/NoteGen", "~/Documents/NoteGen"), row("更改工作区", "Change workspace", "button", "选择文件夹", "Choose folder", "更改后需要重启应用才能完全生效", "Restart the app after changing the workspace")] },
      { cn: "写作资源路径", en: "Writing assets path", cnDescription: "编辑器本地插入图片时会使用该目录名。", enDescription: "The editor uses this folder name for local images.", rows: [row("资源目录名称", "Assets folder name", "input", "assets", "assets")] },
    ],
  },
}
