import { Link } from '@/components/'
import { Layout } from '@/components/layout'
import { useFeedstock, useFeedstocks, useMeta } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Skeleton,
} from '@chakra-ui/react'
import { GoDatabase } from 'react-icons/go'

const FeedstockRowAccordionItem = ({ feedstockId, feedstockSpec }) => {
  const { meta, metaError } = useMeta(feedstockSpec)
  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } =
    useFeedstock(feedstockId)

  if (metaError || fsError) {
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!meta || !recipe_runs || !spec)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  const { isProduction, datasets } = getProductionRunInfo(
    feedstockId,
    recipe_runs
  )

  return (
    <AccordionItem>
      <>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {meta.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </>
      <AccordionPanel>
        <List spacing={3} my={4}>
          {isProduction &&
            datasets.map((dataset) => (
              <ListItem key={dataset}>
                <ListIcon as={GoDatabase} color='green.500'></ListIcon>
                {dataset}
              </ListItem>
            ))}
        </List>

        <Button
          as={Link}
          my={4}
          href={`/dashboard/feedstock/${feedstockId}`}
          colorScheme='teal'
          variant='outline'
        >
          More Details
        </Button>
      </AccordionPanel>
    </AccordionItem>
  )
}

const Catalog = () => {
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
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Heading as={'h1'} size='2xl'>
            Catalog
          </Heading>

          <Accordion my={8} allowMultiple>
            {feedstocks
              .filter((feedstock) => !feedstock.spec.includes('staged-recipes'))
              .sort((a, b) => a.spec.localeCompare(b.spec))
              .map((feedstock) => (
                <FeedstockRowAccordionItem
                  key={feedstock.id}
                  feedstockId={feedstock.id}
                  feedstockSpec={feedstock.spec}
                ></FeedstockRowAccordionItem>
              ))}
          </Accordion>
        </Container>
      </Box>
    </Layout>
  )
}

export default Catalog
