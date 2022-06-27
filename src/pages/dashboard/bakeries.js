import { BakeryCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useBakeries } from '@/lib/endpoints'
import {
  Box,
  SimpleGrid,
  Container,
  Skeleton,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react'

const Bakeries = () => {
  const { bakeries, bakeriesError } = useBakeries()

  if (bakeriesError)
    return (
      <Layout menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!bakeries) return <Layout menu={true}></Layout>

  return (
    <Layout menu={true}>
      <Box as='section' mb={8}>
        <Container maxW='container.xl' centerContent>
          <Heading as={'h2'} mb={4}>
            Bakeries
          </Heading>
          <Text>
            Bakeries turn recipes into data. They do the heavy lifting of
            actually executing the recipes: extracting data from its source,
            transforming it, and loading it into its target destination.
            Bakeries are controlled by triggers from GitHub workflows.
          </Text>

          <SimpleGrid
            mt={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            justifyContent={'space-between'}
          >
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
