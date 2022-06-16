import '@/assets/fonts.css'
import '@/assets/global.css'
import { Meta } from '@/components'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/theme'
import * as React from 'react'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS={theme}>
      <Meta />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
