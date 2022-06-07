import BakeryCard from '@/components/bakery-card'
import Layout from '@/components/layout'
import { useBakeries } from '@/lib/endpoints'
import { Box, Grid } from 'theme-ui'

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
              id={b.id}
            />
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default Bakeries
