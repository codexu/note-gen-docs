# App Statistics API

应用统计数据接口，提供应用相关的统计信息。

## 接口信息

**请求地址**: `GET /api/app/statistics/info`

**请求参数**:
- `appKey` (string, required): 应用唯一标识

## 请求头

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| X-Timestamp | 是 | string | 请求时间 RFC3339格式 |
| X-Nonce | 是 | string | 唯一随机字符串(至少16位) |
| X-AccessKey | 是 | string | 密钥 AccessKey |
| X-Signature | 是 | string | 请求签名 |
| Content-Type | 是 | string | application/json |

## 环境变量配置

在 `.env.local` 文件中添加以下配置：

```env
ACCESS_KEY=your_access_key_here
SECRET_KEY=your_secret_key_here
```

## 签名生成规则

### 签名算法

1. 构造签名字符串：
   - GET请求（无body）: `nonce=${X-Nonce}&secretKey=${SecretKey}&timestamp=${X-Timestamp}&url=${uri}`
   - POST请求（有body）: `body=${body}&nonce=${X-Nonce}&secretKey=${SecretKey}&timestamp=${X-Timestamp}&url=${uri}`

2. 对签名字符串进行MD5签名

### 签名示例

```javascript
const crypto = require('crypto');

// 请求参数
const timestamp = '2025-02-17T10:34:55+08:00';
const nonce = 'fc812cc0b9b51e8c';
const accessKey = 'mui2W50H1j-OC4xD6PgQag';
const secretKey = 'your_secret_key';
const uri = '/api/app/statistics/info';

// 构造签名字符串 (GET请求)
const signStr = `nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}&url=${uri}`;

// 生成签名
const signature = crypto.createHash('md5').update(signStr).digest('hex');
```

## 响应格式

### 成功响应

```json
{
  "code": 0,
  "msg": "",
  "traceId": "uuid",
  "docs": "",
  "data": {
    "yesterdayDownloadCount": 171,
    "totalDownloadCount": 63105,
    "yesterdayAppGetStrategyCount": 131,
    "totalAppGetStrategyCount": 14429,
    "yesterdayAppUpgradeCount": 0,
    "totalAppUpgradeCount": 0,
    "yesterdayAppStartCount": 586,
    "totalAppStartCount": 20002,
    "downloadCount7Day": [
      {
        "timeData": "251217",
        "data": 185
      }
    ],
    "appGetStrategyCount7Day": [...],
    "appUpgradeCount7Day": [...],
    "appStartCount7Day": [...]
  }
}
```

### 错误响应

```json
{
  "code": 400002,
  "msg": "参数缺失",
  "traceId": "uuid",
  "docs": ""
}
```

## 状态码说明

| HTTP状态码 | 错误码 | 场景描述 |
|------------|--------|----------|
| 200 | 0 | 请求成功 |
| 400 | 400001 | 非法请求 |
| 400 | 400002 | 参数缺失 |
| 400 | 400003 | 参数非法 |
| 400 | 400004 | 报头非法 |
| 400 | 400005 | 报体非法 |
| 401 | 401001 | 鉴权失败 |
| 401 | 401002 | 签名验证失败 |
| 404 | 404001 | 资源不存在 |
| 500 | 500001 | 服务器内部错误 |

## 安全机制

### 防重放攻击
- 服务端验证时间戳与服务器时间差值不超过±5分钟
- 服务端会校验Nonce值是否已存在（防止重复请求）

### 签名验证
- 使用MD5算法对请求参数进行签名
- 确保请求参数的完整性和真实性

## 使用示例

```bash
curl -X GET "http://localhost:3000/api/app/statistics/info?appKey=a0jtz0HUwL66r7gCGvbMKQ" \
  -H "X-Timestamp: 2025-02-17T10:34:55+08:00" \
  -H "X-Nonce: fc812cc0b9b51e8c" \
  -H "X-AccessKey: mui2W50H1j-OC4xD6PgQag" \
  -H "X-Signature: 3603437250c2df51fc46426ac79d8995" \
  -H "Content-Type: application/json"
```

## 开发说明

当前实现使用模拟数据，在生产环境中需要：

1. 在 `lib/statistics-data.ts` 中实现真实的数据获取逻辑
2. 连接到实际的数据库或数据源
3. 根据业务需求调整统计数据的计算方式
