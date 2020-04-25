import { AxiosTransformer } from '../types'
// 其中 fns 代表一个或者多个转换函数，内部逻辑很简单，遍历 fns，执行这些转换函数，并且把 data 和 headers
// 作为参数传入，每个转换函数返回的 data 会作为下一个转换函数的参数 data 传入
export function transform(headers: any, data: any, fns?: AxiosTransformer | AxiosTransformer[]): any {

  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 使用流水线式的处理方式，上一个函数的结果作为下一个函数的参数
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
