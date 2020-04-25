// 我们用工厂模式去创建一个 axios 混合对象
import { Axios } from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import defaults from './core/defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 内部调用了 createInstance 函数，并且把参数 config 与 defaults 合并，作为新的默认配置
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios
