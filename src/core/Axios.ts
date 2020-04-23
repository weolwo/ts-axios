import { AxiosInstance, AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

// 创建一个 Axios 类，来实现接口定义的公共方法
// 对于 get、delete、head、options、post、patch、put 这些方法，都是对外提供的语法糖，内部都是通过调用 request
// 方法实现发送请求，只不过在调用之前对 config 做了一层合并处理。
export class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
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
