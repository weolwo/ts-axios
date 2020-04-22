import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  // 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  /*特殊字符支持
  对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode。
  最终请求的 url 是 /base/get?foo=@:$+，注意，我们会把空格 转换成 +
  */
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any) {
  // 判断params
  if (!params) {
    return url
  }

  const keyValuePairs: string[] = []
  // 返回给定对象的所有可枚举key的字符串数组
  Object.keys(params).forEach(key => {
    // 通过key获取到值
    let value = params[key] // 此处之前写错了let value = [key] ，导致后面的参数解析全错了
    if (value === null || typeof value === 'undefined') {
      // 在forEach中表示等于Java中的continue
      return
    }
    let values: string[]
    if (Array.isArray(value)) {
      values = value
      key += '[]' // 目标：foo[] = bar&foo[] = dd
    } else {
      values = [value]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // 参考链接： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      keyValuePairs.push(`${key}=${val}`)
      console.log('keyValuePairs', keyValuePairs)
    })
  })
  let serializedParams = keyValuePairs.join('&')
  if (serializedParams) {
    console.log('serializedParams', serializedParams)
    // 去除hash url: '/base/get#hash'
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      // 参考链接:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice
      url = url.slice(0, markIndex) // /base/get
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
  }
  console.log('url', url)
  return url
}
