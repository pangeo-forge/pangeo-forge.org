import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex } from 'theme-ui'

const Header = () => {
  const headerItems = {
    Home: '/',
    Catalog: '/catalog',
    Dashboard: '/dashboard/feedstocks',
    Docs: 'https://pangeo-forge.readthedocs.io/',
    GitHub: 'https://github.com/pangeo-forge',
  }

  return (
    <Flex sx={{ mt: [3], mb: [3] }}>
      <Link href={'/'} passHref>
        <Box sx={{ flex: '1 1 auto' }}>
          {/* TODO: replace with vector version */}
          <Image
            src='/pangeo-forge-text-only-white.png'
            alt='Pangeo-Forge workdmark'
            width={224}
            height={28}
          />
        </Box>
      </Link>
      {Object.keys(headerItems).map((key, i) => (
        <Link key={i} href={headerItems[key]} passHref>
          <Box
            key={i}
            sx={{
              ml: [3, 4, 5],
              display: 'inline-block',
              float: 'right',
              fontSize: [2, null, 3],
              mt: [1, null, 0],
              '&:hover': { textDecoration: 'underline' },
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
