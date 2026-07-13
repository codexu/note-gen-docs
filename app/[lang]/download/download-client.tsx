"use client";
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Monitor, Github, Smartphone, Apple, Laptop, Package, Disc3 } from 'lucide-react';
import SectionWrap from '../(home)/section-wrap';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { GITHUB_RELEASES_URL, type DownloadUrls } from '@/src/config/downloads';

type DownloadKey =
  | 'windows'
  | 'macosAppleSilicon'
  | 'macosIntel'
  | 'linuxAppImage'
  | 'linuxDeb'
  | 'linuxRpm'
  | 'androidApk'
  | 'iosTestFlight';

type DownloadItem = {
  id: DownloadKey;
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
};

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; platform?: string }>;
  };
};

type DownloadClientProps = {
  version: string;
  downloadUrls: DownloadUrls;
};

export default function DownloadClient({ version, downloadUrls }: DownloadClientProps) {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';
  const [recommendedKey, setRecommendedKey] = useState<DownloadKey | null>(null);
  const [platformDetected, setPlatformDetected] = useState(false);

  const content = {
    cn: {
      title: '下载 NoteGen',
      description: '我们会优先推荐适合当前设备的安装包，也可以手动选择其他平台。',
      recommended: {
        title: '推荐下载',
        detecting: '正在识别当前平台...',
        ready: '已根据当前设备推荐合适的安装包。',
        unknown: '未能识别当前平台，请在下方选择对应系统。',
        badge: '当前平台',
      },
      other: {
        title: '其他平台下载',
        description: '如果推荐不符合您的设备，请从下面选择对应安装包。',
        windows: {
          title: 'Windows',
          description: '64 位安装程序',
        },
        macosAppleSilicon: {
          title: 'macOS Apple Silicon',
          description: '适用于 Apple M 系列芯片',
        },
        macosIntel: {
          title: 'macOS Intel',
          description: '适用于 Intel 芯片 Mac',
        },
        linuxAppImage: {
          title: 'Linux AppImage',
          description: '免安装通用包',
        },
        linuxDeb: {
          title: 'Linux DEB',
          description: '适用于 Debian / Ubuntu',
        },
        linuxRpm: {
          title: 'Linux RPM',
          description: '适用于 Fedora / RHEL / openSUSE',
        },
        android: {
          title: 'Android APK',
          description: 'Universal 通用版本，支持所有 Android 设备',
        },
        ios: {
          title: 'iOS TestFlight',
          description: '安装 TestFlight 并加入测试版本',
        },
      },
      fallback: {
        title: '备用下载',
        description: '如果 CDN 下载异常，可以前往 GitHub Releases。',
        version: '当前版本',
        github: {
          title: 'GitHub Releases',
          label: '备用下载：GitHub Releases',
          description: '备用下载入口',
        },
      },
      install: {
        title: '安装指南',
        macos: {
          title: 'macOS',
          intel: 'Intel 芯片: x64.dmg',
          silicon: 'Apple M 芯片: aarch64.dmg',
          damageWarning: 'NoteGen 暂未签名，因此安装时会出现文件已损坏的提示',
          intelFix: 'Intel：打开"系统偏好设置 > 安全性与隐私"，允许"来自未知开发者"的应用',
          siliconFix: 'Silicon：打开终端并运行以下命令：',
          command: 'sudo xattr -r -d com.apple.quarantine /Applications/NoteGen.app',
          fallback: '如果提示错误 option -r not recognized，请改为运行以下两条命令：',
          fallbackCommand1: 'sudo xattr -d com.apple.quarantine /Applications/NoteGen.app',
          fallbackCommand2: 'sudo xattr -d com.apple.quarantine /Applications/NoteGen.app/Contents/MacOS/*',
        },
        linux: {
          title: 'Linux',
          appImage: 'AppImage: amd64.AppImage',
          deb: 'DEB: amd64.deb',
          rpm: 'RPM: x86_64.rpm',
        },
        windows: {
          title: 'Windows',
          x64: '64 位: x64-setup.exe',
        },
      },
    },
    en: {
      title: 'Download NoteGen',
      description: 'We recommend the installer for this device first, and you can still choose any other platform.',
      recommended: {
        title: 'Recommended Download',
        detecting: 'Detecting your platform...',
        ready: 'Recommended for your current device.',
        unknown: 'We could not detect your platform. Choose the matching system below.',
        badge: 'Current platform',
      },
      other: {
        title: 'Other Platforms',
        description: 'If the recommendation does not match your device, choose the right package below.',
        windows: {
          title: 'Windows',
          description: '64-bit installer',
        },
        macosAppleSilicon: {
          title: 'macOS Apple Silicon',
          description: 'For Apple M-series Macs',
        },
        macosIntel: {
          title: 'macOS Intel',
          description: 'For Intel-based Macs',
        },
        linuxAppImage: {
          title: 'Linux AppImage',
          description: 'Portable package',
        },
        linuxDeb: {
          title: 'Linux DEB',
          description: 'For Debian / Ubuntu',
        },
        linuxRpm: {
          title: 'Linux RPM',
          description: 'For Fedora / RHEL / openSUSE',
        },
        android: {
          title: 'Android APK',
          description: 'Universal version for all Android devices',
        },
        ios: {
          title: 'iOS TestFlight',
          description: 'Install TestFlight and join the testing version',
        },
      },
      fallback: {
        title: 'Fallback Download',
        description: 'If the CDN download is unavailable, use GitHub Releases.',
        version: 'Current version',
        github: {
          title: 'GitHub Releases',
          label: 'Fallback: GitHub Releases',
          description: 'Fallback download',
        },
      },
      install: {
        title: 'Installation Guide',
        macos: {
          title: 'macOS',
          intel: 'Intel Chip: x64.dmg',
          silicon: 'Apple M Chip: aarch64.dmg',
          damageWarning: 'NoteGen is not yet signed, so you may see a "file is damaged" warning during installation',
          intelFix: 'Intel: Go to "System Preferences > Security & Privacy" and allow apps from "unidentified developer"',
          siliconFix: 'Silicon: Open Terminal and run the following command:',
          command: 'sudo xattr -r -d com.apple.quarantine /Applications/NoteGen.app',
          fallback: 'If you get "option -r not recognized" error, run these two commands instead:',
          fallbackCommand1: 'sudo xattr -d com.apple.quarantine /Applications/NoteGen.app',
          fallbackCommand2: 'sudo xattr -d com.apple.quarantine /Applications/NoteGen.app/Contents/MacOS/*',
        },
        linux: {
          title: 'Linux',
          appImage: 'AppImage: amd64.AppImage',
          deb: 'DEB: amd64.deb',
          rpm: 'RPM: x86_64.rpm',
        },
        windows: {
          title: 'Windows',
          x64: '64-bit: x64-setup.exe',
        },
      },
    },
  };

  const t = content[lang];
  const downloads: DownloadItem[] = useMemo(() => [
    {
      id: 'windows',
      href: downloadUrls.windows,
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      title: t.other.windows.title,
      description: t.other.windows.description,
    },
    {
      id: 'macosAppleSilicon',
      href: downloadUrls.macosAppleSilicon,
      icon: <Apple className="w-8 h-8" />,
      title: t.other.macosAppleSilicon.title,
      description: t.other.macosAppleSilicon.description,
    },
    {
      id: 'macosIntel',
      href: downloadUrls.macosIntel,
      icon: <Laptop className="w-8 h-8 text-zinc-500" />,
      title: t.other.macosIntel.title,
      description: t.other.macosIntel.description,
    },
    {
      id: 'linuxAppImage',
      href: downloadUrls.linuxAppImage,
      icon: <Package className="w-8 h-8 text-orange-500" />,
      title: t.other.linuxAppImage.title,
      description: t.other.linuxAppImage.description,
    },
    {
      id: 'linuxDeb',
      href: downloadUrls.linuxDeb,
      icon: <Package className="w-8 h-8 text-red-500" />,
      title: t.other.linuxDeb.title,
      description: t.other.linuxDeb.description,
    },
    {
      id: 'linuxRpm',
      href: downloadUrls.linuxRpm,
      icon: <Disc3 className="w-8 h-8 text-sky-500" />,
      title: t.other.linuxRpm.title,
      description: t.other.linuxRpm.description,
    },
    {
      id: 'androidApk',
      href: downloadUrls.androidApk,
      icon: <Smartphone className="w-8 h-8 text-green-500" />,
      title: t.other.android.title,
      description: t.other.android.description,
    },
    {
      id: 'iosTestFlight',
      href: 'https://testflight.apple.com/join/8KjFRTCq',
      icon: <Apple className="w-8 h-8" />,
      title: t.other.ios.title,
      description: t.other.ios.description,
      external: true,
    },
  ], [t]);

  const recommendedDownload = downloads.find((item) => item.id === recommendedKey);
  const otherDownloads = recommendedDownload
    ? downloads.filter((item) => item.id !== recommendedDownload.id)
    : downloads;

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionWrap className="py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl text-fd-muted-foreground leading-8">
            {t.description}
          </p>
        </div>
      </SectionWrap>

      {/* Recommended Section */}
      <SectionWrap className="py-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.recommended.title}</h2>
          <p className="text-fd-muted-foreground mb-6">
            {!platformDetected && t.recommended.detecting}
            {platformDetected && !recommendedDownload && t.recommended.unknown}
            {recommendedDownload && t.recommended.ready}
          </p>
          {recommendedDownload && (
            <GlowingCard {...recommendedDownload} badge={t.recommended.badge} featured />
          )}

          <div className="mt-4 flex flex-col gap-3 rounded-lg border bg-fd-muted/30 px-4 py-3 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {t.fallback.version}: <strong className="font-semibold text-fd-foreground">v{version}</strong>
            </span>
            <a
              href={GITHUB_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 font-medium text-fd-foreground transition-colors hover:text-fd-primary"
            >
              <Github className="h-4 w-4" />
              {t.fallback.github.label}
            </a>
          </div>
        </div>
      </SectionWrap>

      {/* Other Platforms Section */}
      <SectionWrap className="py-8 bg-fd-accent/5">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.other.title}</h2>
          <p className="text-fd-muted-foreground">{t.other.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherDownloads.map((item) => (
            <GlowingCard key={item.href} {...item} compact />
          ))}
        </div>
      </SectionWrap>

      {/* Installation Guide */}
      <SectionWrap className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.install.title}</h2>

        {/* macOS */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Apple className="w-5 h-5" />
            {t.install.macos.title}
          </h3>
          <div className="space-y-4 text-fd-muted-foreground">
            <p className="text-sm font-mono bg-fd-muted px-3 py-2 rounded">{t.install.macos.intel}</p>
            <p className="text-sm font-mono bg-fd-muted px-3 py-2 rounded">{t.install.macos.silicon}</p>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">{t.install.macos.damageWarning}</p>
            </div>
            <p><strong>Intel:</strong> {t.install.macos.intelFix}</p>
            <p><strong>Silicon:</strong> {t.install.macos.siliconFix}</p>
            <pre className="text-sm font-mono bg-fd-muted p-4 rounded-lg overflow-x-auto">
              <code>{t.install.macos.command}</code>
            </pre>
            <p className="text-sm">{t.install.macos.fallback}</p>
            <pre className="text-sm font-mono bg-fd-muted p-4 rounded-lg overflow-x-auto">
              <code>{t.install.macos.fallbackCommand1}<br/>{t.install.macos.fallbackCommand2}</code>
            </pre>
          </div>
        </div>

        {/* Linux */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-xl font-semibold mb-4">{t.install.linux.title}</h3>
          <div className="flex flex-wrap gap-2">
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.linux.appImage}
            </p>
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.linux.deb}
            </p>
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.linux.rpm}
            </p>
          </div>
        </div>

        {/* Windows */}
        <div className="max-w-3xl">
          <h3 className="text-xl font-semibold mb-4">{t.install.windows.title}</h3>
          <div className="space-y-2">
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.windows.x64}
            </p>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}

