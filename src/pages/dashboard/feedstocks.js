import { FeedstockCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstocks } from '@/lib/endpoints'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

const Feedstocks = () => {
  const { feedstocks, feedstocksError } = useFeedstocks()

  if (feedstocksError) {
    return (
      <Layout container={true} menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!feedstocks) return <Layout container={true} menu={true} />

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.lg' py={90}>
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
        </Container>
        {/* <Grid gap={3} columns={[1, 2, 3]}>
          {feedstocks
            .filter((d) => !d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid>
        <Heading as={"h2"}>Staged Recipes</Heading>
        <Grid gap={3} columns={[1, 2, 3]}>
          {feedstocks
            .filter((d) => d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid> */}
      </Box>
    </Layout>
  )
}

export default Feedstocks
