import React, { PropsWithChildren } from 'react'
import { themes } from '@lib/constants/global/themes'
import { ThemeContext } from '@lib/context/ThemeContext'

const getTheme = () => {
  if (typeof window === 'undefined') return 'light'

  const theme = `${localStorage.getItem('theme')}`
  if (Object.values(themes).includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)').matches
  if (userMedia) return themes.light

  return themes.dark
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = React.useState(getTheme)

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
