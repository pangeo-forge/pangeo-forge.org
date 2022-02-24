import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { Box, Themed } from 'theme-ui'
import Layout from '../../../components/layout'

const fetcher = (url) => fetch(url).then((r) => r.json())

const RecipeRun = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    'https://api-staging.pangeo-forge.org/recipe_runs/' + id,
    fetcher
  )

  if (!id || !data) return <Layout container={true} />
  if (error)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  console.log(data)

  const feedstockHref = '/dashboard/feedstock/' + data.feedstock.id

  return (
    <Layout container={true}>
      <Link href={feedstockHref} passHref>
        <Themed.h1>{data.recipe_id}</Themed.h1>
      </Link>
      <Themed.p>Recipe description</Themed.p>
      <Themed.h2>{data.status}</Themed.h2>
      <Themed.h2>{data.head_sha}</Themed.h2>
    </Layout>
  )
}

export default RecipeRun
