"use client";

import { useRef, useState } from "react";
import {
  ArrowDownToLine,
  ExternalLink,
  Github,
  History,
  LoaderCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GITHUB_RELEASE_HISTORY_URL,
  type HistoricalRelease,
  type ReleaseHistoryPage,
} from "@/src/config/downloads";

const copy = {
  cn: {
    title: "下载历史版本",
    description: "选择已发布的稳定版本，下载适合你设备的安装包。历史安装包通过 GitHub 下载。",
    load: "查看历史版本",
    loading: "正在加载版本…",
    select: "选择版本",
    notes: "查看此版本发布说明",
    all: "在 GitHub 查看全部版本",
    error: "暂时无法加载历史版本，请重试或前往 GitHub 下载。",
    retry: "重试",
    empty: "暂无历史稳定版本。",
    noAssets: "此版本没有可直接下载的安装包，请前往发布页面查看文件。",
    download: "下载",
  },
  en: {
    title: "Download previous versions",
    description: "Choose a stable release and download the installer for your device. Historical installers are hosted on GitHub.",
    load: "Browse previous versions",
    loading: "Loading releases…",
    select: "Choose a version",
    notes: "View release notes for this version",
    all: "View all releases on GitHub",
    error: "Could not load releases. Try again or download from GitHub.",
    retry: "Retry",
    empty: "No previous stable releases available.",
    noAssets: "This release has no installers available here. Open its release page to view the files.",
    download: "Download",
  },
} as const;

export default function ReleaseHistory({ lang, latestVersion }: { lang: "cn" | "en"; latestVersion: string }) {
  const t = copy[lang];
  const [releases, setReleases] = useState<HistoricalRelease[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fetching = useRef(false);
  const selected = releases.find((release) => release.tag === selectedTag);

  async function loadReleases() {
    if (fetching.current || loaded) return;
    fetching.current = true;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/releases?page=1", {
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Failed to load releases");
      const data: ReleaseHistoryPage = await response.json();
      const historicalReleases = data.releases.filter(
        (release) => release.version !== latestVersion,
      );
      setReleases(historicalReleases);
      setSelectedTag((previous) => previous || historicalReleases[0]?.tag || "");
      setLoaded(true);
    } catch {
      setError(true);
    } finally {
      fetching.current = false;
      setLoading(false);
    }
  }

  return (
    <section id="release-history" className="scroll-mt-24" aria-labelledby="release-history-title">
      <Card>
        <CardHeader>
          <CardTitle id="release-history-title" className="flex items-center gap-2">
            <History className="size-5" aria-hidden="true" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5" aria-busy={loading}>
          {releases.length > 0 && (
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger aria-label={t.select} className="w-full sm:w-72">
                <SelectValue placeholder={t.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {releases.map((release) => (
                    <SelectItem key={release.tag} value={release.tag}>
                      v{release.version}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {selected && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">v{selected.version}</Badge>
                {selected.publishedAt && (
                  <time dateTime={selected.publishedAt}>
                    {new Date(selected.publishedAt).toLocaleDateString(lang === "cn" ? "zh-CN" : "en-US", { timeZone: "Asia/Shanghai" })}
                  </time>
                )}
                <Button variant="link" size="sm" asChild>
                  <a href={selected.url} target="_blank" rel="noopener noreferrer">
                    {t.notes}
                    <ExternalLink data-icon="inline-end" />
                  </a>
                </Button>
              </div>
              {selected.assets.length > 0 ? (
                <ul className="grid gap-3 md:grid-cols-2">
                  {selected.assets.map((asset) => (
                    <li key={asset.url}>
                      <a
                        href={asset.url}
                        aria-label={`${t.download} ${asset.name}`}
                        className="flex h-full items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ArrowDownToLine className="size-5 shrink-0" aria-hidden="true" />
                        <span className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className="text-sm font-medium">{getInstallerLabel(asset.name, lang)}</span>
                          <span className="break-all text-xs text-muted-foreground">{asset.name}</span>
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {(asset.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">{t.noAssets}</p>
              )}
            </div>
          )}

          <div aria-live="polite">
            {error && <p role="alert" className="mb-3 text-sm text-destructive">{t.error}</p>}
            {loaded && releases.length === 0 && <p className="mb-3 text-sm text-muted-foreground">{t.empty}</p>}
            {!loaded && (
              <Button variant="outline" onClick={loadReleases} disabled={loading}>
                {loading && <LoaderCircle data-icon="inline-start" className="animate-spin" />}
                {loading ? t.loading : error ? t.retry : t.load}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" asChild>
            <a href={GITHUB_RELEASE_HISTORY_URL} target="_blank" rel="noopener noreferrer">
              <Github data-icon="inline-start" />
              {t.all}
              <ExternalLink data-icon="inline-end" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

function getInstallerLabel(name: string, lang: "cn" | "en") {
  const extension = name.split(".").pop()?.toLowerCase();
  const architecture = /(?:aarch64|arm64)/i.test(name)
    ? "ARM64"
    : /(?:x64|x86_64|amd64)/i.test(name)
      ? "x64"
      : /(?:i686|x86|ia32)/i.test(name) ? "x86" : "";

  switch (extension) {
    case "exe":
    case "msi":
      return `Windows ${architecture} · .${extension}`;
    case "dmg":
      return architecture === "ARM64"
        ? lang === "cn" ? "macOS · Apple 芯片" : "macOS · Apple silicon"
        : architecture === "x64" ? "macOS · Intel" : "macOS · .dmg";
    case "appimage":
      return `Linux ${architecture} · AppImage`;
    case "deb":
      return `Debian / Ubuntu ${architecture} · .deb`;
    case "rpm":
      return `Fedora / RHEL ${architecture} · .rpm`;
    case "apk":
      return `Android ${architecture} · .apk`;
    default:
      return name;
  }
}
