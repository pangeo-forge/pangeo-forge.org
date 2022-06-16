import { Link } from '@/components'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Collapse,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const MobileNavItem = ({ href, children, label }) => {
  const { isOpen, onToggle } = useDisclosure()
  const textColor = useColorModeValue('gray.600', 'gray.200')

  const handleToggle = (e) => {
    if (children) {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <Stack spacing={4} onClick={handleToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={textColor}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child, index) => (
              <Link key={index} href={child.href ?? '#'} py={2}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export const MobileNav = ({ isOpen, navItems }) => {
  const bg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  )
  if (!isOpen) return null
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}
      zIndex={9999}
      pos='fixed'
      top='60px'
      w={'full'}
      bg={'white'}
      minH={'calc(100vh - 60px)'}
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: bg,
      }}
    >
      {navItems.map((item) => (
        <MobileNavItem key={item.label} {...item} />
      ))}
    </Stack>
  )
}
