import { useRouter } from 'next/router'
import { Box, Button, Flex, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'
import DashboardMenu from '../../../components/dashboard-menu'
import { useFeedstock, useMeta } from '../../../lib/endpoints'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(spec)
  console.log('meta', meta)

  if (!spec || !meta) return <Layout container={true} />
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
          variant='h1'
          sx={{
            fontFamily: 'title',
            fontSize: [6],
            color: 'blue',
            display: 'inline-block',
            flex: '1 1 auto',
          }}
        >
          {spec.replace('pangeo-forge/', '')}
        </Box>
        <Button sx={{ display: 'inline-block', float: 'right' }}>
          View Git Repository
        </Button>
      </Flex>

      <Themed.p>Title: {meta.title}</Themed.p>
      <Themed.p>Description: {meta.description}</Themed.p>
      <Themed.p>pangeo_forge_version: {meta.pangeo_forge_version}</Themed.p>
      <Themed.p>
        pangeo_notebook_version: {meta.pangeo_notebook_version}
      </Themed.p>
      <Themed.p>bakery: {meta.bakery.id}</Themed.p>

      <Themed.h2>Recipe Runs</Themed.h2>
      <Box>
        {recipe_runs.reverse().map((b, i) => (
          <RecipeRunCard key={i} props={b} />
        ))}
      </Box>
    </Layout>
  )
}

export default Feedstock
