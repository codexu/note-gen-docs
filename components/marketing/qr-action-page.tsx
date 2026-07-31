import type { LucideIcon } from "lucide-react"

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

type QrActionItem = {
  title: string
  description: string
  image: {
    src: string
    alt: string
  }
  icon: LucideIcon
  priority?: boolean
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
  layout?: "split" | "stack"
}) {
  return (
    <main className="min-h-screen">
      <section
        className={cn(
          "mx-auto w-full gap-12 px-4 py-16 sm:px-6 md:py-24",
          layout === "split"
            ? "grid max-w-6xl lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
            : "flex max-w-5xl flex-col",
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
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = item.icon

              return (
                <Card key={item.title} className="h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="leading-6">{item.description}</CardDescription>
                    <CardAction>
                      <Badge variant="outline">{String(index + 1).padStart(2, "0")}</Badge>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="flex min-h-[300px] items-center justify-center rounded-lg border bg-muted/30 p-5">
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        loading={item.priority ? "eager" : "lazy"}
                        decoding="async"
                        className="max-h-[280px] max-w-full rounded-md object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {alternativeSupport ? (
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">{alternativeSupport.title}</CardTitle>
                <CardDescription className="leading-6">
                  {alternativeSupport.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-3">
                {alternativeSupport.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex flex-col items-start gap-2">
                      <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                      {item.share ? (
                        <ShareButton {...item.share} />
                      ) : item.href && item.action ? (
                        <Button asChild variant="outline" size="sm" className="mt-auto">
                          <a href={item.href} target="_blank" rel="noreferrer">
                            {item.action}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </main>
  )
}
