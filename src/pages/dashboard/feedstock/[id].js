import { Error } from '@/components'
import {
  FeedstockDatasets,
  FeedstockInfo,
  RecipeRuns,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useFeedstockDatasets, useMeta } from '@/lib/endpoints'
import { getName } from '@/lib/feedstock-utils'
import { jsonFetcher, yamlFetcher } from '@/lib/fetchers'
import {
  Box,
  Container,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { GoDatabase, GoTerminal } from 'react-icons/go'

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const specs = await jsonFetcher(`https://api.pangeo-forge.org/feedstocks`)
  const spec = specs.find((entry) => entry.id === parseInt(id)).spec
  const url = `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`
  const meta = await yamlFetcher(url)
  return {
    props: {
      id: id,
      title: meta.title,
      description: meta.description,
    },
  }
}

const Feedstock = ({ id, title, description }) => {
  let url = 'https://pangeo-forge.org'
  if (
    process.env.NEXT_PUBLIC_VERCEL_URL &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
  ) {
    url = process.env.NEXT_PUBLIC_VERCEL_URL
  }

  const {
    datasets,
    datasetsError,
    isLoading: datasetsAreLoading,
  } = useFeedstockDatasets(id)
  const {
    fs: { spec = '', recipe_runs = [] } = {},
    fsError,
    isLoading: feedstockIsLoading,
  } = useFeedstock(id)

  const { meta, metaError, isLoading: metaIsLoading } = useMeta(spec)

  if (fsError || metaError || datasetsError)
    return (
      <Layout
        title={title}
        description={description}
        image={`/api/og/feedstock?id=${id}`}
        url={`${url}/feedstock/${id}`}
      >
        <Box as='section'>
          <Container maxW='container.xl' py={90}>
            <Error
              status={
                fsError?.status || metaError?.status || datasetsError?.status
              }
              info={fsError?.info || metaError?.info || datasetsError?.info}
              message={
                fsError?.message || metaError?.message || datasetsError?.message
              }
            />
          </Container>
        </Box>
      </Layout>
    )

  const selectedColor = { color: 'white', bg: 'teal.500' }

  return (
    <Layout
      title={title}
      description={description}
      image={`/api/og/feedstock?id=${id}`}
      url={`${url}/feedstock/${id}`}
    >
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
          <Skeleton isLoaded={!metaIsLoading}>
            <FeedstockInfo
              id={id}
              repo={spec ? spec : ''}
              name={spec ? getName(spec) : ''}
              title={meta?.title}
              description={meta?.description}
              pangeo_forge_version={meta?.pangeo_forge_version}
              pangeo_notebook_version={meta?.pangeo_notebook_version}
              bakery={meta?.bakery?.id}
              license={meta?.provenance?.license}
              license_link={meta?.provenance?.license_link}
              providers={meta?.provenance?.providers}
              maintainers={meta?.maintainers}
            />
          </Skeleton>

          {JSON.stringify(id)}

          <Tabs isLazy isFitted colorScheme='teal' variant={'enclosed'} my={16}>
            <TabList>
              <Tab _selected={selectedColor}>
                <GoDatabase />
                <Skeleton isLoaded={!datasetsAreLoading}>
                  <Text ml={2}>{`${datasets?.length} Dataset${
                    datasets?.length > 1 ? 's' : ''
                  }`}</Text>
                </Skeleton>
              </Tab>
              <Tab _selected={selectedColor}>
                <GoTerminal />
                <Skeleton isLoaded={!feedstockIsLoading}>
                  <Text ml={2}>{`${recipe_runs?.length} Recipe Run${
                    recipe_runs?.length > 1 ? 's' : ''
                  }`}</Text>
                </Skeleton>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Skeleton isLoaded={!datasetsAreLoading}>
                  <FeedstockDatasets datasets={datasets} />
                </Skeleton>
              </TabPanel>
              <TabPanel>
                {' '}
                <Skeleton isLoaded={!feedstockIsLoading}>
                  <RecipeRuns runs={recipe_runs} />
                </Skeleton>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstock
