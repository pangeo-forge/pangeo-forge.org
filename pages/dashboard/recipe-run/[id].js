import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import { useRecipeRun } from '../../../lib/endpoints'

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError } = useRecipeRun(id)

  if (recipeRunError) {
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRun) return <Layout container={true} />

  const feedstockHref = '/dashboard/feedstock/' + recipeRun.feedstock.id

  let details = {}

  if (recipeRun) {
    details = {
      'Started at': recipeRun.started_at,
      Status: recipeRun.status,
      Version: recipeRun.version,
      Message: recipeRun.message,
      'Head SHA': recipeRun.head_sha,
    }
  }

  return (
    <Layout container={true}>
      <Link href={feedstockHref} passHref>
        <Themed.h1>{recipeRun.recipe_id}</Themed.h1>
      </Link>
      <Box>
        {Object.keys(details).map((key, i) => (
          <Box key={key} sx={{ mb: [2] }}>
            <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
              {key}:
            </Box>
            <Box sx={{ ml: [2], display: 'inline-block' }}>{details[key]}</Box>
          </Box>
        ))}
      </Box>
    </Layout>
  )
}

export default RecipeRun
