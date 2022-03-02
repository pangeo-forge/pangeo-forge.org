import { Box, Grid } from 'theme-ui'
import Layout from '../../components/layout'
import BakeryCard from '../../components/bakery-card'
import { useBakeries } from '../../lib/endpoints'

const Bakeries = () => {
  const { bakeries, bakeriesError } = useBakeries()

  if (bakeriesError)
    return (
      <Layout container={true} menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!bakeries) return <Layout container={true} menu={true} />

  return (
    <Layout container={true} menu={true}>
      <Box>
        <Grid gap={3} columns={[1, 2, 3]}>
          {bakeries.map((b, i) => (
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
