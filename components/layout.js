import { Box, Container } from 'theme-ui'
import Meta from './meta'

const Layout = ({ children, container }) => {
  let content = children

  if (container) {
    content = (
      <Box sx={{ mb: [8, 8, 9, 10] }}>
        <Container>{content}</Container>
      </Box>
    )
  }

  return (
    <Box>
      <Meta />
      {content}
    </Box>
  )
}

export default Layout
