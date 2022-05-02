import Image from 'next/image'
import { Box, Flex } from 'theme-ui'
import { GoMarkGithub } from 'react-icons/go'
import Link from './link'

const Header = () => {
  const headerItems = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Dashboard', href: '/dashboard/feedstocks' },
    { label: 'Docs', href: 'https://pangeo-forge.readthedocs.io/' },
    {
      label: 'GitHub',
      href: 'https://github.com/pangeo-forge',
      logo: <GoMarkGithub />,
    },
  ]

  return (
    <Flex sx={{ mt: [3], mb: [3], justifyContent: 'space-between' }}>
      <Link href={'/'}>
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

      <Flex>
        {headerItems.map(function ({ label, href, logo }) {
          let _label = label
          if (typeof logo !== 'undefined') {
            _label = logo
          }

          return (
            <Link key={label} href={href} px={3}>
              <Box
                sx={{
                  ml: [3, 4, 5],
                  display: 'inline-block',
                  float: 'right',
                  fontSize: [2, null, 3],
                  mt: [1, null, 0],
                  '&:hover': { textDecoration: 'none' },
                }}
              >
                {_label}
              </Box>
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default Header
