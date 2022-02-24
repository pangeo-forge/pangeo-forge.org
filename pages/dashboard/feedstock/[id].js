import { useRouter } from 'next/router'
import { Box, Container, Themed } from 'theme-ui'
import useSWR from 'swr'
import Layout from '../../../components/layout'
import RecipeRunCard from '../../../components/recipe-run-card'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Feedstock = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/feedstocks/' + id,
    fetcher
  )

  if (!id || !data) return <Box>Loading...</Box>
  if (error) return <Box>Failed to load</Box>

  return (
    <Layout>
      <Container sx={{ mb: [5, 5, 5, 6] }}>
        <Themed.h1>{data.spec}</Themed.h1>
        <Themed.p>Feedstock description</Themed.p>
        <Themed.h2>Recipe Runs</Themed.h2>
        <Box>
          {data.recipe_runs.reverse().map((b, i) => (
            <RecipeRunCard key={i} props={b} />
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export default Feedstock
