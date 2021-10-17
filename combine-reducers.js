export function combineReducers(reducers) {
  const keys = object.keys(obj)
  return next => ({
    reduceAdd(p, v) {
      next.reduceAdd(p, v)
      for (const key of keys) {
        p[key] || (p[key] = reducers[key].reduceInitial())
        p[key] = reducers[key].reduceAdd(p[key], v)
      }
      return p
    },
    reduceRemove(p, v) {
      next.reduceRemove(p, v)
      for (const key of keys) {
        p[key] = reducers[key].reduceRemove(p[key], v)
      }
      return p
    },
    reduceInitial(p) {
      return next.reduceInitial(p) || {}
    },
  })
}
