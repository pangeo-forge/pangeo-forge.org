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
  const hoverColor = useColorModeValue('gray.800', 'white')
  const popoverColor = useColorModeValue('white', 'gray.800')
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
