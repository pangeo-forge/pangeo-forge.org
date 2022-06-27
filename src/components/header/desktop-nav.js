import { Link } from '@/components'
import { DesktopSubNav } from '@/components/header/desktop-sub-nav'
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export const DesktopNav = ({ navItems, ...props }) => {
  const hoverColor = useColorModeValue('teal.300', 'teal.400')
  const popoverColor = useColorModeValue(
    'rgba(50, 33, 115, 0.9)',
    'rgba(26, 32, 44, 0.8)'
  )
  const color = useColorModeValue('white.800', 'white.200')

  return (
    <Stack direction={'row'} spacing={4} {...props}>
      {navItems.map((item) => (
        <Box key={item.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={item.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={color}
                _hover={{
                  textDecoration: 'none',
                  color: hoverColor,
                }}
              >
                {item.label}
              </Link>
            </PopoverTrigger>

            {item.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {item.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}
