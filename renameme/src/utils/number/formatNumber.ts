function formatNumber(x: number, decimals = 0) {
  return addComas((decimals !== 0 && Math.floor(x) === x) ? x.toString() : x.toFixed(decimals ?? 2))
}

function addComas(x: string) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default formatNumber
