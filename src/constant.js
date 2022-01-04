// 获取全局变量 - window或Node环境
export const _global = typeof window !== 'undefined' ? window : global ?? {}

// 存储实现类型
export const storageType = ['cache', 'session', 'local']

export default {
  _global,
  storageType,
}
