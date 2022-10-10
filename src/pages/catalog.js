import { Error, Link } from '@/components/'
import { CopyButton } from '@/components/copy-button'
import { Layout } from '@/components/layout'
import { getDatasetName } from '@/lib/dataset-utils'
import {
  useFeedstock,
  useFeedstockDatasets,
  useFeedstocks,
  useMeta,
} from '@/lib/endpoints'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { GoDatabase } from 'react-icons/go'

const DatasetListItem = ({ dataset }) => {
  return (
    <ListItem key={dataset}>
      <Flex align='center'>
        <ListIcon as={GoDatabase} color='teal.500' />

        {dataset ? getDatasetName(dataset) : ''}
        <CopyButton
          text={dataset}
          position='relative'
          ml={8}
          colorScheme='teal'
        />
      </Flex>
    </ListItem>
  )
}

const FeedstockRowAccordionItem = ({ feedstockId, feedstockSpec }) => {
  const {
    datasets,
    datasetsError,
    isLoading: datasetsAreLoading,
  } = useFeedstockDatasets(feedstockId)
  const { meta, metaError, isLoading: metaIsLoading } = useMeta(feedstockSpec)
  const {
    fs: { spec = '', recipe_runs = [] } = {},
    fsError,
    isLoading: fsIsLoading,
  } = useFeedstock(feedstockId)

  if (metaError || fsError || datasetsError) {
    return (
      <Layout>
        <Error
          status={
            metaError?.status || fs.Error?.status || datasetsError?.status
          }
          info={metaError?.info || fs.Error?.info || datasetsError?.info}
          message={
            metaError?.message || fs.Error?.message || datasetsError?.message
          }
        />
      </Layout>
    )
  }

  return (
    <>
      {' '}
      {datasets?.length > 0 ? (
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Skeleton isLoaded={!metaIsLoading && !fsIsLoading}>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    {meta?.title}
                  </Box>

                  {isExpanded ? (
                    <MinusIcon fontSize='xl' />
                  ) : (
                    <AddIcon fontSize='xl' />
                  )}
                </AccordionButton>

                <AccordionPanel>
                  <Text opacity={0.8}>{meta?.description}</Text>

                  <Skeleton isLoaded={!datasetsAreLoading}>
                    <List spacing={3} my={4}>
                      {datasets?.map((dataset, index) => (
                        <DatasetListItem
                          key={index}
                          dataset={dataset?.dataset_public_url}
                        ></DatasetListItem>
                      ))}
                    </List>
                  </Skeleton>

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
              </Skeleton>
            </>
          )}
        </AccordionItem>
      ) : (
        <></>
      )}
    </>
  )
}

const Catalog = () => {
  const { feedstocks, feedstocksError, isLoading } = useFeedstocks()

  if (feedstocksError) {
    return (
      <Layout>
        <Error
          status={feedstocksError?.status}
          info={feedstocksError?.info}
          message={feedstocksError?.message}
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Heading as={'h2'} size='lg'>
            Catalog
          </Heading>

          <Skeleton isLoaded={!isLoading}>
            <Accordion my={8} allowMultiple>
              {feedstocks
                ?.filter(
                  (feedstock) => !feedstock.spec.includes('staged-recipes'),
                )
                .sort((a, b) =>
                  a.spec
                    .toLowerCase()
                    .replace('pangeo-forge/', '')
                    .replace('-feedstock', '')
                    .localeCompare(b.spec),
                )
                .map((feedstock) => (
                  <FeedstockRowAccordionItem
                    key={feedstock.id}
                    feedstockId={feedstock.id}
                    feedstockSpec={feedstock.spec}
                  ></FeedstockRowAccordionItem>
                ))}
            </Accordion>
          </Skeleton>
        </Container>
      </Box>
    </Layout>
  )
}

export default Catalog
