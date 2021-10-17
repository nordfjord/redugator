import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { splitBy, sum } from '../reducers/index.js'

test('timeseries', () => {
  const reducer = splitBy(
    x => x.key,
    sum(x => x.count)
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
