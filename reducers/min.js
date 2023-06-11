import { Reducer } from '../index.js'
import { valueList } from './value-list.js'

export function min(valueAccessor, key = 'min') {
  const valuelist = key + '_valuelist'
  const valueListReducer = valueList(valueAccessor, valuelist)
  const minReducer = {
    reduceAdd(p) {
      p[key] = p[valuelist][0]
      return p
    },
    reduceRemove(p) {
      if (p[valuelist].length === 0) {
        p[key] = undefined
        return p
      }
      p[key] = p[valuelist][0]
      return p
    },
    reduceInitial(p = {}) {
      p[key] = 0
      return p
    },
  }
  return Reducer.concat(valueListReducer, minReducer)
}
