// GitHub API service for fetching repository statistics

interface GitHubRepoStats {
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
}

interface GitHubReleaseAsset {
  name: string;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubReleaseAsset[];
}

// GitHub API 缓存
let githubCache: {
  data: {
    totalDownloads: number;
    stars: number;
    watchers: number;
    forks: number;
  } | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

const GITHUB_CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getGitHubRepoStats(owner: string, repo: string): Promise<{
  totalDownloads: number;
  stars: number;
  watchers: number;
  forks: number;
}> {
  const now = Date.now();
  
  // 检查缓存是否有效
  if (githubCache.data && (now - githubCache.timestamp) < GITHUB_CACHE_DURATION) {
    console.log('Using cached GitHub stats');
    return githubCache.data;
  }

  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn('GITHUB_TOKEN not found, skipping GitHub stats');
    return {
      totalDownloads: 0,
      stars: 0,
      watchers: 0,
      forks: 0,
    };
  }

  try {
    // Get repository info
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'note-gen-docs-stats',
      },
    });

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }

    const repoData: GitHubRepoStats = await repoResponse.json();

    // Get all releases to calculate total downloads
    const releasesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'note-gen-docs-stats',
      },
    });

    if (!releasesResponse.ok) {
      throw new Error(`GitHub releases API error: ${releasesResponse.status} ${releasesResponse.statusText}`);
    }

    const releases: GitHubRelease[] = await releasesResponse.json();

    // Calculate total downloads from all release assets
    let totalDownloads = 0;
    releases.forEach(release => {
      release.assets.forEach(asset => {
        totalDownloads += asset.download_count;
      });
    });

    const stats = {
      totalDownloads,
      stars: repoData.stargazers_count,
      watchers: repoData.watchers_count,
      forks: repoData.forks_count,
    };

    // 更新缓存
    githubCache.data = stats;
    githubCache.timestamp = now;

    return stats;

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    // 如果API调用失败但有缓存数据，返回缓存数据
    if (githubCache.data) {
      console.log('GitHub API failed, returning stale cache data');
      return githubCache.data;
    }
    
    return {
      totalDownloads: 0,
      stars: 0,
      watchers: 0,
      forks: 0,
    };
  }
}
