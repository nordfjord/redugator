export function reduceSum(valueAccessor, key = 'sum') {
  return next => ({
    reduceAdd(p, v) {
      p[key] += valueAccessor(v)
      next.reduceAdd(p, v)
      return p
    },
    reduceRemove(p, v) {
      p[key] -= valueAccessor(v)
      next.reduceRemove(p, v)
      return p
    },
    reduceInitial(p) {
      p || (p = {})
      p[key] = 0
      next.reduceInitial(p)
      return p
    },
  })
}
