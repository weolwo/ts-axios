// 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
const toString = Object.prototype.toString

export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}
