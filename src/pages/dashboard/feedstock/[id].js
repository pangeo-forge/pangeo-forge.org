import { Error } from '@/components'
import {
  FeedstockDatasets,
  FeedstockInfo,
  RecipeRuns,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useFeedstockDatasets, useMeta } from '@/lib/endpoints'
import { getName } from '@/lib/feedstock-utils'
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
import { useRouter } from 'next/router'
import { GoDatabase, GoTerminal } from 'react-icons/go'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

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
      <Layout>
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
    <Layout>
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
