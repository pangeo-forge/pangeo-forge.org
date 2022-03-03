import { Box, Container, Flex } from 'theme-ui'
import Meta from './meta'
import Header from './header'
import Footer from './footer'
import DashboardMenu from './dashboard-menu'

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
      </Flex>
      {/* <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Button
          bg='black'
          color='white'
          px='4'
          py='2'
          rounded='lg'
          sx={{ margin: 'auto', mt: [4, 4, 4, 5] }}
        >
          {' '}
          <Link
            sx={{
              fontFamily: 'body',
              color: 'white',
              textDecoration: 'none',
              '&:hover': { color: 'white', textDecoration: 'underline' },
            }}
            href='https://vercel.com?utm_source=pangeo-forge&utm_campaign=oss'
          >
            {'Powered by'}{' '}
            <span role='img' aria-label='Vercel logo'>
              ▲
            </span>{' '}
            Vercel
          </Link>
        </Button>
      </Flex> */}
      <Container>
        <Footer />
      </Container>
    </Box>
  )
}

export default Layout
