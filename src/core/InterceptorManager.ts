import { RejectFn, ResolveFn } from '../types'

// 拦截器实现类
export class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加拦截器到 interceptors 返回一个 id 用于删除
  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptors.push({
      resolve,
      reject
    })
    // 返回拦截器所在数组中的下边作为id
    return this.interceptors.length - 1
  }
  // 遍历 interceptors 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 interceptor 作为该函数的参数传入
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        // 执行拦截器的方法
        fn(interceptor)
      }
    })
  }

  // 删除一个拦截器，通过传入拦截器的 id 删除
  eject(id: number): void {
    // 此处不能直接删除，会导致拦截器数组长度问题，所以只是把他置null
    this.interceptors[id] = null
  }
}

export interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}
