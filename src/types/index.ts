//类型的一种定义方式，但不能被继承和实现 https://www.typescriptlang.org/docs/handbook/literal-types.html
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
  url: string
  method?: Method //表示可选参数
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
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
