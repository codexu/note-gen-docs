"use client"

import { NoteGenApprovalPanel, type NoteGenApprovalProps } from "./chat-interaction-replica"

/** Legacy note_update_file entry point, backed by the current shared approval card. */
export function NoteGenUpdateApproval({ filePath, content, lang = "cn", ...props }: { filePath: string; content: string } & NoteGenApprovalProps) {
  return <div data-notegen-replica="note-update-approval"><NoteGenApprovalPanel lang={lang} summary={filePath} fields={[{ label: lang === "en" ? "File path" : "文件路径", value: filePath }, { label: lang === "en" ? "File content" : "文件内容", value: content, format: "content" }]} {...props} /></div>
}
