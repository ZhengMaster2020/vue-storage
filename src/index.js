import { _global } from './constant'
import intercept from './interception'

// 定义一个Storage对象
const Storage = {
  install: (Vue, options) => {
    // 接入插件传过来的参数以及配置默认参数
    const _options = {
      ...options,
      storage: options.storage || 'local',
      name: options.name || 'ls',
    }
    intercept(Vue, _options)
  },
}

// 将该对象挂载到全局对象上， 方便调用
_global.VueStorage = Storage

// 将该Storage对象暴露出去
export default Storage
