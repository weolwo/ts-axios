import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parsingResponseHeader } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // 把响应封装成Promise
  return new Promise((resolve) => {
    // 取出参数中的值并设置默认值
    const { url, data = null, method = 'get', params, headers, responseType } = config
    // 创建XMLHttpRequest对象
    const xmlHttpRequest = new XMLHttpRequest()
    // 设置响应类型
    if (responseType) {
      xmlHttpRequest.responseType = responseType
    }
    xmlHttpRequest.open(method.toLowerCase(), url, true)
    xmlHttpRequest.onreadystatechange = function handleLoad() {
      if (xmlHttpRequest.readyState !== 4) {
        return
      }

      // 封装响应数据
      const responseHeaders = parsingResponseHeader(xmlHttpRequest.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? xmlHttpRequest.response : xmlHttpRequest.responseText
      const response: AxiosResponse = {
        data: responseData,
        config,
        request: xmlHttpRequest,
        status: xmlHttpRequest.status,
        headers: responseHeaders,
        statusText: xmlHttpRequest.statusText
      }
      resolve(response)

    }

    // 设置请求头
    Object.keys(headers).forEach(name => {
      // 当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xmlHttpRequest.setRequestHeader(name, headers[name])
        console.log(name, headers[name])
      }
    })
    xmlHttpRequest.send(data)
  })
}
