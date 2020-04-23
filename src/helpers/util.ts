// 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
const toString = Object.prototype.toString

export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}

// 实现混合对象的辅助函数，extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性。
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
