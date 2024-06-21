import type { PropsWithChildren } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MailCheck } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '~components/ui/Alert'
import AuthenticationRedirect from '~components/authentication/AuthenticationRedirect'
import Logo from '~components/common/Logo'

function Layout({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams()
  const passwordResetSuccess = searchParams.get('password-reset')

  return (
    <AuthenticationRedirect>
      <div className="py-8 px-3">
        <Link to="/">
          <div className="flex items-center justify-center text-blue">
            <Logo className="w-16" />
          </div>
          <h1 className="mt-2 text-4xl text-center font-semibold text-blue">
            Hero Strategy
          </h1>
          <div className="text-[20.2px] text-center text-neutral-500 font-medium">
            Strategy suit for startups
          </div>
        </Link>
        <div className="mt-8 mx-auto max-w-[512px]">
          {passwordResetSuccess && (
            <Alert
              className="mb-4"
              variant="success"
            >
              <MailCheck className="w-4" />
              <AlertTitle>Password reset</AlertTitle>
              <AlertDescription>
                Check your emails for a password reset link
              </AlertDescription>
            </Alert>
          )}
          <article className="p-8 bg-white elevation-4 rounded-lg">
            {children}
          </article>
        </div>
      </div>
    </AuthenticationRedirect>
  )
}

export default Layout
