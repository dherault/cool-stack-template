function dedupeArray(array: any[]) {
  return [...new Set(array)]
}

export default dedupeArray
