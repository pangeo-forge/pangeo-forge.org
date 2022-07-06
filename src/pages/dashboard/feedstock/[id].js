import { Link } from '@/components'
import {
  FeedstockDatasets,
  FeedstockInfo,
  Providers,
  RecipeRuns,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useMeta } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoDatabase, GoRepo, GoTag } from 'react-icons/go'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(spec)

  const repoUrl = `https://github.com/${spec}`

  let details = {}

  if (meta && !meta['404']) {
    // these can be expanded once the meta.yaml file spec is stable
    details = {
      Title: meta.title,
      Description: meta.description,
      'Pangeo-Forge Version': (
        <Flex>
          <Icon as={GoTag} fontSize={'2xl'} />
          <Text px={2}>{meta.pangeo_forge_version}</Text>
        </Flex>
      ),
      'Pangeo Notebook Version': (
        <Flex>
          <Icon as={GoTag} fontSize={'2xl'} />
          <Text px={2}>{meta.pangeo_notebook_version}</Text>
        </Flex>
      ),
      Bakery: meta.bakery ? meta.bakery.id : null,
      License: meta.provenance ? meta.provenance.license : null,
      Providers: <Providers providers={meta.provenance.providers} />,
      Maintainers: meta.maintainers ? meta.maintainers[0].name : null,
    }
  }

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

  const name = spec.replace('pangeo-forge/', '')

  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
          <Button
            as={Link}
            href={repoUrl}
            fontSize={'2xl'}
            colorScheme='teal'
            variant='outline'
          >
            {' '}
            <GoRepo />
            <Text ml={2}>{name}</Text>
          </Button>

          {spec == 'pangeo-forge/staged-recipes' && (
            <Text my={4}>
              A place to submit pangeo-forge recipes before they become fully
              fledged pangeo-forge feedstocks.
            </Text>
          )}

          <FeedstockInfo details={details} />

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
