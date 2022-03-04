import { useRouter } from 'next/router'
import { Box, Button, Flex, Themed, Link } from 'theme-ui'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'
import { useFeedstock, useMeta } from '../../../lib/endpoints'

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  const { meta, metaError } = useMeta(spec)
  const repoUrl = `https://github.com/${spec}`

  let details = {}

  if (meta && !meta['404']) {
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
    <Layout container={true}>
      <Flex>
        <Box sx={{ flex: '1 1 auto' }}>
          <Themed.h2>{spec.replace('pangeo-forge/', '')}</Themed.h2>
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

      {spec == 'pangeo-forge/staged-recipes' && (
        <Box>
          A place to submit pangeo-forge recipes before they become fully
          fledged pangeo-forge feedstocks.
        </Box>
      )}

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
