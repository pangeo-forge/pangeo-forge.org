import { useRouter } from 'next/router'
import { Box, Button, Flex, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'
import DashboardMenu from '../../../components/dashboard-menu'
import { useFeedstock, useMeta } from '../../../lib/endpoints'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { fs, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(fs.spec)

  if (!fs || !meta) return <Layout container={true} />
  if (fsError || metaError)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  return (
    <Layout>
      <DashboardMenu />
      <Flex>
        <Box
          sx={{
            fontFamily: 'heading',
            display: 'inline-block',
            flex: '1 1 auto',
          }}
        >
          {fs.spec.replace('pangeo-forge/', '')}
        </Box>
        <Button sx={{ display: 'inline-block', float: 'right' }}>
          View Git Repository
        </Button>
      </Flex>

      <Themed.p>{meta.description}</Themed.p>
      <Themed.h2>Recipe Runs</Themed.h2>
      <Box>
        {fs.recipe_runs.reverse().map((b, i) => (
          <RecipeRunCard key={i} props={b} />
        ))}
      </Box>
    </Layout>
  )
}

export default Feedstock
