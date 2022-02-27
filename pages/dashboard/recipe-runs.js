import { Box } from 'theme-ui'
import Layout from '../../components/layout'
import RecipeRunCard from '../../components/recipe-run-card'
import DashboardMenu from '../../components/dashboard-menu'
import { useRecipeRuns } from '../../lib/endpoints'

const fetcher = (url) => fetch(url).then((r) => r.json())

const RecipeRuns = () => {
  const { recipeRuns, recipeRunsError } = useRecipeRuns()

  if (recipeRunsError) {
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRuns) return <Layout container={true} />

  return (
    <Layout container={true}>
      <DashboardMenu />
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
