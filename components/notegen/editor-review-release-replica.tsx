import type { ReactNode } from "react"
import { FileText } from "lucide-react"
import { ReleasePane, ReleaseTabBar } from "./release-replica-primitives"
import type { NoteGenReplicaLanguage } from "./types"

export interface NoteGenEditorReviewReleaseReplicaProps {
  state?: "long-document" | "ai-preview" | "document-switched"
  lang?: NoteGenReplicaLanguage
  height?: number
  /** A statically typeset formula, supplied by the consuming scene. */
  formula?: ReactNode
}

/** Source: editor/markdown/agent-diff-preview-extension.ts and its scoped styles.
 * Fixed content only; no editor, model, filesystem, or performance benchmark.
 */
export function NoteGenEditorReviewReleaseReplica({ state = "long-document", lang = "cn", height = 740, formula }: NoteGenEditorReviewReleaseReplicaProps) {
  const text = (cn: string, en: string) => lang === "en" ? en : cn
  const preview = state === "ai-preview"
  const switched = state === "document-switched"
  const title = switched ? text("使用反馈.md", "User feedback.md") : text("项目复盘.md", "Project review.md")
  return <ReleasePane title={title} state={`editor-review-${state}`} lang={lang} height={height} className="ng-release-editor-review">
    <style>{editorReviewCss}</style>
    <ReleaseTabBar fileName={title} />
    <div className="ng-release-long-scroll" data-release-long-scroll>
      <article className="ng-release-review-document">
        <div className="ng-release-file-path"><FileText />{text("工作 / 项目复盘", "Work / Project review")}</div>
        <h1>{switched ? text("使用反馈", "User feedback") : text("项目复盘", "Project review")}</h1>
        {preview ? <>
          <p className="ng-release-review-removed" data-release-preview-removed>{text("先做原型，再考虑反馈。", "Build the prototype first and consider feedback later.")}</p>
          <section className="ng-release-review-inserted" data-release-ai-preview>
            <h2>{text("验证原型，再完善方案", "Validate the prototype, then refine it")}</h2>
            <ul><li>{text("收集真实使用反馈。", "Gather real user feedback.")}</li><li>{text("整理问题，再确定下一步。", "Organize issues and decide the next step.")}</li></ul>
            <table><thead><tr><th>{text("事项", "Task")}</th><th>{text("进度", "Status")}</th></tr></thead><tbody><tr><td>{text("原型验证", "Prototype validation")}</td><td>{text("进行中", "In progress")}</td></tr></tbody></table>
            <div className="ng-release-preview-math" data-release-preview-formula>{formula ?? <span>完成率 = 已完成 / 总任务 × 100%</span>}</div>
          </section>
        </> : switched ? <>
          <p>{text("先保留真实反馈，再回到项目复盘里整理。", "Keep the original feedback and organize it in the review.")}</p>
          <h2>{text("本周反馈", "This week's feedback")}</h2>
          <p>{text("常用操作应当更容易找到。", "Common actions should be easier to find.")}</p>
          <h2>{text("待确认的问题", "Questions to confirm")}</h2>
          <p>{text("补充更多使用场景，继续验证原型。", "Add more scenarios and continue validating the prototype.")}</p>
        </> : <>
          <p>{text("按章节记录资料、问题与后续安排。", "Keep research, questions, and next steps in chapters.")}</p>
          {Array.from({ length: 48 }, (_, index) => <section key={index} data-release-long-section={index}>
            <h2>{text(`第 ${index + 1} 节 · ${["本周进展", "使用反馈", "问题整理", "下一步安排"][index % 4]}`, `Section ${index + 1} · ${["Progress", "Feedback", "Issues", "Next steps"][index % 4]}`)}</h2>
            <p>{text("先完成原型，再收集真实反馈。把资料整理清楚，保留每一步的判断和后续安排。", "Finish the prototype, gather real feedback, and keep the decisions and next steps clear.")}</p>
            <p>{text("回看这一节，确认当前进展与待办。", "Review this section to confirm progress and tasks.")}</p>
          </section>)}
        </>}
      </article>
    </div>
  </ReleasePane>
}

const editorReviewCss = `
.ng-release-editor-review .ng-release-long-scroll{height:calc(100% - 40px);overflow:auto;scrollbar-width:thin;scrollbar-color:#52525b transparent}
.ng-release-review-document{padding:35px 48px;font-size:26px;line-height:1.7;color:var(--ng-r-fg)}
.ng-release-review-document h1{font-size:44px;line-height:1.45;margin:0 0 24px;font-weight:700}.ng-release-review-document h2{font-size:34px;line-height:1.5;margin:26px 0 12px;font-weight:600}.ng-release-review-document p{margin:14px 0}.ng-release-review-document ul{padding-left:30px;margin:15px 0}.ng-release-review-document li{margin:8px 0}
.ng-release-review-removed{border-radius:3px;background:color-mix(in srgb,#ef4444 18%,transparent);color:#ef4444;text-decoration:line-through;text-decoration-thickness:1.5px}
.ng-release-review-inserted{display:block;width:100%;min-width:0;overflow-x:auto;overflow-wrap:anywhere;margin-block:4px;border-radius:3px;background:color-mix(in srgb,#22c55e 18%,transparent);color:#86efac;white-space:normal;padding:16px 22px}.ng-release-review-inserted>:first-child{margin-top:0}.ng-release-review-inserted>:last-child{margin-bottom:0}
.ng-release-review-inserted table{border-collapse:collapse;width:100%;font-size:24px;line-height:1.7}.ng-release-review-inserted th,.ng-release-review-inserted td{border:1px solid var(--ng-r-border);padding:7px 14px;text-align:left}.ng-release-review-inserted th{background:var(--ng-r-muted);font-weight:600}
.ng-release-preview-math{overflow-x:auto;text-align:center;padding:12px 16px;margin-top:16px;border-radius:8px;background:hsl(240 3.7% 15.9%/.3);font-size:30px}.ng-release-preview-math sup{font-size:.7em;vertical-align:super}
.ng-release-editor-review[data-release-state="editor-review-ai-preview"] .ng-release-review-document{padding-top:24px;padding-bottom:24px}.ng-release-editor-review[data-release-state="editor-review-ai-preview"] h1{font-size:40px;margin-bottom:16px}.ng-release-editor-review[data-release-state="editor-review-ai-preview"] .ng-release-review-removed{margin:8px 0}.ng-release-review-inserted{font-size:24px;line-height:1.45;padding:12px 20px}.ng-release-review-inserted h2{font-size:30px;line-height:1.4;margin-bottom:8px}.ng-release-review-inserted ul{margin:8px 0}.ng-release-review-inserted li{margin:4px 0}.ng-release-review-inserted th,.ng-release-review-inserted td{padding:6px 12px}.ng-release-preview-math{padding:8px 12px;margin-top:8px}
`
