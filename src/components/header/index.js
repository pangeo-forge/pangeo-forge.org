import { Link } from '@/components'
import { navItems as menuItems } from '@/components/header/data'
import { DesktopNav } from '@/components/header/desktop-nav'
import { MobileNav } from '@/components/header/mobile-nav'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { IoMoon, IoSunny } from 'react-icons/io5'

export const Header = () => {
  const navItems = React.useMemo(() => menuItems, [])
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex
        as={'header'}
        pos='fixed'
        top='0'
        w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex='999'
        justify={'center'}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue(
            'rgba(50, 33, 115, 1)',
            'rgba(26, 32, 44, 0.8)'
          ),
        }}
      >
        <Container as={Flex} maxW={'7xl'} align={'center'}>
          <Flex
            flex={{ base: '0', md: 'auto' }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isMobileNavOpen ? <CloseIcon /> : <HamburgerIcon />}
              //variant='ghost'
              size={'sm'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>

          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'start', md: 'start' }}
          >
            <Stack
              as={Link}
              href={'/'}
              direction={'row'}
              alignItems={'center'}
              spacing={{ base: 2, sm: 4 }}
            >
              <Image
                w={225}
                src={'/pangeo-forge-text-only-white.png'}
                alt={'Pangeo-Forge logo'}
              />
            </Stack>
          </Flex>

          <Stack
            direction={'row'}
            align={'center'}
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: 'auto' }}
            justify={'flex-end'}
          >
            <DesktopNav
              navItems={navItems}
              display={{ base: 'none', md: 'flex' }}
            />
            <IconButton
              size={'sm'}
              variant={'ghost'}
              aria-label={'Toggle Color Mode'}
              onClick={toggleColorMode}
              icon={
                colorMode == 'light' ? (
                  <IoMoon size={18} />
                ) : (
                  <IoSunny size={18} />
                )
              }
            />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isMobileNavOpen} navItems={navItems} />
    </Box>
  )
}
