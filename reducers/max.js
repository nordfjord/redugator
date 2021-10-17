import { Reducer } from '../index.js'
import { valueList } from './value-list.js'

const last = l => l[l.length - 1]

export function max(valueAccessor, key = 'max') {
  const valuelist = key + '_valuelist'
  const valueListReducer = valueList(valueAccessor, valuelist)
  const maxReducer = {
    reduceAdd(p) {
      p[key] = last(p[valuelist])
      return p
    },
    reduceRemove(p) {
      if (p[valuelist].length === 0) {
        p[key] = undefined
        return p
      }
      p[key] = last(p[valuelist])
      return p
    },
    reduceInitial(p = {}) {
      p[key] = 0
      return p
    },
  }
  return Reducer.concat(valueListReducer, maxReducer)
}
