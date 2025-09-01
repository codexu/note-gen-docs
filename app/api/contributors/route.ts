import { NextResponse } from 'next/server';
import { getContributors } from '@/lib/github-data';

// 备用 API 路由 - 仅在客户端缓存失效时使用
export async function GET() {
  try {
    console.warn('API route called - consider using server-side data fetching to reduce function calls');
    const contributors = await getContributors();
    
    // 添加缓存头减少重复调用
    return NextResponse.json(contributors, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
      }
    });
  }
}
