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
  useColorModeValue,
} from '@chakra-ui/react'

const Feedstock = ({ id, spec, arrayIndex }) => {
  const bgWeight = useColorModeValue(100, 500)
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

  const placeholderImages = [
    'https://images.unsplash.com/photo-1563974318767-a4de855d7b43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=752&q=80',
    'https://images.unsplash.com/photo-1584267759777-8a74a4f72a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fG1ldGVvcm9sb2d5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1513553404607-988bf2703777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80',
    'https://images.unsplash.com/photo-1583325958573-3c89e40551ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    'https://images.unsplash.com/photo-1580193813605-a5c78b4ee01a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
  ]

  const image =
    meta?.image || placeholderImages[arrayIndex % placeholderImages.length]

  const colors = [
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
  const color = colors[arrayIndex % colors.length]

  return (
    <>
      {' '}
      {datasets?.length > 0 ? (
        <Box>
          <Box position={'relative'} h={'200px'} w={'100%'}>
            <Box
              bgImage={`url(${image})`}
              position={'absolute'}
              h={'200px'}
              w={'100%'}
              filter={'grayscale(100%)'}
              backgroundSize={'cover'}
            />

            <Box
              bg={`${color}.400`}
              h={'200px'}
              w={'100%'}
              position={'absolute'}
              opacity={0.8}
              mixBlendMode={'dodge'}
            />
          </Box>

          <Box>
            <Accordion allowMultiple bg={`${color}.${bgWeight}`}>
              <AccordionItem borderWidth={0}>
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
                        <Table variant='simple' size='sm' colorScheme={color}>
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
              colorScheme={color}
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
                .map((feedstock, index) => (
                  <Feedstock
                    key={feedstock.id}
                    id={feedstock.id}
                    spec={feedstock.spec}
                    arrayIndex={index}
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
