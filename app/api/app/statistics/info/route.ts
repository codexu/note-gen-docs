import { NextRequest, NextResponse } from 'next/server';
import { 
  extractAuthHeaders, 
  validateAuthHeaders, 
  validateAccessKey, 
  validateSignature 
} from '@/lib/auth-utils';
import { getAppStatistics } from '@/lib/statistics-data';
import { ApiResponse, ErrorResponse } from '@/lib/statistics-types';

export async function GET(request: NextRequest) {
  const traceId = crypto.randomUUID();
  
  try {
    // Extract and validate headers
    const headers = extractAuthHeaders(request);
    
    // Validate basic header format
    const headerValidation = validateAuthHeaders(headers);
    if (!headerValidation.valid) {
      const errorResponse: ErrorResponse = {
        code: 400002,
        msg: headerValidation.error || '参数缺失',
        traceId,
        docs: ''
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate access key
    const accessKeyValidation = validateAccessKey(headers['X-AccessKey']);
    if (!accessKeyValidation.valid) {
      const errorResponse: ErrorResponse = {
        code: 401001,
        msg: accessKeyValidation.error || '鉴权失败',
        traceId,
        docs: ''
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Get request body (empty for GET)
    const body = '';
    
    // Validate signature
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      const errorResponse: ErrorResponse = {
        code: 500001,
        msg: '服务器内部错误',
        traceId,
        docs: ''
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const signatureValidation = validateSignature(
      'GET',
      request.url,
      body,
      headers,
      secretKey
    );
    
    if (!signatureValidation.valid) {
      const errorResponse: ErrorResponse = {
        code: 401002,
        msg: signatureValidation.error || '签名验证失败',
        traceId,
        docs: ''
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Extract and validate appKey parameter
    const { searchParams } = new URL(request.url);
    const appKey = searchParams.get('appKey');
    
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
      }
    });

  } catch (error) {
    console.error('Error in app statistics API:', error);
    
    const errorResponse: ErrorResponse = {
      code: 500001,
      msg: '服务器内部错误',
      traceId,
      docs: ''
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
