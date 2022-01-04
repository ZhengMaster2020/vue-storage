let cache = {}

class CacheStorageInterface {
  constructor() {
    Object.defineProperty(this, 'length', {
      get() {
        return Object.keys(ls).length
      },
    })
  }

  getItem(name) {
    return cache[name] ?? null
  }

  setItem(name, value) {
    cache[name] = value
    return true
  }

  removeItem(name) {
    if (name in cache) {
      return delete cache[name]
    }
    return false
  }

  clear() {
    cache = {}
    return true
  }

  key(index) {
    const keys = Object.keys(cache)
    return keys[index] ?? null
  }
}

const CacheStorage = new CacheStorageInterface()

export { CacheStorage }
