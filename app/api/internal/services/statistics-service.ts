import { AppStatistics, DailyDataPoint } from '@/lib/statistics-types';
import { getGitHubRepoStats } from './github-service';

// 内存缓存
let cache: {
  data: AppStatistics | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Real API call to upgrade.toolsetlink.com
export async function getAppStatistics(appKey: string): Promise<AppStatistics> {
  const now = Date.now();
  
  // 检查缓存是否有效
  if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
    console.log('Using cached statistics data');
    return cache.data;
  }

  console.log('Fetching fresh statistics data...');
  
  const url = `https://api.upgrade.toolsetlink.com/v1/app/statistics/info?appKey=${appKey}`;
  
  try {
    // Generate authentication headers
    const timestamp = new Date().toISOString();
    const nonce = Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18);
    const accessKey = process.env.UPGRADELINK_ACCESS_KEY;
    const secretKey = process.env.UPGRADELINK_SECRET_KEY;
    
    if (!accessKey || !secretKey) {
      throw new Error('Missing API credentials');
    }
    
    // Generate signature
    const urlObj = new URL(url);
    const uri = urlObj.pathname + urlObj.search;
    const signStr = `nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}&url=${uri}`;
    
    const crypto = require('crypto');
    const signature = crypto.createHash('md5').update(signStr).digest('hex');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'X-AccessKey': accessKey,
        'X-Signature': signature,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(`API error: ${result.msg} (code: ${result.code})`);
    }
    
    // Get GitHub stats
    const githubStats = await getGitHubRepoStats('codexu', 'note-gen');
    
    // Merge GitHub download count with app statistics
    const mergedStats: AppStatistics = {
      ...result.data,
      totalDownloadCount: result.data.totalDownloadCount + githubStats.totalDownloads,
      // Add GitHub stats as additional fields
      githubStars: githubStats.stars,
      githubWatchers: githubStats.watchers,
      githubForks: githubStats.forks,
      githubDownloads: githubStats.totalDownloads,
    };
    
    // 更新缓存
    cache.data = mergedStats;
    cache.timestamp = now;
    
    return mergedStats;
    
  } catch (error) {
    console.error('Error calling real API:', error);
    
    // 如果API调用失败但有缓存数据，返回缓存数据
    if (cache.data) {
      console.log('API failed, returning stale cache data');
      return cache.data;
    }
    
    throw error;
  }
}
