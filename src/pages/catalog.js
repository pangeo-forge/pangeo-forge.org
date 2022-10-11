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
  TableCaption,
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

  return (
    <>
      {' '}
      {datasets?.length > 0 ? (
        <Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}></Flex>
          <Box
            pos='relative'
            h='200px'
            bgImage="linear-gradient(rgba(255, 0, 0, 0.127),rgba(255, 0, 0, 0.1)) , url('')"
          ></Box>
          <Box>
            <Accordion allowMultiple>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Skeleton isLoaded={!metaIsLoading}>
                          <Text>{meta?.title}</Text>
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
                        <Text opacity={0.8}>{meta?.description}</Text>
                      </Skeleton>

                      <TableContainer my={4}>
                        <Table variant='striped' size='sm'>
                          <TableCaption></TableCaption>
                          <Thead>
                            <Tr>
                              <Th></Th>
                              <Th></Th>
                              <Th></Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>License</Td>
                              <Td>:</Td>

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
                              <Td>Last Updated</Td>
                              <Td>:</Td>

                              <Td>
                                <Skeleton isLoaded={!repoIsLoading}>
                                  {repo?.commit.committer.date}{' '}
                                </Skeleton>
                              </Td>
                            </Tr>

                            <Tr>
                              <Td>Dataset Count</Td>
                              <Td>:</Td>

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
