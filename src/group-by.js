export function groupBy(keyAccessor, reducer) {
  return {
    reduceAdd(p, v) {
      const key = keyAccessor(v)
      p[key] || (p[key] = reducer.reduceInitial({}))
      reducer.reduceAdd(p[key], v)
      return p
    },
    reduceRemove(p, v) {
      const key = keyAccessor(v)
      reducer.reduceRemove(p[key], v)
      return p
    },
    reduceInitial(p = {}) {
      return p
    },
  }
}
