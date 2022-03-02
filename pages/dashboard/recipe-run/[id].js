import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import { useRecipeRun, usePrefect } from '../../../lib/endpoints'

const FlowRun = ({ i, data }) => {
  return (
    <Box key={i}>
      <Themed.h3>Flow Run {i}</Themed.h3>
      {data.logs.map((log, i) => (
        <Box key={i} sx={{ fontFamily: 'monospace', fontSize: [1] }}>
          {log.timestamp} ({log.level}) - {log.message}
        </Box>
      ))}
    </Box>
  )
}

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError } = useRecipeRun(id)
  const { prefect, prefectError } = usePrefect(id)

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
        <Themed.h2>{recipeRun.recipe_id}</Themed.h2>
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
      <Box>
        <Themed.h2>Logs</Themed.h2>
        {prefectError && <Box>Error loading prefect logs</Box>}
        {prefect &&
          !prefectError &&
          prefect.data.flow_run.map((run, i) => (
            <FlowRun key={i} i={i} data={run} />
          ))}
      </Box>
    </Layout>
  )
}

export default RecipeRun
