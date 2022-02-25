import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import DashboardMenu from '../../../components/dashboard-menu'
import { useRecipeRun } from '../../../lib/endpoints'

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError } = useRecipeRun(id)
  console.log(recipeRun)

  if (recipeRunError) {
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRun) return <Layout container={true} />

  const feedstockHref = '/dashboard/feedstock/' + recipeRun.feedstock.id

  return (
    <Layout container={true}>
      <DashboardMenu />
      <Link href={feedstockHref} passHref>
        <Themed.h1>{recipeRun.recipe_id}</Themed.h1>
      </Link>
      <Themed.p>Recipe description</Themed.p>
      <Themed.h2>{recipeRun.status}</Themed.h2>
      <Themed.h2>{recipeRun.head_sha}</Themed.h2>
    </Layout>
  )
}

export default RecipeRun
