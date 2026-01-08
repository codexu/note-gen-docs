import { NextRequest, NextResponse } from 'next/server';
import { getAppStatistics } from '../services/statistics-service';
import { ApiResponse, ErrorResponse } from '@/lib/statistics-types';

export async function GET(request: NextRequest) {
  const traceId = crypto.randomUUID();
  
  try {
    // Get appKey from environment variables
    const appKey = process.env.UPGRADELINK_APP_KEY;
    
    if (!appKey) {
      const errorResponse: ErrorResponse = {
        code: 400002,
        msg: '参数缺失',
        traceId,
        docs: ''
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get statistics data
    const statistics = await getAppStatistics(appKey);
    
    // 确保数据完整性验证
    if (!statistics || !statistics.downloadCount7Day || !statistics.appStartCount7Day) {
      throw new Error('Invalid statistics data received');
    }
    
    // 验证时间数据格式
    const validateTimeData = (data: any[]) => {
      return data.every(item => 
        item && 
        typeof item.timeData === 'string' && 
        item.timeData.length === 6 && 
        /^\d{6}$/.test(item.timeData)
      );
    };
    
    if (!validateTimeData(statistics.downloadCount7Day) || !validateTimeData(statistics.appStartCount7Day)) {
      throw new Error('Invalid timeData format');
    }
    
    const response: ApiResponse<typeof statistics> = {
      code: 0,
      msg: '',
      traceId,
      docs: '',
      data: statistics
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', // Cache for 1 hour, serve stale for 2 hours
      }
    });

  } catch (error) {
    console.error('Error in internal statistics API:', error);
    
    const errorResponse: ErrorResponse = {
      code: 500001,
      msg: '服务器内部错误',
      traceId,
      docs: ''
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
