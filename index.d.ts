declare module 'redugator' {
  type reduceFn<S, V> = (s: S, v: V) => S
  interface Reducer<State, Value> {
    reduceAdd(p: State, v: Value): State
    reduceRemove(p: State, v: Value): State
    reduceInitial(): State
  }

  interface ReducerHelper {
    empty: Reducer<any, any>
    concat: <S1, S2, V>(
      r1: Reducer<S1, V>,
      r2: Reducer<S2, V>
    ) => Reducer<S1 & S2, V>
    concatAll<S1, S2, V>(
      r1: Reducer<S1, V>,
      r2: Reducer<S2, V>
    ): Reducer<S1 & S2, V>
    concatAll<S1, S2, S3, V>(
      r1: Reducer<S1, V>,
      r2: Reducer<S2, V>,
      r3: Reducer<S3, V>
    ): Reducer<S1 & S2 & S3, V>
    concatAll<S1, S2, S3, S4, V>(
      r1: Reducer<S1, V>,
      r2: Reducer<S2, V>,
      r3: Reducer<S3, V>,
      r4: Reducer<S4, V>
    ): Reducer<S1 & S2 & S3 & S4, V>
    concatAll<S1, S2, S3, S4, S5, V>(
      r1: Reducer<S1, V>,
      r2: Reducer<S2, V>,
      r3: Reducer<S3, V>,
      r4: Reducer<S4, V>,
      r5: Reducer<S5, V>
    ): Reducer<S1 & S2 & S3 & S4 & S5, V>
    concatAll<S, V>(...reducers: Reducer<any, V>[]): Reducer<S, V>
    reduceGroup<R>(g: {
      reduce: (
        reduceAdd: reduceFn<any, any>,
        reduceRemove: reduceFn<any, any>,
        init: () => any
      ) => R
    }): R
  }
  export const Reducer: ReducerHelper
}

declare module 'redugator/reducers' {
  import { Reducer } from 'redugator'
  export const average: <
    KCount extends string = 'count',
    KSum extends string = 'sum',
    KAvg extends string = 'avg'
  >(
    count?: KCount,
    sum?: KSum,
    avg?: KAvg
  ) => Reducer<
    Record<KCount, number> & Record<KSum, number> & Record<KAvg, number>,
    any
  >

  export const sum: <V, K extends string = 'sum'>(
    valueAccessor: (value: V) => number,
    key?: K
  ) => Reducer<Record<K, number>, V>

  export const max: <
    V,
    R extends number | Date | string | boolean,
    K extends string = 'max'
  >(
    valueAccessor: (value: V) => R,
    key?: K
  ) => Reducer<Record<K, number> & Record<`${K}_valuelist`, R[]>, V>

  export const groupBy: <V, T>(
    keyAccessor: (value: V) => string,
    inner: Reducer<T, V>
  ) => Reducer<Record<string, T>, V>

  export const valueList: <
    V,
    R extends number | Date | string | boolean,
    K extends string = 'valueList'
  >(
    valueAccessor: (value: V) => R,
    key?: K
  ) => Reducer<Record<K, R[]>, V>

  export const splitBy: <V, R extends string | Date | number | boolean, K>(
    keyAccessor: (value: V) => R,
    reducer: Reducer<K, V>
  ) => Reducer<[R, K][], V>
}
