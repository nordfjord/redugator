import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { groupBy } from '../src/group-by.js'
import { Reducer } from '../src/index.js'
import { sum } from '../src/sum.js'
import { average } from '../src/average.js'
import { splitBy } from '../src/split-by.js'
import { combineReducers } from '../src/combine-reducers.js'
import crossfilter from 'crossfilter2'

const setupCrossfilter = () => {
  const table = [
    {
      type: 'T1',
      count: 2,
      sum: 1,
      timestamp: new Date('2021-01-01T12:00:00.000Z'),
    },
    {
      type: 'T1',
      count: 1,
      sum: 5,
      timestamp: new Date('2021-01-01T13:00:00.000Z'),
    },
    {
      type: 'T2',
      count: 1,
      sum: 1,
      timestamp: new Date('2021-01-01T12:00:00.000Z'),
    },
  ]

  return crossfilter(table)
}

const reduceAvg = Reducer.concatAll(
  sum(x => x.count, 'count'),
  sum(x => x.sum),
  average()
)
const groupAvg = groupBy(x => x.type, reduceAvg)
const timeseries = groupBy(
  x => x.type,
  splitBy(x => x.timestamp, reduceAvg)
)
const reducer = combineReducers({
  group: groupAvg,
  timeseries: timeseries,
})

test('Group all', () => {
  const cf = setupCrossfilter()
  const dimension = cf.dimension(x => x.type)
  const group = Reducer.reduceGroup(reducer, dimension.groupAll())
  assert.equal(group.value(), {
    group: {
      T1: { count: 3, sum: 6, avg: 2 },
      T2: { count: 1, sum: 1, avg: 1 },
    },
    timeseries: {
      T1: [
        [new Date('2021-01-01T12:00:00.000Z'), { count: 2, sum: 1, avg: 0.5 }],
        [new Date('2021-01-01T13:00:00.000Z'), { count: 1, sum: 5, avg: 5 }],
      ],
      T2: [
        [new Date('2021-01-01T12:00:00.000Z'), { count: 1, sum: 1, avg: 1 }],
      ],
    },
  })
})

test('group', () => {
  const reducer = sum(x => x.sum)
  const cf = setupCrossfilter()
  const dimension = cf.dimension(x => x.type)
  const group = Reducer.reduceGroup(reducer, dimension.group())
  assert.equal(group.all(), [
    { key: 'T1', value: { sum: 6 } },
    { key: 'T2', value: { sum: 1 } },
  ])
})

test('group filtering', () => {
  const reducer = sum(x => x.sum)
  const cf = setupCrossfilter()
  const dimension = cf.dimension(x => x.type)
  const group = Reducer.reduceGroup(reducer, dimension.group())
  assert.equal(group.all(), [
    { key: 'T1', value: { sum: 6 } },
    { key: 'T2', value: { sum: 1 } },
  ])

  // do filter
  const f1 = cf.dimension(x => x.timestamp)
  f1.filter([
    new Date('2021-01-01T11:00:00.000Z'),
    new Date('2021-01-01T12:30:00.000Z'),
  ])
  const f2 = cf.dimension(x => x.type)
  f2.filterExact('T1')
  assert.equal(group.all(), [
    { key: 'T1', value: { sum: 1 } },
    { key: 'T2', value: { sum: 0 } },
  ])

  // remove filter
  f1.filter(null)
  f2.filter(null)

  assert.equal(group.all(), [
    { key: 'T1', value: { sum: 6 } },
    { key: 'T2', value: { sum: 1 } },
  ])
})

test.run()
