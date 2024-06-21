import type { PropsWithChildren } from 'react'

import LandingNav from '~components/landing/LandingNav'
import LandingFooter from '~components/landing/LandingFooter'

function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingNav />
      {children}
      <div className="grow" />
      <LandingFooter />
    </>
  )
}

export default LandingLayout
