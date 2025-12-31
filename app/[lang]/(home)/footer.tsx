import Link from "next/link";
import SectionWrap from "./section-wrap";

export default function HomeFooter() {
  return (
    <SectionWrap className="flex items-center justify-between">
      <div></div>
      <div className="flex flex-col gap-2 text-sm text-fd-muted-foreground">
        <p>Released under the <Link href="https://github.com/codexu/note-gen/blob/dev/LICENSE">GPL-3.0 License</Link>.</p>
        <p>Copyright © 2024-present codexu</p>
      </div>
    </SectionWrap>
  );
}