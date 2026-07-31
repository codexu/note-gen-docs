import { NoteGenDemo } from "@/components/home/note-gen-demo"

export default async function CoverCapturePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <main className="min-h-screen bg-[#00ff00] p-16">
      <NoteGenDemo lang={lang === "en" ? "en" : "cn"} />
    </main>
  )
}
