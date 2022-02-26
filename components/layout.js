import { Box, Button, Container, Flex, Link } from 'theme-ui'
import Meta from './meta'
import Header from './header'

const Layout = ({ children, container = true }) => {
  let content = children

  if (container) {
    content = (
      <Box sx={{ mb: [8, 8, 9, 10] }}>
        <Container>{content}</Container>
      </Box>
    )
  }

  const menuItems = {
    Home: '/',
    Dashboard: '/dashboard/feedstocks',
    Docs: '/docs',
    Recipes: 'https://pangeo-forge.readthedocs.io/',
    GitHub: 'https://github.com/pangeo-forge',
  }

  return (
    <Box>
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
            <Header menuItems={menuItems} />
          </Container>
        </Box>

        <Box>
          <Meta />
          {content}
        </Box>
      </Flex>
      <Flex
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
          sx={{ margin: 'auto' }}
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
      </Flex>
    </Box>
  )
}

export default Layout
