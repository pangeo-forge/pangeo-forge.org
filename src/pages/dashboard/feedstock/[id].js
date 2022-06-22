import { Link } from '@/components'
import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock, useMeta } from '@/lib/endpoints'
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoRepo } from 'react-icons/go'

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
      'Pangeo-Forge Version': meta.pangeo_forge_version,
      'Pangeo Notebook Version': meta.pangeo_notebook_version,
      Bakery: meta.bakery ? meta.bakery.id : null,
    }
  }

  if (fsError || metaError)
    return (
      <Layout>
        <Box as='section'>
          <Container maxW='container.xl' py={90} centerContent>
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
        <Container maxW='container.xl' py={90}>
          <Flex direction='column'>
            <Stack as={Link} href={repoUrl} direction={'row'} align={'center'}>
              <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                //bg={iconBg}
              >
                <IconButton
                  fontSize={'3xl'}
                  aria-label='GitHub Repository'
                  icon={<GoRepo />}
                  variant='ghost'
                />
              </Flex>

              <Heading as={'h2'} textTransform={'uppercase'}>
                {spec.replace('pangeo-forge/', '')}
              </Heading>
            </Stack>
          </Flex>

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

          <Heading as={'h2'}>Recipe Runs</Heading>
          <Box mt={4}>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={2}>
              {/* TODO: Add filter options */}
              {recipe_runs
                .sort((a, b) => a.started_at.localeCompare(b.started_at))
                .reverse()
                .map((recipe, index) => (
                  <RecipeRunCard
                    key={index}
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
