
import { useEffect, useRef } from 'react'

import useWindowSize from '~hooks/common/useWindowSize'

// @ts-expect-error
import handleCanvas from './handleCanvas'

function Polyhedrons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (!canvasRef.current) return

    const { width, height } = canvasRef.current.getBoundingClientRect()

    return handleCanvas(canvasRef.current, width, height)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="h-24 w-full"
    />
  )
}

export default Polyhedrons
