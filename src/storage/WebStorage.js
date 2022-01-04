import { StorageEvent } from './StorageEvent'

export class WebStorage {
  constructor(storage) {
    this.storage = storage
    this.options = {
      namespace: '',
      events: ['storage'],
    }

    // 为实例新增length属性
    Object.defineProperty(this, 'length', {
      get() {
        return this.storage.length
      },
    })

    // 事件注册
    if (typeof window !== 'undefined') {
      for (const i in this.options.events) {
        // 非IE
        if (window.addEventListener) {
          window.addEventListener(
            this.options.events[i],
            StorageEvent.emit,
            false
          )
        } else if (window.attachEvent) {
          // IE 放弃吧 bro
          window.attachEvent(`on${this.options.events[i]}`, StorageEvent.emit)
        } else {
          window[`on${this.options.events[i]}`] = StorageEvent.emit
        }
      }
    }
  }

  // 合并options参数
  setOptions(options = {}) {
    this.options = Object.assign(this.options, options)
  }

  // 实现localStorage以及sessionStorage的写功能
  set(name, value, expire = null) {
    const stringifyNameData = JSON.stringify({
      value,
      // 数据保留时长
      expire: expire !== null ? new Date().getTime() + expire : null,
    })

    this.storage.setItem(`${this.options.namespace}${name}`, stringifyNameData)
  }

  // 实现localStorage以及sessionStorage的读功能
  get(name, defaultValue = null) {
    const nameData = this.storage.getItem(`${this.options.namespace}${name}`)

    if (nameData !== null) {
      const { value, expire } = JSON.parse(nameData)
      if (expire === null || expire >= new Date().getTime()) return value
      this.remove(name)
    }

    return defaultValue
  }

  // 通过索引编号来获取对应的值
  key(index) {
    return this.storage.key(index)
  }

  // 实现移除某个属性功能
  remove(name) {
    return this.storage.removeItem(`${this.options.namespace}${name}`)
  }

  // 实现清空功能
  clear() {
    if (this.length === 0) {
      return
    }

    const removedKeys = []

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i)
      // 筛选出储存的数据的key是以namespace开头的相关数据
      const regexp = new RegExp(`^${this.options.namespace}.+`, 'i')
      if (regexp.test(key) === false) {
        continue
      }

      removedKeys.push(key)
    }

    for (const key in removedKeys) {
      this.storage.removeItem(removedKeys[key])
    }
  }

  // 事件订阅
  on(name, callback) {
    StorageEvent.on(`${this.options.namespace}${name}`, callback)
  }

  // 取消事件订阅
  off(name, callback) {
    StorageEvent.on(`${this.options.namespace}${name}`, callback)
  }
}
