import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 由于下面data已经被处理过，所以把处理header的方法放在前面
  config.headers = transformRequestHeader(config)
  config.data = transformRequestData(config)
}

export function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params) // url!断言为不会为null
}

// 处理data数据
export function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求头
export function transformRequestHeader(config: AxiosRequestConfig): any {
  const { data, headers = {},method } = config
  return processHeaders(headers, data)
}

// 处理响应数据
export function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
