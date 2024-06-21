import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import _ from 'clsx'

import useRefresh from '~hooks/common/useRefresh'

// https://stackoverflow.com/questions/65011555/auto-scaling-input-to-width-of-value-in-react
function InputAutoResize(props: InputHTMLAttributes<HTMLInputElement>) {
  const { value, className = '', style = {}, ...otherProps } = props

  const contentRef = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState(0)

  useRefresh()

  useEffect(() => {
    if (!contentRef.current) return

    // + 16 to prevent scrolling within the input
    setWidth(contentRef.current.offsetWidth + 16)
  }, [value])

  return (
    <>
      <div
        ref={contentRef}
        className={_('absolute opacity-0 -z-10', className)}
      >
        {value}
      </div>
      <input
        value={value}
        className={className}
        style={{ width, ...style }}
        {...otherProps}
      />
    </>
  )
}

export default InputAutoResize
