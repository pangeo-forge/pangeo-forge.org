import Layout from '@/components/layout'
import { useFeedstock } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Link, Themed } from 'theme-ui'

const Catalog = () => {
  const router = useRouter()

  const { id } = router.query
  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  if (fsError)
    return (
      <Layout container={true}>
        <Box>Failed to load...</Box>
      </Layout>
    )

  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  const name = spec.replace('pangeo-forge/', '')
  return (
    <Layout container={true}>
      <Box>
        <Themed.h1>{name} Catalog</Themed.h1>
        {isProduction && <Box> {datasets} </Box>}
      </Box>
      <Box>
        <Button>
          <Link href={`/dashboard/feedstock/${id}`}>Feedstock URL </Link>
        </Button>
      </Box>
    </Layout>
  )
}

export default Catalog
