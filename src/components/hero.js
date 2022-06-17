import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const Hero = () => {
  return (
    <Box as='section' sx={{ bg: 'purple.900', color: 'invert' }}>
      {' '}
      <Container maxW='container.sm' py={90} centerContent>
        <Flex direction='column'>
          <Image src='/pangeo-forge-logo-white.png' alt='Pangeo-Forge logo' />
          <Text fontFamily={'subtitle'} fontWeight={'subtitle'} fontSize={'xl'}>
            {' '}
            A cloud-native data repository for ocean, weather, and climate
            science.
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
