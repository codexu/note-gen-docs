import type { NoteGenReplicaLanguage } from "./types"
import type { NoteGenRecommendedSkill } from "./skills-settings-types"

// Pinned source recommendation metadata; inspection counts below are demo data.
const recommendations = [
  {
    "id": "humanizer-zh",
    "name": {
      "zh": "中文自然润色",
      "en": "Natural Chinese Editing"
    },
    "description": {
      "zh": "清理中文文章中的套话、重复和模板化表达，保留原意与作者语气。",
      "en": "Polish Chinese articles by removing filler, repetition, and formulaic phrasing while preserving meaning and voice."
    },
    "author": "op7418",
    "sourceUrl": "https://github.com/op7418/Humanizer-zh/tree/f4518a8eab97b8bfebc66a89d34320a89bef6930"
  },
  {
    "id": "doc-coauthoring",
    "name": {
      "zh": "文档共创",
      "en": "Document Coauthoring"
    },
    "description": {
      "zh": "通过补充背景、梳理结构和逐节修改，协作完成方案、说明和技术文档。",
      "en": "Develop proposals, guides, and technical documents through context gathering, structured drafting, and revision."
    },
    "author": "Anthropic",
    "sourceUrl": "https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/doc-coauthoring"
  },
  {
    "id": "pdf",
    "name": {
      "zh": "PDF 文档处理",
      "en": "PDF Documents"
    },
    "description": {
      "zh": "读取、编辑、合并、拆分和创建 PDF，支持表单填写、OCR 与页面预览；需桌面运行环境。",
      "en": "Read, edit, merge, split, and create PDFs, with form filling, OCR, and page previews. Requires a desktop runtime environment."
    },
    "author": "Anthropic",
    "sourceUrl": "https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/pdf"
  },
  {
    "id": "docx",
    "name": {
      "zh": "Word 文档处理",
      "en": "Word Documents"
    },
    "description": {
      "zh": "创建、读取和编辑 Word 文档，处理批注与修订，并转换为 PDF 检查版式；需桌面运行环境。",
      "en": "Create, read, and edit Word documents, work with comments and tracked changes, and convert to PDF for layout review. Requires a desktop runtime environment."
    },
    "author": "Anthropic",
    "sourceUrl": "https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/docx"
  }
]

export function noteGenRecommendedSkillsFixture(lang: NoteGenReplicaLanguage = "cn"): NoteGenRecommendedSkill[] {
  const locale = lang === "en" ? "en" : "zh"
  return recommendations.map<NoteGenRecommendedSkill>(skill => ({ ...skill, name: skill.name[locale], description: skill.description[locale], fileCount: 5, hasScripts: skill.id === "pdf" || skill.id === "docx", scripts: skill.id === "pdf" || skill.id === "docx" ? ["python", "node"] : [] }))
}
