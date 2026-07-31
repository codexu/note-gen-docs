import { NoteGenDemo } from "@/components/home/note-gen-demo"

export default async function CoverPreviewPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <main className="flex h-[810px] w-[1440px] items-center justify-center overflow-hidden bg-[#00ff00]">
      <div className="w-[1280px]">
        <NoteGenDemo
          lang={lang === "en" ? "en" : "cn"}
          initialDesktopWorkspace="writing"
          desktopAutoCycle={false}
          mobileAutoAdvance={false}
        />
      </div>
    </main>
  )
}
