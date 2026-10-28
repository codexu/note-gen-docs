import { skillsSettingsCss } from "./skills-settings-style"
import { ChevronDown, FolderOpen, Sparkles, Trash, Upload } from "lucide-react"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"

import type { NoteGenInstalledSkill } from "./skills-settings-types"

/** Fixed display data. No installation, directory access or deletion. */
export function NoteGenLegacySkillsSettings({ lang = "cn", projectSkills = [], globalSkills = [] }: {
  lang?: NoteGenReplicaLanguage
  projectSkills?: NoteGenInstalledSkill[]
  globalSkills?: NoteGenInstalledSkill[]
}) {
  const en = lang === "en"
  return <div className="ng-skills-settings-content ng-settings-scroll">
    <style>{skillsSettingsCss}</style>
    <header><h2><Sparkles size={24} />{en ? "Skills" : "技能"}</h2><p>{en ? "Skills are reusable AI capability packages that let the assistant apply task-specific behavior." : "技能是可重用的 AI 能力包，让 AI 助手能够根据任务自动应用特定的行为模式。"}</p></header>
    {([{ scope: "project", skills: projectSkills, title: en ? "Workspace skills" : "工作区技能", help: en ? "Installed in this workspace’s skills directory; available only here." : "安装到当前工作区的 skills 目录，仅供当前工作区使用。" }, { scope: "global", skills: globalSkills, title: en ? "Installed global skills" : "已安装的全局技能", help: en ? "Installed in NoteGen’s global Skills directory; available in all workspaces." : "安装到 NoteGen 的全局 Skills 目录，可供所有工作区使用。" }] as const).map(group => <section key={group.scope} data-skills-scope={group.scope}>
      <div className="ng-skills-settings-section-head"><div><h3>{group.title} ({group.skills.length})</h3><p>{group.help}</p></div><div className="ng-skills-settings-actions"><span><FolderOpen size={14} />{en ? "Open directory" : "打开目录"}</span><span><Upload size={14} />{en ? "Install skill" : "安装技能"}<ChevronDown size={14} /></span></div></div>
      {group.skills.length ? <div className="ng-skills-settings-list">{group.skills.map(skill => <article key={skill.name} data-installed-skill={skill.name}><Sparkles size={16} /><div><h4>{skill.name}</h4><p>{skill.description}</p></div><span className="ng-skills-enabled" role="switch" aria-checked={skill.enabled !== false} aria-label={`${en ? "Enable" : "启用"}: ${skill.name}`} data-enabled={skill.enabled !== false}><i /></span><Trash size={16} className="ng-skills-delete" /></article>)}</div> : <div className="ng-skills-settings-empty"><span><Sparkles size={20} /></span><strong>{group.scope === "project" ? (en ? "No skills in this workspace" : "工作区中没有技能") : (en ? "No installed global skills" : "没有已安装的全局技能")}</strong><p>{en ? "Create a SKILL.md file in the skills folder to add a skill." : "在 skills 文件夹中创建 SKILL.md 文件来添加技能"}</p></div>}
    </section>)}
  </div>
}

