import { useRouter } from 'next/router'
import { Box, Button, Themed, Link } from 'theme-ui'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'
import { useBakery } from '../../../lib/endpoints'

const Bakery = () => {
  const router = useRouter()
  const { id } = router.query

  const { bakery, bakeryError } = useBakery(id)

  const repoUrl = 'https://github.com/pangeo-forge/pangeo-forge-gcs-bakery'

  if (bakeryError)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  return (
    <Layout>
      <Themed.h1>{bakery.name}</Themed.h1>
      <Themed.p>{bakery.description}</Themed.p>
      <Link href={repoUrl}>
        <Button sx={{ float: 'right' }}>View Git Repository</Button>
      </Link>

      <Themed.h2>Recipe Runs</Themed.h2>
      <Box>
        {bakery.recipe_runs.reverse().map((b, i) => (
          <RecipeRunCard key={i} props={b} />
        ))}
      </Box>
    </Layout>
  )
}

export default Bakery
