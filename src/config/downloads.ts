export const FALLBACK_VERSION = '0.31.1';

const CDN_BASE_URL = 'https://download.notegen.top';

export const GITHUB_RELEASES_URL = 'https://github.com/codexu/note-gen/releases/latest';

export function getDownloadUrls(version: string) {
  const releasePath = `${CDN_BASE_URL}/releases/note-gen-v${version}`;

  return {
    windows: `${releasePath}/NoteGen_${version}_x64-setup.exe`,
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
