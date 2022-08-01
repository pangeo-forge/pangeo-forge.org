import { Link } from '@/components'
import { FlowRunsAccordion, StatusBadge } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { usePrefect, useRecipeRun } from '@/lib/endpoints'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError, isLoading } = useRecipeRun(id)

  let active = false

  if (recipeRun) {
    active = recipeRun.status != 'completed'
  }

  const { prefect, prefectError } = usePrefect(id, active)

  if (recipeRunError) {
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
  if (isLoading)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  let details = {}

  const feedstockUrl = `/dashboard/feedstock/${recipeRun.feedstock_id}`
  const bakeryUrl = `/dashboard/bakery/${recipeRun.bakery_id}`
  const gitHubUrl = `https://github.com/${recipeRun.feedstock.spec}/tree/${recipeRun.head_sha}`

  if (recipeRun) {
    details = {
      Name: recipeRun.recipe_id,
      'Started at': recipeRun.started_at,
      Status: (
        <StatusBadge
          status={recipeRun.status}
          conclusion={recipeRun.conclusion}
        />
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

  const urls = {
    Bakery: bakeryUrl,
    Feedstock: feedstockUrl,
  }

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Stack
            direction={{
              base: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
            spacing={{ base: 4, sm: 12 }}
            justify={'space-between'}
            align={'left'}
          >
            <Heading as={'h3'} size='lg'>
              Recipe Run: {recipeRun.id}
            </Heading>
            <Stack
              spacing={4}
              direction={{
                base: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
            >
              {Object.entries(urls).map(([name, url]) => (
                <Button
                  key={name}
                  as={Link}
                  href={url}
                  p={2}
                  colorScheme='teal'
                  variant='outline'
                >
                  {name}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Box py={4}>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={1}>
              {Object.keys(details).map((key, index) => (
                <HStack key={index} align={'top'} py={2}>
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
          </Box>
          <Box>
            <Heading as={'h3'} mb={4}>
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
