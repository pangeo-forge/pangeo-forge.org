import { Box, Container, Flex, Heading } from 'theme-ui'
import Image from 'next/image'
import Layout from '../components/layout'
import { useFeedstocks, useRecipeRuns } from '../lib/endpoints'
import { alpha } from '@theme-ui/color'

const Stat = ({ name, number }) => {
  return (
    <Box sx={{ flex: '1 1 auto' }}>
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
  const { feedstocks = [] } = useFeedstocks()
  const { recipeRuns = [] } = useRecipeRuns()

  return (
    <Layout container={false}>
      <Box sx={{ bg: 'purple', color: 'invert' }}>
        <Container sx={{ py: [6, 6, 6, 7] }}>
          <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src='https://pangeo-forge.org/img/pangeo-forge-logo-white.cb96c4cf.png'
              alt='Pangeo-Forge logo'
              width={550}
              height={343}
            />
            <Box sx={{ fontFamily: 'subtitle', fontWeight: 'subtitle' }}>
              A cloud-native data repository for ocean, weather, and climate
              science.
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box sx={{ bg: '#eee', color: 'text' }}>
        <Container sx={{ py: [1, 1, 1, 2] }}>
          <Flex
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              layoutAlign: 'center',
            }}
          >
            <Stat name='Feedstocks' number={feedstocks.length} />
            <Stat name='Recipes Runs' number={recipeRuns.length} />
            <Stat name='Datasets' number='-' />
          </Flex>
        </Container>
      </Box>
      <Container sx={{ mb: [5, 5, 5, 6] }}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              fontFamily: 'title',
              fontWeight: 'title',
              fontSize: [6],
              color: 'blue',
              py: [4],
            }}
          >
            About Pangeo Forge
          </Box>
          <Box
            sx={{ fontFamily: 'body', textAlign: 'center', px: [6, 6, 8, 10] }}
          >
            Pangeo Forge is an open source platform for data Extraction,
            Transformation, and Loading (ETL). The goal of Pangeo Forge is to
            make it easy to extract data from traditional data repositories and
            deposit in cloud object storage in analysis-ready, cloud-optimized
            (ARCO) format. Pangeo Forge is inspired directly by Conda Forge, a
            community-led collection of recipes for building conda packages. We
            hope that Pangeo Forge can play the same role for datasets.
          </Box>
          <Box
            sx={{
              fontFamily: 'title',
              fontWeight: 'title',
              fontSize: [6],
              color: 'blue',
              py: [4],
            }}
          >
            How it works
          </Box>
          <Box>
            <Image
              src='https://pangeo-forge.org/img/pangeo-forge-diagram.b8332f39.png'
              alt='Pangeo-Forge schematic'
              width={740.5}
              height={368.16}
            />
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Index
