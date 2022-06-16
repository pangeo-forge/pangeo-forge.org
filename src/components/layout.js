import { Footer, Header, Meta } from '@/components'
import { Box, Container, Flex } from '@chakra-ui/react'

const Layout = ({ children, container = true, menu = null }) => {
  let content = children

  return (
    <>
      <Header />
      {content}
      <Footer />
    </>
  )
}

export default Layout
