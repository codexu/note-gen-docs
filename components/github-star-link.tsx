"use client"

import { LanguageToggle } from "fumadocs-ui/components/layout/language-toggle"
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle"
import { GithubIcon, LanguagesIcon, StarIcon } from "lucide-react"
import { useEffect, useState } from "react"

function formatStarCount(count: number) {
  if (count < 1000) return String(count)

  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
}

export function GitHubStarLink() {
  const [starCount, setStarCount] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch("/api/github-stats", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === "number") {
          setStarCount(data.stargazers_count)
        }
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [])

  return (
    <a
      href="https://github.com/codexu/note-gen"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 items-center gap-2 rounded-full border bg-muted/40 px-2.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={starCount === null ? "GitHub" : `GitHub, ${starCount} stars`}
    >
      <GithubIcon className="size-4" />
      <span className="inline-flex items-center gap-1 tabular-nums text-muted-foreground">
        <StarIcon className="size-3 fill-current" />
        {starCount === null ? "…" : formatStarCount(starCount)}
      </span>
    </a>
  )
}

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1.5">
      <LanguageToggle>
        <LanguagesIcon className="size-5" />
      </LanguageToggle>
      <ThemeToggle />
      <GitHubStarLink />
    </div>
  )
}
