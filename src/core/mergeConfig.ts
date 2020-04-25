import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const strategys = Object.create(null)
// 合并用户的配置和默认配置
export default function mergeConfig(originConfig: AxiosRequestConfig, customConfig?: AxiosRequestConfig): AxiosRequestConfig {
  if (!customConfig) {
    customConfig = {}
  }
  const config = Object.create(null)
  for (let key in customConfig) {
    mergeField(key)
  }
  for (let key in originConfig) {
    mergeField(key)
  }

  function mergeField(key: string): void {
    const strategy = strategys[key] || defaultStrategy
    config[key] = strategy(originConfig[key], customConfig![key])
  }

  return config
}

// 默认策略，如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置
function defaultStrategy(value1: any, value2: any): any {
  return typeof value2 !== 'undefined' ? value2 : value1
}

// 只接受用户的配置信息
function formCustomStrategy(value1: any, value2: any): any {
  if (typeof value2 !== 'undefined') {
    return value2
  }
}

// 对于 url、params、data 这些属性，只从自定义配置中取
const fromCustomStrategyKey = ['url', 'params', 'data']
fromCustomStrategyKey.forEach(key => {
  strategys[key] = formCustomStrategy
})

// 更复杂的合并策略，对于那些复杂的对象
function deepMergeStrategy(value1: any, value2: any): any {
  if (isPlainObject(value2)) {
    return deepMerge(value1, value2)
  } else if (typeof value2 !== 'undefined') {
    return value2
  } else if (isPlainObject(value1)) {
    return deepMerge(value1)
  } else if (typeof value1 !== 'undefined') {
    return value1
  }
}

// 适用于深合并策略
const strategyKeyDeepMerge = ['headers']
strategyKeyDeepMerge.forEach(key => {
  // 拿到对应的策略函数的引用
  strategys[key] = deepMergeStrategy
})
