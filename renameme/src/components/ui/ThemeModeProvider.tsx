import { useEffect, useMemo } from 'react'

import ThemeModeContext from '~contexts/ui/ThemeModeContext'

import usePersistedState from '~hooks/common/usePersistedState'

type ThemeMode = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeMode
}

export function ThemeModeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = usePersistedState('theme', defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)

      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    setTheme,
  }), [theme, setTheme])

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  )
}
