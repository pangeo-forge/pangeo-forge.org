import { Footer, Header, Meta } from '@/components'
import { Box, Container, Flex } from '@chakra-ui/react'

export const Layout = ({ children }) => {
  let content = children

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
