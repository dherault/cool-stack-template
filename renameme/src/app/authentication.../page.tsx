import { Navigate } from 'react-router-dom'

function Page() {
  return (
    <Navigate
      replace
      to="/authentication/login"
    />
  )
}

export default Page
