export const LATEST_VERSION = '0.30.1';

const CDN_BASE_URL = 'https://download.notegen.top';
const releasePath = `${CDN_BASE_URL}/releases/note-gen-v${LATEST_VERSION}`;

export const GITHUB_RELEASES_URL = 'https://github.com/codexu/note-gen/releases/latest';

export const downloadUrls = {
  windows: `${releasePath}/NoteGen_${LATEST_VERSION}_x64-setup.exe`,
  macosAppleSilicon: `${releasePath}/NoteGen_${LATEST_VERSION}_aarch64.dmg`,
  macosIntel: `${releasePath}/NoteGen_${LATEST_VERSION}_x64.dmg`,
  linuxAppImage: `${releasePath}/NoteGen_${LATEST_VERSION}_amd64.AppImage`,
  linuxDeb: `${releasePath}/NoteGen_${LATEST_VERSION}_amd64.deb`,
  linuxRpm: `${releasePath}/NoteGen-${LATEST_VERSION}-1.x86_64.rpm`,
  androidApk: `${releasePath}/NoteGen_${LATEST_VERSION}_android-universal.apk`,
} as const;

export type DownloadUrlKey = keyof typeof downloadUrls;
