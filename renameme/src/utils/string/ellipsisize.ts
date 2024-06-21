const MAX_LENGTH = 64

function ellipsisize(string: string, length = MAX_LENGTH) {
  if (string.length <= length) return string

  return `${string.slice(0, length)}...`
}

export default ellipsisize
