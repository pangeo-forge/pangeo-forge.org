import { Link } from '@/components'
import { Layout } from '@/components/layout'
import { usePrefect, useRecipeRun } from '@/lib/endpoints'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
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

  const { recipeRun, recipeRunError } = useRecipeRun(id)

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
  if (!recipeRun)
    return (
      <Layout>
        <Skeleton minH={'100vh'}>
          <Box as='section'>
            <Container maxW='container.xl' py={90}></Container>
          </Box>
        </Skeleton>
      </Layout>
    )

  let details = {}

  const feedstockUrl = `/dashboard/feedstock/${recipeRun.feedstock_id}`
  const bakeryUrl = `/dashboard/bakery/${recipeRun.bakery_id}`
  const gitHubUrl = `https://github.com/${recipeRun.feedstock.spec}/tree/${recipeRun.head_sha}`

  const urls = {
    Bakery: bakeryUrl,
    Feedstock: feedstockUrl,
    'Git Commit': gitHubUrl,
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
            <Heading as={'h2'}>Recipe Run: {recipeRun.id}</Heading>
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
                <Button key={name} as={Link} href={url} p={2}>
                  {name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default RecipeRun
