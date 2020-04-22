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
}