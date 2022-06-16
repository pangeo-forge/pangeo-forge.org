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
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            </PopoverTrigger>

            {item.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={bg}
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
