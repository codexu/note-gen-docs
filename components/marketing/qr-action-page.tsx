import { ArrowUpRightIcon, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ShareButton } from "@/components/marketing/share-button"
import { CopyRecommendationButton } from "@/components/marketing/copy-recommendation-button"

type QrActionItem = {
  title: string
  description?: string
  image?: {
    src: string
    alt: string
  }
  icon?: LucideIcon
  iconImage?: {
    src: string
    alt: string
  }
  priority?: boolean
  action?: string
  href?: string
}

type QrActionDetails = {
  title: string
  description: string
  items: {
    title: string
    description: string
    icon: LucideIcon
  }[]
}

type QrActionAlternativeSupport = {
  title: string
  description: string
  items: {
    title: string
    description: string
    icon: LucideIcon
    href?: string
    action?: string
    share?: {
      path: string
      title: string
      text: string
      label: string
      copiedLabel: string
    }
    copy?: {
      text: string
      label: string
      copiedLabel: string
    }
  }[]
}

type QrActionPlatformSupport = {
  title: string
  description: string
  action: string
  items: {
    title: string
    href: string
    description?: string
    iconImage?: {
      src: string
      alt: string
    }
    promotion?: string
  }[]
}

export function QrActionPage({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  principles,
  note,
  details,
  sectionTitle,
  sectionDescription,
  items,
  alternativeSupport,
  platformSupport,
  layout = "split",
}: {
  badge: string
  badgeIcon: LucideIcon
  title: string
  description: string
  principles: readonly string[]
  note: string
  details?: QrActionDetails
  sectionTitle: string
  sectionDescription: string
  items: QrActionItem[]
  alternativeSupport?: QrActionAlternativeSupport
  platformSupport?: QrActionPlatformSupport
  layout?: "split" | "stack"
}) {
  return (
    <main className="min-h-screen">
      <section
        className={cn(
          "mx-auto w-full gap-12 px-4 py-16 sm:px-6 md:py-24",
          layout === "split"
            ? "grid max-w-6xl lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
            : "flex max-w-6xl flex-col",
        )}
      >
        <div
          className={cn(
            "flex flex-col items-start gap-6",
            layout === "split" ? "lg:sticky lg:top-24 lg:self-start" : "max-w-3xl",
          )}
        >
          <Badge variant="outline">
            <BadgeIcon data-icon="inline-start" />
            {badge}
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {principles.map((principle) => (
              <Badge key={principle} variant="secondary">
                {principle}
              </Badge>
            ))}
          </div>
          <Separator />
          <p className="text-sm leading-6 text-muted-foreground">{note}</p>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {details ? (
            <Card className="bg-muted/30 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">{details.title}</CardTitle>
                <CardDescription className="leading-6">
                  {details.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                {details.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background">
                        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ) : null}

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{sectionTitle}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{sectionDescription}</p>
          </div>
          <div
            className={cn(
              "grid gap-4",
              items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
            )}
          >
            {items.map((item, index) => {
              const Icon = item.icon

              return (
                <Card key={item.title} className="h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      {item.iconImage ? (
                        <img
                          src={item.iconImage.src}
                          alt=""
                          className="size-5 rounded"
                        />
                      ) : Icon ? (
                        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                      ) : null}
                      {item.title}
                    </CardTitle>
                    {item.description ? (
                      <CardDescription className="leading-6">
                        {item.description}
                      </CardDescription>
                    ) : null}
                    <CardAction>
                      <Badge variant="outline">{String(index + 1).padStart(2, "0")}</Badge>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="flex min-h-[300px] items-center justify-center rounded-lg border bg-muted/30 p-5">
                      {item.image ? (
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          loading={item.priority ? "eager" : "lazy"}
                          decoding="async"
                          className="max-h-[280px] max-w-full rounded-md object-contain"
                        />
                      ) : item.href && item.action ? (
                        <div className="flex flex-col items-center gap-5 text-center">
                          {item.iconImage ? (
                            <img
                              src={item.iconImage.src}
                              alt={item.iconImage.alt}
                              className="size-24 rounded-3xl"
                            />
                          ) : Icon ? (
                            <div className="flex size-16 items-center justify-center rounded-2xl bg-pink-500/10">
                              <Icon className="size-8 text-pink-500" aria-hidden="true" />
                            </div>
                          ) : null}
                          <Button asChild>
                            <a href={item.href} target="_blank" rel="noreferrer">
                              {item.action}
                            </a>
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {alternativeSupport ? (
            <section className="flex flex-col gap-6">
              <div className="flex max-w-2xl flex-col gap-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {alternativeSupport.title}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {alternativeSupport.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {alternativeSupport.items.map((item, index) => {
                  const Icon = item.icon
                  const iconClassName = [
                    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                    "bg-rose-500/10 text-rose-700 dark:text-rose-400",
                    "bg-sky-500/10 text-sky-700 dark:text-sky-400",
                    "bg-violet-500/10 text-violet-700 dark:text-violet-400",
                  ][index]

                  return (
                    <div key={item.title} className="flex min-h-48 flex-col rounded-xl border bg-background p-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}>
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-5">
                        {item.share ? (
                          <ShareButton {...item.share} />
                        ) : item.copy ? (
                          <CopyRecommendationButton {...item.copy} />
                        ) : item.href && item.action ? (
                          <Button asChild variant="outline" size="sm">
                            <a href={item.href} target="_blank" rel="noreferrer">
                              {item.action}
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}

          {platformSupport ? (
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">{platformSupport.title}</CardTitle>
                <CardDescription className="leading-6">{platformSupport.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {platformSupport.items.map((item) => (
                  <Card key={item.title} className="shadow-none">
                    <CardHeader className="gap-3">
                      <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                        {item.iconImage ? (
                          <img src={item.iconImage.src} alt="" className="size-5 rounded" />
                        ) : null}
                        <span>{item.title}</span>
                        {item.promotion ? (
                          <Badge className="border-0 bg-foreground px-2 py-0.5 text-xs font-semibold text-background shadow-sm">
                            {item.promotion}
                          </Badge>
                        ) : null}
                      </CardTitle>
                      {item.description ? <CardDescription>{item.description}</CardDescription> : null}
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {platformSupport.action}
                          <ArrowUpRightIcon data-icon="inline-end" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </main>
  )
}
