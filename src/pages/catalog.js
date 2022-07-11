import { Link } from '@/components/'
import { Layout } from '@/components/layout'
import { useFeedstock, useFeedstocks, useMeta } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
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
  Text,
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
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {meta.title}
            </Box>
            {isExpanded ? (
              <MinusIcon fontSize='xl' />
            ) : (
              <AddIcon fontSize='xl' />
            )}
          </AccordionButton>

          <AccordionPanel>
            <Text opacity={0.8}>{meta.description}</Text>

            <List spacing={3} my={4}>
              {isProduction &&
                datasets.map((dataset) => (
                  <ListItem key={dataset}>
                    <ListIcon as={GoDatabase} color='green.500'></ListIcon>

                    {dataset ? dataset.split('/').pop() : ''}
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
        </>
      )}
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
          <Heading as={'h2'} size='lg'>
            Catalog
          </Heading>

          <Accordion my={8} allowMultiple>
            {feedstocks
              .filter((feedstock) => !feedstock.spec.includes('staged-recipes'))
              .sort((a, b) =>
                a.spec
                  .toLowerCase()
                  .replace('pangeo-forge/', '')
                  .replace('-feedstock', '')
                  .localeCompare(b.spec)
              )
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
