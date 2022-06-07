import '@/assets/fonts.css'
import '@/assets/global.css'
import ColorSwitcher from '@/components/color-switcher'
import Meta from '@/components/meta'
import theme from '@/lib/theme'
import * as React from 'react'
import { ThemeProvider } from 'theme-ui'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <ColorSwitcher />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
