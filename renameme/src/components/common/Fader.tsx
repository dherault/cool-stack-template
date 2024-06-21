import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'

import { FADER_DURATION } from '~constants'

type FaderProps = PropsWithChildren<{
  in: boolean
  animated?: boolean
  className?: string
  mountOnEnter?: boolean
  unmountOnExit?: boolean
}>

export const duration = FADER_DURATION

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

function Fader({
  children,
  in: inProp,
  animated = true,
  className,
  mountOnEnter = true,
  unmountOnExit = true,
}: FaderProps) {
  const [workingIn, setWorkingIn] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    setWorkingIn(inProp)
  }, [inProp])

  if (!animated) return children as JSX.Element

  return (
    <Transition
      nodeRef={nodeRef}
      in={workingIn}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={duration}
    >
      {state => (
        <div
          ref={nodeRef}
          className={className}
          style={{
            ...defaultStyle,
            ...transitionStyles[state as keyof typeof transitionStyles],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

export default Fader
