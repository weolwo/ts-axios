import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 取出参数中的值并设置默认值
  const { url, data = null, method = 'get', params } = config
  // 创建XMLHttpRequest对象
  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)
  request.send(data)
}
