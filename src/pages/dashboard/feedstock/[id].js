import {
  FeedstockDatasets,
  FeedstockInfo,
  RecipeRuns,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useMeta } from '@/lib/endpoints'
import { getName } from '@/lib/feedstock-utils'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
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
import { GoDatabase } from 'react-icons/go'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    fs: { spec = '', recipe_runs = [] } = {},
    fsError,
    isLoading: feedstockIsLoading,
  } = useFeedstock(id)
  const { meta, metaError, isLoading: metaIsLoading } = useMeta(spec)

  if (fsError || metaError)
    return (
      <Layout>
        <Box as='section'>
          <Container maxW='container.xl' py={90}>
            Failed to load...
          </Container>
        </Box>
      </Layout>
    )

  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
          <Skeleton isLoaded={!metaIsLoading}>
            <FeedstockInfo
              repo={spec ? spec : ''}
              name={spec ? getName(spec) : ''}
              title={meta?.title}
              description={meta?.description}
              pangeo_forge_version={meta?.pangeo_forge_version}
              pangeo_notebook_version={meta?.pangeo_notebook_version}
              bakery={meta?.bakery?.id}
              license={meta?.provenance?.license}
              providers={meta?.provenance?.providers}
              maintainers={meta?.maintainers}
            />
          </Skeleton>

          <Tabs isLazy isFitted colorScheme='teal' my={16}>
            <TabList>
              <Tab>Recipe Runs</Tab>
              <Tab>
                <GoDatabase />
                <Text ml={2}>{`${datasets?.length} Dataset${
                  datasets?.length > 1 ? 's' : ''
                }`}</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {' '}
                <Skeleton isLoaded={!feedstockIsLoading}>
                  <RecipeRuns runs={recipe_runs} />
                </Skeleton>
              </TabPanel>
              <TabPanel>
                <Skeleton isLoaded={!feedstockIsLoading}>
                  <FeedstockDatasets
                    isProduction={isProduction}
                    datasets={datasets}
                  />
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
