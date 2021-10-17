import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { max } from '../reducers/index.js'

test('max', () => {
  const reducer = max(x => x.count)
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 2 })
  reducer.reduceAdd(state, { count: 5 })
  reducer.reduceAdd(state, { count: 3 })
  reducer.reduceRemove(state, { count: 1 })

  assert.equal(state, { max: 5, max_valuelist: [2, 3, 5] })
})

test.run()
