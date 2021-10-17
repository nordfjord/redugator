import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { sum } from '../src/sum.js'

test('summing', () => {
  const reducer = sum(x => x.count)
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceRemove(state, { count: 1 })

  assert.equal(state, { sum: 3 })
})

test.run()