interface GlowingCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
  badge?: string;
  featured?: boolean;
  compact?: boolean;
}

function GlowingCard({ href, icon, title, description, external, badge, featured, compact }: GlowingCardProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group relative block h-full"
    >
      <div className={`relative h-full rounded-lg border p-2 ${featured ? 'border-fd-primary/40' : ''}`}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className={`border-0.75 relative flex h-full flex-col justify-between overflow-hidden rounded-md dark:shadow-[0px_0px_27px_0px_#2D2D2D] ${compact ? 'gap-4 p-4' : 'gap-6 p-6'}`}>
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2">
                {icon}
              </div>
              {badge && (
                <span className="shrink-0 rounded-md bg-fd-primary px-2 py-1 text-xs font-medium text-fd-primary-foreground">
                  {badge}
                </span>
              )}
            </div>
            <div className="space-y-3">
              <h3 className={`pt-0.5 font-sans font-semibold text-balance text-black dark:text-white ${compact ? 'text-lg/[1.5rem]' : 'text-xl/[1.375rem] md:text-2xl/[1.875rem]'}`}>
                {title}
              </h3>
              <p className={`font-sans text-black dark:text-neutral-400 ${compact ? 'text-sm/[1.25rem]' : 'text-sm/[1.125rem] md:text-base/[1.375rem]'}`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

async function getRecommendedDownloadKey(): Promise<DownloadKey | null> {
  if (typeof navigator === 'undefined') {
    return null;
  }

  const nav = navigator as NavigatorWithUserAgentData;
  const platform = `${nav.userAgentData?.platform || navigator.platform || ''}`.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const platformText = `${platform} ${userAgent}`;

  if (/android/.test(platformText)) {
    return 'androidApk';
  }

  if (/iphone|ipad|ipod/.test(platformText)) {
    return 'iosTestFlight';
  }

  if (/win/.test(platformText)) {
    return 'windows';
  }

  if (/mac/.test(platformText)) {
    const architecture = await getArchitecture(nav);

    if (architecture && /x86|x64|amd64/.test(architecture)) {
      return 'macosIntel';
    }

    return 'macosAppleSilicon';
  }

  if (/linux/.test(platformText)) {
    return 'linuxAppImage';
  }

  return null;
}

async function getArchitecture(nav: NavigatorWithUserAgentData) {
  try {
    const values = await nav.userAgentData?.getHighEntropyValues?.(['architecture']);
    return values?.architecture?.toLowerCase() || '';
  } catch {
    return '';
  }
}
