import { type HTMLAttributes } from 'react'
import Balancer from 'react-wrap-balancer'
import _ from 'clsx'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

const asToFontSize = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-md',
  div: 'text-base',
}

function Heading({ as = 'h1', children, className, ...props }: HeadingProps) {
  const Component = as

  return (
    <Component
      className={_('font-semibold leading-none', className, asToFontSize[as])}
      {...props}
    >
      <Balancer>
        {children}
      </Balancer>
    </Component>
  )
}

export default Heading
