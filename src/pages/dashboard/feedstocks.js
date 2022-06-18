import { FeedstockCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstocks } from '@/lib/endpoints'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

const Feedstocks = () => {
  const { feedstocks, feedstocksError } = useFeedstocks()

  if (feedstocksError) {
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!feedstocks)
    return (
      <Layout>
        {' '}
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
        <Container maxW='container.xl' py={90} centerContent>
          <VStack p={8}>
            <Heading as={'h1'}>Feedstocks</Heading>
            <Text>
              Feedstocks are recipes that are managed and executed by Pangeo
              Forge cloud automation.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
            {feedstocks
              .filter((feedstock) => !feedstock.spec.includes('staged-recipes'))
              .sort((a, b) => a.spec.localeCompare(b.spec))
              .map((feedstock, index) => (
                <FeedstockCard
                  spec={feedstock.spec}
                  id={feedstock.id}
                  key={index}
                ></FeedstockCard>
              ))}
          </SimpleGrid>
          <Heading as={'h2'} py={6}>
            Staged Recipes
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
            {feedstocks
              .filter((feedstock) => feedstock.spec.includes('staged-recipes'))
              .sort((a, b) => a.spec.localeCompare(b.spec))
              .map((feedstock, index) => (
                <FeedstockCard
                  spec={feedstock.spec}
                  id={feedstock.id}
                  key={index}
                ></FeedstockCard>
              ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstocks
