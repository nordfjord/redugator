import { bisect } from './bisect.js'

export function valueList(valueAccessor, key = 'valueList') {
  return {
    reduceAdd(p, v) {
      const value = valueAccessor(v)
      const idx = bisect.left(p[key], value, 0, p[key].length)
      p[key].splice(idx, 0, value)
      return p
    },
    reduceRemove(p, v) {
      const value = valueAccessor(v)
      const idx = bisect.left(p[key], value, 0, p[key].length)
      p[key].splice(idx, 1)
      return p
    },
    reduceInitial(p = {}) {
      p[key] = []
      return p
    },
  }
}
