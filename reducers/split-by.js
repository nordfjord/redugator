import { bisect } from './bisect.js'

const equals = (a, b) => a <= b && a >= b

export function splitBy(keyAccessor, reducer) {
  return {
    reduceAdd(list, v) {
      const key = keyAccessor(v)
      const idx = bisect.left(
        list.map(l => l[0]),
        key,
        0,
        list.length
      )
      if (!list[idx] || !equals(key, list[idx][0])) {
        list.splice(idx, 0, [key, reducer.reduceInitial({})])
      }
      reducer.reduceAdd(list[idx][1], v)
      return list
    },
    reduceRemove(list, v) {
      const key = keyAccessor(v)
      const idx = bisect.left(
        list.map(l => l[0]),
        key,
        0,
        list.length
      )
      if (list[idx] && equals(list[idx][0], key)) {
        reducer.reduceRemove(list[idx][1], v)
      }
      return list
    },
    reduceInitial() {
      return []
    },
  }
}
