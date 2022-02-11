import useSWR from 'swr'
import { Box, Heading } from 'theme-ui'

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
      <Box>
        {data.map((b, i) => (
          <Box key={'bakery' + '-' + i}>
            -&gt;{b.name} - {b.region} <br></br> {b.description}
          </Box>
        ))}
      </Box>
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
        {data.map((f, i) => (
          <Box key={'feedstock' + '-' + i}>
            -&gt; {f.spec} - {f.provider}
          </Box>
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
        {data.map((f, i) => (
          <Box key={'recipe-run' + '-' + i}>
            -&gt; {f.recipe_id} - {f.started_at} <br></br>
            {f.message} <br></br>
            {f.dataset_public_url}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function ForgeApi() {
  return (
    <Box>
      <Bakeries></Bakeries>
      <Feedstocks></Feedstocks>
      <RecipeRuns></RecipeRuns>
    </Box>
  )
}

export default ForgeApi
