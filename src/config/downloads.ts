export const FALLBACK_VERSION = '0.31.1';

const CDN_BASE_URL = 'https://download.notegen.top';

export const GITHUB_RELEASE_HISTORY_URL = 'https://github.com/codexu/note-gen/releases';
export const GITHUB_RELEASES_URL = `${GITHUB_RELEASE_HISTORY_URL}/latest`;

export type HistoricalRelease = {
  tag: string;
  version: string;
  publishedAt: string | null;
  url: string;
  assets: { name: string; url: string; size: number }[];
};

export type ReleaseHistoryPage = {
  releases: HistoricalRelease[];
  nextPage: number | null;
};

export function getDownloadUrls(version: string) {
  const releasePath = `${CDN_BASE_URL}/releases/note-gen-v${version}`;

  return {
    windows: `${releasePath}/NoteGen_${version}_x64_en-US.msi`,
    macosAppleSilicon: `${releasePath}/NoteGen_${version}_aarch64.dmg`,
    macosIntel: `${releasePath}/NoteGen_${version}_x64.dmg`,
    linuxAppImage: `${releasePath}/NoteGen_${version}_amd64.AppImage`,
    linuxDeb: `${releasePath}/NoteGen_${version}_amd64.deb`,
    linuxRpm: `${releasePath}/NoteGen-${version}-1.x86_64.rpm`,
    androidApk: `${releasePath}/NoteGen_${version}_android-arm64.apk`,
  } as const;
}

export type DownloadUrls = ReturnType<typeof getDownloadUrls>;
export type DownloadUrlKey = keyof DownloadUrls;
