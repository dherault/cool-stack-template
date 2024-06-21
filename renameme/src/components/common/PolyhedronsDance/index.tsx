import { useEffect, useRef } from 'react'

import useWindowSize from '~hooks/common/useWindowSize'

// @ts-expect-error
import handleCanvas from './handleCanvas'

function PolyhedronsDance() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useWindowSize()

  useEffect(() => handleCanvas(canvasRef.current), [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen"
    />
  )
}

export default PolyhedronsDance
