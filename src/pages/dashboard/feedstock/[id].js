import { Link } from '@/components'
import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useMeta } from '@/lib/endpoints'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoRepo, GoTag } from 'react-icons/go'

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
            <Text ml={2}>{spec.replace('pangeo-forge/', '')}</Text>
          </Button>

          {spec == 'pangeo-forge/staged-recipes' && (
            <Text>
              A place to submit pangeo-forge recipes before they become fully
              fledged pangeo-forge feedstocks.
            </Text>
          )}

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

          <Heading py={4} as={'h3'}>
            Recipe Runs
          </Heading>

          <Box mt={4}>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={2}>
              {/* TODO: Add filter options */}
              {recipe_runs
                .sort((a, b) => a.started_at.localeCompare(b.started_at))
                .reverse()
                .map((recipe) => (
                  <RecipeRunCard
                    key={recipe.id}
                    recipe_id={recipe.recipe_id}
                    id={recipe.id}
                    started_at={recipe.started_at}
                    status={recipe.status}
                    version={recipe.version}
                    message={recipe.message}
                  />
                ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstock
