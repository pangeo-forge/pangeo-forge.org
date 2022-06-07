import Layout from '@/components/layout'
import { useRecipeRuns } from '@/lib/endpoints'
import { Box, Themed } from 'theme-ui'

const Catalog = () => {
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
      <Themed.h1>Catalog</Themed.h1>
      <Box>
        {recipeRuns
          .filter((r) => r.dataset_public_url)
          .map((d, i) => (
            <Box
              key={i}
              sx={{ fontFamily: 'subtitle', fontWeight: 'subtitle', py: [2] }}
            >
              {d.dataset_public_url}
            </Box>
          ))}
      </Box>
    </Layout>
  )
}

export default Catalog
