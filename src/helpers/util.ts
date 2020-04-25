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

// 用于深拷贝
export function deepMerge(...objects: any[]): any {

  const result = Object.create(null)

  objects.forEach(object => {
    if (object) {
      Object.keys(object).forEach(key => {
        const val = object[key]
        if (isPlainObject(val)) {
          // 此处可能key已经存在，所以需要继续合并
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val) // 继续合并
          }
          result[key] = deepMerge({}, val) // 继续递归
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
