import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useRecipeRuns } from '@/lib/endpoints'
import {
  Box,
  Container,
  Skeleton,
  SimpleGrid,
  Heading,
  VStack,
} from '@chakra-ui/react'

const RecipeRuns = () => {
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
        <Container maxW='container.xl' py={90} centerContent>
          <VStack p={8}>
            <Heading as={'h1'} mb={2}>
              Recipe Runs
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={2}>
            {recipeRuns
              .sort((a, b) => a.recipe_id.localeCompare(b.recipe_id))
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
        </Container>
      </Box>
    </Layout>
  )
}

export default RecipeRuns
