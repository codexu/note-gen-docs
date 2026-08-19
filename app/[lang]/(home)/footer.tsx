import Link from "next/link";

export default function HomeFooter({ lang }: { lang: "cn" | "en" }) {
  const text = (cnText: string, enText: string) => lang === "en" ? enText : cnText;

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">N</span>
          NOTEGEN.
        </div>
        <p>Capture first, organize later.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="https://github.com/codexu/note-gen" className="hover:text-foreground">GitHub</Link>
          <Link href={`/${lang}/docs`} className="hover:text-foreground">
            {text("文档", "Docs")}
          </Link>
          <Link href={`/${lang}/web-clipper/download`} className="hover:text-foreground">
            {text("网页剪藏", "Web Clipper")}
          </Link>
          <Link href={`/${lang}/community`} className="hover:text-foreground">
            {text("交流群", "Community")}
          </Link>
          <Link href={`/${lang}/business`} className="hover:text-foreground">
            {text("商务合作", "Business")}
          </Link>
          <Link href={`/${lang}/donate`} className="hover:text-foreground">
            {text("支持项目", "Support")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
