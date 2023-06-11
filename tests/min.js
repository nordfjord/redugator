import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { min } from '../reducers/index.js'

test('min', () => {
  const reducer = min(x => x.count)
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 2 })
  reducer.reduceAdd(state, { count: 5 })
  reducer.reduceAdd(state, { count: 3 })
  reducer.reduceRemove(state, { count: 1 })

  assert.equal(state, { min: 2, min_valuelist: [2, 3, 5] })
})

test.run()
