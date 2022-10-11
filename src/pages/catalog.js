import { Error, Link } from '@/components/'
import { License } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import {
  useFeedstockDatasets,
  useFeedstocks,
  useMeta,
  useRepo,
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
  SimpleGrid,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

const Feedstock = ({ id, spec }) => {
  const {
    datasets,
    datasetsError,
    isLoading: datasetsAreLoading,
  } = useFeedstockDatasets(id)

  const {
    repo,
    repoError,
    isLoading: repoIsLoading,
  } = useRepo(`https://api.github.com/repos/${spec}/commits/HEAD`)

  const { meta, metaError, isLoading: metaIsLoading } = useMeta(spec)

  if (metaError || repoError || datasetsError) {
    return (
      <Layout>
        <Error
          status={
            metaError?.status || repoError?.status || datasetsError?.status
          }
          info={metaError?.info || repoError?.info || datasetsError?.info}
          message={
            metaError?.message || repoError?.message || datasetsError?.message
          }
        />
      </Layout>
    )
  }

  const image =
    meta?.image ||
    'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=752&q=80'

  const colors = [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
  ]
  const color = colors[id % colors.length]

  return (
    <>
      {' '}
      {datasets?.length > 0 ? (
        <Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}></Flex>
          <Box
            bgImage={`url(${image})`}
            position={'relative'}
            h={'200px'}
            filter={'grayscale(100%)'}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
          ></Box>
          <Box>
            <Accordion
              allowMultiple
              bg={`${color}.400`}
              opacity={0.8}
              mixBlendMode={'dodge'}
            >
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Skeleton isLoaded={!metaIsLoading}>
                          <Text fontWeight={600} opacity={1}>
                            {meta?.title}
                          </Text>
                        </Skeleton>
                      </Box>

                      {isExpanded ? (
                        <MinusIcon fontSize='xl' />
                      ) : (
                        <AddIcon fontSize='xl' />
                      )}
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      <Skeleton isLoaded={!metaIsLoading}>
                        <Text>{meta?.description}</Text>
                      </Skeleton>

                      <TableContainer mt={4}>
                        <Table variant='simple' size='sm'>
                          <Thead>
                            <Tr>
                              <Th />
                              <Th />
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>License: </Td>
                              <Td>
                                <Skeleton isLoaded={!metaIsLoading}>
                                  <License
                                    name={meta?.provenance?.license}
                                    link={meta?.provenance?.license_link}
                                  />
                                </Skeleton>
                              </Td>
                            </Tr>

                            <Tr>
                              <Td>Last Updated: </Td>
                              <Td>
                                <Skeleton isLoaded={!repoIsLoading}>
                                  {repo?.commit.committer.date}{' '}
                                </Skeleton>
                              </Td>
                            </Tr>

                            <Tr>
                              <Td>Dataset Count:</Td>
                              <Td>
                                <Skeleton isLoaded={!datasetsAreLoading}>
                                  {datasets?.length}{' '}
                                </Skeleton>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>

            <Button
              as={Link}
              my={2}
              href={`/dashboard/feedstock/${id}`}
              colorScheme='teal'
              variant='outline'
              size='sm'
            >
              Browse Datasets
            </Button>
          </Box>
        </Box>
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
                .sort((a, b) =>
                  a.spec
                    .toLowerCase()
                    .replace('pangeo-forge/', '')
                    .replace('-feedstock', '')
                    .localeCompare(b.spec),
                )
                .map((feedstock) => (
                  <Feedstock
                    key={feedstock.id}
                    id={feedstock.id}
                    spec={feedstock.spec}
                  ></Feedstock>
                ))}
            </SimpleGrid>
          </Skeleton>
        </Container>
      </Box>
    </Layout>
  )
}

export default Catalog
