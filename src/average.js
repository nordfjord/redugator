export function average(count = 'count', sum = 'sum', key = 'avg') {
  return {
    reduceAdd(p) {
      p[key] = p[count] === 0 ? 0 : p[sum] / p[count]
      return p
    },
    reduceRemove(p) {
      p[key] = p[count] === 0 ? 0 : p[sum] / p[count]
      return p
    },
    reduceInitial(p = {}) {
      p[key] = 0
      return p
    },
  }
}
