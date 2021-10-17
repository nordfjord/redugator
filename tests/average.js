import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { Reducer } from '../src/index.js'
import { average } from '../src/average.js'
import { sum } from '../src/sum.js'

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
