import { Box, Grid } from 'theme-ui'
import Layout from '../../components/layout'
import FeedstockCard from '../../components/feedstock-card'
import { useFeedstocks } from '../../lib/endpoints'

const Feedstocks = () => {
  const { feedstocks, feedstocksError } = useFeedstocks()

  if (feedstocksError) {
    return (
      <Layout container={true} menu={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  }
  if (!feedstocks) return <Layout container={true} menu={true} />

  return (
    <Layout container={true} menu={true}>
      {/* <DashboardMenu /> */}
      <Box>
        <Grid gap={3} columns={[1, 2, 3]}>
          {feedstocks
            .filter((d) => !d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid>
        {/* <Heading as='h2' sx={{ mb: [2], mt: [4] }}>
          Staged Recipes
        </Heading>
        <Grid gap={2} columns={[1, null, 2]}>
          {feedstocks
            .filter((d) => d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid> */}
      </Box>
    </Layout>
  )
}

export default Feedstocks
