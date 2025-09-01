// GitHub 数据缓存和静态生成工具
import { unstable_cache } from 'next/cache';

type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

type GitHubStats = {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
};

// 获取贡献者数据（带缓存）
export const getContributors = unstable_cache(
  async (): Promise<Contributor[]> => {
    try {
      const token = process.env.GITHUB_TOKEN;
      
      if (!token) {
        console.warn('GITHUB_TOKEN not found in environment variables');
        return [];
      }

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${token}`);
      
      const response = await fetch('https://api.github.com/repos/codexu/note-gen/contributors?per_page=24', {
        headers,
        cache: 'force-cache',
      });

      if (!response.ok) {
        console.error('GitHub API error:', response.status, response.statusText);
        return [];
      }

      const contributors = await response.json();
      
      return contributors.map((contributor: any) => ({
        login: contributor.login,
        id: contributor.id,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      }));
    } catch (error) {
      console.error('Error fetching contributors:', error);
      return [];
    }
  },
  ['github-contributors'],
  {
    revalidate: 3600, // 1小时缓存
    tags: ['github-data']
  }
);

// 获取 GitHub 统计数据（带缓存）
export const getGitHubStats = unstable_cache(
  async (): Promise<GitHubStats> => {
    try {
      const token = process.env.GITHUB_TOKEN;
      
      if (!token) {
        console.warn('GITHUB_TOKEN not found in environment variables');
        return { stargazers_count: 0, forks_count: 0, watchers_count: 0 };
      }

      const headers = new Headers();
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/vnd.github.v3+json');
      headers.set('User-Agent', 'NoteGen-Website');
      
      const response = await fetch('https://api.github.com/repos/codexu/note-gen', {
        headers,
        cache: 'force-cache',
      });

      if (!response.ok) {
        console.error('GitHub API error:', response.status, response.statusText);
        return { stargazers_count: 0, forks_count: 0, watchers_count: 0 };
      }

      const repoData = await response.json();
      
      return {
        stargazers_count: repoData.stargazers_count || 0,
        forks_count: repoData.forks_count || 0,
        watchers_count: repoData.watchers_count || 0,
      };
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      return { stargazers_count: 0, forks_count: 0, watchers_count: 0 };
    }
  },
  ['github-stats'],
  {
    revalidate: 3600, // 1小时缓存
    tags: ['github-data']
  }
);

// 客户端缓存工具
export class ClientCache {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static set(key: string, data: any, ttlMinutes: number = 60) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  static get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  static clear() {
    this.cache.clear();
  }
}
