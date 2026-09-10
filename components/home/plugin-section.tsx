import { ArrowRightIcon, BlocksIcon, Code2Icon, SlidersHorizontalIcon, SquarePenIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function PluginSection({ lang }: { lang: "cn" | "en" }) {
  const text = (cn: string, en: string) => lang === "en" ? en : cn
  const features = [
    {
      icon: SquarePenIcon,
      title: text("添上顺手的小工具", "Add tools for everyday writing"),
      description: text(
        "查看写作统计、扩展编辑命令，让常用功能出现在编辑器、菜单和状态栏中。",
        "Check writing statistics and add editing commands, with tools available right in your editor, menus, and status bar."
      ),
    },
    {
      icon: SlidersHorizontalIcon,
      title: text("按自己的习惯组合", "Choose your own setup"),
      description: text(
        "为不同工作区启用不同插件。写作、学习或项目资料，各自搭配需要的功能。",
        "Enable different plugins for different workspaces. Give your writing, study notes, and project material the tools each needs."
      ),
    },
    {
      icon: Code2Icon,
      title: text("把自己的想法做成插件", "Build what you’re missing"),
      description: text(
        "有特别的需求，也可以开发自己的插件，把反复要做的笔记操作变成顺手的工具。",
        "Have a specific need? Build your own plugin to turn recurring note tasks into handy tools."
      ),
    },
  ]

  return (
    <section id="plugins" aria-labelledby="plugins-heading" className="scroll-mt-14 border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="secondary">
            <BlocksIcon />
            {text("插件系统", "Plugins")}
          </Badge>
          <h2 id="plugins-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            {lang === "cn" ? (
              <>按你的需要，<br />扩展 NoteGen。</>
            ) : "Extend NoteGen to fit your needs."}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            {text(
              "用插件补充写作工具、简化笔记操作，为学习、创作和项目资料搭配需要的功能，让日常记录更顺手。",
              "Add writing tools, simplify note tasks, and choose the features you need for studying, creating, and managing project material."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`/${lang}/docs/plugins`} className={buttonVariants()}>
              {text("了解插件系统", "Explore plugins")}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <a href={`/${lang}/docs/plugins/developers/getting-started`} className={buttonVariants({ variant: "outline" })}>
              {text("开发第一个插件", "Build your first plugin")}
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div key={title}>
              {index > 0 ? <Separator /> : null}
              <div className="flex items-start gap-4 py-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <Icon className="size-5" />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
