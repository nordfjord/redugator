function bisect_by(f) {
  function bisectLeft(a, x, lo, hi) {
    while (lo < hi) {
      var mid = (lo + hi) >>> 1
      if (f(a[mid]) < x) lo = mid + 1
      else hi = mid
    }
    return lo
  }

  function bisectRight(a, x, lo, hi) {
    while (lo < hi) {
      var mid = (lo + hi) >>> 1
      if (x < f(a[mid])) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  bisectRight.right = bisectRight
  bisectRight.left = bisectLeft
  return bisectRight
}

export const bisect = bisect_by(x => x)
bisect.by = bisect_by
