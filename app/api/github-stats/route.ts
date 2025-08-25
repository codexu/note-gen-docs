import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    // 如果没有 token，返回默认值
    if (!token) {
      console.warn('GITHUB_TOKEN not found in environment variables');
      return NextResponse.json({ stargazers_count: 0 });
    }

    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Accept', 'application/vnd.github.v3+json');
    headers.set('User-Agent', 'NoteGen-Website');
    
    const response = await fetch('https://api.github.com/repos/codexu/note-gen', {
      headers,
      // 缓存 1 小时
      next: { revalidate: 3600 },
      cache: 'force-cache',
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return NextResponse.json({ stargazers_count: 0 });
    }

    const repoData = await response.json();
    
    // 只返回需要的字段
    return NextResponse.json({
      stargazers_count: repoData.stargazers_count || 0,
      forks_count: repoData.forks_count || 0,
      watchers_count: repoData.watchers_count || 0,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ stargazers_count: 0 });
  }
}
