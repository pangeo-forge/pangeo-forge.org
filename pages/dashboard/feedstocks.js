import useSWR from 'swr'
import { Box, Heading } from 'theme-ui'
import Layout from '../../components/layout'
import FeedstockCard from '../../components/feedstock-card'
import DashboardMenu from '../../components/dashboard-menu'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Feedstocks = () => {
  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/feedstocks',
    fetcher
  )

  if (error)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )
  if (!data) return <Layout container={true} />

  return (
    <Layout container={true}>
      <DashboardMenu />

      <Box>
        <Heading as='h2' sx={{ mb: [2], mt: [4] }}>
          Feedstocks
        </Heading>
        <Box>
          {data
            .filter((d) => !d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Box>
        <Heading as='h2' sx={{ mb: [2], mt: [4] }}>
          Staged Recipes
        </Heading>
        <Box>
          {data
            .filter((d) => d.spec.includes('staged-recipes'))
            .map((b, i) => (
              <FeedstockCard key={i} props={b} />
            ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default Feedstocks
