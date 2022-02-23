import useSWR from 'swr'
import { Box, Grid, Heading } from 'theme-ui'
import Layout from '../../components/layout'
import BakeryCard from '../../components/bakery-card'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Bakeries = () => {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/bakeries',
    fetcher
  )

  if (error) return <Box>Failed to load</Box>
  if (!data) return <Box>Loading...</Box>

  console.log(data)

  return (
    <Layout container={true}>
      <Box>
        <Heading as='h2' c='purple' sx={{ mb: [2], mt: [4] }}>
          Bakeries
        </Heading>
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
    </Layout>
  )
}

export default Bakeries
