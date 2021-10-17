import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { Reducer } from '../index.js'
import { average, sum } from '../reducers/index.js'

test('Averaging', () => {
  const reducer = Reducer.concatAll(
    sum(x => x.count, 'count'),
    sum(x => x.sum, 'sum'),
    average()
  )
  let state = reducer.reduceInitial({})

  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })
  reducer.reduceAdd(state, { count: 2, sum: 1 })

  assert.equal(state, { count: 8, sum: 4, avg: 0.5 })
})

test.run()
