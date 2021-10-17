import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { createReducer } from '../create-reducer.js'
import { reduceSum } from '../reduce-sum.js'
import { reduceTimeseries } from '../reduce-timeseries.js'

test('summing', () => {
  const reducer = createReducer(
    reduceTimeseries(x => x.key),
    reduceSum(x => x.count)
  )
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1, key: 1 })
  reducer.reduceAdd(state, { count: 1, key: 1 })
  reducer.reduceAdd(state, { count: 1, key: 2 })
  reducer.reduceAdd(state, { count: 1, key: 2 })
  reducer.reduceRemove(state, { count: 1, key: 2 })

  assert.equal(state, [
    [1, { sum: 2 }],
    [2, { sum: 1 }],
  ])
})

test.run()
