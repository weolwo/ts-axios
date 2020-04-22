import { isPlainObject } from './util'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    // 只对普通对象做转换
    return JSON.stringify(data)
  }
  return data
}
