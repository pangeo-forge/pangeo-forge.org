import { useRouter } from 'next/router'
import Link from 'next/link'
import { Badge, Box, Button, Grid, Themed } from 'theme-ui'
import Layout from '../../../components/layout'
import { useRecipeRun, usePrefect } from '../../../lib/endpoints'

const LogLine = ({ log }) => {
  return (
    <Grid columns={[2, '1fr 3fr']}>
      <Box>
        {log.timestamp} ({log.level})
      </Box>
      <Box>{log.message}</Box>
    </Grid>
  )
}

const FlowRun = ({ i, data }) => {
  return (
    <Box key={i}>
      <Themed.h3>Flow Run {i}</Themed.h3>
      <Box sx={{ bg: '#F5F5F5', p: [2] }}>
        {data.logs.map((log, i) => (
          <Box key={i} sx={{ fontFamily: 'monospace', fontSize: [1] }}>
            <LogLine log={log} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const StatusBadge = ({ status }) => {
  let color

  if (status == 'queued') {
    color = 'yellow'
  } else if (status == 'in_progress') {
    color = 'orange'
  } else if (status == 'completed') {
    color = 'green'
  } else {
    color = 'gray'
  }

  return (
    <Badge bg={color} sx={{ fontSize: [2] }}>
      {status}
    </Badge>
  )
}

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError } = useRecipeRun(id)
  const { prefect, prefectError } = usePrefect(id)

  console.log('recipeRun', recipeRun)
  console.log('prefect', prefect)
  console.log('prefectError', prefectError)

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
      Status: <StatusBadge status={recipeRun.status} />,
      'Started at': recipeRun.started_at,
      Version: recipeRun.version,
      Feedstock: recipeRun.message,
    }
  }

  const feedstockUrl = `/dashboard/feedstock/${recipeRun.feedstock_id}`
  const bakeryUrl = `/dashboard/bakery/${recipeRun.bakery_id}`
  const gitHubUrl = `https://github.com/${recipeRun.feedstock.spec}/tree/${recipeRun.head_sha}`

  return (
    <Layout container={true}>
      <Link href={feedstockHref} passHref>
        <Themed.h2>Recipe Run: {recipeRun.recipe_id}</Themed.h2>
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
        <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
          Head SHA:
        </Box>
        <Link href={gitHubUrl} passHref>
          <Box sx={{ ml: [2], display: 'inline-block' }}>
            {recipeRun.head_sha}
          </Box>
        </Link>
        <Link href={feedstockUrl} passHref>
          <Button sx={{ float: 'right' }}>Feedstock</Button>
        </Link>
        <Link href={bakeryUrl} passHref>
          <Button sx={{ float: 'right' }}>Bakery</Button>
        </Link>
        <Link href={gitHubUrl} passHref>
          <Button sx={{ float: 'right' }}>Git Repository</Button>
        </Link>
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
