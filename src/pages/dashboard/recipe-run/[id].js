import { Error } from '@/components'
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
            <Error status={recipeRunError.status} info={recipeRunError?.info} />
          </Container>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Skeleton isLoaded={!feedstockIsLoading}>
            <FeedstockInfo
              id={feedstock_id}
              repo={spec}
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
          <Divider my={8} />

          <Heading as={'h3'} size='md'>
            Recipe Run Details
          </Heading>

          <Skeleton isLoaded={!recipeIsLoading}>
            <RecipeRunDetails
              id={recipeRun?.id}
              name={spec ? getName(spec) : ''}
              started_at={recipeRun?.started_at}
              completed_at={recipeRun?.completed_at}
              spec={spec ? spec : ''}
              version={recipeRun?.version}
              head_sha={recipeRun?.head_sha}
              status={recipeRun?.status}
              conclusion={recipeRun?.conclusion}
            />
          </Skeleton>

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
              <Skeleton isLoaded={!prefectIsLoading}>
                <FlowRunsAccordion runs={prefect?.data?.flow_run} />
              </Skeleton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default RecipeRun
