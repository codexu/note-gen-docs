"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  Apple,
  ArrowDownToLine,
  Check,
  ChevronRight,
  CircleHelp,
  Download,
  ExternalLink,
  Github,
  Laptop,
  Monitor,
  Package,
  ShieldCheck,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import SectionWrap from "../(home)/section-wrap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GITHUB_RELEASES_URL,
  type DownloadUrls,
} from "@/src/config/downloads";
import { toast } from "sonner";

type DownloadKey =
  | "windows"
  | "macosAppleSilicon"
  | "macosIntel"
  | "linuxAppImage"
  | "linuxDeb"
  | "linuxRpm"
  | "androidApk"
  | "iosTestFlight";

type DownloadItem = {
  id: DownloadKey;
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  format: string;
  action: string;
  external?: boolean;
};

type PlatformGroup = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: DownloadItem[];
};

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (
      hints: string[],
    ) => Promise<{ architecture?: string; platform?: string }>;
  };
};

type DownloadClientProps = {
  version: string;
  downloadUrls: DownloadUrls;
};

const copy = {
  cn: {
    eyebrow: "开源 · 本地优先 · 跨平台",
    title: "下载 NoteGen，开始记录。",
    description:
      "无需注册。灵感、截图、链接和文件先进入记录箱，需要时再由 AI 整理成可编辑的 Markdown。",
    currentVersion: "最新稳定版",
    recommended: "适合当前设备",
    detecting: "正在识别你的设备…",
    unknown: "选择适合你的平台",
    unknownDescription: "我们暂时无法识别当前设备，请从下方选择安装包。",
    download: "立即下载",
    releaseNotes: "查看 GitHub Releases",
    autoDownload: {
      title: "下载即将自动开始",
      description: "如果浏览器没有响应，可以手动重新下载。",
      retry: "重新下载",
    },
    trust: ["免费开源", "本地保存", "持续更新"],
    allPlatforms: "选择你的平台",
    allPlatformsDescription: "同一份 NoteGen，覆盖桌面端和移动端。",
    packagesLabel: "可用安装包",
    groups: {
      windows: {
        title: "Windows",
        description: "Windows 10 及以上",
      },
      macos: {
        title: "macOS",
        description: "根据 Mac 芯片选择",
      },
      linux: {
        title: "Linux",
        description: "通用包与主流发行版",
      },
      mobile: {
        title: "移动端",
        description: "Android 与 iOS 测试版",
      },
    },
    downloads: {
      windows: {
        title: "Windows 64 位",
        description: "标准安装程序",
        format: ".exe",
        action: "下载 Windows 版",
      },
      macosAppleSilicon: {
        title: "Apple 芯片",
        description: "M1 / M2 / M3 / M4 系列",
        format: ".dmg",
        action: "下载 Apple 芯片版",
      },
      macosIntel: {
        title: "Intel 芯片",
        description: "适用于 Intel Mac",
        format: ".dmg",
        action: "下载 Intel 版",
      },
      linuxAppImage: {
        title: "AppImage",
        description: "免安装，适合多数发行版",
        format: "x86_64",
        action: "下载 AppImage",
      },
      linuxDeb: {
        title: "Debian / Ubuntu",
        description: "APT 系发行版",
        format: ".deb",
        action: "下载 DEB",
      },
      linuxRpm: {
        title: "Fedora / RHEL",
        description: "RPM 系发行版",
        format: ".rpm",
        action: "下载 RPM",
      },
      androidApk: {
        title: "Android",
        description: "ARM64 安装包",
        format: ".apk",
        action: "下载 Android 版",
      },
      iosTestFlight: {
        title: "iPhone / iPad",
        description: "通过 TestFlight 安装",
        format: "TestFlight",
        action: "加入 iOS 测试",
      },
    },
    install: {
      title: "安装前，你可能想知道",
      description: "常见安装问题都整理在这里。",
      macos: {
        title: "macOS 安全提示",
        description:
          "NoteGen 暂未签名。如果系统提示应用“已损坏”，将应用拖入“应用程序”后打开终端，运行：",
        fallback: "如果系统不支持 -r 参数",
      },
      chooseMac: {
        title: "不知道 Mac 芯片？",
        description:
          "点击左上角  →“关于本机”。看到 Apple M 系列请选择 Apple 芯片版；看到 Intel 请选择 Intel 版。",
      },
      linux: {
        title: "Linux 怎么选？",
        description:
          "不确定时优先选择 AppImage；Ubuntu / Debian 选择 DEB；Fedora / RHEL / openSUSE 选择 RPM。",
      },
      source: {
        title: "想核对发布文件？",
        description: "所有正式版本都会同步到 GitHub Releases，可在那里查看完整文件列表。",
        action: "前往 GitHub Releases",
      },
    },
  },
  en: {
    eyebrow: "Open source · Local-first · Cross-platform",
    title: "Download NoteGen. Start capturing.",
    description:
      "No account required. Capture ideas, screenshots, links, and files first, then turn them into editable Markdown with AI.",
    currentVersion: "Latest stable",
    recommended: "Recommended for this device",
    detecting: "Detecting your device…",
    unknown: "Choose your platform",
    unknownDescription:
      "We could not identify this device. Pick the matching installer below.",
    download: "Download now",
    releaseNotes: "View GitHub Releases",
    autoDownload: {
      title: "Your download is starting",
      description:
        "If your browser does not respond, you can download it manually.",
      retry: "Download again",
    },
    trust: ["Free and open source", "Stored locally", "Actively maintained"],
    allPlatforms: "Choose your platform",
    allPlatformsDescription:
      "The same NoteGen experience across desktop and mobile.",
    packagesLabel: "Available packages",
    groups: {
      windows: {
        title: "Windows",
        description: "Windows 10 and later",
      },
      macos: {
        title: "macOS",
        description: "Choose your Mac chip",
      },
      linux: {
        title: "Linux",
        description: "Universal and native packages",
      },
      mobile: {
        title: "Mobile",
        description: "Android and iOS beta",
      },
    },
    downloads: {
      windows: {
        title: "Windows 64-bit",
        description: "Standard installer",
        format: ".exe",
        action: "Download for Windows",
      },
      macosAppleSilicon: {
        title: "Apple silicon",
        description: "M1 / M2 / M3 / M4 series",
        format: ".dmg",
        action: "Download for Apple silicon",
      },
      macosIntel: {
        title: "Intel chip",
        description: "For Intel-based Macs",
        format: ".dmg",
        action: "Download for Intel",
      },
      linuxAppImage: {
        title: "AppImage",
        description: "Portable, for most distributions",
        format: "x86_64",
        action: "Download AppImage",
      },
      linuxDeb: {
        title: "Debian / Ubuntu",
        description: "For APT-based distributions",
        format: ".deb",
        action: "Download DEB",
      },
      linuxRpm: {
        title: "Fedora / RHEL",
        description: "For RPM-based distributions",
        format: ".rpm",
        action: "Download RPM",
      },
      androidApk: {
        title: "Android",
        description: "ARM64 package",
        format: ".apk",
        action: "Download for Android",
      },
      iosTestFlight: {
        title: "iPhone / iPad",
        description: "Install with TestFlight",
        format: "TestFlight",
        action: "Join the iOS beta",
      },
    },
    install: {
      title: "Good to know before installing",
      description: "Quick answers to the most common installation questions.",
      macos: {
        title: "macOS security notice",
        description:
          "NoteGen is not signed yet. If macOS says the app is “damaged,” move it to Applications, open Terminal, and run:",
        fallback: "If your system does not support the -r option",
      },
      chooseMac: {
        title: "Not sure which Mac chip?",
        description:
          "Choose Apple menu → About This Mac. Select Apple silicon for an M-series chip, or Intel for an Intel processor.",
      },
      linux: {
        title: "Which Linux package?",
        description:
          "Choose AppImage if unsure, DEB for Ubuntu / Debian, or RPM for Fedora / RHEL / openSUSE.",
      },
      source: {
        title: "Want to verify the release?",
        description:
          "Every stable build is also published to GitHub Releases with the complete asset list.",
        action: "Open GitHub Releases",
      },
    },
  },
} as const;

