export function reduceTimeseries(keyAccessor) {
  const bisect = crossfilter.bisect
  return next => ({
    reduceAdd(list, v) {
      const key = keyAccessor(v)
      const idx = bisect.left(
        list.map(l => l[0]),
        key,
        0,
        list.length
      )
      if (!list[idx] || !equals(key, list[idx][0])) {
        list.splice(idx, 0, [key, next.reduceInitial()])
      }
      next.reduceAdd(list[idx][1], v)
      return p
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
        next.reduceRemove(list[idx][1], v)
      }
      return p
    },
    reduceInitial() {
      return []
    },
  })
}
