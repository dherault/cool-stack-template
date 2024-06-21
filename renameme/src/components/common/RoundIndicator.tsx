import { type PropsWithChildren, useRef } from 'react'
import _ from 'clsx'

import useRefresh from '~hooks/common/useRefresh'

type RoundIndicatorProps = PropsWithChildren<{
  label: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  hidden?: boolean
  offset?: number
  sideOffset?: number
  className?: string
  innerClassName?: string
}>

function RoundIndicator({
  children,
  label,
  placement = 'top',
  hidden = false,
  offset = 0,
  sideOffset = 0,
  className,
  innerClassName,
}: RoundIndicatorProps) {
  const childrenRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useRefresh(!hidden)

  // if (hidden) return children as JSX.Element

  return (
    <div className={_('relative', className)}>
      {!hidden && !!childrenRef.current && (
        <div
          ref={contentRef}
          className={_('absolute items-center z-50 w-max', {
            'flex flex-col': placement === 'top',
            'flex flex-col-reverse': placement === 'bottom',
            flex: placement === 'left',
            'flex flex-row-reverse': placement === 'right',
            'opacity-0': !contentRef.current,
          })}
          style={(() => {
            const rect = childrenRef.current.getBoundingClientRect()
            const contentRect = contentRef.current?.getBoundingClientRect()

            if (!contentRect) return {}

            return {
              top: placement === 'top'
                ? -contentRect.height - 4 - offset
                : placement === 'bottom'
                  ? `calc(100% + 4px + ${offset}px)`
                  : (rect.height - contentRect.height) / 2 + sideOffset,
              left: placement === 'left'
                ? -contentRect.width - 4 - offset
                : placement === 'right'
                  ? rect.width + 4 + offset
                  : (rect.width - contentRect.width) / 2 + sideOffset,
            }
          })()}
        >
          <div className={_('-mx-1 px-1 text-sm font-light shrink-0 bg-white', {
            'mr-1': placement === 'left',
            'ml-1': placement === 'right',
          })}
          >
            {label}
          </div>
          <div className={_('bg-blue shrink-0', {
            'w-px h-12': placement === 'top' || placement === 'bottom',
            'w-12 h-px': placement === 'left' || placement === 'right',
          })}
          />
          <div className="w-1 h-1 bg-blue rounded-full shrink-0" />
        </div>
      )}
      <div
        ref={childrenRef}
        className={innerClassName}
      >
        {children}
      </div>
    </div>
  )
}

export default RoundIndicator
