import Link from "next/link";
import SectionWrap from "./section-wrap";
import Image from "next/image";

export default function HomeFooter() {
  return (
    <SectionWrap className="flex items-center justify-between">
      <a href="https://www.netlify.com">
        <Image src="https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg" width={100} height={24} alt="Deploys by Netlify" />
      </a>
      <div className="flex flex-col gap-2 text-sm text-fd-muted-foreground">
        <p>Released under the <Link href="https://github.com/codexu/note-gen/blob/dev/LICENSE">GPL-3.0 License</Link>.</p>
        <p>Copyright © 2024-present codexu</p>
      </div>
    </SectionWrap>
  );
}