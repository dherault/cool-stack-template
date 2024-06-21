function roundNumber(x: number, decimals = 3) {
  return Math.round(x * 10 ** decimals) / 10 ** decimals
}

export default roundNumber
