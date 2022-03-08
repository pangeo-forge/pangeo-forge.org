import { useRouter } from 'next/router'
import Link from 'next/link'
import { Badge, Box, Button, Flex, Grid, Themed } from 'theme-ui'
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
    <Badge bg={color} sx={{ fontSize: [3] }}>
      {status}
    </Badge>
  )
}

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { recipeRun, recipeRunError } = useRecipeRun(id)

  let active = false

  if (recipeRun) {
    active = recipeRun.status != 'completed'
  }

  const { prefect, prefectError } = usePrefect(id, active)

  if (recipeRunError) {
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!recipeRun) return <Layout container={true} />

  let details = {}

  if (recipeRun) {
    details = {
      Name: recipeRun.recipe_id,
      'Started at': recipeRun.started_at,
      Status: <StatusBadge status={recipeRun.status} />,
      Version: (
        <Badge
          sx={{
            bg: 'lightgray',
            color: 'black',
            fontSize: [3],
            fontWeight: 'body',
          }}
        >
          {recipeRun.version}
        </Badge>
      ),
    }
  }

  const feedstockUrl = `/dashboard/feedstock/${recipeRun.feedstock_id}`
  const bakeryUrl = `/dashboard/bakery/${recipeRun.bakery_id}`
  const gitHubUrl = `https://github.com/${recipeRun.feedstock.spec}/tree/${recipeRun.head_sha}`

  return (
    <Layout container={true}>
      <Flex>
        <Box sx={{ flex: '1 1 auto' }}>
          <Themed.h2>Recipe Run: {recipeRun.id}</Themed.h2>
        </Box>

        <Link href={feedstockUrl} passHref>
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
            Feedstock
          </Button>
        </Link>
        <Link href={bakeryUrl} passHref>
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
            Bakery
          </Button>
        </Link>
        <Link href={gitHubUrl} passHref>
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
          <Badge
            sx={{
              bg: 'lightgray',
              color: 'black',
              fontSize: [3],
              fontWeight: 'body',
              ml: [2],
            }}
          >
            {recipeRun.head_sha.slice(0, 7)}
          </Badge>
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
