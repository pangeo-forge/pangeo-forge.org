import useSWR from 'swr'
import { Box, Heading } from 'theme-ui'
import Layout from '../../components/layout'
import RecipeRunCard from '../../components/recipe-run-card'
import DashboardMenu from '../../components/dashboard-menu'

const fetcher = (url) => fetch(url).then((r) => r.json())

const RecipeRuns = () => {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/recipe_runs',
    fetcher
  )

  if (error)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!data) return <Layout container={true} />

  return (
    <Layout container={true}>
      <DashboardMenu />

      <Box>
        <Heading as='h2' sx={{ mb: [2], mt: [4] }}>
          Recipe Runs
        </Heading>
        <Box>
          {data.reverse().map((b, i) => (
            <RecipeRunCard key={i} props={b} />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default RecipeRuns
