import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    console.log(token);

    // 如果没有 token，返回空数组（避免暴露错误信息）
    if (!token) {
      console.warn('GITHUB_TOKEN not found in environment variables');
      return NextResponse.json([]);
    }
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    
    const response = await fetch('https://api.github.com/repos/codexu/note-gen/contributors?per_page=24', {
      headers,
      next: { revalidate: 3600 },
      cache: 'force-cache',
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return NextResponse.json([]);
    }

    const contributors = await response.json();
    
    // 只返回必要的字段，减少数据传输
    const filteredContributors = contributors.map((contributor: any) => ({
      login: contributor.login,
      id: contributor.id,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
    }));

    return NextResponse.json(filteredContributors);
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return NextResponse.json(error);
  }
}
