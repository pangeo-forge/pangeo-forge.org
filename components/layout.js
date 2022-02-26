import { Box, Container, Flex } from 'theme-ui'
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
  )
}

export default Layout
