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

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(spec)

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

  if (!spec || !meta)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  const name = getName(spec)
  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
          <FeedstockInfo
            repo={spec}
            name={name}
            title={meta.title}
            description={meta.description}
            pangeo_forge_version={meta.pangeo_forge_version}
            pangeo_notebook_version={meta.pangeo_notebook_version}
            bakery={meta.bakery?.id}
            license={meta.provenance ? meta.provenance.license : null}
            providers={meta.provenance ? meta.provenance.providers : null}
            maintainers={meta.maintainers ? meta.maintainers : null}
          />

          <Tabs isLazy isFitted colorScheme='teal' my={16}>
            <TabList>
              <Tab>Recipe Runs</Tab>
              <Tab>
                <GoDatabase />
                <Text ml={2}>{`${datasets.length} Dataset${
                  datasets.length > 1 ? 's' : ''
                }`}</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {' '}
                <RecipeRuns runs={recipe_runs} />
              </TabPanel>
              <TabPanel>
                <FeedstockDatasets
                  isProduction={isProduction}
                  datasets={datasets}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstock
