import DownloadClient from './download-client';
import { FALLBACK_VERSION, getDownloadUrls } from '@/src/config/downloads';
import type { Metadata } from 'next';
import {
  getPageAlternates,
  normalizeLang,
  siteConfig,
} from '@/lib/seo';

type LatestUpdate = {
  version?: unknown;
};

const LATEST_UPDATE_URL = 'https://download.notegen.top/updates/latest.json';

export const revalidate = 300;

const downloadSeo = {
  cn: {
    title: '下载 NoteGen - Windows、macOS、Linux、Android 与 iOS',
    description:
      '下载开源免费的 NoteGen AI Markdown 笔记软件，支持 Windows、macOS、Linux、Android 和 iOS。',
  },
  en: {
    title: 'Download NoteGen for Windows, macOS, Linux, Android, and iOS',
    description:
      'Download NoteGen, the free and open-source AI Markdown note-taking app for Windows, macOS, Linux, Android, and iOS.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const seo = downloadSeo[language];
  const pathname = '/download';

  return {
    title: seo.title,
    description: seo.description,
    alternates: getPageAlternates(language, pathname),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/${language}${pathname}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: language === 'cn' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'cn' ? ['en_US'] : ['zh_CN'],
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DownloadPage() {
  const version = await getLatestVersion();

  return (
    <DownloadClient
      version={version}
      downloadUrls={getDownloadUrls(version)}
    />
  );
}

async function getLatestVersion() {
  try {
    const response = await fetch(LATEST_UPDATE_URL, {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch latest version: ${response.status}`);
    }

    const data = await response.json() as LatestUpdate;
    const version = typeof data.version === 'string' ? data.version.trim() : '';

    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      throw new Error('Invalid latest version payload');
    }

    return version;
  } catch (error) {
    console.warn('[download] Falling back to bundled version', error);
    return FALLBACK_VERSION;
  }
}
