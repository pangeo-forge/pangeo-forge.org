import { Layout } from '@/components/layout'
import { useRecipeRuns } from '@/lib/endpoints'
import { Box, Container, Heading, Skeleton, Text } from '@chakra-ui/react'

const Catalog = () => {
  const { recipeRuns, recipeRunsError } = useRecipeRuns()

  if (recipeRunsError) {
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRuns)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' py={90}>
          <Heading as={'h1'}>Catalog</Heading>
          <Box>
            {recipeRuns
              .filter((r) => r.dataset_public_url)
              .map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    fontFamily: 'subtitle',
                    fontWeight: 'subtitle',
                    py: [2],
                  }}
                >
                  {d.dataset_public_url}
                </Box>
              ))}
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Catalog
