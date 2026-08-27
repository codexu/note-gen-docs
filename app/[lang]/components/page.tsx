import type { Metadata } from "next"

import { NoteGenComponentGallery } from "./component-gallery"

export const metadata: Metadata = {
  title: "NoteGen Replica Components",
  description: "Composable, code-native replicas of the NoteGen interface.",
  robots: {
    index: false,
    follow: false,
  },
}
export default async function NoteGenComponentsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <NoteGenComponentGallery lang={lang === "en" ? "en" : "cn"} />
}
