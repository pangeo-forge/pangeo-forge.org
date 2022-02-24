import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex } from 'theme-ui'

const Header = ({ menuItems }) => {
  return (
    <Flex sx={{ mt: [3], mb: [3] }}>
      <Link href={'/'} passHref>
        <Box sx={{ flex: '1 1 auto' }}>
          {/* TODO: replace with vector version */}
          <Image
            src='https://pangeo-forge.org/img/pangeo-forge-text-only-white.042935a8.png'
            alt='Pangeo-Forge workdmark'
            width={224}
            height={28}
          />
        </Box>
      </Link>
      {Object.keys(menuItems).map((key, i) => (
        <Link key={i} href={menuItems[key]} passHref>
          <Box
            key={i}
            sx={{
              ml: [5],
              display: 'inline-block',
              float: 'right',
              fontSize: [3],
            }}
          >
            {key}
          </Box>
        </Link>
      ))}
    </Flex>
  )
}

export default Header