export default function DownloadClient({
  version,
  downloadUrls,
}: DownloadClientProps) {
  const params = useParams();
  const lang = (params?.lang as "cn" | "en") || "cn";
  const t = copy[lang];
  const [recommendedKey, setRecommendedKey] = useState<DownloadKey | null>(
    null,
  );
  const [platformDetected, setPlatformDetected] = useState(false);
  const autoDownloadTriggered = useRef(false);

  const downloads: DownloadItem[] = [
    {
      id: "windows",
      href: downloadUrls.windows,
      icon: Monitor,
      ...t.downloads.windows,
    },
    {
      id: "macosAppleSilicon",
      href: downloadUrls.macosAppleSilicon,
      icon: Apple,
      ...t.downloads.macosAppleSilicon,
    },
    {
      id: "macosIntel",
      href: downloadUrls.macosIntel,
      icon: Laptop,
      ...t.downloads.macosIntel,
    },
    {
      id: "linuxAppImage",
      href: downloadUrls.linuxAppImage,
      icon: Package,
      ...t.downloads.linuxAppImage,
    },
    {
      id: "linuxDeb",
      href: downloadUrls.linuxDeb,
      icon: Package,
      ...t.downloads.linuxDeb,
    },
    {
      id: "linuxRpm",
      href: downloadUrls.linuxRpm,
      icon: Package,
      ...t.downloads.linuxRpm,
    },
    {
      id: "androidApk",
      href: downloadUrls.androidApk,
      icon: Smartphone,
      ...t.downloads.androidApk,
    },
    {
      id: "iosTestFlight",
      href: "https://testflight.apple.com/join/8KjFRTCq",
      icon: Apple,
      external: true,
      ...t.downloads.iosTestFlight,
    },
  ];

  const groups: PlatformGroup[] = [
    {
      icon: Monitor,
      ...t.groups.windows,
      items: downloads.filter((item) => item.id === "windows"),
    },
    {
      icon: Apple,
      ...t.groups.macos,
      items: downloads.filter((item) => item.id.startsWith("macos")),
    },
    {
      icon: Terminal,
      ...t.groups.linux,
      items: downloads.filter((item) => item.id.startsWith("linux")),
    },
    {
      icon: Smartphone,
      ...t.groups.mobile,
      items: downloads.filter(
        (item) => item.id === "androidApk" || item.id === "iosTestFlight",
      ),
    },
  ];

  const recommendedDownload = downloads.find(
    (item) => item.id === recommendedKey,
  );

  useEffect(() => {
    let cancelled = false;

    async function detectPlatform() {
      const detected = await getRecommendedDownloadKey();

      if (!cancelled) {
        setRecommendedKey(detected);
        setPlatformDetected(true);
      }
    }

    detectPlatform();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (
      !recommendedDownload ||
      recommendedDownload.external ||
      autoDownloadTriggered.current
    ) {
      return;
    }

    toast(t.autoDownload.title, {
      description: t.autoDownload.description,
      duration: 6000,
      action: {
        label: t.autoDownload.retry,
        onClick: () => triggerDownload(recommendedDownload.href),
      },
    });

    const timer = window.setTimeout(() => {
      if (autoDownloadTriggered.current) {
        return;
      }

      autoDownloadTriggered.current = true;
      triggerDownload(recommendedDownload.href);
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [recommendedDownload?.external, recommendedDownload?.href]);

  return (
    <main className="min-h-screen">
      <SectionWrap className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Badge variant="outline">{t.eyebrow}</Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t.description}
          </p>

          <Card className="mt-10 w-full overflow-hidden text-left shadow-lg sm:mt-12">
            <CardHeader className="gap-4 border-b md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
                  {recommendedDownload ? (
                    <recommendedDownload.icon className="size-6" />
                  ) : (
                    <Download className="size-6" />
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl">
                      {!platformDetected && t.detecting}
                      {platformDetected &&
                        (recommendedDownload?.title || t.unknown)}
                    </CardTitle>
                    {recommendedDownload && (
                      <Badge variant="secondary">{t.recommended}</Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    {recommendedDownload?.description || t.unknownDescription}
                  </CardDescription>
                </div>
              </div>
              <CardAction className="col-auto row-auto self-auto justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:justify-self-end">
                {recommendedDownload ? (
                  <Button size="lg" asChild className="w-full md:w-auto">
                    <a
                      href={recommendedDownload.href}
                      target={
                        recommendedDownload.external ? "_blank" : undefined
                      }
                      rel={
                        recommendedDownload.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <ArrowDownToLine data-icon="inline-start" />
                      {recommendedDownload.action}
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" asChild className="w-full md:w-auto">
                    <a href="#all-platforms">
                      {t.unknown}
                      <ChevronRight data-icon="inline-end" />
                    </a>
                  </Button>
                )}
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {t.trust.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {t.currentVersion}{" "}
                <strong className="font-medium text-foreground">v{version}</strong>
              </span>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github data-icon="inline-start" />
                  {t.releaseNotes}
                  <ExternalLink data-icon="inline-end" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SectionWrap>

      <SectionWrap className="py-12 md:py-16">
        <div id="all-platforms" className="scroll-mt-24">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t.allPlatforms}
            </h2>
            <p className="text-muted-foreground">
              {t.allPlatformsDescription}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <PlatformCard
                key={group.title}
                group={group}
                packagesLabel={t.packagesLabel}
              />
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t.install.title}
          </h2>
          <p className="text-muted-foreground">{t.install.description}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted">
                <ShieldCheck className="size-5" />
              </div>
              <CardTitle>{t.install.macos.title}</CardTitle>
              <CardDescription className="max-w-2xl leading-6">
                {t.install.macos.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <CommandLine command="sudo xattr -r -d com.apple.quarantine /Applications/NoteGen.app" />
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {t.install.macos.fallback}
                </summary>
                <div className="mt-3 flex flex-col gap-2">
                  <CommandLine command="sudo xattr -d com.apple.quarantine /Applications/NoteGen.app" />
                  <CommandLine command="sudo xattr -d com.apple.quarantine /Applications/NoteGen.app/Contents/MacOS/*" />
                </div>
              </details>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted">
                <CircleHelp className="size-5" />
              </div>
              <CardTitle>{t.install.chooseMac.title}</CardTitle>
              <CardDescription className="leading-6">
                {t.install.chooseMac.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <InfoCard icon={Terminal} {...t.install.linux} />

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted">
                <Github className="size-5" />
              </div>
              <CardTitle>{t.install.source.title}</CardTitle>
              <CardDescription className="leading-6">
                {t.install.source.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" asChild>
                <a
                  href={GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github data-icon="inline-start" />
                  {t.install.source.action}
                  <ExternalLink data-icon="inline-end" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SectionWrap>
    </main>
  );
}

function PlatformCard({
  group,
  packagesLabel,
}: {
  group: PlatformGroup;
  packagesLabel: string;
}) {
  const GroupIcon = group.icon;

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="grid grid-cols-[auto_1fr] items-center gap-4 border-b bg-muted/50 py-6">
        <div className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
          <GroupIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-1.5">
          <CardTitle className="text-xl">{group.title}</CardTitle>
          <CardDescription>{group.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {packagesLabel}
        </div>
        <div className="flex flex-col gap-2">
          {group.items.map((item) => (
            <DownloadRow key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DownloadRow({ item }: { item: DownloadItem }) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={item.action}
      className="group flex items-center gap-3 rounded-lg border bg-background px-4 py-3 outline-none transition-colors hover:bg-muted/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      <Badge
        variant="secondary"
        className="hidden min-w-14 justify-center font-mono sm:inline-flex"
      >
        {item.format}
      </Badge>
      <div className="min-w-0 flex-1">
        <div className="font-medium">{item.title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">
          {item.description}
        </div>
      </div>
      <Badge variant="outline" className="font-mono sm:hidden">
        {item.format}
      </Badge>
      {item.external ? (
        <ExternalLink
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      ) : (
        <ArrowDownToLine
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-muted px-4 py-3 text-sm">
      <code>{command}</code>
    </pre>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted">
          <Icon className="size-5" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

async function getRecommendedDownloadKey(): Promise<DownloadKey | null> {
  if (typeof navigator === "undefined") {
    return null;
  }

  const nav = navigator as NavigatorWithUserAgentData;
  const platform =
    `${nav.userAgentData?.platform || navigator.platform || ""}`.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const platformText = `${platform} ${userAgent}`;

  if (/android/.test(platformText)) {
    return "androidApk";
  }

  if (/iphone|ipad|ipod/.test(platformText)) {
    return "iosTestFlight";
  }

  if (/win/.test(platformText)) {
    return "windows";
  }

  if (/mac/.test(platformText)) {
    const architecture = await getArchitecture(nav);

    if (architecture && /x86|x64|amd64/.test(architecture)) {
      return "macosIntel";
    }

    return "macosAppleSilicon";
  }

  if (/linux/.test(platformText)) {
    return "linuxAppImage";
  }

  return null;
}

function triggerDownload(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function getArchitecture(nav: NavigatorWithUserAgentData) {
  try {
    const values = await nav.userAgentData?.getHighEntropyValues?.([
      "architecture",
    ]);
    return values?.architecture?.toLowerCase() || "";
  } catch {
    return "";
  }
}
