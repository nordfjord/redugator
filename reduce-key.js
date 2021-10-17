export function reduceKey(keyAccessor) {
  return next => ({
    reduceAdd(p, v) {
      const key = keyAccessor(v)
      p[key] || (p[key] = next.reduceInitial())
      next.reduceAdd(p[key], v)
      return p
    },
    reduceRemove(p, v) {
      const key = keyAccessor(v)
      next.reduceRemove(p[key], v)
      return p
    },
    reduceInitial() {
      return {}
    },
  })
}
