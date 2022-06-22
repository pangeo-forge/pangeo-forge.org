import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'

export const HowItWorks = () => {
  return (
    <Box as='section'>
      <Container maxW='container.xl' centerContent>
        <Flex direction='column' alignItems={'center'}>
          <Heading as={'h1'}>How It Works</Heading>
          <Box py={[6, 6, 8, 10]}>
            <Image
              src='/pangeo-forge-diagram.png'
              alt='Pangeo-Forge schematic'
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
