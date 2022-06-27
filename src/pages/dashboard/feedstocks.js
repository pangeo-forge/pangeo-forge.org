import { FeedstockCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstocks } from '@/lib/endpoints'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
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
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  return (
    <Layout menu={true}>
      <Box as='section' mb={8}>
        <Container maxW='container.xl' centerContent>
          <Heading as={'h3'} size='lg' mb={4}>
            Feedstocks
          </Heading>
          <Text>
            Feedstocks are recipes that are managed and executed by Pangeo Forge
            cloud automation.
          </Text>

          <SimpleGrid
            mt={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            justifyContent={'space-between'}
          >
            {feedstocks
              .filter((feedstock) => !feedstock.spec.includes('staged-recipes'))
              .sort((a, b) => a.spec.localeCompare(b.spec))

              .map((feedstock) => (
                <FeedstockCard
                  spec={feedstock.spec}
                  id={feedstock.id}
                  key={feedstock.id}
                ></FeedstockCard>
              ))}
          </SimpleGrid>

          <Heading as={'h3'} size='lg' mt={6}>
            Staged Recipes
          </Heading>

          <SimpleGrid
            mt={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            justifyContent={'space-between'}
          >
            {feedstocks
              .filter((feedstock) => feedstock.spec.includes('staged-recipes'))
              .sort((a, b) => a.spec.localeCompare(b.spec))
              .map((feedstock) => (
                <FeedstockCard
                  spec={feedstock.spec}
                  id={feedstock.id}
                  key={feedstock.id}
                ></FeedstockCard>
              ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstocks
