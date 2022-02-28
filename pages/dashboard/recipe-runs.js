import { Box } from 'theme-ui'
import Layout from '../../components/layout'
import RecipeRunCard from '../../components/recipe-run-card'
import { useRecipeRuns } from '../../lib/endpoints'

const RecipeRuns = () => {
  const { recipeRuns, recipeRunsError } = useRecipeRuns()

  if (recipeRunsError) {
    return (
      <Layout container={true} menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRuns) return <Layout container={true} menu={true} />

  return (
    <Layout container={true} menu={true}>
      <Box>
        <Box>
          {recipeRuns.reverse().map((b, i) => (
            <RecipeRunCard key={i} props={b} />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default RecipeRuns
