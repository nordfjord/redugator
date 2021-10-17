import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { reduceId } from '../create-reducer.js'
import { reduceSum } from '../reduce-sum.js'

test('summing', () => {
  const reducer = reduceSum(x => x.count)(reduceId())
  let state = reducer.reduceInitial({})
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceAdd(state, { count: 1 })
  reducer.reduceRemove(state, { count: 1 })

  assert.equal(state, { sum: 3 })
})

test.run()
