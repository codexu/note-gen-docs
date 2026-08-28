"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { NoteGenDesktopReplica } from "@/components/home/notegen-desktop-replica"
import {
  NoteGenActivityHeatmap,
  NoteGenDialogBackdrop,
  NoteGenSyncStatus,
  NoteGenUpdatePrompt,
} from "@/components/notegen/feedback-replica"
import { NoteGenMobileReplica, type NoteGenMobileScreen } from "@/components/notegen/mobile-replica"
import { NoteGenOrganizeNotesReplica } from "@/components/notegen/organize-notes-replica"
import {
  NoteGenSettingsDetailReplica,
  type NoteGenSettingSectionId,
} from "@/components/notegen/settings-replica"
import type { NoteGenReplicaLanguage } from "@/components/notegen/types"

type DesktopPreviewKind = "desktop-records" | "desktop-record-detail" | "desktop-writing" | "desktop-canvas" | "desktop-files" | "desktop-agent"

type NoteGenDocPreviewProps =
  | {
      kind: DesktopPreviewKind
      lang?: NoteGenReplicaLanguage
      label?: string
    }
  | {
      kind: "mobile"
      lang?: NoteGenReplicaLanguage
      label?: string
      screen: NoteGenMobileScreen
    }
  | {
      kind: "settings"
      lang?: NoteGenReplicaLanguage
      label?: string
      section: NoteGenSettingSectionId
    }
  | {
      kind: "activity" | "organize-notes" | "sync-conflict" | "update"
      lang?: NoteGenReplicaLanguage
      label?: string
    }

function ScaledReplica({ children, height = 650 }: { children: ReactNode; height?: number }) {
  const baseWidth = 1120
  const viewportRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ scale: 1, left: 0 })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateLayout = () => {
      const scale = Math.min(1, viewport.clientWidth / baseWidth)
      setLayout({
        scale,
        left: Math.max(0, (viewport.clientWidth - baseWidth * scale) / 2),
      })
    }
    updateLayout()

    const observer = new ResizeObserver(updateLayout)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden"
      style={{ height: height * layout.scale }}
    >
      <div
        className="absolute top-0 origin-top-left"
        style={{
          width: baseWidth,
          height,
          left: layout.left,
          transform: `scale(${layout.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function DesktopScene({
  kind,
  lang,
}: {
  kind: DesktopPreviewKind
  lang: NoteGenReplicaLanguage
}) {
  const initialWorkspace = kind === "desktop-canvas"
    ? "canvas"
    : kind === "desktop-writing" || kind === "desktop-files" || kind === "desktop-agent"
      ? "writing"
      : "records"
  const panelLayout = kind === "desktop-record-detail"
    ? "center"
    : kind === "desktop-files"
      ? "left"
      : kind === "desktop-agent"
        ? "three"
        : "two"

  return (
    <ScaledReplica>
      <NoteGenDesktopReplica
        lang={lang}
        initialWorkspace={initialWorkspace}
        panelLayout={panelLayout}
        autoCycle={false}
        fill
      />
    </ScaledReplica>
  )
}

function isDesktopPreview(kind: NoteGenDocPreviewProps["kind"]): kind is DesktopPreviewKind {
  return kind === "desktop-records"
    || kind === "desktop-record-detail"
    || kind === "desktop-writing"
    || kind === "desktop-canvas"
    || kind === "desktop-files"
    || kind === "desktop-agent"
}

export function NoteGenDocPreview(props: NoteGenDocPreviewProps) {
  const lang = props.lang ?? "cn"

  return (
    <figure
      aria-label={props.label}
      className="not-prose my-6 w-full"
      data-notegen-doc-preview={props.kind}
    >
      {isDesktopPreview(props.kind) ? (
        <DesktopScene kind={props.kind} lang={lang} />
      ) : props.kind === "mobile" ? (
        <div className="mx-auto w-full max-w-[320px]">
          <NoteGenMobileReplica lang={lang} screen={props.screen} />
        </div>
      ) : props.kind === "settings" ? (
        <ScaledReplica>
          <NoteGenSettingsDetailReplica
            lang={lang}
            section={props.section}
            className="h-full min-h-0"
          />
        </ScaledReplica>
      ) : props.kind === "activity" ? (
        <div className="mx-auto w-full max-w-[360px]">
          <NoteGenActivityHeatmap lang={lang} />
        </div>
      ) : props.kind === "organize-notes" ? (
        <ScaledReplica>
          <NoteGenOrganizeNotesReplica lang={lang} />
        </ScaledReplica>
      ) : props.kind === "update" ? (
        <NoteGenDialogBackdrop className="min-h-64">
          <NoteGenUpdatePrompt lang={lang} />
        </NoteGenDialogBackdrop>
      ) : (
        <NoteGenDialogBackdrop className="min-h-48">
          <NoteGenSyncStatus lang={lang} state="conflict" />
        </NoteGenDialogBackdrop>
      )}
    </figure>
  )
}
