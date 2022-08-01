import { Link } from '@/components'
import {
  FeedstockInfo,
  FlowRunsAccordion,
  StatusBadge,
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
  Badge,
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import { useRouter } from 'next/router'

const RecipeRun = () => {
  const router = useRouter()
  const { id, feedstock_id } = router.query
  const { recipeRun, recipeRunError } = useRecipeRun(id)

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } =
    useFeedstock(feedstock_id)

  const { meta, metaError } = useMeta(spec)

  let active = false

  if (recipeRun) {
    active = recipeRun.status != 'completed'
  }

  const { prefect, prefectError } = usePrefect(id, active)

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
  if (!recipeRun || !meta || !prefect || !spec) {
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )
  }

  const name = getName(spec)

  let details = {}

  const feedstockUrl = `/dashboard/feedstock/${recipeRun.feedstock_id}`
  const bakeryUrl = `/dashboard/bakery/${recipeRun.bakery_id}`
  const gitHubUrl = `https://github.com/${recipeRun.feedstock.spec}/tree/${recipeRun.head_sha}`

  if (recipeRun) {
    details = {
      Status: (
        <StatusBadge
          status={recipeRun.status}
          conclusion={recipeRun.conclusion}
        />
      ),
      ID: recipeRun.id,
      Name: recipeRun.recipe_id,
      'Started at': recipeRun.started_at,
      'Finished at': recipeRun.completed_at ? recipeRun.completed_at : '-',
      Duration: recipeRun.completed_at
        ? formatDistance(
            new Date(recipeRun.completed_at),
            new Date(recipeRun.started_at)
          )
        : '-',

      'Feedstock Dashboard': (
        <Badge
          as={Link}
          href={feedstockUrl}
          variant='outline'
          colorScheme='teal'
          fontWeight='bold'
        >
          {getName(recipeRun.feedstock.spec)}
        </Badge>
      ),
      'Bakery Dashboard': (
        <Badge
          as={Link}
          href={bakeryUrl}
          variant='outline'
          colorScheme='teal'
          fontWeight='bold'
        >
          {recipeRun.bakery.name}
        </Badge>
      ),
      Version: (
        <Badge variant='outline' colorScheme='gray' fontWeight='bold'>
          {recipeRun.version}
        </Badge>
      ),
      'Git SHA': (
        <Badge
          as={Link}
          href={gitHubUrl}
          variant='outline'
          colorScheme='gray'
          fontWeight='bold'
          useExternalIcon
        >
          {recipeRun.head_sha.slice(0, 7)}
        </Badge>
      ),
    }
  }

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <FeedstockInfo
            repo={spec}
            name={name}
            title={meta.title}
            description={meta.description}
            pangeo_forge_version={meta.pangeo_forge_version}
            pangeo_notebook_version={meta.pangeo_notebook_version}
            bakery={meta.bakery ? meta.bakery.id : null}
            license={meta.provenance ? meta.provenance.license : null}
            providers={meta.provenance ? meta.provenance.providers : null}
            maintainers={meta.maintainers ? meta.maintainers : null}
          />
          <Divider my={8} />

          <Heading as={'h3'} size='md'>
            Recipe Run Details
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 2, sm: 6 }}
            my={8}
          >
            {Object.keys(details).map((key, index) => (
              <HStack key={index} align={'top'} my={2}>
                {' '}
                <VStack align={'start'}>
                  <Text color={'gray.600'}>{key}</Text>
                  <Text fontWeight={600} maxW={'90vw'}>
                    {details[key]}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>

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
