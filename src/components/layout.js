import { Footer, Header } from '@/components'
import { Menu } from '@/components/dashboard'
import { Box, Flex } from '@chakra-ui/react'

export const Layout = ({ children, menu = null }) => {
  return (
    <Flex
      direction={'column'}
      justify={'space-between'}
      gap={0}
      minHeight={'100vh'}
    >
      <Box>
        <Header />
        {menu && <Menu />}
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
