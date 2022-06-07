import DashboardMenu from '@/components/dashboard-menu'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Meta from '@/components/meta'
import { Box, Container, Flex } from 'theme-ui'

const Layout = ({ children, container = true, menu = null }) => {
  let content = children
  let menuContent = <></>

  if (container) {
    content = (
      <Box>
        <Container>{content}</Container>
      </Box>
    )
  }

  if (menu) {
    menuContent = <DashboardMenu></DashboardMenu>
  }

  return (
    <Box sx={{ mb: [8, 8, 9, 10] }}>
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          as='header'
          sx={{
            width: '100%',
            position: 'sticky',
            top: 0,
            bg: 'purple',
            color: 'invert',
            height: '56px',
            zIndex: 2000,
          }}
        >
          <Container>
            <Header />
          </Container>
        </Box>
        <Container>{menuContent}</Container>
        <Box>
          <Meta />
          {content}
        </Box>
        <Footer />
      </Flex>
    </Box>
  )
}

export default Layout
