import { Error } from '@/components'
import { FeedstockCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstocks } from '@/lib/endpoints'
import { getRootURL } from '@/lib/seo-utils'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const Feedstocks = () => {
  const { feedstocks, feedstocksError, isLoading } = useFeedstocks()

  if (feedstocksError) {
    return (
      <Layout menu={true}>
        <Error
          status={feedstocksError?.status}
          info={feedstocksError?.info}
          message={feedstocksError?.message}
        />
      </Layout>
    )
  }

  return (
    <Layout
      title={'Pangeo-Forge Feedstocks'}
      description={
        'Feedstocks are recipes that are managed and executed by Pangeo Forge cloud automation.'
      }
      url={`${getRootURL()}/dashboard/feedstocks`}
      menu={true}
    >
      <Box as='section'>
        <Container maxW='container.xl' centerContent>
          <Heading as={'h1'} size='2xl' mb={4}>
            Feedstocks
          </Heading>
          <Text>
            Feedstocks are recipes that are managed and executed by Pangeo Forge
            cloud automation.
          </Text>

          <SimpleGrid
            my={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            justifyContent={'space-between'}
          >
            {feedstocks
              ?.filter(
                (feedstock) => !feedstock.spec.includes('staged-recipes'),
              )
              .sort((a, b) => a.spec.localeCompare(b.spec))
              .map((feedstock) => (
                <FeedstockCard
                  spec={feedstock.spec}
                  id={feedstock.id}
                  key={feedstock.id}
                ></FeedstockCard>
              ))}
          </SimpleGrid>

          <Heading as={'h3'} size='lg' my={8}>
            Staged Recipes
          </Heading>

          <SimpleGrid
            my={8}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            justifyContent={'space-between'}
          >
            {feedstocks
              ?.filter((feedstock) => feedstock.spec.includes('staged-recipes'))
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
