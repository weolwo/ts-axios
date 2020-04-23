// 我们用工厂模式去创建一个 axios 混合对象
import { Axios } from './core/Axios'
import { AxiosPromise, AxiosInstance } from './types'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()
export default axios
