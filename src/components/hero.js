import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export const Hero = () => {
  const bg = useColorModeValue(
    'rgba(50, 33, 115, 0.9)',
    'rgba(26, 32, 44, 0.8)',
  )
  return (
    <Box as='section' sx={{ bg: bg, color: 'invert' }}>
      {' '}
      <Container maxW='container.xl' py={90} centerContent>
        <Flex direction='column'>
          <Image src='/pangeo-forge-logo-white.png' alt='Pangeo-Forge logo' />
          <Text
            textTransform={'uppercase'}
            color={'white'}
            opacity={0.8}
            align={'center'}
          >
            {' '}
            A cloud-native data repository for ocean, weather, and climate
            science
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
