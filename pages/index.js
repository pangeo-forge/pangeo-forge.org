import { Box, Container, Themed } from 'theme-ui'
import Image from 'next/image'
import Layout from '../components/layout'

const Index = (props) => {
  return (
    <Layout container={false}>
      <Box sx={{ bg: 'purple', color: 'invert' }}>
        <Container sx={{ py: [6, 6, 6, 7] }}>
          <Box sx={{ mx: 'auto' }}>
            <Image
              src='https://pangeo-forge.org/img/pangeo-forge-logo-white.cb96c4cf.png'
              alt='Pangeo-Forge logo'
              width={550}
              height={343}
            />
            <Themed.p>
              A cloud-native data repository for ocean, weather, and climate
              science.
            </Themed.p>
          </Box>
        </Container>
      </Box>
      <Box sx={{ bg: '#eee', color: 'text' }}>
        <Container sx={{ py: [1, 1, 1, 2] }}>
          <Box>
            <Themed.p>Space for top-level stats</Themed.p>
          </Box>
        </Container>
      </Box>
      <Container sx={{ mb: [5, 5, 5, 6] }}>
        <Themed.h1>About Pangeo Forge</Themed.h1>
        <Themed.p>
          Pangeo Forge is an open source platform for data Extraction,
          Transformation, and Loading (ETL). The goal of Pangeo Forge is to make
          it easy to extract data from traditional data repositories and deposit
          in cloud object storage in analysis-ready, cloud-optimized (ARCO)
          format. Pangeo Forge is inspired directly by Conda Forge, a
          community-led collection of recipes for building conda packages. We
          hope that Pangeo Forge can play the same role for datasets.
        </Themed.p>
        <Themed.h1>How it works</Themed.h1>
        <Image
          src='https://pangeo-forge.org/img/pangeo-forge-diagram.b8332f39.png'
          alt='Pangeo-Forge schematic'
          width={740.5}
          height={368.16}
        />
      </Container>
    </Layout>
  )
}

export default Index
