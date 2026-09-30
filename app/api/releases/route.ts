import { NextRequest, NextResponse } from 'next/server';
import type { ReleaseHistoryPage } from '@/src/config/downloads';

type GitHubRelease = {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  html_url: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
    state: string;
  }[];
};

export async function GET(request: NextRequest) {
  const pageParam = request.nextUrl.searchParams.get('page') ?? '1';
  const page = Number(pageParam);

  if (!/^\d+$/.test(pageParam) || !Number.isSafeInteger(page) || page < 1) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
  }

  try {
    const headers = new Headers({
      Accept: 'application/vnd.github+json',
      'User-Agent': 'NoteGen-Website',
    });
    if (process.env.GITHUB_TOKEN) {
      headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
    }

    const response = await fetch(
      `https://api.github.com/repos/codexu/note-gen/releases?per_page=20&page=${page}`,
      { headers, next: { revalidate: 300 }, signal: AbortSignal.timeout(15000) },
    );
    if (!response.ok) {
      throw new Error(`GitHub releases request failed: ${response.status}`);
    }

    const data: GitHubRelease[] = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid releases response');
    }

    const result: ReleaseHistoryPage = {
      releases: data
        .filter((release) => !release.draft && !release.prerelease)
        .map((release) => ({
          tag: release.tag_name,
          version: release.tag_name.replace(/^(?:note-gen-)?v/, ''),
          publishedAt: release.published_at,
          url: release.html_url,
          // Use published assets: older versions may have different names or platforms.
          assets: release.assets
            .filter((asset) => asset.state === 'uploaded' && /\.(exe|msi|dmg|AppImage|deb|rpm|apk)$/i.test(asset.name))
            .map((asset) => ({
              name: asset.name,
              url: asset.browser_download_url,
              size: asset.size,
            })),
        })),
      nextPage: response.headers.get('link')?.includes('rel="next"') ? page + 1 : null,
    };

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
    });
  } catch (error) {
    console.warn('[download] Failed to fetch release history', error);
    return NextResponse.json(
      { error: 'Release history is temporarily unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
