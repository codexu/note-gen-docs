"use client"

import { CheckIcon, Share2Icon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function ShareButton({
  path,
  title,
  text,
  label,
  copiedLabel,
}: {
  path: string
  title: string
  text: string
  label: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = new URL(path, window.location.origin).toString()

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = url
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      textarea.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button type="button" variant="outline" size="sm" className="mt-auto" onClick={share}>
      {copied ? (
        <CheckIcon data-icon="inline-start" />
      ) : (
        <Share2Icon data-icon="inline-start" />
      )}
      {copied ? copiedLabel : label}
    </Button>
  )
}
