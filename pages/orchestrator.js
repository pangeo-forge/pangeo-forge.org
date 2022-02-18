import useSWR from 'swr'
import { Box, Container, Grid, Heading, Themed } from 'theme-ui'
import Layout from '../components/layout'
import BakeryCard from '../components/bakery-card'
import FeedstockCard from '../components/feedstock-card'
import RecipeRunCard from '../components/recipe-run-card'

const fetcher = (url) => fetch(url).then((r) => r.json())

function Bakeries() {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/bakeries',
    fetcher
  )

  if (error) return <Box>Failed to load</Box>
  if (!data) return <Box>Loading...</Box>

  console.log(data)

  return (
    <Box>
      <Heading as='h2'>Bakeries</Heading>
      <Grid gap={2} columns={[1, null, 2]}>
        {data.map((b, i) => (
          <BakeryCard
            key={i}
            name={b.name}
            region={b.region}
            description={b.description}
          />
        ))}
      </Grid>
    </Box>
  )
}

function Feedstocks() {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/feedstocks',
    fetcher
  )

  if (error) return <Box>Failed to load</Box>
  if (!data) return <Box>Loading...</Box>

  console.log(data)

  return (
    <Box>
      <Heading as='h2'>Feedstocks</Heading>
      <Box>
        {data.map((b, i) => (
          <FeedstockCard key={i} spec={b.spec} provider={b.provider} />
        ))}
      </Box>
    </Box>
  )
}

function RecipeRuns() {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/recipe_runs',
    fetcher
  )

  if (error) return <Box>Failed to load</Box>
  if (!data) return <Box>Loading...</Box>

  console.log(data)

  return (
    <Box>
      <Heading as='h2'>Recipe Runs</Heading>
      <Box>
        {data.map((b, i) => (
          <RecipeRunCard
            key={i}
            recipe_id={b.recipe_id}
            started_at={b.started_at}
            message={b.message}
          />
        ))}
      </Box>
    </Box>
  )
}

const Orchestrator = (props) => {
  return (
    <Layout>
      <Container sx={{ mb: [5, 5, 5, 6] }}>
        <Box
          sx={{
            fontSize: [5, 6, 7, 8],
            fontFamily: 'heading',
            fontWeight: 'bold',
          }}
        >
          Orchestrator
        </Box>
        <Bakeries />
        <Feedstocks />
        <RecipeRuns />
      </Container>
    </Layout>
  )
}

export default Orchestrator
