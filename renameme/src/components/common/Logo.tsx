import { HTMLAttributes } from 'react'

function Logo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/images/logo.png"
      alt="Logo"
      {...props}
    />
  )
}

export default Logo
