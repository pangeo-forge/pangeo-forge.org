import { Layout, Link, Hero } from '@/components'
import { Summary } from '@/components/dashboard'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'

const Stat = ({ name, number }) => {
  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          fontFamily: 'subtitle',
          fontWeight: 'subtitle',
          fontSize: [1],
          pt: [2],
          pb: [1],
        }}
      >
        {name}
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          color: 'pink',
          fontSize: [5],
          pt: [1],
          pb: [2],
        }}
      >
        {number}
      </Box>
    </Box>
  )
}

const Index = () => {
  return (
    <Layout container={false}>
      <Hero />
      <Summary />
      {/* <Box sx={{ bg: 'purple.900', color: 'invert' }}>
        
      </Box>
      
      <Container sx={{ mb: [5, 5, 5, 6] }}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Heading as='h1'>About Pangeo Forge</Heading>
          <Box
            variant='styles.p'
            sx={{ textAlign: 'center', px: [6, 6, 8, 10] }}
          >
            Pangeo Forge is an open source platform for data Extraction,
            Transformation, and Loading (ETL). The goal of Pangeo Forge is to
            make it easy to extract data from traditional data repositories and
            deposit in cloud object storage in analysis-ready, cloud-optimized
            (ARCO) format. Pangeo Forge is inspired directly by Conda Forge, a
            community-led collection of recipes for building conda packages. We
            hope that Pangeo Forge can play the same role for datasets.
          </Box>
          <Heading as='h1'>How it works</Heading>
          <Box>
            <Image
              src='/pangeo-forge-diagram.png'
              alt='Pangeo-Forge schematic'
              width={740.5}
              height={368.16}
            />
          </Box>
        </Flex>
      </Container> */}
    </Layout>
  )
}

export default Index
