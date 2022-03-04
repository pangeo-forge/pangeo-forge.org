import Image from 'next/image'
import { Box, Flex, MenuButton, Link, NavLink } from 'theme-ui'

const Footer = () => {
  return (
    <Box
      as='footer'
      sx={{ borderTop: 'solid', borderWidth: '1px', width: '100%', mt: [6] }}
    >
      Footer goes here
    </Box>
  )
}

export default Footer
