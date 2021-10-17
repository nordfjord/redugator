export function reduceAverage(key = 'avg', count = 'count', sum = 'sum') {
  return next => ({
    reduceAdd(p, v) {
      next.reduceAdd(p, v)
      p[key] = p[count] === 0 ? 0 : p[sum] / p[count]
      return p
    },
    reduceRemove(p, v) {
      next.reduceRemove(p, v)
      p[key] = p[count] === 0 ? 0 : p[sum] / p[count]
      return p
    },
    reduceInitial(p) {
      next.reduceInitial(p)
      p[key] = 0
      return p
    },
  })
}
