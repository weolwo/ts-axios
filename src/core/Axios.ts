import {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  Method,
  RejectFn,
  ResolveFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import { InterceptorManager } from './InterceptorManager'

// 创建一个 Axios 类，来实现接口定义的公共方法
// 对于 get、delete、head、options、post、patch、put 这些方法，都是对外提供的语法糖，内部都是通过调用 request
// 方法实现发送请求，只不过在调用之前对 config 做了一层合并处理。
export class Axios {
  interceptors: Interceptors

  // 实例化 Axios 类的时候，在它的构造器去初始化这个 interceptors 实例属性
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosPromise>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 构造一个 PromiseChain 类型的数组 chain 并把 dispatchRequest 函数赋值给 resolved 属性
    const chain: PromiseChain<any>[] = [{
      resolve: dispatchRequest,
      reject: undefined
    }]
    // 接着先遍历请求拦截器插入到 chain 的前面；然后再遍历响应拦截器插入到 chain 后面
    this.interceptors.request.forEach(interceptor => chain.unshift(interceptor))

    this.interceptors.response.forEach(interceptor => chain.push(interceptor))
  // 定义一个已经 resolve 的 promise，循环这个 chain，拿到每个拦截器对象，
  // 把它们的 resolved 函数和 rejected 函数添加到 promise.then 的参数中，这样就相当于通过
  // Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。注意我们拦截器的执行顺序，对于请求拦截器，
  // 先执行后添加的，再执行先添加的；而对于响应拦截器，先执行先添加的，后执行后添加的
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }
    return promise
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  // 处理不带data的请求
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  // 处理带data的请求
  _requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }

}

// Interceptors 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。
// 我们在实例化 Axios 类的时候，在它的构造器去初始化这个 interceptors 实例属性
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosPromise>
}

interface PromiseChain<T> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => Promise<T>)
  reject?: RejectFn
}
