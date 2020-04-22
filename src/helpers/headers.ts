import { isPlainObject } from './util'

// 请求头处理
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 如果没传那么就默认给他加上
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
  return headers
}

export function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && normalizeName.toUpperCase() === name.toUpperCase()) {
      // 通过测试发现，如果前端没传编码，服务端无法解析
      headers[normalizeName] = headers[name]
      if (!headers[normalizeName].includes('charset=utf-8')) {
        headers[normalizeName] = 'application/json; charset=utf-8'
      }
      delete headers[name]
    }
  })
}
