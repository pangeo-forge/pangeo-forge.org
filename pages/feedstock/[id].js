import { useRouter } from 'next/router'
import { Box, Button, Themed, Link } from 'theme-ui'
import Layout from '../../components/layout'
import RecipeRunCard from '../../components/recipe-run-card'
import { useFeedstock, useMeta } from '../../lib/endpoints'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(spec)
  const repoUrl = `https://github.com/${spec}`

  let details = {}

  if (meta) {
    // these can be expanded once the meta.yaml file spec is stable
    details = {
      Title: meta.title,
      Description: meta.description,
      'Pangeo-Forge Version': meta.pangeo_forge_version,
      'Pangeo Notebook Version': meta.pangeo_notebook_version,
      Bakery: meta.bakery ? meta.bakery.id : null,
    }
  }

  if (!spec || !meta) return <Layout container={true} />
  if (fsError || metaError)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  return (
    <Layout>
      <Themed.h1>{spec.replace('pangeo-forge/', '')}</Themed.h1>
      <Link href={repoUrl}>
        <Button sx={{ float: 'right' }}>View Git Repository</Button>
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
