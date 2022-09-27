import { Error, Link } from '@/components'
import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useBakery } from '@/lib/endpoints'
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoRepo } from 'react-icons/go'

const Bakery = () => {
  const router = useRouter()
  const { id } = router.query

  const { bakery, bakeryError, isLoading } = useBakery(id)

  const repoUrl = 'https://github.com/pangeo-forge/pangeo-forge-gcs-bakery'

  if (bakeryError)
    return (
      <Layout>
        <Error
          status={bakeryError.status}
          info={bakeryError?.info}
          message={bakeryError?.message}
        />
      </Layout>
    )

  if (isLoading)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Flex direction='column' mb={8}>
            <Stack
              as={Link}
              href={repoUrl}
              direction={'row'}
              align={'center'}
              mb={8}
            >
              <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
              >
                <IconButton
                  fontSize={'3xl'}
                  aria-label='GitHub Repository'
                  icon={<GoRepo />}
                  variant='ghost'
                />
              </Flex>

              <Heading as={'h3'} size='lg' textTransform={'uppercase'}>
                {bakery.name}
              </Heading>
            </Stack>
            <Text>{bakery.description}</Text>
          </Flex>

          <Box py={4}>
            <Heading as={'h3'} size='lg' mb={8}>
              Recipe Runs
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
              {bakery.recipe_runs
                .sort((a, b) => a.started_at.localeCompare(b.started_at))
                .reverse()
                .map((recipe, index) => (
                  <RecipeRunCard
                    key={index}
                    feedstock_id={recipe.feedstock_id}
                    id={recipe.id}
                    started_at={recipe.started_at}
                    status={recipe.status}
                    version={recipe.version}
                    message={recipe.message}
                    conclusion={recipe.conclusion}
                  />
                ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Bakery
