import { Link } from '@/components'
import { Layout } from '@/components/layout'
import { useFeedstock, useMeta } from '@/lib/endpoints'
import {
  Box,
  Container,
  Flex,
  Stack,
  Heading,
  SimpleGrid,
  HStack,
  VStack,
  IconButton,
  Skeleton,
  Text,
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

  if (!spec || !meta)
    return (
      <Layout>
        <Box as='section'>
          <Skeleton>
            {' '}
            <Container maxW='container.xl' py={90} centerContent></Container>
          </Skeleton>
        </Box>
      </Layout>
    )
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
                  aria-label='GitHub Repository'
                  icon={<GoRepo fontSize='1.85rem' />}
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
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={1}>
              {Object.keys(details).map((key, index) => (
                <HStack key={index} align={'top'} py={2}>
                  {' '}
                  <VStack align={'start'}>
                    <Text color={'gray.600'}>{key}</Text>
                    <Text fontWeight={600}>{details[key]}</Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </Box>

          <Heading as={'h2'}>Recipe Runs</Heading>
          <Box>
            Test
            {/* {recipe_runs.reverse().map((b, i) => (
          <RecipeRunCard key={i} props={b} />
        ))} */}
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Feedstock
