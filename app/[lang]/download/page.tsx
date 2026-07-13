import DownloadClient from './download-client';
import { FALLBACK_VERSION, getDownloadUrls } from '@/src/config/downloads';

type LatestUpdate = {
  version?: unknown;
};

const LATEST_UPDATE_URL = 'https://download.notegen.top/updates/latest.json';

export const revalidate = 300;

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
