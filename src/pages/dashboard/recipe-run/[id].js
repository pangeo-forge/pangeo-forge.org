import {
  FeedstockInfo,
  FlowRunsAccordion,
  RecipeRunDetails,
} from '@/components/dashboard'
import { Layout } from '@/components/layout'
import {
  useFeedstock,
  useMeta,
  usePrefect,
  useRecipeRun,
} from '@/lib/endpoints'
import { getName } from '@/lib/feedstock-utils'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Divider,
  Heading,
  Skeleton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const RecipeRun = () => {
  const router = useRouter()
  const { id, feedstock_id } = router.query
  const {
    recipeRun,
    recipeRunError,
    isLoading: recipeIsLoading,
  } = useRecipeRun(id)

  const {
    fs: { spec = '', recipe_runs = [] } = {},
    fsError,
    isLoading: feedstockIsLoading,
  } = useFeedstock(feedstock_id)

  const { meta, metaError, isLoading: metaIsLoading } = useMeta(spec)

  let active = false

  if (recipeRun) {
    active = recipeRun.status != 'completed'
  }

  const {
    prefect,
    prefectError,
    isLoading: prefectIsLoading,
  } = usePrefect(id, active)

  if (recipeRunError || metaError || prefectError || fsError) {
    return (
      <Layout>
        <Box as='section'>
          <Container maxW='container.xl' py={90}>
            Failed to load...
          </Container>
        </Box>
      </Layout>
    )
  }

  if (metaIsLoading || feedstockIsLoading || prefectIsLoading) {
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <FeedstockInfo
            repo={spec}
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
          <Divider my={8} />

          <Heading as={'h3'} size='md'>
            Recipe Run Details
          </Heading>

          <RecipeRunDetails
            id={recipeRun.id}
            name={spec ? getName(spec) : ''}
            started_at={recipeRun?.started_at}
            completed_at={recipeRun?.completed_at}
            spec={spec}
            feedstock_id={feedstock_id}
            bakery_id={recipeRun?.bakery_id}
            bakery_name={recipeRun?.bakery.name}
            version={recipeRun?.version}
            head_sha={recipeRun?.head_sha}
            status={recipeRun?.status}
            conclusion={recipeRun?.conclusion}
          />

          <Divider my={8} />
          <Box my={8}>
            <Heading as={'h3'} my={4} size='md'>
              Logs
            </Heading>
            {prefectError && (
              <Box>
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>
                    Unable to load prefect logs.
                  </AlertDescription>
                </Alert>
              </Box>
            )}
            <Box>
              {prefect && prefect.data && (
                <FlowRunsAccordion runs={prefect.data.flow_run} />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default RecipeRun
