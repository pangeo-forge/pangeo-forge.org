import { Error } from '@/components'
import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useRecipeRuns } from '@/lib/endpoints'
import { getRootURL } from '@/lib/seo-utils'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

const RecipeRuns = () => {
  const { recipeRuns, recipeRunsError, isLoading } = useRecipeRuns()

  if (recipeRunsError) {
    return (
      <Layout menu={true}>
        <Error
          status={recipeRunsError?.status}
          info={recipeRunsError?.info}
          message={recipeRunsError?.message}
        />
      </Layout>
    )
  }

  return (
    <Layout
      title={'Pangeo-Forge Recipe Runs'}
      description={
        'Recipe runs are the execution of a recipe. They are triggered by a GitHub workflow.'
      }
      url={`${getRootURL()}/dashboard/recipe-runs`}
      menu={true}
    >
      <Box as='section'>
        <Container maxW='container.xl' centerContent>
          <Heading as={'h1'} size='2xl' mb={4}>
            Recipe Runs
          </Heading>

          <SimpleGrid
            py={8}
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={4}
            justifyContent={'space-between'}
          >
            {recipeRuns
              ?.sort((a, b) => a.recipe_id.localeCompare(b.recipe_id))
              .sort((a, b) => a.started_at.localeCompare(b.started_at))
              .reverse()
              .map((recipe, index) => (
                <RecipeRunCard
                  key={index}
                  feedstock_id={recipe.feedstock_id}
                  recipe_id={recipe.recipe_id}
                  id={recipe.id}
                  started_at={recipe.started_at}
                  status={recipe.status}
                  version={recipe.version}
                  message={recipe.message}
                  conclusion={recipe.conclusion}
                />
              ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default RecipeRuns
