import { Dispatch, SetStateAction, createContext } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

type ThemeModeContext = {
  theme: ThemeMode
  setTheme: Dispatch<SetStateAction<ThemeMode>>
}

export default createContext<ThemeModeContext>({
  theme: 'system',
  setTheme: () => null,
})
