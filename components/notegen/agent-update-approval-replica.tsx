import { CheckCircle2, ChevronDown, ShieldAlert, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Display-only replica of AgentApprovalPanel for note_update_file. No file side effects. */
export function NoteGenUpdateApproval({ filePath, content }: { filePath: string; content: string }) {
  return <section className="ng-skill-approval" data-notegen-replica="note-update-approval">
    <div className="ng-skill-approval-head"><ShieldAlert size={16} /><div><strong>即将执行操作</strong><p>{filePath}</p></div><ChevronDown size={16} /></div>
    <div className="ng-skill-approval-actions"><Button variant="ghost" size="sm"><XCircle size={14} />取消</Button><Button size="sm" data-note-update-action="confirm"><CheckCircle2 size={14} />确认</Button></div>
    <dl className="ng-skill-fields"><div><dt>文件路径</dt><dd>{filePath}</dd></div><div><dt>文件内容</dt><dd><pre>{content}</pre></dd></div></dl>
  </section>
}
