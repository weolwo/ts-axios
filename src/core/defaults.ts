// 默认配置
import { AxiosRequestConfig } from '../types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}

// 对于以下这些请求类型默认请求头为空
const methodNoData = ['get', 'head', 'options', 'delete']
methodNoData.forEach(method => {
  defaults.headers[method] = {}
})

// 对于以下请求类型的请求默认添加请求头
const methodData = ['post', 'patch', 'put']
methodData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
