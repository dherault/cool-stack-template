function intersectArrays<T>(arrays: T[][]) {
  return arrays.reduce((acc, array) => acc.filter(x => array.includes(x)), arrays[0] ?? [])
}

export default intersectArrays
