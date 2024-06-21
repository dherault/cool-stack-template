import { type PropsWithChildren } from 'react'
import { Provider as WrapProvider } from 'react-wrap-balancer'

import { Toaster } from '~components/ui/Toaster'
import { TooltipProvider } from '~components/ui/Tooltip'
import { ThemeModeProvider } from '~components/ui/ThemeModeProvider'
import AuthenticationProvider from '~components/authentication/AuthenticationProvider'
import AnimatedBackground from '~components/common/AnimatedBackground'

function RootLayout({ children }: PropsWithChildren) {
  return (
    <WrapProvider>
      <ThemeModeProvider>
        <TooltipProvider>
          <AuthenticationProvider>
            <AnimatedBackground>
              <div className="h-screen overflow-y-auto overflow-x-hidden flex flex-col">
                {children}
              </div>
            </AnimatedBackground>
          </AuthenticationProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeModeProvider>
    </WrapProvider>
  )
}

export default RootLayout
