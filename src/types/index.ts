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
export interface AxiosResponse<T = any> { // T=any 表示泛型的类型参数默认值为 any
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  request: any
  headers: any
}

// 最后把响应的数据封装成一个Promise
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

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

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 方法重载
  <T = any>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
}
