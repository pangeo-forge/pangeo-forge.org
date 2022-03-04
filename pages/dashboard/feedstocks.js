import { Box, Grid, Themed } from 'theme-ui'
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
      <Box>
        <Grid gap={3} columns={[1, 2, 3]}>
          {feedstocks
            .filter((d) => !d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid>
        <Themed.h2>Staged Recipes</Themed.h2>
        <Grid gap={3} columns={[1, 2, 3]}>
          {feedstocks
            .filter((d) => d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default Feedstocks
