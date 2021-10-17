# Redugator (Reducer + Aggregator)

This library helps you create [crossfilter](https://github.com/crossfilter/crossfilter) reduce functions.

# Reducer

The main utility of this library is a helper that allows you to compose reducers together.

## Reducer.concat(reducer1, reducer2)

```js
const reducer1 = sum(x => x.count)
const reducer2 = max(x => x.count)
const combined = Reducer.concat(reducer1, reducer2)
;[{ count: 1 }, { count: 2 }].reduce(
  combined.reduceAdd,
  combined.reduceInitial()
)
// { sum: 3, max: 2 }
```

## Reducer.concatAll(...reducers)

```js
const reducer = Reducer.concatAll(
  sum(x => x.count, 'count'),
  sum(x => x.sum),
  max(x => x.count),
  average()
)
;[
  { count: 2, sum: 4 },
  { count: 4, sum: 5 },
].reduce(reducer.reduceAdd, reducer.reduceInitial())
// { count: 6, sum: 9, avg: 1.33, max: 4}
```

## Reducer.reduceGroup(reducer, group)

Helper to apply a reducer to a crossfilter group

```js
const reducer = sum(x => x.count)
const dim = cf.dimension(x => x.type)
const group = Reducer.reduceGroup(reducer, dim.group())
group.all()
```

# Reducers

## sum(valueAccessor)

Sum the values

```js
// default property is sum
const reducer = sum(x => x.sum)
;[{ sum: 1 }, { sum: 1 }].reduce(reducer.reduceAdd, reducer.reduceInitial())
// {sum : 2}
```

## max(valueAccessor)

```js
const reducer = max(x => x.sum)
;[{ sum: 1 }, { sum: 2 }, { sum: 3 }].reduce(
  reducer.reduceAdd,
  reducer.reduceInitial()
)
// { max: 3 }
```

## average(countKey, sumKey)

```js
const reducer = Reducer.concatAll(
  sum(x => x.sum),
  sum(() => 1, 'count'),
  // these are the defaults
  average('count', 'sum')
)
;[{ sum: 1 }, { sum: 2 }, { sum: 3 }].reduce(
  reducer.reduceAdd,
  reducer.reduceInitial()
)
// { sum: 6, count: 3, avg: 2 }
```

## valueList(valueAccessor)

used internally by `max` to maintain a list of seen values in ascending order

```js
const reducer = valueList(x => x.sum)
;[{ sum: 2 }, { sum: 1 }, { sum: 3 }].reduce(
  reducer.reduceAdd,
  reducer.reduceInitial()
)
// { valueList: [1, 2, 3] }
```

## groupBy(keyAccessor, innerReducer)

allows you to group by a key

```js
const reduceSum = sum(x => x.sum)
const reducer = groupBy(x => x.type, reduceSum)
;[
  { sum: 1, type: 'T1' },
  { sum: 2, type: 'T1' },
  { sum: 5, type: 'T2' },
].reduce(reducer.reduceAdd, reducer.reduceInitial())
// { T1: { sum: 3 }, T2: { sum: 5 } }
```

## splitBy(keyAccessor, innerReducer)

Useful if you want to create a timeseries

```js
const reduceSum = sum(x => x.sum)
const reducer = splitBy(x => x.timestamp, reduceSum)
;[
  ({ timestamp: 1, sum: 1 },
  { timestamp: 2, sum: 2 },
  { timestamp: 1, sum: 1 }),
].reduce(reducer.reduceAdd, reducer.reduceInitial())
// [[1, {sum: 2}], [2, {sum: 2}]]
```
