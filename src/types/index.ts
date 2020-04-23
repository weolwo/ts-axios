// 类型的一种定义方式，但不能被继承和实现 https://www.typescriptlang.org/docs/handbook/literal-types.html
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  url?: string
  method?: Method // 表示可选参数
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 响应的数据接口
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  config: AxiosRequestConfig
  request: any
  headers: any
}

// 最后把响应的数据封装成一个Promise
export interface AxiosPromise extends Promise<AxiosResponse> {

}

// 错误信息封装类
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 给 axios 混合对象定义接口
export interface Axios {

  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  // 方法重载
  (url: string, config: AxiosRequestConfig): AxiosPromise
}
