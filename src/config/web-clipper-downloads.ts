const LATEST_WEB_CLIPPER_URL =
  "https://download.notegen.top/web-clipper/latest.json";

export const WEB_CLIPPER_REVALIDATE_SECONDS = 300;

export type WebClipperDownload = {
  url: string;
  filename: string;
  size: number;
  sha256: string;
};

export type WebClipperRelease = {
  version: string;
  publishedAt: string;
  downloads: {
    chrome: WebClipperDownload;
    edge: WebClipperDownload;
    firefox?: WebClipperDownload;
  };
};

export async function getLatestWebClipperRelease(): Promise<WebClipperRelease | null> {
  try {
    const response = await fetch(LATEST_WEB_CLIPPER_URL, {
      next: { revalidate: WEB_CLIPPER_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch latest release: ${response.status}`);
    }

    return parseRelease(await response.json());
  } catch (error) {
    console.warn("[web-clipper] Failed to load latest release", error);
    return null;
  }
}

function parseRelease(value: unknown): WebClipperRelease {
  if (!isRecord(value) || value.schemaVersion !== 1) {
    throw new Error("Invalid web clipper release payload");
  }

  const version = readString(value.version);
  const publishedAt = readString(value.publishedAt);
  const downloads = value.downloads;

  if (
    !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version) ||
    !Number.isFinite(Date.parse(publishedAt)) ||
    !isRecord(downloads)
  ) {
    throw new Error("Invalid web clipper release metadata");
  }

  return {
    version,
    publishedAt,
    downloads: {
      chrome: parseDownload(downloads.chrome),
      edge: parseDownload(downloads.edge),
      firefox:
        downloads.firefox === undefined
          ? undefined
          : parseDownload(downloads.firefox),
    },
  };
}

function parseDownload(value: unknown): WebClipperDownload {
  if (!isRecord(value)) {
    throw new Error("Invalid web clipper download");
  }

  const url = readString(value.url);
  const filename = readString(value.filename);
  const sha256 = readString(value.sha256);
  const size = value.size;
  const parsedUrl = new URL(url);

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== "download.notegen.top" ||
    !filename.endsWith(".zip") ||
    typeof size !== "number" ||
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    !/^[a-f0-9]{64}$/i.test(sha256)
  ) {
    throw new Error("Invalid web clipper download metadata");
  }

  return { url, filename, size, sha256 };
}

function readString(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Expected a non-empty string");
  }

  return value.trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
