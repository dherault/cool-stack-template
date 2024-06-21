import { LinkProps, Link as RouterLink } from 'react-router-dom'
import _ from 'clsx'

function Link({ className, ...props }: LinkProps) {
  return (
    <RouterLink
      {...props}
      className={_('', className)}
    />
  )
}

export default Link
