import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logo from '~components/common/Logo'
import UserDropdown from '~components/common/app-layout/UserDropdown'

function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="py-2 px-4 shrink-0 flex items-center border-b bg-white">
        <Link
          to="/~/projects"
          className="flex items-center text-blue gap-4"
        >
          <Logo className="w-8" />
          <div className="text-2xl font-bold">
            Hero Strategy
          </div>
        </Link>
        <div className="grow" />
        <UserDropdown />
      </div>
      <div className="px-4 grow flex flex-col overflow-auto relative">
        {children}
      </div>
    </>
  )
}

export default AppLayout
