import { NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/github-data';

// 备用 API 路由 - 仅在客户端缓存失效时使用
export async function GET() {
  try {
    console.warn('API route called - consider using server-side data fetching to reduce function calls');
    const stats = await getGitHubStats();
    
    // 添加缓存头减少重复调用
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ stargazers_count: 0, forks_count: 0, watchers_count: 0 }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
      }
    });
  }
}
