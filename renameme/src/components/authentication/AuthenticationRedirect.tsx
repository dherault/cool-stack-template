import { type PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function AuthenticationRedirect({ children }: PropsWithChildren) {
  const { user, loadingAuthentication } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    navigate('/~', { replace: true })
  }, [
    user,
    navigate,
  ])

  if (loadingAuthentication || user) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationRedirect
