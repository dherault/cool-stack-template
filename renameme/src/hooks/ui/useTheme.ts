import { useContext } from 'react'

import ThemeModeContext from '~contexts/ui/ThemeModeContext'

export function useTheme() {
  return useContext(ThemeModeContext)
}
