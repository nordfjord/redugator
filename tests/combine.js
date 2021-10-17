import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { max } from '../src/max.js'
import { combineReducers } from '../src/combine-reducers.js'
import { sum } from '../src/sum.js'

test('max', () => {
  const reducer = combineReducers({
    count: sum(x => x.count),
    max: max(x => x.count),
  })
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 2 })
  reducer.reduceAdd(state, { count: 5 })
  reducer.reduceAdd(state, { count: 3 })
  reducer.reduceRemove(state, { count: 1 })

  assert.equal(state, {
    count: { sum: 10 },
    max: { max: 5, max_valuelist: [2, 3, 5] },
  })
})

test.run()
