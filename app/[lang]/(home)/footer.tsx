import SectionWrap from "./section-wrap";

export default function HomeFooter() {
  return (
    <SectionWrap>
      <div className="flex flex-col gap-2 text-sm text-fd-muted-foreground">
        <p>Released under the MIT License.</p>
        <p>Copyright © 2024-present codexu</p>
      </div>
    </SectionWrap>
  );
}