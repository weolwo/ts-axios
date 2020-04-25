import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { flatHeaders } from '../helpers/headers'
import { transform } from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)

  config.data = transform(config.headers, config.data, config.transformRequest)
  // 处理请求头
  config.headers = flatHeaders(config.headers, config.method!)
}

export function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params) // url!断言为不会为null
}

// 处理响应数据
export function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.headers, res.data, res.config.transformResponse)
  return res
}
