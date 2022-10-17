import { theme } from '@/theme'
import { Fonts } from '@/theme/foundations/fonts'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
