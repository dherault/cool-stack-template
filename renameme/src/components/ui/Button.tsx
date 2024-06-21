import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '~utils/ui'

import Spinner from '~components/common/Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default: 'bg-blue text-white hover:bg-blue/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        success: 'bg-green-500 text-white hover:bg-green-500/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90',
        outline: 'border border-blue bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        'outline-secondary': 'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-midnight-900 dark:hover:bg-midnight-950 dark:hover:text-white',
        'outline-destructive': 'border border-red-500 bg-white text-red-500 hover:bg-neutral-50 dark:bg-midnight-900 dark:hover:bg-midnight-950 dark:hover:text-white',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        'ghost-destructive': 'text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'py-2 px-4 h-10',
        xs: 'px-1.5 h-6',
        sm: 'px-3 h-9',
        lg: 'py-6 px-8 h-11 text-xl',
        huge: 'pt-2 pb-2.5 px-8 h-14 text-2xl',
        icon: 'h-10 w-10',
        'icon-sm': 'h-9 w-9',
        'icon-small': 'h-8 w-8',
        'icon-tiny': 'h-4 w-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <>
            <Spinner className="inline w-4 mr-3" />
            Loading...
          </>
        )}
        {!loading && children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
