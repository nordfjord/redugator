export function combineReducers(reducers) {
  const keys = Object.keys(reducers)
  return {
    reduceAdd(p, v) {
      for (const key of keys) {
        p[key] = reducers[key].reduceAdd(p[key], v)
      }
      return p
    },
    reduceRemove(p, v) {
      for (const key of keys) {
        p[key] = reducers[key].reduceRemove(p[key], v)
      }
      return p
    },
    reduceInitial(p = {}) {
      for (const key of keys) {
        p[key] = reducers[key].reduceInitial({})
      }
      return p
    },
  }
}
