import { type PropsWithChildren, type ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type WithTooltipProps = PropsWithChildren<{
  label: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

function WithTooltip({ label, side = 'top', children }: WithTooltipProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export default WithTooltip
