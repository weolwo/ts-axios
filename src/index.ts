import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'

export default function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

export function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}
// 处理data数据
export function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
