import { useRouter } from 'next/router'
import { Box, Button, Flex, Themed, Link } from 'theme-ui'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'
import { useBakery } from '../../../lib/endpoints'

const Bakery = () => {
  const router = useRouter()
  const { id } = router.query

  const { bakery, bakeryError } = useBakery(id)

  const repoUrl = 'https://github.com/pangeo-forge/pangeo-forge-gcs-bakery'

  if (!bakery) return <Layout container={true} />

  if (bakeryError)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  return (
    <Layout>
      <Flex>
        <Box sx={{ flex: '1 1 auto' }}>
          <Themed.h2>{bakery.name}</Themed.h2>
        </Box>

        <Link href={repoUrl}>
          <Button
            sx={{
              float: 'right',
              ml: [1, null, 2],
              maxHeight: 36,
              mt: [3, null, 4],
              bg: 'white',
              color: 'purple',
              fontSize: [3],
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Git Repository
          </Button>
        </Link>
      </Flex>
      <Themed.p>{bakery.description}</Themed.p>

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
