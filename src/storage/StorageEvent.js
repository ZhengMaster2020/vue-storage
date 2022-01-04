// 使用设计模式中的发布-订阅模式
// 订阅者：每个属性代表着一个事件对象， 每个事件对象存储着回调事件列表
const listeners = {}

export class StorageEvent {
  // 订阅一个回调方法
  static on(name, callback) {
    // 默认为[name] 属性赋值为空数组
    if (typeof listeners[name] === 'undefined') listeners[name] = []
    listeners[name].push(callback)
  }

  // 取消订阅回调事件列表中指定事件
  static off(name, callback) {
    if (listeners[name].length) {
      listeners[name].splice(listeners[name].indexOf(callback), 1)
    } else {
      listeners[name] = []
    }
  }

  // 发布事件
  static emit(event) {
    const evt = event ?? window.event

    if (typeof evt === 'undefined' || typeof e.key === 'undefined') return

    const getStorageData = (data) => {
      // 可能JSON.parse 会报错， so try catch
      try {
        return JSON.parse(data)
      } catch (error) {
        console.log('error', error)
        return data
      }
    }

    const trigger = (listener) => {
      const newValue = getStorageData(evt.newValue)
      const oldValue = getStorageData(evt.oldValue)
      listener(newValue, oldValue, e.url || e.uri)
    }

    const callbackList = listeners[e.key]
    callbackList?.length && callbackList.forEach(trigger)
  }
}
