import { Box, Container } from 'theme-ui'
import Meta from './meta'

const Layout = ({ children }) => {
  return (
    <Box>
      <Meta />
      {children}
    </Box>
  )
}

export default Layout
