function reduceId() {
  return {
    reduceAdd(p) {
      return p
    },
    reduceRemove(p) {
      return p
    },
    reduceInitial(p = {}) {
      return p || {}
    },
  }
}

export const Reducer = {
  empty: reduceId(),
  concat: concatReducer,
  concatAll: (...reducers) => {
    return reducers.reduce((p, v) => concatReducer(p, v), reduceId())
  },
  reduceGroup,
}

function concatReducer(reducerA, reducerB) {
  return {
    reduceAdd(p, v) {
      p = reducerA.reduceAdd(p, v)
      return reducerB.reduceAdd(p, v)
    },
    reduceRemove(p, v) {
      p = reducerA.reduceRemove(p, v)
      return reducerB.reduceRemove(p, v)
    },
    reduceInitial(p) {
      p = reducerA.reduceInitial(p)
      return reducerB.reduceInitial(p)
    },
  }
}

function reduceGroup(reducer, group) {
  return group.reduce(
    reducer.reduceAdd,
    reducer.reduceRemove,
    reducer.reduceInitial
  )
}
