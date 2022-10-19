import { Error } from '@/components'
import {
  FeedstockDatasets,
  FeedstockInfo,
  RecipeRuns,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useFeedstockDatasets } from '@/lib/endpoints'
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

export async function getServerSideProps({ res, params }) {
  // Enable caching
  // docs: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr

  // This value is considered fresh for 3600 seconds (maxage=3600).
  // If a request is repeated within the next 3600 seconds, the previously
  // cached value will still be fresh. If the request is repeated after, it will request the
  // data again from the server.

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3700',
  )

  const id = params.id
  const endpoint =
    params?.orchestratorEndpoint || 'https://api.pangeo-forge.org'
  const specs = await jsonFetcher(`${endpoint}/feedstocks`)
  const spec = specs.find((entry) => entry.id === parseInt(id)).spec

  if (id === '1') {
    return {
      props: {
        id: id,
        repo: spec,
        endpoint: endpoint,
        meta: {
          title: 'Staged Recipes',
          description:
            'A place to submit pangeo-forge recipes before they become fully fledged pangeo-forge feedstocks.',
        },
      },
    }
  }

  const url = `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`
  const meta = await yamlFetcher(url)
  return {
    props: {
      id: id,
      repo: spec,
      endpoint: endpoint,
      meta: meta,
    },
  }
}

const Feedstock = ({ id, repo, endpoint, meta }) => {
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

  const params = {
    id: id,
    endpoint: endpoint,
    title: meta?.title,
    repo: repo,
  }

  const paramsString = new URLSearchParams(params).toString()

  if (fsError || datasetsError)
    return (
      <Layout
        name={meta?.title}
        title={meta?.title}
        description={meta?.description}
        image={`https://${url}/api/og/feedstock?${paramsString}`}
        url={`https://${url}/feedstock/${id}`}
      >
        <Box as='section'>
          <Container maxW='container.xl' py={90}>
            <Error
              status={fsError?.status || datasetsError?.status}
              info={fsError?.info || datasetsError?.info}
              message={fsError?.message || datasetsError?.message}
            />
          </Container>
        </Box>
      </Layout>
    )

  const selectedColor = { color: 'white', bg: 'teal.500' }

  return (
    <Layout
      name={meta?.title}
      title={meta?.title}
      description={meta?.description}
      image={`https://${url}/api/og/feedstock?${paramsString}`}
      url={`https://${url}/feedstock/${id}`}
    >
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
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
