import formatNumber from '~utils/number/formatNumber'

function formatPercentage(percentage: number) {
  return `${percentage > 0 ? '+' : ''}${formatNumber(percentage)}%`
}

export default formatPercentage
