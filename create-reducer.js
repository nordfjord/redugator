export function reduceId() {
  return {
    reduceAdd(p) {
      return p
    },
    reduceRemove(p) {
      return p
    },
    reduceInitial(p) {
      return p
    },
  }
}

export function createReducer(...reducers) {
  let reducer = reduceId()
  let i = reducers.length
  while (i--) reducer = reducers[i](reducer)
  return reducer
}

export function reduceGroup(reducer, group) {
  return group.reduce(
    reducer.reduceAdd,
    reducer.reduceRemove,
    reducer.reduceInitial
  )
}
