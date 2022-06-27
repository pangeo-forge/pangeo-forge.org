import { Link } from '@/components'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const About = () => {
  return (
    <Box as='section'>
      <Container maxW='container.xl' py={90} centerContent>
        <Flex direction='column' alignItems={'center'}>
          <Heading as={'h1'} size='2xl'>
            About Pangeo Forge
          </Heading>
          <Text py={[6, 6, 8, 10]} textAlign={'center'}>
            Pangeo Forge is an open source platform for data{' '}
            <Link
              href='https://en.wikipedia.org/wiki/Extract,_transform,_load'
              color={'blue.400'}
            >
              Extraction, Transformation, and Loading (ETL)
            </Link>
            . The goal of Pangeo Forge is to make it easy to extract data from
            traditional data repositories and deposit in cloud object storage in
            <Link
              href='https://ieeexplore.ieee.org/abstract/document/9354557'
              color={'blue.400'}
            >
              {' '}
              analysis-ready, cloud-optimized (ARCO)
            </Link>{' '}
            format. Pangeo Forge is inspired directly by{' '}
            <Link href='https://conda-forge.org/' color={'blue.400'}>
              Conda Forge
            </Link>
            , a community-led collection of recipes for building conda packages.
            We hope that Pangeo Forge can play the same role for datasets.
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
