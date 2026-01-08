import { NextRequest } from 'next/server';
import crypto from 'crypto';

export interface AuthHeaders {
  'X-Timestamp': string;
  'X-Nonce': string;
  'X-AccessKey': string;
  'X-Signature': string;
}

export function validateAuthHeaders(headers: AuthHeaders): { valid: boolean; error?: string } {
  const { 'X-Timestamp': timestamp, 'X-Nonce': nonce, 'X-AccessKey': accessKey, 'X-Signature': signature } = headers;

  if (!timestamp || !nonce || !accessKey || !signature) {
    return { valid: false, error: '参数缺失' };
  }

  // Validate timestamp format (RFC3339)
  const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
  if (!timestampRegex.test(timestamp)) {
    return { valid: false, error: '参数非法' };
  }

  // Validate nonce length (at least 16 characters)
  if (nonce.length < 16) {
    return { valid: false, error: '参数非法' };
  }

  // Validate timestamp difference (±5 minutes)
  const requestTime = new Date(timestamp);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - requestTime.getTime());
  if (timeDiff > 5 * 60 * 1000) { // 5 minutes in milliseconds
    return { valid: false, error: '请求时间戳过期' };
  }

  return { valid: true };
}

export function generateSignature(
  method: string,
  url: string,
  body: string,
  nonce: string,
  timestamp: string,
  secretKey: string
): string {
  const uri = new URL(url).pathname;
  
  let signStr: string;
  if (method.toUpperCase() === 'GET' && !body) {
    signStr = `nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}&url=${uri}`;
  } else {
    signStr = `body=${body}&nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}&url=${uri}`;
  }
  
  return crypto.createHash('md5').update(signStr).digest('hex');
}

export function validateSignature(
  method: string,
  url: string,
  body: string,
  headers: AuthHeaders,
  secretKey: string
): { valid: boolean; error?: string } {
  const { 'X-Timestamp': timestamp, 'X-Nonce': nonce, 'X-Signature': signature } = headers;
  
  const expectedSignature = generateSignature(method, url, body, nonce, timestamp, secretKey);
  
  if (signature !== expectedSignature) {
    return { valid: false, error: '签名验证失败' };
  }
  
  return { valid: true };
}

export function extractAuthHeaders(request: NextRequest): AuthHeaders {
  return {
    'X-Timestamp': request.headers.get('X-Timestamp') || '',
    'X-Nonce': request.headers.get('X-Nonce') || '',
    'X-AccessKey': request.headers.get('X-AccessKey') || '',
    'X-Signature': request.headers.get('X-Signature') || '',
  };
}

export function validateAccessKey(accessKey: string): { valid: boolean; error?: string } {
  const validAccessKey = process.env.UPGRADELINK_ACCESS_KEY;
  
  if (!validAccessKey) {
    return { valid: false, error: '服务器配置错误' };
  }
  
  if (accessKey !== validAccessKey) {
    return { valid: false, error: '鉴权失败' };
  }
  
  return { valid: true };
}
