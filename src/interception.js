import { _global, storageType } from './constant'
import { CacheStorage, WebStorage } from './storage'

export const intercept = (Vue, options) => {
  const { storage, name } = options
  // 接收参数判断
  if (!storageType.includes(storage)) {
    throw new Error(`vue-storage: ${storage} 储存类型不支持`)
  }

  // 匹配到合适的存储实现API
  const { localStorage, sessionStorage } = _global ?? {}
  const storeMapping = {
    local: localStorage,
    session: sessionStorage,
    cache: CacheStorage,
  }

  const store = storeMapping[storage]
  // 设置默认储存方式
  if (!store) {
    store = CacheStorage
    console.error(
      `vue-storage: 你当前系统暂不${storage}该存储方式， 请使用cache储存方式`
    )
  }

  // 根据用户输入存储参数实例化一个对应的存储实例
  const entity = new WebStorage(store)

  // 参数合并
  entity.setOptions(
    Object.assign(entity.options, { namespace: '' }, options ?? {})
  )

  // 将本次存储对象挂载于Vue的根属性上
  Vue[name] = entity

  // 挂在原型上
  const { version = '2.x' } = Vue ?? {}
  const prototype =
    +version?.split('.')[0] > 2 ? Vue.config.globalProperties : Vue.prototype
  Object.defineProperty(prototype, `$${name}`, {
    get() {
      return entity
    },
  })
}

export default intercept
