// import fetch from 'unfetch'
import useSWR from 'swr'
import { Box } from 'theme-ui'

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
      <h1>Bakeries</h1>
      <Box>
        {data.map((b, i) => (
          <Box>
            {b.name} - {b.region} <br></br> {b.description}
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
      <h1>Feedstocks</h1>
      <Box>
        {data.map((f, i) => (
          <Box>
            -> {f.spec} - {f.provider}
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
      <h1>Recipe Runs</h1>
      <Box>
        {data.map((f, i) => (
          <Box>
            -> {f.recipe_id} - {f.started_at} <br></br>
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
