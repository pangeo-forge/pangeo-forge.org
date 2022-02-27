import useSWR from 'swr'
import { Box, Grid } from 'theme-ui'
import Layout from '../../components/layout'
import BakeryCard from '../../components/bakery-card'
import DashboardMenu from '../../components/dashboard-menu'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Bakeries = () => {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/bakeries',
    fetcher
  )

  if (error)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!data) return <Layout container={true} />

  console.log(data)

  return (
    <Layout container={true}>
      <DashboardMenu />

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
