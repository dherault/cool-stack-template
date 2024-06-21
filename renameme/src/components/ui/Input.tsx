import * as React from 'react'

import { cn } from '~utils/ui'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        `flex
        h-10
        w-full
        rounded-md
        border
        bg-white
        px-3
        py-2
        text-sm
        ring-offset-white
        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        placeholder:text-neutral-500
        focus-visible:outline-none
        focus-visible:border-blue
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        dark:border-neutral-800
        dark:bg-neutral-950
        dark:ring-offset-neutral-950
        dark:placeholder:text-neutral-400
        dark:focus-visible:border-blue-300`,
        error && 'focus-visible:ring-red-500',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
