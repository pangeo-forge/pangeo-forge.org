import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Flex, MenuButton, Link, NavLink } from 'theme-ui'
import { BsBorderWidth } from 'react-icons/bs'

const Header = () => {
  const [showMenu, setshowMenu] = useState(false)

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
      <Box sx={{ display: 'inline-block', flex: '1 1 auto', float: 'right' }}>
        <MenuButton
          aria-label='Toggle Menu'
          onClick={() => setshowMenu(showMenu ? false : true)}
          sx={{ display: 'block', float: 'right' }}
        />
        {showMenu && (
          <Box
            sx={{
              bg: 'white',
              color: 'purple',
              borderRadius: '15px',
              borderColor: 'purple',
              borderWidth: '1px',
              border: 'solid',
              maxWidth: ['100%', '20%', '180px'],
              // m: '25px auto',
              mt: [2],
              mr: [11],
              p: [3],
              position: 'absolute',
              right: '0',
              left: 'auto',
              zindex: 100,
            }}
          >
            <Flex
              as='nav'
              sx={{
                display: [showMenu ? 'flex' : 'none', 'flex'],
                flexDirection: 'column',
                fontSize: [2],
              }}
            >
              <NavLink href='/'>Home</NavLink>
              <NavLink href='/catalog'>Catalog</NavLink>
              <NavLink href='/dashboard/feedstocks'>Dashboard</NavLink>
              <NavLink href='https://pangeo-forge.readthedocs.io/'>
                Docs
              </NavLink>
              <NavLink href='https://github.com/pangeo-forge'>GitHub</NavLink>
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default Header
