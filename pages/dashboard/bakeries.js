import useSWR from 'swr'
import { Box, Grid, Link } from 'theme-ui'
import Layout from '../../components/layout'
import BakeryCard from '../../components/bakery-card'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Bakeries = () => {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/bakeries',
    fetcher
  )

  if (error)
    return (
      <Layout container={true} menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!data) return <Layout container={true} menu={true} />

  return (
    <Layout container={true} menu={true}>
      <Box>
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
