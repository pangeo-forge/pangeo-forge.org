import { BakeryCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useBakeries } from '@/lib/endpoints'
import {
  Box,
  SimpleGrid,
  Container,
  Spinner,
  Heading,
  Text,
} from '@chakra-ui/react'

const Bakeries = () => {
  const { bakeries, bakeriesError } = useBakeries()

  if (bakeriesError)
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!bakeries)
    return (
      <Layout>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Layout>
    )

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.lg' py={90}>
          <Heading as={'h1'} p={7} textAlign={'center'}>
            Bakeries
          </Heading>
          <Text>
            Bakeries turn recipes into data. They do the heavy lifting of
            actually executing the recipes: extracting data from its source,
            transforming it, and loading it into its target destination.
            Bakeries are controlled by triggers from GitHub workflows. Bakeries
            can run in cloud or on-premises compute nodes; they should be placed
            in close network proximity to data sources and / or targets.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
            {bakeries.map((bakery, index) => (
              <BakeryCard
                key={index}
                name={bakery.name}
                region={bakery.region}
                description={bakery.description}
                id={bakery.id}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Bakeries
