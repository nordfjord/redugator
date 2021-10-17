import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { createReducer } from '../create-reducer.js'
import { reduceAverage } from '../reduce-average.js'
import { reduceSum } from '../reduce-sum.js'

test('Averaging', () => {
  const reducer = createReducer(
    reduceSum(x => x.count, 'count'),
    reduceSum(x => x.sum, 'sum'),
    reduceAverage()
  )
  let state = reducer.reduceInitial({})

  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })

  assert.equal(state, { count: 8, sum: 4, avg: 0.5 })
})

test.run()
