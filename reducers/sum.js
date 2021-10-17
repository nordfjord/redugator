export function sum(valueAccessor, key = 'sum') {
  return {
    reduceAdd(p, v) {
      p[key] += valueAccessor(v)
      return p
    },
    reduceRemove(p, v) {
      p[key] -= valueAccessor(v)
      return p
    },
    reduceInitial(p = {}) {
      p[key] = 0
      return p
    },
  }
}
