import { Footer, Header } from '@/components'
import { Box, Flex } from '@chakra-ui/react'

export const Layout = ({ children }) => {
  return (
    <Flex
      direction={'column'}
      justify={'space-between'}
      gap={0}
      minHeight={'100vh'}
    >
      <Box>
        <Header />
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
