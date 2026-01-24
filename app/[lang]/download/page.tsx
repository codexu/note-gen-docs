"use client";
import { useParams } from 'next/navigation';
import { Monitor, Github, Download, Smartphone, Apple, AlertCircle } from 'lucide-react';
import SectionWrap from '../(home)/section-wrap';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function DownloadPage() {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';

  const content = {
    cn: {
      title: '下载 NoteGen',
      description: '选择您的平台，开始使用 NoteGen',
      desktop: {
        title: '桌面端',
        description: '支持 Windows、macOS、Linux',
        upgradelink: {
          title: '桌面端客户端',
          description: '由 UpgradeLink 提供应用升级与下载服务',
        },
        github: {
          title: 'GitHub 下载',
          description: '由 GitHub 提供下载服务',
        },
      },
      mobile: {
        title: '移动端（Beta）',
        warning: '移动端目前正在开发状态，未上架任何应用商店，可下载自行安装或编译安装。',
        android: {
          title: 'Android 通用版',
          description: 'Universal 通用版本，支持所有 Android 设备',
        },
        ios: {
          title: 'iOS 内测版',
          description: '安装 TestFlight 并加入内测版',
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
          version: 'x86_64.rpm',
        },
        windows: {
          title: 'Windows',
          x64: '64位: x64-setup.exe',
          x86: '32位: x86-setup.exe',
        },
      },
    },
    en: {
      title: 'Download NoteGen',
      description: 'Choose your platform and get started with NoteGen',
      desktop: {
        title: 'Desktop',
        description: 'Supports Windows, macOS, Linux',
        upgradelink: {
          title: 'Desktop Client',
          description: 'Powered by UpgradeLink',
        },
        github: {
          title: 'GitHub Download',
          description: 'Powered by GitHub',
        },
      },
      mobile: {
        title: 'Mobile (Beta)',
        warning: 'Mobile version is currently in development. Not available on app stores yet.',
        android: {
          title: 'Android Universal',
          description: 'Universal version for all Android devices',
        },
        ios: {
          title: 'iOS Beta',
          description: 'Install TestFlight and join the beta',
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
          version: 'x86_64.rpm',
        },
        windows: {
          title: 'Windows',
          x64: '64-bit: x64-setup.exe',
          x86: '32-bit: x86-setup.exe',
        },
      },
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionWrap className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg md:text-xl text-fd-muted-foreground max-w-2xl mx-auto">
          {t.description}
        </p>
      </SectionWrap>

      {/* Desktop Section */}
      <SectionWrap className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{t.desktop.title}</h2>
        <p className="text-fd-muted-foreground text-center mb-8">{t.desktop.description}</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <GlowingCard
            href="http://download.upgrade.toolsetlink.com/download?appKey=tyEi-iLVFxnRhGc9c_xApw"
            icon={<Monitor className="w-8 h-8 text-purple-500" />}
            title={t.desktop.upgradelink.title}
            description={t.desktop.upgradelink.description}
          />
          <GlowingCard
            href="https://github.com/codexu/note-gen/releases"
            icon={<Github className="w-8 h-8" />}
            title={t.desktop.github.title}
            description={t.desktop.github.description}
            external
          />
        </div>
      </SectionWrap>

      {/* Mobile Section */}
      <SectionWrap className="py-8 bg-fd-accent/5">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.mobile.title}</h2>
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-600 dark:text-amber-400">{t.mobile.warning}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <GlowingCard
            href="https://download.upgrade.toolsetlink.com/download?appKey=UScEcQD5Frt6Pn3p8z-7OA"
            icon={<Smartphone className="w-8 h-8 text-green-500" />}
            title={t.mobile.android.title}
            description={t.mobile.android.description}
          />
          <GlowingCard
            href="https://testflight.apple.com/join/8KjFRTCq"
            icon={<Apple className="w-8 h-8" />}
            title={t.mobile.ios.title}
            description={t.mobile.ios.description}
            external
          />
        </div>
      </SectionWrap>

      {/* Installation Guide */}
      <SectionWrap className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t.install.title}</h2>

        {/* macOS */}
        <div className="max-w-3xl mx-auto mb-12">
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
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-xl font-semibold mb-4">{t.install.linux.title}</h3>
          <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded inline-block">
            {t.install.linux.version}
          </p>
        </div>

        {/* Windows */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">{t.install.windows.title}</h3>
          <div className="space-y-2">
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.windows.x64}
            </p>
            <p className="text-fd-muted-foreground text-sm font-mono bg-fd-muted px-3 py-2 rounded">
              {t.install.windows.x86}
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
}

function GlowingCard({ href, icon, title, description, external }: GlowingCardProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group relative block h-full"
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
