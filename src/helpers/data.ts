import { isPlainObject } from './util'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    // 只对普通对象做转换
    return JSON.stringify(data)
  }
  return data
}

// 处理响应数据中的data，试着把他转换成json,当用户没有传响应类型的时候
export function transformResponse(data: any): any {
  try {
    if (data === typeof 'string') {
      data = JSON.parse(data)
    }
  } catch (e) {
    // 什么都不用做
  }
  return data
}
