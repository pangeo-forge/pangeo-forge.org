import { Meta } from '@/components'
import { theme } from '@/theme'
import { Fonts } from '@/theme/foundations/fonts'
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS={theme}>
      <Fonts />
      <Meta />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
