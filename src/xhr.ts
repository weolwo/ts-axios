import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 取出参数中的值并设置默认值
  const { url, data = null, method = 'get', params, headers } = config
  // 创建XMLHttpRequest对象
  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)
  // 设置请求头
  Object.keys(headers).forEach(name => {
    // 当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
      console.log(name, headers[name])
    }
  })
  request.send(data)
}
