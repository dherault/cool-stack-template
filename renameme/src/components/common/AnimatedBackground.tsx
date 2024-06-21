import { type PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

import PolyhedronsDance from '~components/common/PolyhedronsDance'

function AnimatedBackground({ children }: PropsWithChildren) {
  const { user } = useUser()

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {!user?.hideAnimatedBackground && (
        <PolyhedronsDance />
      )}
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

export default AnimatedBackground
